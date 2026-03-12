# Git History Documentation Generator — Guida

## Prerequisiti

| Requisito | Versione minima | Verifica |
|-----------|----------------|----------|
| **Python** | 3.8+ | `python --version` |
| **Git** | 2.x+ | `git --version` |

Lo script usa solo la **libreria standard** di Python (nessun `pip install` necessario).

Per istruzioni su come installare o aggiornare Python su Windows, Linux e macOS:  
👉 **[PYTHON-SETUP.md](PYTHON-SETUP.md)**

---

## Obiettivo

Questo tool legge (in modo **read-only**) la storia di una repository git e genera automaticamente file di documentazione in una cartella dedicata.

**Principi fondamentali:**
- 🔒 **Git è read-only**: nessuna modifica alla storia, nessun commit automatico
- 📁 **Output isolato**: i file generati vanno in `docs/history/` (configurabile), mai sovrascrivono file esistenti nella root del repo
- 🔀 **Generazione condizionale**: vengono generati solo i CHANGELOG supportati dai dati presenti nel repo
- 🤖 **Arricchimento AI opzionale**: le descrizioni narrative vengono aggiunte tramite un file `enrichment.json` generabile con un AI agent

---

## File Generati

| File | Generato quando | Contenuto |
|------|----------------|-----------|
| `CHANGELOG-commits.md` | Sempre | Un'entry per ogni commit: SHA, data, messaggio, descrizione AI (se disponibile), file modificati |
| `CHANGELOG.md` | Solo se esistono **git tag** | Una sezione per ogni versione con sezioni Added/Changed/Fixed/Removed/Security |
| `CHANGELOG-features.md` | Solo se esistono **branch `feature/`** | Una sezione per ogni feature branch: summary AI, stato (aperta/mergiata), lista commit |
| `README.md` | Solo con **`--readme`** | Scheletro di README auto-compilato da features/versioni, con `<!-- TODO -->` per sezioni manuali e supporto enrichment AI |

---

## Utilizzo — Workflow Completo

### Passo 1 — Generazione base (senza descrizioni)

```powershell
python git-history-docs/generate-history-docs.py --repo . --all-branches
```

### Passo 2 — Generazione template di arricchimento

```powershell
python git-history-docs/generate-history-docs.py --repo . --all-branches --gen-template
# Output: docs/history/enrichment-input_<repo>_all-branches.json
```

Il nome del file **include il branch e i parametri usati**, così è subito chiaro quale scope copre.

### Passo 3 — Compilazione con AI agent

Dai il file `enrichment-input_<repo>_<branch>.json` a un AI agent (vedi sezione **Prompt per AI Agent** più in basso).  
Salva il risultato come `git-history-docs/enrichment.json`.

> **Automazione**: usa `run-with-ai.py` per eseguire i passi 2–5 in un unico comando (vedi sezione **Automazione Completa**).

### Passo 4 — Rigenerazione con arricchimento

```powershell
python git-history-docs/generate-history-docs.py --repo . --all-branches --readme --enrichment-file git-history-docs/enrichment.json
```

### Passo 5 — Promozione alla root (opzionale, dopo revisione)

```powershell
Copy-Item docs/history/README.md    README.md      # README standard
Copy-Item docs/history/CHANGELOG.md CHANGELOG.md   # solo se esistono tag git
# CHANGELOG-commits.md e CHANGELOG-features.md restano in docs/history/
# (il README.md li linka già con il path relativo corretto)
```

---

## Argomenti

| Argomento | Default | Descrizione |
|-----------|---------|-------------|
| `--repo` | `.` | Path al repository git |
| `--output` | `docs/history` | Cartella di output (relativa alla root del repo) |
| `--feature-prefix` | `feature/` | Prefisso per identificare i feature branch |
| `--all-branches` | `false` | Include commit di tutti i branch nel log |
| `--branch` | _(nessuno)_ | Analizza un singolo branch specifico (es. `feature/my-feature`). Incompatibile con `--all-branches` |
| `--enrichment-file` | _(nessuno)_ | Path al file JSON con descrizioni AI |
| `--readme` | `false` | Genera anche `README.md` (scheletro con sezioni auto-generate + `<!-- TODO -->` per quelle manuali) |
| `--gen-template` | `false` | Genera `enrichment-input_<repo>_<branch>.json` ed esce |

---

## Prompt per AI Agent

