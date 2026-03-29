# ocem.modbus.simulator.v2

## Snapshot
- Path implementazione: D:\repos\OCEM\Ocem.Modbus.Simulator.v2
- Stato avanzamento: In corso
- Priorita: Alta
- Progresso: 65%
- Tipo progetto: Cliente
- Includi nel portfolio: Si
- Cliente: OCEM
- Ultimo aggiornamento: 2026-03-29
- Owner: Nicola

## Obiettivo
Migrare il simulatore Modbus OCEM da WinForms legacy a stack moderno .NET 10 con UI Web (Blazor/MudBlazor), mantenendo compatibilita comportamentale lato simulazione e protocollo.

## Contesto / Problema
Il progetto v2 nasce per rendere il simulatore piu testabile, estendibile e mantenibile, separando UI, dominio simulazione e gestione Modbus. La priorita e preservare il comportamento reale usato nei test di integrazione su CCR/FMCU/MOXA/MDuino.

## Ambito attuale
- [x] Reverse engineering del legacy completato (architettura, flussi, register map principali).
- [x] Baseline solution multilayer v2 rilasciata (`v0.1.0`).
- [x] Porting core simulation/mapping Modbus profile-aware e bootstrap scenario typed file-based consolidato (`v0.2.0`).
- [x] UI manager profile-based e tooling verifica phase 02/07/09 introdotti.
- [ ] Runtime Modbus TCP end-to-end per-device (phase 10) da implementare.
- [ ] Chiusura parity avanzata e cutover checklist finale post-runtime Modbus.

## Stack e Architettura
- Linguaggio/framework: .NET 10, C#.
- UI: Blazor Server (predisposta integrazione MudBlazor).
- Solution: `Ocem.Modbus.Simulator.slnx`.
- Layer principali: `Web`, `Application`, `Domain`, `Modbus`, `Infrastructure`, `Contracts`.

## Ruolo e contributo personale
- [x] Definizione architettura target e piano migrazione incrementale.
- [x] Porting baseline tecnico + setup release iniziale.
- [x] Porting simulation core parity-oriented + mapping profile-aware e configurazioni typed fail-first.
- [x] Impostazione documentazione equivalenza legacy-v2, workflow verifica e checkpoint di rilascio.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Analisi legacy + skeleton v2 | 2026-Q1 | Completata | Release `v0.1.0` |
| Porting core parity baseline (phase 03-09) | 2026-Q1/Q2 | Completata | Release `v0.2.0` |
| Runtime Modbus TCP per-device (phase 10) | 2026-Q2 | In corso | Listener/MBAP/binding state-authority |
| UI parity avanzata + cutover checklist finale | 2026-Q2/Q3 | Pianificata | Chiusura parity post phase 10 |

## Next Steps
1. Implementare phase 10 (host Modbus TCP per-device, parser MBAP, binding router/state).
2. Applicare enforcement operativo `Power ON/OFF` e autorita `LOCAL/REMOTE` (AUX escluso).
3. Eseguire comparazione parity/replay avanzata dopo runtime Modbus.
4. Chiudere phase 07 (`DONE`) con verbale manuale finale e aggiornare matrice equivalenza.

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-28T19:15:00+01:00 | Avviato tracking dedicato `ocem.modbus.simulator.v2` con release `v0.1.0` | Separare il percorso di migrazione v2 dal simulatore legacy |
| 2026-03-29T18:45:00+01:00 | Rilasciata baseline `v0.2.0` e allineata roadmap su phase 10 | Consolidare stato pre-runtime Modbus e preparare incremento tecnico successivo |

## Rischi / Note
- Compatibilita comportamentale Modbus end-to-end dipendente da phase 10 (host TCP runtime).
- Regole dominio confermate da applicare in runtime: `START/Power`, matrice autorita `LOCAL/REMOTE`, `AUX` escluso.
- Necessaria validazione manuale parity avanzata su matrix dispositivi reali/simulati dopo runtime Modbus.

