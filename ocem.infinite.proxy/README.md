# ocem.infinite.proxy

## Snapshot
- Path implementazione: Z:\Stoorm5\Projects\OCEM\ocem.infinite.proxy
- Stato avanzamento: In pausa
- Priorita: Alta
- Progresso: 65%
- Tipo progetto: Cliente
- Includi nel portfolio: Si
- Cliente: OCEM
- Ultimo aggiornamento: 2026-03-10
- Owner: Nicola

## Obiettivo
Fornire un modulo proxy di frontiera per consentire accesso remoto a OCEM Infinite attraverso segmenti di rete separati, con autenticazione e instradamento controllato.

## Contesto / Problema
Il modulo abilita un PC di frontiera tra due reti, in modo da pubblicare in sicurezza l'accesso ad OCEM Infinite verso utenti remoti. L'architettura si appoggia a Nginx per lo strato di reverse proxy.

## Ambito attuale
- [x] Modulo proxy .NET dedicato (`Ocem.Infinite.Proxy`).
- [x] Modulo mock di supporto (`Ocem.Infinite.Mock`) per test e validazioni.
- [x] Pagina login custom (`index_login_proxy`) con redirect verso frontend Infinite.
- [ ] Ripresa evolutiva e hardening operativo (progetto attualmente in pausa).

## Stack e Architettura
- Linguaggio/framework: .NET 8.
- Soluzione: `ocem.infinite.proxy.sln`.
- Componenti: proxy web, autenticazione (AD/LDAP), servizi di proxying.
- Integrazione infrastrutturale: Nginx come elemento di frontiera/reverse proxy.

## Ruolo e contributo personale
- [x] Team Leader architetturale/backend per integrazione del modulo proxy nella suite Infinite.
- [x] Definizione interfacce e flussi di autenticazione/redirect con i moduli frontend.
- [x] Supporto alla definizione del perimetro rete e accesso remoto.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Foundation modulo proxy e mock | 2025 | Completata | Base tecnica pronta |
| Integrazione login proxy + redirect frontend | 2025-2026 | Completata | Flusso custom disponibile |
| Evoluzione operativa | 2026 | In pausa | In attesa riallineamento roadmap |

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-10T09:00:00+01:00 | Progetto marcato In pausa nel portfolio pur mantenendolo visibile | Stato reale del piano rilasci e dipendenze di suite |

## Rischi / Note
- Forte dipendenza dal contesto infrastrutturale di rete e policy cliente.
- Ripresa roadmap condizionata da priorita trasversali su backend/frontend.

