# infinite-installer

## Snapshot
- Path progetto idee: D:\repos\NicolaGhiselliSolutions\ngs-project-ideas\infinite-installer
- Path implementazione attuale: D:\repos\NicolaGhiselliSolutions\ngs-infinite-scripts
- Stato avanzamento: In corso (implementazione PowerShell avanzata; distribuzione in ridefinizione con wrapper .NET 10)
- Priorita: Media
- Ultimo aggiornamento: 2026-03-08
- Baseline implementazione: 2.10.2 (2025-11-12)
- Owner: Nicola

## Obiettivo
Automatizzare in modo affidabile l'installazione di OCEM INFINITE su macchine target Windows, riducendo tempi, errori manuali e variabilita tra installazioni, tramite orchestrazione modulare e distribuzione controllata.

## Contesto / Problema
Il wizard PowerShell e gia ampiamente implementato e in uso tecnico. Il blocco principale e la distribuzione enterprise (protezione IP, signing, packaging, esperienza di installazione cliente). Nuova direzione: host/wrapper in .NET 10 che includa o orchestri gli script in modo non esposto.

## Ambito V1 (MVP)
Le funzionalita installative sono implementate in `D:\repos\NicolaGhiselliSolutions\ngs-infinite-scripts\modules` e orchestrate da `Install-OCEM-INFINITE.ps1`.
- [x] Orchestratore master con profili (`production`, `development`, `minimal`)
- [x] GUI v2 + launcher batch (`Start-Wizard.bat`, `Start-Install.bat`)
- [x] Moduli core disponibili: filesystem, windows-users, tools, dotnet, java, certificates, networking, database, opensplice, nssm, services, infinite-setup, development
- [x] Supporto WhatIf, logging e report, test suite (20 script in `tests/`)
- [x] Fix critici gia introdotti (es. boolean parameters, PS7 bootstrap, pre-validation NSSM)
- [ ] Wrapper/distributore .NET 10 per packaging enterprise
- [ ] Pipeline release unificata (build, signing, package, smoke test)

## Fuori Ambito (Per Ora)
- [ ] Riscrittura completa e immediata di tutta la business logic in C#
- [ ] Licensing server centralizzato
- [ ] Migrazione totale senza riuso moduli PowerShell esistenti

## Stack e Architettura Ipotizzata
- Runtime installazione: PowerShell 7 (moduli esistenti)
- Host distribuzione: .NET 10 (wrapper/launcher/packaging)
- Storage/config: JSONC + file system locale (log/report/template)
- Integrazioni: installer MSI/EXE, registry Windows, servizi Windows
- Vincoli tecnici:
  - Esecuzione amministrativa su target machine
  - Installation pack locale/offline
  - Licenze cliente fuori da Git
  - Protezione script in fase di distribuzione

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Discovery tecnica | 2025-Q3 | Completata | Architettura modulare e orchestratore master definiti |
| MVP tecnico installazione | 2025-Q4 | In corso avanzato | Baseline v2.10.2 con moduli principali operativi |
| Strategia wrapper .NET 10 | 2026-Q2 | In definizione | Decisione presa, serve PoC tecnico |
| Packaging e distribuzione cliente | 2026-Q2/Q3 | Da iniziare | Dipende da wrapper + pipeline release |

## Next Steps (2-4 Settimane)
1. Definire design document del wrapper .NET 10 (modalita embed/invoke script, gestione config, logging, error handling).
2. Creare PoC minimale: eseguire 1-2 moduli PowerShell dal wrapper con passaggio parametri e codici di uscita coerenti.
3. Formalizzare pipeline di rilascio: build wrapper, firma artefatti, package ZIP/MSI, smoke test su VM pulita.
4. Allineare backlog tecnico condiviso con progetto `infinite-installer-cli` (componenti riusabili, parser comandi, UX).

## Prompt / Specifiche da Preparare
- [ ] Spec 01 - Wrapper .NET 10 (architettura, boundary, requisiti non funzionali)
- [ ] Spec 02 - Release pipeline enterprise (signing, packaging, acceptance criteria)
- [ ] Prompt 01 - PoC wrapper: esecuzione orchestrata di moduli PowerShell
- [ ] Prompt 02 - Hardening distribuzione (protezione script, gestione configurazioni sensibili)
- [ ] Prompt 03 - Piano migrazione graduale PowerShell -> componenti .NET dove conviene

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2025-11-08 | Fix gestione boolean in `StepExecutor` | Evitare perdita valori `false` nella risoluzione parametri |
| 2025-11-12 | Baseline funzionale v2.10.2 consolidata | Moduli principali e fix recenti integrati |
| 2025-11-12 | File licenza (`templates/licenses/*.lic`) esclusi da Git | Evitare esposizione di licenze customer-specific |
| 2025-11-12 | Strategia distribuzione documentata in `context/notes/wizard-distribution.md` | Formalizzare opzioni e tradeoff per packaging |
| 2026-03-08 | Direzione tecnica aggiornata: wrapper/conversione con .NET 10 | Migliorare distribuibilita e protezione IP |
| 2026-03-08 | Progetto CLI separato mantenuto come stream duale (`infinite-installer-cli`) | Distinguere percorso GUI/wrapper da UX CLI interattiva |

## Rischi / Blocchi
- Scelta architetturale wrapper non ancora validata end-to-end su target reali
- Rischio incompatibilita tra host .NET e script PowerShell in ambienti cliente eterogenei
- Complessita di packaging/signing/licensing enterprise
- Feature WIP ancora aperte in `ngs-infinite-scripts` prima del rilascio cliente
- Dipendenza dalla qualita del template CLI per accelerare il progetto duale

## Note Libere
- Progetto duale CLI: `D:\repos\NicolaGhiselliSolutions\ngs-project-ideas\infinite-installer-cli`
- Seed/template CLI attuale: `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities-cli`
- File di riferimento principali:
  - `D:\repos\NicolaGhiselliSolutions\ngs-infinite-scripts\README.md`
  - `D:\repos\NicolaGhiselliSolutions\ngs-infinite-scripts\CHANGELOG.md`
  - `D:\repos\NicolaGhiselliSolutions\ngs-infinite-scripts\context\notes\functionalities-notes-done.txt`
  - `D:\repos\NicolaGhiselliSolutions\ngs-infinite-scripts\context\notes\functionalities-notes-wip.txt`
  - `D:\repos\NicolaGhiselliSolutions\ngs-infinite-scripts\context\notes\funtionalities-notes-future.txt`
  - `D:\repos\NicolaGhiselliSolutions\ngs-infinite-scripts\context\notes\wizard-distribution.md`
