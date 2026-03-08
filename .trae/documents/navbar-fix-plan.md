# 导航栏修复计划

## 问题描述
页面上仅显示一个 `a` 元素而非完整的导航栏，导航栏无法正确渲染。

## 根本原因分析

### 1. HTML实体编码问题
- 多个HTML文件使用了HTML实体编码（`&lt;`, `&gt;`, `&amp;`等）而非实际HTML标签
- 这导致浏览器将HTML代码显示为文本而非解析为HTML元素
- 受影响的文件包括：about.html, contact.html, privacy.html, terms.html, tools/index.html等

### 2. JavaScript文件中的HTML实体编码
- framework.js文件中使用了`=&gt;`而非`=>`，导致JavaScript语法错误
- 这会影响导航栏的交互功能（移动菜单、主题切换等）

### 3. CSS变量缺失
- design-system.css缺少一些被framework.css使用的变量：
  - `--linear-spacing-3xl`
  - `--linear-font-size-4xl`
  - `--linear-radius-md`

### 4. z-index冲突
- design-system.css中的`body::before`伪元素设置了`z-index: 1000`
- 这会覆盖导航栏（z-index: 100），导致导航栏无法显示

## 修复步骤

### 步骤1：修复HTML实体编码问题
- [ ] 创建自动化脚本批量修复所有HTML文件
- [ ] 将`&lt;`替换为`<`
- [ ] 将`&gt;`替换为`>`
- [ ] 将`&amp;`替换为`&`
- [ ] 将`&quot;`替换为`"`
- [ ] 将`&#39;`替换为`'`
- [ ] 将`&nbsp;`替换为空格

### 步骤2：修复JavaScript文件
- [ ] 修复framework.js中的所有HTML实体编码
- [ ] 将`=&gt;`替换为`=>`
- [ ] 将`&amp;&amp;`替换为`&&`
- [ ] 将HTML标签实体编码替换为实际标签

### 步骤3：添加缺失的CSS变量
- [ ] 在design-system.css中添加：
  - `--linear-spacing-3xl: 4rem`
  - `--linear-font-size-4xl: 3rem`
  - `--linear-radius-md: 8px`

### 步骤4：修复z-index冲突
- [ ] 将design-system.css中的`body::before`的z-index从1000改为-1

### 步骤5：验证修复结果
- [ ] 检查所有页面导航栏是否正确显示
- [ ] 验证桌面端导航栏（完整菜单、下拉列表、搜索框）
- [ ] 验证移动端导航栏（汉堡菜单、移动菜单）
- [ ] 测试响应式切换
- [ ] 验证所有交互功能（主题切换、菜单展开/收起）

## 预期结果
- 所有页面的导航栏能够完整显示
- 桌面端显示完整导航菜单和下拉工具列表
- 移动端显示汉堡菜单，点击后展开移动导航
- 主题切换和搜索功能正常工作
- 响应式设计在不同屏幕尺寸下正常工作

## 文件清单
需要修复的文件：
1. public/about.html
2. public/contact.html
3. public/privacy.html
4. public/terms.html
5. public/tools/index.html
6. public/tools/framework-template.html
7. public/tools/_tool-template.html
8. public/tools/image-background-remover/index.html
9. public/tools/image-resizer-online/index.html
10. public/tools/json-formatter-tool/index.html
11. public/tools/password-generator/how-to-use.html
12. public/tools/password-generator/index.html
13. public/tools/password-generator/what-is.html
14. public/tools/pdf-to-word-converter/index.html
15. public/tools/random-number-generator/index.html
16. public/tools/unit-converter/index.html
17. public/tools/word-counter-tool/index.html
18. public/tools/youtube-thumbnail-downloader/index.html
19. public/js/framework.js
20. public/css/design-system.css
