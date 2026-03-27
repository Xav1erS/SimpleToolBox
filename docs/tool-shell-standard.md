# Tool Shell Standard

`public/tools/base64.html` is the current gold-standard shell for tool pages with the shared left rail.

This standard defines the shared shell only. It does not require every tool to copy Base64's internal workbench layout. Text and developer tools may reuse the dual-pane pattern when it fits. Image, PDF, and calculator tools should reuse the shell and keep their own task-specific UI.

## Required Structure

Each migrated tool page must keep this structure, in this order:

```html
<body class="ds-page ...">
  <nav class="ds-nav" id="nav">...</nav>

  <div class="tool-header ds-tool-header">
    <div class="tool-header-inner ds-tool-header__inner">
      <div class="tool-title-row ds-tool-header__row">...</div>
      <p class="tool-desc-text ds-tool-header__desc">...</p>
      <div class="ds-tool-context">...</div>
      <div class="tool-tags ds-tool-tag-row">...</div>
    </div>
  </div>

  <div class="main ds-tool-main ds-tool-stack">
    <!-- tool-specific workbench -->

    <div class="ds-seo-content">...</div>
    <div class="ds-related-tools">...</div>
    <details class="ds-seo-more">...</details>
  </div>

  <footer>...</footer>

  <script src="../tools-data.js"></script>
  <script src="../site-hierarchy.js?..."></script>
  <script>
    window.STB_PAGE_CONTEXT = { pageType: 'tool', slug: '...' };
  </script>
  <script src="../scripts/site-navigation.js?..."></script>
</body>
```

## Shell Contract

- `body` must include `ds-page`.
- The page must provide `nav.ds-nav#nav` so the shared top navigation, directory rail, and breadcrumb logic can attach correctly.
- The header must use `ds-tool-header`, `ds-tool-header__inner`, `ds-tool-header__title`, and `ds-tool-header__desc`.
- The header must include `ds-tool-context` with at least:
  - one hub entry pill
  - one "Runs locally" pill
  - one "No data sent" pill
- The main tool root must include `ds-tool-main`.
- The SEO area must stay after the tool workbench and preserve:
  - `.ds-seo-content`
  - `.ds-related-tools`
  - `.ds-seo-more`
- The page must set `window.STB_PAGE_CONTEXT = { pageType: 'tool', slug }`.
- The page must include `../scripts/site-navigation.js`.

## SEO Skeleton Contract

Shell migration and SEO migration should move together.

The shell stays fixed. The SEO copy does not need to be identical between tools, but the SEO block order and slot layout should be standardized.

### Required SEO Slots

Each migrated tool page must keep these SEO blocks in this order:

```html
<div class="ds-seo-content">
  <section class="ds-seo-section">
    <h2 class="ds-seo-section__title">What is ...?</h2>
    ...
  </section>

  <section class="ds-seo-section">
    <h2 class="ds-seo-section__title">How to Use ...</h2>
    ...
  </section>

  <!-- optional direct sections -->
</div>

<div class="ds-related-tools">...</div>

<details class="ds-seo-more">
  <summary class="ds-seo-more__toggle">...</summary>
  <div class="ds-seo-more__body">
    <!-- optional collapsible sections -->
  </div>
</details>
```

Required blocks:

- `.ds-seo-content`
- a `What is ...` section
- a `How to Use ...` section
- `.ds-related-tools`
- `.ds-seo-more`

### Optional Direct Sections

These can appear inside `.ds-seo-content` after the required two sections:

- `Why Use ...`
- `Quick Guides`

Use direct sections only when the content is short and valuable above the fold of the SEO stack.

### Optional Collapsible Sections

These belong inside `.ds-seo-more` as nested `details.ds-seo-collapse` items:

- `Example`
- `Common Use Cases`
- `Why Use This Tool`
- `Frequently Asked Questions`

If a tool needs richer educational content, prefer adding it inside `.ds-seo-more` instead of creating a long chain of top-level SEO cards.

### Normalization Rules

- Keep the outer block order fixed:
  1. `.ds-seo-content`
  2. `.ds-related-tools`
  3. `.ds-seo-more`
- Keep `What is ...` and `How to Use ...` as the first two direct SEO sections.
- Do not move `Related Tools` above the direct SEO content.
- Do not replace `.ds-seo-more` with page-specific accordions or ad-hoc wrappers.
- Do not make every possible section mandatory. The skeleton should standardize layout, not force identical copy.

### Current Coverage Baseline

Audit across `public/tools/*.html` on 2026-03-27:

- `201 / 201` include `.ds-related-tools`
- `201 / 201` include `.ds-seo-more`
- `184 / 201` include `What is ...`
- `153 / 201` include `How to Use ...`
- `98 / 201` include `Why Use ...`
- `12 / 201` include `Quick Guides`
- `188 / 201` include `Common Use Cases`
- `167 / 201` include `Example`
- `201 / 201` include FAQ content inside `.ds-seo-more`

This means shell unification is already structurally close, but SEO skeleton unification still requires content-slot normalization.

## Do Not Copy

The gold-standard page must not contain patterns that future migrations should repeat:

- page-local inline styles for reusable shell UI
- invalid or messy HTML semantics such as nested `<label>` elements
- redundant global re-exports after `tools-data.js` when the source file already exposes them
- page-specific compatibility glue mixed into the shell without a clear reason
- old `ds-tool-nav` top bars copied forward after the shared `ds-nav` shell is available
- page-specific SEO wrappers that break the standard `.ds-seo-content -> .ds-related-tools -> .ds-seo-more` order
- long custom SEO card stacks when the same material fits the standard required and optional slots

## Base64 Pass Line

When `Base64` is used as the shell reference, it must pass these checks:

- The shell structure maps directly to the required structure above.
- Shared resource versions are aligned with the current shell layer.
- No obvious shell-level inline style noise remains.
- SEO, related tools, footer, breadcrumb, recent tools, and left rail all work without extra page-specific hacks.
- The main workbench remains fully usable on desktop and mobile after the left rail shell is attached.
- The SEO area follows the required slot order and can be used as the copyable reference for future migrations.

## Migration Checklist

- Replace old top navigation with the shared `#nav` shell.
- Move the title area into `ds-tool-header`.
- Wrap the tool root in `ds-tool-main`.
- Keep SEO, related tools, and footer in the same post-workbench order.
- Normalize the SEO area to:
  - `What is ...`
  - `How to Use ...`
  - optional direct sections
  - `Related Tools`
  - `ds-seo-more`
- Add `STB_PAGE_CONTEXT`.
- Add `site-navigation.js`.
- Verify the left rail does not compress the main work area into an unusable state.
- Verify mobile drawer, breadcrumb, header, and main tool order still feel natural.
