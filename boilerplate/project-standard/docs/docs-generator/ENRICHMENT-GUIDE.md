# Guida: Generazione del File enrichment.json con AI Agent

Questo documento descrive come generare il file `enrichment.json` — il file che contiene le descrizioni narrative AI per arricchire i CHANGELOG generati da `generate-history-docs.py`.

---

## Cos'è enrichment.json

`enrichment.json` è un file JSON editabile che aggiunge **contenuto testuale** ai CHANGELOG generati automaticamente. Non è richiesto: se assente, i CHANGELOG vengono generati senza descrizioni.

Struttura del file:

```json
{
  "commits": {
    "<sha7>": { "description": "Testo descrittivo del commit..." }
  },
  "versions": {
    "<tag-name>": {
      "added":    ["Funzionalità aggiunta X"],
      "changed":  ["Comportamento Y modificato"],
      "fixed":    ["Bug Z risolto"],
      "removed":  [],
      "security": [],
      "deprecated": []
    }
  },
  "features": {
    "<branch-name>": { "summary": "Descrizione narrativa della feature..." }
  },
  "readme": {
    "description": "Breve descrizione del progetto (1-3 frasi).",
    "badges": ["![build](https://...)"],
    "installation": "Istruzioni di installazione...",
    "usage": "Come usare il progetto...",
    "contributing": "Come contribuire...",
    "license": "MIT"
  }
}
```

- `commits`: chiave = **primi 7 caratteri** del SHA del commit
- `versions`: chiave = **nome esatto del tag git** (es. `v1.0.0`)
- `features`: chiave = **nome canonico del branch** senza `origin/` (es. `feature/my-feature`)
- `readme`: campi testuali per le sezioni del README che non sono derivabili dal git history

---

## Sezione `readme` — Prompt AI per il README

La sezione `readme` di `enrichment.json` alimenta le parti narrative del `README.md` generato con `--readme`.  
Sezioni assenti diventano commenti `<!-- TODO: compilare manualmente -->` nel file generato.

### Prompt per compilare la sezione `readme`

```
Sei un assistente tecnico specializzato in documentazione software.

Analizza la struttura del repository e l'history dei commit forniti nel template enrichment-input.
Devi compilare la sezione "readme" del file enrichment.json con le seguenti informazioni in italiano:

- "description": 2-3 frasi che descrivono il progetto, cosa fa e a chi è destinato
- "badges": lista di badge markdown se rilevanti (es. versione, licenza); lascia [] se non sai
- "installation": istruzioni di installazione/setup (prerequisiti, comandi, configurazione)
- "usage": istruzioni di utilizzo con esempi pratici se possibile
- "contributing": come contribuire al progetto (opzionale, lascia "" se non applicabile)
- "license": solo il nome della licenza (es. "MIT", "Apache 2.0") oppure "" se non specificata

Basa la descrizione sulle informazioni disponibili: messaggi dei commit, nomi dei file modificati,
nomi dei feature branch e relative summary. Non inventare funzionalità non evidenti dall'history.

Restituisci SOLO il blocco JSON della sezione "readme" (non il file completo):
{
  "description": "...",
  "badges": [],
  "installation": "...",
  "usage": "...",
  "contributing": "...",
  "license": "..."
}
```

---

## Passo 1 — Generare il Template

```powershell
python git-history-docs/generate-history-docs.py --repo . --all-branches --gen-template
```

Viene creato `docs/history/enrichment-input_<repo>_<branch>.json` con:
- Tutti i commit (SHA, data, messaggio, lista file modificati)
- Tutti i feature branch rilevati
- Un placeholder per le versioni (template di esempio)
- Campi `description` e `summary` **vuoti** da compilare
- Campi `_*` (prefisso underscore) = **sola lettura**, forniscono contesto all'AI, vengono ignorati dal generatore

---

## Passo 2 — Compilare con AI Agent

Scegli il metodo in base al tuo workflow:

---

### Metodo A — GitHub Copilot CLI (stesso repo)

**Quando usarlo**: sei già in una sessione Copilot CLI nel repository.

**Prompt da usare:**

