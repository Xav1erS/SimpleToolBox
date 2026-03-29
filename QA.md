# SimpleToolbox QA & Maintenance Guide

## Overview

This document defines the quality assurance workflow for SimpleToolbox.
All scripts require only Python 3 and Node.js (Playwright). No build tools needed.

---

## Directory Structure

```
scripts/
  validate-tools.py     # Static HTML structure validation (Python)
  check-tools-meta.py   # Metadata schema / cross-file validation
  page-audit.py         # Tool page audit over local HTTP server
  generate-report.py    # Preflight summary report
  gen-sitemap.js        # Sitemap generator (Node)

tests/
  smoke/                # Core functionality tests (Playwright)
    base64.test.js
    json-formatter.test.js
    password-generator.test.js
    url-encode.test.js
    hash-generator.test.js
    word-counter.test.js
    uuid-generator.test.js
    timestamp.test.js
    markdown-preview.test.js
    color-picker.test.js
  visual/
    snapshot.test.js    # Visual regression screenshots (Playwright)
    snapshots/          # Baseline PNG files (committed to git)
  utils/
    helpers.js          # Shared test utilities

reports/
  validation-report.json   # Latest validate-tools.py output
  tools-meta-report.json   # Latest metadata validation output
  page-audit-report.json   # Latest page audit output
  preflight-report.json    # Combined preflight machine-readable report
  preflight-report.md      # Combined preflight human-readable report
  playwright-report.json   # Latest Playwright test output

public/
  tools-meta.js         # Rich metadata for each tool (FAQ, useCases, example)
```

---

## Running Checks

### 1. Static Validation (fast, no browser)

```bash
python scripts/validate-tools.py
```

Checks all tool pages for:
- Structural completeness (footer, ds-seo-content, ds-related-tools, ds-seo-more)
- SEO elements (title, meta description, canonical, h1, JSON-LD)
- Design system compliance (design-system.css linked, ds-seo-section__title on h2)
- Duplicate block detection
- tools-meta.js coverage (warning if tool lacks rich metadata entry)

**Options:**
```bash
python scripts/validate-tools.py base64          # single tool
python scripts/validate-tools.py --json          # JSON output only
python scripts/validate-tools.py --fail-fast     # stop on first error
python scripts/validate-tools.py --no-report     # skip writing report file
```

Exit code: `0` = all pass, `1` = any errors.

---

### 2. Smoke Tests (requires Playwright)

```bash
# Run all smoke tests (Desktop Chrome only, fastest)
npx playwright test tests/smoke/ --project="Desktop Chrome"

# Run a single tool
npx playwright test tests/smoke/base64.test.js --project="Desktop Chrome"

# Run with visible browser for debugging
npx playwright test tests/smoke/ --headed
```

Covers: Base64, JSON Formatter, Password Generator, URL Encode, Hash Generator,
Word Counter, UUID Generator, Timestamp, Markdown Preview, Color Picker.

---

### 3. Visual Regression (requires Playwright)

```bash
# Build / update baseline screenshots
npx playwright test tests/visual/snapshot.test.js --update-snapshots --project="Desktop Chrome"

# Compare against baseline
npx playwright test tests/visual/snapshot.test.js --project="Desktop Chrome"
```

Captures desktop (1280×900) and mobile (390×844) screenshots for 15 key pages.
Baseline PNGs are stored in `tests/visual/snapshots/` and committed to git.
Diffs appear in `test-results/` when a test fails.

---

### 4. Metadata Validation

```bash
python scripts/check-tools-meta.py
```

Checks:
- `tools-meta.js` slug uniqueness
- required metadata fields
- category validity
- related tool references
- FAQ minimum count
- useCases / example structure
- tools-meta.js and tools-data.js cross-file consistency

Writes `reports/tools-meta-report.json`.

---

### 5. Page Audit

```bash
python scripts/page-audit.py
```

Checks each tool page over a local Python HTTP server for:
- page opens successfully
- title / H1 / meta description / canonical exist
- Learn More exists
- Related Tools exists
- FAQ block exists when metadata includes FAQ

Writes `reports/page-audit-report.json`.

Notes:
- console / hydration checks are currently reported as skipped in the Python audit
- if browser tooling is available later, extend this script or add a Playwright audit tier

---

### 6. Product Quality Check

In addition to structural QA, every new tool should pass a lightweight product-quality review.

This is not fully automated yet, but it is now part of the release checklist.

Template:

- `NEW_TOOL_ACCEPTANCE_TEMPLATE.md`

Check:

- purpose is understandable within one glance
- first action is obvious (paste / type / upload)
- output updates immediately after key option changes
- empty / invalid input states are recoverable and human-readable
- copy / download / reset flow is frictionless
- at least one realistic sample, preset, or helpful default is present when appropriate
- mobile layout remains practical for the core task
- related tools represent a natural next step

Use this especially for:

