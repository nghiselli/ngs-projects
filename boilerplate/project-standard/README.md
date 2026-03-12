# <project-name>

Breve descrizione del progetto.

## Obiettivo
- Obiettivo principale del progetto.
- KPI o risultato atteso.

## Prerequisiti
- Runtime/framework richiesti.
- Toolchain minima per build e test.

## Avvio rapido
```bash
# esempio
# git clone <repo-url>
# <build-command>
# <run-command>
```

## Struttura consigliata
- `README.md`
- `CHANGELOG.md`
- `WORKFLOW-STANDARD.md`
- `WORKFLOW-DOCS-BOOTSTRAP.md`
- `WORKFLOW-SPECIFICATION.md`
- `WORKFLOW-FEATURE-ANALYSIS.md`
- `WORKFLOW-GITFLOW.md`
- `SESSION-PROMPT-TEMPLATE.md`
- `NGS-PROJECTS-UPDATE.md` (solo se il progetto e tracciato in ngs-projects)
- `docs/specs/`
- `docs/analysis/`
- `docs/docs-generator/`
- `checkpoints/`

## Processo standard (AI agent)
1. Se `README.md`/`CHANGELOG.md` mancano o non sono affidabili, usare `WORKFLOW-DOCS-BOOTSTRAP.md` (manuale).
2. Definire/aggiornare specifica (`WORKFLOW-SPECIFICATION.md`).
3. Eseguire analisi tecnica (`WORKFLOW-FEATURE-ANALYSIS.md`).
4. Implementare con session prompt (`SESSION-PROMPT-TEMPLATE.md`).
5. Chiudere feature/release/hotfix (`WORKFLOW-GITFLOW.md`).
6. Aggiornare tracking portfolio se richiesto (`NGS-PROJECTS-UPDATE.md`).

## Documentazione funzionale/tecnica
- Specifiche: `docs/specs/`
- Analisi: `docs/analysis/`
- Bootstrap docs legacy: `docs/docs-generator/`
- Checkpoint sessioni: `checkpoints/README.md`