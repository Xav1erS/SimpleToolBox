#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from pathlib import Path

from tooling_utils import list_tool_files, read_text, save_json_report


MOJIBAKE_PATTERNS = ("鈥", "鈫", "脳", "路", "璺", "婕", "鈳", "▀")
COMMENT_BLOCK = re.compile(r"<!--.*?-->", re.DOTALL)
SCRIPT_BLOCK = re.compile(r"<script\b[^>]*>.*?</script>", re.DOTALL | re.IGNORECASE)
JSON_LD_BLOCK = re.compile(
    r"<script\b[^>]*type=[\"']application/ld\+json[\"'][^>]*>.*?</script>",
    re.DOTALL | re.IGNORECASE,
)
META_TAG = re.compile(r"<meta\b[^>]*(?:content|property|name)=[^>]*>", re.IGNORECASE)
TITLE_TAG = re.compile(r"<title\b[^>]*>.*?</title>", re.DOTALL | re.IGNORECASE)


def ranges_for(pattern: re.Pattern[str], text: str) -> list[tuple[int, int]]:
    return [match.span() for match in pattern.finditer(text)]


def in_ranges(index: int, ranges: list[tuple[int, int]]) -> bool:
    return any(start <= index < end for start, end in ranges)


def classify_index(
    index: int,
    comment_ranges: list[tuple[int, int]],
    json_ld_ranges: list[tuple[int, int]],
    script_ranges: list[tuple[int, int]],
    metadata_ranges: list[tuple[int, int]],
) -> str:
    if in_ranges(index, comment_ranges):
        return "comment"
    if in_ranges(index, json_ld_ranges):
        return "json_ld"
    if in_ranges(index, metadata_ranges):
        return "metadata"
    if in_ranges(index, script_ranges):
        return "inline_js"
    return "visible_html"


def audit_file(path: Path) -> dict[str, object]:
    text = read_text(path)
    comment_ranges = ranges_for(COMMENT_BLOCK, text)
    json_ld_ranges = ranges_for(JSON_LD_BLOCK, text)
    script_ranges = ranges_for(SCRIPT_BLOCK, text)
    metadata_ranges = ranges_for(META_TAG, text) + ranges_for(TITLE_TAG, text)

    hits: list[dict[str, object]] = []
    counts = Counter()

    for token in MOJIBAKE_PATTERNS:
        start = 0
        while True:
            index = text.find(token, start)
            if index == -1:
                break
            bucket = classify_index(index, comment_ranges, json_ld_ranges, script_ranges, metadata_ranges)
            counts[bucket] += 1
            hits.append({"token": token, "bucket": bucket, "index": index})
            start = index + len(token)

    return {
        "slug": path.stem,
        "file": str(path),
        "mojibake_total": len(hits),
        "mojibake_by_bucket": dict(counts),
        "missing_header_row": 'ds-tool-header__row' not in text,
        "missing_tool_page_icon": 'tool-page-icon.js' not in text,
        "missing_site_navigation": 'site-navigation.js' not in text,
    }


def build_report(items: list[dict[str, object]]) -> dict[str, object]:
    bucket_counts = Counter()
    totals = Counter()
    flagged: dict[str, list[str]] = {
        "missing_header_row": [],
        "missing_tool_page_icon": [],
        "missing_site_navigation": [],
    }

    for item in items:
        totals["pages_with_mojibake"] += 1 if item["mojibake_total"] else 0
        totals["mojibake_total"] += int(item["mojibake_total"])
        for bucket, count in item["mojibake_by_bucket"].items():
            bucket_counts[bucket] += int(count)
        for flag in flagged:
            if item[flag]:
                flagged[flag].append(str(item["slug"]))

    top_offenders = sorted(
        (item for item in items if item["mojibake_total"]),
        key=lambda item: int(item["mojibake_total"]),
        reverse=True,
    )[:25]

    return {
        "tool_count": len(items),
        "summary": {
            "pages_with_mojibake": totals["pages_with_mojibake"],
            "mojibake_total": totals["mojibake_total"],
            "mojibake_by_bucket": dict(bucket_counts),
            "missing_header_row": len(flagged["missing_header_row"]),
            "missing_tool_page_icon": len(flagged["missing_tool_page_icon"]),
            "missing_site_navigation": len(flagged["missing_site_navigation"]),
        },
        "flags": flagged,
        "top_offenders": top_offenders,
        "files": {item["slug"]: item for item in items},
    }


def print_summary(report: dict[str, object]) -> None:
    summary = report["summary"]
    print("\n" + "=" * 60)
    print("  SimpleToolBox - Launch Health Audit")
    print("=" * 60)
    print(f"  Tools audited:              {report['tool_count']}")
    print(f"  Pages with mojibake:        {summary['pages_with_mojibake']}")
    print(f"  Total mojibake hits:        {summary['mojibake_total']}")
    print(f"  Visible HTML hits:          {summary['mojibake_by_bucket'].get('visible_html', 0)}")
    print(f"  Inline JS hits:             {summary['mojibake_by_bucket'].get('inline_js', 0)}")
    print(f"  Metadata hits:              {summary['mojibake_by_bucket'].get('metadata', 0)}")
    print(f"  JSON-LD hits:               {summary['mojibake_by_bucket'].get('json_ld', 0)}")
    print(f"  Comment hits:               {summary['mojibake_by_bucket'].get('comment', 0)}")
    print("-" * 60)
    print(f"  Missing header row:         {summary['missing_header_row']}")
    print(f"  Missing tool-page-icon.js:  {summary['missing_tool_page_icon']}")
    print(f"  Missing site-navigation.js: {summary['missing_site_navigation']}")
    print("=" * 60)
    for item in report["top_offenders"][:12]:
        print(f"  {item['slug']}: {item['mojibake_total']} hits")


def main() -> None:
    parser = argparse.ArgumentParser(description="Audit launch health for mojibake and shared shell wiring.")
    parser.add_argument("slug", nargs="?", help="Audit a single tool slug")
    parser.add_argument("--json", action="store_true", help="Print JSON only")
    args = parser.parse_args()

    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    files = list_tool_files()
    if args.slug:
        files = [path for path in files if path.stem == args.slug]
        if not files:
            raise SystemExit(f"Tool not found: {args.slug}")

    items = [audit_file(path) for path in files]
    report = build_report(items)
    save_json_report("launch-health-audit.json", report)

    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
        return

    print_summary(report)


if __name__ == "__main__":
    main()