- new image tools
- new text tools
- new calculators
- homepage / hub promoted tools

---

### 7. Preflight Report

```bash
python scripts/generate-report.py
```

Runs:
- `validate-tools.py`
- `check-tools-meta.py`
- `page-audit.py`
- smoke tests when `npx` is available
- visual regression when `npx` is available

Outputs:
- `reports/preflight-report.json`
- `reports/preflight-report.md`

This is the recommended release gate entry point.

Before the report runs, it now automatically refreshes cache-busting hashes for shared CSS / JS references.

### 8. Git Hooks

Install the tracked repository hooks once per clone:

```bash
python scripts/install-git-hooks.py
```

After installation, every `git commit` will:

- block accidental `node_modules/` commits
- block oversized staged files
- run `python scripts/revision-assets.py`
- restage updated HTML asset references automatically

### 9. Deploy Preparation

Use this as the deployment entry command:

```bash
npm run deploy:prepare
```

It runs the full preflight pipeline through:

```bash
python scripts/generate-report.py
```

---

## Change Risk Tiers

Use the tier matrix below to decide which checks to run after a change.

| Change Type | Examples | Required Checks |
|---|---|---|
| **Low risk** | Single tool logic fix, single tool copy edit, single tool FAQ update | Validate that tool only: `python scripts/validate-tools.py <slug>` + its smoke test + quick product-quality pass |
| **Medium risk** | Shared SEO component edit, ds-seo-more structure change, tools-data.js update, new tool page | Full static validation + metadata validation + page audit + all smoke tests + visual compare for affected pages + product-quality pass for changed tools |
| **High risk** | design-system.css change, global layout change, theme/token change, sitemap script change | Full static validation + metadata validation + page audit + all smoke tests + full visual regression + preflight report + spot-check product quality on key tools |

### Low Risk (single tool)
```bash
python scripts/validate-tools.py <slug>
npx playwright test tests/smoke/<slug>.test.js --project="Desktop Chrome"
```

### Medium Risk
```bash
python scripts/validate-tools.py
python scripts/check-tools-meta.py
python scripts/page-audit.py
npx playwright test tests/smoke/ --project="Desktop Chrome"
npx playwright test tests/visual/snapshot.test.js --project="Desktop Chrome"
```

### High Risk (global change)
```bash
python scripts/validate-tools.py
python scripts/check-tools-meta.py
python scripts/page-audit.py
npx playwright test tests/smoke/ tests/visual/snapshot.test.js --project="Desktop Chrome"
python scripts/generate-report.py
# Review reports/*.json and reports/preflight-report.md
```

---

## Adding a New Tool

1. Create `public/tools/<slug>.html` following CLAUDE.md Migration Checklist.
2. Add entry to `public/tools-data.js`.
3. Add entry to `public/tools-meta.js` (slug, title, description, category, relatedTools, faq, useCases, example).
4. Update `HUB_PAGE_CONFIG` in `public/tools-data.js` if the tool belongs in a hub page grouping.
5. Update `public/sitemap.xml` (or regenerate it via the sitemap script when used).
6. Run `python scripts/render-tool-sections.py <slug>` to inject structured data and SEO blocks.
7. Run `python scripts/validate-tools.py <slug>` — must pass with 0 errors.
8. Run `python scripts/check-tools-meta.py`.
9. Do a quick product-quality pass using the checklist above.
   - Recommended: fill `NEW_TOOL_ACCEPTANCE_TEMPLATE.md`
10. Write a smoke test in `tests/smoke/<slug>.test.js` when the tool becomes important enough for automated coverage.
11. Update visual baselines only when the page is added to the visual snapshot set.

---

## Updating Visual Baselines

After an intentional visual change (new layout, new DS component, theme update):

```bash
npx playwright test tests/visual/snapshot.test.js --update-snapshots --project="Desktop Chrome"
git add tests/visual/snapshots/
git commit -m "chore: update visual baselines after <change>"
```

**Important:** Only update baselines after a deliberate, reviewed visual change — not to silence a failing test.

---

## tools-meta.js Coverage

`tools-meta.js` contains rich metadata for tools. Run validation to see which tools are missing entries:

```bash
python scripts/validate-tools.py --json | python -c "
import sys, json
r = json.load(sys.stdin)
missing = [f for f, v in r['files'].items()
           if any(i['check'] == 'has_tools_meta' for i in v['warnings'])]
print(f'Missing tools-meta.js entries: {len(missing)}')
for f in sorted(missing): print(' ', f)
"
```

`tools-meta.js` is now expected to cover all tools.
Any missing entry should be treated as a regression.

---

## Report Files

| File | Updated by | Contents |
|---|---|---|
| `reports/validation-report.json` | `validate-tools.py` | Per-file error/warning list + summary |
| `reports/playwright-report.json` | Playwright test run | Per-test pass/fail + timing |

Both files are in `.gitignore` by default (runtime artifacts). Commit them only for formal release audits.
