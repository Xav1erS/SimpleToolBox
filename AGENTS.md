# Instructions

## 工作规范

- 永远使用中文回复。
- 回答先给结论，再给关键步骤。
- 在执行命令、修改文件或运行测试前，先简要说明要做什么。
- 修改代码后，说明涉及的文件和关键变化。
- 优先做最小必要修改，避免无关重构。

## 当前真实状态（2026-03-30）

- **201 个工具页**已上线，QA 201/201 通过，0 错误 0 警告。
- **6 个站点页**已完成设计系统迁移：`index`、`all-tools`、`about`、`privacy`、`terms`、`contact`。
- **8 个 hub 页**已存在并接入共享数据源：
  - `image-tools`、`developer-tools`、`text-tools`、`calculator-tools`
  - `converter-tools`、`generator-tools`、`pdf-tools`
  - `all-tools`（JS 渲染，支持分组 + 搜索 + Popular / Recently Used）
- `public/tools-data.js` 是首页、all-tools、8 个 hub 页共享的唯一工具数据源。
- `public/tools-meta.js` 已覆盖全部 201 个工具（0 errors，0 warnings）。
- **Product Hunt 已于 2026-03-29 正式上线。**
- **sitemap.xml** 已同步全部工具页（211 URLs = 201 tools + 10 site pages）。

### 最新 QA（2026-03-30）

- Tools: 201
- Validate: 201/201 pass, 0 errors, 0 warnings
- 编码脏字符（HTML 内容区）：已全量修复
- 脚本/样式块内 CJK：已全量清理（除 lorem-ipsum-generator 的有意中文按钮）
- 全量轻量 smoke：201/201 pass
- `audit-launch-health.py`：mojibake 0，inline script syntax 0，missing header row 0，missing tool-page-icon.js 0
- `ds-tool-main`：201/201 已具备
- `What is ...` SEO 段：201/201 已具备
- `How to Use ...` SEO 段：201/201 已具备

### 当前非阻塞遗留（2026-03-30）

- 已清空的债务（截至本轮）：
  - 所有用户可见乱码 ✓
  - 所有 inline-script 语法错误 ✓
  - 所有首屏运行时阻塞 ✓
  - 所有缺失 `ds-tool-header__row` ✓
  - 所有缺失 `tool-page-icon.js` ✓
  - 所有 HTML 内容区 CJK（工具页 + 站点页）✓
  - 所有 `<script>`/`<style>` 块内 CJK（除有意保留项）✓
  - 所有缺失 `ds-tool-main` ✓
  - 所有缺失 `What is ...` SEO 段 ✓
  - 所有缺失 `How to Use ...` SEO 段 ✓
  - 61 个人工分组的结构缺口 ✓ → 已全部修复，手工组清零
- 仍未完成的：
  - `70` 个工具页未静态引用 `site-navigation.js`（通过 `tool-page-icon.js` 动态加载，运行不受影响）
  - **实际共享外壳接线尚未执行**：200 个页面已具备所有前提条件，但 `STB_PAGE_CONTEXT` + `site-navigation.js` + `ds-tool-context` 的接线工作尚未做
  - `lorem-ipsum-generator`：`<button class=”theme-btn” data-theme=”chinese”>` 中存在有意保留的中文字符，永久例外
- 正确口径：
  - **共享外壳迁移的所有结构前提已清零**
  - **实际外壳接线尚未完成**

## 最近已完成的重要进展

### 全量编码 / 图标乱码修复（2026-03-29）

全站 GBK 乱码已彻底清除，涉及工具页和站点页。

