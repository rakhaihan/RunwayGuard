import { ArrowDown, ArrowUp, Gauge, Minus } from 'lucide-react';
import clsx from 'clsx';
import { safetyScoreColor, safetyScoreLabel } from '@/lib/safetyScore';
import type { MockSafetyScore } from '@/types/analytics';

interface AnalyticsSafetyScoreProps {
  data: MockSafetyScore;
}

export function AnalyticsSafetyScore({ data }: AnalyticsSafetyScoreProps) {
  const color = safetyScoreColor(data.current);
  const label = safetyScoreLabel(data.current);
  const maxTrend = Math.max(...data.sevenDayTrend, 1);

  return (
    <section className="glass-panel relative h-full overflow-hidden p-5">
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-signal-cyan/10 blur-2xl" />
      <div className="relative">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-signal-cyan" />
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Runway Safety Score
            </h3>
          </div>
          <TrendBadge change={data.change} />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div
            className={clsx(
              'relative mx-auto flex h-28 w-28 shrink-0 items-center justify-center sm:mx-0',
              color,
            )}
          >
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                strokeWidth="8"
                className="stroke-runway-700"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${data.current * 2.64} 264`}
                className="score-ring"
              />
            </svg>
            <span className="absolute font-mono text-3xl font-bold">{data.current}</span>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <p className={clsx('text-2xl font-bold', color)}>{label}</p>
            <p className="mt-1 font-mono text-xs text-slate-500">{data.runwayId}</p>
            <p className="mt-2 text-sm text-slate-400">
              7-day ops index · prev. {data.previous}{' '}
              <span className="text-signal-green">(+{data.change})</span>
            </p>
            <div className="mt-4 flex h-12 items-end justify-center gap-1 sm:justify-start">
              {data.sevenDayTrend.map((v, i) => (
                <div
                  key={i}
                  className="w-3 rounded-t bg-signal-cyan/80"
                  style={{ height: `${(v / maxTrend) * 100}%`, minHeight: 4 }}
                  title={`Day ${i + 1}: ${v}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrendBadge({ change }: { change: number }) {
  if (change > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 rounded-full bg-signal-green/15 px-2 py-0.5 font-mono text-xs text-signal-green">
        <ArrowUp className="h-3 w-3" />+{change}
      </span>
    );
  }
  if (change < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 rounded-full bg-signal-red/15 px-2 py-0.5 font-mono text-xs text-signal-red">
        <ArrowDown className="h-3 w-3" />
        {change}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full bg-slate-700/50 px-2 py-0.5 font-mono text-xs text-slate-400">
      <Minus className="h-3 w-3" />0
    </span>
  );
}
