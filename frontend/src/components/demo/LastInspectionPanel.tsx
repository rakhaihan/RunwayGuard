import type { ReactNode } from 'react';
import { CalendarClock, UserCircle } from 'lucide-react';
import { STATUS_CONFIG } from '@/lib/constants';
import { formatMs } from '@/lib/format';
import type { HistoryEntry } from '@/types/history';
import type { RunwayAnalysisResult } from '@/types/detection';

interface LastInspectionPanelProps {
  latest: HistoryEntry | null;
  current: RunwayAnalysisResult | null;
}

export function LastInspectionPanel({ latest, current }: LastInspectionPanelProps) {
  const entry = latest;
  const timestamp = entry?.timestamp ?? (current ? new Date().toISOString() : null);

  if (!timestamp && !current) {
    return (
      <section className="glass-panel p-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Last Inspection
        </h2>
        <p className="mt-3 text-sm text-slate-500">No inspections recorded yet.</p>
      </section>
    );
  }

  const status = entry?.runway_status ?? current?.runway_status ?? 'clear';
  const statusCfg = STATUS_CONFIG[status];

  return (
    <section className="glass-panel p-4">
      <div className="mb-3 flex items-center gap-2">
        <CalendarClock className="h-4 w-4 text-signal-blue" />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Last Inspection
        </h2>
      </div>

      <dl className="space-y-2 text-sm">
        <Row label="Date & time" value={formatDateTime(timestamp!)} />
        <Row label="Inspector" value="RunwayGuard AI Scanner" icon={<UserCircle className="h-3.5 w-3.5" />} />
        <Row
          label="Asset"
          value={entry?.filename ?? current?.filename ?? 'Runway image'}
        />
        <Row
          label="Duration"
          value={formatMs(entry?.inference_ms ?? current?.inference_ms ?? 0)}
        />
        <Row
          label="Status"
          value={
            <span className={statusCfg.color}>{statusCfg.label}</span>
          }
        />
        {entry && (
          <Row label="Safety score" value={`${entry.safetyScore} / 100`} highlight />
        )}
      </dl>
    </section>
  );
}

function Row({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: ReactNode;
  icon?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between gap-2 border-b border-slate-800/80 py-1.5 last:border-0">
      <dt className="text-slate-500">{label}</dt>
      <dd
        className={`flex items-center gap-1 text-right font-medium ${highlight ? 'text-signal-cyan' : 'text-slate-200'}`}
      >
        {icon}
        {value}
      </dd>
    </div>
  );
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
