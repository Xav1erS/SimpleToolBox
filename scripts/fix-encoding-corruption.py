#!/usr/bin/env python3
"""
Fix GBK-corruption artefacts in tool-page HTML files.

Root cause: UTF-8 source bytes were read as GBK and re-saved as UTF-8.
Each GBK two-byte pair absorbed two original UTF-8 bytes; high bytes that
could not form a valid GBK trail became literal "?" characters.

Strategy:
  1. For each run of CJK chars (U+3400-U+9FFF) in HTML content (outside
     <script> / <style> blocks):
       a. Encode them back to GBK bytes – those bytes ARE the original UTF-8.
       b. Decode those bytes as UTF-8.
       c. If the run ends with "?", the "?" represents an orphaned high byte.
          Try known orphan values first, then scan 0x80-0xBF.
  2. Apply a set of hard-coded single-character fixes for common punctuation
     (em-dash, middle-dot, degree, etc.) that appear in isolation.

Usage:
  python scripts/fix-encoding-corruption.py --dry-run
  python scripts/fix-encoding-corruption.py --slugs webp-converter jpg-to-png
  python scripts/fix-encoding-corruption.py          # all cleanup-group pages
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
TOOLS_DIR = ROOT / "public" / "tools"
SCRIPTS_DIR = ROOT / "scripts"

# ---------------------------------------------------------------------------
# Known single-CJK-char fixes (GBK-bytes → original UTF-8 char).
# Built by: desired_char.encode('utf-8') → read as GBK.
# Keyed by the corrupted Unicode code point as seen in the file.
# ---------------------------------------------------------------------------
SINGLE_CHAR_MAP: dict[str, str] = {}

def _build_single_char_map() -> None:
    """Populate SINGLE_CHAR_MAP for common non-ASCII chars."""
    # Characters whose complete UTF-8 encoding fits in one GBK pair (2 bytes)
    candidates = (
        # Latin-1 supplement / common punctuation
        "·×÷°±²³µ¶·¸¹º»¼½¾¿"
        "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß"
        "àáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
        # General punctuation / typography
        "\u2013\u2014\u2018\u2019\u201c\u201d\u2022\u2026\u2030"
        # Arrows
        "\u2190\u2191\u2192\u2193\u2194\u2195\u21d2\u21d4"
        # Math
        "\u2200\u2202\u2203\u2205\u2207\u2208\u2209\u220b\u220f"
        "\u2211\u2212\u2215\u221a\u221d\u221e\u2220\u2227\u2228"
        "\u2229\u222a\u222b\u2234\u223c\u2248\u2260\u2264\u2265"
    )
    for ch in candidates:
        utf8 = ch.encode("utf-8")
        if len(utf8) != 2:
            continue  # only 2-byte sequences map 1:1 to a GBK pair
        try:
            cjk = utf8.decode("gbk")
            if len(cjk) == 1 and "\u3400" <= cjk <= "\u9fff":
                SINGLE_CHAR_MAP[cjk] = ch
        except Exception:
            pass

_build_single_char_map()

# ---------------------------------------------------------------------------
# Known orphan-byte completions for incomplete 2-byte GBK prefixes.
# The "?" in the file represents an orphaned high byte that could not pair
# with the following character.  We know the correct byte from context.
# ---------------------------------------------------------------------------
ORPHAN_COMPLETIONS: dict[bytes, list[int]] = {
    # E2 80 XX  →  U+2000–203F (general punctuation)
    # Most common: em-dash U+2014 (XX=0x94), en-dash U+2013 (XX=0x93)
    b"\xe2\x80": [0x94, 0x93, 0x98, 0x99, 0x9c, 0x9d, 0xa0, 0x8b, 0x90],
    # E2 86 XX  →  U+2190–21FF (arrows)
    # Most common: rightwards U+2192 (0x92), leftwards U+2190 (0x90)
    b"\xe2\x86": [0x92, 0x90, 0x91, 0x93, 0x94, 0x95],
    # E2 84 XX  →  letterlike symbols
    b"\xe2\x84": [0xa2, 0x96, 0x9e, 0xa6],
    # E2 89 XX  →  math relations
    b"\xe2\x89": [0xa0, 0xa4, 0xa5],
    # EF B8 XX  →  variation selectors  U+FE0F (0x8F)
    b"\xef\xb8": [0x8f, 0x80, 0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88,
                  0x89, 0x8a, 0x8b, 0x8c, 0x8d, 0x8e],
}


def _try_decode_with_orphan(gbk_bytes: bytes) -> str | None:
    """
    Try to decode gbk_bytes as UTF-8, optionally appending a known orphan byte.
    Returns the decoded string or None.
    """
    # Direct decode (complete sequence)
    try:
        return gbk_bytes.decode("utf-8")
    except UnicodeDecodeError:
        pass

    # Identify the last GBK pair in the byte string to look up orphan options
    last_pair = gbk_bytes[-2:] if len(gbk_bytes) >= 2 else gbk_bytes
    orphan_options = ORPHAN_COMPLETIONS.get(last_pair, [])

    # Also do a general scan over continuation bytes if no known list
    all_options = list(orphan_options) + [
        b for b in range(0x80, 0xC0) if b not in orphan_options
    ]

    for orphan in all_options:
        try:
            candidate = (gbk_bytes + bytes([orphan])).decode("utf-8")
            # Accept only printable / common non-ASCII results
            if candidate and (candidate.isprintable() or candidate in "\n\r\t"):
                return candidate
        except UnicodeDecodeError:
            continue

    return None


# ---------------------------------------------------------------------------
# Main replacement logic
# ---------------------------------------------------------------------------

# Pattern: run of CJK chars optionally followed by a literal "?"
_CJK_RUN = re.compile(r"[\u3400-\u9fff]+\??")


def _fix_cjk_run(m: re.Match) -> str:
    seq = m.group()
    has_q = seq.endswith("?")
    cjk_chars = seq[:-1] if has_q else seq

    # Check each character against the single-char map first
    # (only when the whole run is a single char with no orphan '?')
    if not has_q and len(cjk_chars) == 1 and cjk_chars in SINGLE_CHAR_MAP:
        return SINGLE_CHAR_MAP[cjk_chars]

    # Encode CJK chars as GBK → original UTF-8 bytes
    try:
        gbk_bytes = cjk_chars.encode("gbk")
    except (UnicodeEncodeError, LookupError):
        return seq  # can't encode → leave as-is

    if has_q:
        result = _try_decode_with_orphan(gbk_bytes)
    else:
        try:
            result = gbk_bytes.decode("utf-8")
        except UnicodeDecodeError:
            result = None

    return result if result is not None else seq


# Split on <script> and <style> blocks so we never touch embedded JS/CSS
_SCRIPT_STYLE = re.compile(
    r"(<script[^>]*>.*?</script>|<style[^>]*>.*?</style>)",
    re.DOTALL | re.IGNORECASE,
)


def fix_html(content: str) -> str:
    parts = _SCRIPT_STYLE.split(content)
    fixed: list[str] = []
    for i, part in enumerate(parts):
        if i % 2 == 1:          # script/style block — keep verbatim
            fixed.append(part)
        else:
            fixed.append(_CJK_RUN.sub(_fix_cjk_run, part))
    return "".join(fixed)


# ---------------------------------------------------------------------------
# File-level migration
# ---------------------------------------------------------------------------

def fix_file(path: Path, dry_run: bool) -> dict:
    content = path.read_text(encoding="utf-8")
    fixed = fix_html(content)
    if fixed == content:
        return {"slug": path.stem, "status": "no_change"}
    if not dry_run:
        path.write_text(fixed, encoding="utf-8")
    return {"slug": path.stem, "status": "dry_run" if dry_run else "fixed"}


def get_all_tool_slugs() -> list[str]:
    result = subprocess.run(
        [sys.executable, str(SCRIPTS_DIR / "audit-tool-shell-migration.py"), "--json"],
        capture_output=True, text=True, encoding="utf-8", cwd=str(SCRIPTS_DIR),
    )
    data = json.loads(result.stdout)
    return (
        data["groups"]["direct"]
        + data["groups"]["cleanup"]
        + data["groups"]["manual"]
    )


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Fix GBK-corruption artefacts in tool HTML files."
    )
    parser.add_argument("--slugs", nargs="+", metavar="SLUG",
                        help="Specific slugs (default: all tool pages)")
    parser.add_argument("--dry-run", action="store_true",
                        help="Show what would change without writing")
    args = parser.parse_args()

    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    if args.slugs:
        slugs = args.slugs
    else:
        print("Querying audit script for full slug list...")
        slugs = get_all_tool_slugs()

    mode = "DRY RUN — " if args.dry_run else ""
    print(f"\n{mode}Processing {len(slugs)} pages\n")

    fixed = skipped = no_change = 0
    for slug in slugs:
        path = TOOLS_DIR / f"{slug}.html"
        if not path.exists():
            print(f"  [SKIP] {slug}")
            skipped += 1
            continue
        result = fix_file(path, dry_run=args.dry_run)
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
