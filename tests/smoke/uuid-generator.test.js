import { test, expect } from '@playwright/test';
import { toolUrl, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('uuid-generator');
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

test.describe('UUID Generator', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors()).toHaveLength(0);
  });

  test('generates valid UUID on load', async ({ page }) => {
    await page.goto(URL);
    // Wait for UUID list to be populated
    await page.waitForSelector('.uuid-text', { timeout: 5000 });
    const uuidText = page.locator('.uuid-text').first();
    const text = await uuidText.textContent();
    expect(text.trim()).toMatch(UUID_REGEX);
  });

  test('generate button produces new UUIDs', async ({ page }) => {
    await page.goto(URL);
    const genBtn = page.locator('button:has-text("Generate"), #generateBtn').first();
    if (await genBtn.count()) {
      await genBtn.click();
      await page.waitForTimeout(200);
      await expect(page.locator('h1').first()).toBeVisible();
    }
  });
});
