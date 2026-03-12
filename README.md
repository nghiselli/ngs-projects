# ngs-projects

Portfolio repository dei progetti di Nicola Ghiselli Solutions.

## Ultima Versione

### [v1.3.0] - 2026-03-12

**Added:**
- Boilerplate standard in `boilerplate/project-standard/` con template riusabili per README, CHANGELOG, workflow operativi, docs-generator e session prompt.
- Script `tools/ensure-project-boilerplate.ps1` per applicare automaticamente la struttura boilerplate ai repository target.
- Workflow `WORKFLOW-STANDARD.md` come indice operativo end-to-end per gli AI agent.
- Workflow `WORKFLOW-DOCS-BOOTSTRAP.md` per bootstrap manuale della documentazione da history git.
- Workflow `WORKFLOW-SPECIFICATION.md` e `WORKFLOW-FEATURE-ANALYSIS.md` per raccolta specifiche e analisi tecnica.
- Pacchetto `docs/docs-generator` nel boilerplate per repository legacy/non documentati.
- Tracking progresso progetto con campo Snapshot `Progresso` e output dati `progressPercent/progressText`.
- Stato portfolio `In manutenzione` per progetti completati ma ancora attivi.
- `FEATURE-STANDARD.md` per standardizzare `FEATURE.md` e qualità commit su branch feature/hotfix.

**Changed:**
- Cleanup root portfolio: workflow e template duplicati rimossi dalla root e mantenuti solo in `boilerplate/project-standard/`.
- README root aggiornato con sezione boilerplate, script di bootstrap e convenzioni correnti.
- `run-with-ai.py` del docs-generator aggiornato per includere `FEATURE.md` nel contesto AI (se presente).
- Home portfolio aggiornata con board `In manutenzione` e visualizzazione progresso in card/snapshot.

**Removed:**
- Workflow/template operativi rimossi dalla root (`NGS-PROJECTS-UPDATE.md`, `SESSION-PROMPT-TEMPLATE.md`, `WORKFLOW-*.md`) in favore della fonte unica nel boilerplate.

## Cosa contiene

Questo repository include:
- una cartella per ogni progetto monitorato (`/<nome-progetto>/README.md`),
- una GitHub Pages in `docs/` generata dai README dei progetti,
- script di generazione dati in `tools/generate-pages.ps1`,
- script di bootstrap struttura progetto in `tools/ensure-project-boilerplate.ps1`,
- boilerplate standard in `boilerplate/project-standard/`.

## Source Of Truth Template

I template operativi NON sono mantenuti in root: la fonte unica e il boilerplate.

Riferimenti principali:
- `boilerplate/project-standard/WORKFLOW-STANDARD.md`
- `boilerplate/project-standard/WORKFLOW-DOCS-BOOTSTRAP.md`
- `boilerplate/project-standard/FEATURE-STANDARD.md`
- `boilerplate/project-standard/WORKFLOW-SPECIFICATION.md`
- `boilerplate/project-standard/WORKFLOW-FEATURE-ANALYSIS.md`
- `boilerplate/project-standard/WORKFLOW-GITFLOW.md`
- `boilerplate/project-standard/SESSION-PROMPT-TEMPLATE.md`
- `boilerplate/project-standard/NGS-PROJECTS-UPDATE.md`

## Installazione

1. Clonare il repository:
   `git clone https://github.com/NicolaGhiselliSolutions/ngs-projects.git`
2. Assicurarsi di avere PowerShell disponibile.
3. Per applicare il boilerplate a un progetto target:

```powershell
./tools/ensure-project-boilerplate.ps1 -ProjectPath 'D:\repos\<nome-progetto>'
```

## Utilizzo

- Aggiornare i `README.md` dei progetti monitorati (sezione `## Snapshot` coerente con le convenzioni).
- Rigenerare i dati Pages:

```powershell
./tools/generate-pages.ps1
```

- Effettuare commit e push su `main` per attivare la pubblicazione automatica GitHub Pages.

## Caso Documentazione Assente (Manuale)

Quando un repository non ha documentazione affidabile:
1. Seguire `boilerplate/project-standard/WORKFLOW-DOCS-BOOTSTRAP.md`.
2. Eseguire manualmente `docs/docs-generator/run-with-ai.py` nel repository target.
3. Promuovere `README.md`/`CHANGELOG.md` in root solo dopo review umana.

## GitHub Pages (Struttura Home)

La Home e organizzata in 3 tab:
1. `Da Pianificare a In Corso` con board: `Da pianificare`, `Pianificato`, `In corso`.
2. `In Pausa, In manutenzione, Completato, Archiviato` con board: `In pausa`, `In manutenzione`, `Completato`, `Archiviato`.
3. `Aggiornamenti` con voci da Decision Log/Snapshot, ordinate per data e filtrate dalla ricerca.

## Convenzioni README Progetto

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

## Nota

Il `README.md` di root e il `CHANGELOG.md` di root sono documentazione del portfolio.