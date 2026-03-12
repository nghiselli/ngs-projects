# Ocem.Snmp.Simulator

## Snapshot
- Path progetto idee: D:\repos\NicolaGhiselliSolutions\ngs-projects\ocem.snmp.simulator
- Path implementazione: D:\repos\OCEM\Ocem.Snmp.Simulator
- Stato avanzamento: In manutenzione
- Priorita: Alta

- Progresso: 100%
- Tipo progetto: Personale

- Includi nel portfolio: Si
- Ultimo aggiornamento: 2026-03-12
- Owner: Nicola

## Obiettivo
Costruire un simulatore SNMP affidabile e configurabile per emulare device INFINITE (UPS, host, switch, NTP, printer), supportare test di integrazione senza hardware reale, e permettere verifica visuale/runtime del comportamento dei dispositivi.

Documenti principali di riferimento:

| Documento | Descrizione |
|---|---|
| `D:\repos\OCEM\Ocem.Snmp.Simulator\README.md` | Documentazione operativa aggiornata |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\CHANGELOG.md` | Storico versioni e release |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.0.0-simulator-specification.md` | Specifica iniziale |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.1.0-simulator-behavior-specification.md` | Specifica behavior dinamico |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.2.0-simulator-device-actions-topology-specification.md` | Specifica azioni device e topologia |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.3.0-simulator-interstation-topology-specification.md` | Specifica topologia inter-station |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.4.0-simulator-gui-enhancement-specification.md` | Specifica miglioramenti GUI |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.5.0-trap-specification.md` | Specifica trap SNMPv1 + gap closure |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.6.0-simulator-snmp-set-specification.md` | Specifica SNMP v1 SET |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.7.0-simulator-management-api-specification.md` | Specifica roadmap Management API |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\HTTPS-CONFIGURATION-GUIDE.md` | Guida operativa configurazione HTTPS (dev cert e certificati custom) |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.8.0-simulator-snmp-v2c-v3-specification.md` | Specifica roadmap SNMP v2c/v3 |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.9.0-simulator-trap-inform-v2c-v3-specification.md` | Specifica roadmap Trap/Inform v2c/v3 |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.10.0-unit-tests.md` | Specifica unit test e code coverage pre-refactoring |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.11.0-simulator-project-modularization-analysis.md` | Analisi refactoring architetturale multi-progetto |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.12.0-simulator-multi-instance-cluster-analysis.md` | Analisi distribuzione multi-istanza/orchestrazione cluster |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.12.0-simulator-multi-instance-cluster-specification.md` | Specifica distribuzione multi-istanza/orchestrazione cluster |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\TRAP-MANAGEMENT.md` | Linee guida operative trap lato agent .NET 8+ |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\topology-configuration-guide.md` | Guida configurazione topologia |

## Contesto / Problema
Il progetto riduce dipendenze da ambienti fisici per validare integrazioni SNMP e casi edge di rete/topologia. E utile per QA, sviluppo funzionalita runtime e demo tecniche, mantenendo una base di configurazione JSONC + MIB verificata fail-fast all'avvio.

## Ambito V1 (MVP)
- [x] Supporto SNMP v1 `GET` multi-device (listener UDP per device)
- [x] Supporto SNMP v1 `SET` atomico multi-varbind con validazione da MIB e `error-index` coerente
- [x] Supporto SNMP v2c/v3 (`GET`, `GETNEXT`, `GETBULK`, `SET`) mantenendo retrocompatibilita v1
- [x] Configurazioni JSONC separate (`devices-config`, `devices-behavior`, `devices-topology`, `devices-traps`)
- [x] Validazioni fail-fast su config/OID/unicita/binding runtime
- [x] Tick engine e behavior dinamici per categorie device
- [x] GUI Blazor con modifica variabili SNMP e azioni runtime per device
- [x] Topologia runtime con propagazione stato link, viewpoint e pagina `/topology`
- [x] Invio trap SNMP v1/v2c/v3 e inform v2c/v3 con sender asincrono multi-versione
- [x] Gating notifiche per-device tramite `TrapObjIds` e policy write via `WriteObjIds`
- [x] Hardening security runtime SNMP v3 (rigetto security level incoerente, no downgrade implicito)
- [x] Management API v1 (/api/v1) con endpoint read/command runtime, sicurezza HTTPS+API key, CORS e rate limiting

