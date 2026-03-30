#!/usr/bin/env python3
"""
Fix remaining CJK dirty chars in cleanup-group tool pages.

Pass 1: ds-related-icon spans — replace corrupted icon with correct emoji
         from tools-data.js (keyed by linked tool slug).
Pass 2: HTML comments with emoji — strip emoji from comments only.
Pass 3: Specific known in-content corruptions (title/meta/text symbols).

Run:
    python scripts/fix-cleanup-dirty.py              # all cleanup pages
    python scripts/fix-cleanup-dirty.py <slug>       # single page dry-run style
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from tooling_utils import list_tool_files, read_text

ROOT = Path(__file__).parent.parent
TOOLS_DIR = ROOT / "public" / "tools"


# ── build slug → icon map from tools-data.js ──────────────────────────────────

def build_icon_map() -> dict[str, str]:
    tools_data = read_text(ROOT / "public" / "tools-data.js")
    icon_map: dict[str, str] = {}
    # Match: href: 'tools/foo.html', tag: '...', icon: '...'
    for m in re.finditer(
        r"href:\s*[\"'](tools/[\w-]+\.html)[\"']"
        r".*?icon:\s*[\"'](.*?)[\"']",
        tools_data,
        re.DOTALL,
    ):
        slug = m.group(1).replace("tools/", "").replace(".html", "")
        icon_map[slug] = m.group(2)
    return icon_map


# ── helpers ───────────────────────────────────────────────────────────────────

def script_ranges(content: str) -> list[tuple[int, int]]:
    return [
        (m.start(), m.end())
        for m in re.finditer(
            r"<(script|style)[^>]*>.*?</(script|style)>",
            content,
            re.DOTALL | re.IGNORECASE,
        )
    ]


def has_cjk_content(content: str) -> bool:
    ranges = script_ranges(content)

    def in_script(pos: int) -> bool:
        return any(s <= pos < e for s, e in ranges)

    return any(
        0x3400 <= ord(ch) <= 0x9FFF and not in_script(i)
        for i, ch in enumerate(content)
    )


# ── Pass 1: fix ds-related-icon icons ────────────────────────────────────────

def fix_related_icons(content: str, icon_map: dict[str, str]) -> tuple[str, int]:
    """Replace corrupted icons in ds-related-card spans."""
    fixes = 0

    def replacer(m: re.Match) -> str:
        nonlocal fixes
        full = m.group(0)
        href = m.group(1)          # e.g. "crop-image.html"
        current_icon = m.group(2)  # may contain CJK corruption

        slug = href.replace(".html", "").lstrip("./")
        correct_icon = icon_map.get(slug)
        if correct_icon is None:
            return full  # unknown slug, leave alone

        # Only replace if current icon contains CJK
        if any(0x3400 <= ord(ch) <= 0x9FFF for ch in current_icon):
            new_full = full.replace(
                f'<span class="ds-related-icon">{current_icon}</span>',
                f'<span class="ds-related-icon">{correct_icon}</span>',
            )
            if new_full != full:
                fixes += 1
                return new_full
        return full

    # Match: <a href="foo.html" class="ds-related-card"><span class="ds-related-icon">ICON</span>
    pattern = (
        r'<a href="([^"]+\.html)" class="ds-related-card">'
        r'<span class="ds-related-icon">([^<]*)</span>'
    )
    result = re.sub(pattern, replacer, content)
    return result, fixes


# ── Pass 2: strip emoji from HTML comments ────────────────────────────────────

def strip_emoji_from_comments(content: str) -> tuple[str, int]:
    """Remove non-ASCII chars from HTML comment text."""
    fixes = 0

    def replacer(m: re.Match) -> str:
        nonlocal fixes
        inner = m.group(1)
        cleaned = re.sub(r"[^\x00-\x7F]+", "", inner)
        if cleaned != inner:
            fixes += 1
            return f"<!--{cleaned}-->"
        return m.group(0)

    result = re.sub(r"<!--(.*?)-->", replacer, content, flags=re.DOTALL)
    return result, fixes


# ── Pass 3: known in-content symbol corruptions ───────────────────────────────

# Map of (corrupted Unicode codepoint or string) → correct replacement
# U+8100 appears as corrupted × in dimension specs like "1080 × 1080"
# U+9200 appears as corrupted → or · in titles and text
# These are heuristics; only apply where context is unambiguous.
SYMBOL_MAP: list[tuple[str, str]] = [
    ("\u8100", "\u00d7"),   # 倀 → × (multiplication sign)
    ("\u9200", "\u2192"),   # 鈀 → → (right arrow) — used in titles "A → B"
]


def fix_known_symbols(content: str, slug: str) -> tuple[str, int]:
    """Apply known symbol corrections outside script/style blocks."""
    ranges = script_ranges(content)

    def in_script(pos: int) -> bool:
        return any(s <= pos < e for s, e in ranges)

    # Only apply to specific slugs where we know the mapping is safe
    SLUG_SYMBOL_MAP: dict[str, list[tuple[str, str]]] = {
        "image-resizer": [("\u8100", "\u00d7"), ("\u9200", "\u00b7")],
        "timestamp": [("\u9200", "\u2192"), ("\u68e3\u51a8", "\U0001f310")],
    }

    corrections = SLUG_SYMBOL_MAP.get(slug, [])
    if not corrections:
        return content, 0

    fixes = 0
    result = list(content)
    i = 0
    while i < len(result):
        if in_script(i):
            i += 1
            continue
        for bad, good in corrections:
            if content[i : i + len(bad)] == bad:
                result[i : i + len(bad)] = list(good)
                fixes += 1
                break
        i += 1

    return "".join(result), fixes


# ── main ──────────────────────────────────────────────────────────────────────

def fix_page(path: Path, icon_map: dict[str, str], dry_run: bool = False) -> dict:
    slug = path.stem
    content = read_text(path)

    content, r1 = fix_related_icons(content, icon_map)
    content, r2 = strip_emoji_from_comments(content)
    content, r3 = fix_known_symbols(content, slug)

    total = r1 + r2 + r3
    still_dirty = has_cjk_content(content)

    if total > 0 and not dry_run:
        path.write_text(content, encoding="utf-8")

    return {
        "slug": slug,
        "related_icon_fixes": r1,
        "comment_fixes": r2,
        "symbol_fixes": r3,
        "total_fixes": total,
        "still_dirty": still_dirty,
    }


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    icon_map = build_icon_map()
    print(f"Icon map: {len(icon_map)} tools")

    target_slug = sys.argv[1] if len(sys.argv) > 1 else None

    if target_slug:
        paths = [TOOLS_DIR / f"{target_slug}.html"]
    else:
        # Run on all cleanup-group pages (dirty but shell_ok+seo_ok)
        paths = list(list_tool_files())

    results = []
    for path in paths:
        if not path.exists():
            print(f"  NOT FOUND: {path}")
            continue
        r = fix_page(path, icon_map, dry_run=False)
        if r["total_fixes"] > 0 or r["still_dirty"]:
            results.append(r)

    fixed = [r for r in results if r["total_fixes"] > 0]
    still = [r for r in results if r["still_dirty"]]

    print(f"\nPages with fixes applied: {len(fixed)}")
    for r in fixed:
        print(f"  {r['slug']}: related={r['related_icon_fixes']} comment={r['comment_fixes']} symbol={r['symbol_fixes']}")

    print(f"\nPages still dirty after fix: {len(still)}")
    for r in still:
        print(f"  {r['slug']}")


if __name__ == "__main__":
    main()