- **`scripts/fix-encoding-corruption.py`**（已有脚本）：修复 4 个内容区 CJK mojibake 的工具页（image-compressor、image-resizer、markdown-preview、timestamp）。
- **`scripts/fix-icon-corruption.py`**（新建脚本）：映射替换法修复 79 个工具页的 emoji 图标 GBK 乱码。从 `tools-data.js` 读取权威图标，计算预期乱码形式，仅替换 HTML 内容区（跳过 `<script>`/`<style>` 块）。
- **页头布局修复**（10 个页面）：补充缺失的 `ds-tool-header__row` flex 容器，使图标和标题出现在同一行（aes、color-palette、contrast-checker、countdown、gradient-generator、html-formatter、json-csv、roman-numerals、url-builder、user-agent）。
- **裸闭合标签修复**（31 个页面，53 处）：图标替换后部分页出现 `emoji/div>` 而非 `emoji</div>`，用正则补回缺失的 `<`。
- **`public/index.html`**：修复 `璺?` → `&middot;`（hero badge），`婕?` → `&copy;`（footer），`&#x2713;` → `&#x2705;`（feature card 图标）。
- **`public/privacy.html`**、**`public/terms.html`**：修复 `路`（U+8DEF，`&middot;` 的 GBK 腐坏） → `&middot;`。
- **`public/tools/js-formatter.html`**：去掉页头标题的 `max-width: 11ch` 内联样式。
- **`public/all-tools.html`**、`about.html`、`contact.html`：剩余 CJK 字符全在 `<script>` 内的 rawIcon 检测正则或 JS 注释里，不影响渲染，不做修改。`all-tools.html` 通过 `normalizeStaticLabels()` 和 `CATEGORY_SECTIONS.splice()` 在运行时自修复。

### 全量运行稳定性补强（2026-03-29）

为避免继续靠人工逐页撞问题，已补齐一条“201 页可自动扫首屏运行时故障”的检查链。

- **`tests/smoke/all-tools-light.test.js`**：新增并跑通 201 个工具页的全量轻量 smoke。
  - 检查页面可打开
  - `h1` 存在
  - 主内容容器存在
  - 无 `pageerror`
  - 无关键 `console error`
- **`scripts/audit-launch-health.py`**：新增 inline script 语法检查，不再只扫 mojibake。
- **`tests/smoke/password-generator.test.js`**：从“元素存在”升级到“真的能生成密码、再次点击结果会变化、复制不报错”。
- **本轮已批量修复并验证通过的代表坏页**包括：
  - `password-generator`
  - `color-converter`
  - `currency-converter`
  - `text-to-speech`
  - `pdf-split`
  - `pdf-extract-text`
  - `pdf-to-markdown`
  - `tax-calculator`
  - `scientific-calculator`
  - `lorem-ipsum-generator`
  - `random-number-generator`
- 当前结果：
  - `npx playwright test tests/smoke/all-tools-light.test.js --project="Desktop Chrome"`：通过
  - `python scripts/audit-launch-health.py`：`Inline script syntax errs: 0`

### 工具增长（106 → 201，跨越 200 里程碑）

分多批新增，主要类别：

**Image 工具：** `webp-to-png`、`image-sepia`、`image-vignette`、`image-tint`、`image-noise`

**Text 工具：** `reading-time-estimator`、`text-repeater`、`text-statistics`、`remove-line-breaks`、`remove-duplicate-words`、`word-scrambler`

**Calculator 工具：** `tax-calculator`、`body-fat-calculator`、`scientific-calculator`、`retirement-calculator`、`time-duration-calculator`、`aspect-ratio-calculator`、`pace-calculator`、`tip-splitter`、`age-in-days`、`loan-amortization-calculator`

**Generator / Design 工具：** `color-scheme-generator`、`css-box-shadow-generator`、`placeholder-image-generator`、`random-color-generator`、`gradient-text-generator`

**Developer 工具：** `binary-calculator`

**PDF 工具：** `pdf-to-image`、`image-to-pdf`、`pdf-page-counter`、`pdf-compress`、`pdf-merge`、`pdf-split`、`pdf-rotate-pages`、`pdf-extract-text`、`pdf-metadata-viewer`、`pdf-add-watermark`、`pdf-to-markdown`

