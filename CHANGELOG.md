# Changelog

Tutte le modifiche rilevanti di `ngs-projects` saranno documentate in questo file.

## [Unreleased]

### Added
- Tracking progresso per progetto con campo Snapshot `Progresso` e output dati `progressPercent/progressText`.
- Nuovo stato portfolio `In manutenzione` per progetti completati ma ancora attivi.
- Progetto portfolio `ngs-projects` con stato `In manutenzione` e progresso `95%`.
- File guida `NGS-PROJECTS-UPDATE.md` per aggiornamento strutturato README progetto (seed su `Ocem.Snmp.Simulator`).
- Nuovi workflow standard `WORKFLOW-SPECIFICATION.md` e `WORKFLOW-FEATURE-ANALYSIS.md` per formalizzare raccolta specifiche e analisi tecnica.
- Nuovo indice operativo `WORKFLOW-STANDARD.md` per orchestrare il flusso end-to-end tra tutti i template.
- Boilerplate standard `boilerplate/project-standard/` con struttura cartelle e template markdown riusabili.
- Script `tools/ensure-project-boilerplate.ps1` per verificare/completare automaticamente la struttura dei progetti target.
- Nuovo workflow `WORKFLOW-DOCS-BOOTSTRAP.md` per bootstrap manuale di `README.md`/`CHANGELOG.md` da history git quando manca documentazione pregressa.
- Pacchetto boilerplate esteso con `docs/docs-generator/` per il caso legacy/non documentato.

### Changed
- `SESSION-PROMPT-TEMPLATE.md` allineato al nuovo flusso (gate specifica/analisi + riferimenti ai workflow standard).
- README root esteso con sezione dedicata ai workflow standard AI agent.
- README root aggiornato con sezione boilerplate e comandi script di bootstrap (`ensure-project-boilerplate.ps1`).
- `WORKFLOW-STANDARD.md` aggiornato con Fase 0 opzionale per bootstrap documentazione manuale.
- README root aggiornato con caso `docs-generator` manuale (solo quando manca documentazione affidabile).
- Cleanup root portfolio: rimossi i workflow/template duplicati dalla root e mantenuti solo in `boilerplate/project-standard/` con riferimenti centralizzati nel README.
- Home tab "chiusi" aggiornata con board `In pausa`, `In manutenzione`, `Completato`, `Archiviato`.
- Card progetto aggiornate con visualizzazione progresso (% + barra).
- Pagina dettaglio progetto aggiornata con progresso in meta e snapshot.
- Lista aggiornamenti non piu limitata ai primi 12 record (mostra tutte le voci filtrate).
- Counter nella hero disposti su una singola riga, centrati e con valore piu leggibile.
- README root aggiornato alle convenzioni correnti (stati, progresso, includi nel portfolio).

### Existing Base
- Setup GitHub Pages portfolio in `docs/` con home, dettaglio progetto e sezione aggiornamenti.
- Script `tools/generate-pages.ps1` per generare i dati del sito dai README progetto.
- Supporto branding tramite `docs/data/brand.js` (logo + informazioni aziendali).
- Fallback dati locale con `docs/data/projects.js` e `docs/data/readmes.js` per aprire il sito anche in `file://`.
