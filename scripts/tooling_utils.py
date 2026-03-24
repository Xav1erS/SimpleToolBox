#!/usr/bin/env python3
from __future__ import annotations

import ast
import json
import re
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public"
TOOLS_DIR = PUBLIC_DIR / "tools"
REPORTS_DIR = ROOT / "reports"
TOOLS_META_PATH = PUBLIC_DIR / "tools-meta.js"
TOOLS_DATA_PATH = PUBLIC_DIR / "tools-data.js"

ALLOWED_TOOL_TAGS = {
    "image",
    "text",
    "encode",
    "format",
    "convert",
    "generate",
    "calculator",
    "design",
    "reference",
    "pdf",
}


def ensure_reports_dir() -> Path:
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    return REPORTS_DIR


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def list_tool_files() -> list[Path]:
    return sorted(TOOLS_DIR.glob("*.html"))


def list_tool_slugs() -> list[str]:
    return [path.stem for path in list_tool_files()]


def strip_js_comments(source: str) -> str:
    source = re.sub(r"/\*.*?\*/", "", source, flags=re.DOTALL)
    source = re.sub(r"^\s*//.*$", "", source, flags=re.MULTILINE)
    return source


def extract_js_array(source: str, variable_name: str) -> str:
    pattern = re.compile(rf"\b(?:const|let|var)\s+{re.escape(variable_name)}\s*=\s*\[", re.MULTILINE)
    match = pattern.search(source)
    if not match:
        raise ValueError(f"Variable {variable_name} not found")

    start = match.end() - 1
    depth = 0
    in_single = False
    in_double = False
    escaped = False

    for idx in range(start, len(source)):
        ch = source[idx]
        if escaped:
            escaped = False
            continue
        if ch == "\\" and (in_single or in_double):
            escaped = True
            continue
        if ch == "'" and not in_double:
            in_single = not in_single
            continue
        if ch == '"' and not in_single:
            in_double = not in_double
            continue
        if in_single or in_double:
            continue
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                return source[start : idx + 1]

    raise ValueError(f"Could not extract array for {variable_name}")


def js_object_array_to_python_literal(array_source: str) -> str:
    cleaned = strip_js_comments(array_source)
    cleaned = re.sub(r"\btrue\b", "True", cleaned)
    cleaned = re.sub(r"\bfalse\b", "False", cleaned)
    cleaned = re.sub(r"\bnull\b", "None", cleaned)
    cleaned = quote_unquoted_object_keys(cleaned)
    return cleaned


def quote_unquoted_object_keys(source: str) -> str:
    out: list[str] = []
    i = 0
    in_single = False
    in_double = False
    escaped = False
    expecting_key = False

    while i < len(source):
        ch = source[i]

        if escaped:
            out.append(ch)
            escaped = False
            i += 1
            continue

        if (in_single or in_double) and ch == "\\":
            out.append(ch)
            escaped = True
            i += 1
            continue

        if not in_double and ch == "'":
            in_single = not in_single
            out.append(ch)
            i += 1
            continue

        if not in_single and ch == '"':
            in_double = not in_double
            out.append(ch)
            i += 1
            continue

        if in_single or in_double:
            out.append(ch)
            i += 1
            continue

        if ch in "{,":
            expecting_key = True
            out.append(ch)
            i += 1
            continue

        if expecting_key:
            if ch.isspace():
                out.append(ch)
                i += 1
                continue

            if ch.isalpha() or ch == "_":
                start = i
                while i < len(source) and (source[i].isalnum() or source[i] == "_"):
                    i += 1
                ident = source[start:i]
                j = i
                while j < len(source) and source[j].isspace():
                    j += 1
                if j < len(source) and source[j] == ":":
                    out.append(f'"{ident}"')
                    expecting_key = False
                    continue
                out.append(ident)
                expecting_key = False
                continue

            expecting_key = False

        out.append(ch)
        i += 1

    return "".join(out)


def parse_js_array_variable(path: Path, variable_name: str) -> list[dict[str, Any]]:
    source = read_text(path)
    array_source = extract_js_array(source, variable_name)
    literal = js_object_array_to_python_literal(array_source)
    data = ast.literal_eval(literal)
    if not isinstance(data, list):
        raise ValueError(f"{variable_name} in {path.name} is not a list")
    return data


def load_tools_meta() -> list[dict[str, Any]]:
    return parse_js_array_variable(TOOLS_META_PATH, "TOOLS_META")


def load_site_tools() -> list[dict[str, Any]]:
    return parse_js_array_variable(TOOLS_DATA_PATH, "SITE_TOOLS")


def save_json_report(filename: str, payload: dict[str, Any]) -> Path:
    ensure_reports_dir()
    out = REPORTS_DIR / filename
    out.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    return out
