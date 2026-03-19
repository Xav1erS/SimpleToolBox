// playwright.config.js
import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, 'public');

export default defineConfig({
  testDir: './tests',
  timeout: 15_000,
  retries: 1,
  reporter: [
    ['list'],
    ['json', { outputFile: 'reports/playwright-report.json' }],
  ],

  use: {
    // Serve files from public/ so relative CSS/JS paths resolve correctly
    baseURL: `file://${PUBLIC_DIR}/`,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'off',
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // Snapshot directory for visual regression tests
  snapshotDir: './tests/visual/snapshots',
  snapshotPathTemplate: '{snapshotDir}/{testFilePath}/{arg}{ext}',
});
