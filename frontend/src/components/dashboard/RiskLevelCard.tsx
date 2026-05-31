import { ShieldAlert } from 'lucide-react';
import clsx from 'clsx';
import { RISK_CONFIG } from '@/lib/constants';
import type { RiskLevel } from '@/types/detection';

interface RiskLevelCardProps {
  riskLevel: RiskLevel | null;
  alertCount?: number;
  detectionCount?: number;
}

export function RiskLevelCard({
  riskLevel,
  alertCount = 0,
  detectionCount = 0,
}: RiskLevelCardProps) {
  const config = riskLevel ? RISK_CONFIG[riskLevel] : null;

  return (
    <section className="glass-panel flex h-full flex-col p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Risk Level
        </h2>
        <ShieldAlert className="h-4 w-4 text-signal-amber/80" aria-hidden />
      </div>

      {config ? (
        <>
          <p
            className={clsx(
              'mb-4 text-3xl font-bold',
              config.color,
            )}
          >
            {config.label}
          </p>
          <div className="mt-auto grid grid-cols-2 gap-3">
            <Stat label="Alerts" value={alertCount} highlight={alertCount > 0} />
            <Stat label="Objects" value={detectionCount} />
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center text-slate-500">
          <p className="text-lg font-medium text-slate-400">No Assessment</p>
          <p className="mt-1 text-sm">Risk computed after analysis</p>
        </div>
      )}
    </section>
  );
}

function Stat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={clsx(
        'rounded-lg border px-3 py-2',
        highlight
          ? 'border-signal-amber/40 bg-signal-amber/10'
          : 'border-slate-700/80 bg-runway-800/80',
      )}
    >
      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p
        className={clsx(
          'font-mono text-xl font-semibold',
          highlight ? 'text-signal-amber' : 'text-white',
        )}
      >
        {value}
      </p>
    </div>
  );
}
