# Claude Code Handoff

## Working Rules

- Always reply in Chinese.
- Start with the conclusion, then key steps.
- Before commands, edits, or tests, briefly say what you are about to do.
- After code changes, mention the touched files and the key changes.
- Prefer the minimum necessary change.

## Current Actual State (2026-03-28)

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
- Product Hunt launch date: **2026-03-29**
- Latest preflight remains fully green:
  - metadata failures: 0
  - page load failures: 0
  - console errors: 0
  - smoke failures: 0
  - visual failures: 0

## What Was Finished Recently

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

## Tool Shell Migration Snapshot (2026-03-28)

The tool-page left-rail migration is not blocked by the shell itself.
The real blocker is legacy page debt plus incomplete page contracts.

Current 201-page split:

- `12` pages can be migrated directly
- `128` pages need encoding / bad-tag cleanup first, then can be batch-migrated
- `61` pages need manual one-by-one handling because they also have structural gaps

### Direct-Migration Set

Current clean batch:

- `base64`
- `css-minifier`
- `js-formatter`
- `aes`
- `color-palette`
- `contrast-checker`
- `countdown`
- `gradient-generator`
- `html-formatter`
- `roman-numerals`
- `url-builder`
- `url-encode`

### Main Failure Modes

- legacy mojibake / dirty characters
- broken closing tags that only surface after shell wiring changes
- missing `ds-tool-main`
- missing required SEO slots:
  - `What is ...`
  - `How to Use ...`
- duplicate shell initialization

Confirmed real pitfall:

- `tool-page-icon.js` can trigger `initSiteNavigation()` after `site-navigation.js` already initialized
- without idempotent guards, the directory collapse button is double-bound and appears unclickable

### Migration Order

Do not mix groups.

1. Migrate the `12` direct pages first.
2. Run cleanup on the `128` dirty-but-structurally-usable pages, then batch-migrate them.
3. Leave the `61` structural outliers for manual handling.

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
