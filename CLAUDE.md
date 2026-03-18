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

- `public/tools/webp-converter.html`
  - Image format converter. Shared classes control nav and header.

- `public/tools/image-compressor.html`
  - Client-side image compression. Shared classes control nav and header.

### Phase 1 New Tools (49 tools — use design-system.css, SEO structure not yet added)

These tools were built using the design system from scratch but do **not** yet have SEO content structure (`ds-seo-content` / `ds-related-tools` / `ds-seo-more`).

**Text Processing:** `text-case`, `text-cleaner`, `line-tools`, `diff-viewer`, `string-escape`, `binary-text`, `morse-code`, `ascii-table`, `roman-numerals`

**Developer Tools:** `html-formatter`, `css-formatter`, `css-minifier`, `js-formatter`, `js-minifier`, `sql-formatter`, `xml-formatter`, `json-csv`, `xml-json`, `yaml-json`, `toml-json`, `jsonpath-tester`, `number-base`, `number-format`, `chmod-calculator`, `http-status`, `port-reference`, `mime-types`

**Encoding / Crypto:** `base32`, `base58`, `bcrypt`, `hmac`, `aes`

**Date / Time:** `timezone-converter`, `date-calculator`, `countdown`

**Color / Design:** `color-palette`, `gradient-generator`, `color-converter`, `color-blindness`, `color-contrast-aa`, `contrast-checker`

**Network / URL:** `url-builder`, `url-parser`, `user-agent`, `ip-lookup`

**Utility:** `bmi-calculator`, `loan-calculator`, `jwt-builder`, `markdown-to-html`

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

## Interaction Quality Checklist

Every interactive element must satisfy this checklist before shipping:

### Button Groups / Option Selectors

- Every clickable option button that belongs to a group (tabs, presets, segment controls) **must** have a `.active` CSS class defined — visually identical to its `:hover` style so selected = highlighted.
- The JS handler **must** (1) remove `.active` from all siblings in the group, (2) add `.active` to the clicked element.
- Mutually exclusive groups (e.g. Quick Scale vs. Social Media Presets) must also clear each other's `.active` on click.

### Standard `.active` Pattern

```css
/* hover and active should look the same */
.your-btn:hover  { color: var(--accent); background: var(--accent-dim); border-color: rgba(94,106,210,0.3); }
.your-btn.active { color: var(--accent); background: var(--accent-dim); border-color: rgba(94,106,210,0.3); }
```

```js
// in every click handler for a grouped button:
container.querySelectorAll('.your-btn').forEach(b => b.classList.remove('active'));
clickedBtn.classList.add('active');
```

### Copy / Action Buttons

- Must show a temporary `.copied` / `.done` state (change label + icon) for ~1.5 s after the action.

### Inputs with Side Effects

- After any preset/option click that changes an input value, the corresponding output/preview must update immediately in the same handler — do not rely on the user re-triggering an `input` event.

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

**All 72 tool pages and all 6 site pages use the design system.** No further design-system migration work is needed.

Brand logo classes are unified: `ds-nav__brand` + `ds-nav__logo-icon` (nav), `ds-footer-logo-icon` (footer). No local override CSS required.

### SEO Content Structure

**23/72 tool pages have complete SEO content structure** (as of 2026-03-18).

Pages with full SEO structure (ds-seo-content + ds-related-tools + ds-seo-more 4 collapses):
`base64`, `json-formatter`, `qr-code-generator`, `password-generator`, `url-encode`, `hash-generator`, `word-counter`, `timestamp`, `uuid-generator`, `slug-generator`, `lorem-ipsum-generator`, `random-number-generator`, `unit-converter`, `youtube-thumbnail`, `color-picker`, `image-resizer`, `jwt-decoder`, `html-entities`, `markdown-preview`, `regex-tester`, `cron-builder`, `webp-converter`, `image-compressor`

**49 Phase-1 new tools still need SEO structure added.** Each tool page needs:

