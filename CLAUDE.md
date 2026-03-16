# Claude Code Handoff

## Working Rules

- Always reply in Chinese to the user.
- Start responses with the conclusion, then list key steps.
- Before running commands, editing files, or running tests, briefly say what you are about to do.
- After code changes, explain the files touched and the key changes.
- Prefer the minimum necessary change. Avoid unrelated refactors.

## Current Main Task

The current main task is to migrate site pages and tool pages onto a maintainable design system.

The goal is not to redesign the product. The goal is to preserve the current visual language and move repeated page-level CSS into shared CSS and reusable component classes.

## Design System Entry Points

- `public/styles/design-system.css`
- `public/styles/design-tokens.css`
- `public/styles/design-base.css`
- `public/styles/design-components.css`
- `DESIGN_SYSTEM.md`
- `public/design-system.html`

New pages and migrated pages should use these shared files and existing `ds-*` classes first.

## Migration Rules

- Reuse `ds-*` classes whenever possible.
- Prefer deleting repeated local CSS after shared classes are attached.
- Keep page-specific business UI styles when they are truly unique.
- Do not roll back pages that are already migrated.
- Do not touch unrelated files during migration work.
- If a page has encoding corruption or broken HTML, rebuilding the page is allowed as long as core functionality, SEO metadata, and intended behavior are preserved.

## What Is Already Migrated

### Site Pages

These pages are already migrated into the design system:

- `public/index.html`
- `public/all-tools.html`
- `public/about.html`
- `public/privacy.html`
- `public/terms.html`
- `public/contact.html`

These pages already use shared navigation, hero, page containers, cards, inputs, buttons, legal page patterns, marketing page patterns, and form states.

### Tool Pages

- `public/tools/base64.html`
  - Most complete tool page sample.
  - Shared layout already controls nav, header, two-pane workbench, actions, and notes.
  - Most repeated local CSS has already been removed.

- `public/tools/json-formatter.html`
  - Almost at the same completion level as `base64.html`.
  - All three workbench modes are already aligned with shared tool components.
  - Local styles like `toolbar`, `history dropdown`, `sql-section`, and `io-valid` are intentionally kept.

- `public/tools/qr-code-generator.html`
  - Established the "side settings panel + preview panel" tool page pattern.
  - Shared classes such as `ds-tool-split`, `ds-tool-sidepanel*`, and `ds-tool-preview*` were added for this pattern.

- `public/tools/password-generator.html`
  - Core layout migration is done.
  - Shared classes already control nav, header, split layout, main panel, actions, and notes.
  - Unique UI like slider, checkbox list, advanced collapse, strength bar, and password list stays local.

- `public/tools/url-encode.html`
  - Migration is complete.
  - The page was rebuilt because the original file had encoding corruption and broken nodes.
  - Shared classes now control nav, header, two-pane workbench, actions, and notes.

- `public/tools/hash-generator.html`
  - Established the "vertical-stack panels" tool page pattern (input panel + results panel).
  - Shared classes control nav, header, pane headers/labels/actions/buttons, and textarea.
  - Kept local: underline tabs (Text/File), column-centered drop zone, hash result rows, case toggle.

- `public/tools/word-counter.html`
  - Established the "editor + stats column" pattern (1fr + 300px right column).
  - Shared classes control nav, header, pane header/actions/buttons, textarea, pane footer.
  - Kept local: stat-card grid, time-row, word-row, platform-bar.

- `public/tools/timestamp.html`
  - Single-column stack of converter cards.
  - Shared classes control nav and header.
  - Kept local: live-clock, card, field-row, result-box, btn-convert.

- `public/tools/uuid-generator.html`
  - Uses `ds-tool-main ds-tool-split` + `ds-tool-sidepanel` + `ds-tool-sidepanel__section`.
  - Kept local: slider, checkboxes, uuid-row list, actions buttons, info-card.

- `public/tools/slug-generator.html`
  - Single-column stack (`ds-tool-main ds-tool-stack`), cards kept local.
  - Kept local: card container, options-row, segment controls, slug output, copy buttons, SEO hint.

- `public/tools/lorem-ipsum-generator.html`
  - Uses `ds-tool-main ds-tool-split` + `ds-tool-sidepanel` pattern.
  - Kept local: theme-grid, output-panel/header/footer, output-textarea.

