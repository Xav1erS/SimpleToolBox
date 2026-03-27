# SimpleToolBox Memory

## Current Snapshot (2026-03-23)

- Tool count: **106**
- Shared tool list source: `public/tools-data.js`
- Shared metadata source: `public/tools-meta.js`
- Latest preflight: fully green
- Main phase: **growth-first**, not migration-first

## What Just Happened

- Added 6 new text tools:
  - `duplicate-line-remover`
  - `line-sorter`
  - `list-deduplicator`
  - `whitespace-trimmer`
  - `sentence-counter`
  - `keyword-density-checker`
- Repaired a batch of old `reference` pages that had:
  - lost runtime scripts
  - missing local styles
  - broken card/layout structure
- Fixed the real footer issue:
  - many pages had footer nested inside `.main` / `.ds-tool-main`
  - now corrected so footer is back under `body`
- Strengthened QA:
  - missing runtime scripts are now caught by validation
  - report generation is resilient to local `node/npx` PATH issues

## Real Current Focus

The focus is no longer:

- finish migration
- polish every old page

The real focus is:

1. grow from **106 to 150**
2. keep QA green
3. keep shared data/template architecture converging
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
- Is output easy to copy/download?
- Does it feel smooth on mobile?

## Current Constraints

- Some legacy pages still have minor copy/encoding debt.
- That debt is lower priority than adding high-value new tools unless it breaks usability.
- Legacy cleanup should now be bug-driven, not open-ended.

## Immediate Next Step

Highest-priority next work:

1. `csv-column-extractor`
2. `text-list-to-array`
3. `word-frequency-counter`

After that:

- move into a calculator batch
- only revisit old pages when there is a real functional or structural issue

## Active Frame

Correct active frame:

**106 tools, QA green, shared architecture stable, continue disciplined expansion toward 150.**

## Tool Shell Migration Snapshot (2026-03-28)

The tool-page left-rail migration is now better understood.

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

- `tool-page-icon.js` and `site-navigation.js` could both initialize the directory shell
- this caused the left-rail collapse button to bind twice
- symptom: clicking the button looked like “no response”

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

And do not treat a page as “migrated” unless it has:

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

## Extra Prevention Notes

- Never combine shell migration, SEO skeleton migration, and product feature changes in one big step.
- Shared behavior should have one owner. Duplicate init paths are a known failure source.
- After touching shared assets, bump page-level resource versions to avoid stale-cache false negatives.
- Dirty legacy pages must be cleaned before they are used as migration targets.
- Shared-shell work must be spot-checked on desktop and mobile, and across multiple page categories.
- Prefer HTML entities over fragile direct punctuation symbols on legacy pages.
- Small verified batches are safer than wide one-shot migrations.
