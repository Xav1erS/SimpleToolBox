# Claude Code Handoff

## Working Rules

- Always reply in Chinese.
- Start with the conclusion, then key steps.
- Before commands, edits, or tests, briefly say what you are about to do.
- Prefer the minimum necessary change.

## Current Actual State (2026-03-26)

- Tool count: **201**
- Site pages migrated: `index`, `all-tools`, `about`, `privacy`, `terms`, `contact`
- Hub pages live and data-driven:
  - `image-tools`
  - `developer-tools`
  - `text-tools`
  - `calculator-tools`
  - `converter-tools`
  - `generator-tools`
  - `pdf-tools` — 11 tools: pdf-to-image, image-to-pdf, pdf-page-counter, pdf-compress, pdf-merge, pdf-split, pdf-rotate-pages, pdf-extract-text, pdf-metadata-viewer, pdf-add-watermark, pdf-to-markdown
- `public/tools-data.js` is the shared source for homepage, all-tools, and hub pages.
- `public/tools-meta.js` is the shared source for JSON-LD, FAQ, learn-more, and related tools.
- Latest preflight is fully green:
  - metadata failures: 0
  - page load failures: 0
  - console errors: 0
  - smoke failures: 0
  - visual failures: 0

### Recent changes (this session)

- `all-tools.html` 重构：JS 渲染替代 156 条静态卡片，分组展示（All 模式），Popular / Recently Used 嵌入内容区，筛选栏层级修正
- 全站定位从 "developer tools" 统一为 "everyday tasks"：index/about/all-tools meta、title、footer tagline、schema 全部更新
- 首页 Popular Tools 重排：image/text 工具置顶，去掉 URL Encode / JWT，补入 BMI Calculator / Color Picker
- 首页顺序调整：Popular Tools → New Tools（原反）
- 首页 features：用 "No Upload Required" 替换 "Easy on the Eyes"
- 首页 stats：0 "Sign-up Required" → 0 "Data Collected"
- 首页 footer Tools 区：占位 `#` 链接 → 真实 hub 页链接
- 所有 156 个工具页注入 `stb_recent` localStorage tracking snippet（跨页面记录 Recently Used）

Reference:

- [`C:\Users\Windows11\Documents\GitHub\SimpleToolBox\reports\preflight-report.md`](C:\Users\Windows11\Documents\GitHub\SimpleToolBox\reports\preflight-report.md)
- [`C:\Users\Windows11\Documents\GitHub\SimpleToolBox\QA.md`](C:\Users\Windows11\Documents\GitHub\SimpleToolBox\QA.md)

## What Was Finished Recently

### Growth

Added 6 new text tools:

- `duplicate-line-remover`
- `line-sorter`
- `list-deduplicator`
- `whitespace-trimmer`
- `sentence-counter`
- `keyword-density-checker`

### Recovery / Stabilization

Repaired a batch of old reference pages:

- `port-reference`
- `mime-types`
- `http-status`
- `ascii-table`
- `ip-lookup`

These fixes included:

- restoring lost runtime scripts
- restoring missing local styles
- reconnecting old pages to `ds-card` / `ds-tool-main` structure where needed

### Footer Root-Cause Fix

The footer problem was not only CSS.

Real cause:

- many tool pages had missing closing tags
- `footer` ended up nested inside `.main` / `.ds-tool-main`

This has now been batch-fixed so footer is back under `body`.

### QA Hardening

- `scripts/validate-tools.py` now guards against missing runtime interaction scripts
- `scripts/generate-report.py` now handles local `node/npx` path detection more reliably

## Real Main Task

Do **not** treat the project as “continue migration”.

That phase is no longer the main storyline.

The real task is now:

### grow from 106 to 150 with discipline, while keeping QA green and tools actually useful

This means every decision must balance:

1. growth
2. discoverability / SEO
3. usability / competitiveness

## Expansion Order

Current priority order:

1. **Image**
2. **Text**
3. **Calculators**
4. **Generators / Utility**
5. **Developer**
6. **PDF**

Reason:

