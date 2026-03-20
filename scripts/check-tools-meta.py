#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys
from collections import Counter, defaultdict
from datetime import date

from tooling_utils import (
    ALLOWED_TOOL_TAGS,
    load_site_tools,
    load_tools_meta,
    list_tool_slugs,
    save_json_report,
)


def validate_metadata() -> dict:
    tool_slugs = list_tool_slugs()
    meta_items = load_tools_meta()
    site_tools = load_site_tools()

    errors: list[dict] = []
    warnings: list[dict] = []

    meta_by_slug = {}
    meta_slug_counts = Counter()
    for item in meta_items:
        slug = item.get("slug", "").strip()
        meta_slug_counts[slug] += 1
        if slug:
            meta_by_slug[slug] = item

    site_by_slug = {}
    site_slug_counts = Counter()
    for item in site_tools:
        href = item.get("href", "")
        slug = href.split("/")[-1].replace(".html", "").strip()
        if slug:
            site_slug_counts[slug] += 1
            site_by_slug[slug] = item

    for slug, count in sorted(meta_slug_counts.items()):
        if not slug:
            errors.append({"slug": "<missing>", "check": "slug_present", "message": "tools-meta.js contains an entry without slug"})
        elif count > 1:
            errors.append({"slug": slug, "check": "slug_unique", "message": f"Duplicate slug in tools-meta.js ({count} entries)"})

    for slug, count in sorted(site_slug_counts.items()):
        if count > 1:
            errors.append({"slug": slug, "check": "tools_data_unique", "message": f"Duplicate slug in tools-data.js ({count} entries)"})

    for slug in tool_slugs:
        meta = meta_by_slug.get(slug)
        site_entry = site_by_slug.get(slug)

        if meta is None:
            errors.append({"slug": slug, "check": "meta_exists", "message": "Missing tools-meta.js entry"})
        else:
            title = str(meta.get("title", "")).strip()
            description = str(meta.get("description", "")).strip()
            category = str(meta.get("category", "")).strip()
            related = meta.get("relatedTools")
            faq = meta.get("faq")
            use_cases = meta.get("useCases")
            example = meta.get("example")

            if not title:
                errors.append({"slug": slug, "check": "title_present", "message": "Missing title"})
            if not description:
                errors.append({"slug": slug, "check": "description_present", "message": "Missing description"})
            if category not in ALLOWED_TOOL_TAGS:
                errors.append({"slug": slug, "check": "category_valid", "message": f"Invalid category '{category}'"})

            if not isinstance(related, list) or not related:
                errors.append({"slug": slug, "check": "related_tools_present", "message": "relatedTools must be a non-empty array"})
            else:
                if len(related) < 3:
                    errors.append({"slug": slug, "check": "related_tools_min", "message": f"relatedTools has {len(related)} item(s), expected at least 3"})
                missing = [r for r in related if r not in tool_slugs]
                if missing:
                    errors.append({"slug": slug, "check": "related_tools_exist", "message": f"Invalid relatedTools reference(s): {', '.join(sorted(missing))}"})

            if not isinstance(faq, list):
                errors.append({"slug": slug, "check": "faq_array", "message": "faq must be an array"})
            else:
                if len(faq) < 3:
                    errors.append({"slug": slug, "check": "faq_min", "message": f"faq has {len(faq)} item(s), expected at least 3"})
                for idx, entry in enumerate(faq, start=1):
                    if not isinstance(entry, dict) or not str(entry.get("q", "")).strip() or not str(entry.get("a", "")).strip():
                        errors.append({"slug": slug, "check": "faq_shape", "message": f"faq[{idx}] must include non-empty q and a"})

            if use_cases is not None:
                if not isinstance(use_cases, list):
                    errors.append({"slug": slug, "check": "use_cases_array", "message": "useCases must be an array when present"})
                elif len(use_cases) < 2:
                    errors.append({"slug": slug, "check": "use_cases_min", "message": f"useCases has {len(use_cases)} item(s), expected at least 2"})

            if example is not None:
                if not isinstance(example, dict) or not str(example.get("input", "")).strip() or not str(example.get("output", "")).strip():
                    errors.append({"slug": slug, "check": "example_shape", "message": "example must include non-empty input and output"})

            if site_entry is not None and category and site_entry.get("tag") != category:
                errors.append({"slug": slug, "check": "category_match", "message": f"tools-meta.js category '{category}' does not match tools-data.js tag '{site_entry.get('tag')}'"})

        if site_entry is None:
            errors.append({"slug": slug, "check": "tools_data_exists", "message": "Missing tools-data.js entry"})
        else:
            name = str(site_entry.get("name", "")).strip()
            desc = str(site_entry.get("desc", "")).strip()
            tag = str(site_entry.get("tag", "")).strip()
            if not name:
                errors.append({"slug": slug, "check": "tools_data_name", "message": "tools-data.js entry is missing name"})
            if not desc:
                errors.append({"slug": slug, "check": "tools_data_desc", "message": "tools-data.js entry is missing desc"})
            if tag not in ALLOWED_TOOL_TAGS:
                errors.append({"slug": slug, "check": "tools_data_tag", "message": f"tools-data.js tag '{tag}' is invalid"})

    extra_meta = sorted(set(meta_by_slug) - set(tool_slugs))
    for slug in extra_meta:
        warnings.append({"slug": slug, "check": "orphan_meta", "message": "tools-meta.js entry exists but matching HTML file is missing"})

    extra_site = sorted(set(site_by_slug) - set(tool_slugs))
    for slug in extra_site:
        warnings.append({"slug": slug, "check": "orphan_tools_data", "message": "tools-data.js entry exists but matching HTML file is missing"})

    by_slug = defaultdict(list)
    for issue in errors:
        by_slug[issue["slug"]].append(issue)

    summary = {
        "date": date.today().isoformat(),
        "total_tools": len(tool_slugs),
        "meta_entries": len(meta_items),
        "tools_data_entries": len(site_tools),
        "error_count": len(errors),
        "warning_count": len(warnings),
        "failing_tools": len({issue["slug"] for issue in errors}),
        "errors": errors,
        "warnings": warnings,
    }
    return summary