### 全站定位统一

- 从 “developer tools” 统一改为 “everyday tasks”。
- 首页描述、schema、meta 已同步更新。

### all-tools.html 重构

- JS 渲染替代旧静态卡片。
- Popular / Recently Used 嵌入内容区。
- 筛选栏层级已修正。

### 首页优化

- Popular Tools 重排：image / text 工具置顶。
- New Tools 区块已补充。
- footer Tools 区：占位 `#` 链接已替换为真实 hub 页链接。
- stats：`Data Collected` 已替换旧文案。

### 工具页全局

- 全部 201 个工具页注入 `stb_recent` localStorage tracking snippet。
- `og:image`、`twitter:card: summary_large_image`、`apple-touch-icon` 已补全。

## 项目最高策略

### 真实定位

SimpleToolBox 是**任务导向型在线工具站**。

用户带着明确任务来：压缩、转换、提取、格式化、生成、计算、检查。

所有决策服从 5 个原则：

1. **工具优先**：第一屏必须马上可用。
2. **搜索优先**：每个页面对应真实任务和搜索意图。
3. **扩张优先**：架构支持持续扩展。
4. **轻导航优先**：优先搜索、分区、hub、related tools。
5. **内链优先**：页面互相输送点击与权重。

### 当前阶段目标

- **201 → 300**：继续补齐场景词和组合页。
- **300 → 500**：关键词矩阵 + hub 网络 + 工具链。

### 扩张优先级

1. **Image**
2. **Text**
3. **Calculators**
4. **Generators / Utility**
5. **Developer**
6. **PDF**

### 当前不做或延后

- 不大规模做 AI 轻工具。
- 不做场景页（暂）。
- 不做多语言。
- 不做关键词换皮页。

## 工具竞争力策略

好工具必须同时满足：

1. **可发现**：对应明确任务词。
2. **可使用**：打开后能立刻开始。
3. **可完成**：能稳定产出用户真正想要的结果。
4. **可带走**：结果复制、下载、导出顺手。
5. **可继续**：有清晰的下一步 related tools 路径。

### 好工具的 6 条统一标准

1. **1 秒理解**
2. **1 步开始**
3. **即时反馈**
4. **异常可恢复**
5. **结果可带走**
6. **真实场景贴合**

### 新工具上线前产品检查

- 默认状态是否清楚可用。
- 首次进入是否知道下一步。
- 常见输入是否能一次成功。
- 错误提示是否是人话。
- 结果是否容易复制 / 下载。
- 移动端是否顺手。
- 是否有至少一个真实场景预设或示例。
- Related tools 是否构成自然下一步。

## 新工具开发规范

### 必须满足

- 工具粒度要小：一个工具只做一件事。
- 纯前端运行，不上传数据，不依赖后端。
- 每个工具必须有独立：`<title>`、`<meta description>`、canonical、JSON-LD、Related Tools、Learn More / FAQ。

### 文件结构模板

```html
<!-- nav.ds-tool-nav -->
<!-- div.ds-tool-header -->
<!-- div.main -->
<!--   工具核心 UI -->
<!--   AUTO-SEO-SECTIONS: ds-seo-content + ds-related-tools + ds-seo-more -->
<!-- footer -->
<!-- tools-data.js + tool-page-icon.js + stb_recent snippet -->
```

## 全站架构规则

### tools-data.js

`public/tools-data.js` 是全站唯一工具数据源。

新增工具后必须：

1. 在 `SITE_TOOLS` 中追加记录。
2. `tag` 必须是有效值：`image` / `text` / `encode` / `format` / `convert` / `calculator` / `generate` / `reference` / `design` / `pdf`。
3. 为对应 hub 分组更新 `HUB_PAGE_CONFIG`。
4. 在 `tools-meta.js` 中追加完整 metadata。

### 有效 tag 列表

```text
image | text | encode | format | convert | calculator | generate | reference | design | pdf
```

