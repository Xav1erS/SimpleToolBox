import { test, expect } from '@playwright/test';
import { publicUrl, toolUrl, attachConsoleErrorGuard } from '../utils/helpers.js';

const MOJIBAKE_RE = /[鈥鈫脳璺婕]|路/;

const DESKTOP_CASES = [
  { label: 'homepage', url: publicUrl('index.html'), type: 'site', expectDirectory: false },
  { label: 'all-tools', url: publicUrl('all-tools.html'), type: 'directory', expectDirectory: true },
  { label: 'webp-converter', url: toolUrl('webp-converter'), type: 'tool', expectDirectory: true },
  {
    label: 'js-minifier',
    url: toolUrl('js-minifier'),
    type: 'tool',
    expectDirectory: true,
    relatedIconChecks: [
      { href: 'css-minifier.html', icon: '⚡' },
      { href: 'json-formatter.html', icon: '🧾' },
    ],
  },
  { label: 'pdf-merge', url: toolUrl('pdf-merge'), type: 'tool', expectDirectory: true },
  { label: 'bmi-calculator', url: toolUrl('bmi-calculator'), type: 'tool', expectDirectory: true },
  { label: 'text-cleaner', url: toolUrl('text-cleaner'), type: 'tool', expectDirectory: true },
  { label: 'base64', url: toolUrl('base64'), type: 'tool', expectDirectory: true },
  { label: 'length-converter', url: toolUrl('length-converter'), type: 'tool', expectDirectory: true },
];

const MOBILE_CASES = [
  { label: 'homepage', url: publicUrl('index.html'), type: 'site', expectDirectory: false },
  { label: 'webp-converter', url: toolUrl('webp-converter'), type: 'tool', expectDirectory: true },
  { label: 'image-tools', url: publicUrl('image-tools.html'), type: 'directory', expectDirectory: true },
];

function collectErrorBuckets(page) {
  const consoleErrors = attachConsoleErrorGuard(page);
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(String(error));
  });
  return { consoleErrors, pageErrors };
}

async function assertNoLaunchMojibake(page) {
  const result = await page.evaluate(() => {
    const tokenRe = /[鈥鈫脳璺婕]|路/;
    const bodyText = document.body ? document.body.innerText : '';
    const metadataText = Array.from(document.querySelectorAll('title, meta[name], meta[property], script[type="application/ld+json"]'))
      .map(node => {
        if (node.tagName === 'TITLE') return node.textContent || '';
        if (node.tagName === 'SCRIPT') return node.textContent || '';
        return [node.getAttribute('content') || '', node.getAttribute('name') || '', node.getAttribute('property') || ''].join(' ');
      })
      .join('\n');

    return {
      bodyMatches: bodyText.match(tokenRe) || [],
      metadataMatches: metadataText.match(tokenRe) || [],
    };
  });

  expect(result.bodyMatches, '页面可见文本存在 mojibake').toHaveLength(0);
  expect(result.metadataMatches, 'metadata / JSON-LD 存在 mojibake').toHaveLength(0);
}

async function assertToolHeaderAlignment(page) {
  const row = page.locator('.ds-tool-header__row').first();
  await expect(row).toBeVisible();
  const alignItems = await row.evaluate(node => getComputedStyle(node).alignItems);
  expect(alignItems).toBe('flex-start');
}

async function assertDesktopDirectoryBehavior(page) {
  const toggle = page.locator('[data-directory-collapse]').first();
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect.poll(async () => page.evaluate(() => document.body.classList.contains('ds-directory-is-collapsed'))).toBe(true);
  await toggle.click();
  await expect.poll(async () => page.evaluate(() => document.body.classList.contains('ds-directory-is-collapsed'))).toBe(false);
}

async function assertRelatedIcons(page, checks) {
  for (const check of checks || []) {
    const icon = page.locator(`.ds-related-card[href="${check.href}"] .ds-related-icon, .related-card[href="${check.href}"] .related-icon`).first();
    await expect(icon).toBeVisible();
    await expect(icon).toHaveText(check.icon);
  }
}

async function assertMobileDrawerBehavior(page) {
  const toggle = page.locator('[data-directory-toggle]').first();
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect.poll(async () => page.evaluate(() => document.body.classList.contains('ds-directory-drawer-open'))).toBe(true);
  await page.locator('[data-directory-close], [data-directory-backdrop]').first().click();
  await expect.poll(async () => page.evaluate(() => document.body.classList.contains('ds-directory-drawer-open'))).toBe(false);
}

async function openPage(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(250);
}

test.describe('Launch readiness smoke', () => {
  test('desktop representative pages stay stable', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'Desktop Chrome', '仅桌面项目执行');

    for (const item of DESKTOP_CASES) {
      const casePage = await page.context().newPage();
      const { consoleErrors, pageErrors } = collectErrorBuckets(casePage);
      await openPage(casePage, item.url);

      await expect(casePage.locator('h1').first()).toBeVisible();
      await expect(casePage.locator('#navSearch').first()).toBeVisible();
      await assertNoLaunchMojibake(casePage);

      if (item.expectDirectory) {
        await expect(casePage.locator('.ds-breadcrumb, .ds-breadcrumb-row').first()).toBeVisible();
      }

      if (item.type === 'tool') {
        await expect.poll(async () => casePage.evaluate(() => document.body.classList.contains('ds-tool-shell-ready'))).toBe(true);
        await assertToolHeaderAlignment(casePage);
      }

      if (item.relatedIconChecks) {
        await assertRelatedIcons(casePage, item.relatedIconChecks);
      }

      if (item.expectDirectory) {
        await assertDesktopDirectoryBehavior(casePage);
      }

      expect(pageErrors, `${item.label} 存在 pageerror`).toHaveLength(0);
      expect(consoleErrors().filter(text => !MOJIBAKE_RE.test(text)), `${item.label} 存在 console error`).toHaveLength(0);
      await casePage.close();
    }
  });

  test('mobile representative pages keep drawer and search usable', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'Mobile Chrome', '仅移动项目执行');

    for (const item of MOBILE_CASES) {
      const casePage = await page.context().newPage();
      const { consoleErrors, pageErrors } = collectErrorBuckets(casePage);
      await openPage(casePage, item.url);

      await expect(casePage.locator('h1').first()).toBeVisible();
      await expect(casePage.locator('#navSearch').first()).toBeVisible();
      await assertNoLaunchMojibake(casePage);

      if (item.expectDirectory) {
        await expect(casePage.locator('[data-directory-toggle]').first()).toBeVisible();
        await expect(casePage.locator('.ds-breadcrumb, .ds-breadcrumb-row').first()).toBeVisible();
        await assertMobileDrawerBehavior(casePage);
      }

      expect(pageErrors, `${item.label} 存在 pageerror`).toHaveLength(0);
      expect(consoleErrors().filter(text => !MOJIBAKE_RE.test(text)), `${item.label} 存在 console error`).toHaveLength(0);
      await casePage.close();
    }
  });
});
