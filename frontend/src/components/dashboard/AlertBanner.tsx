import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import clsx from 'clsx';
import type { RiskLevel, RunwayStatus } from '@/types/detection';

interface AlertBannerProps {
  runwayStatus: RunwayStatus | null;
  riskLevel: RiskLevel | null;
  alertCount: number;
  summary?: string | null;
}

export function AlertBanner({
  runwayStatus,
  riskLevel,
  alertCount,
  summary,
}: AlertBannerProps) {
  if (!runwayStatus || !riskLevel) return null;

  const variant = getVariant(runwayStatus, riskLevel, alertCount);
  const Icon = variant.icon;

  return (
    <div
      role="alert"
      className={clsx(
        'flex gap-3 rounded-xl border px-4 py-3 sm:items-start',
        variant.border,
        variant.bg,
      )}
    >
      <Icon className={clsx('mt-0.5 h-5 w-5 shrink-0', variant.iconColor)} aria-hidden />
      <div className="min-w-0 flex-1">
        <p className={clsx('font-semibold', variant.titleColor)}>{variant.title}</p>
        <p className="mt-0.5 text-sm text-slate-300">
          {summary ?? variant.defaultMessage}
        </p>
        {alertCount > 0 && (
          <p className="mt-1 font-mono text-xs text-slate-400">
            {alertCount} object{alertCount !== 1 ? 's' : ''} above confidence threshold
          </p>
        )}
      </div>
    </div>
  );
}

function getVariant(
  status: RunwayStatus,
  risk: RiskLevel,
  alertCount: number,
) {
  if (status === 'unsafe' || risk === 'critical') {
    return {
      icon: AlertTriangle,
      title: 'Critical Alert — Runway Unsafe',
      defaultMessage: 'Immediate action required before any aircraft movement.',
      border: 'border-signal-red/50 bg-signal-red/10',
      bg: 'bg-signal-red/5',
      iconColor: 'text-signal-red',
      titleColor: 'text-signal-red',
    };
  }
  if (status === 'caution' || risk === 'high') {
    return {
      icon: AlertTriangle,
      title: 'Elevated FOD Risk',
      defaultMessage: 'Runway caution in effect. Verify before clearing traffic.',
      border: 'border-signal-orange/50 bg-signal-orange/10',
      bg: 'bg-signal-orange/5',
      iconColor: 'text-signal-orange',
      titleColor: 'text-signal-orange',
    };
  }
  if (status === 'advisory' || alertCount > 0) {
    return {
      icon: Info,
      title: 'Advisory — Possible FOD Detected',
      defaultMessage: 'Review flagged regions and confirm with ground inspection.',
      border: 'border-signal-amber/50 bg-signal-amber/10',
      bg: 'bg-signal-amber/5',
      iconColor: 'text-signal-amber',
      titleColor: 'text-signal-amber',
    };
  }
  return {
    icon: CheckCircle2,
    title: 'Runway Clear',
    defaultMessage: 'No significant FOD signatures detected in this scan.',
    border: 'border-signal-green/50 bg-signal-green/10',
    bg: 'bg-signal-green/5',
    iconColor: 'text-signal-green',
    titleColor: 'text-signal-green',
  };
}
