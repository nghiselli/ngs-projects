# Prompt Prossima Sessione (Codex CLI)

Usa questo testo come prompt iniziale in una nuova sessione:

```
Stiamo lavorando sul repository <project-home-folder>.

Main goal del progetto:
- <project-main-goal>

Stack tecnologico di riferimento:
- Backend: .NET 10, C#
- UI: Blazor Server + MudBlazor
- Logging: NLog

File di contesto da leggere per primi:
- checkpoints/README.md
- checkpoints/<YYYY-MM-DD_XXX>/checkpoint.md  # analizzale tutte e usa l'ultima cartella indicizzata in checkpoints/README.md
- README.md
- CHANGELOG.md
- WORKFLOW-GITFLOW.md
- NGS-PROJECTS-UPDATE.md
- docs/*.md

Obiettivo della sessione corrente:
- <session-main-goal>

Note importanti:
- <session-notes>

Procedura da seguire:
1. Crea il feature branch con gitflow: `feature/nghiselli/<nome-feature>` (segui WORKFLOW-GITFLOW.md).
2. Esegui l'obiettivo della sessione corrente.
3. Esegui build locale (`dotnet build Ocem.Snmp.Simulator.slnx -c Release --nologo`).
4. STOP: una volta terminate le implementazioni, lo sviluppatore esegue i test manuali necessari. NON proseguire con commit/push/merge finche non ricevi autorizzazione esplicita.
5. Dopo autorizzazione: commit delle modifiche.
6. Creazione checkpoint (vedi WORKFLOW-GITFLOW.md).
7. Allineamento ngs-projects (vedi WORKFLOW-GITFLOW.md -> Parte 5 e NGS-PROJECTS-UPDATE.md).
8. Chiudi la feature su develop.
9. Verificare la consistenza della documentazione:
	- checkpoints/README.md
	- checkpoints/<YYYY-MM-DD_XXX>/checkpoint.md  # analizzale tutte e usa l'ultima cartella indicizzata in checkpoints/README.md
	- README.md
	- CHANGELOG.md
10. Prepara release `1.8.0`.

Vincoli:
- <constraints>
```
