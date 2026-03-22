(function syncToolPageIcon() {
  if (!Array.isArray(window.SITE_TOOLS)) return;

  const iconEl = document.querySelector('.ds-tool-header__icon, .tool-title-icon');
  if (!iconEl) return;

  const path = window.location.pathname.replace(/\/+$/, '');
  const slug = path.split('/').pop().replace(/\.html$/, '');
  if (!slug) return;

  const tool = window.SITE_TOOLS.find((item) => {
    const href = String(item.href || '');
    return href.split('/').pop().replace(/\.html$/, '') === slug;
  });

  if (!tool || !tool.icon) return;
  iconEl.innerHTML = tool.icon;
})();
