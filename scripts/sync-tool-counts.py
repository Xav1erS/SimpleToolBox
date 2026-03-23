"""
sync-tool-counts.py — Auto-update hardcoded tool counts in HTML meta tags.

Run after adding new tools:
    python scripts/sync-tool-counts.py

Updates:
  - public/all-tools.html  : <meta name="description"> and og:description
  - public/index.html       : <meta name="description"> and og:description (if present)
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from tooling_utils import load_site_tools

ROOT = Path(__file__).parent.parent
tools = load_site_tools()
count = len(tools)

TARGETS = [
    ROOT / "public" / "all-tools.html",
    ROOT / "public" / "index.html",
]

# Patterns that contain a tool count number
PATTERNS = [
    # "Browse all 124 free browser-based tools"
    (re.compile(r'Browse all \d+ free browser-based tools'), f'Browse all {count} free browser-based tools'),
    # "Browse all 124 free browser-based tools" in og:description
    (re.compile(r'Browse all \d+ free browser-based tools'), f'Browse all {count} free browser-based tools'),
    # "124 browser-based tools" standalone
    (re.compile(r'\b\d+ browser-based tools\b'), f'{count} browser-based tools'),
    # "124 free online tools"
    (re.compile(r'\b\d+ free online tools\b'), f'{count} free online tools'),
    # "over 124 tools" or "124+ tools"
    (re.compile(r'\b\d+\+ tools\b'), f'{count}+ tools'),
]

changed = []
for path in TARGETS:
    if not path.exists():
        continue
    original = path.read_text(encoding='utf-8')
    updated = original
    for pattern, replacement in PATTERNS:
        updated = pattern.sub(replacement, updated)
    if updated != original:
        path.write_text(updated, encoding='utf-8')
        changed.append(path.name)

if changed:
    print(f"Updated count to {count} in: {', '.join(changed)}")
else:
    print(f"No changes needed — count already {count} everywhere")
