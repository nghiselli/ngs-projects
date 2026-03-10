# ocem.sao.mapgenerator

## Snapshot
- Path implementazione: D:\repos\OCEM\Ocem.SAO.MapGenerator
- Stato avanzamento: In corso
- Priorita: Alta
- Progresso: 55%
- Tipo progetto: Cliente
- Includi nel portfolio: Si
- Cliente: OCEM
- Ultimo aggiornamento: 2026-03-10
- Owner: Nicola

## Obiettivo
Automatizzare la preparazione delle mappe per la funzionalita SAO (System Architecture Overview) tramite script Adobe Illustrator e template strutturati.

## Contesto / Problema
La funzionalita SAO richiede mappe SVG coerenti, con naming standardizzato e gerarchie stabili per controllo via DOM. Il repository contiene workflow guidati per level 0 e level 1 con script `.jsx`, template `.ai` e configurazioni JSON.

## Ambito attuale
- [x] Workflow level 0 con script `snmp_level0_overview.jsx`.
- [x] Workflow level 1 con script `snmp_topology_setup.jsx` e variante JSON.
- [x] Template grafici Illustrator e librerie shape/device di riferimento.
- [x] Convenzioni di naming/normalizzazione per export SVG controllabile.
- [ ] Evoluzione degli script per nuovi scenari topologici e ottimizzazione del flusso operativo.

## Stack e Architettura
- Tooling principale: Adobe Illustrator + ExtendScript (`.jsx`).
- Asset/configurazioni: file `.ai`, `.svg`, `.json`.
- Struttura repository: `level0`, `level1`, `level1_json`, `resources`, `reference`.
- Output atteso: mappe SVG con naming deterministic e gruppi gerarchici stabili.

## Ruolo e contributo personale
- [x] Team Leader architetturale/backend per ecosistema OCEM Infinite.
- [x] Definizione del flusso tecnico tra topologie SAO, naming e consumatori applicativi.
- [x] Coordinamento integrazione tra pipeline mappe e moduli gateway/frontend.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Foundation workflow Illustrator SAO | 2025 | Completata | Script e template base disponibili |
| Standardizzazione naming e export SVG | 2025-2026 | In corso | Refinement continuo dei workflow |
| Hardening pipeline map generation | 2026 | Pianificata | Riduzione errori manuali e maggiore automazione |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-10 | Inserito SAO MapGenerator nel portfolio come utility dedicata | Evidenziare la pipeline di generazione mappe a supporto SAO |

## Rischi / Note
- Flusso dipendente da Adobe Illustrator e disciplina di naming nei file sorgente.
- Qualita output SVG legata alla consistenza delle convenzioni grafiche adottate.

