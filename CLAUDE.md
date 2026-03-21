# Claude Code Handoff

## Working Rules

- Always reply in Chinese.
- Start with the conclusion, then list key steps.
- Before commands, edits, or tests, briefly say what you are about to do.
- After changes, explain files touched and key changes.
- Prefer the minimum necessary change.

## Unified Project Strategy

### Real Positioning

SimpleToolBox should be operated as a:

**Task-oriented online tool site**

Not:

- a pure developer-tools brand
- a heavy directory site
- a content blog

Users arrive with explicit task intent:

- compress
- convert
- extract
- format
- generate
- calculate
- inspect

That means:

- product organization can follow implementation efficiency
- front-end browsing should follow user language
- SEO should follow search intent

These three layers must stay aligned.

## Current Actual State (2026-03-21)

- **84 tool pages** are live.
- All 84 tools already use the unified SEO structure driven by `public/tools-meta.js` + `scripts/render-tool-sections.py`.
- `public/tools-data.js` is now the single shared data source for:
  - `public/index.html`
  - `public/all-tools.html`
  - `public/image-tools.html`
  - `public/developer-tools.html`
  - `public/text-tools.html`
- Hub pages already exist:
  - `public/image-tools.html`
  - `public/developer-tools.html`
  - `public/text-tools.html`
- Latest preflight is fully green:
  - metadata failures: 0
  - page load failures: 0
  - console errors: 0
  - smoke failures: 0
  - visual failures: 0

Reference:

- `reports/preflight-report.md`
- `QA.md`

## What Is Finished

### Engineering / QA

- Unified metadata-driven SEO block rendering
- Unified related-tools and learn-more structure
- Metadata validation
- Page audit
- Smoke tests
- Visual regression
- Preflight summary reporting

### Site Structure

- Homepage is data-driven
- `all-tools.html` is data-driven
- 3 hub pages are data-driven
- Tool pages are using a consistent DS-based skeleton

### Migration Status

Design-system migration is complete enough for current needs.

Do **not** treat the main task as “continue migration”.

The main task is now **growth with discipline**.

## Current Main Task

### Primary Goal

Expand from **84 → 100 → 150 → 500** tools without breaking the system.

This goal now has **three parallel constraints**:

1. growth
2. SEO / discoverability
3. tool competitiveness / usability

### Highest-Priority Direction

Based on current tool mix, the real expansion order should be:

1. **Image**
2. **Text**
3. **Calculators**
4. **Generators / Utility**
5. **Developer**
6. **PDF**

Reason:

- current project is already relatively strong in developer/encoding/conversion tools
- the next growth opportunity is broader task intent
- PDF is important long term but should not dominate the near-term roadmap

## What To Build Next

### Phase 1: 84 → 150

Goal: complete the category skeleton.

Recommended target mix:

- Image: grow aggressively
- Text: grow aggressively
- Calculators: grow carefully but steadily
- Utility / generators: fill common gaps
- Developer: keep adding only high-value holes
- PDF: only ship the pure-frontend subset that is genuinely usable

### Phase 2: 150 → 300

Goal: expand into scenario keywords.

Only after the category skeleton is credible, start pages like:

- resize image for instagram
- compress image for email
- resize image for passport
- json formatter for api response

### Phase 3: 300 → 500

Goal: build a keyword matrix and internal-link network.

At this stage, focus on:

- long-tail task variations
- hub pages
- workflow / chain pages
- winner-page expansion

## Tool Competitiveness Strategy

Coverage alone is not enough.

The site should not become “a large set of pages that technically exist”.

It should become:

**a large set of pages where users can complete tasks successfully with minimal friction**

### Core Principle

SEO brings the user in.

Tool competitiveness determines:

- whether the user succeeds
- whether the user returns
- whether the page earns trust
- whether the site becomes more than a keyword surface

### The 6 Usability Standards For Every Tool

1. **1-second comprehension**
   - users should understand the tool immediately from title, description, and first-screen UI
2. **1-step start**
   - paste / upload / type should be obvious without reading long instructions
3. **instant feedback**
   - option changes, preset clicks, sliders, and toggles should update output immediately
4. **recoverable failure**
   - empty input, invalid input, and boundary cases must not break the page
5. **easy result export**
   - copy / download / reset / retry must be frictionless
6. **real workflow fit**
   - presets, default values, and output choices should match real user tasks, not just technical capability

### What Usually Creates Competitive Advantage

Not just “having the feature”.

Usually the advantage comes from:

- better defaults
- clearer empty states
- fewer clicks
- immediate output
- useful presets
- smarter error states
- easier copy/download flow
- better mobile usability
- stronger next-step related tools

### Two Quality Tiers

#### Tier A: tools worth heavy polishing

These deserve extra effort:

- high-frequency image tools
- high-frequency text tools
- common calculators
- homepage / hub / popular tools

For these tools, aim to be **better than alternatives**, not just present.

#### Tier B: tools worth fast but solid coverage