- developer/encoding/conversion coverage is already decent
- image/text/calculator tools match broader task intent
- PDF remains important long term but should not dominate near-term work

## Tool Competitiveness Strategy

SimpleToolBox must not become only a large set of pages that technically exist.

It must become a large set of pages where users can finish tasks with low friction.

### The 6 Usability Standards

1. **1-second comprehension**
2. **1-step start**
3. **instant feedback**
4. **recoverable failure**
5. **easy result export**
6. **real workflow fit**

### High-Polish Tier

Spend more product effort on:

- high-frequency image tools
- high-frequency text tools
- common calculators
- homepage / hub / popular tools

### Coverage Tier

For medium/long-tail pages, first ensure:

- clear purpose
- stable logic
- mobile usability
- copy/download flow
- complete metadata

## Architecture Rules

### Shared Data

`public/tools-data.js` is the only shared tool list source.

After adding a tool:

1. add it to `SITE_TOOLS`
2. update `HUB_PAGE_CONFIG` when relevant
3. do not maintain separate manual lists in hub pages or all-tools

### Shared Metadata

`public/tools-meta.js` is the source of:

- structured data
- SEO content
- related tools
- learn-more
- FAQ
- how-to steps

After adding a tool:

1. add a complete metadata entry
2. run `python scripts/render-tool-sections.py <slug>`
3. avoid custom one-off SEO HTML

### Icon Rule

`public/tools-data.js` `icon` is the single source of truth.

- tool page header
- all-tools
- hub pages

must stay aligned with it.

Prefer emoji as the final icon system.

## Current Constraints

- Some legacy pages still contain minor visible mojibake or older copy quality issues.
- Legacy `reference` pages are now usable; do not sink unlimited time into cosmetic micro-fixes.
- If a legacy-page issue does not affect functionality, structure, or user comprehension, it is lower priority than new high-value tools.

## QA Rules

### Low Risk

Examples:

- single-tool logic fix
- single-tool copy update

Run at least:

- `python scripts/validate-tools.py <slug>`

### Medium Risk

Examples:

- new tools
- `tools-data.js`
- `tools-meta.js`
- SEO render changes

Run:

- `python scripts/validate-tools.py`
- `python scripts/page-audit.py`
- `python scripts/generate-report.py`

### High Risk

Examples:

- design system CSS
- global layout
- shared nav / footer / templates

Run:

- full validate
- full page audit
- smoke
- visual
- preflight

## Immediate Next Step

Highest priority now:

### PDF 工具增长（第一批）

当前 156 工具中无任何 PDF 工具，是明显覆盖空白。优先实现：

1. `pdf-to-image` — 用 PDF.js 渲染页面到 canvas，下载为 PNG/JPEG（需求最高）
2. `image-to-pdf` — 用 jsPDF 把多张图片合并为 PDF（高需求，互补）

实现后：

- 更新 `tools-data.js`（tag: `convert`）
- 更新 `tools-meta.js`
- 更新 `converter-tools.html` hub 页
- 运行 `python scripts/validate-tools.py`
- 运行完整 preflight

## Files To Read First

If taking over work, read in this order:

1. [`C:\Users\Windows11\Documents\GitHub\SimpleToolBox\AGENTS.md`](C:\Users\Windows11\Documents\GitHub\SimpleToolBox\AGENTS.md)
2. [`C:\Users\Windows11\Documents\GitHub\SimpleToolBox\CLAUDE.md`](C:\Users\Windows11\Documents\GitHub\SimpleToolBox\CLAUDE.md)
3. [`C:\Users\Windows11\Documents\GitHub\SimpleToolBox\MEMORY.md`](C:\Users\Windows11\Documents\GitHub\SimpleToolBox\MEMORY.md)
4. [`C:\Users\Windows11\Documents\GitHub\SimpleToolBox\QA.md`](C:\Users\Windows11\Documents\GitHub\SimpleToolBox\QA.md)
5. [`C:\Users\Windows11\Documents\GitHub\SimpleToolBox\reports\preflight-report.md`](C:\Users\Windows11\Documents\GitHub\SimpleToolBox\reports\preflight-report.md)
