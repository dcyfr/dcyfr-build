import { test, expect } from '@playwright/test';

/**
 * Visual regression baseline per
 * openspec/changes/dcyfr-skeleton-sites-scaffolding/spec.md#51-screenshot-baseline
 *
 * dcyfr.build is a utility / tool hub. Two views:
 * - `/` home (hero + stats + categories + recent templates)
 * - `/cost-estimator` the site's signature tool
 */

const VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 375, height: 812, name: 'mobile' },
] as const;

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/cost-estimator', name: 'cost-estimator' },
] as const;

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    test(`${route.name} @ ${vp.name}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      await expect(page).toHaveScreenshot(`${route.name}-${vp.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
        animations: 'disabled',
      });
    });
  }
}
