export interface InfraTemplate {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: 'docker' | 'kubernetes' | 'ci-cd' | 'monitoring' | 'security' | 'networking';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  stack: string[];
  tags: string[];
  content: string;
  estimatedMonthlyCost?: number;
}

export interface CostLine {
  service: string;
  provider: string;
  unitCost: number;
  units: number;
  totalCost: number;
}

export interface CostEstimate {
  templateId: string;
  provider: 'aws' | 'gcp' | 'azure' | 'digitalocean' | 'fly';
  workload: 'small' | 'medium' | 'large';
  lines: CostLine[];
  totalMonthly: number;
}
