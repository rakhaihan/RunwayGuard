import type { RiskLevel, RunwayAnalysisResult, RunwayStatus } from '@/types/detection';

const STATUS_BASE: Record<RunwayStatus, number> = {
  clear: 96,
  advisory: 78,
  caution: 52,
  unsafe: 22,
};

const RISK_PENALTY: Record<RiskLevel, number> = {
  low: 0,
  medium: 6,
  high: 14,
  critical: 28,
};

export function computeSafetyScore(result: RunwayAnalysisResult | null): number {
  if (!result) return 0;

  const base = STATUS_BASE[result.runway_status];
  const risk = RISK_PENALTY[result.risk_level];
  const alerts = Math.min(12, result.alert_count * 2.5);

  return Math.max(0, Math.min(100, Math.round(base - risk - alerts)));
}

export function safetyScoreLabel(score: number): string {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Moderate';
  if (score >= 30) return 'Poor';
  return 'Critical';
}

export function safetyScoreColor(score: number): string {
  if (score >= 85) return 'text-signal-green';
  if (score >= 70) return 'text-signal-cyan';
  if (score >= 50) return 'text-signal-amber';
  if (score >= 30) return 'text-signal-orange';
  return 'text-signal-red';
}
