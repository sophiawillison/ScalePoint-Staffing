# Deploying / previewing this project

This is a **Next.js** app (not PHP — you do **not** need XAMPP).

## Option A — Live link with Vercel (best for sharing)
1. Push this project to a GitHub repository.
2. Go to https://vercel.com and sign in with GitHub.
3. Click **Add New → Project**, pick this repository, and click **Deploy**.
4. Vercel auto-detects Next.js. No settings or environment variables are required —
   every value has a safe default. In ~1 minute you get a public URL to share.

Note: on Vercel, form submissions save to temporary server storage (they validate,
return a reference ID, and show the confirmation screen). To persist permanently,
set `STORAGE_DRIVER=postgres` + `DATABASE_URL` (see README.md).

## Option B — Run live in your browser with StackBlitz
1. Push to GitHub (as above).
2. Open: https://stackblitz.com/github/YOUR-USERNAME/YOUR-REPO
   (replace with your repo path). It runs the whole app in the browser — forms included.

## Option C — Run locally
```
npm install
npm run dev      # http://localhost:3000
```
Requires Node.js 18.17+ from https://nodejs.org (LTS). No admin install needed if you
use the portable (.zip) build of Node.
