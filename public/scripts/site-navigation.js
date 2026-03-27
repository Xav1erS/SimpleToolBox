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

  function renderBreadcrumbMarkup(items) {
    return '<nav class="ds-breadcrumb" aria-label="Breadcrumb">' +
      items.map(function (item, index) {
        const isCurrent = !!item.current;
        const content = item.href && !isCurrent
          ? '<a href="' + escapeHtml(item.href) + '">' + escapeHtml(item.label) + '</a>'
          : '<span aria-current="' + (isCurrent ? 'page' : 'false') + '">' + escapeHtml(item.label) + '</span>';
        const separator = index < items.length - 1 ? '<span class="ds-breadcrumb__sep">›</span>' : '';
        return '<span class="ds-breadcrumb__item">' + content + '</span>' + separator;
      }).join('') +
      '</nav>';
  }

  function ensureBreadcrumb(context) {
    const items = global.getBreadcrumbForPage ? global.getBreadcrumbForPage(context) : [];
    if (!items.length) return;

    const toggle = '<button type="button" class="ds-directory-toggle" data-directory-toggle aria-expanded="false" aria-controls="stb-directory-drawer">Menu</button>';
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
      if (target) target.outerHTML = markup;
      return;
    }

    if (context.pageType === 'guide') {
      const target = document.querySelector('.guide-breadcrumb');
      if (target) target.outerHTML = markup;
    }
  }

  function getRecentItems(currentUrl) {
    if (!Array.isArray(global.SITE_TOOLS)) return [];
    var recent = [];
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

  function renderDirectoryItems(items) {
    if (!items || !items.length) {
      return '<div class="ds-directory-empty">No entries yet</div>';
    }

    return '<div class="ds-directory-list">' + items.map(function (item) {
      if (item.type === 'html') {
        return '<div class="ds-directory-custom">' + item.html + '</div>';
      }

      return '<a class="ds-directory-link' + (item.active ? ' is-active' : '') + '" href="' + escapeHtml(item.href || '#') + '">' +
        '<span class="ds-directory-link__main">' +
          (item.icon ? '<span class="ds-directory-link__icon">' + escapeHtml(item.icon) + '</span>' : '') +
          '<span class="ds-directory-link__label">' + escapeHtml(item.label) + '</span>' +
        '</span>' +
        (item.meta ? '<span class="ds-directory-link__meta">' + escapeHtml(item.meta) + '</span>' : '') +
      '</a>';
    }).join('') + '</div>';
  }

  function cloneGuideToc() {
    const tocList = document.querySelector('.guide-toc__list');
    if (!tocList) return [];
    return [{
      type: 'html',
      html: '<div class="guide-toc__list">' + tocList.innerHTML + '</div>'
    }];
  }

  function getDirectoryGroups(context) {
    const groups = global.getDirectoryEntriesForPage ? global.getDirectoryEntriesForPage(context) : [];
    if (context.pageType === 'all-tools') {
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
          return Object.assign({}, group, { items: cloneGuideToc() });
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
            '<button type="button" class="ds-directory-collapse" data-directory-collapse aria-pressed="false">Collapse</button>' +
          '</div>' +
          body +
        '</div>' +
      '</aside>' +
      '<div class="ds-directory-backdrop" data-directory-backdrop hidden></div>' +
      '<aside class="ds-directory-drawer" id="stb-directory-drawer" aria-label="Page directory">' +
        '<div class="ds-directory-drawer__head">' +
          '<strong>Browse</strong>' +
          '<button type="button" class="ds-directory-drawer__close" data-directory-close>Close</button>' +
        '</div>' +
        body +
      '</aside>'
    );
  }

  function insertDirectory(context) {
    if (context.pageType !== 'all-tools' && context.pageType !== 'hub' && context.pageType !== 'guide') {
      return;
    }
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

  function applyCollapsedState() {
    var collapsed = false;
    try {
      collapsed = global.localStorage.getItem(DIR_COLLAPSE_KEY) === '1';
    } catch (error) {
      collapsed = false;
    }
    document.body.classList.toggle('ds-directory-is-collapsed', collapsed);

    const collapseBtn = document.querySelector('[data-directory-collapse]');
    if (collapseBtn) {
      collapseBtn.setAttribute('aria-pressed', collapsed ? 'true' : 'false');
      collapseBtn.textContent = collapsed ? 'Expand' : 'Collapse';
    }
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
      button.addEventListener('click', function () {
        document.body.classList.remove('ds-directory-drawer-open');
        document.querySelectorAll('[data-directory-toggle]').forEach(function (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        });
        const backdrop = document.querySelector('[data-directory-backdrop]');
        if (backdrop) backdrop.hidden = true;
      });
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

  function initSiteNavigation() {
    const context = getPageContext();
    if (!context.pageType) return;

    ensureBreadcrumb(context);
    insertDirectory(context);
    applyCollapsedState();
    bindDirectoryActions();

    if (context.pageType === 'all-tools') {
      renderAllToolsHubLinks();
    }
  }

  global.initSiteNavigation = initSiteNavigation;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteNavigation, { once: true });
  } else {
    initSiteNavigation();
  }
})(window);
