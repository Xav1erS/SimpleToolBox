import { test, expect } from '@playwright/test';
import { publicUrl, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = publicUrl('index.html');

test.describe('Homepage', () => {
  test('page loads and renders key sections', async ({ page }) => {
    const consoleErrors = attachConsoleErrorGuard(page);
    const pageErrors = [];
    page.on('pageerror', error => {
      pageErrors.push(String(error));
    });

    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('#categoryGrid .category-card')).toHaveCount(8);
    await expect(page.locator('#popularToolGrid .tool-card')).not.toHaveCount(0);
    await expect(page.locator('#newToolGrid .tool-card')).toHaveCount(6);

    expect(pageErrors).toHaveLength(0);
    expect(consoleErrors()).toHaveLength(0);
  });

  test('search inputs remain available after render', async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('#heroSearch')).toBeVisible();
    await expect(page.locator('#navSearch')).toBeVisible();
  });
});
