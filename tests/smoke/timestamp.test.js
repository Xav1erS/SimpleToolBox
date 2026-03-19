import { test, expect } from '@playwright/test';
import { toolUrl, fillInput, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('timestamp');

test.describe('Timestamp Converter', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors()).toHaveLength(0);
  });

  test('converts known Unix timestamp 0 → 1970-01-01', async ({ page }) => {
    await page.goto(URL);
    // Find Unix timestamp input and type 0
    const tsInput = page.locator('input[type="number"], input[placeholder*="timestamp" i]').first();
    if (await tsInput.count()) {
      await tsInput.fill('0');
      await tsInput.press('Enter');
      await page.waitForTimeout(300);
      const body = await page.content();
      expect(body).toMatch(/1970/);
    }
  });

  test('shows current timestamp on load', async ({ page }) => {
    await page.goto(URL);
    // Should show current year somewhere
    const currentYear = new Date().getFullYear().toString();
    const body = await page.content();
    expect(body).toContain(currentYear);
  });

  test('invalid input does not crash', async ({ page }) => {
    await page.goto(URL);
    const input = page.locator('input[type="number"]').first();
    if (await input.count()) {
      await input.fill('not-a-number');
      await page.waitForTimeout(300);
    }
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
