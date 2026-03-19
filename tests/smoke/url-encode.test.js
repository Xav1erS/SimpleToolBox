import { test, expect } from '@playwright/test';
import { toolUrl, fillInput, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('url-encode');

test.describe('URL Encoder / Decoder', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors()).toHaveLength(0);
  });

  test('encodes special characters', async ({ page }) => {
    await page.goto(URL);
    const encodeBtn = page.locator('[data-mode="encode"], button:has-text("Encode")').first();
    if (await encodeBtn.count()) await encodeBtn.click();

    await fillInput(page, 'textarea', 'hello world & more');
    const output = page.locator('textarea').nth(1);
    const val = await output.inputValue();
    expect(val).toContain('%20');
    expect(val).toContain('%26');
  });

  test('encodes Chinese characters', async ({ page }) => {
    await page.goto(URL);
    const encodeBtn = page.locator('[data-mode="encode"], button:has-text("Encode")').first();
    if (await encodeBtn.count()) await encodeBtn.click();

    await fillInput(page, 'textarea', '你好');
    const output = page.locator('textarea').nth(1);
    const val = await output.inputValue();
    expect(val).toMatch(/%[0-9A-Fa-f]{2}/);
  });

  test('empty input does not crash', async ({ page }) => {
    await page.goto(URL);
    await fillInput(page, 'textarea', '');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
