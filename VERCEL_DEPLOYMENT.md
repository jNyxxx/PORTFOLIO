# Deploy NYX portfolio to Vercel

## Linked accounts and target

- **Local source:** `D:\PORTFOLIO\nyx-portfolio`.
- **GitHub source destination:** [jNyxxx/PORTFOLIO](https://github.com/jNyxxx/PORTFOLIO), branch `main`.
- **Vercel team:** `nyxsdlc-1110` (Hobby).
- **Existing Vercel project:** `nyx` (ID `prj_zWnOvXNe8JYN4Rpk4IlEQPswdvrs`).
- **Reserved and verified production domain:** `nyx-nyxsdlc-1110.vercel.app`.
- **Requested exact domain:** `nyx.vercel.app` is *not available*; Vercel rejected it as assigned to another project (409). Do not claim this short domain exists on our account.
- **Status:** The Vercel project/domain exist, but there is no live deployment until code is pushed and the Vercel build succeeds.

The GitHub repository was confirmed **empty** at preparation time. After the first unsuccessful publishing attempt, the local folder has an **unborn `main` Git branch** (initialized without commits or an `origin` remote). The publishing script was repaired to handle this state safely on rerun. To ensure all 60 media assets (including the larger video) reach GitHub, do the initial push *from the local computer*. Do not attempt a text-only GitHub API upload.

## One-command first publish from Windows

Open **PowerShell** and execute:

```powershell
cd D:\PORTFOLIO\nyx-portfolio
powershell -ExecutionPolicy Bypass -File .\scripts\publish-vercel.ps1
```

The publishing script:

1. Runs frozen dependency install, ESLint, TypeScript, tests, production build, and static-export verification.
2. Initializes local `git main` if the folder isn't already a repository, and verifies the `origin` target is exactly `https://github.com/jNyxxx/PORTFOLIO.git`.
3. Safely commits the complete source and media, then pushes `main` to GitHub *without force*.
4. Installs Vercel CLI if absent, opens interactive Vercel login if needed, links the **existing** `nyx` project in the `nyxsdlc-1110` scope, and verifies its exact project and team IDs before deploying to production.
5. Attempts to connect the pushed GitHub repository with `vercel git connect --yes` after a successful production deployment. If GitHub authorization is needed, the website remains deployed and the script prints the manual setup step.
6. Prints the expected project domain, which must then be verified in a private browser window.

Do not paste GitHub/Vercel access tokens into the script or commit them. Your installed Git credentials and Vercel browser authentication handle authentication. If Git says the author is unknown, set your own Git author name/email before rerunning:

```powershell
git config --global user.name "Your Git author name"
git config --global user.email "your-public-git-email@example.com"
```

The script aborts if `main` already exists remotely but local `HEAD` does not. This is deliberate protection against overwriting existing history.

## Automatic deployment on future GitHub pushes

Vercel's GitHub integration was not connected for this team when last checked (Git namespaces returned empty). The publishing script attempts a Git connection after deployment. If that step requires browser authorization, open the existing project [nyx on Vercel](https://vercel.com/nyxsdlc-1110/nyx) → **Settings → Git** and install/authorize Vercel's GitHub app for `jNyxxx/PORTFOLIO`. Connect it to this **same** project and set production branch `main`. Do not create a second Vercel project. Then future `git push origin main` operations can deploy automatically.

If you prefer not to connect Git integration, subsequent updates can use:

```powershell
cd D:\PORTFOLIO\nyx-portfolio
pnpm build
pnpm verify:parity
git add -A
git commit -m "Update NYX portfolio"
git push origin main
vercel --prod --scope nyxsdlc-1110
```

Skip the `git commit` when no changes are staged.

## Verification

- Verify GitHub's `main` branch includes `src/`, `public/styles/system.css`, `public/assets/`, `package.json`, and `pnpm-lock.yaml`.
- In the Vercel dashboard, confirm the new deployment state is **READY**, target **Production**, project **nyx**.
- Open https://nyx-nyxsdlc-1110.vercel.app in a private browser window. The URL is reserved but won't serve the portfolio until deployment finishes.
- Check the homepage on desktop/mobile, all four carousel projects, media lightboxes, project dialogs, filter controls, and working links.
- The prior ChatGPT Site remains separate; decommission it only after a successful verification.

## Technology and plan notes

The codebase is Next.js 16/React 19 with pnpm 11.25.0, `output: "export"`, and unoptimized static images. It requires no database. Vercel Hobby is free only within plan restrictions and for eligible personal/non-commercial use; check these terms if the portfolio is used for commercial activity.

Official Vercel documentation:
- https://vercel.com/docs/cli/link
- https://vercel.com/docs/cli/deploy
- https://vercel.com/docs/git/vercel-for-github
