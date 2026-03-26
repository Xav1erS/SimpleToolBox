import { test, expect } from '@playwright/test';
import { toolUrl, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('http-status');

test.describe('HTTP Status Codes', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors()).toHaveLength(0);
  });

  test('status codes render in grid', async ({ page }) => {
    await page.goto(URL);
    await page.waitForTimeout(300);
    const rows = page.locator('.status-row');
    await expect(rows.first()).toBeVisible();
    expect(await rows.count()).toBeGreaterThan(40);
  });

  test('search filters results', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#searchInput', '404');
    await page.waitForTimeout(300);
    const visible = await page.locator('.status-row:visible').count();
    expect(visible).toBeLessThan(5);
    const body = await page.textContent('#statusGrid');
    expect(body).toContain('404');
  });

  test('category filter works', async ({ page }) => {
    await page.goto(URL);
    await page.click('.filter-btn[data-cat="2xx"]');
    await page.waitForTimeout(300);
    const visible = await page.locator('.status-row:visible').count();
    expect(visible).toBeGreaterThan(0);
    expect(visible).toBeLessThan(20);
  });

  test('export JSON button exists', async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('#exportJsonBtn')).toBeVisible();
  });
});
