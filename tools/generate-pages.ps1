[CmdletBinding()]
param(
    [string]$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-SnapshotValue {
    param(
        [string[]]$Lines,
        [string]$Label
    )

    $pattern = '^\-\s*' + [regex]::Escape($Label) + '\s*:\s*(.+)$'
    foreach ($line in $Lines) {
        if ($line -match $pattern) {
            return $Matches[1].Trim()
        }
    }

    return ""
}

function Clean-TemplateValue {
    param([string]$Value)

    if ([string]::IsNullOrWhiteSpace($Value)) {
        return ""
    }

    $trimmed = $Value.Trim()
    if ($trimmed -match '\$today|\$projectPath') {
        return ""
    }

    return $trimmed
}

function Normalize-Status {
    param([string]$StatusRaw)

    if ([string]::IsNullOrWhiteSpace($StatusRaw)) {
        return "Da iniziare"
    }

    $normalized = $StatusRaw.ToLowerInvariant()

    if ($normalized -match 'da iniziare') {
        return "Da iniziare"
    }

    if ($normalized -match 'in corso|discovery|pianificat|in pausa') {
        return "In corso"
    }

    if ($normalized -match '^completat|\bcompletato\b') {
        return "Completato"
    }

    return "Da iniziare"
}

function Parse-IsoDate {
    param([string]$Value)

    if ([string]::IsNullOrWhiteSpace($Value)) {
        return $null
    }

    $text = $Value.Trim()
    if ($text -match '^(\d{4}-\d{2}-\d{2})') {
        return [datetime]::ParseExact(
            $Matches[1],
            "yyyy-MM-dd",
            [System.Globalization.CultureInfo]::InvariantCulture
        )
    }

    return $null
}

function Get-SectionText {
    param(
        [string[]]$Lines,
        [string]$Header
    )

    $headerPattern = '^##\s+' + [regex]::Escape($Header) + '\s*$'
    $startIndex = -1

    for ($index = 0; $index -lt $Lines.Length; $index++) {
        if ($Lines[$index] -match $headerPattern) {
            $startIndex = $index + 1
            break
        }
    }

    if ($startIndex -lt 0) {
        return ""
    }

    $buffer = New-Object System.Collections.Generic.List[string]
    for ($lineIndex = $startIndex; $lineIndex -lt $Lines.Length; $lineIndex++) {
        $line = $Lines[$lineIndex]
        if ($line -match '^##\s+') {
            break
        }

        $buffer.Add($line)
    }

    return ($buffer -join "`n").Trim()
}

function Summarize-Text {
    param(
        [string]$Text,
        [int]$MaxLength = 220
    )

    if ([string]::IsNullOrWhiteSpace($Text)) {
        return ""
    }

    $summary = $Text -replace '\r', ' '
    $summary = $summary -replace '\n', ' '
    $summary = $summary -replace '\!\[[^\]]*\]\([^\)]*\)', ''
    $summary = $summary -replace '\[([^\]]+)\]\([^\)]*\)', '$1'
    $summary = $summary -replace '`', ''
    $summary = $summary -replace '\s+', ' '
    $summary = $summary.Trim()

    if ($summary.Length -le $MaxLength) {
        return $summary
    }

    return ($summary.Substring(0, $MaxLength - 3) + "...")
}

function Get-DecisionRows {
    param([string[]]$Lines)

    $section = Get-SectionText -Lines $Lines -Header "Decision Log"
    if ([string]::IsNullOrWhiteSpace($section)) {
        return @()
    }

    $rows = @()
    $sectionLines = $section -split "`r?`n"
    foreach ($line in $sectionLines) {
        $trimmed = $line.Trim()
        if (-not ($trimmed -like '|*|')) {
            continue
        }

        $cells = $trimmed.Trim('|').Split('|') | ForEach-Object { $_.Trim() }
        if ($cells.Count -lt 3) {
            continue
        }

        if ($cells[0] -eq "Data") {
            continue
        }

        if ($cells[0] -match '^\-+$') {
            continue
        }

        $dateRaw = Clean-TemplateValue -Value $cells[0]
        $decision = $cells[1]
        $reason = $cells[2]

        if ([string]::IsNullOrWhiteSpace($dateRaw) -and [string]::IsNullOrWhiteSpace($decision)) {
            continue
        }

        $rows += [PSCustomObject]@{
            DateRaw    = $dateRaw
            DateParsed = Parse-IsoDate -Value $dateRaw
            Decision   = $decision
            Reason     = $reason
        }
    }

    return $rows
}

function Select-LatestDecision {
    param([object[]]$DecisionRows)

    $rows = @($DecisionRows)
    if ($rows.Count -eq 0) {
        return $null
    }

    $datedRows = @()
    foreach ($row in $rows) {
        $dateValue = $null
        try {
            $dateValue = $row.DateParsed
        }
        catch {
            $dateValue = $null
        }

        if ($dateValue -ne $null) {
            $datedRows += $row
        }
    }

    if ($datedRows.Count -gt 0) {
        return ($datedRows | Sort-Object DateParsed -Descending | Select-Object -First 1)
    }

    $fallback = $null
    foreach ($row in $rows) {
        $decisionText = ""
        try {
            $decisionText = [string]$row.Decision
        }
        catch {
            $decisionText = ""
        }

        if (-not [string]::IsNullOrWhiteSpace($decisionText)) {
            $fallback = $row
        }
    }

    return $fallback
}
$docsRoot = Join-Path $RepoRoot "docs"
$dataRoot = Join-Path $docsRoot "data"
$readmesRoot = Join-Path $docsRoot "readmes"

New-Item -Path $docsRoot -ItemType Directory -Force | Out-Null
New-Item -Path $dataRoot -ItemType Directory -Force | Out-Null
New-Item -Path $readmesRoot -ItemType Directory -Force | Out-Null

Get-ChildItem -Path $readmesRoot -File -Filter "*.md" -ErrorAction SilentlyContinue | Remove-Item -Force

$excludedDirectories = @(".git", ".github", "docs", "tools")
$projectDirectories = Get-ChildItem -Path $RepoRoot -Directory | Where-Object { $excludedDirectories -notcontains $_.Name }

$projects = @()
$updates = @()
$readmesMap = [ordered]@{}

foreach ($projectDirectory in $projectDirectories) {
    $readmeFile = Join-Path $projectDirectory.FullName "README.md"
    if (-not (Test-Path -Path $readmeFile -PathType Leaf)) {
        continue
    }

    $readmeLines = Get-Content -Path $readmeFile
    $readmeRaw = Get-Content -Path $readmeFile -Raw

    $projectName = $projectDirectory.Name
    $slug = $projectName.ToLowerInvariant()

    $statusRaw = Clean-TemplateValue -Value (Get-SnapshotValue -Lines $readmeLines -Label "Stato avanzamento")
    $priorityRaw = Clean-TemplateValue -Value (Get-SnapshotValue -Lines $readmeLines -Label "Priorita")
    $lastUpdateRaw = Clean-TemplateValue -Value (Get-SnapshotValue -Lines $readmeLines -Label "Ultimo aggiornamento")

    if ($statusRaw -match '\|') {
        $statusRaw = "Da iniziare"
    }

    if ($priorityRaw -match '\|') {
        $priorityRaw = ""
    }

    $normalizedStatus = Normalize-Status -StatusRaw $statusRaw
    $lastUpdateDate = Parse-IsoDate -Value $lastUpdateRaw

    $objectiveSection = Get-SectionText -Lines $readmeLines -Header "Obiettivo"
    $objectiveSummary = Summarize-Text -Text $objectiveSection

    if ([string]::IsNullOrWhiteSpace($objectiveSummary)) {
        $objectiveSummary = "Obiettivo non ancora definito."
    }

    $decisionRows = Get-DecisionRows -Lines $readmeLines
    $latestDecision = Select-LatestDecision -DecisionRows $decisionRows

    $latestDecisionDateText = ""
    $latestDecisionSortDate = $null
    $latestDecisionPayload = $null

    if ($latestDecision -ne $null) {
        if ($latestDecision.DateParsed -ne $null) {
            $latestDecisionDateText = $latestDecision.DateParsed.ToString("yyyy-MM-dd")
            $latestDecisionSortDate = $latestDecision.DateParsed
        }
        elseif (-not [string]::IsNullOrWhiteSpace($latestDecision.DateRaw)) {
            $latestDecisionDateText = $latestDecision.DateRaw
        }

        $latestDecisionPayload = [ordered]@{
            date     = if ($latestDecisionDateText) { $latestDecisionDateText } else { "N/D" }
            decision = if ($latestDecision.Decision) { $latestDecision.Decision } else { "N/D" }
            reason   = if ($latestDecision.Reason) { $latestDecision.Reason } else { "N/D" }
        }
    }

    $readmeTargetPath = Join-Path $readmesRoot "$slug.md"
    Set-Content -Path $readmeTargetPath -Value $readmeRaw -Encoding utf8
    $readmesMap[$slug] = $readmeRaw

    $projectRecord = [ordered]@{
        name           = $projectName
        slug           = $slug
        status         = $normalizedStatus
        statusRaw      = if ($statusRaw) { $statusRaw } else { "Non specificato" }
        priority       = if ($priorityRaw) { $priorityRaw } else { "N/D" }
        lastUpdate     = if ($lastUpdateDate -ne $null) { $lastUpdateDate.ToString("yyyy-MM-dd") } elseif ($lastUpdateRaw) { $lastUpdateRaw } else { "N/D" }
        objective      = $objectiveSummary
        readmePath     = "readmes/$slug.md"
        repositoryPath = $projectName
        latestDecision = $latestDecisionPayload
    }

    $projects += $projectRecord

    $updateSortDate = if ($latestDecisionSortDate -ne $null) { $latestDecisionSortDate } else { $lastUpdateDate }
    $updateDateText = if ($latestDecisionDateText) { $latestDecisionDateText } elseif ($lastUpdateDate -ne $null) { $lastUpdateDate.ToString("yyyy-MM-dd") } elseif ($lastUpdateRaw) { $lastUpdateRaw } else { "N/D" }

    $updateSummary = ""
    if ($latestDecision -ne $null -and -not [string]::IsNullOrWhiteSpace($latestDecision.Decision)) {
        $updateSummary = $latestDecision.Decision
    }
    elseif (-not [string]::IsNullOrWhiteSpace($statusRaw)) {
        $updateSummary = "Snapshot: $statusRaw"
    }
    else {
        $updateSummary = "README aggiornato"
    }

    $updates += [PSCustomObject]@{
        dateText   = $updateDateText
        dateSort   = $updateSortDate
        project    = $projectName
        slug       = $slug
        status     = $normalizedStatus
        summary    = $updateSummary
        sourceType = if ($latestDecision -ne $null) { "decision-log" } else { "snapshot" }
    }
}

$projects = $projects | Sort-Object name

$sortedUpdates = $updates |
Sort-Object @{
        Expression = {
            if ($_.dateSort -ne $null) {
                [datetime]$_.dateSort
            }
            else {
                [datetime]::MinValue
            }
        }
        Descending = $true
    }, project |
Select-Object -First 12

$updatesOutput = @()
foreach ($entry in $sortedUpdates) {
    $updatesOutput += [ordered]@{
        date    = $entry.dateText
        project = $entry.project
        slug    = $entry.slug
        status  = $entry.status
        summary = $entry.summary
        source  = $entry.sourceType
    }
}

$statusCounts = [ordered]@{
    "Da iniziare" = @($projects | Where-Object { $_.status -eq "Da iniziare" }).Count
    "In corso"    = @($projects | Where-Object { $_.status -eq "In corso" }).Count
    "Completato"  = @($projects | Where-Object { $_.status -eq "Completato" }).Count
}

$siteData = [ordered]@{
    generatedAt   = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")
    totalProjects = @($projects).Count
    statusCounts  = $statusCounts
    projects      = $projects
    updates       = $updatesOutput
}

$dataFile = Join-Path $dataRoot "projects.json"
$jsDataFile = Join-Path $dataRoot "projects.js"
$readmesJsFile = Join-Path $dataRoot "readmes.js"
$jsonContent = $siteData | ConvertTo-Json -Depth 10
$readmesJson = $readmesMap | ConvertTo-Json -Depth 8
Set-Content -Path $dataFile -Value $jsonContent -Encoding utf8
Set-Content -Path $jsDataFile -Value ("window.NGS_SITE_DATA = " + $jsonContent + ";") -Encoding utf8
Set-Content -Path $readmesJsFile -Value ("window.NGS_READMES = " + $readmesJson + ";") -Encoding utf8

Write-Host ("Generated site data for {0} projects: {1}, {2}, {3}" -f @($projects).Count, $dataFile, $jsDataFile, $readmesJsFile)







