<#
.SYNOPSIS
    Installa i git hooks del progetto nella directory .git/hooks/.

.DESCRIPTION
    Copia gli hook versionati da scripts/hooks/ (o dalla posizione dello script)
    nella directory .git/hooks/ del repository corrente.
    Compatibile con Windows (Git for Windows / Git Bash).

.PARAMETER HooksSourceDir
    Percorso della directory sorgente contenente i file hook.
    Default: la sottocartella "hooks" nella stessa directory di questo script.

.EXAMPLE
    # Dalla root del progetto:
    .\scripts\install-hooks.ps1

    # Oppure specificando una sorgente custom:
    .\scripts\install-hooks.ps1 -HooksSourceDir ".\tools\hooks"
#>

param(
    [string]$HooksSourceDir = (Join-Path $PSScriptRoot "hooks")
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# --- Individua la root del repository git ---
$gitRoot = git rev-parse --show-toplevel 2>$null
if ($LASTEXITCODE -ne 0 -or -not $gitRoot) {
    Write-Error "Errore: questa directory non e' all'interno di un repository git."
    exit 1
}

$hooksDestDir = Join-Path $gitRoot ".git/hooks"

# --- Verifica che la sorgente esista ---
if (-not (Test-Path $HooksSourceDir)) {
    Write-Error "Directory sorgente degli hook non trovata: $HooksSourceDir"
    exit 1
}

$hookFiles = Get-ChildItem -Path $HooksSourceDir -File
if ($hookFiles.Count -eq 0) {
    Write-Host "Nessun hook trovato in: $HooksSourceDir"
    exit 0
}

# --- Copia gli hook ---
foreach ($hook in $hookFiles) {
    $dest = Join-Path $hooksDestDir $hook.Name
    Copy-Item -Path $hook.FullName -Destination $dest -Force
    Write-Host "+ Hook installato: $($hook.Name)"
}

Write-Host ""
Write-Host "Hook installati correttamente in: $hooksDestDir"
Write-Host "Nota: su Linux/macOS eseguire 'chmod +x .git/hooks/*' se necessario."
