import type { RiskLevel, RunwayStatus } from '@/types/detection';

export const RISK_CONFIG: Record<
  RiskLevel,
  { label: string; color: string; bg: string; border: string }
> = {
  low: {
    label: 'Low Risk',
    color: 'text-signal-green',
    bg: 'bg-signal-green/10',
    border: 'border-signal-green/40',
  },
  medium: {
    label: 'Medium Risk',
    color: 'text-signal-amber',
    bg: 'bg-signal-amber/10',
    border: 'border-signal-amber/40',
  },
  high: {
    label: 'High Risk',
    color: 'text-signal-orange',
    bg: 'bg-signal-orange/10',
    border: 'border-signal-orange/40',
  },
  critical: {
    label: 'Critical Risk',
    color: 'text-signal-red',
    bg: 'bg-signal-red/10',
    border: 'border-signal-red/40',
  },
};

export const STATUS_CONFIG: Record<
  RunwayStatus,
  { label: string; color: string; bg: string; border: string; dot: string }
> = {
  clear: {
    label: 'Clear',
    color: 'text-signal-green',
    bg: 'bg-signal-green/10',
    border: 'border-signal-green/40',
    dot: 'bg-signal-green',
  },
  advisory: {
    label: 'Advisory',
    color: 'text-signal-amber',
    bg: 'bg-signal-amber/10',
    border: 'border-signal-amber/40',
    dot: 'bg-signal-amber',
  },
  caution: {
    label: 'Caution',
    color: 'text-signal-orange',
    bg: 'bg-signal-orange/10',
    border: 'border-signal-orange/40',
    dot: 'bg-signal-orange',
  },
  unsafe: {
    label: 'Unsafe',
    color: 'text-signal-red',
    bg: 'bg-signal-red/10',
    border: 'border-signal-red/40',
    dot: 'bg-signal-red status-pulse',
  },
};

export const RECOMMENDED_ACTIONS: Record<RunwayStatus, string[]> = {
  clear: [
    'Continue scheduled operations with standard FOD walkdown intervals.',
    'Log scan results for compliance and trend monitoring.',
    'No immediate intervention required.',
  ],
  advisory: [
    'Dispatch ground crew for visual verification of flagged regions.',
    'Increase FOD inspection frequency for the next departure cycle.',
    'Document findings in the runway safety log.',
  ],
  caution: [
    'Hold departures until a physical runway sweep is completed.',
    'Escalate to airport operations and notify tower supervisor.',
    'Re-scan runway after debris removal before clearing traffic.',
  ],
  unsafe: [
    'Close runway segment immediately and initiate emergency FOD retrieval.',
    'Notify ATC, airlines, and airport authority per safety protocol.',
    'Require certified all-clear inspection before reopening.',
  ],
};
