#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from pathlib import Path

from tooling_utils import REPORTS_DIR, list_tool_files, read_text, save_json_report


BAD_CLOSE_LITERALS = ("?/span>", "?/div>", "?/p>", "?/li>", "?/strong>", "?/a>")
MOJI_LATIN_CODES = {194, 195, 226, 240}


def has_dirty_markup(content: str) -> tuple[bool, dict[str, object]]:
    has_cjk = any(0x3400 <= ord(ch) <= 0x9FFF for ch in content)
    has_moji_latin = any(ord(ch) in MOJI_LATIN_CODES for ch in content)
    has_replacement = "\ufffd" in content
    bad_closes = [literal for literal in BAD_CLOSE_LITERALS if literal in content]

    return (
        has_cjk or has_moji_latin or has_replacement or bool(bad_closes),
        {
            "cjk": has_cjk,
            "moji_latin": has_moji_latin,
            "replacement_char": has_replacement,
            "bad_close_literals": bad_closes,
        },
    )


def classify_tool(path: Path) -> dict[str, object]:
    content = read_text(path)
    dirty, dirty_detail = has_dirty_markup(content)

    has_shared_nav = '<nav class="ds-nav" id="nav">' in content
    has_old_nav = 'class="ds-tool-nav' in content
    has_context_script = "window.STB_PAGE_CONTEXT" in content
    has_site_nav = "site-navigation.js" in content
    has_tool_context = 'class="ds-tool-context"' in content
    has_tool_main = "ds-tool-main" in content
    has_main_root = 'class="main' in content or 'class="main ' in content
    has_header = (
        "ds-tool-header" in content
        or 'class="tool-header"' in content
        or 'class="tool-header ' in content
    )
    has_seo_shell = (
        'class="ds-seo-content"' in content
        and 'class="ds-related-tools"' in content
        and 'class="ds-seo-more"' in content
    )
    has_what = bool(re.search(r">\s*What is ", content, re.IGNORECASE))
    has_how = bool(re.search(r">\s*How to Use ", content, re.IGNORECASE))

    shell_ok = (has_old_nav or has_shared_nav) and has_header and (has_main_root or has_tool_main) and has_seo_shell
    seo_ok = has_what and has_how
    partial_shared = (
        has_site_nav or has_context_script or has_shared_nav or has_tool_context
    ) and not (has_shared_nav and has_context_script and has_site_nav and has_tool_context)

    if not dirty and shell_ok and seo_ok and not partial_shared:
        group = "direct"
        reason = "Structure is clean and ready for direct shell migration."
    elif dirty and shell_ok and seo_ok and not partial_shared:
        group = "cleanup"
        reason = "Shell and SEO skeleton are usable, but dirty markup must be cleaned first."
    else:
        group = "manual"
        if partial_shared:
            reason = "Page is in a partial shared-shell state."
        elif dirty:
            reason = "Dirty markup is combined with shell or SEO gaps."
        else:
            reason = "Shell or SEO contract gaps require one-by-one handling."

    issues: list[str] = []
    if dirty:
        issues.append("dirty_markup")
    if partial_shared:
        issues.append("partial_shared_shell")
    if not has_tool_main:
        issues.append("missing_ds_tool_main")
    if not has_main_root and not has_tool_main:
        issues.append("missing_main_root")
    if not has_what:
        issues.append("missing_what_section")
    if not has_how:
        issues.append("missing_how_section")
    if not has_seo_shell:
        issues.append("missing_seo_shell")
    if not has_header:
        issues.append("missing_header_shell")
    if not (has_old_nav or has_shared_nav):
        issues.append("missing_top_nav")

    return {
        "slug": path.stem,
        "file": str(path),
        "group": group,
        "reason": reason,
        "issues": issues,
        "flags": {
            "shared_nav": has_shared_nav,
            "old_nav": has_old_nav,
            "context_script": has_context_script,
            "site_navigation_script": has_site_nav,
            "tool_context": has_tool_context,
            "tool_main": has_tool_main,
            "main_root": has_main_root,
            "header_shell": has_header,
            "seo_shell": has_seo_shell,
            "what_section": has_what,
            "how_section": has_how,
            "partial_shared": partial_shared,
        },
        "dirty_detail": dirty_detail,
    }


def build_report(items: list[dict[str, object]]) -> dict[str, object]:
    counts = Counter(item["group"] for item in items)
    issue_counts = Counter()
    for item in items:
        for issue in item["issues"]:
            issue_counts[issue] += 1

    grouped = {
        "direct": [item["slug"] for item in items if item["group"] == "direct"],
        "cleanup": [item["slug"] for item in items if item["group"] == "cleanup"],
        "manual": [item["slug"] for item in items if item["group"] == "manual"],
    }

    return {
        "tool_count": len(items),
        "group_counts": dict(counts),
        "issue_counts": dict(issue_counts),
        "groups": grouped,
        "files": {item["slug"]: item for item in items},
    }


def print_summary(report: dict[str, object]) -> None:
    counts = report["group_counts"]
    issues = report["issue_counts"]

    print("\n" + "=" * 60)
    print("  SimpleToolbox - Tool Shell Migration Audit")
    print("=" * 60)
    print(f"  Tools audited:         {report['tool_count']}")
    print(f"  Direct migration:      {counts.get('direct', 0)}")
    print(f"  Cleanup then migrate:  {counts.get('cleanup', 0)}")
    print(f"  Manual handling:       {counts.get('manual', 0)}")
    print("-" * 60)
    print(f"  Dirty markup:          {issues.get('dirty_markup', 0)}")
    print(f"  Missing ds-tool-main:  {issues.get('missing_ds_tool_main', 0)}")
    print(f"  Missing What section:  {issues.get('missing_what_section', 0)}")
    print(f"  Missing How section:   {issues.get('missing_how_section', 0)}")
    print(f"  Partial shared shell:  {issues.get('partial_shared_shell', 0)}")
    print("=" * 60)


def main() -> None:
    parser = argparse.ArgumentParser(description="Audit tool pages for shared shell migration readiness.")
    parser.add_argument("slug", nargs="?", help="Audit a single tool slug")
    parser.add_argument("--json", action="store_true", help="Print JSON only")
    args = parser.parse_args()

    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    files = list_tool_files()
    if args.slug:
        files = [path for path in files if path.stem == args.slug]
        if not files:
            raise SystemExit(f"Tool not found: {args.slug}")

    items = [classify_tool(path) for path in files]
    report = build_report(items)

    save_json_report("tool-shell-migration-audit.json", report)

    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
        return

    print_summary(report)
    for group in ("direct", "cleanup", "manual"):
        slugs = report["groups"][group]
        preview = ", ".join(slugs[:12]) if slugs else "-"
        suffix = "" if len(slugs) <= 12 else f" ... (+{len(slugs) - 12} more)"
        print(f"{group:>8}: {preview}{suffix}")


if __name__ == "__main__":
    main()
