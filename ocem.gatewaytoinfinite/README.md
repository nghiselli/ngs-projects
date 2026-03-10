# ocem.gatewaytoinfinite

## Snapshot
- Path implementazione: D:\repos\OCEM\Ocem.GatewayToInfinite
- Stato avanzamento: In corso
- Priorita: Alta
- Progresso: 55%
- Tipo progetto: Cliente
- Includi nel portfolio: No
- Cliente: OCEM
- Ultimo aggiornamento: 2026-03-10
- Owner: Nicola

## Obiettivo
Mantenere un'applicazione desktop che wrappa il browser di Infinite e controlla le interazioni utente per garantire l'applicazione sempre in primo piano nel contesto operativo.

## Contesto / Problema
In scenari operativi dedicati e necessario vincolare il comportamento UI dell'ambiente client, riducendo distrazioni/uscite dal perimetro applicativo e centralizzando configurazioni di avvio.

## Ambito attuale
- [x] Wrapper desktop con finestra browser dedicata (`BrowserWindow`).
- [x] Gestione configurazioni frontend tramite file di configurazione.
- [x] Flussi UI amministrativi/configurativi (`LoginAdmin`, `ConfigurationWindow`, pagine di servizio).
- [x] Gestione cache WebView2 e script di supporto operativo.
- [ ] Evoluzione controlli kiosk/foreground in base ai requisiti di deployment.

## Stack e Architettura
- Linguaggio/framework: .NET 6 Windows (`net6.0-windows10.0.19041.0`).
- Soluzione: `SWOAT_GatewayToInfinite.sln`.
- Progetto principale: `SWOAT_Ocem_Frontend` (WPF/desktop wrapper).
- Nota operativa: configurazione via environment variable `Ocem-Frontend`.

## Ruolo e contributo personale
- [x] Team Leader tecnico su architettura/backend della suite Infinite.
- [x] Coordinamento integrazione wrapper desktop con frontend e configurazioni di stazione.
- [x] Definizione linee di comportamento applicativo per ambiente always-on-top.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Foundation wrapper desktop Infinite | 2025 | Completata | Base app e flussi core |
| Evoluzione controlli interazione utente | 2025-2026 | In corso | Migliorie su UX operativa controllata |
| Consolidamento deployment stazione | 2026 | Pianificata | Hardening runtime e manutenzione |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-10T09:00:00+01:00 | Inserita app GatewayToInfinite nel portfolio come modulo attivo | Rappresentare il layer desktop operativo della suite |

## Rischi / Note
- Comportamento runtime legato a ambiente Windows, WebView2 e policy stazione.
- Necessaria validazione continua su installazioni reali per garantire vincoli foreground.

