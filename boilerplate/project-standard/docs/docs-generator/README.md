# git-history-docs

Tool Python per la generazione automatica di documentazione (CHANGELOG e README) a partire dalla history di un repository git, con supporto opzionale all'arricchimento AI.

## Descrizione

Analizza la history git in modalità **read-only** (non modifica mai il repository) e produce file markdown strutturati in `docs/history/`. Supporta tre tipi di CHANGELOG e la generazione di un README scheletro. Con `run-with-ai.py`, l'intero workflow può essere automatizzato tramite diversi provider AI.

## Stack tecnico

- **Python 3.8+** (nessuna dipendenza esterna per lo script base)
- Dipendenze opzionali: `gh` CLI (GitHub Copilot), `codex` CLI (OpenAI), `ollama` (LLM locale)

## Struttura

```
git-history-docs/
├── generate-history-docs.py    # Script principale di analisi e generazione
├── run-with-ai.py              # Pipeline automatizzata con AI
├── enrichment.json             # Dati di arricchimento AI (commessi nel repo)
├── GUIDE.md                    # Guida utente completa
├── ENRICHMENT-GUIDE.md         # Guide e prompt per la creazione dell'enrichment
└── PYTHON-SETUP.md             # Guida installazione Python (Win/Linux/macOS)
```

## Output generati

| File | Contenuto |
|------|-----------|
| `docs/history/CHANGELOG-commits.md` | Ogni commit con SHA, data, messaggio, file modificati |
| `docs/history/CHANGELOG.md` | Versioni semantiche raggruppate per tag git |
| `docs/history/CHANGELOG-features.md` | Branch feature (gitflow) con stato e commit correlati |
| `docs/history/README.md` | README scheletro con sezioni TODO per completamento manuale |

## Utilizzo rapido

```bash
# Solo analisi git (nessuna AI)
python git-history-docs/generate-history-docs.py --all-branches --readme

# Workflow completo con AI (GitHub Copilot, default)
python git-history-docs/run-with-ai.py --promote

# Promuovere i file generati alla root del repo
Copy-Item docs/history/README.md README.md
Copy-Item docs/history/CHANGELOG*.md ./
```

## Provider AI supportati

| Provider | Comando | Note |
|----------|---------|-------|
| `copilot` | API GitHub Copilot | Default — richiede `gh auth login` |
| `copilot-cli` | `gh copilot` CLI | Agente autonomo |
| `github` | GitHub Models API | richiede `GITHUB_TOKEN` |
| `openai` | OpenAI API | richiede `OPENAI_API_KEY` |
| `anthropic` | Anthropic API | richiede `ANTHROPIC_API_KEY` |
| `codex` | `codex` CLI | richiede `OPENAI_API_KEY` |
| `ollama` | Ollama locale | Nessuna API key, modello locale |
| `manual` | — | Genera solo il template JSON da completare a mano |

## Documentazione

- [Guida completa](GUIDE.md)
- [Guida arricchimento AI](ENRICHMENT-GUIDE.md)
- [Installazione Python](PYTHON-SETUP.md)
