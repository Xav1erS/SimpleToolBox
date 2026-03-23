/**
 * Visual snapshot tests for SimpleToolbox tool pages.
 *
 * Run modes:
 *   npx playwright test tests/visual/snapshot.test.js --update-snapshots   # build baseline
 *   npx playwright test tests/visual/snapshot.test.js                       # compare vs baseline
 *
 * Snapshots are stored in tests/visual/snapshots/
 * Failures produce diff images in test-results/
 */
import { test, expect } from '@playwright/test';
import { toolUrl } from '../utils/helpers.js';

async function waitForVisualReady(page) {
  await page.waitForLoadState('networkidle', { timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(300);
}

// Tools to capture — start with the highest-traffic / most-changed pages
const SNAPSHOT_TOOLS = [
  'base64',
  'json-formatter',
  'password-generator',
  'url-encode',
  'hash-generator',
  'word-counter',
  'uuid-generator',
  'timestamp',
  'markdown-preview',
  'color-picker',
  // Additional important pages
  'qr-code-generator',
  'image-resizer',
  'slug-generator',
  'regex-tester',
  'jwt-decoder',
  // Image tools batch
  'exif-viewer',
  'image-to-base64',
  'base64-to-image',
  'image-metadata-editor',
];

// Screenshot options
const SCREENSHOT_OPTS = {
  animations: 'disabled',
  // Clip to above-the-fold to keep snapshots stable and fast
  clip: { x: 0, y: 0, width: 1280, height: 900 },
  timeout: 10000,
};

for (const slug of SNAPSHOT_TOOLS) {
  test.describe(`Visual: ${slug}`, () => {
    test('desktop layout', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(toolUrl(slug), { waitUntil: 'domcontentloaded' });
      await waitForVisualReady(page);
      await expect(page).toHaveScreenshot(`${slug}-desktop.png`, {
        ...SCREENSHOT_OPTS,
        maxDiffPixelRatio: 0.02, // allow 2% pixel diff before flagging
      });
    });

    test('mobile layout', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(toolUrl(slug), { waitUntil: 'domcontentloaded' });
      await waitForVisualReady(page);
      await expect(page).toHaveScreenshot(`${slug}-mobile.png`, {
        animations: 'disabled',
        clip: { x: 0, y: 0, width: 390, height: 844 },
        maxDiffPixelRatio: 0.02,
        timeout: 10000,
      });
    });
  });
}