Per prompt dettagliati, copy-paste-ready e specifici per ogni tipo di AI agent, vedere:

👉 **[ENRICHMENT-GUIDE.md](ENRICHMENT-GUIDE.md)**

Metodi disponibili:
- **Metodo A** — GitHub Copilot CLI (stesso repo, sessione interattiva)
- **Metodo B** — Copilot Chat / IDE AI Assistant (VS Code @workspace)
- **Metodo C** — ChatGPT / Claude / Gemini (standalone, senza accesso al repo)
- **Metodo D** — Codex / API (automazione CI/CD)
- **Metodo E** — Ollama (LLM locale, nessuna API key, offline)

---

## Formato enrichment.json

```json
{
  "_format_version": "1.0",
  "commits": {
    "abc1234": {
      "description": "Testo descrittivo del commit in italiano..."
    },
    "def5678": {
      "description": "..."
    }
  },
  "versions": {
    "v1.2.0": {
      "added":    ["Nuova funzionalità X", "Supporto per Y"],
      "changed":  ["Comportamento Z aggiornato"],
      "fixed":    ["Bug W risolto"],
      "removed":  [],
      "security": [],
      "deprecated": []
    }
  },
  "features": {
    "feature/nome-feature": {
      "summary": "Descrizione narrativa della feature..."
    }
  }
}
```

Le chiavi di `commits` sono i **primi 7 caratteri** del SHA (es. `abc1234`).  
Le chiavi di `versions` corrispondono esattamente ai **nomi dei git tag**.  
Le chiavi di `features` corrispondono ai **nomi canonici dei branch** (senza `origin/`).

---

## Struttura Output

```
docs/
└── history/
    ├── CHANGELOG-commits.md        ← sempre generato
    ├── CHANGELOG.md                ← solo se esistono git tag
    ├── CHANGELOG-features.md       ← solo se esistono branch feature/
    └── enrichment-input_<repo>_<branch>.json  ← generato con --gen-template
```

---

## Formato dei File Generati

### CHANGELOG-commits.md (con arricchimento AI)

```markdown
## 2025-07-07 — `8d7d6a8` — added ccr alarm converter

Aggiunta di tre nuovi tool: ccr-alarm-converter (decodifica allarmi CCR tramite BitField 
con GUI PowerShell), mouse-manager (stress test simulatore Infinite) e powershell2exe 
(compilazione script PS in eseguibile).

**File modificati:**
- `ccr-alarm-converter/CcrAlarmConverter.csx` (Added)
- `powershell2exe/ps2exe-converter.ps1` (Added)
```

### CHANGELOG.md (con arricchimento AI, solo con tag)

```markdown
## [1.9.0] - 2026-03-11

### Added
- Supporto invio notifiche SNMP trap v2c/v3 e inform con retry/ack in memoria.
- Estensione modello configurazione notifiche con receiver versionati.

### Changed
- SnmpTrapHostedService evoluto a sender multi-versione con outcome log strutturato.

### Security
- SnmpAgentHostedService ora rifiuta richieste SNMP v3 con security level incoerente.
```

### CHANGELOG-features.md (con arricchimento AI)

```markdown
## Feature: `feature/nghiselli/ngs-workstation`

Branch principale di sviluppo sulla workstation principale. Contiene l'evoluzione 
completa del monorepo dall'aggiunta dei tool CCR/SVG/Effemeridi fino all'integrazione 
di ngs-test-analyzer e SoftwareVersionManager per aeroporti specifici.

**Stato**: aperta (non ancora mergiata in main/develop)

**Commit:**
- `f6db02b` 2026-03-11 — removed wav and mp4 files
```

---

## Applicare a Nuovi Repository

```powershell
# 1. Analizza il repo target
git -C <path> log --oneline --all | Measure-Object -Line  # numero commit
git -C <path> tag --list                                   # tag/versioni?
git -C <path> branch -a                                    # feature branch?

# 2. Genera il template di arricchimento
python generate-history-docs.py --repo <path> --all-branches --gen-template

# 3. Fai compilare docs/history/enrichment-input_<repo>_all-branches.json da un AI agent
#    (vedi sezione "Prompt per AI Agent" — oppure usa run-with-ai.py per automatizzare)

# 4. Salva il file compilato come:
#    <path>/git-history-docs/enrichment.json

# 5. Genera con arricchimento e README
python generate-history-docs.py --repo <path> --all-branches --readme --enrichment-file <path>/git-history-docs/enrichment.json

# 6. Promuovi alla root (dopo revisione)
Copy-Item <path>/docs/history/README.md    <path>/README.md
Copy-Item <path>/docs/history/CHANGELOG.md <path>/CHANGELOG.md   # solo se esistono tag
```

