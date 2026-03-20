#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import socket
import sys
import threading
import urllib.request
from datetime import date
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from tooling_utils import PUBLIC_DIR, TOOLS_DIR, load_tools_meta, save_json_report


def find_free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def start_server():
    port = find_free_port()
    class QuietHandler(SimpleHTTPRequestHandler):
        def log_message(self, format, *args):  # noqa: A003
            return

    handler = partial(QuietHandler, directory=str(PUBLIC_DIR))
    server = ThreadingHTTPServer(("127.0.0.1", port), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server, port


def audit_file(path: Path, faq_expected: bool, base_url: str) -> dict:
    content = path.read_text(encoding="utf-8")
    slug = path.stem
    issues = []
    warnings = []
    skipped = []

    try:
        with urllib.request.urlopen(f"{base_url}/tools/{slug}.html") as response:
            status = response.status
        if status != 200:
            issues.append({"check": "http_status", "message": f"Expected HTTP 200, got {status}"})
    except Exception as exc:
        issues.append({"check": "http_open", "message": f"Page failed to open over local HTTP server: {exc}"})

    title_match = re.search(r"<title>(.*?)</title>", content, re.DOTALL)
    if not title_match or not title_match.group(1).strip():
        issues.append({"check": "title", "message": "Missing or empty <title>"})

    stripped = re.sub(r"<script[\s\S]*?</script>", "", content)
    h1_count = len(re.findall(r"<h1[\s>]", stripped))
    if h1_count != 1:
        issues.append({"check": "h1", "message": f"Expected exactly 1 <h1>, found {h1_count}"})

    if not re.search(r'<meta\s+name="description"', content):
        issues.append({"check": "meta_description", "message": "Missing meta description"})
    if not re.search(r'<link\s+rel="canonical"', content):
        issues.append({"check": "canonical", "message": "Missing canonical link"})
    if 'class="ds-seo-more"' not in content:
        issues.append({"check": "learn_more", "message": "Missing Learn More block"})
    if 'class="ds-related-tools"' not in content:
        issues.append({"check": "related_tools", "message": "Missing Related Tools block"})
    if faq_expected and 'ds-seo-faq-item' not in content:
        issues.append({"check": "faq_render", "message": "Metadata expects FAQ, but page has no ds-seo-faq-item"})

    if 'ds-tool-nav-center' in content:
        warnings.append({"check": "legacy_nav", "message": "Uses legacy nav-center layout; migrate to ds-tool-nav-name structure"})

    skipped.append({"check": "console_errors", "message": "Browser console audit not available in Python-only page audit"})
    skipped.append({"check": "hydration_errors", "message": "Hydration audit skipped because project uses static HTML and no browser runner is attached here"})

    return {
        "slug": slug,
        "pass": len(issues) == 0,
        "errors": issues,
        "warnings": warnings,
        "skipped": skipped,
    }


def run_audit() -> dict:
    meta_by_slug = {item["slug"]: item for item in load_tools_meta()}
    server, port = start_server()
    base_url = f"http://127.0.0.1:{port}"

    try:
        results = {}
        total_errors = 0
        total_warnings = 0
        for path in sorted(TOOLS_DIR.glob("*.html")):
            faq_expected = bool(meta_by_slug.get(path.stem, {}).get("faq"))
            result = audit_file(path, faq_expected=faq_expected, base_url=base_url)
            results[path.name] = result
            total_errors += len(result["errors"])
            total_warnings += len(result["warnings"])
    finally:
        server.shutdown()
        server.server_close()

    summary = {
        "date": date.today().isoformat(),
        "total_files": len(results),
        "pass": sum(1 for item in results.values() if item["pass"]),
        "fail": sum(1 for item in results.values() if not item["pass"]),
        "total_errors": total_errors,
        "total_warnings": total_warnings,
        "files": results,
    }
    return summary


def print_report(summary: dict, json_only: bool = False) -> None:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if json_only:
        print(json.dumps(summary, indent=2, ensure_ascii=False))
        return

    print("\n" + "=" * 60)
    print("  SimpleToolbox — Page Audit")
    print(f"  {summary['date']}  |  {summary['total_files']} pages")
    print("=" * 60)

    failures = {name: item for name, item in summary["files"].items() if not item["pass"]}
    if failures:
        print(f"\n  FAILURES ({len(failures)} pages):\n")
        for name, item in sorted(failures.items()):
            print(f"  - {name}")
            for issue in item["errors"]:
                print(f"      [ERROR] {issue['check']}: {issue['message']}")
            for issue in item["warnings"]:
                print(f"      [WARN]  {issue['check']}: {issue['message']}")
    else:
        print(f"\n  PASS: all {summary['total_files']} pages pass page-audit checks")

    warning_files = {name: item for name, item in summary["files"].items() if item["warnings"]}
    if warning_files:
        print(f"\n  WARNINGS ({len(warning_files)} pages):\n")
        for name, item in sorted(warning_files.items()):
            for warning in item["warnings"]:
                print(f"  WARN {name}: {warning['check']}: {warning['message']}")

    print("\n" + "─" * 60)
    print(f"  {'PASS' if summary['fail'] == 0 else 'FAIL'}  |  {summary['total_errors']} errors  |  {summary['total_warnings']} warnings")
    print("=" * 60 + "\n")


def main() -> None:
    parser = argparse.ArgumentParser(description="Audit tool pages for SEO and structural requirements")
    parser.add_argument("--json", action="store_true", help="Output JSON only")
    parser.add_argument("--no-report", action="store_true", help="Do not write JSON report file")
    args = parser.parse_args()

    summary = run_audit()
    print_report(summary, json_only=args.json)

    if not args.no_report:
        path = save_json_report("page-audit-report.json", summary)
        if not args.json:
            print(f"  Report saved → {path}\n")

    sys.exit(0 if summary["fail"] == 0 else 1)


if __name__ == "__main__":
    main()
