(function (global) {
  const HIERARCHY_HUBS = [
    { key: 'image', slug: 'image-tools', title: 'Image Tools', href: 'image-tools.html', icon: '🖼️', order: 1, tags: ['image'] },
    { key: 'developer', slug: 'developer-tools', title: 'Developer Tools', href: 'developer-tools.html', icon: '🛠️', order: 2, tags: ['encode', 'format'] },
    { key: 'text', slug: 'text-tools', title: 'Text Tools', href: 'text-tools.html', icon: '✍️', order: 3, tags: ['text'] },
    { key: 'calculator', slug: 'calculator-tools', title: 'Calculator Tools', href: 'calculator-tools.html', icon: '🧮', order: 4, tags: ['calculator'] },
    { key: 'converter', slug: 'converter-tools', title: 'Converter Tools', href: 'converter-tools.html', icon: '📐', order: 5, tags: ['convert'] },
    { key: 'generator', slug: 'generator-tools', title: 'Generator Tools', href: 'generator-tools.html', icon: '⚙️', order: 6, tags: ['generate'] },
    { key: 'pdf', slug: 'pdf-tools', title: 'PDF Tools', href: 'pdf-tools.html', icon: '📄', order: 7, tags: ['pdf'] },
    { key: 'design', slug: 'design-tools', title: 'Design Tools', href: 'design-tools.html', icon: '🎨', order: 8, tags: ['design'] },
    { key: 'reference', slug: 'reference-tools', title: 'Reference Tools', href: 'reference-tools.html', icon: '📚', order: 9, tags: ['reference'] }
  ];

  const HUB_TAG_TO_KEY = {
    image: 'image',
    text: 'text',
    encode: 'developer',
    format: 'developer',
    convert: 'converter',
    calculator: 'calculator',
    generate: 'generator',
    pdf: 'pdf',
    design: 'design',
    reference: 'reference'
  };

  const TOOL_HUB_OVERRIDES = {};

  const TOOL_OFTEN_USED_WITH = {
    base64: ['url-encode', 'jwt-decoder', 'hash-generator', 'html-entities', 'string-escape']
  };

  const GUIDE_PAGES = [
    { slug: 'image-formats-guide', title: 'Image Formats Guide', href: 'image-formats-guide.html', hub: 'image', icon: 'IMG', summary: 'PNG, JPG, WebP, SVG, and GIF comparison.' },
    { slug: 'json-formatting-guide', title: 'JSON Formatting Guide', href: 'json-formatting-guide.html', hub: 'developer', icon: 'JSN', summary: 'Prettify, minify, validate, and escape JSON.' },
    { slug: 'regex-patterns', title: 'Regex Patterns', href: 'regex-patterns.html', hub: 'developer', icon: 'RX', summary: 'Common regex snippets, flags, and matching tips.' },
    { slug: 'mime-types-guide', title: 'MIME Types Guide', href: 'mime-types-guide.html', hub: 'developer', icon: 'MIME', summary: 'Pick the right Content-Type for files and APIs.' },
    { slug: 'http-status-codes-explained', title: 'HTTP Status Codes', href: 'http-status-codes-explained.html', hub: 'developer', icon: 'HTTP', summary: 'Understand common 2xx, 4xx, and 5xx responses.' },
    { slug: 'date-time-format-reference', title: 'Date & Time Formats', href: 'date-time-format-reference.html', hub: 'converter', icon: 'DT', summary: 'ISO 8601, Unix timestamps, and timezone notation.' },
    { slug: 'pdf-page-sizes', title: 'PDF Page Sizes', href: 'pdf-page-sizes.html', hub: 'pdf', icon: 'PDF', summary: 'A4, Letter, Legal, and print-ready sizes.' },
    { slug: 'color-format-reference', title: 'Color Format Reference', href: 'color-format-reference.html', hub: 'design', icon: 'CLR', summary: 'HEX, RGB, HSL, and CMYK in one guide.' }
  ];

  const GUIDE_HUB_MAP = GUIDE_PAGES.reduce((acc, guide) => {
    acc[guide.slug] = guide.hub;
    return acc;
  }, {});

  const POPULAR_TOOL_SLUGS = [
    'base64',
    'json-formatter',
    'password-generator',
    'word-counter',
    'image-compressor',
    'qr-code-generator',
    'image-resizer',
    'timestamp'
  ];

  function slugFromHref(href) {
    return String(href || '').replace(/^tools\//, '').replace(/^\.\.\//, '').replace(/\.html$/, '').replace(/^\//, '');
  }

  function pageSlugFromHref(href) {
    return String(href || '').replace(/\.html$/, '').replace(/^\//, '');
  }

  function getHubByKey(key) {
    return HIERARCHY_HUBS.find((hub) => hub.key === key) || null;
  }

  function getHubByPageSlug(pageSlug) {
    const normalized = pageSlugFromHref(pageSlug);
    return HIERARCHY_HUBS.find((hub) => hub.slug === normalized) || null;
  }

  function getGuideMeta(slug) {
    return GUIDE_PAGES.find((guide) => guide.slug === slug) || null;
  }

  function getGuidePagesForHub(hubKey) {
    return GUIDE_PAGES.filter((guide) => guide.hub === hubKey);
  }

  function getToolBySlug(slug) {
    if (!Array.isArray(global.SITE_TOOLS)) return null;
    return global.SITE_TOOLS.find((tool) => slugFromHref(tool.href) === slug) || null;
  }

  function getOftenUsedToolsForTool(slug, hubKey) {
    const overrideSlugs = TOOL_OFTEN_USED_WITH[slug];
    if (Array.isArray(overrideSlugs) && overrideSlugs.length) {
      return overrideSlugs
        .map((toolSlug) => getToolBySlug(toolSlug))
        .filter(Boolean);
    }

    return getToolsForHub(hubKey)
      .filter((item) => slugFromHref(item.href) !== slug)
      .slice(0, 6);
  }

  function getHubForTool(slugOrTool) {
    const slug = typeof slugOrTool === 'string' ? slugOrTool : slugFromHref(slugOrTool && slugOrTool.href);
    const overrideHub = TOOL_HUB_OVERRIDES[slug];
    if (overrideHub) return getHubByKey(overrideHub);

    const tool = typeof slugOrTool === 'string' ? getToolBySlug(slugOrTool) : slugOrTool;
    if (!tool) return null;

    const hubKey = HUB_TAG_TO_KEY[tool.tag];
    return hubKey ? getHubByKey(hubKey) : null;
  }

  function getToolsForHub(hubKey) {
    if (!Array.isArray(global.SITE_TOOLS)) return [];

    const sections = global.HUB_PAGE_CONFIG && global.HUB_PAGE_CONFIG[hubKey] && global.HUB_PAGE_CONFIG[hubKey].sections;
    if (Array.isArray(sections) && sections.length) {
      const seen = new Set();
      return sections
        .flat()
        .map((slug) => getToolBySlug(slug))
        .filter((tool) => {
          if (!tool) return false;
          const toolSlug = slugFromHref(tool.href);
          if (seen.has(toolSlug)) return false;
          seen.add(toolSlug);
          return true;
        });
    }

    return global.SITE_TOOLS.filter((tool) => {
      const hub = getHubForTool(tool);
      return hub && hub.key === hubKey;
    });
  }

  function buildHubLinkItem(hub, currentUrl) {
    return {
      type: 'link',
      href: hub.href,
      label: hub.title,
      icon: hub.icon,
      active: pageSlugFromHref(currentUrl) === pageSlugFromHref(hub.href)
    };
  }

  function buildToolLinkItem(tool, currentUrl) {
    return {
      type: 'link',
      href: tool.href,
      label: tool.name,
      icon: tool.icon,
      meta: tool.tag,
      active: pageSlugFromHref(currentUrl) === pageSlugFromHref(tool.href)
    };
  }

  function buildGuideLinkItem(guide, currentUrl) {
    return {
      type: 'link',
      href: guide.href,
      label: guide.title,
      icon: guide.icon,
      meta: '',
      active: pageSlugFromHref(currentUrl) === pageSlugFromHref(guide.href)
    };
  }

  function getBreadcrumbForPage(context) {
    const pageType = context && context.pageType;
    const slug = context && context.slug;
    const home = [{ label: 'Home', href: 'index.html' }];

    if (pageType === 'all-tools') {
      return home.concat([{ label: 'All Tools', href: 'all-tools.html', current: true }]);
    }

    if (pageType === 'hub') {
      const hub = getHubByKey(slug) || getHubByPageSlug(slug);
      if (!hub) return home;
      return home.concat([{ label: hub.title, href: hub.href, current: true }]);
    }

    if (pageType === 'guide') {
      const guide = getGuideMeta(slug);
      const hub = guide && getHubByKey(guide.hub);
      if (!guide || !hub) return home;
      return home.concat([
        { label: hub.title, href: hub.href },
        { label: guide.title, href: guide.href, current: true }
      ]);
    }

    if (pageType === 'tool') {
      const tool = typeof slug === 'string' ? getToolBySlug(slug) : null;
      const hub = tool && getHubForTool(tool);
      if (!tool || !hub) return home;
      return home.concat([
        { label: hub.title, href: hub.href },
        { label: tool.name, href: tool.href, current: true }
      ]);
    }

    return home;
  }

  function getDirectoryEntriesForPage(context) {
    const pageType = context && context.pageType;
    const slug = context && context.slug;
    const currentUrl = context && context.currentUrl;

    if (pageType === 'all-tools') {
      return [
        {
          title: 'Hub Categories',
          items: HIERARCHY_HUBS.slice().sort((a, b) => a.order - b.order).map((hub) => buildHubLinkItem(hub, currentUrl))
        },
        { title: 'Recently Used', items: [] },
        {
          title: 'Popular',
          items: POPULAR_TOOL_SLUGS.map((toolSlug) => getToolBySlug(toolSlug)).filter(Boolean).map((tool) => buildToolLinkItem(tool, currentUrl))
        },
        {
          title: 'Quick Guides',
          items: GUIDE_PAGES.map((guide) => buildGuideLinkItem(guide, currentUrl))
        }
      ];
    }

    if (pageType === 'hub') {
      const hub = getHubByKey(slug) || getHubByPageSlug(slug);
      if (!hub) return [];
      return [
        { title: 'Current Hub', items: [buildHubLinkItem(hub, currentUrl)] },
        { title: 'Tools in This Hub', items: getToolsForHub(hub.key).map((tool) => buildToolLinkItem(tool, currentUrl)) },
        { title: 'Related Guides', items: getGuidePagesForHub(hub.key).map((guide) => buildGuideLinkItem(guide, currentUrl)) },
        { title: 'Other Hubs', items: HIERARCHY_HUBS.filter((item) => item.key !== hub.key).map((item) => buildHubLinkItem(item, currentUrl)) }
      ];
    }

    if (pageType === 'guide') {
      const guide = getGuideMeta(slug);
      const hub = guide && getHubByKey(guide.hub);
      if (!guide || !hub) return [];
      return [
        { title: 'On This Page', items: [] },
        { title: 'More in This Hub', items: getGuidePagesForHub(hub.key).filter((item) => item.slug !== guide.slug).map((item) => buildGuideLinkItem(item, currentUrl)) },
        { title: 'Hub Tools', items: getToolsForHub(hub.key).map((tool) => buildToolLinkItem(tool, currentUrl)) }
      ];
    }

    if (pageType === 'tool') {
      const tool = getToolBySlug(slug);
      const hub = tool && getHubForTool(tool);
      if (!tool || !hub) return [];

      return [
        { title: 'Current Hub', items: [Object.assign({}, buildHubLinkItem(hub, currentUrl), { active: true })] },
        { title: 'Often Used With This', items: getOftenUsedToolsForTool(slug, hub.key).map((item) => Object.assign({}, buildToolLinkItem(item, currentUrl), { meta: '' })) },
        { title: 'Recently Used', items: [] }
      ];
    }

    return [];
  }

  global.HIERARCHY_HUBS = HIERARCHY_HUBS;
  global.GUIDE_HUB_MAP = GUIDE_HUB_MAP;
  global.TOOL_HUB_OVERRIDES = TOOL_HUB_OVERRIDES;
  global.GUIDE_PAGES = GUIDE_PAGES;
  global.POPULAR_TOOL_SLUGS = POPULAR_TOOL_SLUGS;
  global.getHubForTool = getHubForTool;
  global.getBreadcrumbForPage = getBreadcrumbForPage;
  global.getDirectoryEntriesForPage = getDirectoryEntriesForPage;
  global.getHubByKey = getHubByKey;
  global.getHubByPageSlug = getHubByPageSlug;
  global.getGuideMeta = getGuideMeta;
  global.getGuidePagesForHub = getGuidePagesForHub;
  global.getToolsForHub = getToolsForHub;
  global.getToolBySlug = getToolBySlug;
  global.slugFromHref = global.slugFromHref || slugFromHref;
})(window);
