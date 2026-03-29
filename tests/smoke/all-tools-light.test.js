import { test, expect } from '@playwright/test';
import { getAllToolSlugs, toolUrl } from '../utils/helpers.js';

const TOOL_SLUGS = getAllToolSlugs();
const MAIN_SELECTOR = '.ds-tool-main, .main, .tool-layout, .body-wrap, .workbench-wrap, .workspace';

function shouldIgnoreConsoleError(slug, text) {
  if (text.includes('favicon') || text.includes('gtag') || text.includes('google')) return true;
  if (slug === 'ip-lookup' && (text.includes('ipapi.co') || text.includes('CORS policy') || text.includes('ERR_FAILED'))) {
    return true;
  }
  return false;
}

test.describe('All tools lightweight smoke', () => {
  test('every tool page loads and initializes without runtime errors', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'Desktop Chrome', '全量轻量加载检查只在桌面项目执行');
    test.setTimeout(240000);

    const failures = [];
    let pageErrors = [];
    let consoleErrors = [];

    page.on('pageerror', error => {
      pageErrors.push(String(error));
    });
    page.on('console', msg => {
      if (msg.type() !== 'error') return;
      const text = msg.text();
      consoleErrors.push(text);
    });

    for (const slug of TOOL_SLUGS) {
      pageErrors = [];
      consoleErrors = [];

      try {
        await page.goto(toolUrl(slug), { waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('networkidle', { timeout: 1200 }).catch(() => {});
        await page.waitForTimeout(50);

        await expect(page.locator('h1').first(), `${slug} 缺少 h1`).toBeVisible({ timeout: 2500 });
        await expect(page.locator(MAIN_SELECTOR).first(), `${slug} 缺少主内容容器`).toBeVisible({ timeout: 2500 });

        const filteredConsoleErrors = consoleErrors.filter(text => !shouldIgnoreConsoleError(slug, text));

        if (pageErrors.length || filteredConsoleErrors.length) {
          failures.push({
            slug,
            pageErrors,
            consoleErrors: filteredConsoleErrors,
          });
        }
      } catch (error) {
        const filteredConsoleErrors = consoleErrors.filter(text => !shouldIgnoreConsoleError(slug, text));
        failures.push({
          slug,
          pageErrors,
          consoleErrors: filteredConsoleErrors,
          testError: String(error),
        });
      }
    }

    expect(
      failures,
      failures.length
        ? `发现 ${failures.length} 个工具页轻量加载失败:\n${failures.map(item => JSON.stringify(item)).join('\n')}`
        : 'all tools load cleanly'
    ).toHaveLength(0);
  });
});
