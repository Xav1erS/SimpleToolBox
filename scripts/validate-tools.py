#!/usr/bin/env python3
"""
validate-tools.py
Full structural and SEO validation for all tool pages.

Usage:
  python scripts/validate-tools.py            # validate all tools
  python scripts/validate-tools.py base64     # validate single tool (slug)
  python scripts/validate-tools.py --json     # output JSON report only
  python scripts/validate-tools.py --fail-fast

Exit code: 0 = all pass, 1 = any failures.
"""
import os
import re
import sys
import json
import argparse
from datetime import date

from tooling_utils import load_tools_meta as parse_tools_meta

TOOLS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'tools')
REPORTS_DIR = os.path.join(os.path.dirname(__file__), '..', 'reports')

# ── Checks ─────────────────────────────────────────────────────────────────

CHECKS = {}

# ── Load tools-meta.js (optional, used for cross-validation) ───────────────

def load_tools_meta():
    try:
        return {item["slug"]: True for item in parse_tools_meta()}
    except Exception:
        return {}

TOOLS_META_SLUGS = load_tools_meta()


def check(name, severity='error'):
    """Decorator to register a check function."""
    def decorator(fn):
        CHECKS[name] = {'fn': fn, 'severity': severity}
        return fn
    return decorator


@check('has_footer')
def c_footer(content, fname):
    if '<footer' not in content:
        return 'Missing <footer>'

@check('has_ds_seo_content')
def c_seo_content(content, fname):
    cnt = content.count('class="ds-seo-content"')
    if cnt == 0:
        return 'Missing ds-seo-content'
    if cnt > 1:
        return f'Duplicate ds-seo-content ({cnt}x)'

@check('has_ds_related_tools')
def c_related(content, fname):
    cnt = content.count('class="ds-related-tools"')
    if cnt == 0:
        return 'Missing ds-related-tools'
    if cnt > 1:
        return f'Duplicate ds-related-tools ({cnt}x)'

@check('has_ds_seo_more')
def c_seo_more(content, fname):
    if 'class="ds-seo-more"' not in content:
        return 'Missing ds-seo-more'

@check('seo_more_toggle_structure')
def c_toggle(content, fname):
    # All <summary class="ds-seo-more__toggle"> should have span children
    toggles = re.findall(
        r'<summary class="ds-seo-more__toggle">(.*?)</summary>',
        content, re.DOTALL
    )
    for t in toggles:
        if '<span>' not in t:
            return 'ds-seo-more__toggle summary missing <span> children'
    # No bare <summary > with space
    if '<summary >' in content:
        return 'Bare <summary > found (missing class)'

@check('no_old_faq_classes')
def c_old_faq(content, fname):
    issues = []
    if 'class="ds-faq-list"' in content:
        issues.append('old ds-faq-list class')
    if 'class="ds-faq-item"' in content:
        issues.append('old ds-faq-item class')
    if issues:
        return ', '.join(issues)

@check('has_title')
def c_title(content, fname):
    m = re.search(r'<title>(.+?)</title>', content, re.DOTALL)
    if not m:
        return 'Missing <title>'
    if not m.group(1).strip():
        return 'Empty <title>'

@check('has_meta_description')
def c_meta_desc(content, fname):
    if not re.search(r'<meta\s+name="description"', content):
        return 'Missing <meta name="description">'

@check('has_canonical')
def c_canonical(content, fname):
    if not re.search(r'<link\s+rel="canonical"', content):
        return 'Missing <link rel="canonical">'

@check('has_h1')
def c_h1(content, fname):
    # Strip <script> blocks first to avoid false positives from JS strings
    stripped = re.sub(r'<script[\s\S]*?</script>', '', content)
    h1s = re.findall(r'<h1[\s>]', stripped)
    if len(h1s) == 0:
        return 'Missing <h1>'
    if len(h1s) > 1:
        return f'Multiple <h1> tags ({len(h1s)}x)'

@check('has_json_ld')
def c_jsonld(content, fname):
    if 'application/ld+json' not in content:
        return 'Missing JSON-LD structured data'

@check('has_design_system_css', severity='warning')
def c_ds_css(content, fname):
    if 'design-system.css' not in content:
        return 'design-system.css not linked'

@check('seo_section_classes', severity='warning')
def c_seo_section(content, fname):
    # If has ds-seo-content, the h2 elements inside should use ds-seo-section__title
    if 'class="ds-seo-content"' in content:
        seo_block = re.search(
            r'class="ds-seo-content"(.*?)(?=<details class="ds-seo-more"|<div class="ds-related)',
            content, re.DOTALL
        )
        if seo_block:
            block = seo_block.group(1)
            bare_h2 = re.findall(r'<h2(?!\s+class=)[^>]*>', block)
            if bare_h2:
                return f'{len(bare_h2)} <h2> inside ds-seo-content lacks ds-seo-section__title'

@check('related_tools_min_count', severity='warning')
def c_related_count(content, fname):
    cards = len(re.findall(r'class="ds-related-card"', content))
    if 0 < cards < 3:
        return f'Only {cards} related tool(s), recommended ≥3'

@check('no_duplicate_seo_more', severity='error')
def c_dup_seo_more(content, fname):
    cnt = content.count('class="ds-seo-more"')
    if cnt > 1:
        return f'Duplicate ds-seo-more ({cnt}x)'

