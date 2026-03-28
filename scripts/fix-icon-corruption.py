#!/usr/bin/env python3
"""
Fix icon emoji that could not be recovered by GBK-reversal in fix-encoding-corruption.py.

Root cause: some emoji (e.g. 🖼️, 🗜️, 🏷️) contain a variation selector (U+FE0F)
whose GBK orphan byte was silently dropped during the original encoding accident.
This makes the UTF-8 sequence irrecoverable by byte-reversal alone.

Strategy:
  1. Parse tools-data.js to get the authoritative slug → icon mapping.
  2. For each icon, compute its GBK-corrupted form (UTF-8 → read as GBK).
  3. Build a regex pattern of all corrupted → correct pairs (longest first).
  4. Apply to HTML content outside <script> / <style> blocks.

Usage:
  python scripts/fix-icon-corruption.py --dry-run
  python scripts/fix-icon-corruption.py --slugs webp-converter image-resizer
  python scripts/fix-icon-corruption.py          # all tool pages
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
TOOLS_DIR = ROOT / "public" / "tools"
TOOLS_DATA_JS = ROOT / "public" / "tools-data.js"

# ---------------------------------------------------------------------------
# Build corrupted → correct map from tools-data.js
# ---------------------------------------------------------------------------

def _build_icon_map() -> dict[str, str]:
    """
    Parse tools-data.js for icon values, compute their GBK-corrupted forms,
    and return a map {corrupted_string: correct_emoji}.
    Includes both the full corrupted form (with \\ufffd) and the trim (without).
    """
    js = TOOLS_DATA_JS.read_text(encoding="utf-8")
    pairs = re.findall(
        r"href:\s*'tools/([^']+)\.html'[^}]*?icon:\s*'([^']+)'",
        js, re.DOTALL,
    )

    icon_map: dict[str, str] = {}
    seen_icons: set[str] = set()

    for _slug, icon in pairs:
        if icon in seen_icons:
            continue
        seen_icons.add(icon)
        try:
            gbk_str = icon.encode("utf-8").decode("gbk", errors="replace")
        except Exception:
            continue
        # Only include if the result looks like a corruption artefact
        if gbk_str == icon:
            continue
        if not any("\u3400" <= c <= "\u9fff" for c in gbk_str):
            continue
        # Full corrupted form (may include U+FFFD)
        icon_map[gbk_str] = icon
        # Trim trailing U+FFFD — orphan often gets dropped in the file.
        # Only add the trim when it is at least 2 chars; single-char trims are
        # too ambiguous (e.g. U+922B could be → or ↵ depending on context).
        if gbk_str.endswith("\ufffd"):
            trimmed = gbk_str[:-1]
            if len(trimmed) >= 2 and trimmed not in icon_map:
                icon_map[trimmed] = icon

    return icon_map


# ---------------------------------------------------------------------------
# Replacement logic
# ---------------------------------------------------------------------------

# Split on <script> and <style> blocks so we never touch embedded JS/CSS
_SCRIPT_STYLE = re.compile(
    r"(<script[^>]*>.*?</script>|<style[^>]*>.*?</style>)",
    re.DOTALL | re.IGNORECASE,
)


def _build_replacer(icon_map: dict[str, str]):
    """Build a compiled regex that matches all corrupted patterns, longest first."""
    sorted_keys = sorted(icon_map.keys(), key=len, reverse=True)
    pattern = re.compile("|".join(re.escape(k) for k in sorted_keys))
    def _replace(m: re.Match) -> str:
        return icon_map[m.group(0)]
    return pattern, _replace


def fix_html(content: str, pattern: re.Pattern, replacer) -> str:
    parts = _SCRIPT_STYLE.split(content)
    fixed: list[str] = []
    for i, part in enumerate(parts):
        if i % 2 == 1:          # script/style block — keep verbatim
            fixed.append(part)
        else:
            fixed.append(pattern.sub(replacer, part))
    return "".join(fixed)


# ---------------------------------------------------------------------------
# File-level fix
# ---------------------------------------------------------------------------

def fix_file(path: Path, pattern: re.Pattern, replacer, dry_run: bool) -> dict:
    content = path.read_text(encoding="utf-8")
    fixed = fix_html(content, pattern, replacer)
    if fixed == content:
        return {"slug": path.stem, "status": "no_change"}
    if not dry_run:
        path.write_text(fixed, encoding="utf-8")
    return {"slug": path.stem, "status": "dry_run" if dry_run else "fixed"}


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Fix icon emoji corruption artefacts in tool HTML files."
    )
    parser.add_argument("--slugs", nargs="+", metavar="SLUG",
                        help="Specific slugs (default: all tool pages)")
    parser.add_argument("--dry-run", action="store_true",
                        help="Show what would change without writing")
    args = parser.parse_args()

    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    icon_map = _build_icon_map()
    pattern, replacer = _build_replacer(icon_map)

    if args.slugs:
        slugs = args.slugs
    else:
        slugs = [p.stem for p in sorted(TOOLS_DIR.glob("*.html"))]

    mode = "DRY RUN — " if args.dry_run else ""
    print(f"\n{mode}Icon map: {len(icon_map)} patterns, processing {len(slugs)} pages\n")

    fixed = skipped = no_change = 0
    for slug in slugs:
        path = TOOLS_DIR / f"{slug}.html"
        if not path.exists():
            print(f"  [SKIP] {slug}")
            skipped += 1
            continue
        result = fix_file(path, pattern, replacer, dry_run=args.dry_run)
        status = result["status"]
        if status == "no_change":
            no_change += 1
        else:
            icon = "~" if args.dry_run else "✓"
            print(f"  [{icon}] {slug}")
            fixed += 1

    print(f"\nDone: {fixed} fixed, {no_change} unchanged, {skipped} skipped.")
    if args.dry_run and fixed:
        print("Run without --dry-run to apply.")


if __name__ == "__main__":
    main()
