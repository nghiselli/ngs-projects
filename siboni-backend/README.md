# siboni-backend

## Snapshot
- Path implementazione: Z:\Stoorm5\Projects\Siboni\siboni.backend
- Stato avanzamento: Completato
- Priorita: Alta
- Progresso: 100%
- Tipo progetto: Cliente
- Includi nel portfolio: No
- Cliente: Siboni S.r.l.
- Ultimo aggiornamento: 2024-03-09
- Owner: Nicola

## Obiettivo
Supportare il backend MES del cliente Siboni per gestione processi applicativi, integrazione dati e servizi business centrali del prodotto.

## Contesto / Problema
Il repository non include documentazione funzionale estesa, ma dalla struttura emerge un backend enterprise su stack Java/Spring con dipendenze per security, websocket, state machine, QueryDSL e migrazioni DB, tipico di una piattaforma MES articolata.

## Ambito consegnato
- [x] Evoluzione backend su architettura Spring Boot.
- [x] Integrazioni dati e logica applicativa MES.
- [x] Supporto a componenti condivisi con frontend dedicato.
- [x] Attivita di manutenzione e stabilizzazione in ambito cliente.

## Stack e Architettura
- Linguaggio/framework: Java 11, Spring Boot 2.2.6 (WAR packaging).
- Data layer: Spring Data JPA, QueryDSL, Liquibase, driver SQL Server.
- Integrazioni: WebSocket, Spring Security, Spring State Machine.
- Build: Gradle multi-config con publishing interno.
- Versioning rilevato: artifact backend `2.0.3`.

## Contributo personale
- [x] Contributo prevalente su frontend Angular del dominio Siboni.
- [x] Attivita mirate su plugin/componenti .NET a supporto integrazioni richieste.
- [x] Supporto tecnico trasversale per allineamento frontend/backend durante le consegne.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Setup piattaforma backend MES | 2022-2023 | Completata | Foundation Spring/DB/security |
| Evoluzioni funzionali cliente | 2023-2025 | Completata | Incrementi su processi e integrazioni |
| Stabilizzazione progetto | 2025 | Completata | Chiusura attivit? principali |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2024-03-09 | Classificato progetto Siboni backend come completato nel portfolio NGS | Consolidare lo storico progetti cliente con metadati uniformi |

## Rischi / Note
- Assenza di documentazione funzionale dettagliata nel repository sorgente.
- Presenza nel `build.gradle` di riferimenti infrastrutturali interni storici da considerare solo come contesto tecnico.


