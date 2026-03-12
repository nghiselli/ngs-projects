# ngs-projects

Portfolio repository dei progetti di Nicola Ghiselli Solutions.

## Cosa contiene

Questo repository include:
- una cartella per ogni progetto monitorato (`/<nome-progetto>/README.md`),
- una GitHub Pages in `docs/` generata dai README dei progetti,
- script di generazione dati in `tools/generate-pages.ps1`,
- script di bootstrap struttura progetto in `tools/ensure-project-boilerplate.ps1`,
- boilerplate standard in `boilerplate/project-standard/`,
- workflow standard riusabili per AI agent (`WORKFLOW-*.md`, `SESSION-PROMPT-TEMPLATE.md`, `NGS-PROJECTS-UPDATE.md`).

## Workflow standard AI agent

Ordine consigliato per nuova feature/patch:
- Se mancano `README.md`/`CHANGELOG.md` affidabili, eseguire prima `WORKFLOW-DOCS-BOOTSTRAP.md` (manuale).
1. `WORKFLOW-SPECIFICATION.md` (raccolta specifiche)
2. `WORKFLOW-FEATURE-ANALYSIS.md` (analisi impatti e piano)
3. `SESSION-PROMPT-TEMPLATE.md` (sessione implementativa)
4. `WORKFLOW-GITFLOW.md` (chiusura feature/release/hotfix)
5. `NGS-PROJECTS-UPDATE.md` (allineamento tracking portfolio)

Per la procedura completa di adozione nei repository esterni, vedere `WORKFLOW-STANDARD.md`.

## Boilerplate standard per nuovi repository

La cartella `boilerplate/project-standard/` contiene la struttura minima consigliata per progetti monitorati con AI agent:
- `README.md`
- `CHANGELOG.md`
- `WORKFLOW-STANDARD.md`
- `WORKFLOW-DOCS-BOOTSTRAP.md`
- `WORKFLOW-SPECIFICATION.md`
- `WORKFLOW-FEATURE-ANALYSIS.md`
- `WORKFLOW-GITFLOW.md`
- `SESSION-PROMPT-TEMPLATE.md`
- `NGS-PROJECTS-UPDATE.md`
- `checkpoints/README.md`
- `docs/specs/SPEC-TEMPLATE.md`
- `docs/analysis/ANALYSIS-TEMPLATE.md`
- `docs/docs-generator/` (tool manuale per bootstrap README/CHANGELOG da history git)

## Come applicare il boilerplate a un progetto

Comando base (crea solo file/cartelle mancanti):

```powershell
./tools/ensure-project-boilerplate.ps1 -ProjectPath 'D:\repos\OCEM\Ocem.Snmp.Simulator'
```

Comando con sovrascrittura file esistenti:

```powershell
./tools/ensure-project-boilerplate.ps1 -ProjectPath 'D:\repos\OCEM\Ocem.Snmp.Simulator' -Overwrite
```

Preview senza modifiche (`WhatIf`):

```powershell
./tools/ensure-project-boilerplate.ps1 -ProjectPath 'D:\repos\OCEM\Ocem.Snmp.Simulator' -WhatIf
```

## Caso documentazione assente (uso manuale docs-generator)

Quando un repository non ha documentazione pregressa affidabile, usare il workflow:
- `WORKFLOW-DOCS-BOOTSTRAP.md`

Comandi consigliati (nel repository target):

```powershell
python docs/docs-generator/run-with-ai.py --repo . --provider copilot --all-branches --dry-run
python docs/docs-generator/run-with-ai.py --repo . --provider copilot --all-branches
```

Solo dopo review umana, promuovere in root:

```powershell
python docs/docs-generator/run-with-ai.py --repo . --provider copilot --all-branches --promote
```

## GitHub Pages (struttura Home)

La Home e organizzata in 3 tab:
1. `Da Pianificare a In Corso` con board: `Da pianificare`, `Pianificato`, `In corso`
2. `In Pausa, In manutenzione, Completato, Archiviato` con board: `In pausa`, `In manutenzione`, `Completato`, `Archiviato`
3. `Aggiornamenti` con tutte le voci aggiornamento (Decision Log / Snapshot), ordinate per data e filtrate dalla ricerca.

Ogni card progetto mostra:
- nome progetto,
- priorita,
- stato,
- progresso (% + barra),
- sintesi obiettivo,
- ultimo aggiornamento.

La pagina dettaglio progetto mostra anche lo snapshot, incluso:
- stato,
- tipo progetto,
- priorita,
- progresso,
- ultimo aggiornamento,
- path repository.

## Convenzioni README progetto

Ogni progetto deve avere `README.md` con sezione `## Snapshot` e almeno questi campi:
- `Stato avanzamento`
- `Priorita`
- `Progresso` (es. `95%`)
- `Tipo progetto`
- `Includi nel portfolio` (`Si`/`No`)
- `Ultimo aggiornamento`

Valori stato supportati dalla Pages:
- `Da pianificare`
- `Pianificato`
- `In corso`
- `In pausa`
- `In manutenzione`
- `Completato`
- `Archiviato`

## Come aggiornare la Pages

1. Aggiorna i `README.md` dei progetti.
2. Esegui:

```powershell
./tools/generate-pages.ps1
```

3. Commit e push su `main`.
4. La workflow `.github/workflows/pages.yml` rigenera e pubblica automaticamente.

## Nuovo progetto portfolio

Per aggiungere un nuovo progetto al sito:
1. Crea una nuova cartella in root (es. `my-new-project`).
2. Aggiungi `README.md` nella cartella con `## Snapshot`.
3. Esegui `./tools/generate-pages.ps1` oppure fai push su `main`.

## Nota

Il `README.md` di root (questo file) e il `CHANGELOG.md` di root sono documentazione del repository.
Il progetto corrente `ngs-projects` e tracciato come progetto portfolio nella cartella dedicata `ngs-projects/README.md`.