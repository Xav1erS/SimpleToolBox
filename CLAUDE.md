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

## Reusable Tool Page Patterns Already Established

### Shared Tool Skeleton

- `ds-tool-header*`
- `ds-tool-main`
- `ds-tool-stack`
- `ds-tool-tag-row`
- `ds-tool-nav-*`

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

## Recommended Next Steps

Pick another tool page with a different structural pattern so the design system can cover more cases.

Recommended order:

1. Attach `design-system.css` and existing `ds-*` skeleton classes.
2. Remove local CSS that is already covered by the shared layer.
3. Keep only page-specific business styles and behavior.

## Files To Read First

If Claude Code takes over, read these first:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `DESIGN_SYSTEM.md`
4. `MEMORY.md`
