# Workflow: Standard AI Agent (Indice)

> Procedura unica per standardizzare il lavoro con AI agent (Codex, GitHub Copilot, Claude Code).
> Questo file orchestra i workflow verticali gia presenti nel repository.

---

## Pacchetto standard da copiare nei progetti

File consigliati:
- `WORKFLOW-STANDARD.md` (questo indice)
- `WORKFLOW-DOCS-BOOTSTRAP.md` (bootstrap documentazione da history git, quando serve)
- `WORKFLOW-SPECIFICATION.md` (raccolta specifiche)
- `WORKFLOW-FEATURE-ANALYSIS.md` (analisi feature/patch)
- `SESSION-PROMPT-TEMPLATE.md` (prompt operativo di sessione)
- `WORKFLOW-GITFLOW.md` (chiusura feature/release/hotfix)
- `NGS-PROJECTS-UPDATE.md` (allineamento portfolio su ngs-projects)

---

## Checklist adozione repository (una tantum)

- [ ] Copiare i file standard nella root del repository.
- [ ] Valorizzare i blocchi variabili in ogni workflow (path, branch, comandi build/run).
- [ ] Verificare che `README.md` e `CHANGELOG.md` esistano.
- [ ] Se `README.md`/`CHANGELOG.md` mancano o sono inaffidabili, eseguire `WORKFLOW-DOCS-BOOTSTRAP.md`.
- [ ] Se usi checkpoint, creare `checkpoints/README.md`.
- [ ] Definire il branch model (`main`/`develop`) nel `WORKFLOW-GITFLOW.md`.
- [ ] Eseguire una prova completa su una micro-feature per validare il processo.

---

## Flusso standard per nuova feature/patch

### Fase 0 - Bootstrap documentazione (opzionale)
Usare `WORKFLOW-DOCS-BOOTSTRAP.md` solo se manca documentazione pregressa affidabile.

Output minimo:
- bozza `README.md` e `CHANGELOG.md` in `docs/history/`;
- review umana completata;
- promozione in root solo dopo validazione.

### Fase 1 - Specifica
Usare `WORKFLOW-SPECIFICATION.md`.

Output minimo:
- file specifica in `docs/specs/...`;
- requisiti RF/RNF numerati;
- acceptance criteria testabili;
- open questions con owner.

### Fase 2 - Analisi
Usare `WORKFLOW-FEATURE-ANALYSIS.md`.

Output minimo:
- file analisi in `docs/analysis/...`;
- mappatura requisiti -> componenti impattati;
- opzioni con tradeoff e soluzione scelta;
- piano test e piano rilascio/rollback.

### Fase 3 - Implementazione
Usare `SESSION-PROMPT-TEMPLATE.md`.

Output minimo:
- modifiche codice + test coerenti con spec/analisi;
- build locale verde;
- documentazione tecnica aggiornata.

### Fase 4 - Chiusura tecnica
Usare `WORKFLOW-GITFLOW.md`.

Output minimo:
- chiusura feature non interattiva;
- aggiornamento versioning/changelog;
- push branch/tag previsti dal flusso.

### Fase 5 - Tracking portfolio (se richiesto)
Usare `NGS-PROJECTS-UPDATE.md`.

Output minimo:
- README tracking progetto aggiornato in `ngs-projects`;
- pages rigenerate;
- commit naming `${ProjectFolder}-${ReleasedVersion}` per release/hotfix.

---

## Gate bloccanti (non saltare)

- [ ] Nessuna implementazione se la specifica ha blocchi aperti.
- [ ] Nessun commit/push/merge senza test manuali confermati.
- [ ] Nessun commit tracking release senza conferma esplicita di `ReleasedVersion`.
- [ ] Nessuna modifica distruttiva al Decision Log (solo append).
- [ ] Nel bootstrap docs: nessuna promozione in root senza review umana dell'output AI.

---

## Convenzioni trasversali

- Timestamp Decision Log: `yyyy-MM-ddTHH:mm:ss+01:00`
- Progresso: percentuale `0-100%`
- Stato avanzamento: usare solo valori supportati dalla Pages
- Ogni output deve mostrare diff finale e punti residui

---

## Prompt bootstrap consigliato (AI)

```text
Segui WORKFLOW-STANDARD.md e applica in ordine i workflow collegati.
Se mancano README/CHANGELOG affidabili, esegui prima WORKFLOW-DOCS-BOOTSTRAP.md in modalita manuale con review umana.
Poi parti da specifica (WORKFLOW-SPECIFICATION.md), analisi (WORKFLOW-FEATURE-ANALYSIS.md), implementazione (SESSION-PROMPT-TEMPLATE.md) e chiusura git (WORKFLOW-GITFLOW.md).
Se richiesto, aggiorna anche ngs-projects con NGS-PROJECTS-UPDATE.md.
Mostra sempre i gate bloccanti e fermati quando manca una conferma utente obbligatoria.
```