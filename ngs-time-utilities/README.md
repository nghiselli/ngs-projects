# ngs-time-utilities

## Snapshot
- Path progetto idee: D:\repos\NicolaGhiselliSolutions\ngs-project-ideas\ngs-time-utilities
- Path implementazione: D:\repos\NicolaGhiselliSolutions\ngs-time-utilities
- Stato avanzamento: In corso avanzato (v2.6.0 stabile, roadmap v3.0.0 avviata)
- Priorita: Media
- Ultimo aggiornamento: 2026-03-09
- Owner: Nicola

## Obiettivo
Consolidare una piattaforma operativa per monitoraggio giornate/ore, integrazione Asana-Clockify e reporting utile al lavoro quotidiano, con potenziale di upsell verso il cliente principale.

Documenti principali di riferimento:

| Documento | Descrizione |
|---|---|
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities\README.md` | Documentazione operativa del progetto implementativo |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities\CHANGELOG.md` | Storico versioni e cambiamenti |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities\PROJECT_STATUS.md` | Stato tecnico generale e metriche progetto |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities\docs\notes\todo.md` | Task attuali, miglioramenti e idee future |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities\docs\context\v2.6.0-release-notes.md` | Dettaglio tecnico release v2.6.0 |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities\docs\context\v2.6.0-release-summary.md` | Sintesi release v2.6.0 |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities\docs\context\v3.0.0-specification.md` | Specifica target multi-team/auth/RBAC |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities\docs\context\v3.0.0-sprints-backlog.md` | Backlog sprint fino al target v3.0.0 |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities\docs\context\v3.0.0-sprints-tasks.md` | Task operativi dettagliati per sprint |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities\docs\context\v4.0.0-analysis-wizard-idea.md` | Discovery per modulo Analysis Wizard |

## Contesto / Problema
Il progetto automatizza task giornalieri ad alto impatto (import dati, confronto, sync, reporting). Riduce tempo operativo manuale e rende tracciabile il lavoro, creando una base concreta per proposta commerciale evolutiva.

## Ambito V1 (MVP)
- [x] Import automatico da Clockify API e Asana API con gestione batch (import/refresh/delete/reset).
- [x] Confronto Clockify vs Asana con analisi discrepanze e sync controllata.
- [x] Dashboard KPI, trend mensile/settimanale, ferie/festivita e archivio contratti conclusi.
- [x] Logs viewer config-driven con diagnostica NLog.
- [ ] Copertura test automatica significativa (attualmente solo test placeholder).
- [ ] Hardening sicurezza applicativa in vista scenario multi-utente (auth/RBAC).

## Fuori Ambito (Per Ora)
- [ ] Analysis Wizard LLM completo (roadmap v4.x).
- [ ] Assegnazione automatica task senza validazione manageriale (si mantiene human-in-the-loop).
- [ ] Scalabilita enterprise oltre il perimetro target v3 (10 team / 100 employee).

## Stack e Architettura Ipotizzata
- Linguaggio/framework: .NET 10, Blazor Server, MudBlazor
- Storage/database: EF Core 9 + Pomelo + MariaDB
- Pattern: Clean Architecture + MediatR (CQRS)
- Integrazioni esterne: Clockify Reports API v1, Asana Time Tracking API v1.0
- Osservabilita/UI: NLog + ApexCharts
- Vincoli tecnici: API rate limits; qualita dati import eterogenea; sicurezza token/segreti; futura separazione dati multi-team (`tenant = team`).

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| v0.1.0 - Foundation | 2025-12-05 | Completata | Bootstrap soluzione, DB, CQRS, UI base |
| v2.0.0 - API Integrations + Comparison | 2025-12-08 | Completata | Import Asana/Clockify e confronto avanzato |
| v2.3.0 - Archive Module | 2026-02-14 | Completata | Archivio contratti e viste dedicate |
| v2.4.0 - Sync Robustness | 2026-02-20 | Completata | Sync entries con dialog duplicati/orfani |
| v2.5.0 - Performance & Filtering | 2026-02-18 | Completata | Caching DB task mapping e filtro multi-homing |
| v2.6.0 - Logs Platform | 2026-02-22 | Completata | Logs viewer dinamico e diagnostica NLog |
| v3.0.0 - Multi-team + Auth/RBAC | 2026-06-30 | Pianificata | Tenant=team, ruoli, provisioning DB, ownership |
| v4.0.0 - Analysis Wizard | 2026-H2 | Discovery | Idea modulo LLM con approvazione manageriale |

## Next Steps (2-4 Settimane)
1. Eseguire Sprint 0 v3: hardening baseline Employee e rimozione segreti hardcoded.
2. Introdurre una prima suite test reale (unit + integration) sui flussi import/comparison/sync.
3. Chiudere i punti critici da `docs\notes\todo.md` (projected trend review, check dialog delete orphans, improve filters).
4. Preparare avvio Sprint 1 v3 (Identity + invitation flow + catalog DB), idealmente allineato al modulo `ngs-authentication`.

## Prompt / Specifiche da Preparare
- [ ] Spec 01 - Sprint 0 hardening e security baseline (config/segreti/test regressione)
- [ ] Spec 02 - v3 Identity + Catalog DB + modello ruoli/permessi
- [ ] Spec 03 - Ownership per-user + anti-dup multi-user nei flussi integrazione
- [ ] Prompt 01 - Implementazione test pack iniziale su handler core
- [ ] Prompt 02 - Refactor algoritmo projected trend con test e documentazione
- [ ] Prompt 03 - Foundation auth/invite con integrazione modulo shared authentication

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2025-12-08 | Adozione import API-first Asana/Clockify con batch management | Ridurre lavoro manuale e aumentare affidabilita operativa |
| 2026-02-18 | Introduzione caching DB task mapping e filtro multi-homing | Migliorare performance export e precisione task |
| 2026-02-22 | Adozione logs viewer config-driven con diagnostica NLog | Ridurre tempo di troubleshooting |
| 2026-02-26 | Definizione roadmap v3 (`tenant = team`, auth, RBAC, provisioning) | Evolvere verso prodotto multi-team commercializzabile |
| 2026-03-09 | Priorita a hardening/test prima del refactor strutturale v3 | Ridurre regressioni sui flussi gia stabili |

## Rischi / Blocchi
- Copertura test quasi nulla (presente solo `UnitTest1` placeholder).
- Sicurezza non ancora completa: auth/RBAC non implementati nella base corrente.
- Complessita migrazione da modello single-user a multi-team con storico dati.
- Dipendenza da API esterne (rate limit, cambi endpoint/modello dati).
- Backlog funzionale aperto su algoritmo projected trend e quality-of-life UX.

## Note Libere
- Nei riferimenti documentali usare i nomi file reali: `v3.0.0-specification.md` e `v4.0.0-analysis-wizard-idea.md`.
- Progetto correlato: `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities-cli` (esperienza CLI interattiva).
- Quando pronto, `ngs-time-utilities` puo riusare il modulo condiviso `ngs-authentication` per la fase v3.