```
Leggi il file docs/history/enrichment-input_<repo>_<branch>.json.

Per ogni entry nel campo "commits":
- I campi "_date", "_message" e "_files_changed" descrivono cosa è successo nel commit
- Compila il campo "description" con una descrizione in italiano di 2-4 frasi
- La descrizione deve spiegare cosa è stato fatto e perché, non solo elencare i file
- Usa linguaggio tecnico ma comprensibile
- Non usare markdown (no *, no #, no backtick) nella description

Per ogni entry nel campo "features":
- Compila il campo "summary" con un paragrafo narrativo in italiano che descriva lo scopo 
  e il contenuto della feature branch

Per il campo "versions":
- Lascialo invariato (verrà compilato manualmente quando esistono tag git)

Non modificare i campi che iniziano con "_".
Non aggiungere campi nuovi non previsti dal template.
Non cambiare i valori esistenti che non siano "description" o "summary".

Salva il risultato come git-history-docs/enrichment.json (non sovrascrivere l'eventuale 
file esistente senza conferma).
```

---

### Metodo B — Copilot Chat / IDE AI Assistant (es. VS Code)

**Quando usarlo**: hai Copilot Chat aperto nell'IDE con il workspace del repo.

**Prompt da usare:**

```
@workspace 

Ho un file di template per l'arricchimento AI del CHANGELOG del repository: 
docs/history/enrichment-input_<repo>_<branch>.json

Esegui le seguenti operazioni:

1. Per ogni commit in "commits":
   - Leggi "_message" (messaggio del commit) e "_files_changed" (file aggiunti/modificati/rimossi)
   - Scrivi una "description" in italiano (2-4 frasi) che spieghi cosa è stato fatto nel commit
   - Sii specifico: menziona i moduli/tool/funzionalità coinvolte
   - Non usare markdown nella descrizione (testo piano)

2. Per ogni feature in "features":
   - Scrivi una "summary" narrativa in italiano (3-5 frasi) che descriva lo scopo 
     della feature branch e cosa introduce nel progetto

3. Non toccare i campi "_*" (sono metadati di contesto)
4. Non modificare la struttura JSON

Mostrami il JSON compilato, poi salvalo come git-history-docs/enrichment.json
```

---

### Metodo C — ChatGPT / Claude / Gemini (standalone, senza accesso al repo)

**Quando usarlo**: vuoi usare un AI esterno senza dare accesso al repository.

**Procedura:**
1. Apri `docs/history/enrichment-input_<repo>_<branch>.json`
2. Copia il contenuto
3. Incolla nel prompt qui sotto

**System Prompt (da impostare se il modello lo supporta):**

```
Sei un assistente tecnico specializzato nella documentazione di progetti software. 
Il tuo compito è analizzare la storia git di un progetto e produrre descrizioni 
narrative accurate, tecnicamente corrette e in italiano, per un CHANGELOG destinato 
a sviluppatori e project manager.
```

**User Prompt:**

```
Ti fornisco il file di template JSON per l'arricchimento della storia git del progetto 
"[NOME PROGETTO]". 

REGOLE:
1. Per ogni entry in "commits":
   - Usa "_message" e "_files_changed" come contesto
   - Compila "description" con 2-4 frasi in italiano
   - Descrivi COSA è cambiato e PERCHÉ è significativo per il progetto
   - Raggruppa i file per area di competenza nella descrizione (es. "il modulo X è stato 
     aggiornato, mentre Y è stato aggiunto per...")
   - Per i merge commit (nessun file modificato), descrivi cosa integra il merge
   - Non usare markdown nella stringa "description"

2. Per ogni entry in "features":
   - Compila "summary" con un paragrafo narrativo in italiano (3-5 frasi)
   - Descrivi lo scopo della feature, i moduli principali introdotti e il valore aggiunto
   
3. Per "versions":
   - Non compilare (le versioni verranno gestite separatamente quando esistono tag git)

4. NON modificare i campi che iniziano con "_"
5. NON aggiungere campi non previsti
6. Restituisci SOLO il JSON compilato, senza spiegazioni o testo aggiuntivo
7. Assicurati che il JSON sia valido (virgole, virgolette, caratteri speciali escaped)

Ecco il template da compilare:

[INCOLLA QUI IL CONTENUTO DI docs/history/enrichment-input_<repo>_<branch>.json]
```

---

### Metodo D — Codex (GitHub Copilot API / CLI non interattivo)

**Quando usarlo**: vuoi automatizzare la generazione in una pipeline CI/CD o script.