## Ambito V2c/V3
- [x] Tooling operativo: `tools/test-snmp-matrix.ps1`, `tools/test-snmp-set-single.ps1`, `tools/test-snmp-v2c-v3-matrix.ps1`, `tools/test-snmp-v3-security-negative.ps1`, `tools/add-mib-absolute-oid-comments.ps1`
- [x] Release `v1.9.0` chiusa su `main` con tag `v1.9.0` e merge-back su `develop`
- [x] Release `v1.10.0` chiusa su `main` con tag `v1.10.0` (baseline unit test + coverage 89.58%)
- [x] Supporto SNMP v2c/v3 (`GET`, `GETNEXT`, `GETBULK`, `SET`)
- [x] Supporto Trap/Inform v2c/v3

## Fuori Ambito (Per Ora)
- [ ] Distribuzione multi-istanza/orchestrazione cluster

## Stack e Architettura Ipotizzata
- Linguaggio/framework: C# su ASP.NET Core Blazor Server (`net10.0`)
- UI: MudBlazor
- Stack SNMP: Lextm.SharpSnmpLib
- Logging: NLog
- Storage/configurazione: file JSONC + libreria MIB su filesystem
- Integrazioni esterne: strumenti SNMP (`snmpget`, `snmpwalk`, matrix test script, trap receiver)
- Vincoli tecnici:
  - coerenza stretta tra OID configurati e MIB caricati
  - una porta UDP univoca per ogni device simulato lato agent SNMP
  - startup fail-fast su errori di configurazione

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Discovery + specifiche v1.0/v1.1 | 2026-03-07 | Completata | Modello simulatore e behavior definiti |
| MVP runtime/topologia v1.2.0 | 2026-03-07 | Completata | Device actions + topology runtime introdotti |
| Inter-station topology v1.3.0 | 2026-03-07 | Completata | Viewpoint e reachability per componenti connesse |
| GUI enhancement v1.4.x | 2026-03-08 | Completata | v1.4.0/v1.4.1 chiuse |
| Trap + gap closure v1.5.0 | 2026-03-10 | Completata | Parser/sender trap, metadata runtime, test trap UI, documentazione |
| SNMP SET + release v1.6.0 | 2026-03-10 | Completata | Supporto `SET` v1, validazione MIB, release/tag `v1.6.0` |
| Management API v1.7.0 | 2026-03-10 | Completata | Endpoint runtime, sicurezza HTTPS+API key, Swagger e tooling curl |
| SNMP v2c/v3 v1.8.0 | 2026-03-10 | Completata | Feature/release chiuse con baseline multi-versione consolidata |
| Trap/Inform v2c/v3 v1.9.0 | 2026-03-11 | Completata | Feature chiusa su develop, release `v1.9.0` chiusa su main con tag `v1.9.0` |
| Unit test + coverage baseline v1.10.0 | 2026-03-12 | Completata | Feature chiusa su develop, release `v1.10.0` chiusa su main con tag `v1.10.0` |

## Next Steps (2-4 Settimane)
1. Eseguire regressione completa SNMP `GET`/`SET` + trap/inform + Management API su matrix device/topologia.
2. Estendere tooling trap receiver con decode/ack inform per test automatizzati v2c/v3.
3. Automatizzare regressione protocol-aware SNMP `v1/v2c/v3` con report unico e baseline confrontabile per release.
4. Pianificare roadmap post-v1.10 per distribuzione multi-istanza/orchestrazione cluster.

