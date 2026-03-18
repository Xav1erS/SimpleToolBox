"""
bump-css-version.py
-------------------
每次修改 design-components.css 后运行此脚本：
1. 自动读取 design-system.css 中当前的 @import 版本号
2. 将版本号 +1
3. 更新 design-system.css 里的 @import 版本号
4. 批量更新所有 HTML 文件中 design-system.css 的版本号

用法：
    python bump-css-version.py
"""

import os
import re

BASE = os.path.dirname(os.path.abspath(__file__))
DESIGN_SYSTEM = os.path.join(BASE, "public", "styles", "design-system.css")
PUBLIC_DIR = os.path.join(BASE, "public")


def bump():
    # 读取 design-system.css
    with open(DESIGN_SYSTEM, "r", encoding="utf-8") as f:
        ds_content = f.read()

    # 找到 design-components.css 的当前版本号
    comp_match = re.search(r'design-components\.css\?v=(\d+)', ds_content)
    if not comp_match:
        print("ERROR: 未找到 design-components.css 的版本号")
        return

    old_comp_v = int(comp_match.group(1))
    new_comp_v = old_comp_v + 1

    # 更新 design-components.css 版本号
    ds_new = ds_content.replace(
        f"design-components.css?v={old_comp_v}",
        f"design-components.css?v={new_comp_v}"
    )

    # 找到 design-system.css 自身被 HTML 引用的版本号（从旧 HTML 中读取）
    html_pattern = re.compile(r'design-system\.css\?v=(\d+)')
    old_ds_v = None
    for root, dirs, files in os.walk(PUBLIC_DIR):
        for fname in files:
            if fname.endswith(".html"):
                path = os.path.join(root, fname)
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                m = html_pattern.search(content)
                if m:
                    old_ds_v = int(m.group(1))
                    break
        if old_ds_v is not None:
            break

    if old_ds_v is None:
        print("ERROR: 未在 HTML 文件中找到 design-system.css 的版本号")
        return

    new_ds_v = old_ds_v + 1

    # 写入 design-system.css
    with open(DESIGN_SYSTEM, "w", encoding="utf-8") as f:
        f.write(ds_new)
    print(f"[design-system.css] design-components.css?v={old_comp_v} → v={new_comp_v}")

    # 批量更新所有 HTML 文件
    html_count = 0
    for root, dirs, files in os.walk(PUBLIC_DIR):
        for fname in files:
            if fname.endswith(".html"):
                path = os.path.join(root, fname)
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                new_content, n = html_pattern.subn(
                    f"design-system.css?v={new_ds_v}", content
                )
                if n > 0:
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    html_count += n

    print(f"[HTML]             design-system.css?v={old_ds_v} → v={new_ds_v}（{html_count} 个文件）")
    print("Done. 请执行 git add 后提交。")


if __name__ == "__main__":
    bump()
