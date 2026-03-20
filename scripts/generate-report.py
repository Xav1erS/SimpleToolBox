#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
from datetime import date
from pathlib import Path

from tooling_utils import REPORTS_DIR, save_json_report


ROOT = Path(__file__).resolve().parents[1]


def detect_npx() -> tuple[str | None, str | None]:
    npx = shutil.which("npx") or shutil.which("npx.cmd")
    if npx:
        return npx, str(Path(npx).parent)

    candidates = [
        Path(r"C:\Program Files\nodejs\npx.cmd"),
        Path(r"C:\Program Files\nodejs\npx"),
        Path(r"C:\Program Files (x86)\nodejs\npx.cmd"),
        Path(r"C:\Users\Windows11\AppData\Roaming\npm\npx.cmd"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return str(candidate), str(candidate.parent)
    return None, None


def run_command(label: str, command: list[str], extra_path: str | None = None) -> dict:
    try:
        env = os.environ.copy()
        if extra_path:
            env["PATH"] = extra_path + os.pathsep + env.get("PATH", "")
        proc = subprocess.run(
            command,
            cwd=ROOT,
            text=True,
            capture_output=True,
            encoding="utf-8",
            errors="replace",
            env=env,
        )
        return {
            "label": label,
            "command": command,
            "exit_code": proc.returncode,
            "stdout": proc.stdout,
            "stderr": proc.stderr,
            "status": "passed" if proc.returncode == 0 else "failed",
        }
    except FileNotFoundError as exc:
        return {
            "label": label,
            "command": command,
            "exit_code": None,
            "stdout": "",
            "stderr": str(exc),
            "status": "skipped",
        }


def load_json(path: Path) -> dict:
    if not path.exists():
        return {}
    return json.loads(path.read_text(encoding="utf-8"))


def build_summary(commands: dict[str, dict]) -> dict:
    validation = load_json(REPORTS_DIR / "validation-report.json")
    metadata = load_json(REPORTS_DIR / "tools-meta-report.json")
    page_audit = load_json(REPORTS_DIR / "page-audit-report.json")

    validation_files = validation.get("files", {})
    missing_seo_fields = 0
    for item in validation_files.values():
        missing_seo_fields += sum(
            1 for error in item.get("errors", [])
            if error.get("check") in {"has_title", "has_meta_description", "has_canonical", "has_h1", "has_json_ld"}
        )

    invalid_related = 0
    for error in metadata.get("errors", []):
        if error.get("check") == "related_tools_exist":
            invalid_related += 1

    page_load_failures = 0
    console_error_count = 0
    for file_result in page_audit.get("files", {}).values():
        for error in file_result.get("errors", []):
            if error.get("check") in {"http_status", "http_open"}:
                page_load_failures += 1
        for warning in file_result.get("warnings", []):
            if warning.get("check") == "console_errors":
                console_error_count += 1

    smoke = commands["smoke"]
    visual = commands["visual"]

    metadata_failed_tools = metadata.get("failing_tools")
    if metadata_failed_tools is None and commands["metadata"]["status"] == "failed":
        metadata_failed_tools = "UNKNOWN (metadata report missing)"

    tool_count = validation.get("total_files")
    if tool_count is None:
        tool_count = len(page_audit.get("files", {}))

    return {
        "date": date.today().isoformat(),
        "tool_count": tool_count or 0,
        "metadata_validation_failed_tools": metadata_failed_tools if metadata_failed_tools is not None else 0,
        "page_load_failures": page_load_failures,
        "console_error_count": console_error_count,
        "smoke_test_failures": None if smoke["status"] == "skipped" else (0 if smoke["status"] == "passed" else 1),
        "visual_regression_failures": None if visual["status"] == "skipped" else (0 if visual["status"] == "passed" else 1),
        "missing_seo_fields": missing_seo_fields,
        "invalid_related_tools": invalid_related,
        "commands": commands,
    }


def write_markdown(summary: dict) -> Path:
    lines = [
        "# SimpleToolbox Preflight Report",
        "",
        f"- Date: {summary['date']}",
        f"- Total tools: {summary['tool_count']}",
        f"- Metadata validation failed tools: {summary['metadata_validation_failed_tools']}",
        f"- Page load failures: {summary['page_load_failures']}",
        f"- Console error count: {summary['console_error_count']}",
        f"- Smoke test failures: {summary['smoke_test_failures'] if summary['smoke_test_failures'] is not None else 'SKIPPED'}",
        f"- Visual regression failures: {summary['visual_regression_failures'] if summary['visual_regression_failures'] is not None else 'SKIPPED'}",
        f"- Missing SEO fields: {summary['missing_seo_fields']}",
        f"- Invalid related tools: {summary['invalid_related_tools']}",
        "",
        "## Commands",
        "",
    ]

    for name, cmd in summary["commands"].items():
        lines.append(f"### {name}")
        lines.append(f"- Status: {cmd['status']}")
        lines.append(f"- Command: `{' '.join(cmd['command'])}`")
        if cmd["exit_code"] is not None:
            lines.append(f"- Exit code: {cmd['exit_code']}")
        if cmd["stderr"]:
            lines.append(f"- stderr: `{cmd['stderr'].strip()[:300]}`")
        lines.append("")

    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    path = REPORTS_DIR / "preflight-report.md"
    path.write_text("\n".join(lines), encoding="utf-8")
    return path


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    commands = {
        "validate": run_command("validate", [sys.executable, "scripts/validate-tools.py"]),
        "metadata": run_command("metadata", [sys.executable, "scripts/check-tools-meta.py"]),
        "page_audit": run_command("page_audit", [sys.executable, "scripts/page-audit.py"]),
    }

    npx, extra_path = detect_npx()
    if npx:
        commands["smoke"] = run_command("smoke", [npx, "playwright", "test", "tests/smoke/", "--project=Desktop Chrome"], extra_path=extra_path)
        commands["visual"] = run_command("visual", [npx, "playwright", "test", "tests/visual/snapshot.test.js", "--project=Desktop Chrome"], extra_path=extra_path)
    else:
        commands["smoke"] = {"label": "smoke", "command": ["npx", "playwright", "test", "tests/smoke/", "--project=Desktop Chrome"], "exit_code": None, "stdout": "", "stderr": "npx not found in PATH", "status": "skipped"}
        commands["visual"] = {"label": "visual", "command": ["npx", "playwright", "test", "tests/visual/snapshot.test.js", "--project=Desktop Chrome"], "exit_code": None, "stdout": "", "stderr": "npx not found in PATH", "status": "skipped"}

    summary = build_summary(commands)
    json_path = save_json_report("preflight-report.json", summary)
    md_path = write_markdown(summary)

    print("\n" + "=" * 60)
    print("  SimpleToolbox — Preflight Summary")
    print("=" * 60)
    print(f"  Tools:                  {summary['tool_count']}")
    print(f"  Metadata failures:      {summary['metadata_validation_failed_tools']}")
    print(f"  Page load failures:     {summary['page_load_failures']}")
    print(f"  Console errors:         {summary['console_error_count']}")
    print(f"  Smoke test failures:    {summary['smoke_test_failures'] if summary['smoke_test_failures'] is not None else 'SKIPPED'}")
    print(f"  Visual failures:        {summary['visual_regression_failures'] if summary['visual_regression_failures'] is not None else 'SKIPPED'}")
    print(f"  Missing SEO fields:     {summary['missing_seo_fields']}")
    print(f"  Invalid related tools:  {summary['invalid_related_tools']}")
    print("-" * 60)
    print(f"  JSON report → {json_path}")
    print(f"  Markdown    → {md_path}")
    print("=" * 60 + "\n")

    failed_required = [
        commands["validate"]["status"] == "failed",
        commands["metadata"]["status"] == "failed",
        commands["page_audit"]["status"] == "failed",
    ]
    sys.exit(1 if any(failed_required) else 0)


if __name__ == "__main__":
    main()
