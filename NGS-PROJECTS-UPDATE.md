# NGS-PROJECTS-UPDATE.md

## Scopo
Questo file guida developer/AI agent ad aggiornare in modo consistente il README di tracking progetto dentro `ngs-projects`.

## Variabili (modificare solo queste)
Usa un unico blocco strutturato:

```powershell
$CurrentProject = '<CURRENT_PROJECT_NAME>'
$ProjectFolder = '<PROJECT_FOLDER_IN_NGS_PROJECTS>'
$NgsProjectsRoot = '<ABSOLUTE_PATH_TO_NGS_PROJECTS_ROOT>'
```

Percorsi derivati (non modificarli a mano):
- README di tracking da aggiornare: `${NgsProjectsRoot}\${ProjectFolder}\README.md`
- Script generazione pages: `${NgsProjectsRoot}\tools\generate-pages.ps1`

Nota importante:
- I token `${...}` sono placeholder testuali del documento (template), non sono espansione automatica PowerShell.
- Prima di eseguire comandi, sostituisci i placeholder con valori reali o valorizza variabili PowerShell equivalenti.

## Pre-check locale (obbligatorio)
Prima di aggiornare il README, verifica che i path esistano:

```powershell
$TrackingReadme = Join-Path $NgsProjectsRoot "$ProjectFolder\README.md"
$GeneratePagesScript = Join-Path $NgsProjectsRoot 'tools\generate-pages.ps1'

if (-not (Test-Path $NgsProjectsRoot)) { throw "NgsProjectsRoot non trovato: $NgsProjectsRoot" }
if (-not (Test-Path $TrackingReadme)) { throw "README di tracking non trovato: $TrackingReadme" }
if (-not (Test-Path $GeneratePagesScript)) { throw "Script generate-pages non trovato: $GeneratePagesScript" }
```

## Come usare le variabili
1. Imposta `CurrentProject` con il nome reale del progetto sorgente.
2. Imposta `ProjectFolder` con il nome cartella usato dentro `ngs-projects` (puo essere diverso da `CurrentProject`).
3. Imposta `NgsProjectsRoot` con il path locale della root `ngs-projects`.
4. Esegui il pre-check locale.
5. Copia questo file nella root del progetto sorgente e usa il prompt operativo sotto senza modificare il resto del documento.

## Quando usarlo
Usare questa procedura a fine:
- feature,
- release,
- hotfix,
- milestone tecnica.

## Regole obbligatorie
1. Non cambiare struttura del README (`## Snapshot`, sezioni principali, tabelle) salvo richiesta esplicita.
2. Mantenere cronologia in `Decision Log` (append, non overwrite).
3. Usare date ISO `yyyy-MM-dd`.
4. Valorizzare `Progresso` con percentuale `0-100%`.
5. Non cambiare `Includi nel portfolio` senza richiesta esplicita.

## Campi Snapshot da aggiornare sempre
- `Stato avanzamento`
- `Progresso`
- `Ultimo aggiornamento`

Aggiornare anche se necessario:
- `Priorita`
- `Tipo progetto`

## Sezioni da aggiornare dopo Snapshot
- `Ambito attuale` (o sezione equivalente), checkbox e punti completati
- `Milestone` (stato/target)
- `Next Steps`
- `Decision Log` (aggiungere riga con decisione della release/feature)
- `Rischi / Note` (se emergono nuovi rischi o debt)

## Mappatura stato consigliata
- `Da pianificare` -> 0%
- `Pianificato` -> 10-30%
- `In corso` -> 30-90%
- `In pausa` -> mantenere ultimo valore raggiunto
- `In manutenzione` -> 90-100%
- `Completato` -> 100%
- `Archiviato` -> mantenere ultimo valore raggiunto

## Prompt operativo suggerito per AI agent
Usa questo prompt (adattando i dati della release):

```text
Aggiorna il file ${NgsProjectsRoot}\${ProjectFolder}\README.md in base alle ultime modifiche del progetto ${CurrentProject}.

Regole:
- Mantieni struttura e sezioni del README.
- Aggiorna Snapshot: Stato avanzamento, Progresso, Ultimo aggiornamento.
- Aggiorna Ambito attuale (o sezione equivalente), Milestone, Next Steps e aggiungi una riga in Decision Log.
- Non rimuovere storico esistente.
- Usa data formato yyyy-MM-dd.

Dopo la modifica, rigenera i dati pages con:
${NgsProjectsRoot}\tools\generate-pages.ps1

Infine mostra il diff delle modifiche effettuate.
```

## Verifica finale locale
Dopo aggiornamento README:

```powershell
${NgsProjectsRoot}\tools\generate-pages.ps1
```

Controllare che in `${NgsProjectsRoot}\docs\data\projects.json` il record corrispondente a `${ProjectFolder}` abbia:
- `slug` coerente con `${ProjectFolder}` (normalizzato in minuscolo),
- `name` coerente con `${CurrentProject}`,
- `status` coerente,
- `progressPercent` aggiornato,
- `lastUpdate` coerente.

