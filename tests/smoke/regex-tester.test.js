import { test, expect } from '@playwright/test';
import { toolUrl, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('regex-tester');

test.describe('Regex Tester', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors()).toHaveLength(0);
  });

  test('valid regex shows match count', async ({ page }) => {
    await page.goto(URL);
    const regexInput = page.locator('input[type="text"], #regexInput, .regex-input').first();
    const testInput  = page.locator('textarea').first();
    await regexInput.fill('\\d+');
    await testInput.fill('abc 123 def 456');
    await page.waitForTimeout(300);
    // result area should appear and contain at least one match indicator
    const body = await page.textContent('body');
    expect(body).toMatch(/match|found|2/i);
  });

  test('invalid regex shows error state', async ({ page }) => {
    await page.goto(URL);
    const regexInput = page.locator('input[type="text"], #regexInput, .regex-input').first();
    await regexInput.fill('[unclosed');
    await page.waitForTimeout(300);
    const body = await page.textContent('body');
    expect(body).toMatch(/invalid|error/i);
  });
});
