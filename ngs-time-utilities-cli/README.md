# ngs-time-utilities-cli

## Snapshot
- Path progetto idee: D:\repos\NicolaGhiselliSolutions\ngs-project-ideas\ngs-time-utilities-cli
- Path implementazione: D:\repos\NicolaGhiselliSolutions\ngs-time-utilities-cli
- Stato avanzamento: In corso avanzato (MVP operativo, versione corrente 1.3.0)
- Priorita: Media
- Tipo progetto: Personale
- Includi nel portfolio: Si
- Ultimo aggiornamento: 2026-03-09
- Owner: Nicola

## Obiettivo
Costruire una CLI operativa per integrare Asana e Clockify in modalita veloce/scriptabile, e usarla come progetto pilota per definire un template riusabile di interactive CLI NGS.

Documenti principali di riferimento:

| Documento | Descrizione |
|-----------|-------------|
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities-cli\CHANGELOG.md` | Storico versioni |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities-cli\README.md` | Documentazione del progetto |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities-cli\docs\DISTRIBUTION-NUGET-FEED.md` | Guida distribuzione via GitHub Packages |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities-cli\docs\DISTRIBUTION-GITHUB-RELEASES.md` | Guida distribuzione via GitHub Releases |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities-cli\docs\INSTALL-CLIENT.md` | Guida installazione per utenti finali |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities-cli\docs\ANALYSIS-INTERACTIVE-CLI-AND-TEMPLATE.md` | Analisi evoluzioni future |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities-cli\docs\SESSION-PROMPT-TEMPLATE.md` | Template prompt di inizio sessione Copilot |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities-cli\.github\workflows\publish-cli.yml` | CI/CD publish automatico al push del tag |
| `D:\repos\NicolaGhiselliSolutions\ngs-time-utilities-cli\docs` | Documentazione specializzata per approcci adottati |

## Contesto / Problema
Questo progetto e importante per conoscere bene le API di Asana, Clockify ed eventuali altre piattaforme da integrare.
Inoltre questo progetto e un pilota per costruire un template di NGS interactive CLI.

## Ambito V1 (MVP)
- [x] Configurazione credenziali e setup guidato (`config init`, `config setup`, `config show`).
- [x] Sync Asana -> Clockify (`sync asana2clockify`) con supporto progetto/SPX/dry-run.
- [x] Sync Clockify -> Asana (`sync clockify2asana`) con confronto e gestione entry orfane.
- [x] Comandi operativi Clockify (`get-*`, `tag-billable`, `migrate`, `delete-tasks`) e Asana (`get-*`).
- [x] Modalita duale batch + shell interattiva REPL (`ngstime` senza argomenti) con autocomplete e history persistente.
- [x] Distribuzione tool via install script locale, GitHub Packages e GitHub Releases.
- [ ] Suite test automatica reale (unit/integration/e2e CLI) ancora assente.

## Fuori Ambito (Per Ora)
- [ ] Integrare le API di Notion
- [ ] Modulo auth/utenti/ruoli nella CLI (non necessario per uso personale/tecnico attuale)
- [ ] Refactor plugin architecture completo multi-provider (oltre scope MVP)
- [ ] UI desktop/web separata per i flussi CLI

## Stack e Architettura Ipotizzata
- Linguaggio/framework: .NET 9, Spectre.Console, Spectre.Console.Cli, PrettyPrompt
- Storage/database: nessun DB locale; configurazione in `~/.ngstime/config.json`
- Integrazioni esterne: Asana API, Clockify API
- Distribuzione: dotnet global tool (NuGet feed) + binari standalone (GitHub Releases)
- Vincoli tecnici:
  - gestione sicura token locali (file sensibile su macchina utente);
  - dipendenza da API esterne e relative policy/rate limits;
  - presenza di comandi potenzialmente distruttivi (`delete-tasks`, `migrate`) da proteggere con conferme/guardrail;
  - mantenere compatibilita cross-platform per installazione e uso CLI.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Discovery + baseline CLI | 2026-03-06 | Completata | v1.0.0: config, sync e completion |
| Estensione comandi operativi | 2026-03-07 | Completata | v1.1.0: comandi Clockify/Asana avanzati |
| Setup guidato API | 2026-03-07 | Completata | v1.2.0: `config setup` con validazione token |
| Interactive shell | 2026-03-07 | Completata | v1.3.0: dual-mode + REPL PrettyPrompt |
| Stabilizzazione quality/release | 2026-Q2 | In corso | test, hardening workflow e documentazione install |
| Estrazione template riusabile | 2026-Q2 | Da iniziare | base per `ngs-cli-template` e altre CLI NGS |

## Next Steps (2-4 Settimane)
1. Introdurre test automatici minimi sui flussi core (config setup, sync, parsing settings, dry-run safety).
2. Hardening pipeline release/versioning (allineare gestione versione tra tag, workflow e `ngstime.csproj`).
3. Estrarre il primo scheletro `ngs-cli-template` dal progetto attuale (bootstrap dual-mode + config loader + console helpers).
4. Rifinire onboarding clienti (script install e validazione PAT/feed) riducendo passaggi manuali.

## Prompt / Specifiche da Preparare
- [ ] Spec 01 - Test strategy CLI (unit + command smoke + regression su output critici)
- [ ] Spec 02 - Blueprint `ngs-cli-template` (struttura, placeholder, checklist di personalizzazione)
- [ ] Prompt 01 - Implementazione test pack minimo per `config` e `sync`
- [ ] Prompt 02 - Refactor pipeline publish (versioning robusto e release notes pulite)
- [ ] Prompt 03 - Hardening comandi distruttivi con guardrail aggiuntivi

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-03-06 | Adozione CLI .NET 9 come dotnet global tool (`ngstime`) | Distribuzione semplice e veloce in ambiente dev/cliente |
| 2026-03-07 | Estensione comandi Clockify/Asana orientati a operativita quotidiana | Ridurre operazioni manuali ripetitive |
| 2026-03-07 | Adozione approccio dual-mode + PrettyPrompt per shell interattiva | Migliorare UX mantenendo compatibilita batch |
| 2026-03-07 | Setup guidato (`config setup`) con validazione token prima del salvataggio | Ridurre errori in onboarding e troubleshooting |
| 2026-03-09 | Posizionare `ngs-time-utilities-cli` come PoC per template CLI riusabile | Abilitare riuso su `infinite-installer-cli` e progetti futuri |

## Rischi / Blocchi
- Copertura test quasi nulla: rischio regressioni su comandi critici.
- Sicurezza token lato client basata su file locale: richiede disciplina operativa.
- Possibili divergenze tra documentazione release e workflow effettivo di publish/versioning.
- Dipendenza forte da API esterne (variazioni endpoint, limiti, downtime).
- Comandi distruttivi richiedono protezioni chiare per ridurre errore umano.

## Note Libere
- Questo progetto e un acceleratore diretto per `ngs-cli-template` (gia presente in `ngs-project-ideas`).
- Buon candidato per trasferire pattern anche su `infinite-installer-cli` quando si passa all'implementazione.
- Path documentali aggiornati ai file effettivi in `docs\` (evitati riferimenti obsoleti in root).

