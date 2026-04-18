import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Canonical className merge for dcyfr.build. Wrapper around clsx + tailwind-merge
 * so components imported from @dcyfr-labs registry can resolve `cn` at `@/lib/utils`.
 *
 * Note: `clsx` and `tailwind-merge` were added to deps in Phase 1 scaffolding.
 * Run `npm install` to resolve them before first use.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
