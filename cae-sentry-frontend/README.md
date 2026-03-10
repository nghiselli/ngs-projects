# cae-sentry-frontend

## Snapshot
- Path implementazione: Z:\Stoorm5\Projects\CAE\sentry-frontend
- Stato avanzamento: Completato
- Priorita: Alta
- Progresso: 100%
- Tipo progetto: Cliente
- Includi nel portfolio: Si
- Cliente: CAE S.p.A.
- Ultimo aggiornamento: 2023-03-09
- Owner: Nicola

## Obiettivo
Fornire l'interfaccia web di Sentry per configurazione e operativita ADS, rendendo disponibili workflow di gestione allarmi, plugin, utenti e report in modo usabile e coerente con il contesto applicativo CAE.

## Contesto / Problema
Le specifiche Patrol v2 richiedevano il superamento della UI desktop legacy in favore di una UI web responsive, allineata ai pattern CAE e capace di coprire casi d'uso operativi complessi (profili di diffusione, contatti, simulazioni, reportistica, configurazioni).

## Ambito consegnato
- [x] Frontend Angular con pagine operative per configurazione ADS.
- [x] Workflow UI per profili, contatti, gruppi, reperibilita e simulazioni.
- [x] Supporto a estensioni richieste post go-live (manual alerting, ruoli, UX fixes).
- [x] Integrazioni per sicurezza/tracciamento (es. eventi di login/logout e azioni sensibili).
- [x] Adeguamenti per installazioni dietro reverse proxy e diversi ambienti cliente.

## Stack e Architettura
- Linguaggio/framework: Angular 12 (`@angular/core ~12.2.0`), TypeScript 4.3.
- UI: Bootstrap 4.6, ng-bootstrap, ag-grid, ngx-translate.
- Tooling: Angular CLI 12, Karma/Jasmine, ESLint.
- Versione rilevata repository: `1.4.4`.
- Note: nel README sorgente e presente una nota su versioni `lodash` da mantenere stabili.

## Specifiche e riferimenti principali
- `Z:\Stoorm5\Projects\CAE\Documents\1.5_Patrol v2 Specifiche Tecniche [conTest].docx`
- `Z:\Stoorm5\Projects\CAE\Documents\[2023-10-11] Relazione Estensione Funzionalita Sentry.docx`
- `Z:\Stoorm5\Projects\CAE\Documents\Relazione Potenziamento della Sicurezza.docx`

Punti chiave emersi dalla documentazione:
- UI web responsive con stile coerente agli applicativi CAE;
- gestione ruoli (USER/OPERATOR/ADMIN/ROOT) e policy di sicurezza;
- miglioramenti UX su pagine critiche (profili, filtri, login redirect, configurazioni).

## Contributo personale
- [x] Contributo prevalente sul frontend Angular (feature, UX e integrazioni).
- [x] Collaborazione su plugin/.NET per allineare il comportamento end-to-end.
- [x] Attivita di finalizzazione in base ai feedback dei primi clienti installati.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| UI web Patrol v2 / Sentry | 2021 | Completata | Sostituzione interfaccia desktop legacy |
| Ciclo estensioni funzionali | 2023 | Completata | Blocco sicurezza + nuove funzionalita + finalizzazioni |
| Hardening sicurezza UI/flow | 2023 | Completata | Adeguamento a requisiti ISO/OWASP |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2023-03-09T09:00:00+01:00 | Consolidata documentazione portfolio del progetto completato | Mantenere uno storico uniforme nel repository NGS |
| 2023-10-11T09:00:00+01:00 | Prioritizzate estensioni sicurezza e semplificazione installazioni | Rispondere ai feedback dei clienti e alla compliance richiesta |

## Rischi / Note
- README sorgente molto sintetico, con documentazione funzionale principalmente esterna.
- Parte delle decisioni UX dipende da linee guida visuali del cliente e dal contesto di deploy.


