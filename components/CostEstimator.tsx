'use client';

import { useState } from 'react';
import type { InfraTemplate, CostLine } from '@/lib/types';

interface Props {
  templates: InfraTemplate[];
}

type Provider = 'aws' | 'gcp' | 'azure' | 'digitalocean' | 'fly';
type Workload = 'small' | 'medium' | 'large';

const PROVIDERS: Array<{ value: Provider; label: string }> = [
  { value: 'aws',          label: 'AWS' },
  { value: 'gcp',          label: 'GCP' },
  { value: 'azure',        label: 'Azure' },
  { value: 'digitalocean', label: 'DigitalOcean' },
  { value: 'fly',          label: 'Fly.io' },
];

const WORKLOADS: Array<{ value: Workload; label: string; desc: string }> = [
  { value: 'small',  label: 'Small',  desc: '1 vCPU, 1GB RAM' },
  { value: 'medium', label: 'Medium', desc: '2 vCPU, 4GB RAM' },
  { value: 'large',  label: 'Large',  desc: '4 vCPU, 8GB RAM' },
];

// Base monthly costs per (provider, workload) in USD
const BASE_COSTS: Record<Provider, Record<Workload, number>> = {
  aws:          { small: 18,  medium: 65,  large: 180 },
  gcp:          { small: 16,  medium: 60,  large: 170 },
  azure:        { small: 20,  medium: 72,  large: 195 },
  digitalocean: { small: 12,  medium: 48,  large: 130 },
  fly:          { small: 8,   medium: 30,  large: 90  },
};

function buildLines(templateId: string, provider: Provider, workload: Workload): CostLine[] {
  const base = BASE_COSTS[provider][workload];
  const isK8s = templateId.startsWith('k8s');
  const isCompose = templateId === 'docker-compose-dev-stack';

  const lines: CostLine[] = [
    { service: 'Compute', provider, unitCost: base * 0.6, units: 1, totalCost: base * 0.6 },
    { service: 'Storage (20 GB)', provider, unitCost: base * 0.1, units: 1, totalCost: base * 0.1 },
    { service: 'Network egress', provider, unitCost: base * 0.05, units: 1, totalCost: base * 0.05 },
  ];

  if (isK8s) {
    lines.push({ service: 'Load Balancer', provider, unitCost: base * 0.15, units: 1, totalCost: base * 0.15 });
    lines.push({ service: 'Control Plane', provider, unitCost: base * 0.1, units: 1, totalCost: base * 0.1 });
  }

  if (isCompose) {
    lines.push({ service: 'PostgreSQL', provider, unitCost: base * 0.2, units: 1, totalCost: base * 0.2 });
    lines.push({ service: 'Redis', provider, unitCost: base * 0.05, units: 1, totalCost: base * 0.05 });
  }

  return lines;
}

export function CostEstimator({ templates }: Readonly<Props>) {
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? '');
  const [provider, setProvider] = useState<Provider>('aws');
  const [workload, setWorkload] = useState<Workload>('small');

  const lines = buildLines(templateId, provider, workload);
  const total = lines.reduce((sum, l) => sum + l.totalCost, 0);

  const selectClass = 'w-full bg-emerald-950/60 border border-emerald-700/40 rounded-lg px-3 py-2 text-sm text-emerald-200 focus:outline-none focus:border-emerald-500';

  return (
    <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-emerald-100 mb-6">Cost Estimator</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block text-xs text-emerald-500 uppercase tracking-wide mb-2">Template</label>
          <select value={templateId} onChange={(e) => setTemplateId(e.target.value)} className={selectClass}>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-emerald-500 uppercase tracking-wide mb-2">Provider</label>
          <select value={provider} onChange={(e) => setProvider(e.target.value as Provider)} className={selectClass}>
            {PROVIDERS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-emerald-500 uppercase tracking-wide mb-2">Workload Size</label>
          <select value={workload} onChange={(e) => setWorkload(e.target.value as Workload)} className={selectClass}>
            {WORKLOADS.map((w) => (
              <option key={w.value} value={w.value}>{w.label} — {w.desc}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="border border-emerald-700/30 rounded-lg overflow-hidden mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-emerald-900/40 border-b border-emerald-800/40">
              <th className="text-left px-4 py-3 text-emerald-400 font-medium">Service</th>
              <th className="text-right px-4 py-3 text-emerald-400 font-medium">Unit Cost</th>
              <th className="text-right px-4 py-3 text-emerald-400 font-medium">Units</th>
              <th className="text-right px-4 py-3 text-emerald-400 font-medium">Monthly</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => (
              <tr key={line.service} className="border-b border-emerald-800/30">
                <td className="px-4 py-3 text-emerald-200">{line.service}</td>
                <td className="px-4 py-3 text-right text-emerald-400">${line.unitCost.toFixed(2)}</td>
                <td className="px-4 py-3 text-right text-emerald-400">{line.units}</td>
                <td className="px-4 py-3 text-right text-emerald-300 font-medium">${line.totalCost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-emerald-900/30">
              <td colSpan={3} className="px-4 py-3 text-emerald-300 font-semibold">Estimated Total / Month</td>
              <td className="px-4 py-3 text-right text-emerald-300 font-bold text-base">${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="text-xs text-emerald-600">
        Estimates are approximate and exclude free tier credits, data transfer costs, and support plans.
        Always verify with your cloud provider&apos;s pricing calculator.
      </p>
    </div>
  );
}
