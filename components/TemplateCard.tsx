import Link from 'next/link';
import type { InfraTemplate } from '@/lib/types';

interface Props {
  template: InfraTemplate;
  compact?: boolean;
}

const CATEGORY_COLORS: Record<InfraTemplate['category'], string> = {
  docker:      'bg-blue-900/40 border-blue-700/40 text-blue-300',
  kubernetes:  'bg-violet-900/40 border-violet-700/40 text-violet-300',
  'ci-cd':     'bg-warning/40 border-warning/40 text-warning',
  monitoring:  'bg-cyan-900/40 border-cyan-700/40 text-cyan-300',
  security:    'bg-destructive/40 border-destructive/40 text-destructive',
  networking:  'bg-emerald-900/40 border-emerald-700/40 text-emerald-300',
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
      className="group block bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-5 hover:bg-emerald-800/30 hover:border-emerald-600/50 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-semibold text-emerald-100 group-hover:text-white transition-colors leading-tight">
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
          <p className="text-sm text-emerald-400 line-clamp-2 mb-3">{template.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {template.stack.map((s) => (
              <span key={s} className="text-xs text-emerald-500 font-mono">{s}</span>
            ))}
          </div>
        </>
      )}

      {compact && (
        <p className="text-xs text-emerald-500 line-clamp-1">{template.stack.join(' · ')}</p>
      )}
    </Link>
  );
}
