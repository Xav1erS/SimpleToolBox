# SimpleToolBox Memory

## Current Focus

The current focus is to consolidate existing page styles into one design system instead of introducing a new visual direction.

The project keeps the current dark visual language and gradually moves repeated inline page styles into shared tokens, base rules, and component classes.

## Design System Files

- `public/styles/design-system.css`
- `public/styles/design-tokens.css`
- `public/styles/design-base.css`
- `public/styles/design-components.css`
- `DESIGN_SYSTEM.md`
- `public/design-system.html`

## Site-Wide Status

### Non-Tool Pages

These pages are already migrated:

- `public/index.html`
- `public/all-tools.html`
- `public/about.html`
- `public/privacy.html`
- `public/terms.html`
- `public/contact.html`

Shared capabilities already in place:

- Shared site entry CSS
- Shared nav skeleton
- Shared search input and search interaction layer
- Shared hero and marketing page patterns
- Shared legal document page pattern
- Shared buttons, inputs, pills, tags, notices, cards, and panels
- Shared Contact form states and success states

### Tool Pages

#### `public/tools/base64.html`

- Most complete sample page
- Most repeated CSS already removed
- Shared layer controls nav, header, two-pane workbench, actions, and note card

#### `public/tools/json-formatter.html`

- Nearly complete
- `Format / Validate / JSON->CSV / CSV->JSON` workbenches already aligned with shared components
- Keeps page-specific styles such as `toolbar`, `history`, `sql-section`, and `io-valid`

#### `public/tools/qr-code-generator.html`

- First round plus layout cleanup completed
- Established the "settings sidepanel + result preview" shared pattern

#### `public/tools/password-generator.html`

- Core layout migration completed
- Keeps unique controls such as slider, checkbox, advanced collapse, strength bar, and password list

#### `public/tools/url-encode.html`

- Migration completed
- Original file had encoding corruption and was rebuilt
- Original URL encode/decode behavior and key SEO metadata were preserved

## Migration Principles

- Minimum necessary change
- Reuse shared design system classes first
- Attach shared skeleton first, then delete repeated local CSS
- Keep page-specific business styles when needed
- Do not roll back completed design system migrations
- Do not refactor unrelated pages

## Recommended Next Work

Continue with a tool page that has a different layout type so the design system can cover more real cases.

Suggested directions:

1. More configuration form plus result cards
2. Batch input or list output pages
3. Upload, download, and preview combinations

## Historical Note

There was an earlier idea to extract the nav into a separate `public/nav.js` injection flow.

That is no longer the current priority. The current priority is to stabilize the design system migration first. If shared navigation extraction is still needed later, evaluate it after the design system work is mostly complete.
