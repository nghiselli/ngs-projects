# ocem.modbus.simulator.v2

## Snapshot
- Path implementazione: D:\repos\OCEM\Ocem.Modbus.Simulator.v2
- Stato avanzamento: In corso
- Priorita: Alta
- Progresso: 35%
- Tipo progetto: Cliente
- Includi nel portfolio: Si
- Cliente: OCEM
- Ultimo aggiornamento: 2026-03-28
- Owner: Nicola

## Obiettivo
Migrare il simulatore Modbus OCEM da WinForms legacy a stack moderno .NET 10 con UI Web (Blazor/MudBlazor), mantenendo compatibilita comportamentale lato simulazione e protocollo.

## Contesto / Problema
Il progetto v2 nasce per rendere il simulatore piu testabile, estendibile e mantenibile, separando UI, dominio simulazione e gestione Modbus. La priorita e preservare il comportamento reale usato nei test di integrazione su CCR/FMCU/MOXA/MDuino.

## Ambito attuale
- [x] Reverse engineering del legacy completato (architettura, flussi, register map principali).
- [x] Baseline solution multilayer v2 rilasciata (`v0.1.0`).
- [x] Baseline UI Web + servizi applicativi/minimo routing Modbus implementati.
- [ ] Porting completo state machine device-specific con parity legacy.
- [ ] Copertura test parity completa (unit/integration/manual matrix).

## Stack e Architettura
- Linguaggio/framework: .NET 10, C#.
- UI: Blazor Server (predisposta integrazione MudBlazor).
- Solution: `Ocem.Modbus.Simulator.slnx`.
- Layer principali: `Web`, `Application`, `Domain`, `Modbus`, `Infrastructure`, `Contracts`.

## Ruolo e contributo personale
- [x] Definizione architettura target e piano migrazione incrementale.
- [x] Porting baseline tecnico + setup release iniziale.
- [x] Impostazione documentazione di equivalenza legacy-v2 e workflow operativo.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Analisi legacy + skeleton v2 | 2026-Q1 | Completata | Release `v0.1.0` |
| Porting simulation/modbus parity | 2026-Q2 | In corso | Focus su CCR/UR/CCRMW/LFlash/Aux |
| UI parity + test matrix finale | 2026-Q2/Q3 | Pianificata | Validazione completa pre-cutover |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-28T19:15:00+01:00 | Avviato tracking dedicato `ocem.modbus.simulator.v2` con release `v0.1.0` | Separare il percorso di migrazione v2 dal simulatore legacy |

## Rischi / Note
- Compatibilita comportamentale Modbus da verificare su casi legacy edge.
- Integrazione MudBlazor non ancora completata nella baseline.
- Necessaria validazione manuale su matrix dispositivi reali/simulati.
