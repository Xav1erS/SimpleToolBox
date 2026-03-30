#!/usr/bin/env python3
"""
Fix CJK dirty chars remaining in 15 cleanup pages after fix-cleanup-dirty.py.

Strategies:
  A. Tool own icon in ds-tool-header__icon / drop-icon → replace element content
     with correct emoji from tools-data.js (identified by page slug).
  B. U+9200 in <title> and <meta content> → replace with em dash "—".
  C. uuid-generator: U+9241 in checkbox-box-check spans → replace with ✓.
  D. jwt-builder: U+923B in colored indicator spans → replace with ●.
  E. calorie-calculator: corrupted gender emoji in sex-btn → ♂ / ♀.
  F. slug-generator: corrupted emoji in placeholder attr → strip to ASCII.
  G. lorem-ipsum-generator: intentional Chinese text → SKIP.

Run:
    python scripts/fix-cleanup-remaining.py
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
TOOLS_DIR = ROOT / "public" / "tools"

sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def build_icon_map() -> dict[str, str]:
    js = (ROOT / "public" / "tools-data.js").read_text(encoding="utf-8")
    return dict(re.findall(r"href:\s*'tools/([\w-]+)\.html'.*?icon:\s*'([^']+)'", js, re.DOTALL))


def has_cjk(s: str) -> bool:
    return any(0x3400 <= ord(c) <= 0x9FFF for c in s)


def script_style_ranges(content: str) -> list[tuple[int, int]]:
    return [
        (m.start(), m.end())
        for m in re.finditer(r"<(script|style)[^>]*>.*?</(script|style)>", content, re.DOTALL | re.IGNORECASE)
    ]


# ── A. Own icon in header / drop-zone ────────────────────────────────────────

def fix_own_icons(content: str, correct_icon: str) -> tuple[str, int]:
    fixes = 0

    def replace_icon_content(m: re.Match) -> str:
        nonlocal fixes
        inner = m.group(1)
        if has_cjk(inner):
            fixes += 1
            return m.group(0).replace(inner, correct_icon)
        return m.group(0)

    # ds-tool-header__icon div
    content = re.sub(
        r'(<div class="ds-tool-header__icon">)([^<]*)(<)',
        lambda m: (
            m.group(1) + correct_icon + m.group(3)
            if has_cjk(m.group(2))
            else m.group(0)
        ),
        content,
    )

    # drop-icon div
    content = re.sub(
        r'(<div class="drop-icon">)([^<]*)(<)',
        lambda m: (
            m.group(1) + correct_icon + m.group(3)
            if has_cjk(m.group(2))
            else m.group(0)
        ),
        content,
    )

    # count actual fixes made
    return content, fixes


# ── B. U+9200 in title / meta / plain text → em dash ──────────────────────────

def fix_u9200_separator(content: str) -> tuple[str, int]:
    """Replace U+9200 (鈀) with em dash — outside script/style blocks."""
    ranges = script_style_ranges(content)

    def in_block(pos: int) -> bool:
        return any(s <= pos < e for s, e in ranges)

    bad = "\u9200"
    good = "\u2014"  # em dash —
    parts = []
    fixes = 0
    i = 0
    while i < len(content):
        if content[i] == bad and not in_block(i):
            parts.append(good)
            fixes += 1
        else:
            parts.append(content[i])
        i += 1
    return "".join(parts), fixes


# ── C. uuid-generator checkmark ───────────────────────────────────────────────

def fix_uuid_checkmarks(content: str) -> tuple[str, int]:
    """Replace corrupted checkmark (U+9241) in checkbox-box-check spans with ✓."""
    bad_chars = "\u9239\u9241"  # both variants seen
    fixes = [0]

    def replacer(m: re.Match) -> str:
        inner = m.group(1)
        if any(c in inner for c in bad_chars):
            fixes[0] += 1
            return '<span class="checkbox-box-check">\u2713</span>'
        return m.group(0)

    result = re.sub(r'<span class="checkbox-box-check">([^<]*)</span>', replacer, content)
    return result, fixes[0]


# ── D. jwt-builder indicator dots ────────────────────────────────────────────

def fix_jwt_indicators(content: str) -> tuple[str, int]:
    """Replace corrupted indicator char (U+923B) in jwt colored spans with ●."""
    bad = "\u923b"
    fixes = [0]

    def replacer(m: re.Match) -> str:
        inner = m.group(2)
        if bad in inner:
            fixes[0] += 1
            return m.group(1) + "\u25cf" + m.group(3)
        return m.group(0)

    result = re.sub(
        r'(<span style="color:[^"]+">)([^<]*)(</span>)',
        replacer,
        content,
    )
    return result, fixes[0]


# ── E. calorie-calculator gender buttons ─────────────────────────────────────

def fix_calorie_gender(content: str) -> tuple[str, int]:
    """Replace corrupted gender emoji in sex-btn buttons."""
    # btnMale should have ♂, btnFemale should have ♀
    fixes = 0

    def replacer(m: re.Match) -> str:
        nonlocal fixes
        btn_id = m.group(1)
        label = m.group(2)
        icon = "\u2642" if "Male" in btn_id else "\u2640"  # ♂ or ♀
        clean_label = re.sub(r"[^\x00-\x7F]+\s*", "", label).strip()
        if not clean_label:
            clean_label = "Male" if "Male" in btn_id else "Female"
        result = f'<button class="sex-btn" id="{btn_id}">{icon} {clean_label}</button>'
        fixes += 1
        return result

    result = re.sub(
        r'<button class="sex-btn" id="([^"]+)">([^<]+)</button>',
        replacer,
        content,
    )
    # Only count actual CJK fixes
    return result, fixes if has_cjk(content[:len(result)]) else fixes


# ── F. slug-generator placeholder emoji → ASCII ───────────────────────────────

def fix_slug_placeholder(content: str) -> tuple[str, int]:
    """Remove corrupted emoji from placeholder attribute."""
    fixes = [0]

    def replacer(m: re.Match) -> str:
        val = m.group(1)
        cleaned = re.sub(r"[^\x00-\x7F]+", "", val).strip()
        if cleaned != val:
            fixes[0] += 1
            return f'placeholder="{cleaned}"'
        return m.group(0)

    result = re.sub(r'placeholder="([^"]+)"', replacer, content)
    return result, fixes[0]


# ── Main ──────────────────────────────────────────────────────────────────────

TARGETS: dict[str, list[str]] = {
    # slug: list of fix functions to apply
    "cron-builder":             ["own_icon"],
    "js-minifier":              ["own_icon"],
    "grayscale-image":          ["own_icon"],
    "image-brightness-contrast":["own_icon"],
    "image-sharpen":            ["own_icon"],
    "duotone-image":            ["own_icon"],
    "posterize-image":          ["own_icon"],
    "rounded-corners-image":    ["own_icon"],
    "calorie-calculator":       ["own_icon", "calorie_gender"],
    "image-compressor":         ["u9200", "own_icon"],
    "markdown-preview":         ["u9200"],
    "uuid-generator":           ["uuid_check"],
    "jwt-builder":              ["jwt_dot"],
    "slug-generator":           ["slug_ph"],
    # lorem-ipsum-generator → SKIP (intentional Chinese text)
}


def fix_page(slug: str, icon_map: dict[str, str]) -> dict:
    path = TOOLS_DIR / f"{slug}.html"
    if not path.exists():
        return {"slug": slug, "error": "not found"}

    content = path.read_text(encoding="utf-8")
    original = content
    total = 0
    log = []

    fixes_map = TARGETS.get(slug, [])

    if "own_icon" in fixes_map:
        correct = icon_map.get(slug, "")
        if correct:
            content, n = fix_own_icons(content, correct)
            if n:
                log.append(f"own_icon={n}")
                total += n

    if "u9200" in fixes_map:
        content, n = fix_u9200_separator(content)
        if n:
            log.append(f"u9200={n}")
            total += n

    if "uuid_check" in fixes_map:
        content, n = fix_uuid_checkmarks(content)
        if n:
            log.append(f"uuid_check={n}")
            total += n

    if "jwt_dot" in fixes_map:
        content, n = fix_jwt_indicators(content)
        if n:
            log.append(f"jwt_dot={n}")
            total += n

    if "calorie_gender" in fixes_map:
        content, n = fix_calorie_gender(content)
        if n:
            log.append(f"calorie_gender={n}")
            total += n

    if "slug_ph" in fixes_map:
        content, n = fix_slug_placeholder(content)
        if n:
            log.append(f"slug_ph={n}")
            total += n

    if content != original:
        path.write_text(content, encoding="utf-8")

    # Re-check dirty status
    ranges = script_style_ranges(content)
    def in_block(pos): return any(s <= pos < e for s, e in ranges)
    still_dirty = any(
        0x3400 <= ord(c) <= 0x9FFF and not in_block(i)
        for i, c in enumerate(content)
    )

    return {
        "slug": slug,
        "total_fixes": total,
        "log": ", ".join(log),
        "still_dirty": still_dirty,
    }


def main() -> None:
    icon_map = build_icon_map()
    print(f"Icon map: {len(icon_map)} tools\n")

    results = [fix_page(slug, icon_map) for slug in TARGETS]

    for r in results:
        status = "STILL DIRTY" if r.get("still_dirty") else "clean"
        fixes = r.get("log") or "no changes"
        print(f"  {r['slug']}: {fixes} [{status}]")

    still = [r["slug"] for r in results if r.get("still_dirty")]
    print(f"\nStill dirty: {len(still)}")
    for s in still:
        print(f"  {s}")


if __name__ == "__main__":
    main()
