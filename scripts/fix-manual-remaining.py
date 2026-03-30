#!/usr/bin/env python3
"""
Fix the remaining 21 manual-group pages.

Three patterns:
  A (8 pages): missing ds-tool-main + missing_how_section
     → add ds-tool-main to <div class="main">
     → rename "How to [Verb]" heading → "How to Use [Tool Name]"

  B (5 pages): missing ds-tool-main + missing_main_root
     → add ds-tool-main to body-wrap / options-bar (no 'main' div exists)

  C (8 pages): missing ds-tool-main + missing_what_section
     → add ds-tool-main to <div class="main">
     → prepend "What is [Tool Name]?" section into ds-seo-content

Run:
    python scripts/fix-manual-remaining.py
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
TOOLS_DIR = ROOT / "public" / "tools"

sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def build_name_map() -> dict[str, str]:
    js = (ROOT / "public" / "tools-data.js").read_text(encoding="utf-8")
    result = {}
    for m in re.finditer(r"\{[^{}]+\}", js):
        entry = m.group(0)
        nm = re.search(r"name:\s*'([^']+)'", entry)
        hr = re.search(r"href:\s*'tools/([\w-]+)\.html'", entry)
        if nm and hr:
            result[hr.group(1)] = nm.group(1)
    return result


# ── What is descriptions for Pattern C ───────────────────────────────────────

WHAT_IS: dict[str, str] = {
    "aspect-ratio-calculator": "Aspect Ratio Calculator computes the missing dimension of an image or video given a known width, height, and target ratio. Use it to scale designs, crop correctly, or check display compatibility.",
    "css-box-shadow-generator": "CSS Box Shadow Generator lets you visually build box-shadow values and instantly copy the CSS. Adjust offsets, blur, spread, color, and opacity with live preview.",
    "loan-amortization-calculator": "Loan Amortization Calculator generates a full month-by-month payment schedule for a loan, showing principal, interest, and remaining balance for every payment period.",
    "pace-calculator": "Pace Calculator converts between running pace (min/km or min/mile), speed (km/h or mph), and total time for a given distance. Useful for race planning and training targets.",
    "random-color-generator": "Random Color Generator produces random colors in HEX, RGB, and HSL formats. Lock individual channels to generate color variations within a specific range, or generate entire palettes at once.",
    "retirement-calculator": "Retirement Calculator projects how much you will have saved by retirement based on current savings, monthly contributions, expected return, and years remaining. Results are estimates for planning purposes.",
    "text-repeater": "Text Repeater duplicates any text or phrase a specified number of times, with a configurable separator between repetitions. Useful for generating test data, patterns, and repeated content.",
    "time-duration-calculator": "Time Duration Calculator computes the exact duration between two times or dates, returning the result in hours, minutes, and seconds. Supports both same-day and multi-day spans.",
}


# ── Fix helpers ───────────────────────────────────────────────────────────────

def add_tool_main_to_main(content: str) -> tuple[str, int]:
    """Add ds-tool-main class to <div class="main">."""
    result, n = re.subn(
        r'<div class="main">',
        '<div class="main ds-tool-main">',
        content,
        count=1,
    )
    return result, n


def add_tool_main_to_wrapper(content: str, wrapper_class: str) -> tuple[str, int]:
    """Add ds-tool-main class to a named wrapper div (body-wrap, options-bar, etc.)."""
    pattern = f'<div class="{wrapper_class}">'
    replacement = f'<div class="{wrapper_class} ds-tool-main">'
    if pattern in content:
        return content.replace(pattern, replacement, 1), 1
    return content, 0


def rename_how_to_heading(content: str, tool_name: str) -> tuple[str, int]:
    """Rename first 'How to [Verb]' h2 to 'How to Use [Tool Name]'."""
    new_heading = f"How to Use {tool_name}"
    result, n = re.subn(
        r'<h2 class="ds-seo-section__title">(How to [^<]+)</h2>',
        f'<h2 class="ds-seo-section__title">{new_heading}</h2>',
        content,
        count=1,
        flags=re.IGNORECASE,
    )
    return result, n


def prepend_what_is(content: str, slug: str, tool_name: str) -> tuple[str, int]:
    """Prepend What is section at start of ds-seo-content."""
    desc = WHAT_IS.get(
        slug,
        f"{tool_name} runs entirely in your browser. No data is sent to any server.",
    )
    section = (
        f'<section class="ds-seo-section">\n'
        f'    <h2 class="ds-seo-section__title">What is {tool_name}?</h2>\n'
        f'    <p>{desc}</p>\n'
        f'  </section>\n  '
    )
    result, n = re.subn(
        r'(<div class="ds-seo-content"[^>]*>)\s*',
        lambda m: m.group(1) + "\n  " + section,
        content,
        count=1,
    )
    return result, n


# ── Page definitions ──────────────────────────────────────────────────────────

# (slug, pattern, wrapper_class_if_B)
PAGES: list[tuple[str, str, str | None]] = [
    # Pattern A: add ds-tool-main + rename How to heading
    ("avif-to-jpg",              "A", None),
    ("heic-to-jpg",              "A", None),
    ("image-tint",               "A", None),
    ("image-vignette",           "A", None),
    ("jpg-to-pdf",               "A", None),
    ("pdf-add-watermark",        "A", None),
    ("placeholder-image-generator", "A", None),
    ("png-to-ico",               "A", None),
    # Pattern B: add ds-tool-main to non-main wrapper
    ("bmi-calculator",           "B", "body-wrap"),
    ("loan-calculator",          "B", "body-wrap"),
    ("text-cleaner",             "B", "options-bar"),
    ("youtube-thumbnail",        "B", "body-wrap"),
    ("unit-converter",           "B", "body-wrap"),
    # Pattern C: add ds-tool-main + prepend What is
    ("aspect-ratio-calculator",  "C", None),
    ("css-box-shadow-generator", "C", None),
    ("loan-amortization-calculator", "C", None),
    ("pace-calculator",          "C", None),
    ("random-color-generator",   "C", None),
    ("retirement-calculator",    "C", None),
    ("text-repeater",            "C", None),
    ("time-duration-calculator", "C", None),
]


def fix_page(slug: str, pattern: str, wrapper: str | None, name_map: dict[str, str]) -> dict:
    path = TOOLS_DIR / f"{slug}.html"
    if not path.exists():
        return {"slug": slug, "error": "not found"}

    tool_name = name_map.get(slug, slug.replace("-", " ").title())
    content = path.read_text(encoding="utf-8")
    log = []
    total = 0

    if pattern == "A":
        content, n = add_tool_main_to_main(content)
        if n: log.append(f"ds-tool-main+{n}"); total += n
        content, n = rename_how_to_heading(content, tool_name)
        if n: log.append(f"rename_how+{n}"); total += n

    elif pattern == "B":
        content, n = add_tool_main_to_wrapper(content, wrapper or "body-wrap")
        if n: log.append(f"ds-tool-main({wrapper})+{n}"); total += n

    elif pattern == "C":
        content, n = add_tool_main_to_main(content)
        if n: log.append(f"ds-tool-main+{n}"); total += n
        content, n = prepend_what_is(content, slug, tool_name)
        if n: log.append(f"what_is+{n}"); total += n

    if total > 0:
        path.write_text(content, encoding="utf-8")

    return {"slug": slug, "pattern": pattern, "tool_name": tool_name,
            "log": ", ".join(log), "total": total}


# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    name_map = build_name_map()
    print(f"Tool name map: {len(name_map)} entries\n")

    results = [fix_page(slug, pat, wrap, name_map) for slug, pat, wrap in PAGES]

    for r in results:
        status = r.get("log") or "no changes"
        print(f"  [{r['pattern']}] {r['slug']}: {status}")

    fixed = sum(1 for r in results if r.get("total", 0) > 0)
    print(f"\nPages fixed: {fixed}/{len(PAGES)}")


if __name__ == "__main__":
    main()
