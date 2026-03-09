# ngs-projects

Repository portfolio dei progetti Nicola Ghiselli Solutions.

Questo repository contiene una cartella per ogni progetto e una GitHub Pages che mostra:
- home con card per stato (`Da iniziare`, `In corso`, `Completato`),
- pagina dettaglio progetto generata dai README,
- blocco "Ultimi aggiornamenti".

## Struttura

- `/<nome-progetto>/README.md`: fonte principale di stato, obiettivi e decision log.
- `/docs`: sito statico GitHub Pages.
- `/tools/generate-pages.ps1`: genera i dati della Pages da tutti i README progetto.

## Come aggiornare la Pages

1. Aggiorna i `README.md` dei progetti.
2. Esegui:

```powershell
./tools/generate-pages.ps1
```

3. Commit e push su `main`.
4. La workflow `.github/workflows/pages.yml` rigenera e pubblica automaticamente.

## Nuovo progetto

Per aggiungere un progetto al sito:
1. Crea una nuova cartella in root (es. `my-new-project`).
2. Aggiungi `README.md` nella cartella.
3. Esegui `./tools/generate-pages.ps1` oppure fai push su `main` (CI lo rigenera).

Nota: il `README.md` di root (questo file) e il `CHANGELOG.md` di root non vengono usati dalla GitHub Pages dei progetti.
