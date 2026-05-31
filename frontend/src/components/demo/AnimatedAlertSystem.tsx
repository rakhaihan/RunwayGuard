import { AlertTriangle, CheckCircle2, Info, Siren } from 'lucide-react';
import clsx from 'clsx';
import type { RiskLevel, RunwayStatus } from '@/types/detection';

interface AnimatedAlertSystemProps {
  runwayStatus: RunwayStatus | null;
  riskLevel: RiskLevel | null;
  alertCount: number;
  summary?: string | null;
  safetyScore?: number;
}

export function AnimatedAlertSystem({
  runwayStatus,
  riskLevel,
  alertCount,
  summary,
  safetyScore = 0,
}: AnimatedAlertSystemProps) {
  if (!runwayStatus || !riskLevel) return null;

  const variant = getVariant(runwayStatus, riskLevel, alertCount);
  const Icon = variant.icon;
  const isCritical = variant.level === 'critical';

  return (
    <div
      role="alert"
      className={clsx(
        'alert-enter relative overflow-hidden rounded-xl border px-4 py-3',
        variant.border,
        variant.bg,
        isCritical && 'alert-critical-pulse',
      )}
    >
      {isCritical && (
        <div className="alert-shimmer pointer-events-none absolute inset-0" aria-hidden />
      )}
      <div className="relative flex gap-3 sm:items-start">
        <div
          className={clsx(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
            variant.iconBg,
            isCritical && 'alert-icon-bounce',
          )}
        >
          <Icon className={clsx('h-5 w-5', variant.iconColor)} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className={clsx('font-semibold', variant.titleColor)}>{variant.title}</p>
            {isCritical && (
              <span className="inline-flex items-center gap-1 rounded-full bg-signal-red/20 px-2 py-0.5 font-mono text-[10px] uppercase text-signal-red">
                <Siren className="h-3 w-3" />
                Live
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-slate-300">
            {summary ?? variant.defaultMessage}
          </p>
          <div className="mt-2 flex flex-wrap gap-3 font-mono text-[10px] text-slate-400">
            {alertCount > 0 && (
              <span>
                {alertCount} alert{alertCount !== 1 ? 's' : ''} active
              </span>
            )}
            {safetyScore > 0 && <span>Safety score: {safetyScore}/100</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function getVariant(status: RunwayStatus, risk: RiskLevel, alertCount: number) {
  if (status === 'unsafe' || risk === 'critical') {
    return {
      level: 'critical' as const,
      icon: AlertTriangle,
      title: 'Critical Alert — Runway Unsafe',
      defaultMessage: 'Immediate action required before any aircraft movement.',
      border: 'border-signal-red/50',
      bg: 'bg-signal-red/10',
      iconBg: 'bg-signal-red/20',
      iconColor: 'text-signal-red',
      titleColor: 'text-signal-red',
    };
  }
  if (status === 'caution' || risk === 'high') {
    return {
      level: 'high' as const,
      icon: AlertTriangle,
      title: 'Elevated FOD Risk',
      defaultMessage: 'Runway caution in effect. Verify before clearing traffic.',
      border: 'border-signal-orange/50',
      bg: 'bg-signal-orange/10',
      iconBg: 'bg-signal-orange/20',
      iconColor: 'text-signal-orange',
      titleColor: 'text-signal-orange',
    };
  }
  if (status === 'advisory' || alertCount > 0) {
    return {
      level: 'advisory' as const,
      icon: Info,
      title: 'Advisory — Possible FOD Detected',
      defaultMessage: 'Review flagged regions and confirm with ground inspection.',
      border: 'border-signal-amber/50',
      bg: 'bg-signal-amber/10',
      iconBg: 'bg-signal-amber/20',
      iconColor: 'text-signal-amber',
      titleColor: 'text-signal-amber',
    };
  }
  return {
    level: 'clear' as const,
    icon: CheckCircle2,
    title: 'Runway Clear',
    defaultMessage: 'No significant FOD signatures detected in this scan.',
    border: 'border-signal-green/50',
    bg: 'bg-signal-green/10',
    iconBg: 'bg-signal-green/20',
    iconColor: 'text-signal-green',
    titleColor: 'text-signal-green',
  };
}