```bash
# Esempio con GitHub CLI + Copilot extension (se disponibile)
gh copilot suggest "Leggi docs/history/enrichment-input_<repo>_<branch>.json, 
  compila i campi 'description' per ogni commit e 'summary' per ogni feature in italiano, 
  salva come git-history-docs/enrichment.json"

# Oppure con curl verso OpenAI API
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "system",
        "content": "Sei un assistente tecnico per la documentazione di progetti software."
      },
      {
        "role": "user", 
        "content": "Compila i campi description e summary del template JSON allegato in italiano. Restituisci solo il JSON.\n\n'"$(cat docs/history/enrichment-input_<repo>_<branch>.json)"'"
      }
    ]
  }' | python -c "import sys,json; print(json.load(sys.stdin)['choices'][0]['message']['content'])" \
  > git-history-docs/enrichment.json
```

---

## Passo 3 — Salvare e Utilizzare il File

Dopo che l'AI ha compilato il template:

```powershell
# Se l'output è nella console, salvalo come:
# git-history-docs/enrichment.json

# Verifica che il JSON sia valido
python -c "import json; json.load(open('git-history-docs/enrichment.json', encoding='utf-8')); print('JSON valido')"

# Rigenera il CHANGELOG con le descrizioni
python git-history-docs/generate-history-docs.py --repo . --all-branches --enrichment-file git-history-docs/enrichment.json
```

---

## Passo 4 — Compilare le Versioni (quando esistono tag)

Se il repository ha tag git, aggiungi le versioni manualmente o chiedi all'AI:

**Prompt per compilare una versione:**

```
Il commit con tag [TAG] è stato rilasciato il [DATA].
I commit inclusi in questa release sono:
[incolla: git log [TAG-PRECEDENTE]..[TAG] --oneline]

Genera un'entry per il file enrichment.json nel formato:
{
  "[TAG]": {
    "added": ["..."],
    "changed": ["..."],
    "fixed": ["..."],
    "removed": [],
    "security": [],
    "deprecated": []
  }
}

Sii specifico, usa linguaggio da release notes professionale, in italiano.
```

---

## Aggiornamento Incrementale

Quando vengono aggiunti nuovi commit al repository:

```powershell
# 1. Rigenera il template (include i nuovi commit)
python git-history-docs/generate-history-docs.py --all-branches --gen-template

# 2. Apri docs/history/enrichment-input_<repo>_all-branches.json e identifica i commit senza description
#    (quelli con "description": "")

# 3. Chiedi all'AI di compilare SOLO i nuovi commit:
```

**Prompt per aggiornamento incrementale:**

```
Ho aggiornato il mio repository con nuovi commit. Devo aggiungere le descrizioni 
per i seguenti commit al file enrichment.json esistente.

Per ogni commit, compila "description" in italiano (2-4 frasi):

[incolla solo i commit nuovi dal template, con i loro _files_changed]

Restituisci solo le nuove entries JSON da aggiungere al campo "commits", 
nel formato:
{
  "sha1234": { "description": "..." },
  "sha5678": { "description": "..." }
}
```

---

## Metodo E — Ollama (LLM locale, nessuna API key, nessun cloud)

**Quando usarlo**: vuoi lavorare offline o non vuoi inviare il codice a servizi cloud.

