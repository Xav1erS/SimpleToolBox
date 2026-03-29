(function syncToolPageShell() {
  const RECENT_KEY = 'stb_recent';
  const MAX_RECENT = 6;
  const SITE_NAVIGATION_SRC = '../scripts/site-navigation.js?v=11';

  function slugFromPathname() {
    const path = window.location.pathname.replace(/\/+$/, '');
    const raw = path.split('/').pop() || '';
    return raw.replace(/\.html$/, '');
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function ensureScript(src, dataKey, callback) {
    if (dataKey === 'tools-data' && Array.isArray(window.SITE_TOOLS)) {
      callback();
      return;
    }
    if (dataKey === 'site-hierarchy' && typeof window.getBreadcrumbForPage === 'function') {
      callback();
      return;
    }
    if (dataKey === 'site-navigation' && typeof window.initSiteNavigation === 'function') {
      callback();
      return;
    }

    const existing = document.querySelector('script[data-stb-script="' + dataKey + '"]');
    if (existing) {
      existing.addEventListener('load', callback, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.dataset.stbScript = dataKey;
    script.onload = callback;
    document.head.appendChild(script);
  }

  function ensureDependencies(callback) {
    ensureScript('../tools-data.js', 'tools-data', function () {
      ensureScript('../site-hierarchy.js', 'site-hierarchy', function () {
        callback();
      });
    });
  }

  function loadSharedNavigation(callback) {
    ensureScript(SITE_NAVIGATION_SRC, 'site-navigation', callback);
  }

  function findTool(slug) {
    if (!Array.isArray(window.SITE_TOOLS)) return null;
    return window.SITE_TOOLS.find(function (item) {
      const href = String(item.href || '');
      return href.split('/').pop().replace(/\.html$/, '') === slug;
    }) || null;
  }

  function syncToolIcon(tool) {
    const iconEl = document.querySelector('.ds-tool-header__icon, .tool-title-icon');
    if (iconEl && tool && tool.icon) {
      iconEl.innerHTML = tool.icon;
    }
  }

  function replaceTopNav() {
    const oldNav = document.querySelector('.ds-tool-nav');
    if (!oldNav || oldNav.id === 'nav') return;

    oldNav.outerHTML = '' +
      '<nav class="ds-nav" id="nav">' +
        '<a href="../index.html" class="ds-nav__brand">' +
          '<div class="ds-nav__logo-icon"><img src="../logo.svg" class="logo-img" width="28" height="28" alt="Simple ToolBox" /></div>' +
          'Simple ToolBox' +
        '</a>' +
        '<div class="nav-search">' +
          '<svg class="nav-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path>' +
          '</svg>' +
          '<input type="text" id="navSearch" class="ds-input" placeholder="Search tools..." autocomplete="off" />' +
          '<kbd>Ctrl K</kbd>' +
          '<div class="nav-search-dropdown" id="navSearchDropdown"></div>' +
        '</div>' +
        '<div class="nav-actions">' +
          '<a href="../all-tools.html" class="nav-link">All Tools</a>' +
          '<a href="../contact.html" class="btn-primary ds-btn ds-btn--primary">Submit a Tool</a>' +
        '</div>' +
      '</nav>';
  }

  function ensureToolContext(tool) {
    if (!tool) return;

    const headerInner = document.querySelector('.ds-tool-header__inner, .tool-header-inner');
    const desc = headerInner && headerInner.querySelector('.ds-tool-header__desc, .tool-desc-text');
    if (!headerInner || !desc || headerInner.querySelector('.ds-tool-context')) return;

    const hub = typeof window.getHubForTool === 'function' ? window.getHubForTool(tool) : null;
    const contextMarkup = '' +
      '<div class="ds-tool-context">' +
        (hub ? '<a href="../' + escapeHtml(hub.href) + '" class="ds-tool-context__pill ds-tool-context__pill--hub">' + escapeHtml(hub.title) + '</a>' : '') +
        '<span class="ds-tool-context__pill"><span class="ds-tool-context__dot"></span>Runs locally</span>' +
        '<span class="ds-tool-context__pill">No data sent</span>' +
      '</div>';

    desc.insertAdjacentHTML('afterend', contextMarkup);
  }

  function recordRecent(href) {
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    } catch (error) {
      list = [];
    }
    list = [href, ...list.filter(function (item) { return item !== href; })].slice(0, MAX_RECENT);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(list));
    } catch (error) {
      // Ignore localStorage failures.
    }
  }

  function getRecentTools() {
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    } catch (error) {
      list = [];
    }
    return list
      .map(function (href) {
        return window.SITE_TOOLS.find(function (tool) { return tool.href === href; }) || null;
      })
      .filter(Boolean)
      .slice(0, MAX_RECENT);
  }

  function navHighlightMatch(text, query) {
    const normalizedText = String(text || '');
    const normalizedQuery = String(query || '');
    const index = normalizedText.toLowerCase().indexOf(normalizedQuery.toLowerCase());
    if (index === -1) return normalizedText;
    return normalizedText.slice(0, index) +
      '<mark>' + normalizedText.slice(index, index + normalizedQuery.length) + '</mark>' +
      normalizedText.slice(index + normalizedQuery.length);
  }

  function renderSearchGroup(label, tools, query) {
    if (!tools.length) return '';
    return '<div class="search-dropdown-group">' +
      '<div class="search-dropdown-label">' + escapeHtml(label) + '</div>' +
      tools.map(function (tool, index) {
        return '<a href="' + escapeHtml(tool.href) + '" class="search-suggestion" data-idx="' + index + '">' +
          '<span class="suggestion-icon">' + escapeHtml(tool.icon) + '</span>' +
          '<div class="suggestion-text">' +
            '<div class="suggestion-name">' + (query ? navHighlightMatch(tool.name, query) : escapeHtml(tool.name)) + '</div>' +
            '<div class="suggestion-desc">' + (query ? escapeHtml(tool.desc) : ('Open ' + escapeHtml(tool.name.toLowerCase()) + ' instantly')) + '</div>' +
          '</div>' +
          '<span class="suggestion-tag">' + escapeHtml(tool.tag) + '</span>' +
        '</a>';
      }).join('') +
    '</div>';
  }

  function buildToolSearchDropdown(dropdownEl, query, tool) {
    const normalizedQuery = String(query || '').trim().toLowerCase();
    if (!normalizedQuery) {
      const recentTools = getRecentTools();
      const hub = typeof window.getHubForTool === 'function' ? window.getHubForTool(tool) : null;
      const hubTools = hub && typeof window.getToolsForHub === 'function'
        ? window.getToolsForHub(hub.key)
          .filter(function (item) { return item.href !== tool.href; })
          .filter(function (item) {
            return !recentTools.some(function (recent) { return recent.href === item.href; });
          })
          .slice(0, 6)
        : [];

      dropdownEl.innerHTML =
        renderSearchGroup('Recently Used', recentTools, '') +
        renderSearchGroup(hub ? hub.title : 'Related Tools', hubTools, '');

      if (!dropdownEl.innerHTML) {
        dropdownEl.classList.remove('open');
        return;
      }

      dropdownEl.classList.add('open');
      return;
    }

    const results = typeof window.searchTools === 'function'
      ? window.searchTools(window.SITE_TOOLS, normalizedQuery, 6)
      : [];

    dropdownEl.innerHTML = results.length
      ? results.map(function (item, index) {
          return '<a href="' + escapeHtml(item.href) + '" class="search-suggestion" data-idx="' + index + '">' +
            '<span class="suggestion-icon">' + escapeHtml(item.icon) + '</span>' +
            '<div class="suggestion-text">' +
              '<div class="suggestion-name">' + navHighlightMatch(item.name, normalizedQuery) + '</div>' +
              '<div class="suggestion-desc">' + escapeHtml(item.desc) + '</div>' +
            '</div>' +
            '<span class="suggestion-tag">' + escapeHtml(item.tag) + '</span>' +
          '</a>';
        }).join('')
      : '<div class="search-no-result">No tools found</div>';
    dropdownEl.classList.add('open');
  }

  function bindToolSearch(tool) {
    const navSearchInput = document.getElementById('navSearch');
    const navDropdown = document.getElementById('navSearchDropdown');
    if (!navSearchInput || !navDropdown || !tool) return;

    navSearchInput.addEventListener('input', function (event) {
      buildToolSearchDropdown(navDropdown, event.target.value, tool);
    });

    navSearchInput.addEventListener('focus', function () {
      buildToolSearchDropdown(navDropdown, navSearchInput.value, tool);
    });

    navSearchInput.addEventListener('keydown', function (event) {
      const items = navDropdown.querySelectorAll('.search-suggestion');
      let index = Array.from(items).findIndex(function (item) { return item.classList.contains('focused'); });

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (items[index]) items[index].classList.remove('focused');
        index = Math.min(index + 1, items.length - 1);
        if (items[index]) {
          items[index].classList.add('focused');
          items[index].scrollIntoView({ block: 'nearest' });
        }
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (items[index]) items[index].classList.remove('focused');
        index = Math.max(index - 1, 0);
        if (items[index]) {
          items[index].classList.add('focused');
          items[index].scrollIntoView({ block: 'nearest' });
        }
        return;
      }

      if (event.key === 'Enter') {
        const focused = navDropdown.querySelector('.search-suggestion.focused');
        if (focused) {
          event.preventDefault();
          focused.click();
        }
        return;
      }

      if (event.key === 'Escape') {
        navDropdown.classList.remove('open');
      }
    });

    document.addEventListener('click', function (event) {
      if (!event.target.closest('.nav-search')) {
        navDropdown.classList.remove('open');
      }
    });

    navDropdown.addEventListener('click', function (event) {
      const link = event.target.closest('.search-suggestion');
      if (link) recordRecent(link.getAttribute('href'));
    });

    document.addEventListener('keydown', function (event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        navSearchInput.focus();
      }
    });

    window.addEventListener('scroll', function () {
      const nav = document.getElementById('nav');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  function enhanceToolPage() {
    const slug = slugFromPathname();
    if (!slug) return;

    const tool = findTool(slug);
    if (!tool) return;

    window.STB_PAGE_CONTEXT = { pageType: 'tool', slug: slug };

    replaceTopNav();
    syncToolIcon(tool);
    ensureToolContext(tool);

    loadSharedNavigation(function () {
      if (typeof window.initSiteNavigation === 'function') {
        window.initSiteNavigation();
      }
    });
  }

  ensureDependencies(enhanceToolPage);
})();
