# Workflow: Docs Bootstrap (README + CHANGELOG da history git)

> Procedura standard per usare `docs/docs-generator` su repository con documentazione assente o incompleta.

---

## Quando usarlo

Usare questo workflow quando almeno una di queste condizioni e vera:
- `README.md` mancante o non allineato alla realta del codice.
- `CHANGELOG.md` mancante.
- Repository legacy con storia git significativa ma documentazione minima.

---

## Prerequisiti

- Python disponibile (`python --version`).
- Repository git valido e leggibile.
- Tool presente nel progetto target: `docs/docs-generator/run-with-ai.py`.

Provider AI supportati dal tool:
- `copilot`, `copilot-cli`, `github`, `openai`, `anthropic`, `codex`, `ollama`, `manual`.

---

## Procedura manuale consigliata

### 1) Dry run obbligatorio

```powershell
python docs/docs-generator/run-with-ai.py --repo . --provider copilot --all-branches --dry-run
```

### 2) Generazione in area sicura (`docs/history`)

```powershell
python docs/docs-generator/run-with-ai.py --repo . --provider copilot --all-branches
```

Nota: senza `--promote`, il tool NON sovrascrive `README.md`/`CHANGELOG.md` in root.

### 3) Review umana (gate bloccante)

Checklist minima:
- [ ] Nessuna informazione inventata (dipendenze, comandi, architettura, licenza).
- [ ] Versioni/tag coerenti con `git tag --list`.
- [ ] Comandi di installazione/uso realmente eseguibili.
- [ ] Nessuna frase troncata o ambigua.
- [ ] Linguaggio coerente con lo standard del repository.

### 4) Promozione in root (solo dopo review)

```powershell
python docs/docs-generator/run-with-ai.py --repo . --provider copilot --all-branches --promote
```

### 5) Consolidamento

- Commit separato per documentazione bootstrap.
- Se il progetto e tracciato in `ngs-projects`, aggiornare anche il tracking con `NGS-PROJECTS-UPDATE.md`.

---

## Regole operative

- Non usare `--promote` al primo giro: prima review in `docs/history`.
- Per repository molto grandi, partire con branch principale o subset e poi estendere.
- Se output AI non affidabile, usare `--provider manual` e compilare enrichment in modo assistito.

---

## Output attesi

In `docs/history/`:
- `CHANGELOG-commits.md`
- `CHANGELOG.md` (se ci sono tag)
- `CHANGELOG-features.md` (se ci sono feature branch)
- `README.md` (se richiesto dal flusso)

In root (solo con `--promote`):
- `README.md`
- `CHANGELOG.md`