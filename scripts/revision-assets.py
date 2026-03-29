#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public"
REPORTS_DIR = ROOT / "reports"

ASSET_FILES = {
    "styles/design-system.css": PUBLIC_DIR / "styles" / "design-system.css",
    "site-hierarchy.js": PUBLIC_DIR / "site-hierarchy.js",
    "tools-data.js": PUBLIC_DIR / "tools-data.js",
    "tool-page-icon.js": PUBLIC_DIR / "tool-page-icon.js",
    "scripts/site-navigation.js": PUBLIC_DIR / "scripts" / "site-navigation.js",
    "scripts/hub-page-template.js": PUBLIC_DIR / "scripts" / "hub-page-template.js",
    "scripts/reference-guides.js": PUBLIC_DIR / "scripts" / "reference-guides.js",
    "scripts/tool-persist.js": PUBLIC_DIR / "scripts" / "tool-persist.js",
}

HTML_GLOB_PATTERNS = ("*.html", "tools/*.html")
ATTR_RE = re.compile(r'(?P<attr>\b(?:href|src)\s*=\s*")(?P<url>[^"]+)(")', re.IGNORECASE)


def asset_hash(path: Path) -> str:
    data = path.read_bytes()
    return hashlib.sha256(data).hexdigest()[:10]


def build_revision_map() -> dict[str, str]:
    revisions: dict[str, str] = {}
    for public_path, file_path in ASSET_FILES.items():
        if not file_path.exists():
            raise FileNotFoundError(f"Missing asset file: {file_path}")
        revisions[public_path] = asset_hash(file_path)
    return revisions


def normalize_url(url: str, revisions: dict[str, str]) -> str:
    if url.startswith(("http://", "https://", "//", "data:", "mailto:", "tel:", "#")):
        return url

    path_part, _, fragment = url.partition("#")
    clean_path, _, _old_query = path_part.partition("?")
    normalized = clean_path.lstrip("./")

    for asset_path, version in revisions.items():
        if normalized == asset_path or normalized.endswith("/" + asset_path):
            updated = f"{clean_path}?v={version}"
            if fragment:
                updated += f"#{fragment}"
            return updated

    return url


def rewrite_html(path: Path, revisions: dict[str, str]) -> bool:
    original = path.read_text(encoding="utf-8")

    def replace(match: re.Match[str]) -> str:
        updated_url = normalize_url(match.group("url"), revisions)
        return f'{match.group("attr")}{updated_url}"'

    updated = ATTR_RE.sub(replace, original)
    if updated == original:
        return False

    path.write_text(updated, encoding="utf-8")
    return True


def target_html_files() -> list[Path]:
    files: list[Path] = []
    for pattern in HTML_GLOB_PATTERNS:
        files.extend(PUBLIC_DIR.glob(pattern))
    return sorted(set(files))


def write_report(revisions: dict[str, str], changed_files: list[Path]) -> Path:
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    report_path = REPORTS_DIR / "asset-revisions.json"
    payload = {
        "revisions": revisions,
        "changed_files": [str(path.relative_to(ROOT)).replace("\\", "/") for path in changed_files],
    }
    report_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    return report_path


def main() -> None:
    revisions = build_revision_map()
    changed_files = [path for path in target_html_files() if rewrite_html(path, revisions)]
    report_path = write_report(revisions, changed_files)

    print("=" * 60)
    print("  SimpleToolbox - Asset Revision")
    print("=" * 60)
    for asset_path, version in revisions.items():
        print(f"  {asset_path} -> {version}")
    print("-" * 60)
    print(f"  HTML updated: {len(changed_files)}")
    print(f"  Report      : {report_path}")
    print("=" * 60)


if __name__ == "__main__":
    main()
