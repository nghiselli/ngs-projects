# Ocem.Snmp.Simulator

## Snapshot
- Path progetto idee: D:\repos\NicolaGhiselliSolutions\ngs-projects\ocem.snmp.simulator
- Path implementazione: D:\repos\OCEM\Ocem.Snmp.Simulator
- Stato avanzamento: In corso
- Priorita: Alta

- Progresso: 75%
- Tipo progetto: Cliente

- Includi nel portfolio: Si
- Ultimo aggiornamento: 2026-03-10
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
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.8.0-simulator-snmp-v2c-v3-specification.md` | Specifica roadmap SNMP v2c/v3 |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\v1.9.0-simulator-trap-inform-v2c-v3-specification.md` | Specifica roadmap Trap/Inform v2c/v3 |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\TRAP-MANAGEMENT.md` | Linee guida operative trap lato agent .NET 8+ |
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\topology-configuration-guide.md` | Guida configurazione topologia |

## Contesto / Problema
Il progetto riduce dipendenze da ambienti fisici per validare integrazioni SNMP e casi edge di rete/topologia. E utile per QA, sviluppo funzionalita runtime e demo tecniche, mantenendo una base di configurazione JSONC + MIB verificata fail-fast all'avvio.

## Ambito V1 (MVP)
- [x] Supporto SNMP v1 `GET` multi-device (listener UDP per device)
- [x] Supporto SNMP v1 `SET` atomico multi-varbind con validazione da MIB e `error-index` coerente
- [x] Configurazioni JSONC separate (`devices-config`, `devices-behavior`, `devices-topology`, `devices-traps`)
- [x] Validazioni fail-fast su config/OID/unicita/binding runtime
- [x] Tick engine e behavior dinamici per categorie device
- [x] GUI Blazor con modifica variabili SNMP e azioni runtime per device
- [x] Topologia runtime con propagazione stato link, viewpoint e pagina `/topology`
- [x] Invio trap SNMPv1 con sender asincrono, mapping eventi runtime e rate-limit
- [x] Tooling operativo: `tools/test-snmp-matrix.ps1`, `tools/test-snmp-set-single.ps1`, `tools/add-mib-absolute-oid-comments.ps1`
- [x] Release `v1.6.0` chiusa su `main` (merge + tag)

## Fuori Ambito (Per Ora)
- [ ] Esposizione API per applicazione preset, lettura stato dispositivi
- [ ] Supporto SNMP v2c/v3
- [ ] Supporto Trap/Inform v2c/v3
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

## Next Steps (2-4 Settimane)
1. Eseguire regressione completa SNMP `GET`/`SET` + trap E2E su matrix device/topologia.
2. Definire backlog operativo per `v1.7.0` (Management API) con acceptance criteria e mapping endpoint.
3. Pianificare estensione protocollo `v1.8.0` (`v2c/v3`) e `v1.9.0` (Trap/Inform `v2c/v3`) mantenendo retrocompatibilita v1.
4. Valutare introduzione varbind identificativo `UnitId` nelle trap per scenari NAT/IP condivisi.

## Prompt / Specifiche da Preparare
- [x] Spec 01 - Release v1.5.0 (scope, acceptance criteria, regression matrix)
- [x] Spec 02 - SNMP SET v1.6.0 (policy write, validazioni MIB, error mapping)
- [ ] Prompt 01 - Automazione test regressione SNMP `GET`/`SET` + trap con report unico
- [ ] Prompt 02 - Hardening v1.7.0 Management API (scaffold endpoint + smoke test)

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-07 | Introdotte azioni runtime + topology engine (v1.2.0) | Rendere il simulatore utilizzabile in test end-to-end realistici |
| 2026-03-07 | Introdotta topologia inter-station con viewpoint (v1.3.0) | Simulare reachability SNMP dipendente dalla connettivita |
| 2026-03-08 | Riorganizzata GUI con tab e visual topology (v1.4.0) | Migliorare usabilita operativa durante i test |
| 2026-03-08 | Aggiunta tab Interactive Device con SVG e azioni click-driven (v1.4.1) | Ridurre frizione nella simulazione manuale dei guasti/stati |
| 2026-03-08 | Allineato README progetto-idee con stato reale implementazione | Tenere sincronizzato backlog/roadmap tra idea e repo tecnico |
| 2026-03-10 | Implementata feature trap v1.5 con sender SNMPv1 e parser config dedicato | Coprire scenari event-driven verso NMS senza hardware reale |
| 2026-03-10 | Introdotto pulsante UI `Invia trap test` + documento `TRAP-MANAGEMENT.md` | Ridurre tempo di test manuale e chiarire strategia identificazione device da IP |
| 2026-03-10 | Implementato supporto SNMP v1 `SET` con gating `WriteObjIds` e validazione derivata da MIB | Consentire scritture controllate senza introdurre regole custom in config |
| 2026-03-10 | Chiusa release `v1.6.0` su `main` con tag `v1.6.0` e merge-back su `develop` | Stabilizzare baseline GET/SET/trap e allineare versionamento semantico |

## Rischi / Blocchi
- Errori di configurazione JSONC/MIB bloccano startup (fail-fast): alto impatto operativo se i file non sono versionati con disciplina.
- Copertura regressione ancora in parte manuale su scenari topologici complessi.
- Compatibilita con tool SNMP terzi da verificare in modo sistematico su tutte le categorie device.
- Identificazione trap in ambienti NAT/IP condivisi richiede metadati aggiuntivi (varbind identificativo).

## Note Libere
- Comandi rapidi utili:
  - `dotnet build Ocem.Snmp.Simulator.slnx`
  - `dotnet run --project src/Ocem.Snmp.Simulator.Web/Ocem.Snmp.Simulator.Web.csproj`
  - `./tools/test-snmp-matrix.ps1`
  - `./tools/test-snmp-set-single.ps1`
- Versione applicativa corrente in `csproj`: `1.6.0`.
- `CHANGELOG.md`: release `1.6.0` promossa, sezione `[Unreleased]` nuovamente aperta.