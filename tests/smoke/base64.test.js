import { test, expect } from '@playwright/test';
import { toolUrl, fillInput, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('base64');

test.describe('Base64 Encoder / Decoder', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors()).toHaveLength(0);
  });

  test('encodes "Hello" → "SGVsbG8="', async ({ page }) => {
    await page.goto(URL);
    // Switch to Encode mode if not default
    const encodeBtn = page.locator('[data-mode="encode"], button:has-text("Encode")').first();
    if (await encodeBtn.count()) await encodeBtn.click();

    const input = page.locator('textarea').first();
    await fillInput(page, 'textarea', 'Hello');
    const output = page.locator('textarea').nth(1);
    await expect(output).toHaveValue('SGVsbG8=');
  });

  test('decodes "SGVsbG8=" → "Hello"', async ({ page }) => {
    await page.goto(URL);
    const decodeBtn = page.locator('[data-mode="decode"], button:has-text("Decode")').first();
    if (await decodeBtn.count()) await decodeBtn.click();

    await fillInput(page, 'textarea', 'SGVsbG8=');
    const output = page.locator('textarea').nth(1);
    const val = await output.inputValue();
    expect(val.trim()).toBe('Hello');
  });

  test('empty input does not crash', async ({ page }) => {
    await page.goto(URL);
    await fillInput(page, 'textarea', '');
    // Page should still be functional
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
