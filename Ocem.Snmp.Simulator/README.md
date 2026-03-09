# Ocem.Snmp.Simulator

## Snapshot
- Path progetto idee: D:\repos\NicolaGhiselliSolutions\ngs-project-ideas\Ocem.Snmp.Simulator
- Path implementazione: D:\repos\OCEM\Ocem.Snmp.Simulator
- Stato avanzamento: In corso (quasi completato, baseline v1.4.1)
- Priorita: Alta
- Ultimo aggiornamento: 2026-03-08
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
| `D:\repos\OCEM\Ocem.Snmp.Simulator\docs\topology-configuration-guide.md` | Guida configurazione topologia |

## Contesto / Problema
Il progetto riduce dipendenze da ambienti fisici per validare integrazioni SNMP e casi edge di rete/topologia. E utile per QA, sviluppo funzionalita runtime e demo tecniche, mantenendo una base di configurazione JSONC + MIB verificata fail-fast all'avvio.

## Ambito V1 (MVP)
- [x] Supporto SNMP v1 `GET` multi-device (listener UDP per device)
- [x] Configurazioni JSONC separate (`devices-config`, `devices-behavior`, `devices-topology`)
- [x] Validazioni fail-fast su config/OID/unicita/binding runtime
- [x] Tick engine e behavior dinamici per categorie device
- [x] GUI Blazor con modifica variabili SNMP e azioni runtime per device
- [x] Topologia runtime con propagazione stato link, viewpoint e pagina `/topology`
- [x] Tooling operativo: `tools/test-snmp-matrix.ps1` e `tools/add-mib-absolute-oid-comments.ps1`
- [ ] Hardening finale pre-release (regressione completa e allineamento documentazione finale)

## Fuori Ambito (Per Ora)
- [ ] Gestion invio Trap
- [ ] Supporto operazioni SNMP `SET` complete lato simulator
- [ ] Esposizione API per applicazione preset, lettura stato dispositivi
- [ ] Supporto SNMP v2c/v3
- [ ] Distribuzione multi-istanza/orchestrazione cluster

## Stack e Architettura Ipotizzata
- Linguaggio/framework: C# su ASP.NET Core Blazor Server (`net10.0`)
- UI: MudBlazor
- Stack SNMP: Lextm.SharpSnmpLib
- Logging: NLog
- Storage/configurazione: file JSONC + libreria MIB su filesystem
- Integrazioni esterne: strumenti SNMP (`snmpget`, `snmpwalk`, matrix test script)
- Vincoli tecnici:
  - coerenza stretta tra OID configurati e MIB caricati
  - una porta UDP univoca per ogni device simulato
  - startup fail-fast su errori di configurazione

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Discovery + specifiche v1.0/v1.1 | 2026-03-07 | Completata | Modello simulatore e behavior definiti |
| MVP runtime/topologia v1.2.0 | 2026-03-07 | Completata | Device actions + topology runtime introdotti |
| Inter-station topology v1.3.0 | 2026-03-07 | Completata | Viewpoint e reachability per componenti connesse |
| GUI enhancement v1.4.x | 2026-03-08 | In corso avanzato | v1.4.0/v1.4.1 rilasciate; rifiniture finali in `Unreleased` |

## Next Steps (2-4 Settimane)
1. Chiudere backlog `Unreleased` e definire scope della prossima release (v1.5.0).
2. Eseguire regressione completa su matrix SNMP (tutte le categorie + topologie inter-station).
3. Consolidare checklist UAT con scenari runtime (power toggle, porte, UPS flags, viewpoint filtering).
4. Allineare README/specifiche al comportamento finale e congelare baseline di configurazioni esempio.

## Prompt / Specifiche da Preparare
- [ ] Spec 01 - Release v1.5.0 (scope, acceptance criteria, regression matrix)
- [ ] Prompt 01 - Automazione test SNMP estesi con report unico (pass/fail per category/unit)
- [ ] Prompt 02 - Hardening GUI runtime e validazioni topology-driven

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-07 | Introdotte azioni runtime + topology engine (v1.2.0) | Rendere il simulatore utilizzabile in test end-to-end realistici |
| 2026-03-07 | Introdotta topologia inter-station con viewpoint (v1.3.0) | Simulare reachability SNMP dipendente dalla connettivita |
| 2026-03-08 | Riorganizzata GUI con tab e visual topology (v1.4.0) | Migliorare usabilita operativa durante i test |
| 2026-03-08 | Aggiunta tab Interactive Device con SVG e azioni click-driven (v1.4.1) | Ridurre frizione nella simulazione manuale dei guasti/stati |
| 2026-03-08 | Allineato README progetto-idee con stato reale implementazione | Tenere sincronizzato backlog/roadmap tra idea e repo tecnico |

## Rischi / Blocchi
- Errori di configurazione JSONC/MIB bloccano startup (fail-fast): alto impatto operativo se i file non sono versionati con disciplina.
- Copertura regressione ancora in parte manuale su scenari topologici complessi.
- Compatibilita con tool SNMP terzi da verificare in modo sistematico su tutte le categorie device.
- Crescita numero device => aumento listener/rumore log e possibile impatto performance.

## Note Libere
- Comandi rapidi utili:
  - `dotnet build Ocem.Snmp.Simulator.slnx`
  - `dotnet run --project src/Ocem.Snmp.Simulator.Web/Ocem.Snmp.Simulator.Web.csproj`
  - `./tools/test-snmp-matrix.ps1`
- Versione applicativa corrente in `csproj`: `1.4.1`.
- Il file `CHANGELOG.md` indica una sezione `Unreleased` ancora aperta.
