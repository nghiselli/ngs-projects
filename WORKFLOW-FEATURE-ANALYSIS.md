# Workflow: Analisi Feature/Patch (Standard)

> Procedura standard per analizzare una feature o patch partendo da specifiche gia definite.
> Da usare prima di iniziare l'implementazione.

---

## Variabili (modificare solo queste)

```powershell
$CurrentProject = '<CURRENT_PROJECT_NAME>'
$FeatureName = '<FEATURE_NAME>'
$SpecFilePath = 'docs/specs/<YYYY-MM-DD>-<feature>-spec.md'
$AnalysisFilePath = 'docs/analysis/<YYYY-MM-DD>-<feature>-analysis.md'
$TargetRelease = '<TARGET_RELEASE_OR_EMPTY>'
```

---

## Pre-check (bloccante)
- [ ] `$SpecFilePath` esiste ed e leggibile.
- [ ] La specifica e almeno `Draft` completa (meglio `Approved`).
- [ ] Non ci sono open questions bloccanti non risolte.

---

## Output atteso
- File analisi in `$AnalysisFilePath`.
- Stima impatti su codice, test, documentazione e rilascio.
- Piano implementativo sintetico (sequenza step).

---

## Checklist analisi

### 1) Comprensione requisiti
- [ ] Mappatura requisiti -> componenti impattati.
- [ ] Requisiti potenzialmente ambigui evidenziati.
- [ ] Dipendenze e integrazioni esterne identificate.

### 2) Impatto tecnico
- [ ] Moduli/file da toccare (backend, frontend, db, infra).
- [ ] Impatto su compatibilita backward.
- [ ] Impatto su configurazioni/feature flags.
- [ ] Impatto su sicurezza, performance, osservabilita.

### 3) Opzioni di soluzione
- [ ] Almeno 2 alternative tecniche (se sensato).
- [ ] Tradeoff di ogni alternativa (costo/rischio/tempo).
- [ ] Soluzione scelta con motivazione chiara.

### 4) Piano test
- [ ] Test unitari da aggiungere/aggiornare.
- [ ] Test integrazione/end-to-end da coprire.
- [ ] Smoke/manual test minimi per validazione finale.
- [ ] Rischi regressione e contromisure.

### 5) Piano rilascio
- [ ] Strategia di rollout (big-bang, graduale, feature flag).
- [ ] Rollback plan.
- [ ] Aggiornamenti documentazione richiesti (`README`, `CHANGELOG`, tracking portfolio).

### 6) Stima e governance
- [ ] Stima complessita (S/M/L o punti).
- [ ] Stima effort (range ore/giorni).
- [ ] Decisioni e assunzioni formalizzate con timestamp ISO.

---

## Gate finale analisi (bloccante)
Avviare implementazione solo se:
- [ ] Analisi condivisa e compresa dal team.
- [ ] Ambiguita bloccanti risolte.
- [ ] Piano test approvato.
- [ ] Piano rilascio/rollback definito.

---

## Prompt operativo suggerito (AI)

```text
Partendo da ${SpecFilePath}, crea/aggiorna ${AnalysisFilePath} per ${FeatureName} (${CurrentProject}).

Regole:
- Mantieni il documento orientato all'esecuzione.
- Includi: mappatura requisiti, impatto tecnico, opzioni, soluzione scelta, test plan, rollout/rollback, stima.
- Evidenzia rischi e punti da chiarire prima dello sviluppo.
- Usa timestamp ISO per decisioni: yyyy-MM-ddTHH:mm:ss+01:00.
- Se la specifica e incompleta, fermati e segnala i blocchi prima di proporre implementazione.

Infine mostra il diff del file analisi e i blocchi residui (se presenti).
```
