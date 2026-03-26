import { test, expect } from '@playwright/test';
import { toolUrl, attachConsoleErrorGuard } from '../utils/helpers.js';

const URL = toolUrl('image-resizer');

test.describe('Image Resizer', () => {
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

  test('width and height inputs are present', async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('#inWidth, input[placeholder="W"]').first()).toBeAttached();
    await expect(page.locator('#inHeight, input[placeholder="H"]').first()).toBeAttached();
  });
});
