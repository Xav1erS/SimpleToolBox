#!/usr/bin/env python3
"""
Task 4: Fix 14 pages that are missing ds-tool-main + What is + How to Use.

Each page has <div class="main"> and a ds-seo-content block, but:
  - main div lacks ds-tool-main class
  - ds-seo-content has a "How to [Verb]" section but no "What is" section
  - the existing heading doesn't match "How to Use" regex

Fixes applied per page:
  1. Add ds-tool-main to <div class="main"> → <div class="main ds-tool-main">
  2. Prepend a "What is [Tool Name]?" section into ds-seo-content
  3. Rename the existing How-to heading to "How to Use [Tool Name]"
     (scientific-calculator and text-statistics get a new separate How to Use section)

Run:
    python scripts/fix-full-structure.py
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
        name_m = re.search(r"name:\s*'([^']+)'", entry)
        href_m = re.search(r"href:\s*'tools/([\w-]+)\.html'", entry)
        if name_m and href_m:
            result[href_m.group(1)] = name_m.group(1)
    return result


# ── What is content per slug ──────────────────────────────────────────────────

WHAT_IS: dict[str, str] = {
    "age-in-days": "Age in Days Calculator counts the exact number of days you have been alive, plus days to your next birthday and other milestones. It runs entirely in your browser with no data sent to any server.",
    "body-fat-calculator": "Body Fat Calculator estimates your body fat percentage using the U.S. Navy circumference method. Enter your height, neck, waist, and hip measurements to get an instant estimate without any equipment.",
    "color-scheme-generator": "Color Scheme Generator creates harmonious color palettes based on color theory rules: complementary, triadic, analogous, split-complementary, and more. Use it to pick colors for UI design, branding, or art projects.",
    "gradient-text-generator": "Gradient Text Generator applies a smooth multi-color gradient to your text and outputs ready-to-use CSS. Preview the effect live and copy the CSS class directly into your stylesheet.",
    "image-noise": "Image Noise tool adds grain or noise texture to photos in your browser. Use it to create a film-grain aesthetic, add visual texture, or simulate vintage photography effects — no upload required.",
    "reading-time-estimator": "Reading Time Estimator calculates how long it takes to read a piece of text based on an average reading speed. Paste any article, essay, or document to instantly see its estimated reading time.",
    "remove-duplicate-words": "Remove Duplicate Words tool scans your text and removes all repeated words, keeping only the first occurrence of each word. Useful for cleaning keyword lists, tag clouds, and deduplicated content.",
    "remove-line-breaks": "Remove Line Breaks tool joins lines of text into a single continuous paragraph by stripping individual line breaks while optionally preserving blank lines as paragraph separators.",
    "scientific-calculator": "Scientific Calculator performs advanced mathematical operations including trigonometric functions (sin, cos, tan), logarithms, powers, roots, and parenthesized expressions — all running locally in your browser.",
    "tax-calculator": "Tax Calculator computes sales tax and income tax estimates quickly. Enter a price and tax rate to see the tax amount and total, or enter income details for an income tax breakdown.",
    "text-statistics": "Text Statistics tool analyzes any text and shows detailed metrics: word count, character count, sentence count, paragraph count, average word length, reading time, and more.",
    "tip-splitter": "Tip Splitter calculates the tip amount and splits the total bill evenly among multiple people. Enter the bill, choose a tip percentage, and see how much each person owes.",
    "webp-to-png": "WebP to PNG Converter converts WebP image files to PNG format entirely in your browser. No file is uploaded to a server — conversion uses the Canvas API locally.",
    "word-scrambler": "Word Scrambler randomly shuffles the letters in each word of your text. Use it to create word puzzles, obfuscate content, or generate scramble exercises for language learning.",
}

# ── How to Use content for pages that need a new section (not just a rename) ──

HOW_TO_NEW: dict[str, dict] = {
    "scientific-calculator": {
        "title": "How to Use Scientific Calculator",
        "steps": [
            "Click number buttons or type on your keyboard to enter values.",
            "Use trig functions (sin, cos, tan) and switch between DEG and RAD modes as needed.",
            "Use parentheses to control the order of operations in complex expressions.",
            "Press = or Enter to evaluate. Press C to clear the display.",
        ],
    },
    "text-statistics": {
        "title": "How to Use Text Statistics",
        "steps": [
            "Paste or type any text into the input area.",
            "All statistics update instantly as you type.",
            "Review metrics including word count, character count, sentence count, and reading time.",
            "Copy individual values as needed for your analysis.",
        ],
    },
}


# ── Fix functions ─────────────────────────────────────────────────────────────

def fix_main_class(content: str) -> tuple[str, int]:
    """Add ds-tool-main to <div class="main"> if not already present."""
    result, n = re.subn(
        r'<div class="main">',
        '<div class="main ds-tool-main">',
        content,
        count=1,
    )
    return result, n


def prepend_what_is(content: str, slug: str, tool_name: str) -> tuple[str, int]:
    """Prepend a What is section at the start of ds-seo-content."""
    description = WHAT_IS.get(slug, f"{tool_name} runs entirely in your browser. No data is sent to any server.")
    section = (
        f'<section class="ds-seo-section">\n'
        f'    <h2 class="ds-seo-section__title">What is {tool_name}?</h2>\n'
        f'    <p>{description}</p>\n'
        f'  </section>\n  '
    )

    result, n = re.subn(
        r'(<div class="ds-seo-content"[^>]*>)\s*',
        lambda m: m.group(1) + "\n  " + section,
        content,
        count=1,
    )
    return result, n


def rename_or_add_how_to(content: str, slug: str, tool_name: str) -> tuple[str, int]:
    """
    For most pages: rename existing 'How to [Verb]' heading to 'How to Use [Tool Name]'.
    For scientific-calculator and text-statistics: add a new How to Use section.
    """
    if slug in HOW_TO_NEW:
        # Add a new How to Use section after the existing section
        info = HOW_TO_NEW[slug]
        steps_html = "\n".join(f"      <li>{s}</li>" for s in info["steps"])
        new_section = (
            f'\n  <section class="ds-seo-section">\n'
            f'    <h2 class="ds-seo-section__title">{info["title"]}</h2>\n'
            f'    <ol>\n{steps_html}\n    </ol>\n'
            f'  </section>'
        )
        # Insert before </div> closing ds-seo-content
        result, n = re.subn(
            r'(</section>)\s*(</div>\s*\n\s*<div class="ds-related)',
            lambda m: m.group(1) + new_section + "\n" + m.group(2),
            content,
            count=1,
        )
        return result, n
    else:
        # Rename existing heading
        new_heading = f"How to Use {tool_name}"
        result, n = re.subn(
            r'<h2 class="ds-seo-section__title">(How to [^<]+)</h2>',
            f'<h2 class="ds-seo-section__title">{new_heading}</h2>',
            content,
            count=1,
            flags=re.IGNORECASE,
        )
        return result, n


# ── Main ──────────────────────────────────────────────────────────────────────

TARGETS = [
    "age-in-days", "body-fat-calculator", "color-scheme-generator",
    "gradient-text-generator", "image-noise", "reading-time-estimator",
    "remove-duplicate-words", "remove-line-breaks", "scientific-calculator",
    "tax-calculator", "text-statistics", "tip-splitter",
    "webp-to-png", "word-scrambler",
]


def fix_page(slug: str, name_map: dict[str, str]) -> dict:
    path = TOOLS_DIR / f"{slug}.html"
    if not path.exists():
        return {"slug": slug, "error": "not found"}

    tool_name = name_map.get(slug, slug.replace("-", " ").title())
    content = path.read_text(encoding="utf-8")
    log = []
    total = 0

    content, n = fix_main_class(content)
    if n:
        log.append(f"ds-tool-main+{n}")
        total += n

    content, n = prepend_what_is(content, slug, tool_name)
    if n:
        log.append(f"what_is+{n}")
        total += n

    content, n = rename_or_add_how_to(content, slug, tool_name)
    if n:
        log.append(f"how_to+{n}")
        total += n

    if total > 0:
        path.write_text(content, encoding="utf-8")

    return {"slug": slug, "tool_name": tool_name, "log": ", ".join(log), "total": total}


def main() -> None:
    name_map = build_name_map()
    print(f"Tool name map: {len(name_map)} entries\n")

    results = [fix_page(slug, name_map) for slug in TARGETS]

    for r in results:
        status = r.get("log") or "no changes"
        print(f"  {r['slug']} ({r.get('tool_name','')}): {status}")

    total_fixed = sum(1 for r in results if r.get("total", 0) > 0)
    print(f"\nPages fixed: {total_fixed}/{len(TARGETS)}")


if __name__ == "__main__":
    main()
