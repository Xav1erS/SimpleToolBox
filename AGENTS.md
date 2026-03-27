# Instructions

## 工作规范

- 永远使用中文回复。
- 回答先给结论，再给关键步骤。
- 在执行命令、修改文件或运行测试前，先简要说明要做什么。
- 修改代码后，说明涉及的文件和关键变化。
- 优先做最小必要修改，避免无关重构。

## 当前真实状态（2026-03-26）

- **201 个工具页**已上线，全站 preflight 全绿。
- **6 个站点页**已完成设计系统迁移：`index`、`all-tools`、`about`、`privacy`、`terms`、`contact`。
- **8 个 hub 页**已存在并接入共享数据源：
  - `image-tools`、`developer-tools`、`text-tools`、`calculator-tools`
  - `converter-tools`、`generator-tools`、`pdf-tools`
  - `all-tools`（JS 渲染，支持分组 + 搜索 + Popular / Recently Used）
- `public/tools-data.js` 是首页、all-tools、8 个 hub 页共享的唯一工具数据源。
- `public/tools-meta.js` 已覆盖全部 201 个工具（0 errors，0 warnings）。
- **Product Hunt 已提交，2026-03-29 上线。**
- **sitemap.xml** 已同步全部工具页（211 URLs = 201 tools + 10 site pages）。

### 最新 preflight（2026-03-26）

- Tools: 201
- Metadata failures: 0
- Page load failures: 0
- Console errors: 0
- Smoke test failures: 0
- Visual failures: 0

## 最近已完成的重要进展

### 工具增长（106 → 201，跨越 200 里程碑）

分多批新增，主要类别：

**Image 工具：** webp-to-png、image-sepia、image-vignette、image-tint、image-noise

**Text 工具：** reading-time-estimator、text-repeater、text-statistics、remove-line-breaks、remove-duplicate-words、word-scrambler

**Calculator 工具：** tax-calculator、body-fat-calculator、scientific-calculator、retirement-calculator、time-duration-calculator、aspect-ratio-calculator、pace-calculator、tip-splitter、age-in-days、loan-amortization-calculator

**Generator / Design 工具：** color-scheme-generator、css-box-shadow-generator、placeholder-image-generator、random-color-generator、gradient-text-generator

**Developer 工具：** binary-calculator

**PDF 工具（第一批）：** pdf-to-image、image-to-pdf、pdf-page-counter、pdf-compress、pdf-merge、pdf-split、pdf-rotate-pages、pdf-extract-text、pdf-metadata-viewer、pdf-add-watermark、pdf-to-markdown

### 全站定位统一

- 从 "developer tools" 统一改为 "everyday tasks"
- 首页描述、schema、meta 全部更新

### all-tools.html 重构

- JS 渲染替代 156 条静态卡片
- Popular / Recently Used 嵌入内容区
- 筛选栏层级修正

### 首页优化

- Popular Tools 重排：image/text 工具置顶
- New Tools 区块补充
- footer Tools 区：占位 `#` 链接 → 真实 hub 页链接
- stats：0 "Data Collected" 替换旧文案

### 工具页全局

- 全部 201 个工具页注入 `stb_recent` localStorage tracking snippet
- `og:image`、`twitter:card: summary_large_image`、`apple-touch-icon` 补全

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

- **201 → 300**：继续补齐场景词和组合页
- **300 → 500**：关键词矩阵 + hub 网络 + 工具链

### 扩张优先级

1. **Image**
2. **Text**
3. **Calculators**
4. **Generators / Utility**
5. **Developer**
6. **PDF**

### 当前不做或延后

- 不大规模做 AI 轻工具
- 不做场景页（暂）
- 不做多语言
- 不做关键词换皮页

## 工具竞争力策略

好工具必须同时满足：

1. **可发现**：对应明确任务词
2. **可使用**：打开后能立刻开始
3. **可完成**：能稳定产出用户真正想要的结果
4. **可带走**：结果复制、下载、导出顺手
5. **可继续**：有清晰的下一步 related tools 路径

### 好工具的 6 条统一标准

1. **1 秒理解**
2. **1 步开始**
3. **即时反馈**
4. **异常可恢复**
5. **结果可带走**
6. **真实场景贴合**

### 新工具上线前产品检查

