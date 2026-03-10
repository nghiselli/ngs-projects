# ocem.gateway.modbus

## Snapshot
- Path implementazione: D:\repos\OCEM\Ocem.Gateway.Modbus
- Stato avanzamento: In corso
- Priorita: Alta
- Progresso: 55%
- Tipo progetto: Cliente
- Includi nel portfolio: No
- Cliente: OCEM
- Ultimo aggiornamento: 2026-03-10
- Owner: Nicola

## Obiettivo
Realizzare il gateway Modbus che legge dati da dispositivi di campo e li pubblica su DDS per l'ecosistema OCEM Infinite.

## Contesto / Problema
Il modulo rappresenta il ponte tra dispositivi Modbus e bus DDS di sistema. Oltre alla logica di polling/pubblicazione, include componenti dedicati alla business logic operativa come `Ocem.Stopbar.Manager`.

## Ambito attuale
- [x] Gateway principale per acquisizione stati/comandi da dispositivi Modbus.
- [x] Pubblicazione dati verso DDS tramite dipendenza `ocem.plugin.dds`.
- [x] Modulo `Ocem.Stopbar.Manager` per business logic legata alle stopbar.
- [x] Componenti ausiliari di dominio (HMI/segments management/librerie di supporto).
- [ ] Hardening operativo e tuning prestazionale su scenari campo reali.

## Stack e Architettura
- Linguaggio/framework: .NET 9 (gateway e stopbar manager), librerie di supporto .NET 8/6.
- Soluzione: `Gateway.Modbus.sln`.
- Progetti rilevanti: `SWOAT_Gateway.Modbus`, `Ocem.Stopbar.Manager`, `ocem.plugin.dds`.
- Versioni rilevate: gateway `2.4.0`, stopbar manager `1.2.0`, plugin DDS `3.12.0`.

## Ruolo e contributo personale
- [x] Team Leader tecnico su architettura/backend della suite Infinite.
- [x] Coordinamento integrazione tra gateway Modbus, DDS e moduli core.
- [x] Supporto alla modellazione della business logic stopbar.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Foundation gateway Modbus + DDS | 2025 | Completata | Base di integrazione pronta |
| Integrazione business stopbar | 2025-2026 | In corso | Evoluzione su regole operative |
| Stabilizzazione e rollout esteso | 2026 | Pianificata | Consolidamento deploy e monitoraggio |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-10 | Tracciato il gateway Modbus come progetto portfolio autonomo | Evidenziare il ruolo gateway nella catena dati Infinite |

## Rischi / Note
- Mix di framework/versioni da gestire con attenzione tra progetti della soluzione.
- Robustezza end-to-end legata a rete di campo, qualita polling e coerenza mapping DDS.