These need:

- clear purpose
- stable logic
- good metadata
- good mobile layout
- usable output flow

But they do not need deep product investment immediately.

### New Tool Product Check

Before shipping a new tool, check:

- Is the purpose obvious in one glance?
- Can a first-time user start in one step?
- Does changing inputs update results fast enough?
- Are default options sensible?
- Is at least one realistic example / preset included?
- Are error states human-readable?
- Is output easy to copy / download?
- Is mobile use still practical?
- Do related tools reflect the natural next step?

### Top Tool Strengthening

Once search data begins to show winner pages, strengthen those pages with:

- better defaults
- faster workflow
- more realistic presets
- richer output controls
- stronger related-tool sequencing
- more task-specific FAQs
- better mobile ergonomics

## What Not To Do Yet

- Do not prioritize large-scale PDF expansion yet
- Do not mass-produce AI writing tools
- Do not mass-produce scenario pages before the category skeleton exists
- Do not start multilingual expansion yet
- Do not create near-duplicate keyword swap pages

## Front-End / Information Architecture Rules

### URL Types

Use four page types long term:

1. Tool pages
   - `/tools/base64`
   - `/tools/image-compressor`
2. Hub pages
   - `/image-tools`
   - `/developer-tools`
   - `/text-tools`
3. Scenario pages
   - `/resize-image-for-instagram`
   - `/compress-pdf-for-email`
4. Workflow / chain pages
   - `/image-resize-and-compress`
   - `/json-format-and-validate`

### Homepage

Homepage is:

**brand entry + high-click tool entry + internal-link distribution**

It should not become:

- a long article
- a giant directory dump
- a heavy nav page

### All Tools

`public/all-tools.html` should be treated as:

**a find system**

Not a classic left-sidebar directory.

Priorities:

- search
- category grouping
- popular tools
- new / updated
- clean scanability

### Tool Pages

Keep the current standard:

1. H1
2. short description
3. working tool UI
4. trust/privacy hint
5. related tools
6. learn more (collapsed)

Do not move SEO content above the working tool.

## Shared Data Rules

### `public/tools-data.js`

This is the only shared tool list source.

After adding a tool:

1. append it to `SITE_TOOLS`
2. update `HUB_PAGE_CONFIG` if needed
3. do not manually maintain separate tool lists in hub pages

### `public/tools-meta.js`

This is the source of:

- structured data
- SEO content
- related tools
- learn more
- FAQ

After adding a tool:

1. add a complete metadata entry
2. run `python scripts/render-tool-sections.py <slug>`
3. do not hand-write unique SEO block HTML structures unless strictly necessary

## New Tool Page Checklist

Every new tool page must:

1. link `../styles/design-system.css?v=20`
2. use `ds-tool-nav`, `ds-tool-header`, `ds-tool-main`
3. keep the tool UI in the first screen
4. include unique:
   - `title`
   - `meta description`
   - canonical
   - og tags
5. include marker pairs:
   - `AUTO-STRUCTURED-DATA`
   - `AUTO-SEO-SECTIONS`
6. have complete metadata in `public/tools-meta.js`
7. be indexed in `public/tools-data.js`
8. be added to `public/sitemap.xml`
9. pass the product check above, not just the SEO / QA checklist

## Interaction Quality Checklist

Every grouped control must:

- define an `.active` state
- update `.active` in JS immediately on click
- update output/preview immediately in the same handler

Every copy/action button must:

- show temporary success state (`Copied`, `Done`, etc.)

Every preset click that changes input value must:

- trigger result refresh immediately

## QA Rules

### Low-Risk Changes

Examples:

- one-tool logic fix
- one-tool copy change
- FAQ/update on one page

Minimum:

- `python scripts/validate-tools.py <slug>`
- relevant smoke test when available

### Medium-Risk Changes

Examples:

- new tools
- `tools-data.js`
- `tools-meta.js`
- SEO render flow
- shared hub/all-tools/home data logic

Minimum:

- `python scripts/check-tools-meta.py`
- `python scripts/validate-tools.py`
- `python scripts/page-audit.py`
- `python scripts/generate-report.py`

### High-Risk Changes

Examples:

- design system CSS
- global layout
- shared nav / hero / footer / SEO output structure

Minimum:

- full validate
- full page audit
- smoke
- visual
- preflight report

## Success Metrics

Do not optimize for total page count alone.

Track these instead:

1. impressions added per 100 new tools
2. percentage of tools with search visibility
3. traffic concentration in top tools
4. related-tools click-through behavior
5. whether hub pages begin to rank
6. whether users can complete the task with low friction

Practical signals for tool competitiveness:

- fewer abandoned flows on key tools
- higher repeat use on the same tools
- more related-tool clicks after successful completion
- fewer obvious UX regressions when comparing against competing tools

## Files To Read First

If taking over work, read:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `MEMORY.md`
4. `QA.md`
5. `reports/preflight-report.md`