- 默认状态是否清楚可用
- 首次进入是否知道下一步
- 常见输入是否能一次成功
- 错误提示是否是人话
- 结果是否容易复制/下载
- 移动端是否顺手
- 是否有至少一个真实场景预设或示例
- Related tools 是否构成自然下一步

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

1. 在 `SITE_TOOLS` 中追加记录（tag 必须是有效值：`image` / `text` / `encode` / `format` / `convert` / `calculator` / `generate` / `reference` / `design` / `pdf`）
2. 为对应 hub 分组更新 `HUB_PAGE_CONFIG`
3. 在 `tools-meta.js` 中追加完整 metadata

### 有效 tag 列表

```text
image | text | encode | format | convert | calculator | generate | reference | design | pdf
```

> ⚠️ `calculate` 是非法 tag，必须用 `calculator`。

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
| 低风险 | 单工具逻辑/文案修改 | `python scripts/validate-tools.py <slug>` |
| 中风险 | 新增工具、tools-data.js、tools-meta.js | 全量 validate + page audit + 总报告 |
| 高风险 | 设计系统、全局布局、共享组件 | 全量 validate + page audit + smoke + visual + 总报告 |

默认总入口：

```bash
python scripts/generate-report.py
```

## 当前约束

- 旧工具页仍有少量历史编码脏字符，优先级低于新增工具。
- 旧 `reference` 页已从"坏掉"修回可用状态，不应继续无上限投入。

## 下一步

Product Hunt 已于 2026-03-29 上线。继续扩张工具数量，目标 300。

建议下一批：

1. 更多 calculator：`currency-converter-live`、`unit-price-calculator`、`sleep-calculator`
2. 更多 image 工具：`image-border-radius-preview`、`color-palette-from-image`（已有）
3. 更多 text 工具：`text-to-morse`（已有 morse-code）、`nato-alphabet`、`pig-latin-converter`

## 成功标准

1. 工具数稳定增长，每个新页对应明确任务词
2. 共享数据源和模板持续收敛
3. QA 一直保持自动可验证
4. 站点从"工具集合"变成"任务搜索入口"

## 工具页共享外壳迁移现状（2026-03-28）

围绕“工具页左侧栏外壳 + SEO 骨架统一”已完成一次全量静态审计，当前 201 个工具页应按以下三组推进，不能混做：

- **12 个可直接批量迁移**
  - 特征：结构干净，已具备稳定外壳基础，且 `What is ...` / `How to Use ...` 两个必选 SEO 槽位齐全。
  - 当前可作为优先迁移样板的页包括：`base64`、`css-minifier`、`js-formatter`、`aes`、`color-palette`、`contrast-checker`、`countdown`、`gradient-generator`、`html-formatter`、`roman-numerals`、`url-builder`、`url-encode`。

- **128 个先清理再批量迁移**
  - 特征：外壳和 SEO 骨架大体齐，但仍带历史编码脏字符、坏闭合标签或旧图标乱码。
  - 这组不要直接接共享导航和左 rail；应先做“脏字符 / 坏标签清理”，再按批量模板迁移。

- **61 个需要人工单页处理**
  - 特征：除了脏字符，还叠加结构缺口。
  - 当前高频问题统计：
    - `48` 个缺 `How to Use ...`
    - `35` 个缺 `ds-tool-main`
    - `22` 个缺 `What is ...`
    - `5` 个连主内容容器都不完整
  - 这组必须单页修复，不适合先走自动批量迁移。

### 迁移策略更新

- 后续迁移必须先做“迁移前体检”，至少检查：
  - 是否存在 mojibake / 脏字符
  - 是否存在坏闭合标签
  - 是否具备 `ds-tool-main`
  - 是否具备 `What is ...` / `How to Use ...`
- 共享外壳脚本必须保持**幂等初始化**。
  - 已确认的真实坑：`tool-page-icon.js` 与 `site-navigation.js` 重复初始化，会导致左侧栏折叠按钮点击后立刻被回滚，看起来像“无法点击”。
- 后续批量迁移顺序固定为：
  1. 先迁 `12` 个直迁页
  2. 再清理 `128` 个脏页并批量迁移
  3. 最后处理 `61` 个人工页
- 不再接受“半迁移页”状态。
  - 已迁移完成的工具页必须同时满足：共享 `nav.ds-nav#nav`、`STB_PAGE_CONTEXT`、`site-navigation.js`、`ds-tool-context`、标准 SEO 骨架。
