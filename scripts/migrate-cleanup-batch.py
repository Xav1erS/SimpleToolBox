#!/usr/bin/env python3
"""
Migrate the 128 "cleanup" group tool pages to the shared shell.

Per page:
  1. Fix bad closing tags  (?/span> -> </span> etc.)
  2. Replace <nav class="ds-tool-nav"> with the standard shared nav
  3. Insert <div class="ds-tool-context"> after ds-tool-header__desc
  4. Add site-hierarchy.js, STB_PAGE_CONTEXT, site-navigation.js before tool-page-icon.js
  5. Write back UTF-8

Usage:
  python scripts/migrate-cleanup-batch.py --dry-run
  python scripts/migrate-cleanup-batch.py --dry-run --slugs add-image-border blur-image
  python scripts/migrate-cleanup-batch.py --slugs add-image-border blur-image
  python scripts/migrate-cleanup-batch.py --batch-size 5
  python scripts/migrate-cleanup-batch.py          # all 128 cleanup pages
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
TOOLS_DIR = ROOT / "public" / "tools"
TOOLS_DATA_JS = ROOT / "public" / "tools-data.js"
SCRIPTS_DIR = ROOT / "scripts"

BAD_CLOSE_FIXES = [
    ("?/span>",   "</span>"),
    ("?/div>",    "</div>"),
    ("?/p>",      "</p>"),
    ("?/li>",     "</li>"),
    ("?/strong>", "</strong>"),
    ("?/a>",      "</a>"),
]

# tag -> (relative hub href, display name)
HUB_MAP: dict[str, tuple[str, str]] = {
    "image":      ("../image-tools.html",      "Image Tools"),
    "text":       ("../text-tools.html",        "Text Tools"),
    "encode":     ("../developer-tools.html",   "Developer Tools"),
    "format":     ("../developer-tools.html",   "Developer Tools"),
    "convert":    ("../converter-tools.html",   "Converter Tools"),
    "calculator": ("../calculator-tools.html",  "Calculator Tools"),
    "generate":   ("../generator-tools.html",   "Generator Tools"),
    "reference":  ("../developer-tools.html",   "Developer Tools"),
    "design":     ("../generator-tools.html",   "Generator Tools"),
    "pdf":        ("../pdf-tools.html",         "PDF Tools"),
}

SHARED_NAV = """\
<nav class="ds-nav" id="nav">
  <a href="../index.html" class="ds-nav__brand">
    <div class="ds-nav__logo-icon"><img src="../logo.svg" class="logo-img" width="28" height="28" alt="Simple ToolBox" /></div>
    Simple ToolBox
  </a>

  <div class="nav-search">
    <svg class="nav-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
    <input type="text" id="navSearch" class="ds-input" placeholder="Search tools..." autocomplete="off" aria-label="Search tools" />
    <kbd>Ctrl K</kbd>
    <div class="search-dropdown" id="navSearchDropdown"></div>
  </div>

  <div class="nav-actions">
    <a href="https://github.com/Xav1erS/SimpleToolBox" target="_blank" rel="noopener" class="nav-link">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
      GitHub
    </a>
    <a href="../contact.html" class="btn-primary ds-btn ds-btn--primary">Submit a Tool</a>
  </div>
