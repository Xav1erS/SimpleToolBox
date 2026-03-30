# Claude Code Handoff

## Working Rules

- Always reply in Chinese.
- Start with the conclusion, then key steps.
- Before commands, edits, or tests, briefly say what you are about to do.
- After code changes, mention the touched files and the key changes.
- Prefer the minimum necessary change.
- After completing each task, suggest 2–3 concrete next steps relevant to the current project state.

## Current Actual State (2026-03-30)

- Tool count: **201**
- Site pages migrated: `index`, `all-tools`, `about`, `privacy`, `terms`, `contact`
- Hub pages live and data-driven:
  - `image-tools`
  - `developer-tools`
  - `text-tools`
  - `calculator-tools`
  - `converter-tools`
  - `generator-tools`
  - `pdf-tools`
  - `all-tools`
- `public/tools-data.js` is the shared source for homepage, all-tools, and hub pages.
- `public/tools-meta.js` is the shared source for JSON-LD, FAQ, learn-more, and related tools.
- Product Hunt launched: **2026-03-29** (live)
- Latest QA: 201/201 pass, 0 errors, 0 warnings
- Full lightweight smoke: **201/201 pass**
- Launch-health audit: **mojibake 0 / inline script syntax 0 / missing header row 0 / missing tool-page-icon.js 0**

## Remaining Non-Blocking Debt (2026-03-30)

- What is cleared (as of 2026-03-30):
  - all user-visible mojibake
  - inline-script syntax breakage
  - lightweight runtime blockers detectable on first load
  - missing `ds-tool-header__row`
  - missing `tool-page-icon.js`
  - all CJK in HTML content areas (tool pages + site pages)
  - all CJK in `<script>`/`<style>` blocks (except intentional — see below)
  - missing `ds-tool-main` across all 201 pages
  - missing `What is ...` SEO section across all 201 pages
  - missing `How to Use ...` SEO section across all 201 pages
  - manual group structural gaps (was 61 pages, now 0)
- What is still not fully cleared:
  - `70` tool pages do not statically reference `site-navigation.js`
  - many of those still work because navigation is dynamically loaded by `tool-page-icon.js`
  - actual shared-shell migration has NOT been performed — pages are structurally ready but the shell wiring (STB_PAGE_CONTEXT + site-navigation.js + ds-tool-context) has not been attached
  - `lorem-ipsum-generator`: intentional Chinese text in `<button class=”theme-btn” data-theme=”chinese”>` — permanent accepted exception
- Correct phrasing:
  - **all encoding/structural pre-conditions for shell migration are cleared**
  - **actual shared-shell wiring is not done yet**

## What Was Finished Recently

### Full Encoding / Icon Corruption Fix Pass (2026-03-29)

All known GBK-corruption artefacts in tool pages and site pages have been resolved.

- **`scripts/fix-encoding-corruption.py`** (pre-existing): fixed 4 tool pages that had CJK mojibake in content (image-compressor, image-resizer, markdown-preview, timestamp).
- **`scripts/fix-icon-corruption.py`** (new script): mapping-based reversal of GBK-corrupted emoji icons across 79 tool pages. Reads authoritative icon from `tools-data.js`, computes expected corrupted form, replaces in HTML (skipping `<script>`/`<style>` blocks).
- **Header layout fix** (10 pages): added missing `ds-tool-header__row` flex wrapper so icon and title appear on the same row (aes, color-palette, contrast-checker, countdown, gradient-generator, html-formatter, json-csv, roman-numerals, url-builder, user-agent).
- **Bare closing tag fix** (31 pages, 53 occurrences): after icon replacement, some pages had `emoji/div>` instead of `emoji</div>`. Fixed with regex adding the missing `<`.
- **`public/index.html`**: fixed `璺? v1.0` → `&middot; v1.0` (hero badge), `婕?2026` → `&copy; 2026` (footer), `&#x2713;` → `&#x2705;` (feature card icon).
- **`public/privacy.html`** and **`public/terms.html`**: fixed `路` (U+8DEF, GBK corruption of `&middot;`) → `&middot;` in the document meta line.
- **`public/tools/js-formatter.html`**: removed `max-width: 11ch` inline style from tool header title.
- **`public/all-tools.html`** and **`public/about.html`** / **`public/contact.html`**: remaining CJK chars are all inside `<script>` blocks (rawIcon detection regex) or JS comments — intentional, no fix needed. `all-tools.html` is self-healing via `normalizeStaticLabels()` and `CATEGORY_SECTIONS.splice()` at runtime.

### Full Runtime Stability Sweep (2026-03-29)

