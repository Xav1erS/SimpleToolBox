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
    (re.compile(r"鈭\?"), "−"),
    (re.compile(r"鈭"), "−"),
    (re.compile(r"脳"), "×"),
    (re.compile(r"路"), "&middot;"),
    (re.compile(r"璺\?"), "&middot;"),
    (re.compile(r"璺"), "&middot;"),
    (re.compile(r"婕\?"), "&copy;"),
    (re.compile(r"婕"), "&copy;"),
    (re.compile(r"鈥\?"), "—"),
    (re.compile(r"鈥"), "—"),
    (re.compile(r"鉁\?"), "&#10003;"),
    (re.compile(r"鉁"), "&#10003;"),
    (re.compile(r"鈻\?"), "&#9662;"),
    (re.compile(r"鈻"), "&#9662;"),
    (re.compile(r"鈱"), "#️⃣"),
    (re.compile(r"馃帣锔"), "🗣️"),
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
    (re.compile(r"runLabel\.innerHTML = '<span class=\"spinner\"></span>Minifying—;"), "runLabel.innerHTML = '<span class=\"spinner\"></span>Minifying...';"),
    (re.compile(r"of \$\{globalTotal\}—;"), "of ${globalTotal}...`;"),
    (re.compile(r"<span>鉁</span>"), "<span>&#x2705;</span>"),
    (re.compile(r"return '—;"), "return '—';"),
    (re.compile(r": '—;"), ": '—';"),
    (re.compile(r"textContent = '—;"), "textContent = '—';"),
    (re.compile(r"=== '—' return;"), "=== '—') return;"),
    (re.compile(r"== '—' return;"), "== '—') return;"),
    (re.compile(r"setVal\(id,\s*'—\)\);"), "setVal(id, '—'));"),
    (re.compile(r">鉁</span>"), ">&#10003;</span>"),
    (re.compile(r">鈻</span>"), ">&#9662;</span>"),
    (re.compile(r"==\s*'—\)"), "== '—'"),
    (re.compile(r"===\s*'—\)"), "=== '—'"),
    (re.compile(r"placeholder=\"([^\"]*?)… spellcheck=\"false\""), r'placeholder="\1…" spellcheck="false"'),
    (re.compile(r"placeholder=\"([^\"]*?)… readonly spellcheck=\"false\""), r'placeholder="\1…" readonly spellcheck="false"'),
    (re.compile(r"Hide ([^'\n]+?) 鈻\?"), r"Hide \1 &#9662;"),
    (re.compile(r"Show ([^'\n]+?) 鈻\?"), r"Show \1 &#9662;"),
    (
        re.compile(
            r"textContent = amortOpen \? 'Hide ([^'\n]+?) &#9662; : 'Show ([^'\n]+?) &#9662;;"
        ),
        r"textContent = amortOpen ? 'Hide \1 &#9662;' : 'Show \2 &#9662;';",
    ),
    (re.compile(r"(<button[^>]*>\s*Show [^<]*?&#9662;)/button>"), r"\1</button>"),
    (
        re.compile(r"placeholder = m === 'encode' \? '([^'\n]+?)— : '([^'\n]+?)—;"),
        r"placeholder = m === 'encode' ? '\1…' : '\2…';",
    ),
    (re.compile(r"textContent = m === 'encode' \? '→ : '→;"), "textContent = m === 'encode' ? '→' : '→';"),
    (re.compile(r"placeholder = 'Paste or type text to encode—;"), "placeholder = 'Paste or type text to encode…';"),
    (
        re.compile(r"placeholder = 'Paste HTML entities to decode, e\.g\. &amp;lt;div&amp;gt;—;"),
        "placeholder = 'Paste HTML entities to decode, e.g. &amp;lt;div&amp;gt;…';",
    ),
    (
        re.compile(r"\$\{r\.sign>0\?'\+':'−\}</button>"),
        "${r.sign>0?'+':'−'}</button>",
    ),
    (re.compile(r"textContent\s*=\s*'Converting—;"), "textContent = 'Converting...';"),
    (re.compile(r"textContent\s*=\s*'Loading PDF—;"), "textContent = 'Loading PDF...';"),
    (re.compile(r"textContent\s*=\s*'Extracting text—;"), "textContent = 'Extracting text...';"),
    (re.compile(r"textContent\s*=\s*'Rendering—;"), "textContent = 'Rendering...';"),
    (re.compile(r"textContent\s*=\s*'Generating—;"), "textContent = 'Generating...';"),
    (re.compile(r"textContent\s*=\s*'Awaiting token—;"), "textContent = 'Awaiting token...';"),
    (re.compile(r"textContent\s*=\s*'Awaiting input—;"), "textContent = 'Awaiting input...';"),
    (re.compile(r"textContent\s*=\s*'Starting—;"), "textContent = 'Starting...';"),
    (re.compile(r"textContent\s*=\s*'Finalizing—;"), "textContent = 'Finalizing...';"),
    (re.compile(r"setResult\(currentAlgo,\s*'Awaiting input—,\s*'empty'\)"), "setResult(currentAlgo, 'Awaiting input...', 'empty')"),
    (re.compile(r"setResult\(currentAlgo,\s*'Computing—,\s*'loading'\)"), "setResult(currentAlgo, 'Computing...', 'loading')"),
    (re.compile(r"textContent\s*=\s*data\.ip\s*\|\|\s*'—;"), "textContent = data.ip || '—';"),
    (re.compile(r"textContent\s*=\s*value\s*\?\s*applyCase\(value\)\s*:\s*'Awaiting input—;"), "textContent = value ? applyCase(value) : 'Awaiting input...';"),
    (re.compile(r"textContent\s*=\s*'&#10003;;"), "textContent = '✓';"),
    (re.compile(r"innerHTML\s*=\s*`<svg([^`]+?)Saving—;"), r"innerHTML = `<svg\1Saving...`;"),
    (re.compile(r"if\s*\(val\s*&&\s*val\s*!==\s*'—'\s*\{"), "if (val && val !== '—') {"),
    (re.compile(r"inputText\.placeholder\s*=\s*'Type or paste text here—;"), "inputText.placeholder = 'Type or paste text here…';"),
    (re.compile(r"outputText\.placeholder\s*=\s*'Binary output will appear here—;"), "outputText.placeholder = 'Binary output will appear here…';"),
    (re.compile(r"inputText\.placeholder\s*=\s*isY2J \? 'Paste YAML here— : 'Paste JSON here—;"), "inputText.placeholder = isY2J ? 'Paste YAML here…' : 'Paste JSON here…';"),
    (re.compile(r"arrowEl\.textContent\s*=\s*'→;"), "arrowEl.textContent = '→';"),
    (re.compile(r"btn\.textContent\s*=\s*'鈴\?;"), "btn.textContent = '▶';"),
    (re.compile(r"elAvgWord\.textContent\s*=\s*s\.avgWord\s*\?\?\s*'—;"), "elAvgWord.textContent = s.avgWord ?? '—';"),
    (re.compile(r"elLongest\.textContent\s*=\s*s\.longest\s*\|\|\s*'—;"), "elLongest.textContent = s.longest || '—';"),
    (re.compile(r"avgSent=sentences>0\?Math\.round\(wc/sentences\)\+' words':'—;"), "avgSent=sentences>0?Math.round(wc/sentences)+' words':'—';"),
    (re.compile(r"textContent\s*=\s*val === null \? '— : val;"), "textContent = val === null ? '—' : val;"),
    (re.compile(r"textContent='Converting—;statusEl\.className='file-status';"), "textContent='Converting...';statusEl.className='file-status';"),
    (re.compile(r"setStatus\(i,\s*'',\s*'Converting—\);"), "setStatus(i, '', 'Converting...');"),
    (re.compile(r"textContent\s*=\s*'−;"), "textContent = '—';"),
    (
        re.compile(r"inputText\.placeholder\s*=\s*m === 'encode' \? 'Type or paste text here— : 'Paste Base58 string here—;"),
        "inputText.placeholder = m === 'encode' ? 'Type or paste text here…' : 'Paste Base58 string here…';",
    ),
    (
        re.compile(r"textContent = tableOpen \? 'Hide Year-by-Year Growth &#9662; : 'Show Year-by-Year Growth &#9662;;"),
        "textContent = tableOpen ? 'Hide Year-by-Year Growth &#9662;' : 'Show Year-by-Year Growth &#9662;';",
    ),
    (re.compile(r"textContent = `Rendering page 1 of \$\{numPages\}—;"), "textContent = `Rendering page 1 of ${numPages}...`;"),
    (re.compile(r"textContent = `Rendering page \$\{i\} of \$\{numPages\}—;"), "textContent = `Rendering page ${i} of ${numPages}...`;"),
    (re.compile(r"textContent = `Processing image \$\{i \+ 1\} of \$\{images\.length\}—;"), "textContent = `Processing image ${i + 1} of ${images.length}...`;"),
    (re.compile(r"textContent = `Processing image \$\{i \+ 1\} of \$\{files\.length\}—;"), "textContent = `Processing image ${i + 1} of ${files.length}...`;"),
    (re.compile(r"textContent = 'Saving PDF—;"), "textContent = 'Saving PDF...';"),
    (re.compile(r"textContent = 'Downloading—;"), "textContent = 'Downloading...';"),
    (re.compile(r"textContent = 'Processing—;"), "textContent = 'Processing...';"),
    (re.compile(r"textContent = 'Building compressed PDF—;"), "textContent = 'Building compressed PDF...';"),
    (re.compile(r"btnApply\.textContent = 'Processing—;"), "btnApply.textContent = 'Processing...';"),
    (re.compile(r"\$\{k\}: \$\{v \|\| '—\}`"), "${k}: ${v || '—'}`"),
    (re.compile(r"5—0%"), "5-20%"),
    (re.compile(r"12—6"), "12-16"),
    (re.compile(r"0—"), "0-9"),
    (re.compile(r"2—"), "2-7"),
    (re.compile(r"'鈩\?:\s*'trade'"), "'™': 'trade'"),
    (re.compile(r"'鈧\?:\s*'euro'"), "'€': 'euro'"),
    (re.compile(r"'—:\s*'mdash'"), "'—': 'mdash'"),
    (re.compile(r"'—:\s*'ndash'"), "'–': 'ndash'"),
    (re.compile(r"'—:\s*'hellip'"), "'…': 'hellip'"),
    (re.compile(r"'→:\s*'larr'"), "'←': 'larr'"),
    (re.compile(r"'→:\s*'rarr'"), "'→': 'rarr'"),
    (re.compile(r"'→:\s*'uarr'"), "'↑': 'uarr'"),
    (re.compile(r"'→:\s*'darr'"), "'↓': 'darr'"),
    (re.compile(r"'鈾\?:\s*'spades'"), "'♠': 'spades'"),
    (re.compile(r"'鈾\?:\s*'clubs'"), "'♣': 'clubs'"),
    (re.compile(r"'鈾\?:\s*'hearts'"), "'♥': 'hearts'"),
    (re.compile(r"'鈾\?:\s*'diams'"), "'♦': 'diams'"),
    (re.compile(r"'鉁\?:\s*'#10003'"), "'✓': '#10003'"),
    (re.compile(r"'鉁\?:\s*'#10007'"), "'✗': '#10007'"),
    (re.compile(r"\['鈩\?,\s*'trade'"), "['™', 'trade'"),
    (re.compile(r"\['鈧\?,\s*'euro'"), "['€', 'euro'"),
    (re.compile(r"\['—,\s*'mdash'"), "['—', 'mdash'"),
    (re.compile(r"\['—,\s*'ndash'"), "['–', 'ndash'"),
    (re.compile(r"\['—,\s*'hellip'"), "['…', 'hellip'"),
    (re.compile(r"\['→,\s*'larr'"), "['←', 'larr'"),
    (re.compile(r"\['→,\s*'rarr'"), "['→', 'rarr'"),
    (re.compile(r"\['→,\s*'uarr'"), "['↑', 'uarr'"),
    (re.compile(r"\['→,\s*'darr'"), "['↓', 'darr'"),
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