</nav>"""


# ---------------------------------------------------------------------------
# Parsing helpers
# ---------------------------------------------------------------------------

def get_cleanup_slugs() -> list[str]:
    """Call audit script and return the cleanup-group slug list."""
    result = subprocess.run(
        [sys.executable, str(SCRIPTS_DIR / "audit-tool-shell-migration.py"), "--json"],
        capture_output=True, text=True, encoding="utf-8", cwd=str(SCRIPTS_DIR),
    )
    data = json.loads(result.stdout)
    return data["groups"]["cleanup"]


def parse_tag_map(js_path: Path) -> dict[str, str]:
    """Parse tools-data.js to build slug -> tag mapping."""
    text = js_path.read_text(encoding="utf-8")
    tag_map: dict[str, str] = {}
    # Each line: href: 'tools/slug.html', ... tag: 'value'  (or reverse order)
    for m in re.finditer(
        r"href:\s*['\"]tools/([^.'\"+]+)\.html['\"][^}]*?tag:\s*['\"]([^'\"]+)['\"]",
        text, re.DOTALL,
    ):
        tag_map[m.group(1)] = m.group(2)
    # Also handle tag before href
    for m in re.finditer(
        r"tag:\s*['\"]([^'\"]+)['\"][^}]*?href:\s*['\"]tools/([^.'\"+]+)\.html['\"]",
        text, re.DOTALL,
    ):
        if m.group(2) not in tag_map:
            tag_map[m.group(2)] = m.group(1)
    return tag_map


# ---------------------------------------------------------------------------
# Transformation steps
# ---------------------------------------------------------------------------

def step_fix_bad_closes(content: str) -> tuple[str, bool]:
    new = content
    for bad, good in BAD_CLOSE_FIXES:
        new = new.replace(bad, good)
    return new, new != content


def step_replace_nav(content: str) -> tuple[str, bool]:
    """Replace <nav class="ds-tool-nav"...>...</nav> with the shared nav."""
    if '<nav class="ds-nav" id="nav">' in content:
        return content, False  # already done
    pattern = re.compile(r'<nav\s+class="ds-tool-nav[^"]*"[^>]*>.*?</nav>', re.DOTALL)
    new = pattern.sub(SHARED_NAV, content, count=1)
    return new, new != content


def _build_tool_context(hub_url: str, hub_name: str) -> str:
    return (
        f'    <div class="ds-tool-context">\n'
        f'      <a href="{hub_url}" class="ds-tool-context__pill ds-tool-context__pill--hub">{hub_name}</a>\n'
        f'      <span class="ds-tool-context__pill"><span class="ds-tool-context__dot"></span>Runs locally</span>\n'
        f'      <span class="ds-tool-context__pill">No data sent</span>\n'
        f'    </div>'
    )


def step_insert_tool_context(content: str, hub_url: str, hub_name: str) -> tuple[str, bool]:
    """Insert ds-tool-context div after the ds-tool-header__desc paragraph."""
    if 'class="ds-tool-context"' in content:
        return content, False  # already present
    # Match the desc <p> element (possibly multi-line).
    # class may be a single value or a space-separated list containing ds-tool-header__desc.
    pattern = re.compile(
        r'(<p\s[^>]*class="[^"]*ds-tool-header__desc[^"]*"[^>]*>.*?</p>)',
        re.DOTALL,
    )
    m = pattern.search(content)
    if not m:
        return content, False  # no desc element found; skip
    ctx_html = _build_tool_context(hub_url, hub_name)
    new = content[: m.end()] + "\n" + ctx_html + content[m.end():]
    return new, True


def _build_new_scripts_block(slug: str, include_icon: bool = True) -> str:
    parts = [
        '<script src="../tools-data.js"></script>',
        '<script src="../site-hierarchy.js?v=7"></script>',
        "<script>\n"
        f"  window.STB_PAGE_CONTEXT = {{\n"
        f"    pageType: 'tool',\n"
        f"    slug: '{slug}'\n"
        f"  }};\n"
        "</script>",
        '<script src="../scripts/site-navigation.js?v=10"></script>',
    ]
    if include_icon:
        parts.append('<script src="../tool-page-icon.js"></script>')
    return "\n".join(parts)


def step_update_scripts(content: str, slug: str) -> tuple[str, bool]:
    """Insert site-hierarchy, STB_PAGE_CONTEXT, site-navigation before tool-page-icon (or stb_recent)."""
    if "site-navigation.js" in content and "STB_PAGE_CONTEXT" in content:
        return content, False  # already done

    # Case 1: page already has tools-data.js + tool-page-icon.js  (normal pattern)
    icon_anchor = '<script src="../tool-page-icon.js"></script>'
    if icon_anchor in content:
        # Replace just the tool-page-icon.js line with the full new block
        new_block = (
            '<script src="../site-hierarchy.js?v=7"></script>\n'
            "<script>\n"
            f"  window.STB_PAGE_CONTEXT = {{\n"
            f"    pageType: 'tool',\n"
            f"    slug: '{slug}'\n"
            f"  }};\n"
            "</script>\n"
            '<script src="../scripts/site-navigation.js?v=10"></script>\n'
            + icon_anchor
        )
        new = content.replace(icon_anchor, new_block, 1)
        return new, True

    # Case 2: page has no tool-page-icon.js — insert full block before stb_recent
    stb_anchor = '<script>(function(){try{var k="stb_recent"'
    if stb_anchor in content:
        has_tools_data = '<script src="../tools-data.js"></script>' in content
        parts = []
        if not has_tools_data:
            parts.append('<script src="../tools-data.js"></script>')
        parts += [
            '<script src="../site-hierarchy.js?v=7"></script>',
            "<script>\n"
            f"  window.STB_PAGE_CONTEXT = {{\n"
            f"    pageType: 'tool',\n"
            f"    slug: '{slug}'\n"
            f"  }};\n"
            "</script>",
            '<script src="../scripts/site-navigation.js?v=10"></script>',
            '<script src="../tool-page-icon.js"></script>',
        ]
        full_block = "\n".join(parts) + "\n"
        new = content.replace(stb_anchor, full_block + stb_anchor, 1)
        return new, True

    return content, False


# ---------------------------------------------------------------------------
# Per-page migration
# ---------------------------------------------------------------------------

def migrate_page(
    path: Path, slug: str, tag: str, dry_run: bool
) -> dict[str, object]:
    content = path.read_text(encoding="utf-8")
    original = content
    applied: list[str] = []

    content, changed = step_fix_bad_closes(content)
    if changed:
        applied.append("fix_bad_closes")

    content, changed = step_replace_nav(content)
    if changed:
        applied.append("replace_nav")

    hub_url, hub_name = HUB_MAP.get(tag, ("../all-tools.html", "All Tools"))
    content, changed = step_insert_tool_context(content, hub_url, hub_name)
    if changed:
        applied.append("insert_tool_context")

    content, changed = step_update_scripts(content, slug)
    if changed:
        applied.append("update_scripts")

    if content == original:
        return {"slug": slug, "status": "no_change", "changes": []}

    if not dry_run:
        path.write_text(content, encoding="utf-8")

    return {
        "slug": slug,
        "status": "dry_run" if dry_run else "migrated",
        "changes": applied,
    }


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Migrate cleanup-group tool pages to the shared shell."
    )
    parser.add_argument(
        "--slugs", nargs="+", metavar="SLUG",
        help="Specific slugs to process (default: all cleanup-group pages)",
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Show what would change without writing files",
    )
    parser.add_argument(
        "--batch-size", type=int, default=0, metavar="N",
        help="Process only the first N pages",
    )
    args = parser.parse_args()

    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    # Build slug -> tag map
    tag_map = parse_tag_map(TOOLS_DATA_JS)

    # Determine target slugs
    if args.slugs:
        slugs = args.slugs
    else:
        print("Querying audit script for cleanup group...")
        slugs = get_cleanup_slugs()

    if args.batch_size:
        slugs = slugs[: args.batch_size]

    mode_label = "DRY RUN — " if args.dry_run else ""
    print(f"\n{mode_label}Processing {len(slugs)} pages\n")

    results: list[dict[str, object]] = []
    for slug in slugs:
        path = TOOLS_DIR / f"{slug}.html"
        if not path.exists():
            print(f"  [SKIP] {slug} — file not found")
            continue
        tag = tag_map.get(slug, "")
        if not tag:
            print(f"  [WARN] {slug} — tag not found in tools-data.js, hub = All Tools")
        result = migrate_page(path, slug, tag, dry_run=args.dry_run)
        results.append(result)
        icon = "✓" if result["status"] == "migrated" else ("~" if result["changes"] else "=")
        changes_str = ", ".join(result["changes"]) or "nothing to do"  # type: ignore[arg-type]
        print(f"  [{icon}] {slug}: {changes_str}")

    total = len(results)
    touched = sum(1 for r in results if r["changes"])
    print(f"\nDone: {touched}/{total} pages {'would be ' if args.dry_run else ''}modified.")
    if args.dry_run and touched:
        print("Run without --dry-run to apply changes.")


if __name__ == "__main__":
    main()