> `calculate` 是非法 tag，必须用 `calculator`。

### tools-meta.js category 与 tools-data.js tag 对照

| tag | category |
| --- | --- |
| image | image |
| text | text |
| encode | encode |
| format | format |
| convert | convert |
| calculator | calculator |
| generate | generate |
| reference | reference |
| design | design |
| pdf | pdf |

### 主图标规则

- `public/tools-data.js` 中的 `icon` 是全站唯一主图标来源。
- 优先使用 emoji。

## QA 检查规范

| 变动类型 | 示例 | 必须执行 |
| --- | --- | --- |
| 低风险 | 单工具逻辑 / 文案修改 | `python scripts/validate-tools.py <slug>` |
| 中风险 | 新增工具、`tools-data.js`、`tools-meta.js` | 全量 validate + page audit + 总报告 |
| 高风险 | 设计系统、全局布局、共享组件 | 全量 validate + page audit + smoke + visual + 总报告 |

默认总入口：

```bash
python scripts/generate-report.py
```

## 当前约束

- 工具页编码脏字符已全量修复，无需再惦记此历史债务。
- 旧 `reference` 页已从“坏掉”修回可用状态，不应继续无上限投入。
- 仍不能把“运行稳定”误写成“所有结构遗留都已完成”。
- `missing site-navigation.js: 70` 目前只是静态接线统计，不是当前运行阻塞清单。

## 下一步

Product Hunt 已于 2026-03-29 上线。继续扩张工具数量，目标 300。

建议下一批：

1. 更多 calculator：`currency-converter-live`、`unit-price-calculator`、`sleep-calculator`
2. 更多 image 工具：`image-border-radius-preview`、`color-palette-from-image`（已有）
3. 更多 text 工具：`text-to-morse`、`nato-alphabet`、`pig-latin-converter`

## 成功标准

1. 工具数稳定增长，每个新页对应明确任务词。
2. 共享数据源和模板持续收敛。
3. QA 一直保持自动可验证。
4. 站点从“工具集合”变成“任务搜索入口”。

## 工具页共享外壳迁移现状（2026-03-30）

所有结构前提已清零。下一步是执行真正的外壳接线。

当前 201 个工具页状态：

- **200 个可直接迁移**：所有脏字符已清，`ds-tool-main` 已齐，`What is ...` + `How to Use ...` 已齐
- **1 个永久 cleanup 例外**：`lorem-ipsum-generator`，存在有意保留的中文按钮文本
- **0 个人工分组**（原 61 个，本轮已全量修复）

### 本轮（2026-03-30）新增的修复脚本

- **`scripts/fix-cleanup-dirty.py`**：修复 33 个 cleanup 页的 ds-related-icon 乱码、HTML 注释内 emoji、特定符号错误
- **`scripts/fix-cleanup-remaining.py`**：修复 14 个剩余 cleanup 页（own icon、U+9200 分隔符、uuid checkmark、jwt 指示点、calorie 性别、slug placeholder）
- **`scripts/fix-how-to-use.py`**：22 个标题重命名（”How to Convert X” → “How to Use [Tool Name]”）+ 4 个新增 How to Use 段
- **`scripts/fix-full-structure.py`**：14 个页面补全（ds-tool-main + What is + How to Use）
- **`scripts/fix-manual-remaining.py`**：21 个人工分组页修复（Pattern A/B/C）
- **`scripts/fix-script-cjk.py`**：72 个 cleanup 页清理 script/style 块内 CJK（JS 注释去非 ASCII + 字符串 \uXXXX 转义）

### 直迁首批（黄金样本，建议第一波）

`base64`、`css-minifier`、`js-formatter`、`aes`、`color-palette`、`contrast-checker`、`countdown`、`gradient-generator`、`html-formatter`、`roman-numerals`、`url-builder`、`url-encode`

先迁这 12 页，验证通过后再扩大至剩余 188 页。

### 迁移策略

