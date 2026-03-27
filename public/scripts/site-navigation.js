(function (global) {
  const DIR_COLLAPSE_KEY = 'stb_directory_collapsed';
  const RECENT_KEY = 'stb_recent';
  const MAX_RECENT = 6;

  function normalizePath(value) {
    const path = String(value || '').split('#')[0].split('?')[0];
    return path.replace(/^\/+/, '').replace(/^\.\//, '');
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function currentPagePath() {
    return normalizePath(global.location.pathname.split('/').pop() || 'index.html');
  }

  function isExternalHref(value) {
    return /^(?:[a-z]+:)?\/\//i.test(value) || /^(mailto|tel):/i.test(value);
  }

  function hrefForContext(context, href) {
    const raw = String(href || '');
    if (!raw || raw.startsWith('#') || isExternalHref(raw)) return raw;

    const clean = raw.replace(/^\.\//, '');
    if (context && context.pageType === 'tool') {
      return clean.startsWith('../') ? clean : ('../' + clean);
    }
    return clean;
  }

  function highlightMatch(value, query) {
    const text = String(value || '');
    const needle = String(query || '').trim();
    if (!needle) return escapeHtml(text);

    const lowerText = text.toLowerCase();
    const lowerNeedle = needle.toLowerCase();
    const index = lowerText.indexOf(lowerNeedle);
    if (index === -1) return escapeHtml(text);

    return escapeHtml(text.slice(0, index)) +
      '<mark>' + escapeHtml(text.slice(index, index + needle.length)) + '</mark>' +
      escapeHtml(text.slice(index + needle.length));
  }

  function getPageContext() {
    const base = global.STB_PAGE_CONTEXT || {};
    return {
      pageType: base.pageType,
      slug: base.slug,
      currentUrl: currentPagePath()
    };
  }

  function hasDirectory(context) {
    return ['all-tools', 'hub', 'guide', 'tool'].includes(context.pageType);
  }

  function renderBreadcrumbMarkup(items) {
    return '<nav class="ds-breadcrumb" aria-label="Breadcrumb">' +
      items.map(function (item, index) {
        const isCurrent = !!item.current;
        const content = item.href && !isCurrent
          ? '<a href="' + escapeHtml(item.href) + '">' + escapeHtml(item.label) + '</a>'
          : '<span aria-current="' + (isCurrent ? 'page' : 'false') + '">' + escapeHtml(item.label) + '</span>';
        const separator = index < items.length - 1 ? '<span class="ds-breadcrumb__sep">&rsaquo;</span>' : '';
        return '<span class="ds-breadcrumb__item">' + content + '</span>' + separator;
      }).join('') +
      '</nav>';
  }

  function ensureBreadcrumb(context) {
    const items = (global.getBreadcrumbForPage ? global.getBreadcrumbForPage(context) : []).map(function (item) {
      return Object.assign({}, item, { href: hrefForContext(context, item.href) });
    });
    if (!items.length) return;

    const toggle = hasDirectory(context)
      ? '<button type="button" class="ds-directory-toggle" data-directory-toggle aria-expanded="false" aria-controls="stb-directory-drawer">Menu</button>'
      : '';
    const rowClass = context.pageType === 'tool' ? 'ds-breadcrumb-row ds-tool-breadcrumb' : 'ds-breadcrumb-row';
    const markup = '<div class="' + rowClass + '">' + toggle + renderBreadcrumbMarkup(items) + '</div>';

    if (context.pageType === 'all-tools') {
      const pageHeader = document.querySelector('.page-header');
      if (pageHeader) {
        const existing = pageHeader.querySelector('.ds-breadcrumb-row');
        if (existing) existing.remove();
        pageHeader.insertAdjacentHTML('afterbegin', markup);
      }
      return;
    }

    if (context.pageType === 'hub') {
      const target = document.querySelector('.hub-breadcrumb');
      if (target) {
        target.outerHTML = markup;
        return;
      }
    }

    if (context.pageType === 'guide') {
      const target = document.querySelector('.guide-breadcrumb');
      if (target) {
        target.outerHTML = markup;
        return;
      }
    }

    if (context.pageType === 'tool') {
      const headerInner = document.querySelector('.ds-tool-header__inner, .tool-header-inner');
      if (headerInner) {
        const existing = headerInner.querySelector('.ds-breadcrumb-row');
        if (existing) existing.remove();
        headerInner.insertAdjacentHTML('afterbegin', markup);
      }
    }
  }

  function getRecentItems(currentUrl) {
    if (!Array.isArray(global.SITE_TOOLS)) return [];
    let recent = [];
    try {
      recent = JSON.parse(global.localStorage.getItem(RECENT_KEY) || '[]');
    } catch (error) {
      recent = [];
    }

    return recent
      .map(function (href) {
        return global.SITE_TOOLS.find(function (tool) { return tool.href === href; }) || null;
      })
      .filter(Boolean)
      .slice(0, MAX_RECENT)
      .map(function (tool) {
        return {
          type: 'link',
          href: tool.href,
          label: tool.name,
          icon: tool.icon,
          meta: tool.tag,
          active: normalizePath(tool.href) === normalizePath(currentUrl)
        };
      });
  }

  function getRecentTools(limit) {
    if (!Array.isArray(global.SITE_TOOLS)) return [];

    let recent = [];
    try {
      recent = JSON.parse(global.localStorage.getItem(RECENT_KEY) || '[]');
    } catch (error) {
      recent = [];
    }

    const maxItems = typeof limit === 'number' ? limit : MAX_RECENT;
    return recent
      .map(function (href) {
        return global.SITE_TOOLS.find(function (tool) { return tool.href === href; }) || null;
      })
      .filter(Boolean)
      .slice(0, maxItems);
  }

  function getDirectoryHeaderMeta(context) {
    if (context.pageType === 'all-tools') {
      return {
        eyebrow: 'Directory',
        title: 'All Tools',
        caption: 'Browse hubs, popular tools, and quick guides.'
      };
    }

    if (context.pageType === 'hub') {
      const hub = global.getHubByKey && global.getHubByKey(context.slug);
      return {
        eyebrow: 'Hub',
        title: hub ? hub.title : 'Hub',
        caption: 'Tools, guides, and nearby categories.'
      };
    }

    if (context.pageType === 'guide') {
      const guide = global.getGuideMeta && global.getGuideMeta(context.slug);
      const hub = guide && global.getHubByKey && global.getHubByKey(guide.hub);
      return {
        eyebrow: 'Guide',
        title: guide ? guide.title : 'Guide',
        caption: hub ? ('Inside ' + hub.title) : 'Sections, related guides, and hub tools.'
      };
    }

    if (context.pageType === 'tool') {
      const tool = global.getToolBySlug && global.getToolBySlug(context.slug);
      return {
        eyebrow: 'Tool',
        title: tool ? tool.name : 'Tool',
        caption: 'Hub path, related guides, and recent tools.'
      };
    }

    return {
      eyebrow: 'Browse',
      title: 'Navigation',
      caption: 'Move through the current workspace.'
    };
  }

  function buildGuideTocItems() {
    return Array.from(document.querySelectorAll('.guide-panel[id]')).map(function (panel, index) {
      const heading = panel.querySelector('h2, h3, h1');
      const label = heading ? heading.textContent.trim() : ('Section ' + (index + 1));
      const href = '#' + panel.id;
      return {
        type: 'link',
        kind: 'toc',
        href: href,
        label: label,
        icon: String(index + 1).padStart(2, '0'),
        active: global.location.hash === href
      };
    });
  }

  function renderDirectoryItems(items, context) {
    if (!items || !items.length) {
      return '<div class="ds-directory-empty">No entries yet</div>';
    }

    return '<div class="ds-directory-list">' + items.map(function (item) {
      const extraClass = item.kind === 'toc' ? ' ds-directory-link--toc' : '';
      const targetAttr = item.kind === 'toc' ? ' data-directory-target="' + escapeHtml(String(item.href || '').replace(/^#/, '')) + '"' : '';
      const resolvedHref = hrefForContext(context, item.href || '#');

      return '<a class="ds-directory-link' + extraClass + (item.active ? ' is-active' : '') + '" href="' + escapeHtml(resolvedHref) + '"' + targetAttr + '>' +
        '<span class="ds-directory-link__main">' +
          (item.icon ? '<span class="ds-directory-link__icon">' + escapeHtml(item.icon) + '</span>' : '') +
          '<span class="ds-directory-link__label">' + escapeHtml(item.label) + '</span>' +
        '</span>' +
        (item.meta ? '<span class="ds-directory-link__meta">' + escapeHtml(item.meta) + '</span>' : '') +
      '</a>';
    }).join('') + '</div>';
  }

  function getDirectoryGroups(context) {
    const groups = global.getDirectoryEntriesForPage ? global.getDirectoryEntriesForPage(context) : [];

    if (context.pageType === 'all-tools' || context.pageType === 'tool') {
      return groups.map(function (group) {
        if (group.title === 'Recently Used') {
          return Object.assign({}, group, { items: getRecentItems(context.currentUrl) });
        }
        return group;
      });
    }

    if (context.pageType === 'guide') {
      return groups.map(function (group) {
        if (group.title === 'On This Page') {
          return Object.assign({}, group, { items: buildGuideTocItems() });
        }
        return group;
      });
    }

    return groups;
  }

  function renderDirectoryMarkup(context) {
    const groups = getDirectoryGroups(context).filter(function (group) {
      return Array.isArray(group.items) ? group.items.length > 0 : !!group.items;
    });
    const headerMeta = getDirectoryHeaderMeta(context);

    const body = '<div class="ds-directory-rail__body">' + groups.map(function (group) {
      return '<section class="ds-directory-group">' +
        '<h2 class="ds-directory-group__title">' + escapeHtml(group.title) + '</h2>' +
        renderDirectoryItems(group.items, context) +
      '</section>';
    }).join('') + '</div>';

    return (
      '<aside class="ds-directory-rail" aria-label="Page directory">' +
        '<div class="ds-directory-rail__inner">' +
          '<div class="ds-directory-rail__head">' +
            '<div class="ds-directory-headline">' +
              '<div class="ds-directory-headline__eyebrow">' + escapeHtml(headerMeta.eyebrow) + '</div>' +
              '<div class="ds-directory-headline__copy">' +
                '<strong class="ds-directory-headline__title">' + escapeHtml(headerMeta.title) + '</strong>' +
                '<span class="ds-directory-headline__caption">' + escapeHtml(headerMeta.caption) + '</span>' +
              '</div>' +
            '</div>' +
            '<button type="button" class="ds-directory-collapse" data-directory-collapse aria-pressed="false">' +
              '<span class="ds-directory-collapse__icon">&larr;</span>' +
              '<span class="ds-directory-collapse__label">Collapse</span>' +
            '</button>' +
          '</div>' +
          body +
        '</div>' +
      '</aside>' +
      '<div class="ds-directory-backdrop" data-directory-backdrop hidden></div>' +
      '<aside class="ds-directory-drawer" id="stb-directory-drawer" aria-label="Page directory">' +
        '<div class="ds-directory-drawer__head">' +
          '<div class="ds-directory-headline">' +
            '<div class="ds-directory-headline__eyebrow">' + escapeHtml(headerMeta.eyebrow) + '</div>' +
            '<div class="ds-directory-headline__copy">' +
              '<strong class="ds-directory-headline__title">' + escapeHtml(headerMeta.title) + '</strong>' +
              '<span class="ds-directory-headline__caption">' + escapeHtml(headerMeta.caption) + '</span>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="ds-directory-drawer__close" data-directory-close>Close</button>' +
        '</div>' +
        body +
      '</aside>'
    );
  }

  function insertDirectory(context) {
    if (!hasDirectory(context)) return;

    const nav = document.getElementById('nav') || document.querySelector('.ds-nav');
    if (!nav || document.querySelector('.ds-directory-host')) return;

    const host = document.createElement('div');
    host.className = 'ds-directory-host';
    host.innerHTML = renderDirectoryMarkup(context);
    nav.insertAdjacentElement('afterend', host);

    document.body.classList.add('ds-has-directory', 'ds-directory-page--' + context.pageType);
    if (context.pageType === 'guide') {
      document.body.classList.add('ds-guide-rail-active');
    }
  }

  function ensureShell(context) {
    if (!hasDirectory(context)) return;

    const host = document.querySelector('.ds-directory-host');
    if (!host || host.querySelector('.ds-shell')) return;

    const rail = host.querySelector('.ds-directory-rail');
    const backdrop = host.querySelector('.ds-directory-backdrop');
    const drawer = host.querySelector('.ds-directory-drawer');
    const shell = document.createElement('div');
    const railSlot = document.createElement('div');
    const content = document.createElement('div');
    const nodesToMove = [];

    shell.className = 'ds-shell';
    railSlot.className = 'ds-shell__rail-slot';
    content.className = 'ds-shell__content';

    if (rail) {
      railSlot.appendChild(rail);
    }

    let currentNode = host.nextSibling;
    while (currentNode) {
      const nextNode = currentNode.nextSibling;
      if (currentNode.nodeType === 1 && currentNode.tagName === 'SCRIPT') break;
      if (
        currentNode.nodeType === 1 &&
        !currentNode.classList.contains('ds-directory-host') &&
        !currentNode.classList.contains('ds-directory-backdrop') &&
        !currentNode.classList.contains('ds-directory-drawer')
      ) {
        nodesToMove.push(currentNode);
      }
      currentNode = nextNode;
    }

    nodesToMove.forEach(function (node) {
      content.appendChild(node);
    });

    shell.appendChild(railSlot);
    shell.appendChild(content);

    if (backdrop) {
      host.insertBefore(shell, backdrop);
    } else if (drawer) {
      host.insertBefore(shell, drawer);
    } else {
      host.appendChild(shell);
    }
  }

  function applyCollapsedState() {
    let collapsed = false;
    try {
      collapsed = global.localStorage.getItem(DIR_COLLAPSE_KEY) === '1';
    } catch (error) {
      collapsed = false;
    }

    document.body.classList.toggle('ds-directory-is-collapsed', collapsed);

    const collapseBtn = document.querySelector('[data-directory-collapse]');
    if (collapseBtn) {
      collapseBtn.setAttribute('aria-pressed', collapsed ? 'true' : 'false');
      const label = collapseBtn.querySelector('.ds-directory-collapse__label');
      const icon = collapseBtn.querySelector('.ds-directory-collapse__icon');
      if (label) label.textContent = collapsed ? 'Expand' : 'Collapse';
      if (icon) icon.innerHTML = collapsed ? '&rarr;' : '&larr;';
    }
  }

  function syncShellMetrics() {
    const shell = document.querySelector('.ds-shell');
    const nav = document.getElementById('nav') || document.querySelector('.ds-nav');
    if (!shell || !nav) return;

    const shellRect = shell.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const left = Math.max(Math.round(shellRect.left), 16);
    const top = Math.max(Math.round(navRect.bottom + 18), 16);

    document.body.style.setProperty('--stb-shell-left', left + 'px');
    document.body.style.setProperty('--stb-directory-top', top + 'px');
  }

  function scheduleShellSync() {
    if (typeof global.requestAnimationFrame === 'function') {
      global.requestAnimationFrame(syncShellMetrics);
      return;
    }
    syncShellMetrics();
  }

  function bindShellMetrics() {
    if (document.body.dataset.stbShellMetricsBound === '1') return;
    document.body.dataset.stbShellMetricsBound = '1';

    global.addEventListener('resize', scheduleShellSync);
    global.addEventListener('load', scheduleShellSync);
  }

  function closeDrawer() {
    document.body.classList.remove('ds-directory-drawer-open');
    document.querySelectorAll('[data-directory-toggle]').forEach(function (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    });
    const backdrop = document.querySelector('[data-directory-backdrop]');
    if (backdrop) backdrop.hidden = true;
    scheduleShellSync();
  }

  function bindDirectoryActions() {
    document.querySelectorAll('[data-directory-toggle]').forEach(function (button) {
      button.addEventListener('click', function () {
        document.body.classList.add('ds-directory-drawer-open');
        button.setAttribute('aria-expanded', 'true');
        const backdrop = document.querySelector('[data-directory-backdrop]');
        if (backdrop) backdrop.hidden = false;
        scheduleShellSync();
      });
    });

    document.querySelectorAll('[data-directory-close], [data-directory-backdrop]').forEach(function (button) {
      button.addEventListener('click', closeDrawer);
    });

    const collapseBtn = document.querySelector('[data-directory-collapse]');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', function () {
        const nextState = !document.body.classList.contains('ds-directory-is-collapsed');
        document.body.classList.toggle('ds-directory-is-collapsed', nextState);
        try {
          global.localStorage.setItem(DIR_COLLAPSE_KEY, nextState ? '1' : '0');
        } catch (error) {
          // Ignore localStorage failures.
        }
        applyCollapsedState();
        scheduleShellSync();
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeDrawer();
      }
    });
  }

  function renderToolSearchGroup(label, tools, query, context) {
    if (!tools.length) return '';

    return '<div class="search-dropdown-group">' +
      '<div class="search-dropdown-label">' + escapeHtml(label) + '</div>' +
      tools.map(function (tool, index) {
        return '<a href="' + escapeHtml(hrefForContext(context, tool.href)) + '" class="search-suggestion" data-idx="' + index + '">' +
          '<span class="suggestion-icon">' + escapeHtml(tool.icon || '*') + '</span>' +
          '<span class="suggestion-text">' +
            '<span class="suggestion-name">' + highlightMatch(tool.name, query) + '</span>' +
            '<span class="suggestion-desc">' + escapeHtml(tool.desc || '') + '</span>' +
          '</span>' +
          '<span class="suggestion-tag">' + escapeHtml(tool.tag || 'tool') + '</span>' +
        '</a>';
      }).join('') +
    '</div>';
  }

  function uniqueTools(tools) {
    const seen = new Set();
    return tools.filter(function (tool) {
      if (!tool || !tool.href) return false;
      const slug = global.slugFromHref ? global.slugFromHref(tool.href) : normalizePath(tool.href);
      if (seen.has(slug)) return false;
      seen.add(slug);
      return true;
    });
  }

  function buildToolSearchMarkup(context, query) {
    const trimmed = String(query || '').trim();

    if (trimmed) {
      const results = typeof global.searchTools === 'function'
        ? global.searchTools(global.SITE_TOOLS || [], trimmed, 8)
        : [];
      if (!results.length) {
        return '<div class="search-no-result">No matching tools</div>';
      }
      return renderToolSearchGroup('Matching tools', results, trimmed, context);
    }

    const currentTool = global.getToolBySlug && global.getToolBySlug(context.slug);
    const currentHub = currentTool && global.getHubForTool && global.getHubForTool(currentTool);
    const recentTools = getRecentTools(4).filter(function (tool) {
      return tool && (!currentTool || tool.href !== currentTool.href);
    });
    const siblingTools = currentHub && global.getToolsForHub
      ? global.getToolsForHub(currentHub.key).filter(function (tool) {
        return currentTool && tool.href !== currentTool.href;
      }).slice(0, 6)
      : [];

    const recentMarkup = renderToolSearchGroup('Recently used', uniqueTools(recentTools), '', context);
    const hubMarkup = renderToolSearchGroup(
      currentHub ? ('More in ' + currentHub.title) : 'Suggested tools',
      uniqueTools(siblingTools).slice(0, 6),
      '',
      context
    );

    return recentMarkup + hubMarkup || '<div class="search-no-result">Start typing to search tools</div>';
  }

  function bindToolSearch(context) {
    if (context.pageType !== 'tool') return;

    const input = document.getElementById('navSearch');
    const dropdown = document.getElementById('navSearchDropdown');
    if (!input || !dropdown || input.dataset.stbToolSearchBound === '1') return;
    input.dataset.stbToolSearchBound = '1';

    let focusedIndex = -1;

    function getItems() {
      return Array.from(dropdown.querySelectorAll('.search-suggestion'));
    }

    function syncFocusedItem() {
      getItems().forEach(function (item, index) {
        item.classList.toggle('focused', index === focusedIndex);
      });
    }

    function openDropdown() {
      dropdown.classList.add('open');
    }

    function closeSearch() {
      dropdown.classList.remove('open');
      focusedIndex = -1;
      syncFocusedItem();
    }

    function render() {
      dropdown.innerHTML = buildToolSearchMarkup(context, input.value);
      const items = getItems();
      if (!items.length) {
        focusedIndex = -1;
      } else if (focusedIndex >= items.length) {
        focusedIndex = items.length - 1;
      }
      syncFocusedItem();
      openDropdown();
    }

    input.addEventListener('focus', render);
    input.addEventListener('input', function () {
      focusedIndex = -1;
      render();
    });

    input.addEventListener('keydown', function (event) {
      const items = getItems();
      if (event.key === 'ArrowDown' && items.length) {
        event.preventDefault();
        focusedIndex = Math.min(focusedIndex + 1, items.length - 1);
        syncFocusedItem();
        return;
      }

      if (event.key === 'ArrowUp' && items.length) {
        event.preventDefault();
        focusedIndex = Math.max(focusedIndex - 1, 0);
        syncFocusedItem();
        return;
      }

      if (event.key === 'Enter' && focusedIndex >= 0 && items[focusedIndex]) {
        event.preventDefault();
        items[focusedIndex].click();
        return;
      }

      if (event.key === 'Escape') {
        closeSearch();
      }
    });

    document.addEventListener('click', function (event) {
      if (event.target === input || dropdown.contains(event.target)) return;
      closeSearch();
    });

    document.addEventListener('keydown', function (event) {
      if (!(event.metaKey || event.ctrlKey) || String(event.key).toLowerCase() !== 'k') return;
      event.preventDefault();
      input.focus();
      input.select();
      render();
    });
  }

  function renderAllToolsHubLinks() {
    const hubLinks = document.querySelector('.hub-links');
    if (!hubLinks || !Array.isArray(global.HIERARCHY_HUBS)) return;

    hubLinks.innerHTML = global.HIERARCHY_HUBS
      .slice()
      .sort(function (a, b) { return a.order - b.order; })
      .map(function (hub) {
        return '<a href="' + escapeHtml(hub.href) + '" class="hub-link">' + escapeHtml(hub.icon + ' ' + hub.title) + '</a>';
      })
      .join('');
  }

  function bindGuideRailObserver() {
    const targets = Array.from(document.querySelectorAll('.guide-panel[id]'));
    if (!targets.length) return;

    const updateActiveLink = function (id) {
      document.querySelectorAll('[data-directory-target]').forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('data-directory-target') === id);
      });
    };

    const observer = new global.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        updateActiveLink(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    targets.forEach(function (target) {
      observer.observe(target);
    });

    if (global.location.hash) {
      updateActiveLink(global.location.hash.replace(/^#/, ''));
    }

    global.addEventListener('hashchange', function () {
      updateActiveLink(global.location.hash.replace(/^#/, ''));
    });
  }

  function initSiteNavigation() {
    const context = getPageContext();
    if (!context.pageType) return;

    ensureBreadcrumb(context);
    insertDirectory(context);
    ensureShell(context);
    bindShellMetrics();
    applyCollapsedState();
    bindDirectoryActions();
    bindToolSearch(context);
    scheduleShellSync();

    if (context.pageType === 'all-tools') {
      renderAllToolsHubLinks();
    }

    if (context.pageType === 'guide') {
      bindGuideRailObserver();
    }
  }

  global.initSiteNavigation = initSiteNavigation;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteNavigation, { once: true });
  } else {
    initSiteNavigation();
  }
})(window);

