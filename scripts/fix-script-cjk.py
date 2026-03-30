#!/usr/bin/env python3
"""
Remove raw CJK characters from <script> and <style> blocks in tool pages.

Strategy per block type:
  <style>  — strip non-ASCII from CSS block comments (/* ... */)
             CSS line comments don't exist, so only block comments.
  <script> — strip non-ASCII from JS line comments (// ...)
             strip non-ASCII from JS block comments (/* ... */)
             convert raw CJK in string/template literals to \\uXXXX escapes
             (preserves exact runtime behaviour; removes raw codepoints from file)

Pages with only script-block CJK after content fixes will move from
cleanup → direct in the migration audit.

Run:
    python scripts/fix-script-cjk.py              # all pages
    python scripts/fix-script-cjk.py <slug>       # single page
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
TOOLS_DIR = ROOT / "public" / "tools"

sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def has_cjk(s: str) -> bool:
    return any(0x3400 <= ord(c) <= 0x9FFF for c in s)


def strip_nonascii_from_css_comments(css: str) -> str:
    """Remove non-ASCII chars from CSS block comments."""
    def clean(m: re.Match) -> str:
        inner = m.group(1)
        cleaned = re.sub(r"[^\x00-\x7F]+", "", inner)
        return f"/*{cleaned}*/"
    return re.sub(r"/\*(.*?)\*/", clean, css, flags=re.DOTALL)


def strip_nonascii_from_js_comments(js: str) -> str:
    """Remove non-ASCII from JS line and block comments."""
    result = []
    i = 0
    in_string = None   # None, "'", '"', '`'
    escape_next = False

    while i < len(js):
        ch = js[i]

        if escape_next:
            result.append(ch)
            escape_next = False
            i += 1
            continue

        if in_string:
            if ch == "\\" and in_string != "`":
                result.append(ch)
                escape_next = True
                i += 1
                continue
            if ch == in_string:
                in_string = None
            result.append(ch)
            i += 1
            continue

        # Not in a string — check for string start
        if ch in ("'", '"', "`"):
            in_string = ch
            result.append(ch)
            i += 1
            continue

        # Line comment //
        if js[i:i+2] == "//":
            end = js.find("\n", i)
            if end == -1:
                end = len(js)
            comment = js[i:end]
            result.append(re.sub(r"[^\x00-\x7F]+", "", comment))
            i = end
            continue

        # Block comment /*
        if js[i:i+2] == "/*":
            end = js.find("*/", i + 2)
            if end == -1:
                end = len(js) - 2
            comment = js[i:end + 2]
            cleaned = "/*" + re.sub(r"[^\x00-\x7F]+", "", comment[2:-2]) + "*/"
            result.append(cleaned)
            i = end + 2
            continue

        result.append(ch)
        i += 1

    return "".join(result)


def escape_cjk_in_js_strings(js: str) -> tuple[str, int]:
    """
    Convert raw CJK codepoints inside JS string/template literals to \\uXXXX.
    Handles single-quoted, double-quoted, and template literal strings.
    Returns (fixed_js, count_of_replacements).
    """
    result = []
    i = 0
    in_string = None
    escape_next = False
    fixes = 0

    while i < len(js):
        ch = js[i]

        if escape_next:
            result.append(ch)
            escape_next = False
            i += 1
            continue

        if in_string:
            if ch == "\\" and in_string != "`":
                result.append(ch)
                escape_next = True
                i += 1
                continue
            if ch == in_string and in_string != "`":
                in_string = None
                result.append(ch)
                i += 1
                continue
            if ch == "`" and in_string == "`":
                in_string = None
                result.append(ch)
                i += 1
                continue
            # Inside string: escape CJK
            if 0x3400 <= ord(ch) <= 0x9FFF:
                result.append(f"\\u{ord(ch):04X}")
                fixes += 1
            else:
                result.append(ch)
            i += 1
            continue

        # Skip line comments
        if js[i:i+2] == "//":
            end = js.find("\n", i)
            if end == -1:
                end = len(js)
            result.append(js[i:end])
            i = end
            continue

        # Skip block comments
        if js[i:i+2] == "/*":
            end = js.find("*/", i + 2)
            if end == -1:
                end = len(js) - 2
            result.append(js[i:end + 2])
            i = end + 2
            continue

        # String start
        if ch in ("'", '"', "`"):
            in_string = ch
            result.append(ch)
            i += 1
            continue

        # Outside strings/comments — still escape bare CJK (rare, but safe)
        if 0x3400 <= ord(ch) <= 0x9FFF:
            result.append(f"\\u{ord(ch):04X}")
            fixes += 1
        else:
            result.append(ch)
        i += 1

    return "".join(result), fixes


def clean_style_block(block: str) -> str:
    return strip_nonascii_from_css_comments(block)


def clean_script_block(block: str) -> tuple[str, int]:
    block = strip_nonascii_from_js_comments(block)
    block, n = escape_cjk_in_js_strings(block)
    return block, n


def process_page(content: str) -> tuple[str, int, int]:
    """
    Process all <style> and <script> blocks.
    Returns (new_content, style_fixes, script_fixes).
    """
    style_fixes = 0
    script_fixes = 0

    def replace_style(m: re.Match) -> str:
        nonlocal style_fixes
        tag_open = m.group(1)
        inner = m.group(2)
        tag_close = m.group(3)
        cleaned = clean_style_block(inner)
        if cleaned != inner:
            style_fixes += 1
        return tag_open + cleaned + tag_close

    def replace_script(m: re.Match) -> str:
        nonlocal script_fixes
        tag_open = m.group(1)
        inner = m.group(2)
        tag_close = m.group(3)
        cleaned, n = clean_script_block(inner)
        if n > 0 or cleaned != inner:
            script_fixes += n
        return tag_open + cleaned + tag_close

    content = re.sub(
        r"(<style[^>]*>)(.*?)(</style>)",
        replace_style,
        content,
        flags=re.DOTALL | re.IGNORECASE,
    )
    content = re.sub(
        r"(<script[^>]*>)(.*?)(</script>)",
        replace_script,
        content,
        flags=re.DOTALL | re.IGNORECASE,
    )
    return content, style_fixes, script_fixes


def fix_page(path: Path, dry_run: bool = False) -> dict:
    content = path.read_text(encoding="utf-8")

    # Quick check: any CJK at all?
    if not has_cjk(content):
        return {"slug": path.stem, "skipped": True}

    new_content, sf, xf = process_page(content)

    # Verify result
    still_dirty = has_cjk(new_content)

    if new_content != content and not dry_run:
        path.write_text(new_content, encoding="utf-8")

    return {
        "slug": path.stem,
        "style_comment_blocks": sf,
        "js_string_escapes": xf,
        "changed": new_content != content,
        "still_dirty": still_dirty,
    }


def main() -> None:
    target_slug = sys.argv[1] if len(sys.argv) > 1 else None

    if target_slug:
        paths = [TOOLS_DIR / f"{target_slug}.html"]
    else:
        paths = sorted(TOOLS_DIR.glob("*.html"))

    changed = []
    still_dirty = []

    for path in paths:
        if not path.exists():
            print(f"  NOT FOUND: {path}")
            continue
        r = fix_page(path)
        if r.get("skipped"):
            continue
        if r["changed"]:
            changed.append(r)
        if r["still_dirty"]:
            still_dirty.append(r["slug"])

    print(f"Pages cleaned: {len(changed)}")
    for r in changed:
        print(f"  {r['slug']}: style_comments={r['style_comment_blocks']} js_escapes={r['js_string_escapes']}")

    print(f"\nStill dirty after fix: {len(still_dirty)}")
    for s in still_dirty:
        print(f"  {s}")


if __name__ == "__main__":
    main()