def print_report(summary: dict, json_only: bool = False) -> None:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if json_only:
        import json
        print(json.dumps(summary, indent=2, ensure_ascii=False))
        return

    print("\n" + "=" * 60)
    print("  SimpleToolbox — Tool Metadata Validation")
    print(f"  {summary['date']}  |  {summary['total_tools']} tools")
    print("=" * 60)

    if summary["errors"]:
        print(f"\n  FAILURES ({summary['failing_tools']} tools, {summary['error_count']} errors):\n")
        current_slug = None
        for issue in summary["errors"]:
            if issue["slug"] != current_slug:
                current_slug = issue["slug"]
                print(f"  - {current_slug}")
            print(f"      [ERROR] {issue['check']}: {issue['message']}")
    else:
        print("\n  PASS: all tools pass metadata validation")

    if summary["warnings"]:
        print(f"\n  WARNINGS ({summary['warning_count']}):\n")
        for issue in summary["warnings"]:
            print(f"  WARN {issue['slug']}: {issue['check']}: {issue['message']}")

    print("\n" + "─" * 60)
    print(f"  {'PASS' if summary['error_count'] == 0 else 'FAIL'}  |  {summary['error_count']} errors  |  {summary['warning_count']} warnings")
    print("=" * 60 + "\n")


def main() -> None:
    parser = argparse.ArgumentParser(description="Validate tools metadata and index data")
    parser.add_argument("--json", action="store_true", help="Output JSON only")
    parser.add_argument("--no-report", action="store_true", help="Do not write JSON report file")
    args = parser.parse_args()

    summary = validate_metadata()
    print_report(summary, json_only=args.json)

    if not args.no_report:
        path = save_json_report("tools-meta-report.json", summary)
        if not args.json:
            print(f"  Report saved → {path}\n")

    sys.exit(0 if summary["error_count"] == 0 else 1)


if __name__ == "__main__":
    main()
