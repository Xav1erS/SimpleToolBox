#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
from datetime import date
from pathlib import Path

from tooling_utils import PUBLIC_DIR, load_site_tools, save_json_report


SITE_PAGE_NAMES = [
    "index.html",
    "all-tools.html",
    "about.html",
    "privacy.html",
    "terms.html",
    "contact.html",
    "developer-tools.html",
    "image-tools.html",
    "text-tools.html",
    "calculator-tools.html",
    "converter-tools.html",
    "generator-tools.html",
    "pdf-tools.html",
]
INLINE_SCRIPT_RE = re.compile(r"<script(?P<attrs>[^>]*)>(?P<body>[\s\S]*?)</script>", re.IGNORECASE)
SUSPICIOUS_VISIBLE_TOKENS = ("閳", "棣", "馃", "锔", "?/div>", "?/span>")
INDEX_REQUIRED_MARKERS = ('id="heroTags"', 'id="categoryGrid"', 'id="popularToolGrid"', 'id="newToolGrid"')


def detect_node() -> str | None:
    candidates = [
        shutil.which("node"),
        shutil.which("node.exe"),
        r"C:\Program Files\nodejs\node.exe",
        r"C:\Program Files (x86)\nodejs\node.exe",
    ]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return str(candidate)
    return None


NODE = detect_node()


def strip_html_noise(content: str) -> str:
    without_comments = re.sub(r"<!--[\s\S]*?-->", "", content)
    without_styles = re.sub(r"<style[\s\S]*?</style>", "", without_comments, flags=re.IGNORECASE)
    without_scripts = re.sub(r"<script[\s\S]*?</script>", "", without_styles, flags=re.IGNORECASE)
    return without_scripts


def extract_inline_scripts(content: str) -> list[str]:
    scripts: list[str] = []
    for match in INLINE_SCRIPT_RE.finditer(content):
        attrs = match.group("attrs") or ""
        if re.search(r"\bsrc\s*=", attrs, flags=re.IGNORECASE):
            continue
        if re.search(r'type\s*=\s*["\']application/ld\+json["\']', attrs, flags=re.IGNORECASE):
            continue
        body = match.group("body").strip()
        if body:
            scripts.append(body)
    return scripts


def parse_js_snippets(snippets: list[str]) -> list[str]:
    if not snippets or not NODE:
        return []
    payload = json.dumps(snippets, ensure_ascii=False)
    script = (
        "const snippets = JSON.parse(process.argv[1]);"
        "for (let i = 0; i < snippets.length; i += 1) {"
        "  try { new Function(snippets[i]); }"
        "  catch (error) {"
        "    console.error(`inline-script-${i + 1}: ${error.message}`);"
        "    process.exit(1);"
        "  }"
        "}"
    )
    proc = subprocess.run(
        [NODE, "-e", script, payload],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    if proc.returncode == 0:
        return []
    stderr = proc.stderr.strip() or proc.stdout.strip() or "Unknown inline script parse failure"
    return [stderr]


def parse_js_file(path: Path) -> list[str]:
    if not NODE:
        return ["Node.js not found; cannot validate shared JS parsing"]
    script = "const fs=require('fs'); new Function(fs.readFileSync(process.argv[1], 'utf8'));"
    proc = subprocess.run(
        [NODE, "-e", script, str(path)],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    if proc.returncode == 0:
        return []
    stderr = proc.stderr.strip() or proc.stdout.strip() or "Unknown JS parse failure"
    return [stderr]


def find_suspicious_tokens(content: str) -> list[str]:
    matches: list[str] = []
    for token in SUSPICIOUS_VISIBLE_TOKENS:
        if token in content:
            matches.append(token)
    return matches


def audit_site_page(path: Path) -> dict:
    content = path.read_text(encoding="utf-8")
    errors: list[dict[str, str]] = []

    if path.name == "index.html":
        for marker in INDEX_REQUIRED_MARKERS:
            if marker not in content:
                errors.append({"check": "required_marker", "message": f"Missing homepage marker {marker}"})

    for error in parse_js_snippets(extract_inline_scripts(content)):
        errors.append({"check": "inline_script_parse", "message": error})

    visible_html = strip_html_noise(content)
    suspicious = find_suspicious_tokens(visible_html)
    if suspicious:
        errors.append({
            "check": "suspicious_visible_text",
            "message": f"Visible HTML contains suspicious tokens: {', '.join(suspicious)}",
        })

    return {
        "page": path.name,
        "pass": len(errors) == 0,
        "errors": errors,
    }


def audit_tools_data() -> dict:
    errors: list[dict[str, str]] = []
    for error in parse_js_file(PUBLIC_DIR / "tools-data.js"):
        errors.append({"check": "js_parse", "message": error})

    try:
        tools = load_site_tools()
    except Exception as exc:  # noqa: BLE001
        errors.append({"check": "data_parse", "message": f"Failed to parse SITE_TOOLS: {exc}"})
        tools = []

    suspicious_fields: list[str] = []
    for item in tools:
        for field in ("name", "desc", "href", "tag"):
            value = str(item.get(field, ""))
            tokens = find_suspicious_tokens(value)
            if tokens:
                suspicious_fields.append(f"{item.get('href', 'unknown')}:{field}:{'/'.join(tokens)}")
                if len(suspicious_fields) >= 5:
                    break
        if len(suspicious_fields) >= 5:
            break

    if suspicious_fields:
        errors.append({
            "check": "suspicious_data_text",
            "message": "Shared tool data contains suspicious tokens outside icon fields: " + "; ".join(suspicious_fields),
        })

    return {
        "page": "tools-data.js",
        "pass": len(errors) == 0,
        "errors": errors,
    }


def run_audit() -> dict:
    results = {}
    for name in SITE_PAGE_NAMES:
        path = PUBLIC_DIR / name
        if not path.exists():
            results[name] = {
                "page": name,
                "pass": False,
                "errors": [{"check": "missing_file", "message": "File does not exist"}],
            }
            continue
        results[name] = audit_site_page(path)

    results["tools-data.js"] = audit_tools_data()

    fail_count = sum(1 for result in results.values() if not result["pass"])
    return {
        "date": date.today().isoformat(),
        "total_files": len(results),
        "fail": fail_count,
        "pass": len(results) - fail_count,
        "files": results,
    }


def print_report(summary: dict) -> None:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    print("\n" + "=" * 60)
    print("  SimpleToolbox - Site Pages Audit")
    print(f"  {summary['date']}  |  {summary['total_files']} files")
    print("=" * 60)
    failures = [item for item in summary["files"].values() if not item["pass"]]
    if failures:
        print(f"\n  FAILURES ({len(failures)} files):\n")
        for item in failures:
            print(f"  - {item['page']}")
            for error in item["errors"]:
                print(f"      [ERROR] {error['check']}: {error['message']}")
    else:
        print(f"\n  PASS: all {summary['total_files']} files pass site-page checks")
    print("\n" + "=" * 60 + "\n")


def main() -> None:
    summary = run_audit()
    print_report(summary)
    save_json_report("site-pages-report.json", summary)
    sys.exit(0 if summary["fail"] == 0 else 1)


if __name__ == "__main__":
    main()
