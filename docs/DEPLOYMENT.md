# Deployment

The site is a static build (SvelteKit with `@sveltejs/adapter-static`) served by GitHub Pages at
**https://magr.in**.

## How it deploys

`.github/workflows/deploy.yml` runs on every push to `main` (and on demand from the **Actions** tab,
**Deploy to GitHub Pages** → **Run workflow**): it installs the locked dependencies with `npm ci` on
Node 24, runs `npm run build` and publishes `build/` to GitHub Pages.

A push to `main` therefore publishes the site. Work on a branch and merge when the build is ready.

## Before pushing

```bash
npm run check    # types: 0 errors, 0 warnings
npm run lint     # prettier and eslint
npm run build    # prerenders every page into build/
npm run preview  # serves build/ locally, as GitHub Pages will
```

## Custom domain

- `static/CNAME` holds `magr.in`, so the domain survives every deployment.
- Repository **Settings** → **Pages**: source **GitHub Actions**, custom domain `magr.in`,
  **Enforce HTTPS** on.
- DNS at the registrar: four `A` records for the apex (`@`) to GitHub Pages, `185.199.108.153`,
  `185.199.109.153`, `185.199.110.153` and `185.199.111.153`; optionally a `CNAME` for `www` to
  `dvdmgr.github.io`.

The site lives at the domain's root, so it uses no base path; links are built with `resolve()`
from `$app/paths`, which would add one if that ever changed.

## Troubleshooting

- **404 on every page**: check that the Pages source is **GitHub Actions**.
- **Build fails in Actions**: run `npm ci && npm run build` locally on Node 24 and read the
  workflow's log in the **Actions** tab.
- **Custom domain not working**: check the DNS records; propagation can take up to 24 hours.
