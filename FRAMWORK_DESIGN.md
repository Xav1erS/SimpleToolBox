
# SimpleToolbox 标准化页面框架体系设计文档

## 1. 概述

SimpleToolbox 标准化页面框架体系是一套基于现有设计系统的完整页面开发框架，旨在统一所有工具页面的开发规范，提高开发效率，保持设计一致性。

### 1.1 设计原则

- **一致性**：所有页面遵循统一的设计规范和交互模式
- **可复用性**：组件和布局结构可高度复用
- **可扩展性**：框架易于扩展和维护
- **响应式**：所有组件自适应不同屏幕尺寸
- **无障碍**：符合WCAG无障碍设计标准

---

## 2. 页面架构

### 2.1 页面区域划分

```
┌─────────────────────────────────────────┐
│          固定区域：导航栏 (Header)       │
├─────────────────────────────────────────┤
│                                         │
│          可定制区域：主内容区            │
│          (Main Content Area)            │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  面包屑导航 (Breadcrumb)       │   │
│  ├─────────────────────────────────┤   │
│  │  工具标题区 (Tool Header)      │   │
│  ├─────────────────────────────────┤   │
│  │  工具内容卡 (Content Card)     │   │
│  │  ┌─────────────────────────┐  │   │
│  │  │  工具自定义内容区       │  │   │
│  │  │  (Tool Custom Area)    │  │   │
│  │  └─────────────────────────┘  │   │
│  ├─────────────────────────────────┤   │
│  │  特性展示区 (Features)         │   │
│  └─────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│          固定区域：页脚 (Footer)        │
└─────────────────────────────────────────┘
```

### 2.2 固定区域

#### 2.2.1 导航栏 (Header)

**文件位置**：`public/css/framework.css` - `.stb-layout-header` 类

**功能特性**：
- 品牌标识 (Logo)
- 桌面端导航链接
- 移动端汉堡菜单
- 主题切换按钮
- 固定定位，滚动时保持在顶部
- 毛玻璃效果

**HTML 结构**：
```html
&lt;header class="stb-layout-header"&gt;
    &lt;div class="stb-container"&gt;
        &lt;div class="stb-header-inner"&gt;
            &lt;a href="/" class="stb-brand"&gt;Simple Toolbox&lt;/a&gt;
            &lt;nav class="stb-nav-desktop"&gt;...&lt;/nav&gt;
            &lt;div class="stb-nav-actions"&gt;
                &lt;button class="stb-mobile-menu-btn"&gt;...&lt;/button&gt;
                &lt;button class="stb-theme-toggle"&gt;...&lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/header&gt;
```

#### 2.2.2 页脚 (Footer)

**文件位置**：`public/css/framework.css` - `.stb-layout-footer` 类

**功能特性**：
- 品牌名称
- 工具特定链接 (What Is, How to Use)
- 通用链接 (About, Terms, Privacy)
- 版权信息
- 自动更新年份

**HTML 结构**：
```html
&lt;footer class="stb-layout-footer"&gt;
    &lt;div class="stb-container"&gt;
        &lt;div class="stb-footer-content"&gt;
            &lt;div class="stb-footer-brand"&gt;...&lt;/div&gt;
            &lt;div class="stb-footer-links"&gt;...&lt;/div&gt;
            &lt;div class="stb-footer-copyright"&gt;...&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/footer&gt;
```

### 2.3 可定制区域

#### 2.3.1 面包屑导航 (Breadcrumb)

**类名**：`.stb-breadcrumb`

**用途**：显示当前页面在网站层次结构中的位置

#### 2.3.2 工具标题区 (Tool Header)

**类名**：`.stb-tool-header`

**包含元素**：
- `.stb-tool-title` - 工具主标题
- `.stb-tool-description` - 工具描述

#### 2.3.3 工具内容卡 (Content Card)

**类名**：`.stb-content-card`

**用途**：封装工具的主要功能区域

#### 2.3.4 工具自定义内容区 (Tool Custom Area)

**类名**：`.stb-tool-custom`

**用途**：工具开发者可以在此区域内自由定制内容

**规范**：
- 使用 `.stb-tool-custom` 作为根类
- 在 `&lt;style&gt;` 标签中定义该类的样式
- 遵循设计系统的颜色和间距变量

#### 2.3.5 特性展示区 (Features Section)

**类名**：`.stb-features-section`

**用途**：展示工具的特性和优势

---

## 3. 组件库

### 3.1 布局组件

| 组件名 | 类名 | 描述 |
|--------|------|------|
| 主布局容器 | `.stb-layout` | 页面根布局容器 |
| 容器 | `.stb-container` | 最大宽度1280px的内容容器 |
| 网格布局 | `.stb-grid-2`, `.stb-grid-3` | 2列或3列网格布局 |
| Flex布局 | `.stb-flex`, `.stb-flex-wrap` | 灵活布局 |

