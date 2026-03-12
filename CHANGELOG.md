# Changelog

Tutte le modifiche rilevanti di `ngs-projects` saranno documentate in questo file.

## [Unreleased]

### Added
- N/A

### Changed
- N/A

### Fixed
- N/A

## [v1.3.0] - 2026-03-12

### Added
- Boilerplate standard in `boilerplate/project-standard/` con template riusabili per README, CHANGELOG, workflow operativi, docs-generator e session prompt.
- Script `tools/ensure-project-boilerplate.ps1` per applicare automaticamente la struttura boilerplate a qualsiasi repository target.
- Workflow `WORKFLOW-STANDARD.md` come indice operativo end-to-end per l'AI agent.
- Workflow `WORKFLOW-DOCS-BOOTSTRAP.md` per il bootstrap manuale della documentazione da history git.
- Workflow `WORKFLOW-SPECIFICATION.md` e `WORKFLOW-FEATURE-ANALYSIS.md` per formalizzare raccolta specifiche e analisi tecnica.
- Pacchetto `docs/docs-generator` nel boilerplate per il caso repository legacy non documentati.
- Tracking progresso per progetto con campo Snapshot `Progresso` e output dati `progressPercent/progressText`.
- Nuovo stato portfolio `In manutenzione` per progetti completati ma ancora attivi.
- Nuovo `FEATURE-STANDARD.md` nel boilerplate per standardizzare `FEATURE.md` e commit quality su branch feature/hotfix.

### Changed
- Cleanup root portfolio: workflow e template duplicati rimossi dalla root e mantenuti solo in `boilerplate/project-standard/`.
- README root aggiornato con sezione boilerplate, comandi script di bootstrap e convenzioni correnti.
- `run-with-ai.py` aggiornato per includere `FEATURE.md` nel contesto AI (se presente).
- Home tab portfolio aggiornata con board `In manutenzione` e visualizzazione progresso (percentuale + barra) nelle card progetto.

### Removed
- Workflow e template operativi rimossi dalla root del repository (`NGS-PROJECTS-UPDATE.md`, `SESSION-PROMPT-TEMPLATE.md`, `WORKFLOW-*.md`) in favore della fonte unica in `boilerplate/project-standard/`.

## [v1.2.0] - 2026-03-10

### Added
- `WORKFLOW-GITFLOW.md` come guida operativa standardizzata per la gestione del flusso Git nei progetti NGS.
- `SESSION-PROMPT-TEMPLATE.md` come template per i prompt di sessione AI agent.

### Changed
- `NGS-PROJECTS-UPDATE.md` consolidato con procedure piu complete e aggiunta dello step di commit nel flusso operativo.
- `WORKFLOW-GITFLOW.md` esteso con versione generica applicabile a qualsiasi progetto NGS.
- README di numerosi progetti aggiornati con correzioni minori e allineamento alle convenzioni.

## [v1.1.0] - 2026-03-10

### Added
- Progetti legacy clienti CAE Sentry (backend e frontend) e Siboni (backend e frontend) aggiunti al portfolio.
- Intera suite OCEM Infinite aggiunta al portfolio: backend, frontend, proxy, configurator, plugin DDS, gateway Modbus, gateway SNMP, simulatori ILCMS e Modbus, SAO MapGenerator, GatewayToInfinite.
- Progetti `ngs-infinite-utilities` e `ngs-projects` aggiunti come voci del portfolio.
- Documento `NGS-PROJECTS-UPDATE.md` come guida operativa per l'aggiornamento strutturato dei README dei progetti.

### Changed
- Frontend della GitHub Pages migliorato con aggiornamenti a stili, JavaScript e ordinamento categorie.
- README di tutti i progetti esistenti aggiornati e allineati alle convenzioni portfolio.

## [v1.0.0] - 2026-03-09

### Added
- GitHub Pages portfolio con home page, pagina dettaglio progetto e workflow di pubblicazione automatica tramite GitHub Actions.
- Script PowerShell `tools/generate-pages.ps1` per generare i dati del sito dai README dei progetti.
- Supporto branding tramite `docs/data/brand.js` con logo e informazioni aziendali NGS.
- Fallback dati locale con `docs/data/projects.js` e `docs/data/readmes.js` per apertura anche in modalita `file://`.
- `README.md` e `CHANGELOG.md` di root come documentazione del portfolio.
- README iniziali dei progetti NGS monitorati.

### Fixed
- Correzioni a layout HTML, stili CSS e logica JavaScript della prima versione della GitHub Pages.