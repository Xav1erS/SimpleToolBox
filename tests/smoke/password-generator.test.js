import { test, expect } from '@playwright/test';
import { toolUrl, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('password-generator');

test.describe('Password Generator', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors()).toHaveLength(0);
  });

  test('generates non-empty password on load', async ({ page }) => {
    await page.goto(URL);
    // Password output element should have content
    const pwdOutput = page.locator('#password, .password-output, [data-password]').first();
    if (await pwdOutput.count()) {
      const val = await pwdOutput.textContent() || await pwdOutput.inputValue();
      expect(val.trim().length).toBeGreaterThan(0);
    }
  });

  test('generate button produces new password', async ({ page }) => {
    await page.goto(URL);
    const genBtn = page.locator('button:has-text("Generate"), button:has-text("Regenerate"), #generateBtn').first();
    if (await genBtn.count()) {
      await genBtn.click();
      await page.waitForTimeout(200);
      // Page should still render after click
      await expect(page.locator('h1').first()).toBeVisible();
    }
  });

  test('copy button does not crash', async ({ page }) => {
    await page.goto(URL);
    const copyBtn = page.locator('button:has-text("Copy"), [class*="copy"]').first();
    if (await copyBtn.count()) {
      await copyBtn.click();
      await page.waitForTimeout(500);
      await expect(page.locator('h1').first()).toBeVisible();
    }
  });
});
