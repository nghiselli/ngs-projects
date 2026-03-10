# siboni-frontend

## Snapshot
- Path implementazione: Z:\Stoorm5\Projects\Siboni\stoorm5.siboni.frontend
- Stato avanzamento: Completato
- Priorita: Alta
- Progresso: 100%
- Tipo progetto: Cliente
- Includi nel portfolio: Si
- Cliente: Siboni S.r.l.
- Ultimo aggiornamento: 2024-03-09
- Owner: Nicola

## Obiettivo
Sviluppare il frontend del MES Siboni con interfacce dedicate ai diversi contesti operativi (manager/tablet), garantendo una UX coerente con i processi di produzione e gestione.

## Contesto / Problema
Il progetto frontend richiede gestione di viste e build differenziate, integrazione con backend di dominio e supporto a workflow operativi sul campo. Nel repository sono presenti script distinti per target manager/tablet e pipeline di build/publish dedicate.

## Ambito consegnato
- [x] Frontend Angular per modulo MES Siboni.
- [x] Gestione build dedicate (`manager`, `tablet`, `all`) e librerie condivise.
- [x] Supporto a sviluppo locale con mock server per accelerare i test UI.
- [x] Manutenzione evolutiva su funzionalita richieste dal cliente.

## Stack e Architettura
- Linguaggio/framework: Angular (workspace storico area v9-v10), TypeScript.
- Build/tooling: Angular CLI, script multi-target, integrazione Gradle.
- Versione rilevata repository: `2.0.13`.
- Script notevoli: `start:manager`, `start:tablet`, `build:manager_prod`, `build:tablet_prod`, `build:all`.

## Indicazioni operative repository sorgente
- Ambiente Node consigliato nel README sorgente: `nvm use 16.20.2`.
- Mock locale disponibile con `npm run mock-server`.

## Contributo personale
- [x] Contributo principale su frontend Angular e UX.
- [x] Supporto su componenti .NET/plugin quando necessario per integrazione o estensioni.
- [x] Allineamento funzionale con esigenze operative del cliente MES.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Foundation frontend MES | 2022-2023 | Completata | Setup architettura UI e primi moduli |
| Evoluzioni funzionali per reparti/ruoli | 2023-2025 | Completata | Iterazioni incremental richieste cliente |
| Stabilizzazione e chiusura ciclo | 2025 | Completata | Stato progetto consolidato |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2024-03-09 | Classificato progetto Siboni frontend come completato nel portfolio NGS | Uniformare monitoraggio e report dei progetti cliente |

## Rischi / Note
- Documentazione funzionale limitata nel repository sorgente.
- Alcuni dettagli di business flow sono legati a conoscenza di dominio interna al cliente.


