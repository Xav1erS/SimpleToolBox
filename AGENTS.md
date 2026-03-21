# Instructions

## 工作规范

- 永远使用中文回复。
- 回答先给结论，再给关键步骤。
- 在执行命令、修改文件或运行测试前，先简要说明要做什么。
- 修改代码后，说明涉及的文件和关键变化。
- 优先做最小必要修改，避免无关重构。

## 当前真实状态（2026-03-21）

- **84 个工具页**已上线，全部接入统一工具页模板体系与完整 SEO 结构。
- **6 个站点页**已完成设计系统迁移：`index`、`all-tools`、`about`、`privacy`、`terms`、`contact`。
- **3 个 hub 页**已存在并接入共享数据源：`image-tools`、`developer-tools`、`text-tools`。
- `public/tools-data.js` 已成为首页、`all-tools.html`、3 个 hub 页共享的唯一工具数据源。
- `public/tools-meta.js` 已覆盖全部 84 个工具；`scripts/render-tool-sections.py` 负责统一渲染结构化数据与 SEO 区块。
- QA 体系已打通，最新 [`reports/preflight-report.md`](C:/Users/Windows11/Documents/GitHub/SimpleToolBox/reports/preflight-report.md) 为全绿：
  - total tools: 84
  - metadata failures: 0
  - page load failures: 0
  - smoke failures: 0
  - visual failures: 0

## 项目最高策略

### 1. 真实定位

SimpleToolBox 不是纯开发者工具站，也不是传统目录站，而是：

**任务导向型在线工具站**

用户带着明确任务来站点：

- 压缩
- 转换
- 提取
- 格式化
- 生成
- 计算
- 检查

所以所有决策都要服从这 5 个原则：

1. **工具优先**：第一屏必须马上可用。
2. **搜索优先**：每个页面都要对应真实任务和搜索意图。
3. **扩张优先**：架构必须支持 100 / 150 / 500 工具持续扩展。
4. **轻导航优先**：不做重型目录，优先搜索、分区、hub、related tools。
5. **内链优先**：页面必须互相输送点击与权重。

### 2. 当前阶段目标

当前不是继续做设计系统迁移，而是：

1. **84 → 100**：继续新增高频纯前端工具
2. **100 → 150**：补齐主类目骨架
3. **150 → 300**：开始做场景词和组合页
4. **300 → 500**：形成关键词矩阵、hub 网络、工具链

同时必须并行推进一条独立主线：

5. **工具竞争力建设**：确保站内工具不仅“有”，而且“更好用”

### 3. 当前最重要的扩张顺序

基于当前实际工具分布，优先级调整为：

1. **Image**
2. **Text**
3. **Calculators**
4. **Generators / Utility**
5. **Developer**
6. **PDF**

原因：

- 当前开发/编码/转换类已经不算少
- Image / Text / Calculator 更接近大众任务词
- PDF 竞争强且很多功能不适合在当前阶段大量做

### 4. 当前不做或延后做的事

- 暂不把 PDF 作为主扩张方向
- 暂不大规模做 AI 轻工具
- 暂不大规模做场景页
- 暂不做多语言
- 暂不做“只有标题不同”的关键词换皮页

## 工具竞争力策略

SEO 负责把用户带进来，工具竞争力负责让用户一次用成、愿意再来。

后续所有工具都要同时满足：

1. **可发现**：对应明确任务词
2. **可使用**：打开后能立刻开始
3. **可完成**：能稳定产出用户真正想要的结果
4. **可带走**：结果复制、下载、导出顺手
5. **可继续**：有清晰的下一步 related tools 路径

### 好工具的 6 条统一标准

1. **1 秒理解**
   - 页面标题、描述、默认文案必须让用户立刻明白用途
2. **1 步开始**
   - 输入框、上传区、示例、粘贴入口必须直接可见
3. **即时反馈**
   - 选项变化、预设点击、滑块调整后结果要立即刷新
4. **异常可恢复**
   - 空输入、错误输入、大文件、非法格式时不能崩