### 3.2 导航组件

| 组件名 | 类名 | 描述 |
|--------|------|------|
| 品牌标识 | `.stb-brand` | 网站Logo和名称 |
| 桌面导航 | `.stb-nav-desktop` | 桌面端导航链接 |
| 导航链接 | `.stb-nav-link` | 单个导航链接 |
| 移动端菜单 | `.stb-mobile-nav-menu` | 移动端折叠菜单 |
| 面包屑 | `.stb-breadcrumb` | 面包屑导航 |

### 3.3 表单组件

| 组件名 | 类名 | 描述 |
|--------|------|------|
| 表单标签 | `.stb-form-label` | 表单输入标签 |
| 文本输入 | `.stb-form-input` | 文本输入框 |
| 选择框 | `.stb-form-select` | 下拉选择框 |
| 文本域 | `.stb-form-textarea` | 多行文本输入 |

### 3.4 按钮组件

| 组件名 | 类名 | 描述 |
|--------|------|------|
| 主按钮 | `.stb-btn.stb-btn-primary` | 主要操作按钮 |
| 次按钮 | `.stb-btn.stb-btn-secondary` | 次要操作按钮 |
| 图标按钮 | `.stb-button-icon` | 纯图标按钮 |
| 按钮组 | `.stb-btn-group` | 按钮容器 |

### 3.5 卡片组件

| 组件名 | 类名 | 描述 |
|--------|------|------|
| 内容卡 | `.stb-content-card` | 主要内容卡片 |
| 特性卡 | `.stb-feature-card` | 特性展示卡片 |
| 卡片标题 | `.stb-card-title` | 卡片标题 |

### 3.6 反馈组件

| 组件名 | 类名 | 描述 |
|--------|------|------|
| 结果框 | `.stb-result-box` | 结果展示框 |
| 提示消息 | `.stb-toast` | 右下角提示消息 |
| 侧边栏 | `.stb-sidebar` | 侧边抽屉 |
| 模态框 | `.stb-modal-overlay`, `.stb-modal` | 模态对话框 |

### 3.7 工具类

| 类名 | 描述 |
|------|------|
| `.stb-gap-sm/md/lg` | 间距 |
| `.stb-mt-sm/md/lg` | 上外边距 |
| `.stb-mb-sm/md/lg` | 下外边距 |
| `.stb-w-100` | 宽度100% |
| `.stb-flex-center` | 居中对齐 |
| `.stb-flex-between` | 两端对齐 |

---

## 4. 中央功能区域开发规范

### 4.1 目录结构

```
public/tools/
└── [tool-id]/
    ├── index.html          # 主页面
    ├── what-is.html        # 说明页面（可选）
    ├── how-to-use.html     # 使用指南（可选）
    ├── script.js           # 工具脚本（可选）
    └── styles.css          # 工具样式（可选）
```

### 4.2 页面模板使用

**基础模板**：`public/tools/framework-template.html`

**使用步骤**：

1. 复制 `framework-template.html` 为新工具的 `index.html`
2. 替换所有 `[占位符]` 内容：
   - `[Tool Name]` - 工具名称
   - `[tool-id]` - 工具唯一标识
   - `[Tool description]` - 工具描述
   - `[icon]` - Font Awesome 图标
   - `[Card Title]` - 卡片标题
   - `[Input Label]` - 输入标签
   - `[Placeholder text]` - 占位文本
   - `[Action]` - 操作按钮文本

3. 在 `&lt;style&gt;` 标签中添加工具特定样式
4. 在 `&lt;script&gt;` 标签中实现工具逻辑

### 4.3 样式规范

**CSS变量引用**：
```css
/* 使用设计系统变量，不要硬编码颜色 */
.stb-tool-custom {
    background-color: var(--linear-bg-secondary);
    color: var(--linear-text);
    padding: var(--linear-spacing-xl);
}
```

**响应式设计**：
```css
@media (max-width: 768px) {
    .stb-tool-custom {
        padding: var(--linear-spacing-lg);
    }
}
```

### 4.4 JavaScript规范

**工具配置**：
```javascript
const toolConfig = {
    id: 'unit-converter',
    name: 'Unit Converter'
};
```

**初始化**：
```javascript
document.addEventListener('DOMContentLoaded', function() {
    STBFramework.generateFeatureCards(features, 'features-container');
    initTool();
});

function initTool() {
    // 初始化事件监听
}
```

**使用框架API**：
```javascript
// 显示提示
STBFramework.showToast('操作成功！');

// 复制到剪贴板
STBFramework.copyToClipboard(text);

// 历史记录
STBFramework.addHistory(toolConfig.id, { value: '...' });

// 收藏夹
STBFramework.addFavorite(toolConfig.id, { from: 'm', to: 'km' });

// 格式化数字
STBFramework.formatNumber(1234.5678);
```

