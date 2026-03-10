# cae-sentry-backend

## Snapshot
- Path implementazione: Z:\Stoorm5\Projects\CAE\sentry-backend
- Stato avanzamento: Completato
- Priorita: Alta
- Progresso: 100%
- Tipo progetto: Cliente
- Includi nel portfolio: Si
- Cliente: CAE S.p.A.
- Ultimo aggiornamento: 2023-03-09
- Owner: Nicola

## Obiettivo
Realizzare e stabilizzare il backend di Sentry (ADS - Alarm Dissemination System) per la gestione della diffusione allarmi, integrazione CAP con AIS e orchestrazione plugin di comunicazione.

## Contesto / Problema
Il progetto nasce dalla modernizzazione di Patrol verso una piattaforma web e multipiattaforma. Il backend deve gestire flussi di allertamento affidabili, sicurezza applicativa e integrazione con diversi canali (email, SMS, VoIP, Telegram, notifiche app, processi esterni), mantenendo tracciabilita e reportistica.

## Ambito consegnato
- [x] Servizi backend ASP.NET Core per gestione diffusione allarmi.
- [x] Integrazione messaggi CAP tra AIS e ADS.
- [x] Gestione autenticazione/API key e logging con NLog.
- [x] Supporto diagnostica e tracciamento eventi/audit.
- [x] Estensioni legate a sicurezza e hardening operativo.

## Stack e Architettura
- Linguaggio/framework: .NET 5, ASP.NET Core Web API.
- Storage/database: EF Core 5 con provider PostgreSQL/MySQL.
- Integrazioni: CAP (Common Alerting Protocol), NLog Syslog, Swagger.
- Struttura soluzione: `Sentry.Backend.sln` con progetti separati DTO/Service/Web.
- Note tecniche: architettura orientata a plugin e deployment Linux-friendly.

## Specifiche e riferimenti principali
- `Z:\Stoorm5\Projects\CAE\Documents\1.5_Patrol v2 Specifiche Tecniche [conTest].docx`
- `Z:\Stoorm5\Projects\CAE\Documents\[2023-10-11] Relazione Estensione Funzionalita Sentry.docx`
- `Z:\Stoorm5\Projects\CAE\Documents\Relazione Potenziamento della Sicurezza.docx`

Elementi funzionali ricorrenti nelle specifiche:
- interfaccia AIS/ADS basata su CAP con validazione e gestione errori;
- gestione profili di diffusione, contatti/reperibilita e reportistica;
- requisiti sicurezza (ISO 27017, linee guida OWASP, logging, session handling, policy utenti/ruoli).

## Contributo personale
- [x] Sviluppo prevalentemente frontend Angular per funzionalita e flussi operativi.
- [x] Attivita mirate anche su plugin/componenti in .NET collegati alla diffusione.
- [x] Supporto su estensioni di sicurezza e adeguamento comportamenti richiesti dal cliente.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Modernizzazione Patrol verso Sentry ADS | 2021 | Completata | Migrazione verso stack web/.NET Core |
| Estensioni funzionali Sentry | 2023 | Completata | Miglioramenti e finalizzazioni post-installazione |
| Potenziamento sicurezza (ISO/OWASP) | 2023 | Completata | Hardening e verifiche dedicate |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2023-03-09 | Documentazione progetto allineata nel portfolio NGS come progetto completato | Centralizzare storico e stato avanzamento |
| 2023-10-11 | Consolidato pacchetto estensioni/finalizzazioni richieste da CAE | Ridurre effort installativo e migliorare affidabilita operativa |

## Rischi / Note
- Repository originale con documentazione tecnica parziale nel README.
- Alcune scelte architetturali e di deployment dipendono dal contesto cliente e dalle installazioni.



