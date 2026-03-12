#!/usr/bin/env python3
"""
generate-history-docs.py

Reads a git repository history (READ-ONLY) and generates documentation files
in a dedicated output folder. Never modifies git history, never overwrites
existing files in the repo root.

Generated files (conditional):
  - CHANGELOG-commits.md   → always generated (one entry per commit)
  - CHANGELOG.md           → only if git tags exist (one entry per version)
  - CHANGELOG-features.md  → only if feature/ branches exist (gitflow)

Usage:
    python generate-history-docs.py [--repo <path>] [--output <dir>] [--feature-prefix <prefix>]

Arguments:
    --repo            Path to the git repository (default: current directory)
    --output          Output folder relative to repo root (default: docs/history)
    --feature-prefix  Branch name prefix to detect feature branches (default: feature/)
    --all-branches    Include all branches in commit log (default: current branch only)
    --branch          Analyze a specific named branch (mutually exclusive with --all-branches)

Generated template naming
    With --gen-template the output file name encodes the generation scope:
        enrichment-input_<repo>_<branch>.json         (single branch)
        enrichment-input_<repo>_all-branches.json     (--all-branches)
    Multiple templates for the same repo can coexist without overwriting each other.
    Once filled by an AI agent, save it as git-history-docs/enrichment.json.
"""

import subprocess
import argparse
import json
from pathlib import Path