- `public/tools/random-number-generator.html`
  - Three layout modes (numbers/list/dice). All use local `.main`/`.list-main`/`.dice-main`.
  - Shared classes control nav and header only.

- `public/tools/unit-converter.html`
  - Single-column stack with local `.body-wrap`.
  - Kept local: category tabs, converter-card, ref-table.

- `public/tools/youtube-thumbnail.html`
  - Single-column layout. Shared classes control nav and header.

- `public/tools/color-picker.html`
  - Sidebar (340px) + color preview panel layout. Shared classes control nav and header.

- `public/tools/image-resizer.html`
  - Sidebar (300px) + preview panel layout. Shared classes control nav and header.

- `public/tools/jwt-decoder.html`
  - Single-column stack with three-column card grid output. Shared classes control nav and header.

- `public/tools/html-entities.html`
  - Two-pane IO + reference table with modebar. Shared classes control nav and header.

- `public/tools/markdown-preview.html`
  - Full-height editor + preview split layout. Shared classes control nav and header.
  - Kept local: workspace, toolbar, split-area, editor/preview pane, Markdown render styles.

- `public/tools/regex-tester.html`
  - Pattern input UI + test area + match detail list. Shared classes control nav and header.
  - Kept local: pattern-bar, flag checkboxes, match highlights, match list, quick-ref panel.

- `public/tools/cron-builder.html`
  - Cron expression builder with 5-field grid. Shared classes control nav and header.
  - Kept local: expr-bar, fields-grid, field-card, field controls, runs-list, presets.

## Migration Checklist for New Tool Pages

When creating a new tool page, follow this checklist:

1. Link `../styles/design-system.css` (no Google Fonts needed — DS provides Inter + JetBrains Mono).
2. Use DS token aliases in `:root` (not hardcoded hex values).
3. Use `ds-nav__brand` for the logo link and `ds-nav__logo-icon` for the icon wrapper — no local override CSS needed.
4. Use `ds-tool-nav` + `ds-tool-nav-*` for the sticky nav bar.
5. Use `ds-tool-header` + `ds-tool-header__*` for the page header band.
6. Use `ds-tool-main` (+ `ds-tool-split` or `ds-tool-stack`) for the main content container.
7. Use `ds-tool-sidepanel` + `ds-tool-sidepanel__section` for 300px left settings panels.
8. Use `ds-tool-pane__header/label/actions/btn/footer` for pane internals.
9. Use `ds-tool-textarea` for primary text input areas.
10. Keep only page-specific business CSS local — do not re-implement nav, header, or base styles.

## Reusable Tool Page Patterns Already Established

### Shared Tool Skeleton

- `ds-tool-header*`
- `ds-tool-main`
- `ds-tool-stack`
- `ds-tool-tag-row`
- `ds-tool-nav-*`

### Brand / Logo Pattern (used on all pages)

- `ds-nav__brand` — logo link (`<a>`) for both site pages and tool pages
- `ds-nav__logo-icon` — icon wrapper div (no background or border override needed)
- `ds-footer-logo-icon` — footer icon wrapper div
- `logo-img` — the `<img>` element inside the icon wrapper

### Two-Pane Workbench Pattern

- `ds-tool-modebar`
- `ds-tool-modebtn`
- `ds-tool-options`
- `ds-tool-workbench`
- `ds-tool-pane*`
- `ds-tool-textarea`
- `ds-tool-pane__footer`
- `ds-tool-stat`
- `ds-tool-error`
- `ds-tool-arrow*`
- `ds-tool-actions*`
- `ds-tool-note*`

### Sidepanel + Preview Pattern

- `ds-tool-split`
- `ds-tool-sidepanel*`
- `ds-tool-preview*`

## Migration Status

**All 21 tool pages and all 6 site pages are fully migrated.** No further migration work is needed.

Brand logo classes are unified across all 27 pages: `ds-nav__brand` + `ds-nav__logo-icon` (nav), `ds-footer-logo-icon` (footer). No local override CSS required.

Future work should focus on:

- Extracting repeated local patterns (`.related-tools`, `.card`, etc.) into shared DS components if they appear in 3+ pages.
- Adding new tool pages using the Migration Checklist above.

## Files To Read First

If Claude Code takes over, read these first:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `DESIGN_SYSTEM.md`
4. `MEMORY.md`
