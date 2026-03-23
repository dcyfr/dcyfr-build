import Link from 'next/link';
import type { InfraTemplate } from '@/lib/types';
import templatesData from '@/data/templates.json';
import { TemplateCard } from '@/components/TemplateCard';

const templates = templatesData as InfraTemplate[];

const CATEGORIES = [
  { key: 'docker',      label: 'Docker',      icon: '🐳', desc: 'Container images and compose stacks' },
  { key: 'kubernetes',  label: 'Kubernetes',  icon: '☸️',  desc: 'Deployments, services, and ingress' },
  { key: 'ci-cd',       label: 'CI/CD',       icon: '🔄', desc: 'GitHub Actions workflows' },
  { key: 'monitoring',  label: 'Monitoring',  icon: '📊', desc: 'Observability and alerting' },
  { key: 'security',    label: 'Security',    icon: '🔒', desc: 'Secrets, RBAC, and scanning' },
  { key: 'networking',  label: 'Networking',  icon: '🌐', desc: 'Ingress, DNS, and load balancing' },
];

export default function HomePage() {
  const recent = templates.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-emerald-800/40">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-950 to-teal-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-800/40 border border-emerald-600/40 rounded-full px-4 py-1.5 text-sm text-emerald-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            6 Templates Available Now
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ship infrastructure{' '}
            <span className="text-emerald-400">faster.</span>
          </h1>
          <p className="text-lg sm:text-xl text-emerald-300 max-w-2xl mx-auto mb-10">
            Battle-tested Docker, Kubernetes, and CI/CD templates for AI-powered apps.
            All MIT licensed, production-validated, with a built-in cost estimator.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Browse Templates
            </Link>
            <Link
              href="/cost-estimator"
              className="inline-flex items-center gap-2 border border-emerald-600/60 hover:border-emerald-500 text-emerald-300 hover:text-emerald-100 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Estimate Costs
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-emerald-800/40 bg-emerald-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: '6', label: 'Templates' },
            { value: '5', label: 'Cloud Providers' },
            { value: 'Free', label: 'Cost Estimator' },
            { value: 'MIT', label: 'Licensed' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-emerald-300">{value}</p>
              <p className="text-sm text-emerald-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-emerald-100 mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              href={`/templates?category=${cat.key}`}
              className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-emerald-900/20 border border-emerald-700/30 hover:bg-emerald-800/30 hover:border-emerald-600/50 transition-all text-center"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-sm font-medium text-emerald-200 group-hover:text-white transition-colors">{cat.label}</span>
              <span className="text-xs text-emerald-500">{cat.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-emerald-100">Recent Templates</h2>
          <Link href="/templates" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
            View all {templates.length} →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recent.map((t) => <TemplateCard key={t.id} template={t} compact />)}
        </div>
      </section>
    </div>
  );
}
