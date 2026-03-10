# ocem.ilcms.simulator

## Snapshot
- Path implementazione: D:\repos\OCEM\Ocem.Ilcms.Simulator
- Stato avanzamento: In corso
- Priorita: Alta
- Progresso: 55%
- Tipo progetto: Cliente
- Includi nel portfolio: Si
- Cliente: OCEM
- Ultimo aggiornamento: 2026-03-10
- Owner: Nicola

## Obiettivo
Fornire un simulatore ILCMS per dispositivi ECB e sensori, utile a sviluppo, test funzionali e validazione integrazioni della suite OCEM Infinite.

## Contesto / Problema
Per ridurre dipendenza dall'hardware reale durante sviluppo e collaudo, il simulatore riproduce il comportamento di dispositivi di campo e offre endpoint/UI utili al ciclo di test.

## Ambito attuale
- [x] Simulazione dispositivi ECB.
- [x] Simulazione sensori.
- [x] Interfaccia applicativa con pagine dedicate (`Ecb`, `Sensor`) e servizi di simulazione.
- [x] Endpoint controller/hub per interazioni runtime.
- [ ] Estensione scenari e fidelity simulation in base ai casi d'uso di integrazione.

## Stack e Architettura
- Linguaggio/framework: .NET 9.
- Progetto principale: `DeviceModbusSimulator.csproj` (`Version 1.1.0`).
- Struttura: web app con componenti Razor, controller API, servizi di simulazione e logging NLog.

## Ruolo e contributo personale
- [x] Team Leader tecnico su architettura/backend della piattaforma Infinite.
- [x] Coordinamento uso simulatore nei flussi di test e validazione integrazioni.
- [x] Allineamento del simulatore alle esigenze dei moduli gateway/backend.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Foundation simulator ECB/Sensor | 2025 | Completata | Base simulazione disponibile |
| Evoluzione feature di test | 2025-2026 | In corso | Miglioramento flussi e configurazione |
| Consolidamento per regression lab | 2026 | Pianificata | Maggiore copertura scenari |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-10T09:00:00+01:00 | Inserito simulatore ILCMS nel portfolio della suite Infinite | Rendere visibile la componente test fondamentale |

## Rischi / Note
- Rappresentativita rispetto all'hardware reale da verificare continuamente.
- Necessario mantenere coerenti i modelli con evoluzioni protocollari e funzionali.


