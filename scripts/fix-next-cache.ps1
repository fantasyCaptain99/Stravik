# Redirects the Next.js build cache off the D: drive.
#
# WHY
# ---
# On this machine, file renames inside D:\ intermittently fail with
# EBUSY. Measured directly with plain PowerShell (no Next.js involved):
#
#     D: inside project   ok=2   fail=38
#     D: drive root       ok=0   fail=40
#     C: user temp        ok=40  fail=0
#
# Next.js writes every manifest as `<name>.tmp.<rand>` then renames it into
# place. When that rename fails, `next dev` crashes — and an open browser tab
# then shows "This page couldn't load" the moment you click a nav link,
# because the RSC payload request hits a dead server.
#
# Next.js retries the rename 101 times but without backoff, so it burns
# through every attempt inside the lock window.
#
# WHAT THIS DOES
# --------------
# 1. Points .next at %LOCALAPPDATA%\next-cache\stravik via a junction, so all
#    build writes land on C: where renames succeed.
# 2. Creates %LOCALAPPDATA%\next-cache\node_modules as a junction back to the
#    project's node_modules. Without this, Turbopack runs PostCSS from the C:
#    cache path and Node cannot resolve @tailwindcss/postcss (it only walks
#    UP from the requiring file), so every route 500s.
#
# Junctions do not require administrator rights.
#
# RUN THIS AFTER: deleting .next, moving the project, or reinstalling deps.
#     powershell -ExecutionPolicy Bypass -File scripts\fix-next-cache.ps1
#
# PREFERRED PERMANENT FIX (needs an elevated prompt):
#     Add-MpPreference -ExclusionPath "D:\Project-d-p\agency"
# That removes the cause rather than routing around it. This script is the
# no-admin fallback.

$ErrorActionPreference = "Stop"

$proj   = Split-Path -Parent $PSScriptRoot
$cache  = Join-Path $env:LOCALAPPDATA "next-cache"
$target = Join-Path $cache "stravik"
$next   = Join-Path $proj ".next"
$nmLink = Join-Path $cache "node_modules"

function Remove-Entry($path) {
    if (-not (Test-Path $path)) { return }
    $item = Get-Item $path -Force
    if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
        # Deletes the link only, never the directory it points at.
        [System.IO.Directory]::Delete($path, $false)
    } else {
        Remove-Item -Recurse -Force $path
    }
}

Write-Host "Stopping node processes..."
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3

Write-Host "Clearing existing .next..."
Remove-Entry $next
Start-Sleep -Seconds 2

Write-Host "Preparing cache at $target"
New-Item -ItemType Directory -Force -Path $target | Out-Null

Write-Host "Linking node_modules so module resolution works from the cache..."
Remove-Entry $nmLink
New-Item -ItemType Junction -Path $nmLink -Target (Join-Path $proj "node_modules") | Out-Null

Write-Host "Linking .next -> cache..."
New-Item -ItemType Junction -Path $next -Target $target | Out-Null

$probe = Join-Path $cache "node_modules\@tailwindcss\postcss\package.json"
Write-Host ""
Write-Host "  .next    -> $((Get-Item $next -Force).Target)"
Write-Host "  nm shim  -> $((Get-Item $nmLink -Force).Target)"
Write-Host "  resolver -> $(if (Test-Path $probe) { 'OK' } else { 'FAILED - check node_modules exists' })"
Write-Host ""
Write-Host "Done. Run: npm run dev"
