# Workflow: Chiusura Feature e Release

> Guida operativa per il processo GitFlow di `Ocem.Snmp.Simulator`.  
> Seguire i passi nell'ordine indicato.

---

## Parte 1 — Chiusura Feature

Da eseguire al termine dello sviluppo di una feature su branch `feature/nghiselli/<nome>`.

### Checklist

#### Codice
- [ ] Build senza errori: `dotnet build Ocem.Snmp.Simulator.slnx -c Release --nologo`
- [ ] Nessun `TODO:` o `FIXME:` non intenzionale rimasto nel codice

#### Test manuale ← **da fare prima di qualsiasi push/merge**

> ⚠️ **Non pushare e non mergere su `develop` senza aver eseguito i test manuali e aver ricevuto ok.**

Metodo rapido per testare senza installare:
```powershell
dotnet run --project src/Ocem.Snmp.Simulator.Web/Ocem.Snmp.Simulator.Web.csproj -c Release
```

Checklist test minima:
- [ ] Smoke test: `dotnet run ... ` → chiedere all'utente di fare i test necessari
- [ ] Test della nuova funzionalità (flusso principale)
- [ ] Test edge case ovvio (input mancante, flag errato, ecc.)
- [ ] Verificare che le funzionalità preesistenti non siano stati rotti (regressione)

#### Documentazione
- [ ] `README.md` aggiornato se sono stati aggiunti nuovi comandi o cambiati comportamenti
- [ ] `CHANGELOG.md` — sezione `[Unreleased]` aggiornata con le modifiche della feature

#### Commit e push

> ⚠️ **Eseguire i test manuali prima di questo step.**

- [ ] Tutti i file modificati committati sul branch feature
- [ ] Push del branch su origin: `git push origin feature/nghiselli/<nome>`

#### Merge su develop (procedura manuale — editor gitflow non funziona in PS)

```powershell
# 1. Vai su develop
git checkout develop

# 2. Merge del branch feature
git merge --no-ff feature/nghiselli/<nome> -m "Merge branch 'feature/nghiselli/<nome>' into develop"

# 3. Elimina il branch feature
git branch -d feature/nghiselli/<nome>

# 4. Push develop
git push origin develop
```

> ⚠️ **Nota:** `git flow feature finish` si blocca sull'editor interattivo in PowerShell.
> Usare la procedura manuale sopra.

---

## Parte 2 — Release

Da eseguire quando `develop` è stabile e si vuole pubblicare una nuova versione.

### Checklist pre-release

#### Versione
- [ ] Aggiornare `<Version>` in `src\Ocem.Snmp.Simulator.Web\Ocem.Snmp.Simulator.Web.csproj` alla nuova versione

#### CHANGELOG
- [ ] Promuovere `[Unreleased]` → `[X.Y.Z] — YYYY-MM-DD`
- [ ] Aggiungere nuova sezione `[Unreleased]` vuota in cima
- [ ] Aggiornare i link in fondo al file:
  ```
  [Unreleased]: .../compare/vX.Y.Z...HEAD
  [X.Y.Z]: .../compare/vPREV...vX.Y.Z
  ```
- [ ] Commit: `chore: promote [Unreleased] to [X.Y.Z] in CHANGELOG`

#### Procedura release (manuale — editor gitflow non funziona in PS)

```powershell
# 1. Crea branch release da develop
git checkout -b release-X.Y.Z develop

# 2. Eventuali last-minute fixes qui (se necessari)
# git add . && git commit -m "fix: ..."

# 3. Merge su main
git checkout main
git merge --no-ff release-X.Y.Z -m "Merge branch 'release-X.Y.Z' into main"

# 4. Crea il tag annotato
git tag -a vX.Y.Z -m "Release vX.Y.Z"

# 5. Merge back su develop
git checkout develop
git merge --no-ff release-X.Y.Z -m "Merge branch 'release-X.Y.Z' into develop"

# 6. Elimina il branch release
git branch -d release-X.Y.Z

# 7. Push tutto
git push origin main
git push origin develop
git push origin vX.Y.Z
```

> ⚠️ **Nota:** `git flow release finish` si blocca sull'editor interattivo in PowerShell.
> Usare la procedura manuale sopra.

