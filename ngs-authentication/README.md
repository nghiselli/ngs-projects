# ngs-authentication

## Snapshot
- Path progetto idee: D:\repos\NicolaGhiselliSolutions\ngs-projects\ngs-authentication
- Path implementazione corrente (spike): D:\repos\NicolaGhiselliSolutions\ngs-budget-utilities
- Stato avanzamento: In pausa (PoC parziale disponibile in ngs-budget-utilities)
- Priorita: Alta

- Progresso: 45%
- Tipo progetto: Personale

- Includi nel portfolio: Si
- Ultimo aggiornamento: 2026-03-09
- Owner: Nicola

## Obiettivo
Costruire un layer di autenticazione riusabile per i progetti NGS, con due direzioni evolutive:
- modulo condiviso riusabile (NuGet privato o git submodule/template);
- eventuale authentication server centralizzato per utenti/ruoli/permessi multi-app.

## Contesto / Problema
I progetti sono separati ma hanno bisogni simili (login, utenti, ruoli, sicurezza cookie/sessione). Senza un modulo comune si rischiano duplicazioni, configurazioni incoerenti e regressioni su sicurezza e manutenzione.

## Stato attuale (analisi ngs-budget-utilities)
- [x] Esiste uno spike AuthKit in `D:\repos\NicolaGhiselliSolutions\ngs-budget-utilities\src\NgsBudgetUtilities.AuthKit`.
- [x] Servizi base disponibili: `IAuthService`, `AuthService<TUser>`, pagine `Login/Register/Logout`.
- [x] Identity e `ApplicationUser` gia integrati in `Infrastructure` con `IdentityDbContext`.
- [ ] Hardening non completo nel consumer attuale (cookie path policy, route protection centralizzata, allineamento middleware/docs).
- [ ] Test reali quasi assenti (solo test placeholder).

## Ambito V1 (MVP)
- [x] Consolidare lo spike tecnico esistente in ngs-budget-utilities.
- [ ] Estrarre un modulo `ngs-authentication` indipendente dal dominio budget.
- [ ] Definire API pubblica stabile (servizi, modelli request/response, estensioni DI).
- [ ] Hardening integrazione host app (cookie paths, fallback policy opzionale, route guard, middleware order).
- [ ] Aggiungere test unit/integration su register/login/logout/redirect.
- [ ] Documentare quick-start e checklist integrazione per nuovi progetti.

## Fuori Ambito (Per Ora)
- [ ] Authentication server centralizzato production-ready.
- [ ] SSO/federazione con provider esterni (Google, Microsoft, ecc.).
- [ ] Pannello admin enterprise completo per gestione avanzata permessi.
- [ ] Multi-tenancy avanzata e provisioning automatizzato.

## Stack e Architettura Ipotizzata
- Linguaggio/framework: .NET 10, ASP.NET Core Identity, Blazor Server (componenti UI riusabili)
- Storage/database: EF Core 9 + MariaDB/MySQL (adattabile al progetto consumer)
- Integrazioni esterne: MudBlazor (UI), eventuale NLog/telemetria del consumer
- Packaging/distribuzione: NuGet privato oppure git submodule/template
- Vincoli tecnici:
  - evitare coupling con logica dominio dei singoli progetti;
  - garantire baseline sicurezza uniforme (cookie/auth policy/antiforgery);
  - facilitare adozione rapida su progetti web e, in prospettiva, flussi CLI.

## Milestone
| Milestone | Target | Stato | Note |
|---|---|---|---|
| Discovery e gap analysis | 2026-03 | Completata | Analizzato spike in ngs-budget-utilities |
| M1 - Extraction core module | 2026-Q2 | In corso | Separazione codice auth riusabile dal dominio budget |
| M2 - Stabilizzazione | 2026-Q2 | Da iniziare | Hardening + test + documentazione integrazione |
| M3 - Adozione cross-project | 2026-Q2/Q3 | Da iniziare | Integrazione su 2+ progetti NGS |
| M4 - Studio auth server centrale | 2026-Q3 | Da iniziare | Decisione build vs buy (OpenIddict/Keycloak/altro) |

## Next Steps (2-4 Settimane)
1. Creare il progetto implementativo dedicato `ngs-authentication` e migrare li il codice AuthKit generico.
2. Chiudere i gap tecnici nel consumer spike (`ngs-budget-utilities`) per avere una baseline pulita e verificata.
3. Scrivere test minimi automatici per flusso auth completo (register/login/logout + redirect).
4. Preparare un template/checklist di integrazione per i prossimi progetti (incluso scenario CLI interattiva in roadmap).

## Prompt / Specifiche da Preparare
- [ ] Spec 01 - API pubblica e contratti del modulo ngs-authentication
- [ ] Spec 02 - Security baseline (cookie policy, lockout, password, antiforgery)
- [ ] Prompt 01 - Refactor estrazione AuthKit da ngs-budget-utilities a modulo standalone
- [ ] Prompt 02 - Integrazione guidata su progetto consumer sample
- [ ] Prompt 03 - Studio fattibilita auth server centralizzato (MVP + tradeoff)

## Decision Log
| Data | Decisione | Motivazione |
|---|---|---|
| 2026-01-12T09:00:00+01:00 | Primo spike auth in ngs-budget-utilities (AuthKit RCL) | Validare rapidamente approccio riusabile |
| 2026-03-09T09:00:00+01:00 | Trattare ngs-budget-utilities come PoC, non implementazione shared definitiva | Ridurre coupling dominio-specifico |
| 2026-03-09T09:01:00+01:00 | Strategia in due fasi: modulo riusabile prima, auth server dopo | Ridurre rischio e consegnare valore prima |

## Rischi / Blocchi
- Divergenza tra documentazione spike e stato codice reale.
- Copertura test insufficiente (attualmente test placeholder).
- Possibili breaking changes durante rinomina namespace/package e migrazione consumer.
- Rischio over-engineering se si anticipa troppo la parte auth server centrale.

## Note Libere
- File utili analizzati nello spike:
  - `D:\repos\NicolaGhiselliSolutions\ngs-budget-utilities\src\NgsBudgetUtilities.AuthKit\ServiceCollectionExtensions.cs`
  - `D:\repos\NicolaGhiselliSolutions\ngs-budget-utilities\src\NgsBudgetUtilities.AuthKit\Services\AuthService.cs`
  - `D:\repos\NicolaGhiselliSolutions\ngs-budget-utilities\src\NgsBudgetUtilities.Web\Program.cs`
  - `D:\repos\NicolaGhiselliSolutions\ngs-budget-utilities\src\NgsBudgetUtilities.Web\Components\Routes.razor`
  - `D:\repos\NicolaGhiselliSolutions\ngs-budget-utilities\docs\authkit\INTEGRATION_GUIDE.md`
- `infinite-installer-cli` potra agganciarsi a questa iniziativa usando il futuro template CLI/web condiviso.


