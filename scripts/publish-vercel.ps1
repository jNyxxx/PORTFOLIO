# Publish the complete source (including media) and deploy the existing Vercel project.
# Designed for an empty GitHub repository on first run; never force-pushes.
$ErrorActionPreference = "Stop"
$repoUrl = "https://github.com/jNyxxx/PORTFOLIO.git"
$teamSlug = "nyxsdlc-1110"
$projectName = "nyx"
$expectedProjectId = "prj_zWnOvXNe8JYN4Rpk4IlEQPswdvrs"
$expectedTeamId = "team_Ctq7rKiDMO2MLJvGFbDc2LeE"
$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path

function Check-Exit([string]$step) {
  if ($LASTEXITCODE -ne 0) { throw "$step failed (exit code $LASTEXITCODE)." }
}

Push-Location $root
try {
  Write-Host "Project: $root"
  Write-Host "GitHub:  $repoUrl"
  Write-Host "Vercel:  $projectName ($teamSlug)"
  foreach ($command in @("git", "pnpm", "npm")) {
    if (-not (Get-Command $command -ErrorAction SilentlyContinue)) {
      throw "Missing required command: $command"
    }
  }

  # Validate the exact working tree before publishing anything.
  pnpm install --frozen-lockfile
  Check-Exit "Dependency installation"
  pnpm lint
  Check-Exit "Lint"
  pnpm typecheck
  Check-Exit "TypeScript"
  pnpm test
  Check-Exit "Tests"
  pnpm build
  Check-Exit "Production build"
  pnpm verify:parity
  Check-Exit "Export verification"

  if (-not (Test-Path ".git")) {
    git init -b main
    Check-Exit "Git initialization"
  }

  $branch = (git branch --show-current).Trim()
  Check-Exit "Current Git branch"
  if ($branch -ne "main") {
    throw "Your local branch is '$branch'. Resolve this before publishing; this script will not change or overwrite another branch."
  }

  # Query known remote names first. "git remote get-url origin" writes to stderr
  # when origin is missing, which PowerShell 5.1 can treat as a fatal error.
  $remoteNames = @(git remote)
  Check-Exit "Listing Git remotes"
  if ($remoteNames -notcontains "origin") {
    git remote add origin $repoUrl
    Check-Exit "Adding GitHub remote"
  } else {
    $remoteUrl = (git remote get-url origin)
    Check-Exit "Reading GitHub remote"
    if ($remoteUrl.Trim() -ne $repoUrl) {
      throw "Git remote 'origin' points to $remoteUrl; expected $repoUrl. No remote was changed."
    }
  }

  $remoteMain = (& git ls-remote --heads origin main)
  Check-Exit "Remote main branch check"
  # Exit code 1 without stderr is expected on a new, unborn main branch.
  git show-ref --verify --quiet refs/heads/main
  $hasLocalMainCommit = $LASTEXITCODE -eq 0
  if (-not [string]::IsNullOrWhiteSpace($remoteMain) -and -not $hasLocalMainCommit) {
    throw "GitHub main already contains commits. Clone/reconcile that branch before pushing; no history was overwritten."
  }

  git add -A
  Check-Exit "Staging portfolio"
  git diff --cached --quiet
  if ($LASTEXITCODE -eq 1) {
    $authorName = (& git config user.name)
    $authorEmail = (& git config user.email)
    if (-not $authorName -or -not $authorEmail) {
      throw "Set git config user.name and user.email (your own identity), then re-run."
    }
    Write-Host "Staged content:"
    git diff --cached --stat
    git commit -m "Publish NYX portfolio design system and Vercel-ready site"
    Check-Exit "Creating Git commit"
  } elseif ($LASTEXITCODE -ne 0) {
    throw "Unable to inspect staged Git changes."
  }

  # Refuse to rewrite remote history.
  git push -u origin main
  Check-Exit "Pushing full portfolio to GitHub"
  Write-Host "GitHub source pushed: $repoUrl"

  if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Vercel CLI..."
    npm install --global vercel
    Check-Exit "Vercel CLI installation"
  }
  # If signed out, whoami may emit stderr and throw under Windows PowerShell.
  $vercelSignedIn = $false
  try {
    vercel whoami 2>$null | Out-Null
    $vercelSignedIn = $LASTEXITCODE -eq 0
  } catch {
    $vercelSignedIn = $false
  }
  if (-not $vercelSignedIn) {
    vercel login
    Check-Exit "Vercel browser sign-in"
  }
  vercel link --yes --project $projectName --scope $teamSlug
  Check-Exit "Link to existing Vercel project"

  # A --yes CLI link must never silently target a different project.
  if (-not (Test-Path ".vercel/project.json")) {
    throw "Vercel did not write the expected .vercel/project.json link."
  }
  $link = Get-Content ".vercel/project.json" -Raw | ConvertFrom-Json
  if ($link.projectId -ne $expectedProjectId -or $link.orgId -ne $expectedTeamId) {
    throw "Vercel linked an unexpected project or account. Refusing production deployment."
  }

  vercel --prod --yes --scope $teamSlug
  Check-Exit "Vercel production deployment"

  Write-Host ""
  Write-Host "Production deployment submitted for the existing NYX project."
  Write-Host "Project domain: https://nyx-nyxsdlc-1110.vercel.app"

  # Git integration is optional for availability; try it only after a successful deploy.
  # GitHub's Vercel app may need authorization in the user's browser.
  Write-Host "Connecting GitHub for automatic deployment on future main pushes..."
  try {
    vercel git connect --yes --scope $teamSlug
    if ($LASTEXITCODE -ne 0) {
      Write-Warning "Git auto-deploy is not connected. Authorize jNyxxx/PORTFOLIO in Vercel Project Settings > Git."
    }
  } catch {
    Write-Warning "Git auto-deploy requires authorization: open Vercel Project Settings > Git and connect jNyxxx/PORTFOLIO."
  }
  Write-Host "Inspect Vercel Deployments for READY and open the project domain to verify it is public."
} finally {
  Pop-Location
}
