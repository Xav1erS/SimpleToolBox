import { test, expect } from '@playwright/test';
import { attachConsoleErrorGuard, getAllToolSlugs, toolUrl } from '../utils/helpers.js';

const TOOL_SLUGS = getAllToolSlugs();
const MAIN_SELECTOR = '.ds-tool-main, .main, .tool-layout, .body-wrap, .workbench-wrap';

test.describe('All tools lightweight smoke', () => {
  test('every tool page loads and initializes without runtime errors', async ({ page }, testInfo) => {
    test.setTimeout(240000);

    const failures = [];

    for (const slug of TOOL_SLUGS) {
      const toolPage = await page.context().newPage();
      const consoleErrors = attachConsoleErrorGuard(toolPage);
      const pageErrors = [];

      toolPage.on('pageerror', error => {
        pageErrors.push(String(error));
      });

      try {
        await toolPage.goto(toolUrl(slug), { waitUntil: 'domcontentloaded' });
        await toolPage.waitForLoadState('networkidle', { timeout: 2500 }).catch(() => {});
        await toolPage.waitForTimeout(120);

        await expect(toolPage.locator('h1').first(), `${slug} 缺少 h1`).toBeVisible({ timeout: 5000 });
        await expect(toolPage.locator(MAIN_SELECTOR).first(), `${slug} 缺少主内容容器`).toBeVisible({ timeout: 5000 });

        const filteredConsoleErrors = consoleErrors().filter(text => {
          return !text.includes('favicon') && !text.includes('gtag') && !text.includes('google');
        });

        if (pageErrors.length || filteredConsoleErrors.length) {
          failures.push({
            slug,
            pageErrors,
            consoleErrors: filteredConsoleErrors,
          });
        }
      } catch (error) {
        failures.push({
          slug,
          pageErrors,
          consoleErrors: consoleErrors(),
          testError: String(error),
        });
      } finally {
        await toolPage.close();
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
