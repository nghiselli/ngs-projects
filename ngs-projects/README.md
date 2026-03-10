# ngs-projects

## Snapshot
- Path implementazione: D:\repos\NicolaGhiselliSolutions\ngs-projects
- Stato avanzamento: In manutenzione
- Priorita: Alta
- Progresso: 95%
- Tipo progetto: Personale
- Includi nel portfolio: Si
- Ultimo aggiornamento: 2026-03-10
- Owner: Nicola

## Obiettivo
Mantenere e far evolvere il portfolio operativo dei progetti NGS con board di stato, pagine progetto generate dai README e changelog aggiornamenti.

## Contesto / Problema
Il repository e il punto unico di visibilita su roadmap, stato e decisioni dei progetti. Richiede manutenzione continua per coerenza dati, aggiornamenti UI e miglioramento del flusso di pubblicazione GitHub Pages.

## Ambito attuale
- [x] Generazione automatica dati Pages da README progetto.
- [x] Board a tab con stati e counter.
- [x] Pagina progetto con snapshot e README renderizzato.
- [x] Brand/footer aziendale e tema grafico custom.
- [x] Stato `In manutenzione` e progresso per progetto.
- [ ] Refinement continuo UX e governance contenuti.

## Stack e Architettura
- Generazione: PowerShell (`tools/generate-pages.ps1`).
- Frontend statico: HTML/CSS/JavaScript in `docs/`.
- Deploy: GitHub Pages tramite GitHub Actions su branch `main`.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Foundation portfolio | 2026-Q1 | Completata | Struttura base, parsing README, board |
| Evoluzione stati e tabs | 2026-Q1 | Completata | Workflow board migliorato |
| Progress tracking e manutenzione | 2026-Q1 | In manutenzione | Aggiornamenti continui su modello dati/UI |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-10T09:00:00+01:00 | Classificare `ngs-projects` come progetto in manutenzione | Rappresentare correttamente natura attiva ma non greenfield |
| 2026-03-10T09:01:00+01:00 | Mostrare tutti gli aggiornamenti senza limite hardcoded | Aumentare visibilita storica nel tab Aggiornamenti |

## Rischi / Note
- La qualita della board dipende dalla disciplina di aggiornamento README dei singoli progetti.
- Crescendo il numero di progetti, potra servire una futura paginazione/filtro avanzato.