To stop relying on manual discovery, the repo now has a real first-load runtime sweep for all 201 tools.

- **`tests/smoke/all-tools-light.test.js`**
  - opens every tool page
  - checks `h1`
  - checks a main content container
  - fails on `pageerror`
  - fails on critical `console error`
- **`scripts/audit-launch-health.py`**
  - now checks inline-script syntax in addition to mojibake
- **`tests/smoke/password-generator.test.js`**
  - upgraded from “elements exist” to “tool actually works”
- Representative repaired pages in this pass include:
  - `password-generator`
  - `color-converter`
  - `currency-converter`
  - `text-to-speech`
  - `pdf-split`
  - `pdf-extract-text`
  - `pdf-to-markdown`
  - `tax-calculator`
  - `scientific-calculator`
  - `lorem-ipsum-generator`
  - `random-number-generator`
- Current result:
  - `npx playwright test tests/smoke/all-tools-light.test.js --project="Desktop Chrome"` passes
  - `python scripts/audit-launch-health.py` reports `Inline script syntax errs: 0`

### Growth to 201

The project has already crossed the 200-tool milestone.

Major recent additions include:

- Image: `webp-to-png`, `image-sepia`, `image-vignette`, `image-tint`, `image-noise`
- Text: `reading-time-estimator`, `text-repeater`, `text-statistics`, `remove-line-breaks`, `remove-duplicate-words`, `word-scrambler`
- Calculators: `tax-calculator`, `body-fat-calculator`, `scientific-calculator`, `retirement-calculator`, `time-duration-calculator`, `aspect-ratio-calculator`, `pace-calculator`, `tip-splitter`, `age-in-days`, `loan-amortization-calculator`
- Generator / Design: `color-scheme-generator`, `css-box-shadow-generator`, `placeholder-image-generator`, `random-color-generator`, `gradient-text-generator`
- Developer: `binary-calculator`
- PDF: `pdf-to-image`, `image-to-pdf`, `pdf-page-counter`, `pdf-compress`, `pdf-merge`, `pdf-split`, `pdf-rotate-pages`, `pdf-extract-text`, `pdf-metadata-viewer`, `pdf-add-watermark`, `pdf-to-markdown`

### Site Positioning Unification

- The site positioning has been unified from “developer tools” to “everyday tasks”.
- Homepage copy, schema, and meta were updated accordingly.

### all-tools Refactor

- `all-tools.html` was rebuilt around JS rendering instead of static cards.
- Popular / Recently Used were embedded into the content flow.
- Filter-bar layering issues were fixed.

### Homepage Improvements

- Popular Tools reordered to emphasize image / text tools.
- New Tools section was expanded.
- Footer tool links now point to real hub pages instead of placeholders.
- Stats copy was refreshed.

### Tool-Page Baseline

- All 201 tool pages now include the `stb_recent` localStorage tracking snippet.
- `og:image`, `twitter:card: summary_large_image`, and `apple-touch-icon` were filled in.

## Real Main Task

Do **not** treat the project as “finish migration at all costs”.

The real task is now:

### grow from 201 to 300 with discipline, while keeping QA green and tools actually useful

Every decision should balance:

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

## Tool Competitiveness Strategy

SimpleToolBox should not become only a large set of pages that technically exist.

It must become a large set of pages where users can finish tasks with low friction.

### The 6 Usability Standards

1. **1-second comprehension**
2. **1-step start**
3. **instant feedback**
4. **recoverable failure**
5. **easy result export**
6. **real workflow fit**

## Architecture Rules

### Shared Data

`public/tools-data.js` is the only shared tool list source.

After adding a tool:

1. add it to `SITE_TOOLS`
2. update `HUB_PAGE_CONFIG` when relevant
3. keep tags within the valid set:
   - `image`
   - `text`
   - `encode`
   - `format`
   - `convert`
   - `calculator`
   - `generate`
   - `reference`
   - `design`
   - `pdf`

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
2. render the SEO sections as required by the repo workflow
3. avoid custom one-off SEO HTML

### Icon Rule

`public/tools-data.js` `icon` is the single source of truth.

- tool page header
- all-tools
- hub pages

must stay aligned with it.

Prefer emoji as the final icon system.

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

### Additional Stability Rule

For launch-stability work, passing `validate-tools.py` alone is not enough.

Minimum extra checks should now include:

- `npx playwright test tests/smoke/all-tools-light.test.js --project="Desktop Chrome"`
- `python scripts/audit-launch-health.py`

## Tool Shell Migration Snapshot (2026-03-30)

All structural pre-conditions are now cleared. The blocker was legacy page debt — that is gone.

Current 201-page split:

