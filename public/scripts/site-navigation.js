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
    const items = global.getBreadcrumbForPage ? global.getBreadcrumbForPage(context) : [];
    if (!items.length) return;

    const toggle = hasDirectory(context)
      ? '<button type="button" class="ds-directory-toggle" data-directory-toggle aria-expanded="false" aria-controls="stb-directory-drawer">Menu</button>'
      : '';
    const markup = '<div class="ds-breadcrumb-row">' + toggle + renderBreadcrumbMarkup(items) + '</div>';

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

  function renderDirectoryItems(items) {
    if (!items || !items.length) {
      return '<div class="ds-directory-empty">No entries yet</div>';
    }

    return '<div class="ds-directory-list">' + items.map(function (item) {
      const extraClass = item.kind === 'toc' ? ' ds-directory-link--toc' : '';
      const targetAttr = item.kind === 'toc' ? ' data-directory-target="' + escapeHtml(String(item.href || '').replace(/^#/, '')) + '"' : '';

      return '<a class="ds-directory-link' + extraClass + (item.active ? ' is-active' : '') + '" href="' + escapeHtml(item.href || '#') + '"' + targetAttr + '>' +
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
        renderDirectoryItems(group.items) +
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

  function closeDrawer() {
    document.body.classList.remove('ds-directory-drawer-open');
    document.querySelectorAll('[data-directory-toggle]').forEach(function (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    });
    const backdrop = document.querySelector('[data-directory-backdrop]');
    if (backdrop) backdrop.hidden = true;
  }

  function bindDirectoryActions() {
    document.querySelectorAll('[data-directory-toggle]').forEach(function (button) {
      button.addEventListener('click', function () {
        document.body.classList.add('ds-directory-drawer-open');
        button.setAttribute('aria-expanded', 'true');
        const backdrop = document.querySelector('[data-directory-backdrop]');
        if (backdrop) backdrop.hidden = false;
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
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeDrawer();
      }
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
    applyCollapsedState();
    bindDirectoryActions();

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
