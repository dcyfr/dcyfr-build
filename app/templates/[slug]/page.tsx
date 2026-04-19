import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { InfraTemplate } from '@/lib/types';
import templatesData from '@/data/templates.json';
import { CodePreview } from '@/components/CodePreview';
import { DownloadButton } from '@/components/DownloadButton';

const templates = templatesData as InfraTemplate[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = templates.find((t) => t.slug === slug);
  if (!template) return { title: 'Template Not Found' };
  return {
    title: `${template.name} — DCYFR Build`,
    description: template.description,
  };
}

const DIFFICULTY_COLORS: Record<InfraTemplate['difficulty'], string> = {
  beginner:     'bg-success/40 border-success/40 text-success',
  intermediate: 'bg-warning/40 border-warning/40 text-warning',
  advanced:     'bg-destructive/40 border-destructive/40 text-destructive',
};

// CATEGORY_COLORS — see components/TemplateCard.tsx for full rationale.
// docker → secure (blue in theme); kubernetes + monitoring stay as
// deliberate carveouts (no matching semantic on dcyfr-build palette).
// eslint-disable-next-line dcyfr-local/no-hardcoded-colors
const CATEGORY_COLORS: Record<InfraTemplate['category'], string> = {
  docker:      'bg-secure/20 border-secure/40 text-secure',
  kubernetes:  'bg-violet-900/40 border-violet-700/40 text-violet-300',
  'ci-cd':     'bg-warning/40 border-warning/40 text-warning',
  monitoring:  'bg-cyan-900/40 border-cyan-700/40 text-cyan-300',
  security:    'bg-destructive/40 border-destructive/40 text-destructive',
  networking:  'bg-card/40 border-border/40 text-muted-foreground',
};

export default async function TemplateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const template = templates.find((t) => t.slug === slug);
  if (!template) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: template.name,
    description: template.description,
    programmingLanguage: template.stack.join(', '),
    license: 'https://opensource.org/licenses/MIT',
    codeRepository: 'https://github.com/dcyfr/dcyfr-build',
  };

  // Infer a reasonable filename from category
  const filenameMap: Record<InfraTemplate['category'], string> = {
    docker:     template.slug.includes('compose') ? 'docker-compose.yml' : 'Dockerfile',
    kubernetes: template.slug + '.yaml',
    'ci-cd':    '.github/workflows/' + template.slug + '.yml',
    monitoring: template.slug + '.yaml',
    security:   template.slug + '.yaml',
    networking: template.slug + '.yaml',
  };
  const filename = filenameMap[template.category];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/templates" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-muted-foreground mb-8 transition-colors">
        ← Back to Templates
      </Link>

      <div className="bg-card/30 border border-border/40 rounded-xl p-6 sm:p-8 mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground/70">{template.name}</h1>
          <DownloadButton content={template.content} filename={filename} />
        </div>
        <p className="text-muted-foreground mb-6">{template.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${CATEGORY_COLORS[template.category]}`}>
            {template.category}
          </span>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${DIFFICULTY_COLORS[template.difficulty]}`}>
            {template.difficulty}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {template.stack.map((s) => (
            <span key={s} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono bg-background border border-border/50 text-muted-foreground">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground/70 mb-4">Template Code</h2>
        <CodePreview content={template.content} filename={filename} />
      </div>
    </div>
  );
}
