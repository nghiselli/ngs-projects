# ngs-projects

Portfolio repository dei progetti di Nicola Ghiselli Solutions.

## Cosa contiene

Questo repository include:
- una cartella per ogni progetto (`/<nome-progetto>/README.md`),
- una GitHub Pages in `docs/` generata dai README dei progetti,
- script di generazione dati in `tools/generate-pages.ps1`.

## GitHub Pages (struttura Home)

La Home e organizzata in 3 tab:
1. `Da Pianificare a In Corso` con board: `Da pianificare`, `Pianificato`, `In corso`
2. `In Pausa, Completato, Archiviato` con board: `In pausa`, `Completato`, `Archiviato`
3. `Aggiornamenti` con lista degli ultimi aggiornamenti (Decision Log / Snapshot)

Ogni card progetto mostra:
- nome progetto,
- priorita,
- stato,
- sintesi obiettivo,
- ultimo aggiornamento.

La pagina dettaglio progetto mostra anche lo snapshot, incluso:
- stato,
- tipo progetto,
- priorita,
- ultimo aggiornamento,
- path repository.

## Convenzioni README progetto

Ogni progetto deve avere `README.md` con sezione `## Snapshot` e almeno questi campi:
- `Stato avanzamento`
- `Priorita`
- `Tipo progetto`
- `Ultimo aggiornamento`

Valori stato supportati dalla Pages:
- `Da pianificare`
- `Pianificato`
- `In corso`
- `In pausa`
- `Completato`
- `Archiviato`

## Come aggiornare la Pages

1. Aggiorna i `README.md` dei progetti.
2. Esegui:

```powershell
./tools/generate-pages.ps1
```

3. Commit e push su `main`.
4. La workflow `.github/workflows/pages.yml` rigenera e pubblica automaticamente.

## Nuovo progetto

Per aggiungere un nuovo progetto al sito:
1. Crea una nuova cartella in root (es. `my-new-project`).
2. Aggiungi `README.md` nella cartella con `## Snapshot`.
3. Esegui `./tools/generate-pages.ps1` oppure fai push su `main`.

## Nota

Il `README.md` di root (questo file) e il `CHANGELOG.md` di root sono documentazione del repository e non vengono mostrati come card progetto nella Pages.