- 共享外壳脚本必须保持**幂等初始化**。
  - 已确认的真实坑：`tool-page-icon.js` 与 `site-navigation.js` 重复初始化，会导致左侧栏折叠按钮点击后立刻被回滚，看起来像”无法点击”。
- 每页接线必须同时具备：共享 `nav.ds-nav#nav`、`STB_PAGE_CONTEXT`、`site-navigation.js`、`ds-tool-context`、标准 SEO 骨架。
- 迁移前运行：`python scripts/audit-tool-shell-migration.py`，确认无 `dirty_markup` / `missing_ds_tool_main` / `missing_what_section` / `missing_how_section`。

### 防止再次踩坑的硬指令

- 所有 HTML / CSS / JS 批量编辑必须使用 UTF-8 读写，禁止用系统默认编码重写整文件。
- 工具页共享外壳迁移前，必须先运行：

```bash
python scripts/audit-tool-shell-migration.py
```

- 如果迁移只涉及单页，至少先运行：

```bash
python scripts/audit-tool-shell-migration.py <slug>
```

- `audit-tool-shell-migration.py` 报出以下任一问题时，不得直接进入批量迁移：
  - `dirty_markup`
  - `partial_shared_shell`
  - `missing_ds_tool_main`
  - `missing_what_section`
  - `missing_how_section`
- 所有共享初始化脚本必须幂等：
  - 重复执行不得重复绑事件
  - 重复执行不得重复插入壳层 DOM
  - 重复执行不得回滚已有 UI 状态
- 共享外壳迁移提交前，除常规 QA 外，必须人工确认：
  - 左 rail 折叠按钮真实切换状态
  - breadcrumb 正常
  - 顶部搜索可用
  - SEO / related / footer 未被结构错误打断

### 长期防 Bug 方法

- 共享外壳、SEO 骨架、工具业务逻辑不要在同一批改动里一起大改。
  - 推荐拆分为：
    1. 外壳接线
    2. SEO 骨架
    3. 工具交互或样式细化
- 共享能力必须有单一所有权。
  - `site-navigation.js` 负责导航壳层时，其他脚本不得再次手动初始化同一能力，除非显式做了幂等保护。
- 改共享脚本或共享样式后，必须同步做缓存失效。
  - 例如 bump `site-navigation.js?v=...`、`design-system.css?v=...`
  - 否则本地验证通过，浏览器仍可能命中旧资源。
- 对旧脏页，禁止“先叠新功能再顺手迁移”。
  - 先清编码和坏标签
  - 再接共享外壳
  - 最后做功能或 UI 调整
- 对高风险改动，必须做代表页抽样，而不是只看当前页。
  - 至少覆盖：
    - 1 个 text / developer 页
    - 1 个 calculator 页
    - 1 个 image 或 pdf 页
    - 1 个已迁移基准页（如 `base64`）
- 共享结构变更必须做桌面和移动端双检查。
  - 桌面端重点看 rail、breadcrumb、版心
  - 移动端重点看 drawer、顶部搜索、首屏工具可用性
- 能用 HTML 实体表达的符号，优先不用直接 Unicode 字符。
  - 例如中点、箭头、下拉箭头、乘号、长破折号
  - 对旧页尤其如此，可减少编码链路出错概率
- 对批量替换，优先做“小批次 + 复验”。
  - 不要一次改几十页后再看结果
  - 先拿 3-5 页验证流程，再扩大批次
- 对共享外壳 PR，必须默认怀疑“结构合法但交互坏了”。
  - 仅通过 `validate-tools.py` 不足以判定完成
  - 必须补浏览器级交互确认
- 一旦 `audit-tool-shell-migration.py` 把页面打到 `cleanup` 或 `manual` 组，后续任务中必须保留该分组，不得为了赶进度跳过。
- 运行稳定性体检与共享外壳迁移必须分开记账：
  - 前者可以清零
  - 后者仍可能保留非阻塞债务
