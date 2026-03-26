import { test, expect } from '@playwright/test';
import { toolUrl, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('date-calculator');

test.describe('Date Calculator', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors()).toHaveLength(0);
  });

  test('date difference calculates correctly', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#diffStart', '2024-01-01');
    await page.fill('#diffEnd', '2024-01-11');
    await page.waitForTimeout(300);
    const result = await page.textContent('#diffDays');
    expect(result.trim()).toMatch(/10/);
  });

  test('add days returns correct date', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#addStart', '2024-01-01');
    await page.fill('#addDays', '30');
    await page.waitForTimeout(300);
    const result = await page.textContent('#addResultDate');
    expect(result.trim()).toMatch(/January|February|31/i);
  });

  test('copy button appears after calculation', async ({ page }) => {
    await page.goto(URL);
    await page.fill('#diffStart', '2024-01-01');
    await page.fill('#diffEnd', '2024-01-11');
    await page.waitForTimeout(300);
    await expect(page.locator('#diffResult .result-copy-btn')).toBeVisible();
  });
});
