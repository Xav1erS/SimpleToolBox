(function () {
  const LS_KEY = 'stb_recent';
  const MAX_RECENT = 6;

  function slugFromHref(href) {
    return String(href || '').replace(/^tools\//, '').replace(/\.html$/, '');
  }

  function navHighlightMatch(text, query) {
    const normalizedText = String(text || '');
    const idx = normalizedText.toLowerCase().indexOf(String(query || '').toLowerCase());
    if (idx === -1) return normalizedText;
    return normalizedText.slice(0, idx) + '<mark>' + normalizedText.slice(idx, idx + query.length) + '</mark>' + normalizedText.slice(idx + query.length);
  }

  function getRecentTools() {
    const list = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    return list.map(href => SITE_TOOLS.find(tool => tool.href === href)).filter(Boolean).slice(0, MAX_RECENT);
  }

  function recordRecent(href) {
    let list = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    list = [href, ...list.filter(item => item !== href)].slice(0, MAX_RECENT);
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  }

  function renderSearchGroup(label, tools, query) {
    if (!tools.length) return '';
    return '<div class="search-dropdown-group"><div class="search-dropdown-label">' + label + '</div>' + tools.map((tool, index) =>
      '<a href="' + tool.href + '" class="search-suggestion" data-idx="' + index + '">' +
        '<span class="suggestion-icon">' + tool.icon + '</span>' +
        '<div class="suggestion-text">' +
          '<div class="suggestion-name">' + (query ? navHighlightMatch(tool.name, query) : tool.name) + '</div>' +
          '<div class="suggestion-desc">' + (query ? tool.desc : ('Open ' + tool.name.toLowerCase() + ' instantly')) + '</div>' +
        '</div>' +
        '<span class="suggestion-tag">' + tool.tag + '</span>' +
      '</a>'
    ).join('') + '</div>';
  }

  function buildNavDropdown(dropdownEl, query) {
    const normalizedQuery = String(query || '').trim().toLowerCase();
    if (!normalizedQuery) {
      const recentTools = getRecentTools();
      const guideTools = (window.GUIDE_RELATED_TOOL_SLUGS || [])
        .map(slug => SITE_TOOLS.find(tool => slugFromHref(tool.href) === slug))
        .filter(Boolean)
        .filter(tool => !recentTools.includes(tool))
        .slice(0, 6);
      dropdownEl.innerHTML =
        renderSearchGroup('Recently Used', recentTools, '') +
        renderSearchGroup('Related Tools', guideTools, '');
      if (!dropdownEl.innerHTML) {
        dropdownEl.classList.remove('open');
        return;
      }
      dropdownEl.classList.add('open');
      return;
    }

    const results = searchTools(SITE_TOOLS, normalizedQuery, 6);
    dropdownEl.innerHTML = results.length
      ? results.map((tool, index) =>
          '<a href="' + tool.href + '" class="search-suggestion" data-idx="' + index + '">' +
            '<span class="suggestion-icon">' + tool.icon + '</span>' +
            '<div class="suggestion-text">' +
              '<div class="suggestion-name">' + navHighlightMatch(tool.name, normalizedQuery) + '</div>' +
              '<div class="suggestion-desc">' + tool.desc + '</div>' +
            '</div>' +
            '<span class="suggestion-tag">' + tool.tag + '</span>' +
          '</a>'
        ).join('')
      : '<div class="search-no-result">No tools found</div>';
    dropdownEl.classList.add('open');
  }

  function renderToolCard(tool) {
    return '<a href="' + tool.href + '" class="guide-tool-card">' +
      '<div class="guide-tool-card__top">' +
        '<div class="guide-tool-card__icon">' + tool.icon + '</div>' +
        '<div class="guide-tool-card__name">' + tool.name + '</div>' +
      '</div>' +
      '<div class="guide-tool-card__desc">' + tool.desc + '</div>' +
      '<div class="guide-tool-card__tag">' + tool.tag + '</div>' +
    '</a>';
  }

  function initRelatedTools() {
    const grid = document.getElementById('relatedToolGrid');
    if (!grid) return;
    const tools = (window.GUIDE_RELATED_TOOL_SLUGS || [])
      .map(slug => SITE_TOOLS.find(tool => slugFromHref(tool.href) === slug))
      .filter(Boolean);
    grid.innerHTML = tools.map(renderToolCard).join('');
  }

  function initGuidePage() {
    const navSearchInput = document.getElementById('navSearch');
    const navDropdown = document.getElementById('navSearchDropdown');

    if (navSearchInput && navDropdown) {
      navSearchInput.addEventListener('input', event => buildNavDropdown(navDropdown, event.target.value));
      navSearchInput.addEventListener('focus', () => buildNavDropdown(navDropdown, navSearchInput.value));
      navSearchInput.addEventListener('keydown', event => {
        const items = navDropdown.querySelectorAll('.search-suggestion');
        let index = Array.from(items).findIndex(item => item.classList.contains('focused'));
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          items[index] && items[index].classList.remove('focused');
          index = Math.min(index + 1, items.length - 1);
          items[index] && items[index].classList.add('focused');
          items[index] && items[index].scrollIntoView({ block: 'nearest' });
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          items[index] && items[index].classList.remove('focused');
          index = Math.max(index - 1, 0);
          items[index] && items[index].classList.add('focused');
          items[index] && items[index].scrollIntoView({ block: 'nearest' });
        } else if (event.key === 'Enter') {
          const focused = navDropdown.querySelector('.search-suggestion.focused');
          if (focused) {
            event.preventDefault();
            focused.click();
          }
        } else if (event.key === 'Escape') {
          navDropdown.classList.remove('open');
        }
      });
      document.addEventListener('click', event => {
        if (!event.target.closest('.nav-search')) navDropdown.classList.remove('open');
      });
    }

    document.addEventListener('click', event => {
      const link = event.target.closest('a[href^="tools/"]');
      if (link) recordRecent(link.getAttribute('href'));
    });

    const tocLinks = document.querySelectorAll('.guide-toc__list a');
    const tocTargets = document.querySelectorAll('.guide-panel[id]');
    if (tocLinks.length && tocTargets.length) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          tocLinks.forEach(link => link.classList.remove('active'));
          const active = document.querySelector('.guide-toc__list a[href="#' + entry.target.id + '"]');
          if (active) active.classList.add('active');
        });
      }, { rootMargin: '-20% 0px -70% 0px' });
      tocTargets.forEach(target => observer.observe(target));
    }

    initRelatedTools();
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('nav');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  window.initGuidePage = initGuidePage;
})();
