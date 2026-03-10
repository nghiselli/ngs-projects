# ngs-documentation-utilities

## Snapshot
- Path progetto idee: D:\repos\NicolaGhiselliSolutions\ngs-projects\ngs-documentation-utilities
- Path implementazione: D:\repos\NicolaGhiselliSolutions\ngs-documentation-utilities
- Stato avanzamento: In pausa (base completa, da consolidare su piu progetti target)
- Priorita: Bassa

- Progresso: 65%
- Tipo progetto: Personale

- Includi nel portfolio: Si
- Ultimo aggiornamento: 2026-03-09
- Owner: Nicola

## Obiettivo
Costruire una pipeline automatica per generare documentazione tecnica enterprise da codebase C# usando Roslyn + LLM locali + DocFX, con output navigabile e deployabile.

Documenti principali di riferimento:

| Documento | Descrizione |
|---|---|
| `D:\repos\NicolaGhiselliSolutions\ngs-documentation-utilities\README.md` | Guida operativa completa della pipeline |
| `D:\repos\NicolaGhiselliSolutions\ngs-documentation-utilities\CHANGELOG.md` | Storico versioni e modifiche |
| `D:\repos\NicolaGhiselliSolutions\ngs-documentation-utilities\DEPLOY.md` | Opzioni di deploy e hosting |
| `D:\repos\NicolaGhiselliSolutions\ngs-documentation-utilities\SETUP_REMOTE_PC.md` | Setup PC remoto per run lunghi |

## Contesto / Problema
La documentazione tecnica tende a essere incompleta o non allineata al codice. Questo progetto riduce lavoro manuale e deriva documentazione consistente da una source of truth tecnica (analisi Roslyn) arricchita da spiegazioni semantiche AI, mantenendo output pubblicabile via DocFX.

## Ambito V1 (MVP)
- [x] Analisi statica solution C# con Roslyn (`tools/RepoInspector`)
- [x] Generazione markdown AI da `analysis.json` (`tools/DocGenerator/doc_generator.py`)
- [x] Integrazione DocFX con TOC generati automaticamente
- [x] Script orchestrazione end-to-end (`scripts/generate-full-docs.ps1`)
- [x] Script generazione changelog da Git history (`scripts/generate-changelog.ps1`)
- [x] Hosting documentazione con autenticazione (`hosting/DocFxAuthWrapper`)
- [ ] Integrare in output diagrammi Mermaid (gantt/graph) in modo standard e consistente
- [ ] Aggiungere XML Documentation in massa su progetti target con approccio semi-automatico (Roslyn + Copilot/Codex)
- [ ] Validare pipeline su almeno 3 repository reali con checklist comparabile

## Fuori Ambito (Per Ora)
- [ ] Supporto ufficiale per linguaggi diversi da C#
- [ ] Integrazione cloud-only obbligatoria (pipeline deve restare eseguibile in locale/offline)
- [ ] Refactoring profondo dei repository target durante la sola fase documentazione

## Stack e Architettura Ipotizzata
- Linguaggio/framework: C# (.NET 8) + Python 3.11+ + PowerShell 7
- Storage/database: file system (`analysis.json`, markdown, sito statico DocFX)
- Integrazioni esterne: Roslyn/MSBuild, Ollama (LLM locali), DocFX, Git
- Vincoli tecnici:
  - qualita output dipende da qualita codice sorgente e XML comments presenti
  - tempi elevati per codebase grandi (run lunghi)
  - costo computazionale lato LLM locale (CPU/RAM/GPU)

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Setup base (v0.1.0) | 2025-12-13 | Completata | Struttura repository e fondazioni pipeline |
| Pipeline completa end-to-end | 2025-Q4 | Completata | RepoInspector + DocGenerator + DocFX + script orchestration |
| Consolidamento multi-repo | 2026-Q1/Q2 | In corso | Serve validazione ripetibile su piu progetti reali |
| Hardening output (Mermaid + XML docs) | 2026-Q2 | Da iniziare | Allineato ai nuovi obiettivi inseriti nel README idee |

## Next Steps (2-4 Settimane)
1. Definire formato standard Mermaid da generare (tipi supportati, naming, collocazione nei file).
2. Creare PoC XML-doc autopopulation su un progetto pilota (es. Ocem.Snmp.Simulator) con controllo qualita diff.
3. Eseguire test comparativi su almeno 2 repository aggiuntivi e raccogliere metriche (tempo, warning DocFX, copertura).
4. Formalizzare checklist di accettazione output docs (contenuti minimi, link, TOC, warning zero).

## Prompt / Specifiche da Preparare
- [ ] Spec 01 - Standard Mermaid (gantt/graph/class/sequence) per output documentale
- [ ] Spec 02 - Strategia XML Documentation semi-automatica via Roslyn + AI assistita
- [ ] Prompt 01 - Pipeline test su repository target multipli con report comparativo
- [ ] Prompt 02 - Hardening DocFX output (link integrity, TOC integrity, publish profile)

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2025-12-13 | Avvio progetto e baseline v0.1.0 | Creare fondazione pipeline documentazione riusabile |
| 2025-Q4 | Adozione pipeline ibrida Roslyn + LLM + DocFX | Bilanciare accuratezza strutturale e spiegazione semantica |
| 2025-Q4 | Introduzione auth wrapper per publish sicuro | Proteggere consultazione documentazione interna |
| 2026-03-09 | Priorita su Mermaid e XML Documentation bulk | Aumentare qualita e completezza output sui progetti target |
| 2026-03-09 | README progetto-idee allineato a stato reale implementazione | Tenere roadmap e backlog coerenti con il repository tecnico |

## Rischi / Blocchi
- Qualita documentazione variabile se i repository target non hanno naming/convenzioni coerenti.
- XML Documentation bulk puo introdurre rumore se non validata con criteri chiari.
- Generazione su codebase grandi richiede tempi lunghi e risorse locali elevate.
- Possibili drift tra output AI e codice reale se prompt/guardrail non sono rigorosi.

## Note Libere
- Componenti chiave implementate:
  - `tools/RepoInspector` (Roslyn analyzer C#)
  - `tools/DocGenerator` (Python + Ollama)
  - `hosting/DocFxAuthWrapper` (ASP.NET Core auth)
  - `scripts/*.ps1` (orchestrazione, deploy, changelog, setup remoto)
- Stato release formale: `v0.1.0` taggata, con backlog esteso in `Unreleased`.
- Da validare: benchmark qualità/tempo su piu repository enterprise.



