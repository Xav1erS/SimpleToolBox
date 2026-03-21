# New Tool Acceptance Template

> 用途：新增工具完成后，按这份模板做一次快速验收。
> 目标：避免“结构和测试通过，但工具本身不好用”。

---

## Basic Info

- Tool name:
- Slug:
- Category:
- Related tools:
- Core user task:

---

## 1. First-Use Clarity

- [ ] 打开页面后，1 秒内能看懂这个工具是做什么的
- [ ] 第一屏里已经出现主要输入区 / 上传区 / 操作区
- [ ] 页面标题、描述、按钮文案没有歧义
- [ ] 不看 FAQ 也知道第一步该怎么开始

备注：

---

## 2. Start Friction

- [ ] 用户能在 1 步内开始操作
- [ ] 粘贴 / 输入 / 上传入口清楚可见
- [ ] 如果适合，该页提供了 sample / preset / placeholder 提示
- [ ] 默认值是合理的，不会让第一页状态显得“坏了”或“空得不知道怎么用”

备注：

---

## 3. Core Task Completion

- [ ] 用最常见输入时，能一次得到正确结果
- [ ] 输出格式符合真实场景，不只是“技术上有结果”
- [ ] 选项变化后结果立即刷新，不需要用户额外重试
- [ ] 用户完成主任务所需点击数尽量少

建议至少手测 3 类输入：

- 正常输入：
- 空输入：
- 异常 / 边界输入：

---

## 4. Error Recovery

- [ ] 空输入不会崩
- [ ] 非法输入有清楚提示
- [ ] 大文件 / 长文本 / 极端值不会直接把页面搞坏
- [ ] 错误提示是人话，不是内部实现术语
- [ ] 用户能轻松重试（重新上传 / 清空 / 改参数）

备注：

---

## 5. Output Usability

- [ ] 结果可以方便复制 / 下载 / 导出
- [ ] Copy / Download 按钮位置明显
- [ ] 操作成功后有清楚反馈（如 Copied / Done）
- [ ] 文件名 / 导出格式 / 输出文本对真实使用友好

备注：

---

## 6. Mobile Practicality

- [ ] 移动端首屏仍能理解并开始使用
- [ ] 核心按钮不会挤爆或遮挡
- [ ] 上传区 / 输入区 / 输出区在小屏仍可操作
- [ ] 不需要横向滚动才能完成主任务

备注：

---

## 7. Real-World Fit

- [ ] 默认参数贴近真实用户场景
- [ ] 如果有预设，预设是现实中常用的而不是随便凑的
- [ ] Related tools 构成自然下一步
- [ ] 这个工具和已有工具没有明显重复定位

备注：

---

## 8. Structural / SEO Checks

- [ ] 已加入 `public/tools-data.js`
- [ ] 已加入 `public/tools-meta.js`
- [ ] 已运行 `python scripts/render-tool-sections.py <slug>`
- [ ] 已更新 `public/sitemap.xml`
- [ ] `python scripts/validate-tools.py <slug>` 通过
- [ ] `python scripts/check-tools-meta.py` 通过
- [ ] 如有必要，已补 smoke test

备注：

---

## 9. Release Decision

- [ ] 可上线
- [ ] 需修小问题后上线
- [ ] 不建议上线

阻塞项：

后续优化项：