**Prerequisiti**: [Ollama](https://ollama.com) installato e un modello scaricato.

```powershell
# Scarica un modello consigliato (una tantum)
ollama pull qwen2.5-coder:7b    # ottimo per JSON strutturato
# oppure
ollama pull llama3.2:3b          # più leggero, meno preciso
```

**Script Python** (salva come `run-enrichment-ollama.py` nella root del repo):

```python
#!/usr/bin/env python3
"""
Chiama Ollama per compilare un file enrichment-input generato da generate-history-docs.py.
Uso: python run-enrichment-ollama.py --template docs/history/enrichment-input_<repo>_<branch>.json
Non richiede librerie esterne: usa solo urllib della stdlib.
"""
import json, argparse, urllib.request
from pathlib import Path

SYSTEM_PROMPT = (
    "Sei un assistente tecnico specializzato in documentazione software. "
    "Compila i campi 'description' (commits) e 'summary' (features) del JSON fornito "
    "con testo in italiano chiaro e tecnico. "
    "Non modificare i campi che iniziano con '_'. Restituisci SOLO il JSON."
)

def call_ollama(prompt: str, model: str) -> str:
    payload = json.dumps({
        "model": model, "prompt": prompt,
        "system": SYSTEM_PROMPT, "stream": False
    }).encode("utf-8")
    req = urllib.request.Request(
        "http://localhost:11434/api/generate", data=payload,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        return json.loads(resp.read())["response"]

def extract_json(text: str) -> str:
    start, end = text.find("{"), text.rfind("}") + 1
    if start == -1: raise ValueError("Nessun JSON nella risposta")
    return text[start:end]

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", default="qwen2.5-coder:7b")
    parser.add_argument("--template", required=True,
                        help="Path al file enrichment-input generato (es. docs/history/enrichment-input_myrepo_main.json)")
    parser.add_argument("--output",   default="git-history-docs/enrichment.json")
    args = parser.parse_args()

    template = Path(args.template).read_text(encoding="utf-8")
    print(f"Invio a Ollama (model: {args.model})...")
    raw = call_ollama(f"Compila questo template JSON:\n\n{template}", args.model)

    enrichment_json = extract_json(raw)
    parsed = json.loads(enrichment_json)           # valida JSON
    out = Path(args.output)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(parsed, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Salvato: {out}")

if __name__ == "__main__":
    main()
```

```powershell
python run-enrichment-ollama.py --model qwen2.5-coder:7b
```

> **Attenzione**: i modelli < 7B tendono a troncare il JSON su repository con molti commit. Se il JSON risulta incompleto, usa `--model llama3.1:8b` o superiore, oppure processa i commit in batch.

---

## Scelta del Modello AI

| Modello | Qualità | Privacy | Costo | Gestione JSON |
|---------|---------|---------|-------|---------------|
| Claude Sonnet/Opus (Anthropic) | ⭐⭐⭐⭐⭐ | Cloud | A token | Eccellente |
| GPT-4o (OpenAI) | ⭐⭐⭐⭐⭐ | Cloud | A token | Eccellente |
| GitHub Copilot CLI | ⭐⭐⭐⭐ | Cloud/Microsoft | Abbonamento | Ottima (ha accesso ai file) |
| Gemini 1.5 Pro (Google) | ⭐⭐⭐⭐ | Cloud | Free tier / A token | Ottima (context window grande) |
| Qwen2.5-Coder:7B (Ollama) | ⭐⭐⭐ | **Locale** | **Gratuito** | Buona |
| Llama3.1:8B (Ollama) | ⭐⭐⭐ | **Locale** | **Gratuito** | Discreta |
| Mistral:7B (Ollama) | ⭐⭐ | **Locale** | **Gratuito** | Tende a mescolare lingue |

**Raccomandazione**: per la prima generazione usa un modello cloud (qualità alta). Per aggiornamenti incrementali o ambienti air-gapped usa Ollama con `qwen2.5-coder`.

---

## Struttura File nel Repository

```
git-history-docs/
├── generate-history-docs.py      ← script principale (non modificare)
├── GUIDE.md                      ← guida generale al tool
├── ENRICHMENT-GUIDE.md           ← questo file
├── enrichment.json               ← ✅ committare nel repo (descrizioni AI)
└── run-enrichment-ollama.py      ← opzionale, solo se si usa Ollama

docs/history/                     ← output generato (decidere se committare o .gitignore)
├── CHANGELOG-commits.md
├── CHANGELOG-features.md
├── CHANGELOG.md                  ← solo se esistono git tag
└── enrichment-input_<repo>_<branch>.json  ← ⚠️ file temporaneo, aggiungere a .gitignore
```

**Consiglio `.gitignore`**:
```gitignore
# Template enrichment (temporaneo, non committare)
docs/history/enrichment-input_<repo>_<branch>.json

# Output generato — scegli: committare per storicizzare, o ignorare per generare sempre fresh
# docs/history/
```


Prima di rigenerare il CHANGELOG con il file compilato, verifica:

- [ ] JSON sintatticamente valido (`python -c "import json; json.load(open('enrichment.json'))"`)
- [ ] Tutti i commit hanno una `description` non vuota
- [ ] Le descrizioni sono in italiano e senza markdown
- [ ] I campi `_*` non sono stati modificati
- [ ] Le chiavi SHA sono i primi 7 caratteri (es. `a1b2c3d`, non il SHA completo)
- [ ] Le chiavi delle versioni corrispondono esattamente ai tag git (`git tag --list`)
- [ ] Le chiavi dei feature branch non hanno il prefisso `origin/`
