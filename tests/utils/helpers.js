/**
 * Test helpers for SimpleToolbox smoke tests.
 */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '../../public');

/**
 * Returns the file:// URL for a tool page.
 * @param {string} slug e.g. 'base64' or 'tools/base64.html'
 */
export function toolUrl(slug) {
  const fname = slug.endsWith('.html') ? slug : `tools/${slug}.html`;
  return `file://${PUBLIC_DIR}/${fname}`;
}

/**
 * Wait for a selector to be visible and return its text content.
 */
export async function getText(page, selector) {
  await page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
  return page.textContent(selector);
}

/**
 * Fill an input and wait for debounce.
 */
export async function fillInput(page, selector, value) {
  await page.fill(selector, value);
  await page.waitForTimeout(300);
}

/**
 * Assert no browser console errors (ignores known third-party warnings).
 */
export function attachConsoleErrorGuard(page) {
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore known non-critical errors
      if (text.includes('favicon') || text.includes('gtag') || text.includes('google')) return;
      errors.push(text);
    }
  });
  return () => errors;
}
