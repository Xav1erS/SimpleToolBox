import { test, expect } from '@playwright/test';
import { toolUrl, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('password-generator');

test.describe('Password Generator', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    const pageErrors = [];
    page.on('pageerror', error => {
      pageErrors.push(String(error));
    });
    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(pageErrors).toHaveLength(0);
    expect(errors()).toHaveLength(0);
  });

  test('generates non-empty passwords on load', async ({ page }) => {
    await page.goto(URL);
    const rows = page.locator('.password-row .password-text');
    await expect(rows.first()).toBeVisible();
    const firstPassword = (await rows.first().textContent()) || '';
    expect(firstPassword.trim().length).toBeGreaterThan(0);
  });

  test('generate button produces new passwords', async ({ page }) => {
    await page.goto(URL);
    const rows = page.locator('.password-row .password-text');
    const before = (await rows.first().textContent()) || '';
    const genBtn = page.locator('#btnGenerate, button:has-text("Generate"), button:has-text("Regenerate"), #generateBtn').first();
    await expect(genBtn).toBeVisible();
    await genBtn.click();
    await page.waitForTimeout(200);
    const after = (await rows.first().textContent()) || '';
    expect(after.trim().length).toBeGreaterThan(0);
    expect(after).not.toBe(before);
  });

  test('copy button does not crash', async ({ page }) => {
    await page.goto(URL);
    const copyBtn = page.locator('#btnCopyAll, .copy-btn, button:has-text("Copy"), [class*="copy"]').first();
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await page.waitForTimeout(500);
    await expect(page.locator('.password-row .password-text').first()).toBeVisible();
  });
});
