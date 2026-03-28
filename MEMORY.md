# SimpleToolBox Memory

## Current Snapshot (2026-03-28)

- Tool count: **201**
- Shared tool list source: `public/tools-data.js`
- Shared metadata source: `public/tools-meta.js`
- Latest preflight: fully green
- Main phase: **growth-first**, with disciplined shell migration where appropriate

## Active Frame

Correct active frame:

**201 tools, QA green, shared architecture stable, continue disciplined expansion toward 300.**

## Real Current Focus

The focus is no longer:

- polishing old pages without a clear reason
- treating migration as the only storyline

The real focus is:

1. grow from **201 to 300**
2. keep QA green
3. keep shared data / template architecture converging
4. improve tool competitiveness in parallel

## Priority Order

Current expansion order:

1. Image
2. Text
3. Calculators
4. Generators / Utility
5. Developer
6. PDF

## Tool Quality Reminder

A page only has strategic value if the user can actually finish the task after landing.

Always ask:

- Is the tool obvious on first view?
- Can it be started immediately?
- Does it recover from common bad input?
- Is output easy to copy / download?
- Does it feel smooth on mobile?
- Does it create a natural next step through related tools?

## Current Constraints

- Some legacy pages still have minor copy / encoding debt.
- That debt is lower priority than adding high-value new tools unless it breaks usability.
- Legacy cleanup should be bug-driven, not open-ended.

## Near-Term Direction

Suggested next-batch candidates:

1. calculator: `currency-converter-live`, `unit-price-calculator`, `sleep-calculator`
2. image: `image-border-radius-preview`
3. text: `text-to-morse`, `nato-alphabet`, `pig-latin-converter`

## Tool Shell Migration Snapshot (2026-03-28)

This is not mainly a “shell is hard” problem.
It is a “legacy page debt + contract mismatch” problem.

### Current 201-page split

- `12` pages can be migrated directly
- `128` pages should be cleaned first, then batch-migrated
- `61` pages need manual one-by-one handling

### Why the first migrated pages were painful

- old mojibake and dirty characters
- broken closing tags that become visible after shell rewiring
- some pages only partially matched the shell contract
- duplicate initialization between shared scripts

Confirmed example:

- `tool-page-icon.js` and `site-navigation.js` can both initialize the directory shell
- this can double-bind the left-rail collapse button
- symptom: the button looks like it does not work because one handler undoes the other

### Current best reference pages

Direct migration candidates already closest to the target shell:

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

### Migration rule going forward

Never mix these three stages:

1. direct pages first
2. dirty-but-usable pages after cleanup
3. structural outliers last

Do not treat a page as “migrated” unless it has:

- shared `nav.ds-nav#nav`
- `STB_PAGE_CONTEXT`
- `site-navigation.js`
- `ds-tool-context`
- standard SEO order:
  - `.ds-seo-content`
  - `.ds-related-tools`
  - `.ds-seo-more`

## Migration Guardrails

- Batch-editing tool pages without guaranteed UTF-8 writeback is forbidden.
- Before shared-shell migration, always run:

```bash
python scripts/audit-tool-shell-migration.py
```

- For single-page migration, run:

```bash
python scripts/audit-tool-shell-migration.py <slug>
```

- If the audit reports `dirty_markup`, `partial_shared_shell`, `missing_ds_tool_main`, `missing_what_section`, or `missing_how_section`, do not treat the page as ready for batch migration.
- Shared shell scripts must stay idempotent. Double-init bugs are now a known class of migration failure.
- Shared-shell changes are not done until collapse, breadcrumb, top search, and post-workbench SEO structure are all confirmed.

## QA Reminder

- Low risk: `python scripts/validate-tools.py <slug>`
- Medium risk: full validate + page audit + report
- High risk: full validate + page audit + smoke + visual + preflight
