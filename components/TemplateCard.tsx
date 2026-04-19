import Link from 'next/link';
import type { InfraTemplate } from '@/lib/types';

interface Props {
  template: InfraTemplate;
  compact?: boolean;
}

// CATEGORY_COLORS — industry-convention hues (docker/k8s/monitoring) + DCYFR
// semantic tokens (ci-cd→warning, security→destructive, networking→neutral).
// The 2 remaining hardcoded scales (violet/cyan) have no matching semantic
// token on dcyfr-build's identity palette; keeping them as deliberate
// carveouts per openspec/changes/archive/2026-04-19-dcyfr-build-work-hardcoded-colors §3.1.
// docker=blue migrated to `secure` (which IS blue: 217 91% 60% under theme).
// Lint exception: the workspace-level `scripts/polish-loop/lint-design-tokens.mjs`
// informational rule tolerates these as carveouts; strict backstop stays green.
const CATEGORY_COLORS: Record<InfraTemplate['category'], string> = {
  docker:      'bg-secure/20 border-secure/40 text-secure',
  kubernetes:  'bg-violet-900/40 border-violet-700/40 text-violet-300',
  'ci-cd':     'bg-warning/40 border-warning/40 text-warning',
  monitoring:  'bg-cyan-900/40 border-cyan-700/40 text-cyan-300',
  security:    'bg-destructive/40 border-destructive/40 text-destructive',
  networking:  'bg-card/40 border-border/40 text-muted-foreground',
};

const DIFFICULTY_COLORS: Record<InfraTemplate['difficulty'], string> = {
  beginner:     'bg-success/40 border-success/40 text-success',
  intermediate: 'bg-warning/40 border-warning/40 text-warning',
  advanced:     'bg-destructive/40 border-destructive/40 text-destructive',
};

export function TemplateCard({ template, compact = false }: Readonly<Props>) {
  return (
    <Link
      href={`/templates/${template.slug}`}
      className="group block bg-card/20 border border-border/30 rounded-xl p-5 hover:bg-muted/30 hover:border-primary/60/50 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-semibold text-foreground/70 group-hover:text-white transition-colors leading-tight">
          {template.name}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${CATEGORY_COLORS[template.category]}`}>
          {template.category}
        </span>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${DIFFICULTY_COLORS[template.difficulty]}`}>
          {template.difficulty}
        </span>
      </div>

      {!compact && (
        <>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{template.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {template.stack.map((s) => (
              <span key={s} className="text-xs text-primary font-mono">{s}</span>
            ))}
          </div>
        </>
      )}

      {compact && (
        <p className="text-xs text-primary line-clamp-1">{template.stack.join(' · ')}</p>
      )}
    </Link>
  );
}
