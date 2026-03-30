#!/usr/bin/env python3
"""
migrate-shell-wave1.py
Apply shared shell migration to 9 gold-standard pages.

Changes per page:
  1. <body> → <body class="ds-page">
  2. Add noscript banner if missing
  3. Replace old <nav class="ds-tool-nav">…</nav> with shared ds-nav
  4. Insert ds-tool-context block after header desc </p>
  5. Inject site-hierarchy.js + STB_PAGE_CONTEXT + site-navigation.js before tool-page-icon.js
"""
import re
from pathlib import Path

TOOLS_DIR = Path(__file__).parent.parent / 'public' / 'tools'

NEW_NAV = """\
<!-- TOOL SHELL: NAV -->
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

NOSCRIPT = '<noscript><div class="tool-noscript">This tool requires JavaScript to run.</div></noscript>'

# slug → (hub_href, hub_label)
TOOLS = {
    'aes':                ('developer-tools.html', 'Developer Tools'),
    'color-palette':      ('design-tools.html',    'Design Tools'),
    'contrast-checker':   ('design-tools.html',    'Design Tools'),
    'countdown':          ('converter-tools.html', 'Converter Tools'),
    'gradient-generator': ('design-tools.html',    'Design Tools'),
    'html-formatter':     ('developer-tools.html', 'Developer Tools'),
    'roman-numerals':     ('converter-tools.html', 'Converter Tools'),
    'url-builder':        ('developer-tools.html', 'Developer Tools'),
    'url-encode':         ('developer-tools.html', 'Developer Tools'),
}


def make_context_block(hub_href, hub_name):
    return (
        '    <div class="ds-tool-context">\n'
        f'      <a href="../{hub_href}" class="ds-tool-context__pill ds-tool-context__pill--hub">{hub_name}</a>\n'
        '      <span class="ds-tool-context__pill"><span class="ds-tool-context__dot"></span>Runs locally</span>\n'
        '      <span class="ds-tool-context__pill">No data sent</span>\n'
        '    </div>'
    )


def make_shell_scripts(slug):
    return (
        '  <script src="../site-hierarchy.js?v=c4faab8f17"></script>\n'
        '<script>\n'
        '  window.STB_PAGE_CONTEXT = {\n'
        f"    pageType: 'tool',\n"
        f"    slug: '{slug}'\n"
        '  };\n'
        '</script>\n'
        '<script src="../scripts/site-navigation.js?v=98ea6fea52"></script>\n'
    )


def migrate(slug, hub_href, hub_name):
    path = TOOLS_DIR / f'{slug}.html'
    content = path.read_text(encoding='utf-8')

    # 1. <body> → <body class="ds-page">
    content = re.sub(r'<body>', '<body class="ds-page">', content, count=1)

    # 2. Add noscript right after opening body tag (if missing)
    if NOSCRIPT not in content:
        content = re.sub(
            r'(<body[^>]*>)\n',
            r'\1\n' + NOSCRIPT + '\n',
            content,
            count=1
        )

    # 3. Replace old nav block
    content = re.sub(
        r'<nav class="ds-tool-nav">.*?</nav>',
        NEW_NAV,
        content,
        count=1,
        flags=re.DOTALL
    )

    # 4. Insert ds-tool-context after header desc closing </p> (if missing)
    if 'ds-tool-context' not in content:
        ctx = make_context_block(hub_href, hub_name)
        content = re.sub(
            r'(class="[^"]*ds-tool-header__desc[^"]*"[^>]*>.*?</p>)',
            lambda m: m.group(0) + '\n' + ctx,
            content,
            count=1,
            flags=re.DOTALL
        )

    # 5. Inject shared scripts before tool-page-icon.js
    shell = make_shell_scripts(slug)
    content = re.sub(
        r'(<script src="\.\./tool-page-icon\.js[^"]*"></script>)',
        shell + r'\1',
        content,
        count=1
    )

    path.write_text(content, encoding='utf-8')
    print(f'  migrated: {slug}')


if __name__ == '__main__':
    print('Wave 1 shell migration — 9 pages')
    for slug, (hub_href, hub_name) in TOOLS.items():
        migrate(slug, hub_href, hub_name)
    print('Done.')
