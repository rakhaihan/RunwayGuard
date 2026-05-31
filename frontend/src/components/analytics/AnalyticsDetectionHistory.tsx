import { History } from 'lucide-react';
import clsx from 'clsx';
import { RISK_CONFIG, STATUS_CONFIG } from '@/lib/constants';
import type { MockHistoryRecord } from '@/types/analytics';

interface AnalyticsDetectionHistoryProps {
  records: MockHistoryRecord[];
}

export function AnalyticsDetectionHistory({ records }: AnalyticsDetectionHistoryProps) {
  return (
    <section className="glass-panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-signal-cyan" />
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Detection History
          </h3>
        </div>
        <span className="rounded border border-signal-cyan/30 bg-signal-cyan/10 px-2 py-0.5 font-mono text-[10px] text-signal-cyan">
          OPS MOCK DATA
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 font-mono text-[10px] uppercase tracking-wider text-slate-500">
              <th className="px-5 py-2.5">Time</th>
              <th className="px-3 py-2.5">Runway</th>
              <th className="px-3 py-2.5">Score</th>
              <th className="px-3 py-2.5">Status</th>
              <th className="px-3 py-2.5">Risk</th>
              <th className="px-3 py-2.5">Objects</th>
              <th className="px-5 py-2.5">Operator</th>
            </tr>
          </thead>
          <tbody>
            {records.map((row, i) => (
              <tr
                key={row.id}
                className={clsx(
                  'border-b border-slate-800/80 transition-colors hover:bg-runway-800/40',
                  i === 0 && 'bg-signal-cyan/5',
                )}
              >
                <td className="whitespace-nowrap px-5 py-2.5 font-mono text-xs text-slate-400">
                  {formatTime(row.timestamp)}
                </td>
                <td className="px-3 py-2.5 font-mono text-xs text-slate-300">{row.runway}</td>
                <td className="px-3 py-2.5">
                  <span
                    className={clsx(
                      'font-mono font-bold',
                      row.safetyScore >= 85
                        ? 'text-signal-green'
                        : row.safetyScore >= 60
                          ? 'text-signal-amber'
                          : 'text-signal-red',
                    )}
                  >
                    {row.safetyScore}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <span
                    className={clsx(
                      'rounded px-1.5 py-0.5 font-mono text-[10px]',
                      STATUS_CONFIG[row.runway_status].color,
                      STATUS_CONFIG[row.runway_status].bg,
                    )}
                  >
                    {STATUS_CONFIG[row.runway_status].label}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <span className={RISK_CONFIG[row.risk_level].color}>
                    {RISK_CONFIG[row.risk_level].label}
                  </span>
                </td>
                <td className="px-3 py-2.5 font-mono text-xs text-slate-300">
                  {row.objectCount}
                  {row.alertCount > 0 && (
                    <span className="ml-1 text-signal-amber">({row.alertCount} alert)</span>
                  )}
                </td>
                <td className="px-5 py-2.5 text-xs text-slate-500">{row.operator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