@check('seo_faq_items_class', severity='warning')
def c_faq_items(content, fname):
    # Check FAQ items use ds-seo-faq-item, not ds-faq-item
    if 'class="ds-seo-faq-item"' in content:
        return None  # Good
    # Warn only if there are FAQ-like structures
    if '<dt>' in content or 'faq' in content.lower():
        pass  # Could add more specific check here


@check('has_tools_meta', severity='warning')
def c_meta_entry(content, fname):
    """Warn if tool is not yet in tools-meta.js"""
    if not TOOLS_META_SLUGS:
        return None  # Skip if file not found
    slug = fname.replace('.html', '')
    if slug not in TOOLS_META_SLUGS:
        return f'Not in tools-meta.js — add rich metadata entry'


# ── Runner ──────────────────────────────────────────────────────────────────

def validate_file(path, fname):
    try:
        content = open(path, encoding='utf-8').read()
    except Exception as e:
        return [{'check': 'file_read', 'severity': 'error', 'message': str(e)}]

    results = []
    for check_name, check_def in CHECKS.items():
        try:
            msg = check_def['fn'](content, fname)
            if msg:
                results.append({
                    'check': check_name,
                    'severity': check_def['severity'],
                    'message': msg
                })
        except Exception as e:
            results.append({
                'check': check_name,
                'severity': 'error',
                'message': f'Check threw exception: {e}'
            })
    return results


def run_validation(slug_filter=None, fail_fast=False):
    files = sorted(f for f in os.listdir(TOOLS_DIR) if f.endswith('.html'))
    if slug_filter:
        files = [f for f in files if f == slug_filter + '.html' or f == slug_filter]
        if not files:
            print(f'ERROR: No file found for slug "{slug_filter}"')
            sys.exit(1)

    all_results = {}
    total_errors = 0
    total_warnings = 0

    for fname in files:
        path = os.path.join(TOOLS_DIR, fname)
        issues = validate_file(path, fname)
        errors = [i for i in issues if i['severity'] == 'error']
        warnings = [i for i in issues if i['severity'] == 'warning']
        all_results[fname] = {
            'errors': errors,
            'warnings': warnings,
            'pass': len(errors) == 0
        }
        total_errors += len(errors)
        total_warnings += len(warnings)
        if fail_fast and errors:
            break

    summary = {
        'date': date.today().isoformat(),
        'total_files': len(files),
        'pass': sum(1 for r in all_results.values() if r['pass']),
        'fail': sum(1 for r in all_results.values() if not r['pass']),
        'total_errors': total_errors,
        'total_warnings': total_warnings,
        'files': all_results
    }
    return summary


def print_report(summary, json_only=False):
    import sys
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    if json_only:
        print(json.dumps(summary, indent=2, ensure_ascii=False))
        return

    # Terminal report
    files = summary['files']
    print(f"\n{'='*60}")
    print(f"  SimpleToolbox — Tool Page Validation Report")
    print(f"  {summary['date']}  |  {summary['total_files']} files checked")
    print(f"{'='*60}")

    # Show failures
    failures = {f: r for f, r in files.items() if not r['pass']}
    if failures:
        print(f"\n  FAILURES ({len(failures)} files):\n")
        for fname, r in sorted(failures.items()):
            print(f"  ✗ {fname}")
            for issue in r['errors']:
                print(f"      [ERROR] {issue['check']}: {issue['message']}")
            for issue in r['warnings']:
                print(f"      [WARN]  {issue['check']}: {issue['message']}")
    else:
        print(f"\n  ✓ All {summary['total_files']} files pass error checks")

    # Show warnings for passing files
    warn_files = {f: r for f, r in files.items() if r['pass'] and r['warnings']}
    if warn_files:
        print(f"\n  WARNINGS in passing files ({len(warn_files)} files):\n")
        for fname, r in sorted(warn_files.items()):
            for issue in r['warnings']:
                print(f"  ⚠ {fname}: {issue['check']}: {issue['message']}")

    print(f"\n{'─'*60}")
    status = "PASS" if summary['fail'] == 0 else "FAIL"
    print(f"  {status}  |  {summary['pass']}/{summary['total_files']} pass  |  "
          f"{summary['total_errors']} errors  |  {summary['total_warnings']} warnings")
    print(f"{'='*60}\n")


def save_report(summary):
    os.makedirs(REPORTS_DIR, exist_ok=True)
    out = os.path.join(REPORTS_DIR, 'validation-report.json')
    with open(out, 'w', encoding='utf-8') as f:
        json.dump(summary, f, indent=2, ensure_ascii=False)
    return out


def main():
    parser = argparse.ArgumentParser(description='Validate SimpleToolbox tool pages')
    parser.add_argument('slug', nargs='?', help='Validate single tool by slug (e.g. base64)')
    parser.add_argument('--json', action='store_true', help='Output JSON only')
    parser.add_argument('--fail-fast', action='store_true', help='Stop on first failure')
    parser.add_argument('--no-report', action='store_true', help='Skip writing report file')
    args = parser.parse_args()

    summary = run_validation(slug_filter=args.slug, fail_fast=args.fail_fast)
    print_report(summary, json_only=args.json)

    if not args.no_report and not args.slug:
        path = save_report(summary)
        if not args.json:
            print(f"  Report saved → {path}\n")

    sys.exit(0 if summary['fail'] == 0 else 1)


if __name__ == '__main__':
    main()
