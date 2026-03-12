[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectPath,

    [string]$BoilerplatePath = (Join-Path $PSScriptRoot '..\boilerplate\project-standard'),

    [switch]$Overwrite
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Resolve-DirectoryPath {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path,

        [Parameter(Mandatory = $true)]
        [string]$Label
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        throw "$Label non trovato: $Path"
    }

    $resolved = (Resolve-Path -LiteralPath $Path).Path
    if (-not (Test-Path -LiteralPath $resolved -PathType Container)) {
        throw "$Label non e una directory: $resolved"
    }

    return $resolved
}

function Get-RelativePath {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Root,

        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    if ($Path.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase)) {
        return ($Path.Substring($Root.Length) -replace '^[\\/]+', '')
    }

    return $Path
}

$resolvedProjectPath = Resolve-DirectoryPath -Path $ProjectPath -Label 'ProjectPath'
$resolvedBoilerplatePath = Resolve-DirectoryPath -Path $BoilerplatePath -Label 'BoilerplatePath'

Write-Host "ProjectPath    : $resolvedProjectPath"
Write-Host "BoilerplatePath: $resolvedBoilerplatePath"
Write-Host "Overwrite      : $Overwrite"

$createdDirs = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$createdFiles = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$overwrittenFiles = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$skippedFiles = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)

$boilerplateDirs = Get-ChildItem -LiteralPath $resolvedBoilerplatePath -Directory -Recurse | Sort-Object FullName
foreach ($sourceDir in $boilerplateDirs) {
    $relativeDir = Get-RelativePath -Root $resolvedBoilerplatePath -Path $sourceDir.FullName
    if ([string]::IsNullOrWhiteSpace($relativeDir)) {
        continue
    }

    $targetDir = Join-Path $resolvedProjectPath $relativeDir
    if (-not (Test-Path -LiteralPath $targetDir -PathType Container)) {
        if ($PSCmdlet.ShouldProcess($targetDir, 'Create directory')) {
            New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        }
        $null = $createdDirs.Add($relativeDir)
    }
}

$boilerplateFiles = Get-ChildItem -LiteralPath $resolvedBoilerplatePath -File -Recurse | Sort-Object FullName
foreach ($sourceFile in $boilerplateFiles) {
    $relativeFile = Get-RelativePath -Root $resolvedBoilerplatePath -Path $sourceFile.FullName
    if ([string]::IsNullOrWhiteSpace($relativeFile)) {
        continue
    }

    $targetFile = Join-Path $resolvedProjectPath $relativeFile
    $targetParent = Split-Path -Path $targetFile -Parent

    if (-not (Test-Path -LiteralPath $targetParent -PathType Container)) {
        if ($PSCmdlet.ShouldProcess($targetParent, 'Create parent directory')) {
            New-Item -ItemType Directory -Path $targetParent -Force | Out-Null
        }

        $relativeParent = Get-RelativePath -Root $resolvedProjectPath -Path $targetParent
        if (-not [string]::IsNullOrWhiteSpace($relativeParent)) {
            $null = $createdDirs.Add($relativeParent)
        }
    }

    if (-not (Test-Path -LiteralPath $targetFile -PathType Leaf)) {
        if ($PSCmdlet.ShouldProcess($targetFile, 'Copy missing file from boilerplate')) {
            Copy-Item -LiteralPath $sourceFile.FullName -Destination $targetFile -Force
        }
        $null = $createdFiles.Add($relativeFile)
        continue
    }

    if ($Overwrite) {
        if ($PSCmdlet.ShouldProcess($targetFile, 'Overwrite existing file from boilerplate')) {
            Copy-Item -LiteralPath $sourceFile.FullName -Destination $targetFile -Force
        }
        $null = $overwrittenFiles.Add($relativeFile)
    }
    else {
        $null = $skippedFiles.Add($relativeFile)
    }
}

$createdDirsOut = @($createdDirs | Sort-Object)
$createdFilesOut = @($createdFiles | Sort-Object)
$overwrittenFilesOut = @($overwrittenFiles | Sort-Object)
$skippedFilesOut = @($skippedFiles | Sort-Object)

Write-Host ''
Write-Host 'Summary:'
Write-Host ("- CreatedDirs      : {0}" -f $createdDirsOut.Count)
Write-Host ("- CreatedFiles     : {0}" -f $createdFilesOut.Count)
Write-Host ("- OverwrittenFiles : {0}" -f $overwrittenFilesOut.Count)
Write-Host ("- SkippedFiles     : {0}" -f $skippedFilesOut.Count)

[pscustomobject]@{
    ProjectPath = $resolvedProjectPath
    BoilerplatePath = $resolvedBoilerplatePath
    CreatedDirs = $createdDirsOut
    CreatedFiles = $createdFilesOut
    OverwrittenFiles = $overwrittenFilesOut
    SkippedFiles = $skippedFilesOut
}