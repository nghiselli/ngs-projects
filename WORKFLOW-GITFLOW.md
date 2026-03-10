# Workflow: Chiusura Feature, Release e Hotfix (Standard)

> Template operativo GitFlow riusabile su tutti i progetti.
> Modificare solo il blocco variabili e seguire i passi in ordine.

---

## Variabili (modificare solo queste)
Usa un unico blocco strutturato:

```powershell
$CurrentProject = '<CURRENT_PROJECT_NAME>'
$Version = '<X.Y.Z>'
$FeatureBranch = 'feature/<OWNER>/<FEATURE_NAME>'
$ReleaseBranch = "release-$Version"
$HotfixBranch = "hotfix-$Version"
$TagName = "v$Version"
$BuildCommand = 'dotnet build <SOLUTION_OR_PROJECT> -c Release --nologo'
$QuickRunCommand = 'dotnet run --project <APP_PROJECT_FILE> -c Release'
$VersionFilePath = '<PATH_TO_VERSION_FILE>'
$MainBranch = 'main'
$DevelopBranch = 'develop'
$ChangelogPath = 'CHANGELOG.md'
$ReadmePath = 'README.md'
$NgsProjectsUpdatePath = 'NGS-PROJECTS-UPDATE.md'
```

Nota importante:
- I token `${...}` e `<...>` sono placeholder testuali del documento, non espansione automatica.
- Prima di eseguire i comandi, valorizza il blocco variabili con i valori reali del progetto.
- Se il repository non usa `develop`, impostare `DevelopBranch = MainBranch` e adattare i merge.

---

## Pre-check locale (obbligatorio)
Eseguire prima di qualsiasi push/merge:

```powershell
if (-not (Test-Path $VersionFilePath)) { throw "Version file non trovato: $VersionFilePath" }
if (-not (Test-Path $ChangelogPath)) { throw "Changelog non trovato: $ChangelogPath" }
if (-not (Test-Path $ReadmePath)) { throw "README non trovato: $ReadmePath" }

if (git rev-parse --is-inside-work-tree 2>$null) {
  git branch --show-current
} else {
  throw 'Directory corrente non e un repository git.'
}
```

---

## Parte 1 - Chiusura Feature
Da eseguire al termine dello sviluppo su branch feature.

### Checklist

#### Codice
- [ ] Build senza errori con il comando definito in `$BuildCommand`.
- [ ] Nessun `TODO:` o `FIXME:` non intenzionale rimasto nel codice.

#### Test manuale (obbligatorio prima di push/merge)
- [ ] Avvio locale con il comando definito in `$QuickRunCommand`.
- [ ] Test del flusso principale della feature.
- [ ] Test edge case ovvio (input mancante, flag errato, timeout, ecc.).
- [ ] Smoke regressione sulle funzionalita preesistenti.

#### Documentazione
- [ ] `README.md` aggiornato se sono cambiati comandi o comportamenti.
- [ ] `CHANGELOG.md` aggiornato in `[Unreleased]`.

#### Commit e push branch feature
- [ ] Tutti i file modificati committati sul branch feature.
- [ ] Push branch feature su origin.

Esempio comandi:

```powershell
git push origin $FeatureBranch
```

#### Merge su develop/main (procedura manuale, non interattiva)

```powershell
git checkout $DevelopBranch
git merge --no-ff $FeatureBranch -m "Merge branch '$FeatureBranch' into $DevelopBranch"
git branch -d $FeatureBranch
git push origin $DevelopBranch
```

Regola:
- Non usare comandi gitflow interattivi (`git flow ... finish`) in shell che possono bloccarsi sull'editor.

---

## Parte 2 - Release
Da eseguire quando il branch di integrazione e stabile e pronto per rilascio.

### Checklist pre-release

#### Versione
- [ ] Aggiornare la versione in `$VersionFilePath` a `$Version`.

