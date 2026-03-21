# SimpleToolBox Memory

## Current Snapshot (2026-03-21)

- Tool count: **84**
- Tool pages: all connected to metadata-driven SEO rendering
- Site pages migrated: `index`, `all-tools`, `about`, `privacy`, `terms`, `contact`
- Hub pages live: `image-tools`, `developer-tools`, `text-tools`
- Shared tool source: `public/tools-data.js`
- Shared tool metadata source: `public/tools-meta.js`
- Latest preflight: fully green

## Real Current Focus

The focus is **no longer design-system migration**.

The real focus is:

1. grow from 84 to 100
2. then to 150
3. do it without losing consistency, SEO structure, or QA coverage
4. simultaneously improve tool competitiveness so growth does not outpace usefulness

## Unified Strategy Summary

SimpleToolBox should be run as a:

**task-oriented online tool site**

The project should expand in this order:

1. Image
2. Text
3. Calculators
4. Generators / Utility
5. Developer
6. PDF

This is intentionally different from the earlier developer-heavy phase.

Reason:

- the site already has a solid developer-tool base
- broader task intent offers a better next growth step
- PDF should be approached carefully because many document workflows are not good pure-frontend candidates yet

## Tool Competitiveness Reminder

The project now has to balance three things at once:

1. growth
2. SEO / discoverability
3. actual tool quality

The key idea:

**A tool page is only strategically valuable if users can complete the task smoothly after landing.**

So future work should not only ask:

- Does this keyword matter?
- Does this page exist?

It must also ask:

- Is this tool fast to understand?
- Is it fast to start?
- Does it behave well on common inputs?
- Are errors recoverable?
- Is the result easy to take away?
- Is it competitive with obvious alternatives?

## Immediate Execution Rules

When adding a new tool:

1. create the tool page with DS skeleton
2. add the tool to `public/tools-data.js`
3. add metadata to `public/tools-meta.js`
4. render SEO sections with `scripts/render-tool-sections.py`
5. update `public/sitemap.xml`
6. run the appropriate QA commands
7. do a basic product-quality pass, not just a structural pass

## Current Architecture Facts

### Data

- `public/tools-data.js` is the single source for homepage, all-tools, and hub pages
- `public/tools-meta.js` is the single source for structured data, learn-more, FAQ, and related tools

### Page Types

- Tool page
- Hub page
- All-tools page
- Homepage

Scenario pages and workflow pages are **future expansion**, not the current default.

## What Should Not Reappear

- old migration-first framing
- old counts like 21 or 81 when the repo has moved on
- manually maintained duplicate tool lists inside hub pages
- free-form SEO block HTML on each tool page
- heavy directory-style navigation
- large-scale AI writing pages without real value

## Near-Term Expansion Goal

Use 84 → 150 to complete category skeleton, not to blindly chase 500.

Recommended near-term bias:

- more extract / convert / compress / resize / count / calculate tools
- fewer niche developer-only expansions
- only selective PDF work

Recommended near-term quality bias:

- spend more polish on high-frequency image/text/calculator tools
- ensure defaults, presets, and output flows feel effortless
- avoid shipping technically correct but awkward tools just to increase count

## Historical Note

Earlier files and older handoff notes may still mention:

- unfinished design-system migration
- 21 tools
- 81 tools
- 300+ target as the main frame

Those are now outdated.

The correct active frame is:

**84 tools, QA stable, growth-first, task-intent expansion toward 150 and then 500.**
