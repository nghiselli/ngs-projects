# Workflow: Personalizzazione Post-Inizializzazione

> Checklist rapida da eseguire subito dopo `tools/ensure-project-boilerplate.ps1`.
> Obiettivo: rendere il repository pronto all'uso senza lasciare placeholder.

---

## Quando usarlo

Usare questo workflow:
- all'inizializazione di un nuovo repository, appena creata la struttura boilerplate (prima di iniziare la prima feature reale);
- per riallineare i template dopo una modifica dello stesso.

---

## File da personalizzare (obbligatori)

### 1) `README.md`
- Sostituire `<project-name>`.
- Completare: descrizione, obiettivo, prerequisiti, avvio rapido.
- Aggiornare esempi comando build/run con quelli reali.

### 2) `CHANGELOG.md`
- Sostituire `<repo-url>` nei link finali.
- Impostare la prima versione reale (es. `0.1.0`) con data corretta.
- Lasciare in testa una sezione `## [Unreleased]` vuota.

### 3) `WORKFLOW-GITFLOW.md`
- Compilare il blocco variabili iniziale:
  - `$CurrentProject`
  - `$BuildCommand`
  - `$QuickRunCommand`
  - `$VersionFilePath`
  - `$MainBranch`, `$DevelopBranch`
- Verificare che i path citati nel pre-check esistano davvero.

### 4) `SESSION-PROMPT-TEMPLATE.md`
- Sostituire tutti i placeholder `<...>`:
  - `<project-home-folder>`
  - `<technological-stack>`
  - `<nome-feature>`
  - `<project-main-goal>`
  - `<session-main-goal>`
  - `<session-notes>`
  - `<current-version>`
  - `<constraints>`
- Allineare il comando build citato al progetto reale.

---

## File da personalizzare (se usati)

### 5) `NGS-PROJECTS-UPDATE.md` (solo se il progetto e tracciato nel portfolio)
- Compilare il blocco variabili:
  - `$CurrentProject`
  - `$ProjectFolder`
  - `$NgsProjectsRoot`
  - `$ReleasedVersion` (solo release/hotfix)
- Non modificare il resto del documento, salvo evoluzioni del processo condiviso.

### 6) `docs/docs-generator/enrichment.json` (solo se usi bootstrap docs)
- Aggiornare il contesto repository.
- Inserire enrichment coerente con il progetto corrente.
- Non riusare dati di altri repository.

### 7) `tools/install-hooks.ps1` e `tools/hooks/commit-msg` (opzionale ma consigliato)
- Verificare policy commit locale.
- Eseguire installazione hook nel clone attivo.

---

## Verifica finale (obbligatoria)

Eseguire dalla root del progetto:

```powershell
rg -n "<[^>]+>" README.md CHANGELOG.md WORKFLOW-GITFLOW.md SESSION-PROMPT-TEMPLATE.md NGS-PROJECTS-UPDATE.md
```

Aspettativa:
- nessun placeholder residuo nei file che usi.

Controllo diff:

```powershell
git status --short
git diff -- README.md CHANGELOG.md WORKFLOW-GITFLOW.md SESSION-PROMPT-TEMPLATE.md NGS-PROJECTS-UPDATE.md
```

---

## Gate di ingresso alla prima feature

Prima di creare `feature/*`:
- [ ] Tutti i file obbligatori sono personalizzati.
- [ ] `README.md` e `CHANGELOG.md` sono coerenti col progetto.
- [ ] `WORKFLOW-GITFLOW.md` punta ai comandi reali.
- [ ] Nessun placeholder critico rimasto.
