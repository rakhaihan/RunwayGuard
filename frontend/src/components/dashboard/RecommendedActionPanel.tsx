import { ClipboardList } from 'lucide-react';
import { RECOMMENDED_ACTIONS } from '@/lib/constants';
import type { RunwayStatus } from '@/types/detection';

interface RecommendedActionPanelProps {
  runwayStatus: RunwayStatus | null;
}

export function RecommendedActionPanel({ runwayStatus }: RecommendedActionPanelProps) {
  const actions = runwayStatus ? RECOMMENDED_ACTIONS[runwayStatus] : null;

  return (
    <section className="glass-panel h-full p-5">
      <div className="mb-4 flex items-center gap-2">
        <ClipboardList className="h-4 w-4 text-signal-cyan" aria-hidden />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Recommended Actions
        </h2>
      </div>

      {actions ? (
        <ol className="space-y-3">
          {actions.map((action, index) => (
            <li
              key={index}
              className="flex gap-3 rounded-lg border border-slate-700/60 bg-runway-800/50 px-3 py-2.5 text-sm text-slate-300"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-signal-cyan/30 bg-signal-cyan/10 font-mono text-xs font-semibold text-signal-cyan">
                {index + 1}
              </span>
              <span className="leading-relaxed">{action}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-sm text-slate-500">
          Operational guidance will appear after runway analysis completes.
        </p>
      )}

      <p className="mt-4 border-t border-slate-800 pt-3 font-mono text-[10px] text-slate-600">
        Prototype output — not certified for operational use.
      </p>
    </section>
  );
}
