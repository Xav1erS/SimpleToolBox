import { test, expect } from '@playwright/test';
import { toolUrl, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('webp-converter');

test.describe('WebP Converter', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors()).toHaveLength(0);
  });

  test('upload area is visible', async ({ page }) => {
    await page.goto(URL);
    const dropZone = page.locator('.drop-zone, .upload-area, [id*="drop"], label[for*="file"]').first();
    await expect(dropZone).toBeVisible();
  });

  test('format selector is present', async ({ page }) => {
    await page.goto(URL);
    const formatOptions = page.locator('.fmt-card, select, [data-format]').first();
    await expect(formatOptions).toBeVisible();
  });
});
