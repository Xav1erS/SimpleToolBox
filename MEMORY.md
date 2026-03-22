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
