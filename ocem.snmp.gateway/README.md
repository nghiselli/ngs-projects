# ocem.snmp.gateway

## Snapshot
- Path implementazione: D:\repos\OCEM\Ocem.SNMP.Gateway
- Stato avanzamento: In corso
- Priorita: Alta
- Progresso: 55%
- Tipo progetto: Cliente
- Includi nel portfolio: Si
- Cliente: OCEM
- Ultimo aggiornamento: 2026-03-10
- Owner: Nicola

## Obiettivo
Sviluppare il gateway SNMP che acquisisce dati da dispositivi SNMP e li pubblica su DDS, come base tecnica per la funzionalita SAO (System Architecture Overview) di Infinite.

## Contesto / Problema
Per abilitare SAO servono pipeline affidabili di raccolta dati SNMP, normalizzazione e distribuzione nel bus dati di piattaforma. Il gateway e pensato come fondazione per questa capability.

## Ambito attuale
- [x] Servizio gateway SNMP (`Ocem_SNMP_Gateway`).
- [x] Integrazione con `ocem.plugin.dds` per pubblicazione su DDS.
- [x] Suite test dedicata (`Ocem_SNMP_Gateway.Tests`).
- [ ] Espansione copertura device profile e hardening in vista adozione SAO.

## Stack e Architettura
- Linguaggio/framework: .NET 8.
- Soluzione: `ocem_snmp_gateway.sln`.
- Versioni rilevate: gateway `1.0.0`, plugin DDS `3.12.0`.
- Ruolo prodotto: layer di acquisizione SNMP per roadmap System Architecture Overview.

## Ruolo e contributo personale
- [x] Team Leader architetturale/backend su suite OCEM Infinite.
- [x] Definizione integrazione gateway-SAO con bus DDS di prodotto.
- [x] Allineamento tecnico con servizi backend e frontend di osservabilita.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Foundation gateway SNMP | 2025 | Completata | Base net8 e test iniziali |
| Integrazione SAO pipeline | 2025-2026 | In corso | Evoluzione modelli e telemetrie |
| Stabilizzazione per scenari enterprise | 2026 | Pianificata | Hardening e scaling |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-10T09:00:00+01:00 | Inserito gateway SNMP nel portfolio come iniziativa dedicata | Rendere esplicita la base tecnica della feature SAO |

## Rischi / Note
- Profili SNMP eterogenei tra vendor richiedono continua estensione/validazione.
- L'efficacia SAO dipende da qualita dati e mapping semantico verso il modello Infinite.

