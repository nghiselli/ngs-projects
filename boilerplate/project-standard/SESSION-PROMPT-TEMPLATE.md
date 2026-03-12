# Prompt Prossima Sessione (Codex CLI)

Usa questo testo come prompt iniziale in una nuova sessione:

# ATTENZIONE: RICORDATI DI MODIFICARE

## <project-home-folder> (once)
## <technological-stack> (once)

## <nome-feature> (every time)
## <project-main-goal> (every time)
## <session-main-goal> (every time)
## <session-notes> (every time)
## <current-version> (every time)
## <constraints> (every time)

```
Stiamo lavorando sul repository <project-home-folder>.

Main goal del progetto:
- <project-main-goal>

Stack tecnologico di riferimento:
- Backend: <technological-stack>
- UI: <technological-stack>
- Logging: NLog

File di contesto da leggere per primi:
- checkpoints/README.md
- checkpoints/<YYYY-MM-DD_XXX>/checkpoint.md  # analizzale tutte e usa l'ultima cartella indicizzata in checkpoints/README.md
- README.md
- CHANGELOG.md
- WORKFLOW-DOCS-BOOTSTRAP.md
- WORKFLOW-SPECIFICATION.md
- WORKFLOW-FEATURE-ANALYSIS.md
- WORKFLOW-GITFLOW.md
- NGS-PROJECTS-UPDATE.md
- WORKFLOW-STANDARD.md
- docs/*.md

Obiettivo della sessione corrente:
- <session-main-goal>

Note importanti:
- <session-notes>

Procedura da seguire:
1. Crea il feature branch con gitflow: `feature/nghiselli/<nome-feature>` (segui WORKFLOW-GITFLOW.md).
2. Se README/CHANGELOG sono assenti o inaffidabili, applica prima WORKFLOW-DOCS-BOOTSTRAP.md in modalita manuale.
3. Verifica che specifica e analisi siano presenti e aggiornate (WORKFLOW-SPECIFICATION.md, WORKFLOW-FEATURE-ANALYSIS.md).
4. Esegui l'obiettivo della sessione corrente.
5. Esegui build locale (`dotnet build Ocem.Snmp.Simulator.slnx -c Release --nologo`).
6. STOP: una volta terminate le implementazioni, lo sviluppatore esegue i test manuali necessari. NON proseguire con commit/push/merge finche non ricevi autorizzazione esplicita.
7. Dopo autorizzazione: commit delle modifiche.
8. Creazione checkpoint (vedi WORKFLOW-GITFLOW.md).
9. Allineamento ngs-projects (vedi WORKFLOW-GITFLOW.md -> Parte 5 e NGS-PROJECTS-UPDATE.md).
10. Chiudi la feature su develop.
11. Verificare la consistenza della documentazione:
	- checkpoints/README.md
	- checkpoints/<YYYY-MM-DD_XXX>/checkpoint.md  # analizzale tutte e usa l'ultima cartella indicizzata in checkpoints/README.md
	- README.md
	- CHANGELOG.md
12. Prepara release `<current-version>`.

Vincoli:
- <constraints>
```