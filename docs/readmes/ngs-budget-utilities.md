# ngs-budget-utilities

## Snapshot
- Path progetto idee: D:\repos\NicolaGhiselliSolutions\ngs-project-ideas\ngs-budget-utilities
- Path implementazione: D:\repos\NicolaGhiselliSolutions\ngs-budget-utilities
- Stato avanzamento: In corso (foundation completata, sviluppo feature core in avvio)
- Priorita: Media
- Tipo progetto: Personale
- Ultimo aggiornamento: 2026-03-09
- Owner: Nicola

## Obiettivo
Costruire un personal finance monitor semplice ma robusto per uso individuale, con import da fonti eterogenee, categorizzazione assistita e report utili per decisioni mensili/annuali.

Documenti principali di riferimento:

| Documento | Descrizione |
|---|---|
| `D:\repos\NicolaGhiselliSolutions\ngs-budget-utilities\README.md` | Guida operativa del progetto implementativo |
| `D:\repos\NicolaGhiselliSolutions\ngs-budget-utilities\CHANGELOG.md` | Storico versioni e milestone completate |
| `D:\repos\NicolaGhiselliSolutions\ngs-budget-utilities\docs\specs\SPECIFICHE_PERSONAL_FINANCE_MONITOR_v0.4.md` | Specifica funzionale e modello dati target |
| `D:\repos\NicolaGhiselliSolutions\ngs-budget-utilities\docs\specs\ROADMAP_PERSONAL_FINANCE_MONITOR_v0.4.md` | Roadmap incrementale per milestone |
| `D:\repos\NicolaGhiselliSolutions\ngs-budget-utilities\docs\businesslogic\NGS Budget Example.xlsx` | Riferimento business logic e casi reali |

## Contesto / Problema
E importante per monitorare entrate/uscite con frizione minima, normalizzare movimenti da sorgenti diverse (banche, wallet, broker) e trasformare dati grezzi in insight pratici (trend, bilancio, need vs want).

## Ambito V1 (MVP)
- [x] Foundation tecnica (Clean Architecture, Blazor + MudBlazor, EF Core + MariaDB, Identity/AuthKit)
- [x] CI locale con build/test automatici (`tools/build.ps1`)
- [ ] CRUD Conti + Identificatori (IBAN/keyword/regex)
- [ ] CRUD CategoryGroup/Categorie gerarchiche + Tag
- [ ] Transazioni manuali con modello `Transaction + TransactionLine`
- [ ] Import CSV con profili/mapping + preview + commit
- [ ] Regole automatiche (categoria/tag/giroconto) con riapplicazione
- [ ] Gestione duplicati candidati e risoluzione manuale
- [ ] Report core: trend spese categoria + bilancio mensile/annuale + vista Need vs Want

## Fuori Ambito (Per Ora)
- [ ] Gestione finanze di nucleo famigliare multi-utente avanzata (oltre al perimetro personale base)
- [ ] Open banking/API aggregator in real-time (roadmap alta ma non MVP)
- [ ] Investimenti avanzati (TWR completo, analytics portfolio evoluti)

## Stack e Architettura Ipotizzata
- Linguaggio/framework: .NET 10, Blazor Server, MudBlazor
- Storage/database: MariaDB + EF Core 9
- Integrazioni esterne: import CSV/PDF/XLSX da provider finanziari, ASP.NET Core Identity
- Pattern: Clean Architecture (Domain, Application, Infrastructure, Web) + AuthKit riusabile
- Vincoli tecnici:
  - progetto orientato a dati sensibili (privacy/backup/audit)
  - formati import eterogenei e non standardizzati
  - necessaria separazione dati per utente (`OwnerUserId`) in ottica multi-utente futura

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Milestone 0 - Bootstrap | 2026-01-12 | Completata | Foundation tecnica + auth + CI locale |
| Milestone 1 - Conti/Categorie/Tag | 2026-Q1/Q2 | In corso | CRUD di configurazione dominio |
| Milestone 2 - Transazioni manuali | 2026-Q2 | Da iniziare | Core operativo senza import |
| Milestone 3 - Import CSV + profili | 2026-Q2 | Da iniziare | Wizard import con preview/commit |
| Milestone 4-7 - Regole/Giroconti/Duplicati/Report | 2026-Q2/Q3 | Da iniziare | Automazione + reporting V1 utile |

## Next Steps (2-4 Settimane)
1. Chiudere Milestone 1 con CRUD completi (Conti, Identificatori, CategoryGroup/Categorie, Tag) e seed iniziali.
2. Avviare Milestone 2 implementando flusso transazioni manuali (header + linee + filtri base).
3. Definire/importare i primi profili CSV reali dai sample in `docs/imports` per preparare Milestone 3.
4. Formalizzare regole di normalizzazione e deduplica minime prima del primo batch import reale.

## Prompt / Specifiche da Preparare
- [ ] Spec 01 - Import Engine V1 (profile mapping, preview, commit, error handling)
- [ ] Spec 02 - Deduplica e matching giroconti (heuristics + override manuale)
- [ ] Prompt 01 - Implementazione CRUD Milestone 1 (UI + use cases + persistence)
- [ ] Prompt 02 - Implementazione transazioni manuali con split linee e tagging

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-01-12 | Completata Milestone 0 (v0.1.0) | Stabilizzare foundation prima delle feature business |
| 2026-01-12 | Adozione AuthKit riusabile + Identity | Evitare lock-in e accelerare riuso in altri progetti |
| 2026-01-12 | CI locale unificata con `tools/build.ps1` | Rendere veloce validazione build/test ad ogni iterazione |
| 2026-03-09 | Priorita su feature core M1/M2/M3 prima di analytics avanzate | Consegnare rapidamente valore pratico nel flusso quotidiano |

## Rischi / Blocchi
- Eterogeneita formati import (CSV/PDF/XLSX) con alta variabilita semantica.
- Possibili errori di classificazione iniziale senza regole mature.
- Gestione dati sensibili: backup, sicurezza locale, audit sono essenziali.
- Dipendenza da qualita dataset reali per validare deduplica e giroconti.

## Note Libere
- Roadmap v0.4 e gia dettagliata fino a milestone avanzate (ricorrenze, reconciliation, alert, backup/restore, open banking).
- Il progetto e partito bene tecnicamente; ora il valore dipende dall'accelerazione dei casi d'uso reali (import + categorizzazione + report).
- La struttura `docs/imports` contiene esempi utili per testare rapidamente pipeline di import.

