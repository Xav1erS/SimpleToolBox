#!/usr/bin/env node
/**
 * gen-sitemap.js
 * Generates public/sitemap.xml from the current state of public/tools/*.html
 *
 * Usage: node scripts/gen-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'public', 'tools');
const SITEMAP_PATH = path.join(ROOT, 'public', 'sitemap.xml');
const BASE = 'https://simpletoolbox.dev';
const TODAY = new Date().toISOString().slice(0, 10);

const PUBLIC_DIR = path.join(ROOT, 'public');

// Explicit metadata for known root-level pages. Any other public/*.html file
// falls back to the default config below so newly added pages are not missed.
const SITE_PAGE_META = {
  index: { path: '/', priority: '1.0', changefreq: 'weekly', order: 0 },
  'all-tools': { path: '/all-tools', priority: '0.7', changefreq: 'weekly', order: 1 },
  'image-tools': { path: '/image-tools', priority: '0.7', changefreq: 'weekly', order: 2 },
  'developer-tools': { path: '/developer-tools', priority: '0.7', changefreq: 'weekly', order: 3 },
  'text-tools': { path: '/text-tools', priority: '0.7', changefreq: 'weekly', order: 4 },
  'converter-tools': { path: '/converter-tools', priority: '0.7', changefreq: 'weekly', order: 5 },
  'generator-tools': { path: '/generator-tools', priority: '0.7', changefreq: 'weekly', order: 6 },
  'calculator-tools': { path: '/calculator-tools', priority: '0.7', changefreq: 'weekly', order: 7 },
  'pdf-tools': { path: '/pdf-tools', priority: '0.7', changefreq: 'weekly', order: 8 },
  'design-tools': { path: '/design-tools', priority: '0.7', changefreq: 'weekly', order: 9 },
  'reference-tools': { path: '/reference-tools', priority: '0.7', changefreq: 'weekly', order: 10 },
  about: { path: '/about', priority: '0.4', changefreq: 'monthly', order: 20 },
  contact: { path: '/contact', priority: '0.3', changefreq: 'yearly', order: 21 },
  privacy: { path: '/privacy', priority: '0.3', changefreq: 'yearly', order: 22 },
  terms: { path: '/terms', priority: '0.3', changefreq: 'yearly', order: 23 },
  'regex-patterns': { path: '/regex-patterns', priority: '0.5', changefreq: 'monthly', order: 30 },
  'image-formats-guide': { path: '/image-formats-guide', priority: '0.5', changefreq: 'monthly', order: 31 },
  'pdf-page-sizes': { path: '/pdf-page-sizes', priority: '0.5', changefreq: 'monthly', order: 32 },
  'date-time-format-reference': { path: '/date-time-format-reference', priority: '0.5', changefreq: 'monthly', order: 33 },
  'json-formatting-guide': { path: '/json-formatting-guide', priority: '0.5', changefreq: 'monthly', order: 34 },
  'http-status-codes-explained': { path: '/http-status-codes-explained', priority: '0.5', changefreq: 'monthly', order: 35 },
  'mime-types-guide': { path: '/mime-types-guide', priority: '0.5', changefreq: 'monthly', order: 36 },
  'color-format-reference': { path: '/color-format-reference', priority: '0.5', changefreq: 'monthly', order: 37 },
};

const EXCLUDED_SITE_PAGES = new Set(['design-system']);
const DEFAULT_SITE_PAGE = { priority: '0.5', changefreq: 'monthly', order: 1000 };

function urlEntry(loc, changefreq, priority) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${TODAY}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

// Collect root-level site pages from public/*.html
const sitePages = fs
  .readdirSync(PUBLIC_DIR)
  .filter(f => f.endsWith('.html'))
  .map(f => f.replace('.html', ''))
  .filter(slug => !EXCLUDED_SITE_PAGES.has(slug))
  .map(slug => {
    const meta = SITE_PAGE_META[slug] || DEFAULT_SITE_PAGE;
    return {
      slug,
      path: SITE_PAGE_META[slug]?.path || `/${slug}`,
      priority: meta.priority,
      changefreq: meta.changefreq,
      order: meta.order,
    };
  })
  .sort((a, b) => (a.order - b.order) || a.path.localeCompare(b.path));

// Collect all tool slugs from directory
const toolSlugs = fs
  .readdirSync(TOOLS_DIR)
  .filter(f => f.endsWith('.html'))
  .map(f => f.replace('.html', ''))
  .sort();

const entries = [];

entries.push('  <!-- Site pages -->');
for (const page of sitePages) {
  entries.push(urlEntry(`${BASE}${page.path}`, page.changefreq, page.priority));
}

entries.push('');
entries.push('  <!-- Tools -->');
for (const slug of toolSlugs) {
  entries.push(urlEntry(`${BASE}/tools/${slug}`, 'monthly', '0.8'));
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  '',
  ...entries,
  '',
  '</urlset>',
].join('\n') + '\n';

fs.writeFileSync(SITEMAP_PATH, xml, 'utf-8');
console.log(`sitemap.xml updated: ${sitePages.length} site pages + ${toolSlugs.length} tools = ${sitePages.length + toolSlugs.length} URLs`);
