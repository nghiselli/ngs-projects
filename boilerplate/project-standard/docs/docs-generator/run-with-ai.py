#!/usr/bin/env python3
"""
run-with-ai.py

Full workflow automation for git-history-docs:
  1. Generates enrichment-input template (--gen-template)
  2. Calls an AI to fill commit descriptions, feature summaries and README fields
  3. Saves the result as git-history-docs/enrichment.json
  4. Re-runs generate-history-docs.py with --readme and --enrichment-file
  5. Optionally promotes README.md and CHANGELOG.md to the repo root

Supported providers (--provider):
  copilot      GitHub Copilot API  -- Claude Sonnet 4.6 via REST API (default, RECOMMENDED)
                                      Requires: gh auth login + GitHub Copilot Pro/Business
  copilot-cli  GitHub Copilot CLI  -- delegates to 'gh copilot -p' agent (writes files directly)
                                      Requires: gh auth login + GitHub Copilot Pro/Business
                                      Difference from 'copilot': no JSON parsing, agent autonomy
  github       GitHub Models API   -- GPT-4o and others (no Claude on this endpoint)
                                      Requires: gh auth login
  openai       OpenAI API          -- paid per-token (NOT included in ChatGPT Plus)
                                      Requires: OPENAI_API_KEY env var  (platform.openai.com)
  anthropic    Anthropic API       -- paid per-token, Claude Sonnet/Opus
                                      Requires: ANTHROPIC_API_KEY env var  (console.anthropic.com)
  codex        Codex CLI agent     -- delegates to 'codex --full-auto' (writes files directly)
                                      Requires: npm install -g @openai/codex + OPENAI_API_KEY
  ollama       Local Ollama        -- free, fully offline, no API key
                                      Requires: Ollama running (https://ollama.com)
                                      Model:    ollama pull qwen2.5-coder:7b
  manual       No AI call          -- generates template only, pauses for manual editing

Usage:
  python git-history-docs/run-with-ai.py [options]

Options:
  --repo <path>        Git repository path (default: .)
  --provider <name>    AI provider: github|openai|codex|ollama|manual (default: github)
  --model <name>       Model name override (provider-specific default used if omitted)
  --all-branches       Pass --all-branches to the doc generator (default: true)
  --branch <name>      Analyze a specific branch (mutually exclusive with --all-branches)
  --enrichment-out     Path to save enrichment.json (default: git-history-docs/enrichment.json)
  --promote            Promote README.md / CHANGELOG.md to repo root after generation
  --dry-run            Print what would be done without making any changes
  --skip-if-exists     Skip AI call if enrichment.json already exists (useful for CI)
  --help               Show this help message

Defaults by provider:
  copilot      model = claude-sonnet-4.6  base_url = https://api.githubcopilot.com
  copilot-cli  model = (Copilot default)  gh copilot -p <prompt> --allow-all-paths --allow-all-tools
  github       model = gpt-4o            base_url = https://models.inference.ai.azure.com
  openai       model = gpt-4o-mini       base_url = https://api.openai.com/v1
  anthropic    model = claude-sonnet-4-5 base_url = https://api.anthropic.com/v1
  codex        model = (codex default)   codex --full-auto (agent writes files directly)
  ollama       model = qwen2.5-coder:7b  base_url = http://localhost:11434

Provider quick guide:
  GitHub Copilot Pro subscription?  -> use --provider copilot      (default, API, Claude Sonnet 4.6)
                                    -> use --provider copilot-cli  (same auth, agent writes files)
  Only GitHub Models (no Copilot)?  -> use --provider github       (GPT-4o)
  Have OpenAI API key?              -> use --provider openai
  Have Anthropic API key?           -> use --provider anthropic    (Claude Sonnet)
  Have Codex CLI (npm)?             -> use --provider codex        (agent, OPENAI_API_KEY)
  Want fully offline?               -> use --provider ollama
"""

import argparse
import json
import os
import subprocess
import sys
import threading
import time
import urllib.error
import urllib.request
from pathlib import Path

# Ensure UTF-8 output on Windows (prevents UnicodeEncodeError with --help epilog)
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# ---------------------------------------------------------------------------
# Spinner — shows elapsed time while waiting for a long API call
# ---------------------------------------------------------------------------

