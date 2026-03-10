# ocem.plugin.dds

## Snapshot
- Path implementazione: Z:\Stoorm5\Projects\OCEM\ocem.plugin.dds
- Stato avanzamento: In corso
- Priorita: Alta
- Progresso: 55%
- Tipo progetto: Cliente
- Includi nel portfolio: Si
- Cliente: OCEM
- Ultimo aggiornamento: 2026-03-10
- Owner: Nicola

## Obiettivo
Mantenere e consolidare il plugin DDS condiviso usato come interfaccia tecnica verso il middleware Zettascale, per garantire comunicazione publish/subscribe uniforme in tutta la suite OCEM Infinite.

## Contesto / Problema
Il plugin e un sottomodulo comune presente nei principali repository di suite. Senza un layer DDS unico, i moduli backend, gateway e strumenti satellite rischiano divergenze di protocollo e maggiore complessita di integrazione.

## Ambito attuale
- [x] Libreria condivisa `Ocem.Plugin.Dds` per astrazione DDS.
- [x] Struttura interna con `Topics`, `Listeners`, `Factories`, `Managers`, `Services`.
- [x] Utilizzo come dipendenza comune nei moduli `ocem.infinite.*` e gateway.
- [ ] Evoluzione continua del contratto DDS e gestione compatibilita cross-modulo.

## Stack e Architettura
- Linguaggio/framework: .NET (`netstandard2.0`).
- Ruolo architetturale: adapter unificato verso middleware DDS Zettascale.
- Modalita di adozione: submodule/embedded module nei repository di prodotto.

## Ruolo e contributo personale
- [x] Team Leader architetturale/backend della suite Infinite.
- [x] Definizione linee guida di integrazione DDS tra moduli eterogenei.
- [x] Supporto al versionamento e alla compatibilita tra componenti dipendenti.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Foundation wrapper DDS condiviso | 2025 | Completata | Layer comune operativo |
| Adozione estesa su suite Infinite + Gateway | 2025-2026 | In corso | Standardizzazione progressiva |
| Stabilizzazione contratti e backward compatibility | 2026 | Pianificata | Riduzione regressioni cross-repo |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-10 | Inserito `ocem.plugin.dds` come progetto portfolio dedicato | Rendere visibile il componente shared critico della suite |

## Rischi / Note
- Necessario allineare costantemente versioni del plugin tra repository differenti.
- Cambiamenti al modello DDS hanno impatto trasversale su backend, gateway e simulatori.