def run_git(args: list, repo_path: Path) -> str:
    result = subprocess.run(
        ["git"] + args,
        cwd=repo_path,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    return result.stdout.strip()


def get_current_branch(repo_path: Path) -> str:
    """Returns the current git branch name, or 'detached' if HEAD is detached."""
    branch = run_git(["rev-parse", "--abbrev-ref", "HEAD"], repo_path)
    return branch.strip() if branch else "unknown"


def build_template_filename(repo_name: str, branch_mode: str,
                             from_date: str = None, to_date: str = None) -> str:
    """Build the enrichment input filename from the generation parameters.

    Format: enrichment-input_<repo>_<branch>[_<from>][_<to>].json
    Slashes in branch names are replaced with hyphens for filesystem safety.
    This makes it immediately clear that the file is a generated artefact
    (not a hand-edited source) and which scope it covers.
    """
    branch_safe = branch_mode.replace("/", "-").replace(" ", "-")
    parts = ["enrichment-input", repo_name, branch_safe]
    if from_date:
        parts.append(from_date)
    if to_date:
        parts.append(to_date)
    return "_".join(parts) + ".json"


def load_enrichment(path: str) -> dict:
    """Load enrichment JSON. Returns empty dict on missing/invalid file."""
    p = Path(path)
    if not p.exists():
        print(f"  !  Enrichment file not found: {p} — proceeding without descriptions")
        return {}
    try:
        data = json.loads(p.read_text(encoding="utf-8"))
        commits = {k: v for k, v in data.get("commits", {}).items() if not k.startswith("_")}
        versions = {k: v for k, v in data.get("versions", {}).items()
                    if not k.startswith("_") and not v.get("_skip")}
        features = {k: v for k, v in data.get("features", {}).items() if not k.startswith("_")}
        readme = {k: v for k, v in data.get("readme", {}).items() if not k.startswith("_")}
        print(f"  +  Enrichment loaded: {len(commits)} commit descriptions, "
              f"{len(versions)} version entries, {len(features)} feature summaries")
        return {"commits": commits, "versions": versions, "features": features, "readme": readme}
    except Exception as e:
        print(f"  !  Could not parse enrichment file: {e}")
        return {}


def generate_enrichment_template(commits: list, features: list, tags: list,
                                  repo_path: Path, output_path: Path) -> None:
    """Generate a template enrichment JSON to be filled by a human or AI agent.
    Includes the list of changed files for each commit and actual git tags so the AI has full context."""
    commit_entries = {}
    for c in commits:
        files = get_files_changed(c["full_sha"], repo_path)
        commit_entries[c["sha"]] = {
            "_date": c["date"],
            "_message": c["message"],
            "_files_changed": files if files else ["(merge commit — no direct file changes)"],
            "description": ""
        }

    # Build versions section from actual git tags
    version_entries = {
        "_comment": (
            "One entry per git tag. Fill 'added', 'changed', 'fixed', etc. based on "
            "the commits that belong to that version. Leave empty lists [] for unused categories."
        ),
    }
    if tags:
        for t in tags:
            version_entries[t["name"]] = {
                "_date": t["date"],
                "_tag_message": t.get("message", ""),
                "added": [],
                "changed": [],
                "fixed": [],
                "removed": [],
                "security": [],
                "deprecated": [],
            }
    else:
        version_entries["v1.0.0_example"] = {
            "_skip": True,
            "added": ["New feature X"],
            "changed": ["Behaviour Y updated"],
            "fixed": ["Bug Z resolved"],
            "removed": [],
            "security": [],
            "deprecated": []
        }

    template = {
        "_instructions": (
            "Fill the 'description' field for each commit (plain text, no markdown headers). "
            "For 'versions', fill the Added/Changed/Fixed/etc. lists based on commits in that version range. "
            "For 'features', fill 'summary' with a narrative description. "
            "Fields starting with '_' are read-only context — do not remove them but they will be ignored by the generator."
        ),
        "_format_version": "1.0",
        "_repository": repo_path.name,
        "commits": commit_entries,
        "versions": version_entries,
        "features": {
            fb["display_name"]: {
                "_branch": fb["display_name"],
                "summary": ""
            }
            for fb in features
        },
        "readme": {
            "_instructions": (
                "Fill these fields to populate the README.md. All are optional — "
                "missing fields become <!-- TODO --> placeholders in the generated file."
            ),
            "description": "",
            "badges": [],
            "installation": "",
            "usage": "",
            "contributing": "",
            "license": ""
        }
    }
    output_path.write_text(json.dumps(template, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n  Template saved: {output_path}")
    print("  Next step: ask an AI agent to fill 'description' / 'summary' fields, then run:")
    print(f"  python generate-history-docs.py --enrichment-file {output_path}\n")




def get_commits(repo_path: Path, all_branches: bool, branch: str = None) -> list:
    if all_branches:
        flags = ["--all"]
    elif branch:
        flags = [branch]
    else:
        flags = []
    raw = run_git(["log", "--reverse", "--format=%H|%ai|%s"] + flags, repo_path)
    commits = []
    for line in raw.splitlines():
        parts = line.split("|", 2)
        if len(parts) == 3:
            sha, date, message = parts
            commits.append({
                "sha": sha[:7],
                "full_sha": sha.strip(),
                "date": date[:10],
                "message": message.strip(),
            })
    return commits


def get_tags(repo_path: Path) -> list:
    raw = run_git(
        ["tag", "--list", "--sort=version:refname",
         "--format=%(refname:short)|%(creatordate:short)|%(subject)"],
        repo_path,
    )
    tags = []
    for line in raw.splitlines():
        if not line.strip():
            continue
        parts = line.split("|", 2)
        tags.append({
            "name": parts[0].strip(),
            "date": parts[1].strip() if len(parts) > 1 else "",
            "message": parts[2].strip() if len(parts) > 2 else "",
        })
    return tags


def get_feature_branches(repo_path: Path, prefix: str) -> list:
    raw = run_git(
        ["branch", "-a", "--format=%(refname:short)|%(objectname:short)|%(authordate:short)"],
        repo_path,
    )
    seen_names = set()
    features = []
    for line in raw.splitlines():
        if prefix not in line:
            continue
        parts = line.split("|", 2)
        full_name = parts[0].strip()
        # Strip remote prefixes to get canonical name for deduplication
        # git branch -a shows: local as "feature/..." and remote as "origin/feature/..." or "remotes/origin/feature/..."
        canonical = full_name
        for remote_prefix in ("remotes/origin/", "origin/"):
            if canonical.startswith(remote_prefix):
                canonical = canonical[len(remote_prefix):]
                break
        if canonical in seen_names:
            continue
        seen_names.add(canonical)
        features.append({
            "name": full_name,
            "display_name": canonical,
            "sha": parts[1].strip() if len(parts) > 1 else "",
            "date": parts[2].strip() if len(parts) > 2 else "",
        })
    return features


def get_files_changed(full_sha: str, repo_path: Path) -> list:
    raw = run_git(
        ["diff-tree", "--no-commit-id", "-r", "--name-status", full_sha],
        repo_path,
    )
    status_labels = {"A": "Added", "M": "Modified", "D": "Deleted", "R": "Renamed", "C": "Copied"}
    files = []
    for line in raw.splitlines():
        if not line.strip():
            continue
        parts = line.split("\t", 1)
        if len(parts) == 2:
            status = status_labels.get(parts[0][0], parts[0])
            files.append(f"- `{parts[1].strip()}` ({status})")
    return files


def get_base_refs(repo_path: Path) -> list:
    base_refs = []
    for base in ("main", "develop", "master"):
        check = run_git(["rev-parse", "--verify", base], repo_path)
        if check:
            base_refs.append(base)
    return base_refs


def get_commits_for_branch(branch_ref: str, repo_path: Path) -> list:
    """Returns commit lines unique to this branch (not reachable from main/develop/master)."""
    base_refs = get_base_refs(repo_path)
    not_args = ["--not"] + base_refs if base_refs else []
    raw = run_git(
        ["log", "--format=%h|%as|%s", branch_ref] + not_args,
        repo_path,
    )
    return raw.splitlines() if raw else []


def find_merge_commit(branch_ref: str, repo_path: Path):
    """Find the merge commit where this branch was merged into main/develop/master."""
    for base in ("main", "develop", "master"):
        check = run_git(["rev-parse", "--verify", base], repo_path)
        if not check:
            continue
        raw = run_git(
            ["log", "--merges", "--format=%h|%as|%s",
             "--ancestry-path", f"{branch_ref}..{base}"],
            repo_path,
        )
        for line in raw.splitlines():
            parts = line.split("|", 2)
            if len(parts) == 3 and "Merge" in parts[2]:
                return {"sha": parts[0], "date": parts[1], "message": parts[2]}
    return None


# ---------------------------------------------------------------------------
# File generators
# ---------------------------------------------------------------------------

GENERATED_HEADER = "_Generato automaticamente da `generate-history-docs.py`. Non modificare manualmente._\n\n"


def generate_changelog_commits(commits: list, repo_path: Path, output_file: Path, enrichment: dict) -> None:
    commit_enrichment = enrichment.get("commits", {})
    lines = [
        "# Changelog — Per Commit\n\n",
        GENERATED_HEADER,
        "---\n\n",
    ]
    for c in reversed(commits):
        lines.append(f"## {c['date']} — `{c['sha']}` — {c['message']}\n\n")
        desc = commit_enrichment.get(c["sha"], {}).get("description", "")
        if desc:
            lines.append(f"{desc}\n\n")
        files = get_files_changed(c["full_sha"], repo_path)
        if files:
            lines.append("**File modificati:**\n\n")
            lines.extend(f"{f}\n" for f in files)
            lines.append("\n")
        else:
            lines.append("_(nessun file rilevato — potrebbe essere un merge commit)_\n\n")
    output_file.write_text("".join(lines), encoding="utf-8")
    print(f"  \u2713  {output_file.relative_to(repo_path)}")


VERSION_SECTIONS = [
    ("added",      "### Added"),
    ("changed",    "### Changed"),
    ("fixed",      "### Fixed"),
    ("removed",    "### Removed"),
    ("security",   "### Security"),
    ("deprecated", "### Deprecated"),
]

def generate_changelog_versions(tags: list, output_file: Path, repo_path: Path, enrichment: dict) -> None:
    version_enrichment = enrichment.get("versions", {})
    lines = [
        "# Changelog — Per Versione\n\n",
        GENERATED_HEADER,
        "Il formato segue [Keep a Changelog](https://keepachangelog.com/it/1.0.0/).\n\n",
        "---\n\n",
        "## [Unreleased]\n\n",
    ]
    for tag in reversed(tags):
        lines.append(f"## [{tag['name']}] — {tag['date']}\n\n")
        entry = version_enrichment.get(tag["name"], {})
        has_sections = any(entry.get(k) for k, _ in VERSION_SECTIONS)
        if has_sections:
            for key, header in VERSION_SECTIONS:
                items = entry.get(key, [])
                if items:
                    lines.append(f"{header}\n\n")
                    lines.extend(f"- {item}\n" for item in items)
                    lines.append("\n")
        elif tag["message"]:
            lines.append(f"{tag['message']}\n\n")
    output_file.write_text("".join(lines), encoding="utf-8")
    print(f"  \u2713  {output_file.relative_to(repo_path)}")


def generate_changelog_features(features: list, repo_path: Path, output_file: Path, enrichment: dict) -> None:
    feature_enrichment = enrichment.get("features", {})
    lines = [
        "# Changelog — Per Feature (Gitflow)\n\n",
        GENERATED_HEADER,
        "---\n\n",
    ]
    for fb in features:
        lines.append(f"## Feature: `{fb['display_name']}`\n\n")

        summary = feature_enrichment.get(fb["display_name"], {}).get("summary", "")
        if summary:
            lines.append(f"{summary}\n\n")

        merge = find_merge_commit(fb["name"], repo_path)
        if merge:
            lines.append(f"**Stato**: merged il {merge['date']} (`{merge['sha']}`)\n\n")
        else:
            lines.append("**Stato**: aperta (non ancora mergiata in main/develop)\n\n")

        branch_commits = get_commits_for_branch(fb["name"], repo_path)
        if branch_commits:
            lines.append("**Commit:**\n\n")
            for line in branch_commits:
                parts = line.split("|", 2)
                if len(parts) == 3:
                    lines.append(f"- `{parts[0]}` {parts[1]} — {parts[2]}\n")
            lines.append("\n")
        else:
            lines.append("_(nessun commit esclusivo — tutti i commit sono già raggiungibili da main/develop)_\n\n")

        lines.append("---\n\n")

    output_file.write_text("".join(lines), encoding="utf-8")
    print(f"  \u2713  {output_file.relative_to(repo_path)}")


def generate_readme(
    repo_name: str,
    features: list,
    tags: list,
    output_file: Path,
    repo_path: Path,
    output_dir: Path,
    enrichment: dict,
) -> None:
    readme_e = enrichment.get("readme", {})
    feature_e = enrichment.get("features", {})
    version_e = enrichment.get("versions", {})

    # Relative path from repo root to the output dir (for CHANGELOG links)
    try:
        changelog_rel = output_dir.relative_to(repo_path).as_posix()
    except ValueError:
        changelog_rel = str(output_dir)

    TODO = "<!-- TODO: compilare manualmente -->"

    lines = [f"# {repo_name}\n\n"]

    # Description
    description = readme_e.get("description", "")
    lines.append(f"{description}\n\n" if description else f"{TODO}\n\n")

    # Badges (optional, list of markdown badge strings)
    badges = [b for b in readme_e.get("badges", []) if b]
    if badges:
        lines.extend(f"{b}  \n" for b in badges)
        lines.append("\n")

    lines.append("---\n\n")

    # Features — auto-generated from feature branches
    if features:
        lines.append("## Features\n\n")
        for fb in features:
            summary = feature_e.get(fb["display_name"], {}).get("summary", "")
            if summary:
                first_sentence = summary.split(".")[0].strip() + "."
                lines.append(f"- **`{fb['display_name']}`** — {first_sentence}\n")
            else:
                lines.append(f"- **`{fb['display_name']}`**\n")
        lines.append("\n")

    # Latest version — auto-generated from most recent git tag
    if tags:
        latest = tags[-1]
        lines.append("## Ultima Versione\n\n")
        lines.append(f"### [{latest['name']}] — {latest['date']}\n\n")
        entry = version_e.get(latest["name"], {})
        has_sections = any(entry.get(k) for k in ("added", "changed", "fixed", "removed", "security", "deprecated"))
        if has_sections:
            for key, label in (("added", "Added"), ("changed", "Changed"),
                               ("fixed", "Fixed"), ("removed", "Removed"), ("security", "Security")):
                items = entry.get(key, [])
                if items:
                    lines.append(f"**{label}:**\n\n")
                    lines.extend(f"- {item}\n" for item in items)
                    lines.append("\n")
        elif latest.get("message"):
            lines.append(f"{latest['message']}\n\n")
        lines.append("\n")

    # Changelog links — always present
    lines.append("## Changelog\n\n")
    lines.append(f"- [Changelog per commit]({changelog_rel}/CHANGELOG-commits.md)\n")
    if tags:
        lines.append(f"- [Changelog per versione]({changelog_rel}/CHANGELOG.md)\n")
    if features:
        lines.append(f"- [Changelog per feature]({changelog_rel}/CHANGELOG-features.md)\n")
    lines.append("\n")

    # Installation
    lines.append("## Installazione\n\n")
    installation = readme_e.get("installation", "")
    lines.append(f"{installation}\n\n" if installation else f"{TODO}\n\n")

    # Usage
    lines.append("## Utilizzo\n\n")
    usage = readme_e.get("usage", "")
    lines.append(f"{usage}\n\n" if usage else f"{TODO}\n\n")

    # Contributing (only if enrichment provides it)
    contributing = readme_e.get("contributing", "")
    if contributing:
        lines.append("## Contributing\n\n")
        lines.append(f"{contributing}\n\n")

    # License
    lines.append("## Licenza\n\n")
    license_text = readme_e.get("license", "")
    lines.append(f"{license_text}\n\n" if license_text else f"{TODO}\n\n")

    lines.append("---\n\n")
    lines.append(f"_{GENERATED_HEADER.strip()}_\n")

    output_file.write_text("".join(lines), encoding="utf-8")
    print(f"  \u2713  {output_file.relative_to(repo_path)}")
    print(f"       (copia in {repo_path / 'README.md'} per usarlo come README del repo)")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generates git history documentation (read-only — does not modify git).",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("--repo", default=".", help="Path to the git repository (default: .)")
    parser.add_argument("--output", default="docs/history", help="Output folder relative to repo root (default: docs/history)")
    parser.add_argument("--feature-prefix", default="feature/", dest="feature_prefix",
                        help="Branch name prefix to detect feature branches (default: feature/)")
    parser.add_argument("--all-branches", action="store_true", dest="all_branches",
                        help="Include commits from all branches (default: current branch only)")
    parser.add_argument("--branch", default=None,
                        help="Analyze a specific branch by name (e.g. feature/my-feature). "
                             "Mutually exclusive with --all-branches.")
    parser.add_argument("--enrichment-file", dest="enrichment_file", default=None,
                        help="Path to enrichment JSON file with AI-generated descriptions")
    parser.add_argument("--gen-template", action="store_true", dest="gen_template",
                        help="Generate an enrichment JSON template and exit")
    parser.add_argument("--readme", action="store_true", dest="gen_readme",
                        help="Also generate a README.md in the output folder (default: false)")
    args = parser.parse_args()

    if args.all_branches and args.branch:
        print("ERROR: --all-branches and --branch are mutually exclusive.")
        raise SystemExit(1)

    repo_path = Path(args.repo).resolve()

    git_dir = run_git(["rev-parse", "--git-dir"], repo_path)
    if not git_dir:
        print(f"ERROR: '{repo_path}' is not a git repository.")
        raise SystemExit(1)

    # Validate --branch exists in the repo
    if args.branch:
        branch_check = run_git(["rev-parse", "--verify", args.branch], repo_path)
        if not branch_check:
            print(f"ERROR: branch '{args.branch}' not found in this repository.")
            print("       Use 'git branch -a' to list available branches.")
            raise SystemExit(1)

    output_dir = repo_path / args.output
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"\n=== Git History Docs Generator ===")
    print(f"Repository:     {repo_path}")
    if args.all_branches:
        print(f"Scope:          all branches")
    elif args.branch:
        print(f"Scope:          branch '{args.branch}'")
    else:
        print(f"Scope:          current branch ({get_current_branch(repo_path)})")

    commits = get_commits(repo_path, args.all_branches, args.branch)
    tags = get_tags(repo_path)
    features = get_feature_branches(repo_path, args.feature_prefix)

    print(f"Commit:         {len(commits)}")
    print(f"Tag (versioni): {len(tags)}")
    print(f"Feature branch: {len(features)}")

    # --gen-template: build a context-rich filename from generation params, then exit
    if args.gen_template:
        if args.all_branches:
            branch_mode = "all-branches"
        elif args.branch:
            branch_mode = args.branch
        else:
            branch_mode = get_current_branch(repo_path)
        # from_date / to_date will be wired here once those args are added
        filename = build_template_filename(
            repo_name=repo_path.name,
            branch_mode=branch_mode,
        )
        template_path = output_dir / filename
        generate_enrichment_template(commits, features, tags, repo_path, template_path)
        return

    # Load enrichment data if provided
    enrichment = load_enrichment(args.enrichment_file) if args.enrichment_file else {}

    print(f"Output:         {output_dir.relative_to(repo_path)}\n")

    generate_changelog_commits(commits, repo_path, output_dir / "CHANGELOG-commits.md", enrichment)

    if tags:
        generate_changelog_versions(tags, output_dir / "CHANGELOG.md", repo_path, enrichment)
    else:
        print("  !  Nessun tag trovato -> CHANGELOG.md (versioni) non generato")

    if features:
        generate_changelog_features(features, repo_path, output_dir / "CHANGELOG-features.md", enrichment)
    else:
        print(f"  !  Nessun branch '{args.feature_prefix}*' trovato -> CHANGELOG-features.md non generato")

    if args.gen_readme:
        generate_readme(
            repo_name=repo_path.name,
            features=features,
            tags=tags,
            output_file=output_dir / "README.md",
            repo_path=repo_path,
            output_dir=output_dir,
            enrichment=enrichment,
        )
    else:
        print("  (usa --readme per generare anche README.md)")

    print("\nCompletato.")


if __name__ == "__main__":
    main()
