(function (global) {
  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getHubConfig(hubKey) {
    if (!global.HUB_PAGE_CONFIG) return null;
    return global.HUB_PAGE_CONFIG[hubKey] || null;
  }

  function getSectionSlugs(section) {
    if (Array.isArray(section)) return section;
    return Array.isArray(section && section.slugs) ? section.slugs : [];
  }

  function getSectionTitle(section, index) {
    if (section && section.title) return section.title;
    return 'Section ' + String(index + 1);
  }

  function getToolBySlug(slug) {
    return typeof global.getToolBySlug === 'function'
      ? global.getToolBySlug(slug)
      : (global.SITE_TOOLS || []).find(function (tool) { return tool.href === 'tools/' + slug + '.html'; }) || null;
  }

  function renderToolCard(tool) {
    return (
      '<a class="tool-card" href="' + escapeHtml(tool.href) + '">' +
        '<div class="tool-card-top">' +
          '<span class="tool-icon">' + escapeHtml(tool.icon) + '</span>' +
          '<span class="tool-name">' + escapeHtml(tool.name) + '</span>' +
        '</div>' +
        '<p class="tool-desc">' + escapeHtml(tool.desc || tool.description || '') + '</p>' +
        '<div class="tool-footer">' +
          '<span class="tool-tag">' + escapeHtml(tool.tag) + '</span>' +
          '<span class="tool-arrow" aria-hidden="true">&rarr;</span>' +
        '</div>' +
      '</a>'
    );
  }

  function renderGuideCard(guide) {
    return (
      '<a class="guide-card-link" href="' + escapeHtml(guide.href) + '">' +
        '<span class="guide-card-link__icon">' + escapeHtml(guide.icon || 'GD') + '</span>' +
        '<span class="guide-card-link__content">' +
          '<strong class="guide-card-link__title">' + escapeHtml(guide.title) + '</strong>' +
          '<span class="guide-card-link__summary">' + escapeHtml(guide.summary || '') + '</span>' +
        '</span>' +
      '</a>'
    );
  }

  function renderHubLink(hub) {
    var count = typeof global.hubToolCount === 'function' ? global.hubToolCount(hub.key) : 0;
    return (
      '<a class="cat-card" href="' + escapeHtml(hub.href) + '">' +
        '<span class="cat-icon">' + escapeHtml(hub.icon) + '</span>' +
        '<span class="cat-info">' +
          '<strong class="cat-name">' + escapeHtml(hub.title) + '</strong>' +
          '<span class="cat-n">' + escapeHtml(String(count)) + ' tools</span>' +
        '</span>' +
      '</a>'
    );
  }

  function renderHero(hub, config) {
    var count = typeof global.hubToolCount === 'function' ? global.hubToolCount(hub.key) : 0;
    var hero = config.hero || {};
    return (
      '<section class="hub-hero">' +
        '<div class="hub-breadcrumb"></div>' +
        '<div class="hub-title-row">' +
          '<span class="hub-icon">' + escapeHtml(hero.icon || hub.icon) + '</span>' +
          '<div class="hub-title-copy">' +
            '<h1 class="hub-title">' + escapeHtml(hero.title || hub.title) + '</h1>' +
            '<p class="hub-desc">' + escapeHtml(hero.description || '') + '</p>' +
            '<div class="hub-count">' + escapeHtml(String(count)) + ' tools &middot; all free &middot; privacy-first</div>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  function renderSections(config) {
    return (config.sections || []).map(function (section, index) {
      var tools = getSectionSlugs(section)
        .map(getToolBySlug)
        .filter(Boolean);
      if (!tools.length) return '';

      return (
        '<section class="hub-section">' +
          '<h2 class="hub-section__title">' + escapeHtml(getSectionTitle(section, index)) + '</h2>' +
          '<div class="tool-grid">' + tools.map(renderToolCard).join('') + '</div>' +
        '</section>'
      );
    }).join('');
  }

  function renderSeo(config) {
    var cards = Array.isArray(config.seoCards) ? config.seoCards : [];
    if (!cards.length) return '';

    return (
      '<section class="hub-seo">' +
        '<h2 class="hub-section__title">Learn More</h2>' +
        '<div class="hub-seo__grid">' +
          cards.map(function (card) {
            var body = Array.isArray(card.body) ? card.body : [];
            return (
              '<article class="hub-seo-card">' +
                '<h3 class="hub-seo-card__title">' + escapeHtml(card.title || '') + '</h3>' +
                body.map(function (paragraph) {
                  return '<p class="hub-seo-card__body">' + String(paragraph || '') + '</p>';
                }).join('') +
              '</article>'
            );
          }).join('') +
        '</div>' +
      '</section>'
    );
  }

  function renderGuides(hubKey) {
    var guides = typeof global.getGuidePagesForHub === 'function'
      ? global.getGuidePagesForHub(hubKey)
      : [];
    if (!guides.length) return '';

    return (
      '<section class="hub-guides">' +
        '<h2 class="hub-section__title">Related Guides</h2>' +
        '<div class="hub-guides__grid">' + guides.map(renderGuideCard).join('') + '</div>' +
      '</section>'
    );
  }

  function renderOtherHubs(hubKey) {
    var hubs = (global.HIERARCHY_HUBS || []).filter(function (hub) {
      return hub.key !== hubKey;
    });
    if (!hubs.length) return '';

    return (
      '<section class="more-cats">' +
        '<h2 class="hub-section__title">Explore Other Hubs</h2>' +
        '<div class="cat-grid">' + hubs.map(renderHubLink).join('') + '</div>' +
      '</section>'
    );
  }

  function renderHubPage() {
    var context = global.STB_PAGE_CONTEXT || {};
    if (context.pageType !== 'hub' || !context.slug) return;

    var hub = typeof global.getHubByKey === 'function' ? global.getHubByKey(context.slug) : null;
    var config = getHubConfig(context.slug);
    var mount = document.querySelector('[data-hub-page]');

    if (!hub || !config || !mount) return;

    mount.className = 'hub-shell';
    mount.innerHTML =
      renderHero(hub, config) +
      renderSections(config) +
      renderSeo(config) +
      renderGuides(hub.key) +
      renderOtherHubs(hub.key);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHubPage);
  } else {
    renderHubPage();
  }
})(window);
