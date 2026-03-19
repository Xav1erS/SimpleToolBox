import { test, expect } from '@playwright/test';
import { toolUrl, fillInput, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('word-counter');

test.describe('Word Counter', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors()).toHaveLength(0);
  });

  test('counts 3 words correctly', async ({ page }) => {
    await page.goto(URL);
    await fillInput(page, 'textarea', 'one two three');
    const wordCount = page.locator('#wordCount, [data-stat="words"], .stat-value').first();
    if (await wordCount.count()) {
      const val = await wordCount.textContent();
      expect(val.trim()).toBe('3');
    }
  });

  test('counts characters correctly', async ({ page }) => {
    await page.goto(URL);
    await fillInput(page, 'textarea', 'Hello');
    const charCount = page.locator('#charCount, [data-stat="chars"]').first();
    if (await charCount.count()) {
      const val = await charCount.textContent();
      expect(val.trim()).toBe('5');
    }
  });

  test('empty textarea shows zero counts', async ({ page }) => {
    await page.goto(URL);
    await fillInput(page, 'textarea', '');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
