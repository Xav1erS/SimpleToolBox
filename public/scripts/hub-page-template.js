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

  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section';
  }

  function getSectionId(section, index) {
    return 'hub-section-' + slugify(getSectionTitle(section, index)) + '-' + String(index + 1);
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

  function renderHeader(hub, config) {
    var count = typeof global.hubToolCount === 'function' ? global.hubToolCount(hub.key) : 0;
    var sectionCount = (config.sections || []).filter(function (section) {
      return getSectionSlugs(section).length > 0;
    }).length;
    var hero = config.hero || {};
    var hubLabel = String(hub.title || 'Hub').replace(/\s+Tools$/i, '') + ' Hub';
    return (
      '<section class="page-header hub-page-header">' +
        '<div class="hub-breadcrumb"></div>' +
        '<div class="hero-kicker">' + escapeHtml(hubLabel) + '</div>' +
        '<div class="hub-page-header__main">' +
          '<span class="hub-page-header__icon">' + escapeHtml(hero.icon || hub.icon) + '</span>' +
          '<div class="hub-page-header__copy">' +
            '<h1 class="page-title hub-page-header__title">' + escapeHtml(hero.title || hub.title) + '</h1>' +
            '<p class="page-sub hub-page-header__sub">' + escapeHtml(hero.description || '') + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="page-highlights">' +
          '<span class="page-highlight">' + escapeHtml(String(count)) + ' tools</span>' +
          '<span class="page-highlight">' + escapeHtml(String(sectionCount)) + ' sections</span>' +
          '<span class="page-highlight">Privacy-first</span>' +
        '</div>' +
      '</section>'
    );
  }

  function renderToolbar(config) {
    var sections = (config.sections || []).filter(function (section) {
      return getSectionSlugs(section).length > 0;
    });
    if (!sections.length) return '';

    return (
      '<section class="filter-bar hub-toolbar">' +
        '<div class="hub-toolbar__meta">Jump to a section</div>' +
        '<div class="filter-tags hub-toolbar__pills">' +
          sections.map(function (section, index) {
            var sectionId = getSectionId(section, index);
            return (
              '<a class="filter-tag ds-pill hub-toolbar__pill' + (index === 0 ? ' active' : '') + '" ' +
                'href="#' + escapeHtml(sectionId) + '" data-hub-section-jump="' + escapeHtml(sectionId) + '">' +
                escapeHtml(getSectionTitle(section, index)) +
              '</a>'
            );
          }).join('') +
        '</div>' +
      '</section>'
    );
  }

  function renderResultsHead(hub, config) {
    var count = typeof global.hubToolCount === 'function' ? global.hubToolCount(hub.key) : 0;
    var sectionCount = (config.sections || []).filter(function (section) {
      return getSectionSlugs(section).length > 0;
    }).length;
    return (
      '<div class="results-head hub-results-head">' +
        '<div>' +
          '<div class="results-kicker">Sections</div>' +
          '<h2 class="results-title">Browse tools by workflow cluster</h2>' +
          '<p class="results-copy">This hub keeps related tasks grouped together so users can jump straight to the right tool set.</p>' +
        '</div>' +
        '<span class="count-badge">' + escapeHtml(String(count)) + ' tools / ' + escapeHtml(String(sectionCount)) + ' sections</span>' +
      '</div>'
    );
  }

  function renderSections(config) {
    return (config.sections || []).map(function (section, index) {
      var tools = getSectionSlugs(section)
        .map(getToolBySlug)
        .filter(Boolean);
      var sectionId = getSectionId(section, index);
      if (!tools.length) return '';

      return (
        '<section class="hub-section" id="' + escapeHtml(sectionId) + '">' +
          '<h2 class="section-label hub-section__title">' + escapeHtml(getSectionTitle(section, index)) + '</h2>' +
          '<div class="tool-grid hub-tool-grid">' + tools.map(renderToolCard).join('') + '</div>' +
        '</section>'
      );
    }).join('');
  }

  function renderSeo(config) {
    var cards = Array.isArray(config.seoCards) ? config.seoCards : [];
    if (!cards.length) return '';

    return (
      '<section class="hub-seo">' +
        '<h2 class="section-label hub-section__title">Learn More</h2>' +
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
        '<h2 class="section-label hub-section__title">Related Guides</h2>' +
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
        '<h2 class="section-label hub-section__title">Explore Other Hubs</h2>' +
        '<div class="cat-grid">' + hubs.map(renderHubLink).join('') + '</div>' +
      '</section>'
    );
  }

  function bindSectionJumpUI(mount) {
    var links = Array.from(mount.querySelectorAll('[data-hub-section-jump]'));
    if (!links.length) return;

    function setActive(id) {
      links.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('data-hub-section-jump') === id);
      });
    }

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        setActive(link.getAttribute('data-hub-section-jump'));
      });
    });

    if (global.location.hash) {
      setActive(global.location.hash.replace(/^#/, ''));
    } else {
      setActive(links[0].getAttribute('data-hub-section-jump'));
    }

    if (!global.IntersectionObserver) return;

    var observer = new global.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        setActive(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0.1 });

    links.forEach(function (link) {
      var target = document.getElementById(link.getAttribute('data-hub-section-jump'));
      if (target) observer.observe(target);
    });
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
      renderHeader(hub, config) +
      renderToolbar(config) +
      renderResultsHead(hub, config) +
      renderSections(config) +
      renderSeo(config) +
      renderGuides(hub.key) +
      renderOtherHubs(hub.key);

    bindSectionJumpUI(mount);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHubPage);
  } else {
    renderHubPage();
  }
})(window);
