import { test, expect } from '@playwright/test';
import { toolUrl, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('image-compressor');

test.describe('Image Compressor', () => {
  test('page loads without errors', async ({ page }) => {
    const errors = attachConsoleErrorGuard(page);
    await page.goto(URL);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors()).toHaveLength(0);
  });

  test('upload area is visible', async ({ page }) => {
    await page.goto(URL);
    const dropZone = page.locator('.drop-zone, .upload-area, [id*="drop"], label[for*="file"]').first();
    await expect(dropZone).toBeVisible();
  });

  test('quality slider is present', async ({ page }) => {
    await page.goto(URL);
    const slider = page.locator('input[type="range"]').first();
    await expect(slider).toBeAttached();
  });
});