- `200` pages are ready for direct shell migration
- `1` page (lorem-ipsum-generator) remains in cleanup due to **intentional** Chinese text — permanent exception
- `0` pages in the manual group (was 61)

### What was done to clear the debt (2026-03-30)

New scripts created this session:

- **`scripts/fix-cleanup-dirty.py`**: fixed 33 cleanup pages (ds-related-icon corruption, emoji in HTML comments, specific symbol corrections)
- **`scripts/fix-cleanup-remaining.py`**: fixed 14 remaining cleanup pages (own icons, U+9200 separators, uuid checkmarks, jwt dots, calorie gender, slug placeholder)
- **`scripts/fix-how-to-use.py`**: 22 heading renames ("How to Convert X" → "How to Use [Tool Name]") + 4 new How to Use sections added
- **`scripts/fix-full-structure.py`**: 14 pages fixed (ds-tool-main + What is + How to Use each)
- **`scripts/fix-manual-remaining.py`**: 21 manual-group pages fixed (patterns A/B/C)
- **`scripts/fix-script-cjk.py`**: 72 cleanup pages cleaned of script/style block CJK (JS comment strip + \uXXXX escaping for string literals)

### Direct-Migration Set

All 200 structurally ready pages. The original 12-page "gold standard" batch remains valid as a first wave:

- `base64`, `css-minifier`, `js-formatter`, `aes`, `color-palette`, `contrast-checker`, `countdown`, `gradient-generator`, `html-formatter`, `roman-numerals`, `url-builder`, `url-encode`

### Main Failure Modes (historical — cleared)

- legacy mojibake / dirty characters ✓ cleared
- broken closing tags ✓ cleared
- missing `ds-tool-main` ✓ cleared
- missing `What is ...` / `How to Use ...` ✓ cleared
- structural outliers (61 manual pages) ✓ cleared

Remaining confirmed pitfall (still applies to shell wiring work):

- `tool-page-icon.js` can trigger `initSiteNavigation()` after `site-navigation.js` already initialized
- without idempotent guards, the directory collapse button is double-bound and appears unclickable

### Next Step

Perform actual shell migration: add `window.STB_PAGE_CONTEXT`, `site-navigation.js`, and `ds-tool-context` to the 200 ready pages.

Start with the 12 gold-standard pages, verify, then batch the remaining 188.

### Completion Bar

A tool page should not be considered fully migrated unless it includes all of:

- shared `nav.ds-nav#nav`
- `window.STB_PAGE_CONTEXT = { pageType: 'tool', slug }`
- `site-navigation.js`
- `ds-tool-context`
- standard SEO block order:
  - `.ds-seo-content`
  - `.ds-related-tools`
  - `.ds-seo-more`

## Hard Rules To Prevent Repeat Failures

- All batch edits of HTML / CSS / JS must be written back as UTF-8.
- Before any shared-shell migration work, run:

```bash
python scripts/audit-tool-shell-migration.py
```

- For a single page, run:

```bash
python scripts/audit-tool-shell-migration.py <slug>
```

- Do not move a page into batch migration if the audit reports:
  - `dirty_markup`
  - `partial_shared_shell`
  - `missing_ds_tool_main`
  - `missing_what_section`
  - `missing_how_section`
- Shared initialization code must stay idempotent:
  - no duplicate event binding
  - no duplicate shell insertion
  - no silent state rollback on repeated init
- Shared-shell work is not complete until someone confirms:
  - directory collapse actually changes state
  - breadcrumb still works
  - top search still works
  - SEO / related / footer were not structurally broken

## Additional Prevention Rules

- Do not combine shell rewiring, SEO skeleton rewiring, and tool-specific feature work in one large patch.
- Shared behaviors must have a single owner.
  - If `site-navigation.js` owns the directory shell, other scripts should not manually re-run the same initialization unless it is explicitly idempotent.
- After changing shared scripts or shared CSS, always invalidate cache on migrated pages.
- Do not stack new features onto dirty legacy pages first.
  - Clean encoding and broken tags first.
  - Then attach the shared shell.
  - Then refine UI or behavior.
- For high-risk shared changes, always sample across page types, not just the current page:
  - one text / developer page
  - one calculator page
  - one image or PDF page
  - one already-migrated gold-standard page
- Desktop and mobile verification are both required for shared layout work.
- Prefer HTML entities for punctuation / symbols that often break under dirty encoding pipelines.
- Batch migrations should use small verified waves.
- Treat “valid HTML + passing QA” as insufficient for shared-shell work.
- If `audit-tool-shell-migration.py` classifies a page as `cleanup` or `manual`, do not skip that classification just to keep a batch moving.
