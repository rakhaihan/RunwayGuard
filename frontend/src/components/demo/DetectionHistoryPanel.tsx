import { History, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { STATUS_CONFIG, RISK_CONFIG } from '@/lib/constants';
import type { HistoryEntry } from '@/types/history';

interface DetectionHistoryPanelProps {
  history: HistoryEntry[];
  onClear?: () => void;
  activeId?: string | null;
}

export function DetectionHistoryPanel({
  history,
  onClear,
  activeId,
}: DetectionHistoryPanelProps) {
  return (
    <section className="glass-panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-signal-cyan" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Detection History
          </h2>
        </div>
        {history.length > 0 && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="rounded p-1 text-slate-500 hover:bg-runway-800 hover:text-slate-300"
            title="Clear history"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="py-4 text-center text-sm text-slate-500">
          Scan history appears after your first analysis.
        </p>
      ) : (
        <ul className="max-h-48 space-y-2 overflow-y-auto pr-1">
          {history.map((entry) => (
            <li
              key={entry.id}
              className={clsx(
                'rounded-lg border px-3 py-2 text-xs transition',
                entry.id === activeId
                  ? 'border-signal-cyan/40 bg-signal-cyan/5'
                  : 'border-slate-700/60 bg-runway-800/40',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-medium text-slate-200">
                  {entry.filename ?? 'Runway scan'}
                </span>
                <span className="font-mono font-bold text-signal-cyan">
                  {entry.safetyScore}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-2 font-mono text-[10px] text-slate-500">
                <span>{formatTime(entry.timestamp)}</span>
                <span className={STATUS_CONFIG[entry.runway_status].color}>
                  {STATUS_CONFIG[entry.runway_status].label}
                </span>
                <span className={RISK_CONFIG[entry.risk_level].color}>
                  {entry.detection_count} obj
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
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