class Spinner:
    """Context manager that runs a spinner + elapsed timer in a background thread.
    Use around any blocking network call so the user knows the process is alive."""

    FRAMES = ["|", "/", "-", "\\"]

    def __init__(self, message: str = "Waiting for AI response"):
        self.message = message
        self._stop = threading.Event()
        self._thread = threading.Thread(target=self._spin, daemon=True)

    def _spin(self) -> None:
        start = time.time()
        i = 0
        while not self._stop.is_set():
            elapsed = int(time.time() - start)
            frame = self.FRAMES[i % len(self.FRAMES)]
            sys.stdout.write(f"\r    {frame}  {self.message}  ({elapsed}s) ...")
            sys.stdout.flush()
            self._stop.wait(0.25)
            i += 1
        # Clear the spinner line
        sys.stdout.write("\r" + " " * 60 + "\r")
        sys.stdout.flush()

    def __enter__(self):
        self._thread.start()
        return self

    def __exit__(self, *_):
        self._stop.set()
        self._thread.join()


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

SCRIPT_DIR = Path(__file__).parent
GENERATOR  = SCRIPT_DIR / "generate-history-docs.py"

PROVIDER_DEFAULTS = {
    "copilot": {
        "model":    "claude-sonnet-4.6",
        "base_url": "https://api.githubcopilot.com",
        "env_var":  "GITHUB_TOKEN",
    },
    "github": {
        "model":    "gpt-4o",
        "base_url": "https://models.inference.ai.azure.com",
        "env_var":  "GITHUB_TOKEN",
    },
    "openai": {
        "model":    "gpt-4o-mini",
        "base_url": "https://api.openai.com/v1",
        "env_var":  "OPENAI_API_KEY",
    },
    "anthropic": {
        "model":    "claude-sonnet-4-5",
        "base_url": "https://api.anthropic.com/v1",
        "env_var":  "ANTHROPIC_API_KEY",
    },
    "ollama": {
        "model":    "qwen2.5-coder:7b",
        "base_url": "http://localhost:11434",
        "env_var":  None,
    },
    "codex": {
        "model":    None,   # uses codex CLI's own default
        "base_url": None,
        "env_var":  "OPENAI_API_KEY",
    },
    "copilot-cli": {
        "model":    None,   # uses gh copilot's own default (Claude Sonnet)
        "base_url": None,
        "env_var":  None,   # uses gh auth login credentials
    },
}

SYSTEM_PROMPT = """\
You are a technical documentation assistant specialized in software projects.
You will receive a JSON enrichment template for a git repository, possibly with context from existing documentation files.
Your task is to fill in all empty string fields and empty lists in Italian (clear, technical tone).

Rules:
- "commits.<sha>.description": 2-4 plain-text sentences explaining WHAT changed and WHY.
  Use the _files_changed list and the existing context to be specific.
  For merge commits (no files changed) write a short sentence like "Merge del branch X in Y."
- "versions.<tag>.added / changed / fixed / removed / security / deprecated": list the most significant
  changes for this version. Look at commits near the tag's _date and group them logically.
  Each item should be 1 sentence. Leave the list empty [] if the category has no relevant changes.
  Do NOT leave all categories empty -- at least Added or Changed should have entries.
- "features.<branch>.summary": 3-5 sentences describing the feature's purpose and value.
- "readme.description": 2-3 sentences describing the project (what it is, who it's for).
  Use the existing context files to produce an accurate, project-specific description.
- "readme.installation": practical installation steps (or leave "" if not inferable from context).
- "readme.usage": practical usage instructions (or leave "" if not inferable from context).
- "readme.license": just the license name (e.g. "MIT") or "" if unknown.
- Do NOT modify fields starting with "_".
- Do NOT add new keys.
- Return ONLY the completed JSON, no explanations before or after.\
"""

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def log(msg: str, dry_run: bool = False) -> None:
    prefix = "[DRY-RUN] " if dry_run else ""
    print(f"{prefix}{msg}")


def run_python(args: list, dry_run: bool) -> None:
    cmd = [sys.executable] + [str(a) for a in args]
    log("  $ " + " ".join(cmd), dry_run)
    if not dry_run:
        result = subprocess.run(cmd)
        if result.returncode != 0:
            print("ERROR: generator script failed.")
            sys.exit(result.returncode)


def get_github_token() -> str:
    token = os.environ.get("GITHUB_TOKEN", "")
    if not token:
        # Try gh CLI
        try:
            result = subprocess.run(
                ["gh", "auth", "token"], capture_output=True, text=True
            )
            token = result.stdout.strip()
        except FileNotFoundError:
            pass
    return token


