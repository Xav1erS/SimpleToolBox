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

// Site pages (non-tool), in priority order
const SITE_PAGES = [
  { path: '/',                  priority: '1.0', changefreq: 'weekly' },
  { path: '/all-tools',         priority: '0.7', changefreq: 'weekly' },
  { path: '/image-tools',       priority: '0.7', changefreq: 'weekly' },
  { path: '/developer-tools',   priority: '0.7', changefreq: 'weekly' },
  { path: '/text-tools',        priority: '0.7', changefreq: 'weekly' },
  { path: '/about',             priority: '0.4', changefreq: 'monthly' },
  { path: '/contact',           priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy',           priority: '0.3', changefreq: 'yearly' },
  { path: '/terms',             priority: '0.3', changefreq: 'yearly' },
];

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

// Collect all tool slugs from directory
const toolSlugs = fs
  .readdirSync(TOOLS_DIR)
  .filter(f => f.endsWith('.html'))
  .map(f => f.replace('.html', ''))
  .sort();

const entries = [];

entries.push('  <!-- Site pages -->');
for (const page of SITE_PAGES) {
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
console.log(`sitemap.xml updated: ${SITE_PAGES.length} site pages + ${toolSlugs.length} tools = ${SITE_PAGES.length + toolSlugs.length} URLs`);
