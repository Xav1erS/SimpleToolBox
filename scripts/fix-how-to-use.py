#!/usr/bin/env python3
"""
Task 3: Fix "How to Use" section issues in 26 manual pages.

Two operations:
  1. Rename variant headings ("How to Convert X") → "How to Use [Tool Name]"
     for 22 pages that have a how-to section but with the wrong title.
  2. Add a complete "How to Use" section to 4 pages that truly have none.

Run:
    python scripts/fix-how-to-use.py
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


# ── 1. Rename variant headings ────────────────────────────────────────────────

VARIANT_SLUGS = [
    "angle-converter", "area-converter", "compound-interest-calculator",
    "data-storage-converter", "energy-converter", "force-converter",
    "frequency-converter", "fuel-consumption-calculator", "image-flipper",
    "length-converter", "number-extractor", "percentage-change-calculator",
    "power-converter", "pressure-converter", "roman-numeral-converter",
    "speed-converter", "temperature-converter", "time-converter",
    "time-zone-converter", "torque-converter", "volume-converter",
    "weight-converter",
]


def rename_how_to_heading(content: str, tool_name: str) -> tuple[str, int]:
    """Replace the first 'How to [Verb]' h2 with 'How to Use [Tool Name]'."""
    new_heading = f"How to Use {tool_name}"

    def replacer(m: re.Match) -> str:
        return m.group(0).replace(m.group(1), new_heading)

    result, n = re.subn(
        r'<h2 class="ds-seo-section__title">(How to [^<]+)</h2>',
        replacer,
        content,
        count=1,
        flags=re.IGNORECASE,
    )
    return result, n


# ── 2. Add missing How to Use section ─────────────────────────────────────────

# Content for truly missing pages
HOW_TO_CONTENT: dict[str, dict] = {
    "color-contrast-aa": {
        "title": "How to Use WCAG Contrast Checker",
        "steps": [
            "Enter a foreground (text) color and a background color using the color pickers or by typing HEX values.",
            "The tool instantly calculates the contrast ratio between the two colors.",
            "Check the AA and AAA pass/fail results for normal text and large text.",
            "Adjust colors until your combination meets the WCAG level you need.",
            "Copy the passing color values for use in your CSS.",
        ],
    },
    "ip-lookup": {
        "title": "How to Use IP Lookup",
        "steps": [
            "Enter an IP address (IPv4 or IPv6) in the input field, or leave it blank to look up your own IP.",
            "Click Lookup to fetch geolocation and network information.",
            "Review the results including country, city, ISP, and coordinates.",
            "Copy any field you need for further use.",
        ],
    },
    "morse-code": {
        "title": "How to Use Morse Code Translator",
        "steps": [
            "Type or paste text in the input area to translate to Morse code.",
            "Switch to Morse-to-text mode to decode dots and dashes back to letters.",
            "Use the playback button to hear the audio representation of the Morse code.",
            "Copy the output using the copy button.",
        ],
    },
    "string-escape": {
        "title": "How to Use String Escape Tool",
        "steps": [
            "Paste or type the string you want to process in the input area.",
            "Choose the target language or format: JavaScript, Python, HTML, JSON, or URL.",
            "Select Escape or Unescape depending on your task.",
            "Copy the output — the result is ready to paste into your code.",
        ],
    },
}


def add_how_to_section(content: str, slug: str) -> tuple[str, int]:
    """Insert a How to Use section into ds-seo-content after the What is section."""
    info = HOW_TO_CONTENT.get(slug)
    if not info:
        return content, 0

    steps_html = "\n".join(f"      <li>{s}</li>" for s in info["steps"])
    section_html = (
        f'\n  <section class="ds-seo-section">\n'
        f'    <h2 class="ds-seo-section__title">{info["title"]}</h2>\n'
        f'    <ol>\n{steps_html}\n    </ol>\n'
        f'  </section>'
    )

    # Insert after the last </section> inside ds-seo-content, before </div>
    # Find the ds-seo-content block
    pattern = r'(<div class="ds-seo-content">.*?)(</div>)'
    m = re.search(pattern, content, re.DOTALL)
    if not m:
        return content, 0

    new_block = m.group(1) + section_html + "\n" + m.group(2)
    result = content[: m.start()] + new_block + content[m.end() :]
    return result, 1


# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    name_map = build_name_map()
    print(f"Tool name map: {len(name_map)} entries\n")

    # Pass 1: rename variant headings
    renamed = 0
    for slug in VARIANT_SLUGS:
        path = TOOLS_DIR / f"{slug}.html"
        if not path.exists():
            print(f"  MISSING: {slug}")
            continue
        tool_name = name_map.get(slug, slug.replace("-", " ").title())
        content = path.read_text(encoding="utf-8")
        new_content, n = rename_how_to_heading(content, tool_name)
        if n:
            path.write_text(new_content, encoding="utf-8")
            renamed += 1
            print(f"  renamed: {slug} → 'How to Use {tool_name}'")
        else:
            print(f"  skip (no match): {slug}")

    print(f"\nHeadings renamed: {renamed}")

    # Pass 2: add missing sections
    print("\nAdding missing How to Use sections:")
    added = 0
    for slug in HOW_TO_CONTENT:
        path = TOOLS_DIR / f"{slug}.html"
        if not path.exists():
            print(f"  MISSING: {slug}")
            continue
        content = path.read_text(encoding="utf-8")
        new_content, n = add_how_to_section(content, slug)
        if n:
            path.write_text(new_content, encoding="utf-8")
            added += 1
            print(f"  added: {slug}")
        else:
            print(f"  skip (no seo-content): {slug}")

    print(f"\nSections added: {added}")
    print(f"Total pages fixed: {renamed + added}")


if __name__ == "__main__":
    main()
