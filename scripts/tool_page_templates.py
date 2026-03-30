#!/usr/bin/env python3
from __future__ import annotations

import html
import json


CATEGORY_TO_APP = {
    "calculator": "UtilitiesApplication",
    "convert": "UtilitiesApplication",
    "encode": "DeveloperApplication",
    "format": "DeveloperApplication",
    "generate": "DeveloperApplication",
    "image": "MultimediaApplication",
    "design": "DesignApplication",
    "reference": "DeveloperApplication",
    "text": "UtilitiesApplication",
}


def esc(value: str) -> str:
    return html.escape(str(value), quote=True)


def title_without_suffix(title: str) -> str:
    return title.split(" | ")[0].strip()


def display_title(meta: dict) -> str:
    return meta.get("shortTitle") or title_without_suffix(meta["title"])


def canonical_for_slug(slug: str) -> str:
    return f"https://www.simpletoolbox.dev/tools/{slug}"


def render_structured_data(meta: dict) -> str:
    app = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": display_title(meta),
        "description": meta["description"],
        "applicationCategory": CATEGORY_TO_APP.get(meta["category"], "UtilitiesApplication"),
        "operatingSystem": "Web",
        "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"},
        "url": canonical_for_slug(meta["slug"]),
    }
    blocks = [
        '<script type="application/ld+json">',
        json.dumps(app, ensure_ascii=False, indent=2),
        "</script>",
    ]

    faq = meta.get("faq") or []
    if faq:
        faq_json = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": item["q"],
                    "acceptedAnswer": {"@type": "Answer", "text": item["a"]},
                }
                for item in faq
            ],
        }
        blocks.extend([
            '<script type="application/ld+json">',
            json.dumps(faq_json, ensure_ascii=False, indent=2),
            "</script>",
        ])

    return "\n".join(blocks)


def render_seo_content(meta: dict) -> str:
    section = meta.get("seoContent", {})
    what_title = section.get("whatIsTitle", f"What is {display_title(meta)}?")
    what_body = section.get("whatIsBody", meta["description"])
    how_title = section.get("howToTitle", f"How to Use {display_title(meta)}")
    steps = section.get("howToSteps", [])

    lines = [
        '<div class="ds-seo-content">',
        '  <section class="ds-seo-section">',
        f'    <h2 class="ds-seo-section__title">{esc(what_title)}</h2>',
        f'    <p>{esc(what_body)}</p>',
        "  </section>",
    ]
    if steps:
        lines.extend([
            '  <section class="ds-seo-section">',
            f'    <h2 class="ds-seo-section__title">{esc(how_title)}</h2>',
            "    <ol>",
        ])
        for step in steps:
            lines.append(f"      <li>{esc(step)}</li>")
        lines.extend([
            "    </ol>",
            "  </section>",
        ])
    lines.append("</div>")
    return "\n".join(lines)


def render_related(meta: dict, site_map: dict[str, dict]) -> str:
    lines = [
        '<div class="ds-related-tools">',
        '  <h2 class="ds-related-title">Related Tools</h2>',
        '  <div class="ds-related-grid">',
    ]
    for slug in meta["relatedTools"]:
        item = site_map[slug]
        lines.append(
            f'    <a href="{esc(item["href"].split("/")[-1])}" class="ds-related-card">'
            f'<span class="ds-related-icon">{esc(item["icon"])}</span>'
            f'<div><div class="ds-related-name">{esc(item["name"])}</div>'
            f'<div class="ds-related-desc">{esc(item["desc"])}</div></div></a>'
        )
    lines.extend([
        "  </div>",
        "</div>",
    ])
    return "\n".join(lines)


def render_learn_more(meta: dict) -> str:
    section = meta.get("learnMore", {})
    summary_title = section.get("title", f"Understand {display_title(meta)}")
    use_cases_title = section.get("useCasesTitle", "Common Use Cases")
    why_use_title = section.get("whyUseTitle", "Why Use This Tool")
    why_use_items = section.get("whyUseItems", [])
    extra_title = section.get("extraTitle")
    extra_html = section.get("extraHtml")
    lines = [
        '<details class="ds-seo-more">',
        '  <summary class="ds-seo-more__toggle">',
        f'    <span>{esc(summary_title)}</span>',
        '    <span class="ds-seo-more__arrow">&#9662;</span>',
        "  </summary>",
        '  <div class="ds-seo-more__body">',
    ]

    example = meta.get("example")
    if example:
        lines.extend([
            '    <details class="ds-seo-collapse">',
            '      <summary>Example</summary>',
            '      <div class="ds-seo-collapse__body">',
            '        <div class="ds-seo-example">',
            '          <div class="ds-seo-example__row">',
            '            <span class="ds-seo-example__label">Input</span>',
            f'            <span class="ds-seo-example__value">{esc(example["input"])}</span>',
            "          </div>",
            '          <div class="ds-seo-example__row">',
            '            <span class="ds-seo-example__label">Output</span>',
            f'            <span class="ds-seo-example__value">{esc(example["output"])}</span>',
            "          </div>",
            "        </div>",
            "      </div>",
            "    </details>",
        ])

    if meta.get("useCases"):
        lines.extend([
            '    <details class="ds-seo-collapse">',
            f'      <summary>{esc(use_cases_title)}</summary>',
            '      <div class="ds-seo-collapse__body">',
            "        <ul>",
        ])
        for item in meta["useCases"]:
            lines.append(f"          <li>{esc(item)}</li>")
        lines.extend([
            "        </ul>",
            "      </div>",
            "    </details>",
        ])

    if extra_title and extra_html:
        lines.extend([
            '    <details class="ds-seo-collapse">',
            f'      <summary>{esc(extra_title)}</summary>',
            '      <div class="ds-seo-collapse__body">',
            extra_html.rstrip(),
            "      </div>",
            "    </details>",
        ])

    if why_use_items:
        lines.extend([
            '    <details class="ds-seo-collapse">',
            f'      <summary>{esc(why_use_title)}</summary>',
            '      <div class="ds-seo-collapse__body">',
            "        <ul>",
        ])
        for item in why_use_items:
            lines.append(f"          <li>{esc(item)}</li>")
        lines.extend([
            "        </ul>",
            "      </div>",
            "    </details>",
        ])

    faq = meta.get("faq") or []
    lines.extend([
        '    <details class="ds-seo-collapse">',
        '      <summary>Frequently Asked Questions</summary>',
        '      <div class="ds-seo-collapse__body">',
    ])
    for item in faq:
        lines.append(
            f'        <div class="ds-seo-faq-item"><strong>{esc(item["q"])}</strong><p>{esc(item["a"])}</p></div>'
        )
    lines.extend([
        "      </div>",
        "    </details>",
        "  </div>",
        "</details>",
    ])
    return "\n".join(lines)


def render_body_sections(meta: dict, site_map: dict[str, dict]) -> str:
    return "\n\n".join([
        render_seo_content(meta),
        render_related(meta, site_map),
        render_learn_more(meta),
    ])
