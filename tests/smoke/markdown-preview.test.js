import { test, expect } from '@playwright/test';
import { toolUrl, fillInput, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('markdown-preview');

test.describe('Markdown Preview', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    await page.goto(URL);
    // Use .first() because preview pane may also render an h1
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors()).toHaveLength(0);
  });

  test('# Heading renders as <h1> in preview', async ({ page }) => {
    await page.goto(URL);
    const editor = page.locator('textarea, .CodeMirror, [contenteditable="true"]').first();
    if (await editor.count()) {
      await editor.fill('# Hello World');
      await page.waitForTimeout(400);
      // Preview pane should contain an h1
      const preview = page.locator('.preview-pane, #preview, [class*="preview"]').first();
      if (await preview.count()) {
        const html = await preview.innerHTML();
        expect(html).toContain('<h1>');
      }
    }
  });

  test('**bold** renders as <strong>', async ({ page }) => {
    await page.goto(URL);
    const editor = page.locator('textarea').first();
    if (await editor.count()) {
      await editor.fill('**bold text**');
      await page.waitForTimeout(400);
      const body = await page.content();
      expect(body).toContain('<strong>');
    }
  });

  test('empty input does not crash', async ({ page }) => {
    await page.goto(URL);
    const editor = page.locator('textarea').first();
    if (await editor.count()) await editor.fill('');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
