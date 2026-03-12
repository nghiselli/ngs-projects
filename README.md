# ngs-projects

Portfolio repository dei progetti di Nicola Ghiselli Solutions.

## Cosa contiene

Questo repository include:
- una cartella per ogni progetto monitorato (`/<nome-progetto>/README.md`),
- una GitHub Pages in `docs/` generata dai README dei progetti,
- script di generazione dati in `tools/generate-pages.ps1`,
- script di bootstrap struttura progetto in `tools/ensure-project-boilerplate.ps1`,
- boilerplate standard in `boilerplate/project-standard/`.

## Source of truth template

I template operativi NON sono piu mantenuti in root: la fonte unica e il boilerplate.

Riferimenti principali:
- `boilerplate/project-standard/WORKFLOW-STANDARD.md`
- `boilerplate/project-standard/WORKFLOW-DOCS-BOOTSTRAP.md`
- `boilerplate/project-standard/WORKFLOW-SPECIFICATION.md`
- `boilerplate/project-standard/WORKFLOW-FEATURE-ANALYSIS.md`
- `boilerplate/project-standard/WORKFLOW-GITFLOW.md`
- `boilerplate/project-standard/SESSION-PROMPT-TEMPLATE.md`
- `boilerplate/project-standard/NGS-PROJECTS-UPDATE.md`

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

## Caso documentazione assente (manuale)

Quando un repository non ha documentazione affidabile:
1. Segui `boilerplate/project-standard/WORKFLOW-DOCS-BOOTSTRAP.md`.
2. Esegui manualmente `docs/docs-generator/run-with-ai.py` nel repository target.
3. Promuovi `README.md`/`CHANGELOG.md` in root solo dopo review umana.

## GitHub Pages (struttura Home)

La Home e organizzata in 3 tab:
1. `Da Pianificare a In Corso` con board: `Da pianificare`, `Pianificato`, `In corso`
2. `In Pausa, In manutenzione, Completato, Archiviato` con board: `In pausa`, `In manutenzione`, `Completato`, `Archiviato`
3. `Aggiornamenti` con tutte le voci aggiornamento (Decision Log / Snapshot), ordinate per data e filtrate dalla ricerca.

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

## Nota

Il `README.md` di root (questo file) e il `CHANGELOG.md` di root sono documentazione del portfolio.