def get_api_token(provider: str) -> str:
    cfg = PROVIDER_DEFAULTS.get(provider, {})
    env_var = cfg.get("env_var")
    if not env_var:
        return ""
    if provider in ("github", "copilot"):   # both use gh CLI token
        return get_github_token()
    return os.environ.get(env_var, "")


def extract_json(text: str) -> str:
    """Extract the outermost JSON object from a string (handles markdown fences)."""
    start = text.find("{")
    end   = text.rfind("}") + 1
    if start == -1 or end == 0:
        raise ValueError("No JSON object found in response")
    return text[start:end]


# ---------------------------------------------------------------------------
# AI call -- OpenAI-compatible (github, openai)
# ---------------------------------------------------------------------------

def call_openai_compatible(prompt: str, model: str, base_url: str, token: str) -> str:
    url  = base_url.rstrip("/") + "/chat/completions"
    body = json.dumps({
        "model": model,
        "messages": [
            {"role": "system",  "content": SYSTEM_PROMPT},
            {"role": "user",    "content": prompt},
        ],
        "temperature": 0.3,
    }).encode("utf-8")
    headers = {
        "Content-Type":  "application/json",
        "Authorization": f"Bearer {token}",
    }
    req = urllib.request.Request(url, data=body, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            data = json.loads(resp.read())
            return data["choices"][0]["message"]["content"]
    except urllib.error.HTTPError as e:
        body_text = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {e.code} from {url}: {body_text}") from e


# ---------------------------------------------------------------------------
# AI call -- Anthropic Messages API (claude-*)
# ---------------------------------------------------------------------------

def call_anthropic(prompt: str, model: str, base_url: str, token: str) -> str:
    url  = base_url.rstrip("/") + "/messages"
    body = json.dumps({
        "model": model,
        "max_tokens": 8192,
        "system": SYSTEM_PROMPT,
        "messages": [
            {"role": "user", "content": prompt},
        ],
    }).encode("utf-8")
    headers = {
        "Content-Type":      "application/json",
        "x-api-key":         token,
        "anthropic-version": "2023-06-01",
    }
    req = urllib.request.Request(url, data=body, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            data = json.loads(resp.read())
            return data["content"][0]["text"]
    except urllib.error.HTTPError as e:
        body_text = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {e.code} from {url}: {body_text}") from e


# ---------------------------------------------------------------------------
# AI call -- Ollama
# ---------------------------------------------------------------------------

def call_ollama(prompt: str, model: str, base_url: str) -> str:
    url  = base_url.rstrip("/") + "/api/chat"
    body = json.dumps({
        "model": model,
        "messages": [
            {"role": "system",  "content": SYSTEM_PROMPT},
            {"role": "user",    "content": prompt},
        ],
        "stream": False,
    }).encode("utf-8")
    req = urllib.request.Request(
        url, data=body, headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            data = json.loads(resp.read())
            return data["message"]["content"]
    except urllib.error.URLError as e:
        raise RuntimeError(
            f"Cannot reach Ollama at {base_url}. Is it running? (ollama serve)"
        ) from e


# ---------------------------------------------------------------------------
# AI call -- Codex CLI agent (openai/codex npm package)
# ---------------------------------------------------------------------------

def _build_cli_agent_prompt(template_path: Path, enrichment_out: Path) -> str:
    """Shared prompt text for CLI-based agent providers (codex, copilot-cli)."""
    return (
        f"Read the file {template_path}. "
        "It is a JSON enrichment template for a git repository history. "
        "Fill ALL empty string fields and empty lists: "
        "  - 'commits.<sha>.description': 2-4 sentences in Italian explaining what changed and why. "
        "  - 'versions.<tag>.added/changed/fixed/...': lists of changes for that version in Italian; "
        "    look at nearby commit dates to infer what belongs to each version. "
        "  - 'features.<branch>.summary': 3-5 sentences in Italian describing the feature. "
        "  - 'readme.*': description, installation, usage, license in Italian. "
        "Do NOT modify fields starting with '_'. Do NOT add new keys. "
        f"Save the completed JSON (no other text) to {enrichment_out}."
    )


def call_codex_cli(template_path: Path, enrichment_out: Path, model: str) -> None:
    """Delegates to the 'codex' CLI agent in --full-auto mode.
    Unlike other providers, codex writes the output file directly -- no JSON parsing needed."""
    model_flag = ["--model", model] if model else []
    prompt = _build_cli_agent_prompt(template_path, enrichment_out)
    cmd = ["codex", "--full-auto"] + model_flag + [prompt]
    log(f"  $ {' '.join(str(c) for c in cmd)}")
    result = subprocess.run(cmd)
    if result.returncode != 0:
        raise RuntimeError("codex CLI exited with a non-zero status.")
    if not enrichment_out.exists():
        raise RuntimeError(
            f"codex CLI ran but {enrichment_out} was not created. "
            "Check the codex output for errors."
        )


# ---------------------------------------------------------------------------
# AI call -- GitHub Copilot CLI agent (gh copilot -p)
# ---------------------------------------------------------------------------

def call_copilot_cli(template_path: Path, enrichment_out: Path) -> None:
    """Delegates to the 'gh copilot' CLI in non-interactive prompt mode.
    Uses the same GitHub Copilot Pro subscription as the VS Code extension.
    gh copilot writes the output file directly -- no JSON parsing needed."""
    prompt = _build_cli_agent_prompt(template_path, enrichment_out)
    cmd = [
        "gh", "copilot", "--",
        "--prompt", prompt,
        "--allow-all-paths",
        "--allow-all-tools",
        "--no-interactive",
    ]
    log(f"  $ gh copilot -- --prompt \"<prompt>\" --allow-all-paths --allow-all-tools --no-interactive")
    result = subprocess.run(cmd)
    if result.returncode != 0:
        raise RuntimeError("gh copilot CLI exited with a non-zero status.")
    if not enrichment_out.exists():
        raise RuntimeError(
            f"gh copilot CLI ran but {enrichment_out} was not created. "
            "Check the copilot output for errors."
        )


def collect_repo_context(repo_path: Path, max_chars: int = 4000) -> str:
    """Read existing README.md / CHANGELOG.md from the repo root, plus README.md files from
    immediate subdirectories, to give the AI rich project context."""
    parts = []

    # Root-level docs
    for fname in ["README.md", "CHANGELOG.md"]:
        fpath = repo_path / fname
        if fpath.exists():
            content = fpath.read_text(encoding="utf-8", errors="replace").strip()
            if content:
                snippet = content[:max_chars]
                if len(content) > max_chars:
                    snippet += "\n... [truncated]"
                parts.append(f"=== Existing {fname} ===\n{snippet}")

    # Sub-module README files (one level deep, skip hidden dirs and docs/)
    subdir_readmes = []
    try:
        for child in sorted(repo_path.iterdir()):
            if not child.is_dir():
                continue
            if child.name.startswith(".") or child.name in ("docs", ".git", "__pycache__"):
                continue
            readme = child / "README.md"
            if readme.exists():
                subdir_readmes.append((child.name, readme))
    except OSError:
        pass

    if subdir_readmes:
        per_readme = max(500, max_chars // max(len(subdir_readmes), 1))
        summaries = []
        for name, readme in subdir_readmes:
            content = readme.read_text(encoding="utf-8", errors="replace").strip()
            if content:
                snippet = content[:per_readme]
                if len(content) > per_readme:
                    snippet += "\n... [truncated]"
                summaries.append(f"--- {name}/README.md ---\n{snippet}")
        if summaries:
            parts.append("=== Sub-module READMEs ===\n" + "\n\n".join(summaries))

    return "\n\n".join(parts)


# ---------------------------------------------------------------------------
# Core logic
# ---------------------------------------------------------------------------

def call_ai(template_content: str, provider: str, model: str, dry_run: bool,
            template_path: Path = None, enrichment_out: Path = None,
            repo_path: Path = None) -> dict:
    """Call the configured AI provider to fill the enrichment template.
    For 'codex' provider, the agent writes enrichment_out directly -- returns None.
    For all other providers, returns the filled enrichment dict."""
    context = collect_repo_context(repo_path) if repo_path else ""
    prompt_parts = ["Fill in all empty string fields and empty lists of this enrichment template JSON.\n"]
    if context:
        prompt_parts.append(
            "\nFor context, here are existing documentation files from this repository. "
            "Use them to produce accurate, project-specific descriptions:\n\n"
            + context
            + "\n"
        )
    prompt_parts.append("\nEnrichment template to complete:\n" + template_content)
    prompt = "".join(prompt_parts)

    if dry_run:
        log("  [would call AI API here]", dry_run=True)
        return json.loads(template_content)

    cfg      = PROVIDER_DEFAULTS.get(provider, {})
    model    = model or cfg.get("model", "") or ""
    base_url = cfg.get("base_url", "")

    log(f"  Calling {provider.upper()}" + (f" (model: {model})" if model else "") + "...")

    if provider == "codex":
        call_codex_cli(template_path, enrichment_out, model)
        return None   # CLI agent writes the file directly

    if provider == "copilot-cli":
        call_copilot_cli(template_path, enrichment_out)
        return None   # CLI agent writes the file directly

    spinner_msg = f"Calling {provider.upper()}" + (f" ({model})" if model else "")
    t0 = time.time()
    with Spinner(spinner_msg):
        if provider in ("copilot", "github", "openai"):
            token = get_api_token(provider)
            if not token:
                env_var = cfg.get("env_var", "?")
                print(
                    f"ERROR: No API token found for provider '{provider}'.\n"
                    f"  Set the {env_var} environment variable, or run 'gh auth login'."
                )
                sys.exit(1)
            raw = call_openai_compatible(prompt, model, base_url, token)
        elif provider == "anthropic":
            token = os.environ.get("ANTHROPIC_API_KEY", "")
            if not token:
                print("ERROR: ANTHROPIC_API_KEY environment variable not set.\n"
                      "  Get a key at https://console.anthropic.com/")
                sys.exit(1)
            raw = call_anthropic(prompt, model, base_url, token)
        elif provider == "ollama":
            raw = call_ollama(prompt, model, base_url)
        else:
            raise ValueError(f"Unknown provider: {provider}")

    elapsed = int(time.time() - t0)
    print(f"  +  AI response received ({elapsed}s, {len(raw)} chars)")
    json_str = extract_json(raw)
    return json.loads(json_str)


def find_latest_template(output_dir: Path):
    candidates = sorted(output_dir.glob("enrichment-input_*.json"))
    return candidates[-1] if candidates else None


def promote_files(repo_path: Path, output_dir: Path, dry_run: bool) -> None:
    pairs = [
        (output_dir / "README.md",    repo_path / "README.md"),
        (output_dir / "CHANGELOG.md", repo_path / "CHANGELOG.md"),
    ]
    for src, dst in pairs:
        if not src.exists():
            continue
        if dst.exists():
            answer = input(f"  {dst.name} already exists at root. Overwrite? [y/N] ").strip().lower()
            if answer != "y":
                print(f"  Skipped {dst.name}")
                continue
        log(f"  Copy-Item {src.relative_to(repo_path)} -> {dst.relative_to(repo_path)}", dry_run)
        if not dry_run:
            dst.write_bytes(src.read_bytes())
            print(f"  +  {dst.relative_to(repo_path)}")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Full workflow: template → AI → enrichment.json → CHANGELOG + README",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("--repo",           default=".",            help="Git repository path (default: .)")
    parser.add_argument("--provider",       default="copilot",      choices=["copilot", "copilot-cli", "github", "openai", "anthropic", "codex", "ollama", "manual"],
                                                                    help="AI provider (default: copilot)")
    parser.add_argument("--model",          default=None,           help="Model name override")
    parser.add_argument("--all-branches",   action="store_true",    dest="all_branches", default=True,
                                                                    help="Include all branches (default: true)")
    parser.add_argument("--branch",         default=None,           help="Analyze specific branch (overrides --all-branches)")
    parser.add_argument("--enrichment-out", default=None,           dest="enrichment_out",
                                                                    help="Output path for enrichment.json")
    parser.add_argument("--promote",        action="store_true",    help="Copy README.md / CHANGELOG.md to repo root")
    parser.add_argument("--dry-run",        action="store_true",    dest="dry_run",
                                                                    help="Print actions without executing")
    parser.add_argument("--skip-if-exists", action="store_true",    dest="skip_if_exists",
                                                                    help="Skip AI call if enrichment.json already exists")
    parser.add_argument("--output",         default="docs/history", help="Output folder (default: docs/history)")
    args = parser.parse_args()

    repo_path  = Path(args.repo).resolve()
    output_dir = repo_path / args.output
    enrichment_out = Path(args.enrichment_out) if args.enrichment_out else SCRIPT_DIR / "enrichment.json"

    print(f"\n=== Git History Docs -- Full AI Workflow ===")
    print(f"Repository : {repo_path}")
    print(f"Provider   : {args.provider}")
    print(f"Output dir : {output_dir}")
    print(f"Enrichment : {enrichment_out}")
    if args.dry_run:
        print("Mode       : DRY-RUN (no changes)\n")
    else:
        print()

    # ------------------------------------------------------------------
    # Step 1 -- Generate enrichment template
    # ------------------------------------------------------------------
    log("Step 1/4 -- Generating enrichment template...")
    gen_args = [GENERATOR, "--repo", repo_path, "--output", args.output, "--gen-template"]
    if args.branch:
        gen_args += ["--branch", args.branch]
    elif args.all_branches:
        gen_args.append("--all-branches")
    run_python(gen_args, args.dry_run)

    # Find the generated template
    template_path = find_latest_template(output_dir)
    if template_path is None and not args.dry_run:
        print("ERROR: No enrichment-input_*.json found in output directory.")
        sys.exit(1)
    if template_path:
        log(f"  Template: {template_path.relative_to(repo_path)}")

    # ------------------------------------------------------------------
    # Step 2 -- AI call (or manual pause)
    # ------------------------------------------------------------------
    log("\nStep 2/4 -- Generating enrichment.json via AI...")

    if args.skip_if_exists and enrichment_out.exists():
        log(f"  enrichment.json already exists -- skipping AI call (--skip-if-exists)")
        enrichment_data = json.loads(enrichment_out.read_text(encoding="utf-8"))
    elif args.provider == "manual":
        print(f"\n  Template saved at: {template_path}")
        print(  "  Edit or have an AI agent fill the 'description' / 'summary' fields.")
        input(  "  Press ENTER when you have saved the compiled file as enrichment.json...")
        if not enrichment_out.exists():
            print(f"ERROR: {enrichment_out} not found. Save the compiled file there and retry.")
            sys.exit(1)
        enrichment_data = json.loads(enrichment_out.read_text(encoding="utf-8"))
    else:
        template_content = template_path.read_text(encoding="utf-8") if template_path else "{}"
        enrichment_data  = call_ai(
            template_content, args.provider, args.model, args.dry_run,
            template_path=template_path, enrichment_out=enrichment_out,
            repo_path=repo_path,
        )

        if enrichment_data is None:
            # codex wrote the file directly -- just verify and load
            if not enrichment_out.exists():
                print(f"ERROR: codex did not create {enrichment_out}.")
                sys.exit(1)
            enrichment_data = json.loads(enrichment_out.read_text(encoding="utf-8"))
            print("  +  enrichment.json written by codex agent")
        else:
            log(f"  Saving enrichment.json -> {enrichment_out}")
            if not args.dry_run:
                enrichment_out.parent.mkdir(parents=True, exist_ok=True)
                enrichment_out.write_text(
                    json.dumps(enrichment_data, ensure_ascii=False, indent=2),
                    encoding="utf-8",
                )
                print("  +  enrichment.json saved")

    # ------------------------------------------------------------------
    # Step 3 -- Regenerate docs with enrichment + README
    # ------------------------------------------------------------------
    log("\nStep 3/4 -- Generating CHANGELOG files and README...")
    regen_args = [
        GENERATOR,
        "--repo",            repo_path,
        "--output",          args.output,
        "--enrichment-file", enrichment_out,
        "--readme",
    ]
    if args.branch:
        regen_args += ["--branch", args.branch]
    elif args.all_branches:
        regen_args.append("--all-branches")
    run_python(regen_args, args.dry_run)

    # ------------------------------------------------------------------
    # Step 4 -- Promote to root (optional)
    # ------------------------------------------------------------------
    if args.promote:
        log("\nStep 4/4 -- Promoting files to repository root...")
        promote_files(repo_path, output_dir, args.dry_run)
    else:
        print("\nStep 4/4 -- Skipped (use --promote to copy README.md / CHANGELOG.md to root)")
        print(f"  To promote manually:")
        print(f"    Copy-Item {output_dir.relative_to(repo_path)}/README.md    README.md")
        print(f"    Copy-Item {output_dir.relative_to(repo_path)}/CHANGELOG.md CHANGELOG.md")

    print("\n=== Completato. ===\n")


if __name__ == "__main__":
    main()