- Visible `ds-seo-content` block with two `<section class="ds-seo-section">` elements: "What is [Tool]" + "How to Use [Tool]"
- `ds-related-tools` block with 3+ related tool links
- `ds-seo-more` progressive disclosure block with 4 `ds-seo-collapse` sections: **Example → [tool-specific middle section] → Why Use This Tool → Frequently Asked Questions**

Future work should focus on:

- Adding SEO content structure to the 49 Phase-1 new tools (batch-scriptable).
- Building category/hub pages (Priority 3 of SEO roadmap).
- Extracting repeated local patterns (`.related-tools`, `.card`, etc.) into shared DS components if they appear in 3+ pages.

## 300+ Tools Roadmap

### 目标

将网站做到 300+ 个纯前端工具，全部浏览器端运行，不上传数据。当前已有 72 个工具（其中 23 个有完整 SEO 内容结构）。

详细优先级排序见 `# SimpleToolBox — 工具开发优先级排序.md`（仓库根目录）。

### 工具分类与优先级

| 优先级 | 类别 | 示例工具 |
| -------- | ---- | ------- |
| 🔴 高 | 文本处理 | 行去重、行排序、大小写转换、文本差异对比、空白清理、字符统计 |
| 🔴 高 | 开发工具 | CSS minify、JS minify、HTML formatter、YAML↔JSON、JSON↔CSV 扩展、diff viewer |
| 🔴 高 | 编码/加密 | Base58、Base32、AES 加解密、HMAC、SHA-3、bcrypt 验证 |
| 🟡 中 | 数字/数学 | 进制转换、科学计数、排列组合、斐波那契、质数生成 |
| 🟡 中 | 时间日期 | 时区转换、工作日计算、日期差值、倒计时生成器 |
| 🟡 中 | 颜色/设计 | 调色板生成、渐变生成器、对比度检查（WCAG）、色盲模拟 |
| 🟡 中 | 网络/URL | UserAgent 解析、端口号参考、MIME 类型查询、URL 构建器 |
| 🟢 低 | 生活工具 | BMI 计算、汇率换算、贷款计算、卡路里换算 |

### 开发效率原则

1. **工具粒度要小**：一个工具只做一件事。"文本工具集"应拆成"去除重复行"、"行排序"、"空白清理"等独立工具 — SEO 更好，开发更快。
2. **同类工具批量开发**：同类工具共享 95% 的 HTML/CSS 骨架，只替换核心 JS 逻辑，一次可产出 3-5 个工具。
3. **引入成熟库**：纯计算类工具优先用 `dayjs`、`math.js`、`fflate` 等库，不手写复杂算法。
4. **模板复用**：每个新工具从最接近的已有工具复制骨架，按 Migration Checklist 逐项对照。

### 分阶段里程碑

| 阶段 | 目标工具数 | 重点方向 | 状态 |
| ---- | --------- | ------- | ---- |
| 阶段一 | 100 个 | 文本、开发、编码类高频工具（已有 72 个，补充 SEO 结构） | 进行中 |
| 阶段二 | 150 个 | 数学、颜色、时间、网络类 | 待开始 |
| 阶段三 | 200 个 | 细分场景专业工具 | 待开始 |
| 阶段四 | 300+ 个 | 长尾需求、小众但有用 | 待开始 |

### all-tools.html 维护规则

- 工具数超过 50 个时，必须为 `all-tools.html` 加入分类筛选功能。
- 每次新增工具后立即更新 `all-tools.html` 工具列表，分类须正确。
- 每个工具条目需包含：工具名、描述、所属分类、页面链接。

### 新工具上线前检查

除 Migration Checklist 和 Interaction Quality Checklist 外，还需确认：

- [ ] `<title>` 和 `<meta description>` 对该工具唯一且描述准确
- [ ] `ld+json` Schema 已填写（`SoftwareApplication` 类型）
- [ ] `all-tools.html` 已更新，分类正确
- [ ] Related Tools 区域指向相关工具（至少 2 个）
- [ ] 页面在移动端布局正常（≤480px）

## Files To Read First

If Claude Code takes over, read these first:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `DESIGN_SYSTEM.md`
4. `MEMORY.md`
