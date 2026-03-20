#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from pathlib import Path

from tool_page_templates import render_body_sections, render_structured_data
from tooling_utils import TOOLS_DIR, load_site_tools, load_tools_meta


BODY_START = "<!-- AUTO-SEO-SECTIONS:START -->"
BODY_END = "<!-- AUTO-SEO-SECTIONS:END -->"
HEAD_START = "<!-- AUTO-STRUCTURED-DATA:START -->"
HEAD_END = "<!-- AUTO-STRUCTURED-DATA:END -->"


def replace_between(content: str, start: str, end: str, replacement: str) -> str:
    pattern = re.compile(re.escape(start) + r".*?" + re.escape(end), re.DOTALL)
    block = f"{start}\n{replacement}\n{end}"
    if not pattern.search(content):
        raise ValueError(f"Marker pair not found: {start} .. {end}")
    return pattern.sub(lambda _: block, content, count=1)


def main() -> None:
    parser = argparse.ArgumentParser(description="Render metadata-driven sections into selected tool pages")
    parser.add_argument("slugs", nargs="+", help="Tool slugs to render")
    args = parser.parse_args()

    meta_map = {item["slug"]: item for item in load_tools_meta()}
    site_map = {item["href"].split("/")[-1].replace(".html", ""): item for item in load_site_tools()}

    for slug in args.slugs:
        meta = meta_map[slug]
        path = TOOLS_DIR / f"{slug}.html"
        content = path.read_text(encoding="utf-8")
        content = replace_between(content, HEAD_START, HEAD_END, render_structured_data(meta))
        content = replace_between(content, BODY_START, BODY_END, render_body_sections(meta, site_map))
        path.write_text(content, encoding="utf-8")
        print(f"Rendered sections for {slug}")


if __name__ == "__main__":
    main()
