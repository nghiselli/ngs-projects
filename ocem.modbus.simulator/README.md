# ocem.modbus.simulator

## Snapshot
- Path implementazione: D:\repos\OCEM\Ocem.Modbus.Simulator
- Stato avanzamento: In corso
- Priorita: Alta
- Progresso: 55%
- Tipo progetto: Cliente
- Includi nel portfolio: Si
- Cliente: OCEM
- Ultimo aggiornamento: 2026-03-10
- Owner: Nicola

## Obiettivo
Mettere a disposizione un simulatore Modbus per validare integrazioni e test end-to-end con dispositivi di campo della famiglia CCR/FMCU/IO LOGIC.

## Contesto / Problema
Il simulatore consente prove realistiche senza infrastruttura completa di campo, velocizzando sviluppo e troubleshooting. Nel repository sono presenti componenti per simulazione dispositivi e librerie socket di supporto.

## Ambito attuale
- [x] Simulazione dispositivi classe CCR (DIAM/UR) e apparati correlati.
- [x] Supporto a scenari FMCU/IO LOGIC nei flussi di test di integrazione.
- [x] Gestione remota e controllo funzionalita simulazione via interfaccia dedicata.
- [ ] Estensione progressiva catalogo device e casi di test regressivi.

## Stack e Architettura
- Linguaggio/framework: .NET 8 (`net8.0-windows` per app principale).
- Soluzione: `SimulatorFieldDevices.sln`.
- Progetti rilevanti: `SimulatorFieldDevices` (`Version 1.5.2`) e `SocketsWrappersLib`.

## Ruolo e contributo personale
- [x] Team Leader architetturale/backend nel perimetro OCEM Infinite.
- [x] Coordinamento integrazione simulatore con gateway e pipeline dati.
- [x] Supporto tecnico per strategie di test su dispositivi Modbus.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Foundation simulatore Modbus | 2025 | Completata | Simulazione base operativa |
| Evoluzione feature dispositivi | 2025-2026 | In corso | Estensione tipologie e comandi |
| Stabilizzazione test-lab | 2026 | Pianificata | Consolidamento flussi di validazione |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-10 | Inserito simulatore Modbus nel portfolio come modulo attivo | Tracciare chiaramente il supporto testing hardware-like |

## Rischi / Note
- Accuratezza simulazione da mantenere allineata con firmware/device reali.
- Dipendenza da configurazione rete locale per test TCP/IP consistenti.