---

## Parte 3 — Checkpoint di sessione

Da fare alla fine di ogni sessione di lavoro significativa.

- [ ] Creare cartella `checkpoints\YYYY-MM-DD_XXX\` (XXX = numero progressivo)
- [ ] Creare `checkpoint.md` con:
  - Contesto e branch corrente
  - Lavoro completato (con dettagli su file modificati)
  - Stato task (tabella ✅/❌)
  - Note tecniche rilevanti scoperte durante la sessione
- [ ] Aggiornare `checkpoints\README.md` con la nuova riga nell'indice e con i riferimenti alla sessione copilot
- [ ] Committare: `docs: add checkpoint XXX — <titolo breve>`

---

## Parte 4 — Hot-fix

Da eseguire per correzioni urgenti in produzione (partendo da `main`).

### Checklist pre-hotfix

#### Base branch
- [ ] Assicurarsi che `main` sia aggiornata: `git checkout main` + `git pull origin main`
- [ ] Creare branch hot-fix da `main`: `git checkout -b hotfix-X.Y.Z`

#### Fix e validazione
- [ ] Applicare solo la correzione urgente (scope minimo)
- [ ] Build senza errori: `dotnet build Ocem.Snmp.Simulator.slnx -c Release --nologo`
- [ ] Test manuale mirato al bug + smoke regressione base prima di push/merge

#### Versione e changelog
- [ ] Aggiornare `<Version>` in `src\Ocem.Snmp.Simulator.Web\Ocem.Snmp.Simulator.Web.csproj` alla patch `X.Y.Z`
- [ ] Aggiornare `CHANGELOG.md` con la nuova versione hot-fix `[X.Y.Z] — YYYY-MM-DD`
- [ ] Commit sul branch hot-fix: `fix: hotfix X.Y.Z <descrizione breve>`

#### Chiusura hot-fix (procedura manuale — editor gitflow non funziona in PS)

```powershell
# 1. Merge su main
git checkout main
git merge --no-ff hotfix-X.Y.Z -m "Merge branch 'hotfix-X.Y.Z' into main"

# 2. Tag della patch
git tag -a vX.Y.Z -m "Hotfix vX.Y.Z"

# 3. Merge back su develop
git checkout develop
git merge --no-ff hotfix-X.Y.Z -m "Merge branch 'hotfix-X.Y.Z' into develop"

# 4. Elimina branch hot-fix
git branch -d hotfix-X.Y.Z

# 5. Push
git push origin main
git push origin develop
git push origin vX.Y.Z
```

> ⚠️ **Nota:** `git flow hotfix finish` si blocca sull'editor interattivo in PowerShell.
> Usare la procedura manuale sopra.

---
## Parte 5 — Aggiornamento tracking su `ngs-projects`

Da eseguire a fine:
- feature
- release
- hotfix
- milestone tecnica

### Checklist
- [ ] Seguire integralmente la procedura in `NGS-PROJECTS-UPDATE.md`
- [ ] Mostrare il diff delle modifiche applicate al README tracking
- [ ] Se richiesto nel flusso sessione, committare e pushare sul repository `ngs-projects`

---
## Riferimenti

| Documento | Descrizione |
|-----------|-------------|
| `CHANGELOG.md` | Storico versioni |
| `README.md` | Documentazione del progetto |
| `NGS-PROJECTS-UPDATE.md` | Procedura per aggiornare il README di tracking in `ngs-projects` |
| `docs/topology-configuration-guide.md` | Regole per la configurazione della topoloiga |
| `docs/v1.0.0-simulator-specification.md` | Specifica iniziale del progetto |
| `docs/v1.1.0-simulator-behavior-specification.md` | Specifica del comportamento simulato dei dispositivi |
| `docs/v1.2.0-simulator-device-actions-topology-specification.md` | Specifica per introdurre delle relazioni tra i dispositivi |
| `docs/v1.3.0-simulator-interstation-topology-specification.MD` | Specifica per introdurre delle relazioni tra le stazioni |
| `docs/v1.4.0-simulator-gui-enhancement-specification.MD` | Specifica per migliorare aspetti grafici secondari |