---

## Automazione Completa

Lo script `run-with-ai.py` esegue **in un unico comando** i passi 2–5.

### Prerequisiti per run-with-ai.py

Scegli il provider in base a cosa hai disponibile:

| Provider | Prerequisito | Costo | Come verificare |
|----------|-------------|-------|-----------------|
| `github` | GitHub CLI (`gh`) + Copilot attivo | Incluso in Copilot | `gh auth status` |
| `openai` | API key OpenAI (**non** abbonamento ChatGPT) | Pagamento a token | `echo $OPENAI_API_KEY` |
| `codex`  | Codex CLI + API key OpenAI | Pagamento a token | `codex --version` |
| `ollama` | Ollama installato + modello scaricato | Gratuito, offline | `ollama list` |
| `manual` | Nessuno | Gratuito | — |

> ⚠️ **OpenAI API ≠ ChatGPT**: l'abbonamento ChatGPT Plus (chat.openai.com) **non** include l'accesso all'API.  
> L'API key si crea su [platform.openai.com](https://platform.openai.com/api-keys) ed ha fatturazione separata.

> ℹ️ **Codex CLI**: è il tool open-source [openai/codex](https://github.com/openai/codex) installabile con  
> `npm install -g @openai/codex`. Usa la stessa `OPENAI_API_KEY` ma lavora come agente — legge e scrive i file direttamente.

**Setup per `--provider github`** (raccomandato se hai GitHub Copilot):
```powershell
# Installa GitHub CLI se non presente
winget install GitHub.cli
# Autenticati
gh auth login
# Verifica
gh auth status
```

### Comandi

```powershell
# GitHub Models (raccomandato)
python git-history-docs/run-with-ai.py --provider github --promote

# OpenAI API
$env:OPENAI_API_KEY = "sk-..."
python git-history-docs/run-with-ai.py --provider openai --promote

# Codex CLI (agente, scrive i file direttamente)
python git-history-docs/run-with-ai.py --provider codex --promote

# Ollama (locale, nessuna API key)
python git-history-docs/run-with-ai.py --provider ollama --model qwen2.5-coder:7b --promote

# Anteprima senza eseguire nulla
python git-history-docs/run-with-ai.py --provider github --dry-run
```

Vedi il file stesso per la lista completa di argomenti (`python git-history-docs/run-with-ai.py --help`).

---

## Gestione Repository con Storia Lunga

- `CHANGELOG-commits.md` su repo con migliaia di commit può diventare molto grande → suddivisione per anno prevista come estensione futura (`--since`)
- `CHANGELOG-features.md` su repo con molte feature → `--merged-only` previsto come estensione futura
- Lo script è **idempotente**: rieseguirlo sovrascrive solo i file in `docs/history/`
- L'`enrichment.json` può essere aggiornato incrementalmente: aggiungere solo le nuove chiavi per i nuovi commit

---

## Note Tecniche

- **Dipendenze**: solo Python 3.9+ e `git` nel PATH. Nessuna libreria esterna, nessuna API key.
- **OS**: funziona su Windows, Linux, macOS
- **Encoding**: gestisce repository con caratteri non-ASCII (UTF-8 + replace per errori)
- **Merge commit**: rilevati automaticamente (`diff-tree` non restituisce file per i merge commit)
- **Branch remoti**: `origin/feature/...` deduplicati con i branch locali omonimi
- **Arricchimento parziale**: se solo alcuni commit hanno una descrizione in `enrichment.json`, gli altri vengono generati senza — nessun errore

---

## Contesto di Sviluppo

- **Creato in**: sessione Copilot su `ngs-infinite-utilities` (marzo 2026)
- **Repository di test**: `ngs-infinite-utilities` — 17 commit, 2 feature branch, 0 tag
- **enrichment.json di questo repo**: generato con descrizioni AI (claude-sonnet-4.6) analizzando i diff di ogni commit
- **Tool considerato ma non usato**: `git-filter-repo` (open source, Elijah Newren) — utile per riscrivere storia, non necessario per approccio read-only

