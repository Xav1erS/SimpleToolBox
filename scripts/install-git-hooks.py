#!/usr/bin/env python3
from __future__ import annotations

import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    hook_path = ".githooks"
    subprocess.run(
        ["git", "config", "core.hooksPath", hook_path],
        cwd=ROOT,
        check=True,
    )
    print(f"Git hooks installed: core.hooksPath -> {hook_path}")


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as exc:
        print(f"Failed to install git hooks: {exc}", file=sys.stderr)
        raise
