# Instructions

## 工作规范

- 永远使用中文回复。
- 回答先给结论，再给关键步骤。
- 在执行命令、修改文件或运行测试前，先简要说明要做什么。
- 修改代码后，说明涉及的文件和关键变化。
- 优先做最小必要修改，避免无关重构。

## 当前项目状态（2026-03-19）

- **81 个工具页**全部完成设计系统迁移 + 完整 SEO 结构（ds-seo-content + ds-related-tools + ds-seo-more + footer）
- **6 个站点页**（index、all-tools、about、privacy、terms、contact）已迁移
- **sitemap.xml** 已同步 90 URLs（9 站点页 + 81 工具页）
- **QA 体系**已建立：
  - `scripts/validate-tools.py` — 81 个工具页结构验证，81/81 PASS
  - `tests/smoke/` — 10 个核心工具的 Playwright smoke tests，38/38 PASS
  - `tests/visual/snapshot.test.js` — 15 个工具页的视觉快照 baseline（桌面 + 移动端）
  - `public/tools-meta.js` — 10 个工具的富元数据（base64 等）
  - `QA.md` — 完整维护文档（变动风险分级）

## 项目目标

本项目目标是做到 **500 个纯前端工具**，全部在浏览器端运行，不上传数据。

当前已有 81 个工具。**当前阶段的主要工作是新增工具**（目标：先到 100 个，再到 150 个）。

## 新工具开发规范

- 新工具上线前必须通过 `CLAUDE.md` 中的 Migration Checklist 和 Interaction Quality Checklist。
- 工具粒度要小：一个工具只做一件事。宁可拆成三个小工具，不要做一个大而全的工具集。
- 同类工具批量开发：共享 HTML/JS 骨架，只替换核心逻辑，提高开发效率。
- 纯计算类工具优先引入成熟 JS 库（如 `dayjs`、`math.js`），不要手写复杂算法。
- 每个工具都需要独立的 `<title>`、`<meta description>`、`ld+json` Schema，不得与其他工具雷同。
- 每个新工具必须包含完整 SEO 内容结构（参考 `base64.html` 或 `json-formatter.html` 作为模板）。

## 工具优先级

优先开发高频、无外部依赖、纯前端可实现的工具：

1. **文本处理类**（去重、排序、大小写、差异对比、行处理）
2. **开发工具类**（CSS/JS minify、YAML↔JSON、HTML formatter、diff viewer）
3. **编码/加密类**（Base58、AES、HMAC、各类哈希扩展）
4. **数字/数学类**（进制转换、科学计数、排列组合）
5. **时间日期类**（时区转换、工作日计算、倒计时）
6. **颜色/设计类**（调色板、渐变生成、对比度检查）
7. **网络/URL 类**（UserAgent 解析、端口参考、MIME 类型查询）

## QA 检查规范

每次修改后，按变动风险分级执行对应检查（详见 `QA.md`）：

| 变动类型 | 示例 | 必须执行 |
| --- | --- | --- |
| **低风险** | 单工具逻辑/文案修改 | `python scripts/validate-tools.py <slug>` + 对应 smoke test |
| **中风险** | SEO 组件/tools-data.js 变更、新增工具 | 全量 validate + 全量 smoke + 视觉对比 |
| **高风险** | design-system.css 变更、全局布局改动 | 全量 validate + 全量 smoke + 全量视觉快照 |

## all-tools.html 维护规范

每次新增工具后，必须同步更新 `all-tools.html` 的工具列表，保持分类正确。

## tools-data.js 维护规范

`public/tools-data.js` 是全站搜索的唯一数据源，被 `index.html` 和三个 hub 页共享。

- 每次新增工具后，在 `tools-data.js` 末尾追加一条记录，格式：

  ```js
  { name: '工具名', href: 'tools/slug.html', tag: 'xxx', icon: '🔣', desc: '一句话描述' },
  ```

- `tag` 值：`image` / `text` / `encode` / `format` / `convert` / `generate` / `calculator` / `design` / `reference`
- 不要在各 hub 页面内维护独立的工具列表；hub 页已统一引用 `SITE_TOOLS`。
