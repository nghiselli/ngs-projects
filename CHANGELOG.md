# Changelog

Tutte le modifiche rilevanti di `ngs-projects` saranno documentate in questo file.

## [Unreleased]

### Added
- Tracking progresso per progetto con campo Snapshot `Progresso` e output dati `progressPercent/progressText`.
- Nuovo stato portfolio `In manutenzione` per progetti completati ma ancora attivi.
- Progetto portfolio `ngs-projects` con stato `In manutenzione` e progresso `95%`.
- File guida `NGS-PROJECTS-UPDATE.md` per aggiornamento strutturato README progetto (seed su `Ocem.Snmp.Simulator`).

### Changed
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
