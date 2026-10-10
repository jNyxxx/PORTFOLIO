# Publish exactly the verified UI revision to the linked GitHub main branch.
# Other local changes, including .gitignore and Vercel credentials, are left alone.
$ErrorActionPreference = "Stop"
$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$repoUrl = "https://github.com/jNyxxx/PORTFOLIO.git"
$paths = @(
  "DESIGN_SYSTEM.md",
  "QA_REPORT_2026-10-10.md",
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "public/styles/system.css",
  "src/components/contact.tsx",
  "src/components/dialogs.tsx",
  "src/components/portfolio-provider.tsx",
  "src/components/project-engineering-details.tsx",
  "src/content/project-engineering.ts",
  "src/lib/photos.ts",
  "src/components/featured.tsx",
  "src/components/project-cover.tsx",
  "src/components/work.tsx",
  "src/components/featured-media-card.tsx",
  "src/components/header.tsx",
  "src/components/hero.tsx",
  "src/components/skills.tsx",
  "src/components/toolbox.tsx",
  "src/components/ui/button.tsx",
  "src/components/ui/card.tsx",
  "src/components/ui/controls.tsx",
  "src/hooks/use-browser.ts",
  "src/hooks/use-orbit.ts",
  "src/components/ui/icon.tsx",
  "src/lib/motion.ts",
  "tests/engineering.test.ts",
  "tests/gallery-isolation.test.tsx",
  "tests/browser-qa.mjs",
  "tests/interactions.test.tsx",
  "tests/motion.test.ts",
  "tests/parity.test.tsx",
  "scripts/publish-design-update.ps1"
)
function Assert-Exit([string] $name) {
  if ($LASTEXITCODE -ne 0) { throw "$name failed (exit $LASTEXITCODE)." }
}
Push-Location $root
try {
  if ((git branch --show-current).Trim() -ne "main") {
    throw "You must be on the local main branch. No changes were pushed."
  }
  Assert-Exit "Check current branch"
  $remoteNames = @(git remote)
  Assert-Exit "List Git remotes"
  if ($remoteNames -notcontains "origin") { throw "No GitHub origin remote configured." }
  $currentRemote = (git remote get-url origin).Trim()
  Assert-Exit "Read Git remote"
  if ($currentRemote -ne $repoUrl) { throw "Unexpected origin: $currentRemote" }
  $localHead = (git rev-parse HEAD).Trim()
  Assert-Exit "Read current commit"
  $remoteResult = @(git ls-remote origin refs/heads/main)
  Assert-Exit "Read GitHub main branch"
  $remoteHead = if ($remoteResult.Count -gt 0) { ($remoteResult[0] -split "\s+")[0] } else { "" }
  if ($localHead -ne $remoteHead) {
    throw "Remote main advanced since the last sync. Reconcile locally before pushing. No force push was attempted."
  }

  $preStaged = @(git diff --cached --name-only)
  Assert-Exit "Check existing staged files"
  if ($preStaged.Count -gt 0 -and -not ($preStaged.Count -eq 1 -and $preStaged[0] -eq "")) {
    throw "There are already staged changes. Review them first so this script cannot include unrelated changes."
  }

  pnpm lint
  Assert-Exit "Lint"
  pnpm typecheck
  Assert-Exit "Typecheck"
  pnpm test
  Assert-Exit "Tests"
  pnpm build
  Assert-Exit "Production build"
  pnpm verify:parity
  Assert-Exit "Static export verification"

  git add -- $paths
  Assert-Exit "Stage only UI revision"
  git diff --cached --check
  Assert-Exit "Check patch whitespace"
  git diff --cached --quiet
  if ($LASTEXITCODE -eq 1) {
    git --no-pager diff --cached --shortstat
    Assert-Exit "Summarize changes"
    git commit -m "Add LinkedIn, simplify contact and carousel, complete graphical QA"
    Assert-Exit "Commit NYX UI revision"
  } elseif ($LASTEXITCODE -ne 0) {
    throw "Cannot inspect staged revision."
  }

  git push origin main
  Assert-Exit "Push verified UI revision to GitHub"
  Write-Host ""
  Write-Host "UI revision pushed: $repoUrl (main)"
  Write-Host "Vercel Git integration should automatically deploy this new main commit."
  Write-Host "Check Production in https://vercel.com/nyxsdlc-1110/nyx/deployments"
  Write-Host "Public URL: https://nyx-nyxsdlc-1110.vercel.app"
} finally {
  Pop-Location
}
