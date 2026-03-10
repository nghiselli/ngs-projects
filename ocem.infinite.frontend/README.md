# ocem.infinite.frontend

## Snapshot
- Path implementazione: Z:\Stoorm5\Projects\OCEM\ocem.infinite.frontend.v2
- Stato avanzamento: In corso
- Priorita: Alta
- Progresso: 55%
- Tipo progetto: Cliente
- Includi nel portfolio: Si
- Cliente: OCEM
- Ultimo aggiornamento: 2026-03-10
- Owner: Nicola

## Obiettivo
Consolidare il frontend V2 di OCEM Infinite come suite di moduli UI dedicati a operation, amministrazione, logging e proxy login.

## Contesto / Problema
Il frontend deve coprire domini applicativi differenti mantenendo UX coerente e integrazione con i servizi backend della suite. Nel codice sono presenti moduli separati per `main`, `admin`, `logger`, `proxy` e componenti condivise.

## Moduli funzionali
- [x] Frontend main (backend related) per gestione ALCMS.
- [x] Frontend admin (backend related) per gestione configurazioni.
- [x] Frontend logger (logger related) per gestione logs e alarms.
- [x] Frontend proxy (proxy related) con login custom e redirect verso frontend principale.

## Stack e Architettura
- Linguaggio/framework: Vue 3 + Vite.
- Librerie chiave: Axios, SignalR client, i18next, Chart.js.
- Struttura moduli in `src`: `main`, `admin`, `logger`, `proxy`, `login`, `shared`.
- Versione rilevata package: `3.12.0` (`ocem.infinite.frontend`).
- Script principali: `dev:main`, `dev:logger`, `dev:proxy`, `build:all`, `prepare:infinite`.

## Ruolo e contributo personale
- [x] Team Leader architetturale/backend con coordinamento integrazioni tra frontend e microservizi.
- [x] Allineamento contratti API e flussi applicativi cross-modulo.
- [x] Supporto tecnico alle scelte strutturali della suite UI.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Foundation frontend V2 modulare | 2025 | Completata | Setup moduli principali |
| Evoluzione funzionalita backend/admin/logger/proxy | 2025-2026 | In corso | Incrementi continui |
| Consolidamento UX e release train | 2026 | Pianificata | Uniformita e quality hardening |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-10T09:00:00+01:00 | Inserita suite frontend OCEM Infinite nel portfolio come progetto in corso | Tracciare chiaramente il perimetro multi-modulo del prodotto |

## Rischi / Note
- Coordinamento continuo richiesto tra moduli UI e servizi backend.
- Priorita evolutive influenzate dalle milestone di prodotto e deployment cliente.

