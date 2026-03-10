# ngs-projects

Portfolio repository dei progetti di Nicola Ghiselli Solutions.

## Cosa contiene

Questo repository include:
- una cartella per ogni progetto monitorato (`/<nome-progetto>/README.md`),
- una GitHub Pages in `docs/` generata dai README dei progetti,
- script di generazione dati in `tools/generate-pages.ps1`.

## GitHub Pages (struttura Home)

La Home e organizzata in 3 tab:
1. `Da Pianificare a In Corso` con board: `Da pianificare`, `Pianificato`, `In corso`
2. `In Pausa, In manutenzione, Completato, Archiviato` con board: `In pausa`, `In manutenzione`, `Completato`, `Archiviato`
3. `Aggiornamenti` con tutte le voci aggiornamento (Decision Log / Snapshot), ordinate per data e filtrate dalla ricerca.

Ogni card progetto mostra:
- nome progetto,
- priorita,
- stato,
- progresso (% + barra),
- sintesi obiettivo,
- ultimo aggiornamento.

La pagina dettaglio progetto mostra anche lo snapshot, incluso:
- stato,
- tipo progetto,
- priorita,
- progresso,
- ultimo aggiornamento,
- path repository.

## Convenzioni README progetto

Ogni progetto deve avere `README.md` con sezione `## Snapshot` e almeno questi campi:
- `Stato avanzamento`
- `Priorita`
- `Progresso` (es. `95%`)
- `Tipo progetto`
- `Includi nel portfolio` (`Si`/`No`)
- `Ultimo aggiornamento`

Valori stato supportati dalla Pages:
- `Da pianificare`
- `Pianificato`
- `In corso`
- `In pausa`
- `In manutenzione`
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

Il `README.md` di root (questo file) e il `CHANGELOG.md` di root sono documentazione del repository.
Il progetto corrente `ngs-projects` e tracciato come progetto portfolio nella cartella dedicata `ngs-projects/README.md`.