## Prompt / Specifiche da Preparare
- [x] Spec 01 - Release v1.5.0 (scope, acceptance criteria, regression matrix)
- [x] Spec 02 - SNMP SET v1.6.0 (policy write, validazioni MIB, error mapping)
- [x] Prompt 01 - Automazione test regressione SNMP `GET`/`SET` + trap con report unico
- [x] Prompt 02 - Hardening v1.7.0 Management API (scaffold endpoint + smoke test)

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-07T09:00:00+01:00 | Introdotte azioni runtime + topology engine (v1.2.0) | Rendere il simulatore utilizzabile in test end-to-end realistici |
| 2026-03-07T09:01:00+01:00 | Introdotta topologia inter-station con viewpoint (v1.3.0) | Simulare reachability SNMP dipendente dalla connettivita |
| 2026-03-08T09:00:00+01:00 | Riorganizzata GUI con tab e visual topology (v1.4.0) | Migliorare usabilita operativa durante i test |
| 2026-03-08T09:01:00+01:00 | Aggiunta tab Interactive Device con SVG e azioni click-driven (v1.4.1) | Ridurre frizione nella simulazione manuale dei guasti/stati |
| 2026-03-08T09:02:00+01:00 | Allineato README progetto-idee con stato reale implementazione | Tenere sincronizzato backlog/roadmap tra idea e repo tecnico |
| 2026-03-10T09:00:00+01:00 | Implementata feature trap v1.5 con sender SNMPv1 e parser config dedicato | Coprire scenari event-driven verso NMS senza hardware reale |
| 2026-03-10T09:01:00+01:00 | Introdotto pulsante UI `Invia trap test` + documento `TRAP-MANAGEMENT.md` | Ridurre tempo di test manuale e chiarire strategia identificazione device da IP |
| 2026-03-10T09:02:00+01:00 | Implementato supporto SNMP v1 `SET` con gating `WriteObjIds` e validazione derivata da MIB | Consentire scritture controllate senza introdurre regole custom in config |
| 2026-03-10T09:03:00+01:00 | Chiusa release `v1.6.0` su `main` con tag `v1.6.0` e merge-back su `develop` | Stabilizzare baseline GET/SET/trap e allineare versionamento semantico |
| 2026-03-10T09:04:00+01:00 | Implementata Management API v1.7 (/api/v1) con enforcement HTTPS+API key e integrazione Swagger | Abilitare controllo runtime via API mantenendo sicurezza e riuso della logica esistente |
| 2026-03-10T09:05:00+01:00 | Chiusa release `v1.7.0` su `main` con merge branch `release-1.7.0` | Consolidare baseline Management API e preparare publish del tag remoto |
| 2026-03-10T09:06:00+01:00 | Implementato supporto SNMP `v2c/v3` (v1.8.0) con dispatcher multi-versione, parser config esteso e tooling dedicato | Coprire scenari moderni di polling/management mantenendo retrocompatibilita SNMP v1 e riuso runtime store |
| 2026-03-10T09:07:00+01:00 | Chiusa feature `feature/nghiselli/snmp-v2c-v3` su develop con merge --no-ff | Stabilizzare baseline tecnica v1.8 in develop prima della release |
| 2026-03-10T09:08:00+01:00 | Chiusa release `v1.8.0` su `main` con tag `v1.8.0` e merge-back su `develop` | Consolidare baseline multi-versione SNMP e rendere disponibile una versione stabile pubblicabile |

| 2026-03-11T09:00:00+01:00 | Implementata v1.9 (trap/inform `v2c/v3`) con sender multi-versione, parser esteso e gating `TrapObjIds` | Completare copertura notifiche moderne mantenendo retrocompatibilita trap v1 e riuso runtime store |
| 2026-03-11T09:01:00+01:00 | Introdotto hardening security runtime SNMP v3 su security level coerente | Eliminare downgrade impliciti e allineare comportamento ai test negativi di sicurezza |
| 2026-03-11T09:02:00+01:00 | Chiusa feature `feature/nghiselli/snmp-v2c-v3-trap` su develop con merge --no-ff | Stabilizzare baseline v1.9 prima della fase release |
| 2026-03-11T09:03:00+01:00 | Chiusa release `v1.9.0` su main con tag `v1.9.0` e merge-back su develop | Consolidare baseline notifiche SNMP multi-versione e pubblicare versione stabile |
| 2026-03-12T09:00:00+01:00 | Consolidata baseline test automatizzati (88 test, coverage 89.58%) con script dedicato | Ridurre rischio regressioni prima del refactoring architetturale |
| 2026-03-12T09:01:00+01:00 | Allineata documentazione progetto e checkpoint v1.10 | Garantire tracciabilita completa tra stato codice, release e roadmap |
| 2026-03-12T09:02:00+01:00 | Chiusa release `v1.10.0` su main con tag `v1.10.0` e merge-back su develop | Stabilizzare baseline quality gate pre-refactoring e versionamento semantico |

## Rischi / Blocchi
- Errori di configurazione JSONC/MIB bloccano startup (fail-fast): alto impatto operativo se i file non sono versionati con disciplina.
- Copertura regressione ancora in parte manuale su scenari topologici complessi.
- Compatibilita con tool SNMP terzi da verificare in modo sistematico su tutte le categorie device e su tutte le versioni SNMP supportate (v1/v2c/v3).
- Identificazione trap in ambienti NAT/IP condivisi richiede metadati aggiuntivi (varbind identificativo).

- Roadmap post-v1.10 focalizzata su cluster/multi-istanza e maggiore automazione test notifiche trap/inform.
## Note Libere
- Comandi rapidi utili:
  - `dotnet build Ocem.Snmp.Simulator.slnx`
  - `dotnet run --project src/Ocem.Snmp.Simulator.Web/Ocem.Snmp.Simulator.Web.csproj`
  - `./tools/test-snmp-matrix.ps1`
  - `./tools/test-snmp-v2c-v3-matrix.ps1`
  - `./tools/test-snmp-v3-security-negative.ps1`
  - `./tools/test-snmp-set-single.ps1`
- Versione applicativa corrente in `csproj`: `1.10.0`.
- `CHANGELOG.md`: release `1.10.0` promossa e sezione `[Unreleased]` riaperta.








