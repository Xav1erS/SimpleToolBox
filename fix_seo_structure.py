#!/usr/bin/env python3
"""
Batch-fix all tool pages in public/tools/:
1. Remove duplicate ds-seo-more blocks (keep first = correct one)
2. Fix ds-seo-more structure:
   - <summary>TEXT</summary> → <summary class="ds-seo-more__toggle"><span>TEXT</span><span class="ds-seo-more__arrow">&#9662;</span></summary>
   - <div class="ds-seo-content"> inside ds-seo-more → <div class="ds-seo-more__body">
3. Remove <div class="ds-faq-list"> wrapper (unwrap children)
4. Rename class="ds-faq-item" → class="ds-seo-faq-item"
"""

import os
import re

TOOLS_DIR = os.path.join(os.path.dirname(__file__), 'public', 'tools')


def find_matching_details_end(content, after_open):
    """Find position after </details> matching the <details> whose interior starts at after_open."""
    depth = 0
    pos = after_open
    while pos < len(content):
        next_open  = content.find('<details', pos)
        next_close = content.find('</details>', pos)

        if next_close == -1:
            return -1

        if next_open != -1 and next_open < next_close:
            depth += 1
            pos = next_open + len('<details')
        else:
            if depth == 0:
                return next_close + len('</details>')
            depth -= 1
            pos = next_close + len('</details>')
    return -1


def remove_second_seo_more(content):
    """If there are two <details class="ds-seo-more"> blocks, remove the second one."""
    MARKER = '<details class="ds-seo-more">'

    first_pos = content.find(MARKER)
    if first_pos == -1:
        return content, False

    after_first = first_pos + len(MARKER) - 1  # just past the '>' is not needed; we need pos inside
    # find_matching_details_end expects pos to be INSIDE the block (after <details)
    after_first_tag = first_pos + len('<details')
    first_end = find_matching_details_end(content, after_first_tag)
    if first_end == -1:
        return content, False

    second_pos = content.find(MARKER, first_end)
    if second_pos == -1:
        return content, False

    after_second_tag = second_pos + len('<details')
    second_end = find_matching_details_end(content, after_second_tag)
    if second_end == -1:
        return content, False

    # Remove second block; strip surrounding blank lines cleanly
    before = content[:second_pos].rstrip('\n')
    after  = content[second_end:].lstrip('\n')
    return before + '\n' + after, True


def fix_seo_more_summary(content):
    """
    Replace the bare <summary>TEXT</summary> (toggle summary) inside ds-seo-more
    with <summary class="ds-seo-more__toggle"><span>TEXT</span><span class="ds-seo-more__arrow">&#9662;</span></summary>.
    Only processes blocks that don't already have ds-seo-more__toggle.
    """
    if 'class="ds-seo-more__toggle"' in content:
        return content, False

    MARKER = '<details class="ds-seo-more">'
    block_start = content.find(MARKER)
    if block_start == -1:
        return content, False

    # Find the first <summary> after the opening tag
    summary_open_pos = content.find('<summary>', block_start)
    if summary_open_pos == -1:
        return content, False

    summary_close_pos = content.find('</summary>', summary_open_pos)
    if summary_close_pos == -1:
        return content, False

    summary_close_end = summary_close_pos + len('</summary>')
    text = content[summary_open_pos + len('<summary>'):summary_close_pos].strip()

    # Get indentation of the summary line
    line_start = content.rfind('\n', 0, summary_open_pos) + 1
    indent = content[line_start:summary_open_pos]  # whitespace before <summary>

    new_summary = (
        f'{indent}<summary class="ds-seo-more__toggle">'
        f'<span>{text}</span>'
        f'<span class="ds-seo-more__arrow">&#9662;</span>'
        f'</summary>'
    )

    return content[:line_start] + new_summary + content[summary_close_end:], True


def fix_seo_more_body_wrapper(content):
    """
    Inside ds-seo-more, replace the first <div class="ds-seo-content">
    with <div class="ds-seo-more__body">.
    """
    if 'ds-seo-more__body' in content:
        return content, False

    MARKER = '<details class="ds-seo-more">'
    block_start = content.find(MARKER)
    if block_start == -1:
        return content, False

    # Find end of block to constrain search
    after_tag = block_start + len('<details')
    block_end = find_matching_details_end(content, after_tag)
    if block_end == -1:
        return content, False

    OLD = '<div class="ds-seo-content">'
    NEW = '<div class="ds-seo-more__body">'

    div_pos = content.find(OLD, block_start)
    if div_pos == -1 or div_pos >= block_end:
        return content, False

    return content[:div_pos] + NEW + content[div_pos + len(OLD):], True


def remove_faq_list_wrapper(content):
    """
    Remove <div class="ds-faq-list"> wrapper divs, keeping their children.
    Matches by indentation: the closing </div> at the same indent as the opening tag.
    """
    if 'class="ds-faq-list"' not in content:
        return content, False

    lines = content.split('\n')
    result = []
    changed = False
    i = 0

    while i < len(lines):
        line = lines[i]
        stripped = line.lstrip()

        if stripped.startswith('<div') and 'class="ds-faq-list"' in stripped:
            # Determine indentation of this wrapper div
            faq_indent = len(line) - len(stripped)
            changed = True
            i += 1
            depth = 0  # track nested divs inside

            while i < len(lines):
                inner = lines[i]
                inner_stripped = inner.strip()

                if not inner_stripped:
                    result.append(inner)
                    i += 1
                    continue

                inner_indent = len(inner) - len(inner.lstrip())

                # A line containing ONLY </div> at the same indent level → closing tag of ds-faq-list
                if inner_stripped == '</div>' and inner_indent == faq_indent and depth == 0:
                    i += 1
                    break  # skip this closing tag

                # Track depth from <div ... > and </div> on this line
                opens  = inner_stripped.count('<div')
                closes = inner_stripped.count('</div>')
                depth += opens - closes

                result.append(inner)
                i += 1
        else:
            result.append(line)
            i += 1

    return '\n'.join(result), changed


def fix_faq_item_class(content):
    """Replace class="ds-faq-item" with class="ds-seo-faq-item"."""
    if 'ds-faq-item' not in content:
        return content, False
    new = content.replace('class="ds-faq-item"', 'class="ds-seo-faq-item"')
    return new, new != content


def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    changes = []

    content, c = remove_second_seo_more(content)
    if c:
        changes.append('removed duplicate block')

    content, c = fix_seo_more_summary(content)
    if c:
        changes.append('fixed summary toggle')

    content, c = fix_seo_more_body_wrapper(content)
    if c:
        changes.append('fixed body wrapper')

    content, c = remove_faq_list_wrapper(content)
    if c:
        changes.append('removed faq-list wrapper')

    content, c = fix_faq_item_class(content)
    if c:
        changes.append('renamed faq-item class')

    if content != original:
        with open(filepath, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        return changes
    return []


def main():
    files = sorted(f for f in os.listdir(TOOLS_DIR) if f.endswith('.html'))
    total = 0
    for filename in files:
        path = os.path.join(TOOLS_DIR, filename)
        changes = process_file(path)
        if changes:
            total += 1
            print(f'  {filename}: {", ".join(changes)}')
    print(f'\nDone. {total} file(s) updated.')


if __name__ == '__main__':
    main()
