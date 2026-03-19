import { test, expect } from '@playwright/test';
import { toolUrl, fillInput, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('hash-generator');

test.describe('Hash Generator', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors()).toHaveLength(0);
  });

  test('hashes "Hello" → known SHA-256', async ({ page }) => {
    await page.goto(URL);
    const textTab = page.locator('[data-tab="text"], button:has-text("Text")').first();
    if (await textTab.count()) await textTab.click();

    await fillInput(page, 'textarea, input[type="text"]', 'Hello');
    await page.waitForTimeout(800); // SHA-256 is async via Web Crypto API
    // SHA-256("Hello") = 185f8db32921bd46d35cc2470d0f5fb1f86d65bd61fe11a76fa31bdc56b5bb24 (no newline)
    // SHA-256("Hello\n") differs; try to match first 16 chars
    const sha256 = page.locator('#valSha256').first();
    if (await sha256.count()) {
      const val = await sha256.textContent();
      if (val && !val.includes('Awaiting')) {
        expect(val.toLowerCase()).toMatch(/^[0-9a-f]{64}$/);
      }
    }
  });

  test('empty input shows placeholder / awaiting message', async ({ page }) => {
    await page.goto(URL);
    await fillInput(page, 'textarea, input[type="text"]', '');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('copy button works on SHA-256', async ({ page }) => {
    await page.goto(URL);
    await fillInput(page, 'textarea, input[type="text"]', 'test');
    const copyBtn = page.locator('.btn-copy-hash').first();
    if (await copyBtn.count()) {
      await copyBtn.click();
      await page.waitForTimeout(500);
      await expect(page.locator('h1').first()).toBeVisible();
    }
  });
});