---

## 5. Framework API 参考

### 5.1 主题管理

```javascript
// 切换主题
STBFramework.applyTheme('light' | 'dark');
```

### 5.2 提示消息

```javascript
// 显示提示
STBFramework.showToast(message, duration = 3000);

// 示例
STBFramework.showToast('Copied to clipboard!');
```

### 5.3 剪贴板操作

```javascript
// 复制到剪贴板
await STBFramework.copyToClipboard(text);

// 示例
const success = await STBFramework.copyToClipboard('Hello World');
```

### 5.4 侧边栏控制

```javascript
// 打开侧边栏
STBFramework.openSidebar('history-sidebar');

// 关闭侧边栏
STBFramework.closeSidebar('history-sidebar');

// 切换侧边栏
STBFramework.toggleSidebar('history-sidebar');
```

### 5.5 模态框控制

```javascript
// 打开模态框
STBFramework.openModal('confirm-modal');

// 关闭模态框
STBFramework.closeModal('confirm-modal');
```

### 5.6 历史记录

```javascript
// 获取历史记录
const history = STBFramework.getHistory('unit-converter');

// 添加历史记录
STBFramework.addHistory('unit-converter', {
    value: 100,
    from: 'm',
    to: 'km'
});

// 清除历史记录
STBFramework.clearHistory('unit-converter');
```

### 5.7 收藏夹

```javascript
// 获取收藏
const favorites = STBFramework.getFavorites('unit-converter');

// 添加收藏
STBFramework.addFavorite('unit-converter', {
    from: 'm',
    to: 'km'
});

// 移除收藏
STBFramework.removeFavorite('unit-converter', favoriteId);
```

### 5.8 工具函数

```javascript
// 格式化数字
STBFramework.formatNumber(1234.5678);

// 验证邮箱
STBFramework.validateEmail('test@example.com');

// 防抖函数
const debouncedFn = STBFramework.debounce(fn, 300);

// 生成特性卡片
STBFramework.generateFeatureCards(features, 'container-id');
```

---

## 6. 文件清单

### 6.1 框架核心文件

| 文件 | 位置 | 描述 |
|------|------|------|
| 框架样式 | `public/css/framework.css` | 布局和组件样式 |
| 框架脚本 | `public/js/framework.js` | 通用组件逻辑和API |
| 页面模板 | `public/tools/framework-template.html` | 标准化页面模板 |
| 设计文档 | `FRAMWORK_DESIGN.md` | 本文档 |

### 6.2 设计系统依赖

| 文件 | 位置 | 描述 |
|------|------|------|
| 设计系统样式 | `public/css/design-system.css` | 颜色、字体、间距变量 |
| Font Awesome | CDN | 图标库 |

---

## 7. 最佳实践

### 7.1 开发流程

1. **复制模板**：从 `framework-template.html` 开始
2. **替换占位符**：填写工具基本信息
3. **实现功能**：在 `.stb-tool-custom` 区域添加功能
4. **添加样式**：使用CSS变量，保持一致性
5. **测试响应式**：在不同设备上测试
6. **检查无障碍**：确保键盘可访问

### 7.2 性能优化

- 使用 `debounce` 处理频繁触发的事件
- 图片懒加载
- 避免不必要的DOM操作
- 使用CSS变量而非硬编码值

### 7.3 可访问性

- 所有交互元素都有 `aria-label`
- 键盘可导航（Tab键）
- 足够的颜色对比度
- 语义化HTML标签

---

## 8. 迁移指南

### 8.1 从现有页面迁移

1. 引入框架CSS和JS：
```html
&lt;link rel="stylesheet" href="../css/framework.css"&gt;
&lt;script src="../js/framework.js"&gt;&lt;/script&gt;
```

2. 替换布局类：
- `.layout-container` → `.stb-layout`
- `.navigation-area` → `.stb-layout-header`
- `.footer-area` → `.stb-layout-footer`

3. 使用框架API替换重复代码：
- 主题切换 → `STBFramework.initTheme()`
- 复制功能 → `STBFramework.copyToClipboard()`
- Toast提示 → `STBFramework.showToast()`

---

## 9. 更新日志

### v1.0.0 (2026-03-08)
- 初始版本发布
- 完整的布局框架
- 可复用组件库
- JavaScript API
- 标准化页面模板

---

## 10. 附录

### 10.1 参考文件

- `public/tools/unit-converter/index.html` - 完整实现示例
- `public/css/design-system.css` - 设计系统变量

### 10.2 联系与支持

如有问题或建议，请参考项目文档或联系开发团队。