#### CHANGELOG
- [ ] Promuovere `[Unreleased]` -> `[$Version] - YYYY-MM-DD`.
- [ ] Aggiungere una nuova sezione `[Unreleased]` vuota in cima.
- [ ] Aggiornare i link confronto in fondo al file.
- [ ] Commit documentazione/versioning eseguito.

#### Procedura release (manuale, non interattiva)

```powershell
git checkout $DevelopBranch
git checkout -b $ReleaseBranch

# Eventuali fix finali su release branch
# git add .
# git commit -m "fix: release hardening"

git checkout $MainBranch
git merge --no-ff $ReleaseBranch -m "Merge branch '$ReleaseBranch' into $MainBranch"
git tag -a $TagName -m "Release $TagName"

git checkout $DevelopBranch
git merge --no-ff $ReleaseBranch -m "Merge branch '$ReleaseBranch' into $DevelopBranch"
git branch -d $ReleaseBranch

git push origin $MainBranch
git push origin $DevelopBranch
git push origin $TagName
```

---

## Parte 3 - Checkpoint di sessione (opzionale ma consigliato)
Da fare a fine sessione significativa.

- [ ] Se esiste la cartella `checkpoints/`, creare `checkpoints/YYYY-MM-DD_XXX/checkpoint.md`.
- [ ] Documentare: contesto, branch, lavoro completato, stato task, note tecniche.
- [ ] Aggiornare eventuale indice `checkpoints/README.md`.
- [ ] Commit documentale della sessione.

---

## Parte 4 - Hotfix
Da eseguire per correzioni urgenti in produzione (partendo da `$MainBranch`).

### Checklist pre-hotfix

#### Base branch
- [ ] Allineare `main`: checkout + pull.
- [ ] Creare branch hotfix da main.

#### Fix e validazione
- [ ] Applicare solo la correzione urgente (scope minimo).
- [ ] Build senza errori con `$BuildCommand`.
- [ ] Test manuale mirato al bug + smoke regressione.

#### Versione e changelog
- [ ] Aggiornare versione patch in `$VersionFilePath`.
- [ ] Aggiornare `$ChangelogPath` con release hotfix.
- [ ] Commit sul branch hotfix.

#### Chiusura hotfix (manuale, non interattiva)

```powershell
git checkout $MainBranch
git merge --no-ff $HotfixBranch -m "Merge branch '$HotfixBranch' into $MainBranch"
git tag -a $TagName -m "Hotfix $TagName"

git checkout $DevelopBranch
git merge --no-ff $HotfixBranch -m "Merge branch '$HotfixBranch' into $DevelopBranch"
git branch -d $HotfixBranch

git push origin $MainBranch
git push origin $DevelopBranch
git push origin $TagName
```

---

## Parte 5 - Aggiornamento tracking su ngs-projects
Da eseguire a fine:
- feature
- release
- hotfix
- milestone tecnica

### Checklist
- [ ] Seguire integralmente la procedura in `$NgsProjectsUpdatePath`.
- [ ] Mostrare il diff delle modifiche applicate al README tracking.
- [ ] Se richiesto, rigenerare dati pages e committare nel repository `ngs-projects`.

---

## Parte 6 - Regole standard per AI agent
- [ ] Non pushare o mergere senza test manuale completato e confermato.
- [ ] Preferire sempre comandi git non interattivi.
- [ ] Prima del push, mostrare `git status` e diff sintetico delle modifiche.
- [ ] Aggiornare sempre `README.md`/`CHANGELOG.md` quando impatta il comportamento.
- [ ] Se un prerequisito manca (path, branch, permessi), fermarsi e chiedere conferma.

---

## Riferimenti minimi
| Documento | Descrizione |
|-----------|-------------|
| `README.md` | Documentazione tecnica del progetto |
| `CHANGELOG.md` | Storico versioni e release |
| `NGS-PROJECTS-UPDATE.md` | Procedura di aggiornamento tracking portfolio |
| `docs/` | Specifiche funzionali/tecniche (se presenti) |
| `checkpoints/` | Salvataggio dei checkpoint dell'agent ai (se presenti) |
