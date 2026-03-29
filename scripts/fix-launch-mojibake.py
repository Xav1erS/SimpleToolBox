#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

from tooling_utils import list_tool_files


ROOT = Path(__file__).resolve().parents[1]
BAD_CLOSE_RE = re.compile(r"(?<!<)/(?=(span|div|p|li|strong|a)>)")

REPLACEMENTS = [
    (re.compile(r"鈫\?"), "→"),
    (re.compile(r"鈫"), "→"),
    (re.compile(r"脳"), "×"),
    (re.compile(r"路"), "&middot;"),
    (re.compile(r"璺\?"), "&middot;"),
    (re.compile(r"璺"), "&middot;"),
    (re.compile(r"婕\?"), "&copy;"),
    (re.compile(r"婕"), "&copy;"),
    (re.compile(r"鈥\?"), "—"),
    (re.compile(r"鈥"), "—"),
]

TARGETED_REPLACEMENTS = [
    (re.compile(r">▀</span>"), ">&#9662;</span>"),
    (re.compile(r"'鈳\?'"), "'&#9251;'"),
    (re.compile(r'"鈳\?"'), '"&#9251;"'),
    (re.compile(r"dec === 32 \? '鈳\? :"), "dec === 32 ? '&#9251;' :"),
    (re.compile(r">鈳\?</button>"), ">Copy</button>"),
    (re.compile(r"handle\.textContent = '鉅\?;"), r"handle.textContent = '\\u2630';"),
    (re.compile(r": '—;"), r": '\\u2014';"),
    (re.compile(r"progressLabel\.textContent = 'Starting—;"), "progressLabel.textContent = 'Starting...';"),
    (re.compile(r"progressLabel\.textContent = 'Finalizing—;"), "progressLabel.textContent = 'Finalizing...';"),
    (re.compile(r"of \$\{globalTotal\}—;"), "of ${globalTotal}...`;"),
    (re.compile(r"<span>鉁</span>"), "<span>&#x2705;</span>"),
    (re.compile(r'(<button class="play-btn" id="btnPlay"[^>]*>)▀</button>'), r"\1&#9654;</button>"),
    (re.compile(r'(<button class="play-btn" id="btnStop"[^>]*>)▀</button>'), r"\1&#9632;</button>"),
    (re.compile(r"stop button \(▀"), "stop button (&#9632;"),
    (re.compile(r"Show all payments ▀"), "Show all payments &#9662;"),
    (re.compile(r"Show Amortization Schedule ▀"), "Show Amortization Schedule &#9662;"),
    (re.compile(r"Show Year-by-Year Growth ▀"), "Show Year-by-Year Growth &#9662;"),
    (
        re.compile(r'placeholder="([^"\n>]*?)(?:鈥\?|鈥|—)\s+(?=(?:readonly\s+)?(?:spellcheck|autocomplete)=)'),
        r'placeholder="\1… ',
    ),
]


def fix_text(text: str) -> str:
    fixed = text
    for pattern, replacement in TARGETED_REPLACEMENTS:
        fixed = pattern.sub(replacement, fixed)

    for pattern, replacement in REPLACEMENTS:
        fixed = pattern.sub(replacement, fixed)

    fixed = BAD_CLOSE_RE.sub("</", fixed)
    return fixed


def process_file(path: Path, dry_run: bool) -> tuple[str, bool]:
    original = path.read_text(encoding="utf-8")
    fixed = fix_text(original)
    changed = fixed != original
    if changed and not dry_run:
        path.write_text(fixed, encoding="utf-8")
    return path.stem, changed


def main() -> None:
    parser = argparse.ArgumentParser(description="Fix launch-blocking mojibake and bare closing tags on tool pages.")
    parser.add_argument("--dry-run", action="store_true", help="Show which files would change without writing")
    parser.add_argument("--slugs", nargs="+", help="Specific tool slugs to process")
    args = parser.parse_args()

    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    files = list_tool_files()
    if args.slugs:
        wanted = set(args.slugs)
        files = [path for path in files if path.stem in wanted]

    changed = 0
    unchanged = 0
    for path in files:
        slug, did_change = process_file(path, args.dry_run)
        if did_change:
            changed += 1
            marker = "~" if args.dry_run else "✓"
            print(f"[{marker}] {slug}")
        else:
            unchanged += 1

    mode = "dry-run" if args.dry_run else "applied"
    print(f"\nDone ({mode}): {changed} changed, {unchanged} unchanged.")


if __name__ == "__main__":
    main()
