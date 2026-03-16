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

#### `public/tools/hash-generator.html`

- Migration completed
- Established the "vertical-stack panels" tool page pattern (input panel + results panel, no side-by-side workbench)
- Shared classes now control nav, header, pane headers/labels/actions/buttons, and textarea
- Kept local: underline tabs (Text/File), column-centered drop zone, hash result rows, case toggle, file info strip

#### `public/tools/timestamp.html`

- Migration completed
- Established the "converter form cards" tool page pattern (live clock + multiple input→result converter cards, vertical stack)
- Shared classes now control nav and header
- Kept local: `.main` (flex column 900px), `.live-clock`, `.card*`, `.field-*`, `.btn-convert`, `.seg-ctrl`, `.result-*`, `.info-card`, related tools

#### `public/tools/word-counter.html`

- Migration completed
- Established the "wide editor + sidebar stats cards" tool page pattern (left textarea + right column of multiple stat cards)
- Shared classes now control nav, header, pane header/label/actions/buttons, textarea, pane footer, stat label
- Kept local: `.main` grid layout (1fr 300px), `.editor-panel` container, `.stats-col`, all stat card internals, platform bars, related tools section

## Migration Principles

- Minimum necessary change
- Reuse shared design system classes first
- Attach shared skeleton first, then delete repeated local CSS
- Keep page-specific business styles when needed
- Do not roll back completed design system migrations
- Do not refactor unrelated pages

## Current Goal: 300+ Tools

设计系统迁移已全部完成（21 个工具 + 6 个站点页面）。当前主要工作是新增工具，目标 300+ 个。

### 工具开发优先级

1. **文本处理**：行去重、行排序、大小写转换、文本差异对比、空白清理
2. **开发工具**：CSS/JS minify、YAML↔JSON、HTML formatter、diff viewer
3. **编码/加密**：Base58、Base32、AES 加解密、HMAC、SHA-3
4. **数字/数学**：进制转换、科学计数、排列组合
5. **时间日期**：时区转换、工作日计算、日期差值
6. **颜色/设计**：调色板生成、渐变生成、WCAG 对比度检查
7. **网络/URL**：UserAgent 解析、端口参考、MIME 查询

### 关键开发原则

- 工具粒度要小，一个工具只做一件事
- 同类工具批量开发，共享骨架只换核心逻辑
- 纯计算工具优先引入成熟 JS 库（dayjs、math.js 等）
- 工具数超过 50 个时，`all-tools.html` 必须加分类筛选
- 每次新增工具后同步更新 `all-tools.html`

### 分阶段里程碑

| 阶段 | 目标 | 重点 |
| ---- | ---- | ---- |
| 阶段一 | 50 个 | 文本、开发、编码 |
| 阶段二 | 100 个 | 数学、颜色、时间、网络 |
| 阶段三 | 200 个 | 细分场景专业工具 |
| 阶段四 | 300+ 个 | 长尾需求 |

### 新工具上线检查清单

完整检查清单见 `CLAUDE.md` → "新工具上线前检查"。核心项：

- Migration Checklist（设计系统骨架）
- Interaction Quality Checklist（按钮/复制/预设交互）
- 独立 SEO 元数据（title、description、ld+json）
- `all-tools.html` 已更新
- 移动端布局正常

## Historical Note

There was an earlier idea to extract the nav into a separate `public/nav.js` injection flow.

That is no longer the current priority. The design system migration is complete. If shared navigation extraction is needed later, evaluate it after reaching 100+ tools.
