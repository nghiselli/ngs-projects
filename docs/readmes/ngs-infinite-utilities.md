# ngs-infinite-utilities

## Snapshot
- Path implementazione: D:\repos\NicolaGhiselliSolutions\ngs-infinite-utilities
- Stato avanzamento: In corso
- Priorita: Alta
- Progresso: 55%
- Tipo progetto: Cliente
- Includi nel portfolio: Si
- Cliente: OCEM (tooling operativo interno)
- Ultimo aggiornamento: 2026-03-10
- Owner: Nicola

## Obiettivo
Raccogliere utility operative trasversali per risolvere problemi ricorrenti nello sviluppo, testing e supporto della suite OCEM Infinite.

## Contesto / Problema
Nel ciclo quotidiano di progetto emergono task ripetitivi che richiedono tool rapidi e focalizzati (conversioni, analisi test, gestione configurazioni, automazioni script). Questo repository centralizza i moduli utili in un unico toolkit.

## Moduli principali
- [x] `ccr-alarm-converter`
- [x] `disks-info`
- [x] `effemeridi-converter`
- [x] `ilcms`
- [x] `mouse-manager`
- [x] `powershell2exe`
- [x] `SoftwareVersionManager`
- [x] `svg` (svg map manager)
- [x] `test-analyzer` (cartella repository: `ngs-test-analyzer`)

## Stack e Architettura
- Linguaggi/tool prevalenti: PowerShell (`.ps1`), C# script (`.csx`), Python (`.py`), JSON/CSV/XLSX.
- Approccio: toolkit modulare per utility standalone e script di supporto.
- Ambiti coperti: conversione allarmi, informazioni sistema, conversioni configurative ILCMS, automazione versioning, gestione SVG/mappe, analisi test.

## Ruolo e contributo personale
- [x] Ideazione e manutenzione del toolkit utilities a supporto del lavoro su Infinite.
- [x] Integrazione pragmatica con workflow reali di sviluppo, test e troubleshooting.
- [x] Riduzione effort operativo su task ripetitivi ad alta frequenza.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Foundation utilities set | 2025 | Completata | Prima raccolta script e converter |
| Estensione moduli per esigenze reali | 2025-2026 | In corso | Nuove utility aggiunte progressivamente |
| Consolidamento toolkit | 2026 | Pianificata | Uniformazione UX/CLI e documentazione minima |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-10 | Inserito `ngs-infinite-utilities` nel portfolio | Rendere visibile il toolkit operativo trasversale per Infinite |

## Rischi / Note
- Repository eterogeneo per natura (tool con stack diversi): va mantenuta chiarezza sui confini dei moduli.
- Alcune utility nascono per urgenze operative e possono richiedere refactoring/documentazione successivi.


