# e2e/ — Playwright tests

## Setup (one-time)

```bash
npm install            # adds @playwright/test from devDeps
npx playwright install chromium
```

## First-time baseline capture

```bash
BASE_URL=https://dcyfr.build npm run test:snapshots:update
```

Commit the resulting PNGs.

## Regular runs

```bash
npm run test:snapshots
```

Fails if diff > 5% (`maxDiffPixelRatio: 0.05`).

## Coverage

- **Routes:** `/` + `/cost-estimator`
- **Viewports:** desktop `1440×900`, mobile `375×812`
- **Motion:** `prefers-reduced-motion: reduce` + `animations: 'disabled'`

## Related

- [Polish loop architecture](../../../../docs/dcyfr-workspace/polish-loop.md)
- [`nexus/scout-prompts/dcyfr-build.md`](../../../../nexus/scout-prompts/dcyfr-build.md)
