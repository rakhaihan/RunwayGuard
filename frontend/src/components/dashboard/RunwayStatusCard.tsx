import { Activity } from 'lucide-react';
import clsx from 'clsx';
import { STATUS_CONFIG } from '@/lib/constants';
import type { RunwayStatus } from '@/types/detection';

interface RunwayStatusCardProps {
  status: RunwayStatus | null;
  summary?: string | null;
}

export function RunwayStatusCard({ status, summary }: RunwayStatusCardProps) {
  const config = status ? STATUS_CONFIG[status] : null;

  return (
    <section className="glass-panel flex h-full flex-col p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Runway Status
        </h2>
        <Activity className="h-4 w-4 text-signal-cyan/70" aria-hidden />
      </div>

      {config ? (
        <>
          <div
            className={clsx(
              'mb-3 inline-flex items-center gap-2 self-start rounded-lg border px-3 py-2',
              config.bg,
              config.border,
            )}
          >
            <span className={clsx('h-2.5 w-2.5 rounded-full', config.dot)} />
            <span className={clsx('text-2xl font-bold', config.color)}>
              {config.label}
            </span>
          </div>
          {summary && (
            <p className="text-sm leading-relaxed text-slate-400">{summary}</p>
          )}
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center text-slate-500">
          <p className="text-lg font-medium text-slate-400">Awaiting Scan</p>
          <p className="mt-1 text-sm">Upload a runway image to assess status</p>
        </div>
      )}
    </section>
  );
}
