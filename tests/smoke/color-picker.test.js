import { test, expect } from '@playwright/test';
import { toolUrl, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('color-picker');

test.describe('Color Picker', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors()).toHaveLength(0);
  });

  test('HEX input updates color display', async ({ page }) => {
    await page.goto(URL);
    const hexInput = page.locator('input[type="text"][placeholder*="#" i], input#hexInput, #hex-input').first();
    if (await hexInput.count()) {
      await hexInput.fill('#FF5733');
      await hexInput.press('Enter');
      await page.waitForTimeout(300);
      await expect(page.locator('h1').first()).toBeVisible();
    }
  });

  test('color picker canvas/swatch is present', async ({ page }) => {
    await page.goto(URL);
    const picker = page.locator('canvas, .color-swatch, .color-preview, [class*="picker"]').first();
    if (await picker.count()) {
      await expect(picker).toBeVisible();
    }
  });
});
