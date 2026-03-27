"""
bump-css-version.py
-------------------
在修改 `design-components.css` 后执行：
1. 读取 `design-system.css` 中当前的 `design-components.css?v=...`
2. 将该版本号 +1
3. 批量更新 `public/**/*.html` 中的 `design-system.css?v=...`

这个脚本使用二进制读写，只替换 ASCII 版本号片段，
避免仓库中历史编码文件导致的 UnicodeDecodeError。
"""

import os
import re
import sys

BASE = os.path.dirname(os.path.abspath(__file__))
DESIGN_SYSTEM = os.path.join(BASE, "public", "styles", "design-system.css")
PUBLIC_DIR = os.path.join(BASE, "public")

COMPONENT_PATTERN = re.compile(rb"design-components\.css\?v=(\d+)")
HTML_PATTERN = re.compile(rb"design-system\.css\?v=(\d+)")


def read_bytes(path):
    try:
        with open(path, "rb") as f:
            return f.read()
    except OSError as e:
        print(f"ERROR: 无法读取 {path}: {e}")
        sys.exit(1)


def write_bytes(path, content):
    try:
        with open(path, "wb") as f:
            f.write(content)
    except OSError as e:
        print(f"ERROR: 无法写入 {path}: {e}")
        sys.exit(1)


def bump():
    ds_content = read_bytes(DESIGN_SYSTEM)

    comp_match = COMPONENT_PATTERN.search(ds_content)
    if not comp_match:
        print("ERROR: 未找到 design-components.css 的版本号")
        sys.exit(1)

    old_comp_v = int(comp_match.group(1).decode("ascii"))
    new_comp_v = old_comp_v + 1
    ds_new = ds_content.replace(
        f"design-components.css?v={old_comp_v}".encode("ascii"),
        f"design-components.css?v={new_comp_v}".encode("ascii"),
    )

    old_ds_v = None
    for root, _, files in os.walk(PUBLIC_DIR):
        for fname in files:
            if not fname.endswith(".html"):
                continue
            path = os.path.join(root, fname)
            content = read_bytes(path)
            match = HTML_PATTERN.search(content)
            if match:
                old_ds_v = int(match.group(1).decode("ascii"))
                break
        if old_ds_v is not None:
            break

    if old_ds_v is None:
        print("ERROR: 未在 HTML 文件中找到 design-system.css 的版本号")
        sys.exit(1)

    new_ds_v = old_ds_v + 1

    write_bytes(DESIGN_SYSTEM, ds_new)
    print(f"[design-system.css] design-components.css?v={old_comp_v} -> v={new_comp_v}")

    html_count = 0
    replacement = f"design-system.css?v={new_ds_v}".encode("ascii")
    for root, _, files in os.walk(PUBLIC_DIR):
        for fname in files:
            if not fname.endswith(".html"):
                continue
            path = os.path.join(root, fname)
            content = read_bytes(path)
            new_content, changed = HTML_PATTERN.subn(replacement, content)
            if changed > 0:
                write_bytes(path, new_content)
                html_count += changed

    print(f"[HTML]             design-system.css?v={old_ds_v} -> v={new_ds_v} ({html_count} 处替换)")
    print("Done. 请重新 git add 后提交。")


if __name__ == "__main__":
    bump()
