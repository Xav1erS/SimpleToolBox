#!/usr/bin/env python3
from __future__ import annotations

import html
import json
import re
from pathlib import Path

from tooling_utils import TOOLS_META_PATH, TOOLS_DIR, load_site_tools, load_tools_meta


def strip_tags(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def clean_text(value: str) -> str:
    value = strip_tags(value)
    value = value.replace("’", "'")
    return value.strip(" -·")


def first_match(pattern: str, content: str, flags: int = 0) -> str | None:
    match = re.search(pattern, content, flags)
    return match.group(1).strip() if match else None


def extract_related(content: str) -> list[str]:
    slugs = []
    for href in re.findall(r'href="([^"]+\.html)" class="ds-related-card"', content):
        slug = href.split("/")[-1].replace(".html", "")
        if slug not in slugs:
            slugs.append(slug)
    return slugs


def extract_faqs(content: str) -> list[dict[str, str]]:
    faqs = []
    for block in re.findall(r'<div class="ds-seo-faq-item">(.*?)</div>', content, re.DOTALL):
        q = first_match(r"<strong>(.*?)</strong>", block, re.DOTALL) or first_match(r"<h3>(.*?)</h3>", block, re.DOTALL)
        a = first_match(r"<p>(.*?)</p>", block, re.DOTALL)
        if q and a:
            faqs.append({"q": clean_text(q), "a": clean_text(a)})
    return faqs


def extract_use_cases(content: str) -> list[str]:
    patterns = [
        r"<summary>Common Use Cases</summary>\s*<div class=\"ds-seo-collapse__body\">(.*?)</div>\s*</details>",
        r"<summary>Use Cases</summary>\s*<div class=\"ds-seo-collapse__body\">(.*?)</div>\s*</details>",
        r"<summary>Common Date Calculations</summary>\s*<div class=\"ds-seo-collapse__body\">(.*?)</div>\s*</details>",
    ]
    for pattern in patterns:
        block = first_match(pattern, content, re.DOTALL)
        if not block:
            continue
        items = [clean_text(item) for item in re.findall(r"<li>(.*?)</li>", block, re.DOTALL)]
        items = [item for item in items if item]
        if items:
            return items
    return []


def extract_example(content: str) -> dict[str, str] | None:
    block = first_match(r"<summary>Example</summary>\s*<div class=\"ds-seo-collapse__body\">(.*?)</div>\s*</details>", content, re.DOTALL)
    if not block:
        return None

    rows = re.findall(
        r'<span class="ds-seo-example__label">(.*?)</span>\s*<span class="ds-seo-example__value">(.*?)</span>',
        block,
        re.DOTALL,
    )
    if rows:
        data = {clean_text(label).lower(): clean_text(value) for label, value in rows}
        if data.get("input") and data.get("output"):
            return {"input": data["input"], "output": data["output"]}

    paras = [clean_text(p) for p in re.findall(r"<p>(.*?)</p>", block, re.DOTALL)]
    if len(paras) >= 2:
        return {"input": paras[0], "output": paras[1]}
    return None


def fallback_faqs(title: str) -> list[dict[str, str]]:
    return [
        {"q": f"What does {title} do?", "a": f"{title} runs entirely in your browser and helps you complete this task without uploading data to a server."},
        {"q": f"Is {title} free to use?", "a": "Yes. This tool is free to use and does not require sign-up."},
        {"q": "Is my data private?", "a": "Yes. All processing happens locally in your browser unless the tool explicitly says otherwise."},
    ]


def fallback_use_cases(title: str) -> list[str]:
    return [
        f"Quickly complete common {title.lower()} tasks in the browser",
        f"Verify {title.lower()} results without installing desktop software",
    ]


def merge_unique_text_dicts(items: list[dict[str, str]]) -> list[dict[str, str]]:
    seen = set()
    result = []
    for item in items:
        key = (item["q"].strip(), item["a"].strip())
        if key in seen:
            continue
        seen.add(key)
        result.append(item)
    return result


def pick_related(slug: str, related: list[str], category: str, slugs_by_category: dict[str, list[str]]) -> list[str]:
    merged = [item for item in related if item != slug]
    for candidate in slugs_by_category.get(category, []):
        if candidate != slug and candidate not in merged:
            merged.append(candidate)
        if len(merged) >= 3:
            break
    return merged[:3]


def to_js_literal(value, indent=0) -> str:
    space = " " * indent
    if isinstance(value, dict):
        lines = ["{"]
        items = list(value.items())
        for idx, (key, val) in enumerate(items):
            suffix = "," if idx < len(items) - 1 else ""
            lines.append(f"{space}  {key}: {to_js_literal(val, indent + 2)}{suffix}")
        lines.append(f"{space}}}")
        return "\n".join(lines)
    if isinstance(value, list):
        if not value:
            return "[]"
        lines = ["["]
        for idx, item in enumerate(value):
            suffix = "," if idx < len(value) - 1 else ""
            lines.append(f"{space}  {to_js_literal(item, indent + 2)}{suffix}")
        lines.append(f"{space}]")
        return "\n".join(lines)
    return json.dumps(value, ensure_ascii=False)


def build_tools_meta() -> list[dict]:
    existing = {item["slug"]: item for item in load_tools_meta()}
    site_tools = load_site_tools()
    slugs_by_category: dict[str, list[str]] = {}
    for item in site_tools:
        slug = item["href"].split("/")[-1].replace(".html", "")
        slugs_by_category.setdefault(item["tag"], []).append(slug)

    built = []
    for site_item in site_tools:
        slug = site_item["href"].split("/")[-1].replace(".html", "")
        html_path = TOOLS_DIR / f"{slug}.html"
        content = html_path.read_text(encoding="utf-8")
        title = first_match(r"<title>(.*?)</title>", content, re.DOTALL) or site_item["name"]
        title = title.split("|")[0].strip().replace(" — ", " – ")
        description = first_match(r'<meta name="description" content="(.*?)"', content) or site_item["desc"]
        category = site_item["tag"]
        related = extract_related(content)
        faqs = extract_faqs(content)
        use_cases = extract_use_cases(content)
        example = extract_example(content)

        if slug in existing:
            item = dict(existing[slug])
            item["title"] = item.get("title") or title
            item["description"] = item.get("description") or description
            item["category"] = item.get("category") or category
            item["relatedTools"] = pick_related(slug, item.get("relatedTools") or related, item["category"], slugs_by_category)
            item["faq"] = merge_unique_text_dicts((item.get("faq") or []) + faqs)
            if len(item["faq"]) < 3:
                item["faq"] = merge_unique_text_dicts(item["faq"] + fallback_faqs(item["title"]))
            item["faq"] = item["faq"][:4]
            if item.get("useCases"):
                item["useCases"] = item["useCases"]
            else:
                item["useCases"] = use_cases or fallback_use_cases(item["title"])
            if not item.get("example") and example:
                item["example"] = example
        else:
            item = {
                "slug": slug,
                "title": title,
                "description": description,
                "category": category,
                "relatedTools": pick_related(slug, related, category, slugs_by_category),
                "useCases": use_cases or fallback_use_cases(title),
                "faq": merge_unique_text_dicts(faqs + fallback_faqs(title))[:4],
            }
            if example:
                item["example"] = example

        if len(item["faq"]) < 3:
            item["faq"] = merge_unique_text_dicts(item["faq"] + fallback_faqs(item["title"]))[:4]
        if len(item["relatedTools"]) < 3:
            item["relatedTools"] = pick_related(slug, item["relatedTools"], item["category"], slugs_by_category)
        built.append(item)

    return built


def write_tools_meta(items: list[dict]) -> None:
    header = """/**
 * tools-meta.js
 * Rich metadata for each tool — used for validation, future SEO tooling,
 * and as the single source of truth for tool content.
 *
 * This file is NOT loaded by tool pages directly.
 * It is used by validation scripts and future metadata-driven workflows.
 */

const TOOLS_META = [
"""
    body = []
    for idx, item in enumerate(items):
        suffix = "," if idx < len(items) - 1 else ""
        body.append("  " + to_js_literal(item, indent=2).replace("\n", "\n  ") + suffix)

    footer = """
];

if (typeof module !== 'undefined') module.exports = { TOOLS_META };
"""
    TOOLS_META_PATH.write_text(header + "\n".join(body) + footer, encoding="utf-8")


def main() -> None:
    items = build_tools_meta()
    write_tools_meta(items)
    print(f"Generated {len(items)} tools into {TOOLS_META_PATH}")


if __name__ == "__main__":
    main()
