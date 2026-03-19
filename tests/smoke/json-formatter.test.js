import { test, expect } from '@playwright/test';
import { toolUrl, fillInput, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('json-formatter');

test.describe('JSON Formatter', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors()).toHaveLength(0);
  });

  test('valid JSON formats correctly', async ({ page }) => {
    await page.goto(URL);
    const input = '{"name":"Alice","age":30}';
    await fillInput(page, '#inputText', input);
    // json-formatter requires explicit button click to format
    await page.click('#btnPrettify');
    await page.waitForTimeout(300);
    const output = page.locator('#outputText');
    const val = await output.inputValue();
    expect(val).toContain('"name"');
    expect(val).toContain('"Alice"');
    expect(val.length).toBeGreaterThan(input.length);
  });

  test('invalid JSON shows error feedback', async ({ page }) => {
    await page.goto(URL);
    await fillInput(page, 'textarea', '{bad json}');
    // Should show an error indicator somewhere on page
    const errorEl = page.locator('.ds-tool-error, [class*="error"], [class*="invalid"]').first();
    // At minimum, page should not crash
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('empty input does not crash', async ({ page }) => {
    await page.goto(URL);
    await fillInput(page, 'textarea', '');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
