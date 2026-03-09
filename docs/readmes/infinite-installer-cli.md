# infinite-installer-cli

## Snapshot
- Path progetto idee: D:\repos\NicolaGhiselliSolutions\ngs-project-ideas\infinite-installer-cli
- Stato avanzamento: Pianificato
- Priorita: Media
- Tipo progetto: Personale
- Ultimo aggiornamento: 2026-03-08
- Owner: Nicola
- Progetto seed/template di riferimento: D:\repos\NicolaGhiselliSolutions\ngs-time-utilities-cli

## Obiettivo
Creare una CLI interattiva per installazione/manutenzione INFINITE, duale rispetto al wizard principale, con UX a menu e comandi batch per automazione.

## Contesto / Problema
Il wizard attuale copre bene il flusso GUI, ma serve un canale CLI robusto per operatori tecnici, troubleshooting e runbook automatizzati. Per accelerare, il progetto partira dopo aver estratto un template riusabile dalla prima CLI interattiva gia implementata (`ngs-time-utilities-cli`).

## Ambito V1 (MVP)
- [ ] Shell interattiva con menu principale moduli INFINITE
- [ ] Auto-discovery comandi/script per modulo
- [ ] Help contestuale (synopsis/parametri principali)
- [ ] Esecuzione guidata con input parametri e conferme
- [ ] Modalita non interattiva per script/CI (`command + flags`)
- [ ] Logging coerente con formato usato dal progetto installer

## Fuori Ambito (Per Ora)
- [ ] Copertura completa di tutti i moduli in prima release
- [ ] Plugin ecosystem pubblico
- [ ] UI grafica desktop dedicata

## Stack e Architettura Ipotizzata
- Linguaggio/framework: .NET 10 (CLI app)
- Runtime target: Windows (prima fase)
- Integrazione: invocazione moduli esistenti da `ngs-infinite-scripts`
- Configurazione: file JSON/JSONC e variabili ambiente
- Vincoli tecnici:
  - UX interattiva semplice ma scriptabile
  - Coerenza codici di uscita e handling errori
  - Riutilizzo massimo del template derivato da `ngs-time-utilities-cli`

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Template CLI estratto da seed project | 2026-Q2 | Da iniziare | Base comune comandi, parsing, REPL, logging |
| Bootstrap progetto `infinite-installer-cli` | 2026-Q2 | Da iniziare | Setup solution, primi comandi stub |
| MVP CLI interattiva | 2026-Q2/Q3 | Da iniziare | Copertura moduli prioritari |
| Stabilizzazione | 2026-Q3 | Da iniziare | Hardening, test end-to-end, documentazione |

## Next Steps (2-4 Settimane)
1. Completare `ngs-time-utilities-cli` e identificare cosa estrarre come template riusabile.
2. Scrivere specifica template (struttura progetto, convenzioni, componenti shared).
3. Inizializzare repository/solution tecnica di `infinite-installer-cli` con scheletro minimo.
4. Definire backlog MVP con 3-5 comandi prioritari legati ai moduli INFINITE.

## Prompt / Specifiche da Preparare
- [ ] Spec 01 - Template CLI riusabile (output atteso dal seed project)
- [ ] Spec 02 - Command model per moduli INFINITE (interactive + batch)
- [ ] Prompt 01 - Bootstrap `infinite-installer-cli` da template
- [ ] Prompt 02 - Primo comando verticale end-to-end (es. verifica modulo + execution)

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-08 | `infinite-installer-cli` dichiarato progetto duale del wizard | Separare flusso CLI da percorso GUI/wrapper |
| 2026-03-08 | Avvio posticipato finche non e pronto il template da `ngs-time-utilities-cli` | Ridurre rischio e tempi di bootstrap |

## Rischi / Blocchi
- Il progetto dipende dalla maturazione del template CLI nel repo seed
- Possibile divergenza tra UX interattiva e requisiti reali installazione sul campo
- Integrazione con script PowerShell legacy da progettare con attenzione (parametri, exit code, sicurezza)

## Note Libere
- Repo seed corrente: `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities-cli`
- Repo implementazione installazione attuale: `D:\repos\NicolaGhiselliSolutions\ngs-infinite-scripts`
- Coordinare naming/comandi con il progetto principale `infinite-installer`


