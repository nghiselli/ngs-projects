# Installazione e Aggiornamento di Python

Questa guida spiega come installare Python sui principali sistemi operativi e come mantenerlo aggiornato.  
Lo script `generate-history-docs.py` richiede **Python 3.8 o superiore**.

---

## Verifica rapida

Prima di installare, controlla se Python è già presente:

```shell
python --version
# oppure, su alcuni sistemi:
python3 --version
```

Se l'output mostra `Python 3.8.x` o superiore sei già a posto.

---

## Windows

### Opzione A — winget (raccomandato, Windows 10/11)

```powershell
# Installa l'ultima versione stabile
winget install Python.Python.3

# In futuro, per aggiornare:
winget upgrade Python.Python.3
```

Dopo l'installazione **riavvia il terminale** affinché la variabile `PATH` venga aggiornata.

---

### Opzione B — Microsoft Store

1. Apri il **Microsoft Store**
2. Cerca `Python` e seleziona la versione pubblicata da **Python Software Foundation**
3. Clicca **Installa**

L'aggiornamento avviene automaticamente tramite il Store oppure manualmente dalla pagina dell'app.

> **Nota**: la versione Store si installa in `%LocalAppData%\Microsoft\WindowsApps` e potrebbe
> essere isolata rispetto ad altri strumenti di sviluppo. Preferire winget o il sito ufficiale
> in ambienti di sviluppo.

---

### Opzione C — Sito ufficiale (python.org)

1. Vai su [https://www.python.org/downloads/](https://www.python.org/downloads/)
2. Scarica il **Windows installer (64-bit)**
3. Esegui il file `.exe`
4. ✅ Spunta **"Add Python to PATH"** prima di cliccare _Install Now_

Per **aggiornare**: scarica il nuovo installer e rieseguilo — sovrascrive la versione precedente.

---

### Opzione D — pyenv-win (gestione versioni multiple)

Utile se hai bisogno di più versioni di Python sullo stesso PC.

```powershell
# Installazione con winget
winget install pyenv-win

# Riavvia il terminale, poi:
pyenv install 3.12.3     # installa la versione desiderata
pyenv global 3.12.3      # imposta come versione di default

# Aggiornare pyenv-win
winget upgrade pyenv-win
# Poi installa la nuova versione Python:
pyenv install 3.13.0
pyenv global 3.13.0
```

---

### Verifica finale (Windows)

```powershell
python --version          # deve mostrare Python 3.8+
python -m pip --version   # verifica che pip sia disponibile
```

Se `python` non viene trovato ma `python3` sì, crea un alias:
```powershell
# In PowerShell (sessione corrente):
Set-Alias python python3
# Per renderlo permanente aggiungerlo al profilo PowerShell ($PROFILE)
```

---

## Linux

### Debian / Ubuntu / Mint

```bash
sudo apt update
sudo apt install python3 python3-pip

# Aggiornare Python (tramite apt):
sudo apt update && sudo apt upgrade python3
```

Per installare una versione specifica non disponibile nei repository ufficiali:
```bash
sudo add-apt-repository ppa:deadsnakes/ppa   # Ubuntu
sudo apt update
sudo apt install python3.12
```

---

### Fedora / RHEL / CentOS / Rocky Linux

```bash
# Fedora
sudo dnf install python3 python3-pip

# RHEL/CentOS 8+ con dnf
sudo dnf install python39

# Per aggiornare:
sudo dnf upgrade python3
```

---

### Arch Linux / Manjaro

```bash
sudo pacman -S python python-pip

# Aggiornare:
sudo pacman -Syu python
```

---

### pyenv (Linux — gestione versioni multiple)

```bash
# Installazione (prerequisiti: curl, git)
curl https://pyenv.run | bash

# Aggiungi al tuo shell profile (~/.bashrc / ~/.zshrc):
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

# Ricarica il profilo, poi:
pyenv install 3.12.3
pyenv global 3.12.3

# Aggiornare pyenv:
cd ~/.pyenv && git pull
```

---

### Verifica finale (Linux)

```bash
python3 --version          # deve mostrare Python 3.8+
python3 -m pip --version
```

---

## macOS

### Opzione A — Homebrew (raccomandato)

```bash
# Installa Homebrew se non presente
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installa Python
brew install python

# Aggiornare:
brew update && brew upgrade python
```

> **Nota**: macOS include una versione di Python 2.7 o Python 3 limitata nel sistema.
> L'installazione via Homebrew crea una versione separata in `/usr/local/bin/python3`
> (Intel) o `/opt/homebrew/bin/python3` (Apple Silicon) che non interferisce con quella di sistema.

---

### Opzione B — Sito ufficiale (macOS Universal Installer)

1. Vai su [https://www.python.org/downloads/macos/](https://www.python.org/downloads/macos/)
2. Scarica il **macOS universal2 installer**
3. Esegui il `.pkg` e segui le istruzioni
4. Al termine, dal Finder apri `Applications/Python 3.x/` e lancia **Install Certificates.command**

Per aggiornare: scarica e installa il nuovo `.pkg`.

---

### Opzione C — pyenv (macOS — gestione versioni multiple)

```bash
# Con Homebrew:
brew install pyenv

# Aggiungi al tuo shell profile (~/.zshrc su macOS moderno):
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

# Ricarica il profilo, poi:
pyenv install 3.12.3
pyenv global 3.12.3

# Aggiornare pyenv:
brew upgrade pyenv
```

---

### Verifica finale (macOS)

```bash
python3 --version          # deve mostrare Python 3.8+
python3 -m pip --version
```

---

## Aggiornamento di pip

Indipendentemente dal sistema operativo, è buona pratica tenere `pip` aggiornato:

```shell
# Windows
python -m pip install --upgrade pip

# Linux / macOS
python3 -m pip install --upgrade pip
```

---

## Risoluzione Problemi Comuni

| Problema | Causa probabile | Soluzione |
|----------|----------------|-----------|
| `python: command not found` | Python non nel PATH | Reinstalla spuntando "Add to PATH" (Windows) o verifica `~/.bashrc` / `~/.zshrc` |
| `python` apre il Microsoft Store | Stub di sistema attivo | Disabilita in *Impostazioni → App → Alias di esecuzione app* oppure usa `py` |
| Script gira con Python 2 | `/usr/bin/python` è Python 2 su vecchi sistemi | Usa esplicitamente `python3` o `py -3` |
| `pip` non trovato | pip non installato | `python -m ensurepip --upgrade` |
| Permessi negati (Linux/macOS) | Installazione di sistema protetta | Usa `pip install --user` oppure un virtual environment (`python3 -m venv .venv`) |
| Versione insufficiente (<3.8) | Versione vecchia | Aggiorna con le istruzioni sopra |

---

## Versioni Supportate dallo Script

| Versione Python | Compatibile | Note |
|----------------|-------------|------|
| 3.8 | ✅ | Minimo supportato |
| 3.9 – 3.11 | ✅ | |
| 3.12 – 3.13 | ✅ | Raccomandato |
| < 3.8 | ❌ | Non supportato (`subprocess` e `pathlib` richiedono 3.8+) |
| 2.x | ❌ | Non supportato |

Lo script non richiede pacchetti esterni: usa solo la **libreria standard** (`subprocess`, `argparse`, `json`, `pathlib`).