5. **结果可带走**
   - Copy / Download / Reset / Retry 要顺手
6. **真实场景贴合**
   - 默认值、预设、输出格式要接近用户真实任务，不只是“功能可运行”

### 竞争力优先级判断

不是每个工具都值得深挖到同一程度。

- **重点打磨型工具**
  - 高频大众需求
  - 图片压缩/转换/尺寸
  - 文本提取/清理/计数
  - 常用计算器
  - 这类页面要追求“比同类工具更顺手”
- **基础覆盖型工具**
  - 中低频长尾
  - 参考查询
  - 小众转换页
  - 这类页面先保证稳定、清晰、够用

### 新工具上线前，除 SEO 与 QA 外，必须再过一层产品检查

- 默认状态是否清楚可用
- 首次进入是否知道下一步该做什么
- 常见输入是否能一次成功
- 错误提示是否是人话
- 结果是否容易复制/下载
- 移动端是否仍然顺手
- 是否有至少一个真实场景预设或示例
- Related tools 是否构成自然下一步

## 新工具开发规范

### 必须满足

- 工具粒度要小：一个工具只做一件事。
- 同类工具批量开发：共享 HTML / CSS / JS 骨架，只替换核心逻辑。
- 纯前端运行，不上传数据，不依赖后端。
- 每个工具必须有独立：
  - `<title>`
  - `<meta description>`
  - canonical
  - JSON-LD
  - Related Tools
  - Learn More / FAQ / Example
- 新工具必须通过 `CLAUDE.md` 中的：
  - Migration Checklist
  - Interaction Quality Checklist

### 优先开发的工具类型

1. 文本处理：提取、清理、去重、排序、统计、格式整理
2. 图片工具：压缩、转格式、裁剪、尺寸、场景尺寸
3. 计算器：日常、工作、时间、健康、小金融长尾
4. 实用生成器：二维码、条码、用户名、随机选择器等
5. 开发工具：只补高频缺口，不再优先扩张低需求开发页

## 全站架构规则

### tools-data.js

`public/tools-data.js` 是全站唯一工具数据源，被以下页面共享：

- `public/index.html`
- `public/all-tools.html`
- `public/image-tools.html`
- `public/developer-tools.html`
- `public/text-tools.html`

新增工具后必须：

1. 在 `SITE_TOOLS` 中追加一条记录
2. 为对应 hub 分组更新 `HUB_PAGE_CONFIG`
3. 不要在 hub 页或 `all-tools.html` 里手写独立工具列表

格式：

```js
{ name: '工具名', href: 'tools/slug.html', tag: 'xxx', icon: '🔣', desc: '一句话描述' },
```

`tag` 允许值：

- `image`
- `text`
- `encode`
- `format`
- `convert`
- `generate`
- `calculator`
- `design`
- `reference`

### tools-meta.js

`public/tools-meta.js` 是全站工具页 SEO / related / learn-more 的统一元数据源。

新增工具后必须：

1. 追加完整 metadata
2. 运行 `python scripts/render-tool-sections.py <slug>`
3. 不要手写自由结构的 SEO HTML

## QA 检查规范

按变动风险执行：

| 变动类型 | 示例 | 必须执行 |
| --- | --- | --- |
| 低风险 | 单工具逻辑/文案修改 | `python scripts/validate-tools.py <slug>` + 对应 smoke |
| 中风险 | 新增工具、`tools-data.js`、`tools-meta.js`、SEO 渲染 | 全量 validate + 全量 page audit + 总报告 |
| 高风险 | 设计系统、全局布局、共享组件 | 全量 validate + 全量 page audit + smoke + visual + 总报告 |

默认总入口：

```bash
python scripts/generate-report.py
```

## 成功标准

后续所有工作都以这几个结果为导向：

1. 工具数稳定增长，但不是机械堆页
2. 每个新页都对应明确任务词
3. 共享数据源和共享模板持续收敛，而不是重新分叉
4. QA 一直保持自动可验证
5. 站点逐步从“工具集合”变成“任务搜索入口”
