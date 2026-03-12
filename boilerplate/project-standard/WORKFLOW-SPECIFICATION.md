# Workflow: Raccolta Specifiche (Standard)

> Procedura standard per creare una specifica condivisibile con team e AI agent.
> Usare questo file prima di qualsiasi implementazione significativa.

---

## Variabili (modificare solo queste)

```powershell
$CurrentProject = '<CURRENT_PROJECT_NAME>'
$FeatureName = '<FEATURE_NAME>'
$SpecFilePath = 'docs/specs/<YYYY-MM-DD>-<feature>-spec.md'
$TargetRelease = '<TARGET_RELEASE_OR_EMPTY>'
$Stakeholders = '<PO, TechLead, QA, ...>'
```

---

## Output atteso
- File specifica completo in `$SpecFilePath`.
- Sezione decisionale iniziale con data+ora ISO (`yyyy-MM-ddTHH:mm:ss+01:00`).
- Open questions esplicite e assegnate.

---

## Checklist raccolta specifiche

### 1) Contesto e obiettivo
- [ ] Problema reale da risolvere descritto in 3-5 righe.
- [ ] Obiettivo misurabile (KPI o criterio di successo).
- [ ] Motivazione business/operativa.

### 2) Ambito
- [ ] In-scope chiaro (cosa e incluso).
- [ ] Out-of-scope chiaro (cosa non e incluso).
- [ ] Assunzioni dichiarate.
- [ ] Vincoli tecnici/organizzativi dichiarati.

### 3) Requisiti
- [ ] Requisiti funzionali numerati (RF-01, RF-02, ...).
- [ ] Requisiti non funzionali numerati (RNF-01, RNF-02, ...).
- [ ] Casi d'uso principali (happy path + edge case).
- [ ] Regole dati e validazioni principali.

### 4) Accettazione
- [ ] Acceptance criteria testabili e verificabili.
- [ ] Criteri di non regressione.
- [ ] Dipendenze esterne e prerequisiti runtime.

### 5) Rischi e decisioni
- [ ] Rischi tecnici e mitigazioni.
- [ ] Decisioni architetturali iniziali.
- [ ] Open questions con owner e data target risposta.

### 6) Allineamento team
- [ ] Specifica condivisa con stakeholder (`$Stakeholders`).
- [ ] Feedback integrati.
- [ ] Stato specifica impostato a `Approved` o `Draft`.

---

## Definition of Done (Spec)
La specifica e considerata pronta solo se:
- [ ] Tutti i requisiti sono testabili.
- [ ] Non ci sono ambiguita bloccanti.
- [ ] Esiste almeno una strategia di test.
- [ ] Le open questions residue non bloccano l'analisi.

---

## Prompt operativo suggerito (AI)

```text
Crea/aggiorna il file ${SpecFilePath} per la feature ${FeatureName} del progetto ${CurrentProject}.

Regole:
- Mantieni struttura markdown pulita e sezioni chiare.
- Inserisci: contesto, obiettivi, in-scope/out-of-scope, requisiti funzionali/non funzionali, acceptance criteria, rischi, decisioni, open questions.
- Usa ID requisito (RF-xx / RNF-xx).
- Le decisioni devono usare timestamp ISO: yyyy-MM-ddTHH:mm:ss+01:00.
- Evidenzia ogni punto incerto come open question con owner proposto.

Infine mostra il diff della specifica e un breve riepilogo delle ambiguita residue.
```
