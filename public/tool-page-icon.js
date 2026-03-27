(function syncToolPageIcon() {
  function slugFromPathname() {
    const path = window.location.pathname.replace(/\/+$/, '');
    return path.split('/').pop().replace(/\.html$/, '');
  }

  function ensureHierarchyScript(callback) {
    if (typeof window.getBreadcrumbForPage === 'function') {
      callback();
      return;
    }

    const existing = document.querySelector('script[data-site-hierarchy]');
    if (existing) {
      existing.addEventListener('load', callback, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = '../site-hierarchy.js';
    script.dataset.siteHierarchy = 'true';
    script.onload = callback;
    document.head.appendChild(script);
  }

  function syncToolIcon(tool) {
    const iconEl = document.querySelector('.ds-tool-header__icon, .tool-title-icon');
    if (iconEl && tool.icon) {
      iconEl.innerHTML = tool.icon;
    }
  }

  function renderBreadcrumb(tool) {
    if (typeof window.getBreadcrumbForPage !== 'function') return;

    const items = window.getBreadcrumbForPage({ pageType: 'tool', slug: slugFromPathname() });
    if (!items.length) return;

    const markup = '<div class="ds-breadcrumb-row ds-tool-breadcrumb">' +
      '<nav class="ds-breadcrumb" aria-label="Breadcrumb">' +
      items.map(function (item, index) {
        const isCurrent = !!item.current;
        const label = String(item.label || '');
        const href = String(item.href || '');
        const content = href && !isCurrent
          ? '<a href="' + href + '">' + label + '</a>'
          : '<span aria-current="' + (isCurrent ? 'page' : 'false') + '">' + label + '</span>';
        return '<span class="ds-breadcrumb__item">' + content + '</span>' + (index < items.length - 1 ? '<span class="ds-breadcrumb__sep">›</span>' : '');
      }).join('') +
      '</nav>' +
    '</div>';

    const headerInner = document.querySelector('.ds-tool-header__inner, .tool-header-inner');
    if (headerInner) {
      const existing = headerInner.querySelector('.ds-tool-breadcrumb');
      if (existing) existing.remove();
      headerInner.insertAdjacentHTML('afterbegin', markup);
    }
  }

  function simplifyTopNav() {
    document.querySelectorAll('.ds-tool-nav-divider, .ds-tool-nav-link, .ds-tool-nav-name').forEach(function (node) {
      node.hidden = true;
    });
  }

  function enhanceToolPage() {
    if (!Array.isArray(window.SITE_TOOLS)) return;

    const slug = slugFromPathname();
    if (!slug) return;

    const tool = window.SITE_TOOLS.find((item) => {
      const href = String(item.href || '');
      return href.split('/').pop().replace(/\.html$/, '') === slug;
    });

    if (!tool) return;

    syncToolIcon(tool);
    simplifyTopNav();
    renderBreadcrumb(tool);
  }

  ensureHierarchyScript(enhanceToolPage);
})();
