import { PieChart } from 'lucide-react';
import clsx from 'clsx';
import type { RiskDistributionSlice } from '@/types/analytics';

interface RiskDistributionChartProps {
  data: RiskDistributionSlice[];
}

export function RiskDistributionChart({ data }: RiskDistributionChartProps) {
  const total = data.reduce((s, d) => s + d.count, 0);

  let cumulative = 0;
  const segments = data.map((slice) => {
    const start = (cumulative / total) * 100;
    cumulative += slice.count;
    const end = (cumulative / total) * 100;
    return { ...slice, start, end, percent: Math.round((slice.count / total) * 100) };
  });

  const gradient = segments
    .map((s) => `${s.color} ${s.start}% ${s.end}%`)
    .join(', ');

  return (
    <section className="glass-panel p-5">
      <div className="mb-4 flex items-center gap-2">
        <PieChart className="h-4 w-4 text-signal-amber" />
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Risk Distribution
        </h3>
        <span className="ml-auto font-mono text-[10px] text-slate-500">
          {total} events (90d)
        </span>
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div
          className="relative h-32 w-32 shrink-0 rounded-full"
          style={{ background: `conic-gradient(${gradient})` }}
          role="img"
          aria-label="Risk level distribution chart"
        >
          <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-runway-900">
            <span className="font-mono text-2xl font-bold text-white">{total}</span>
            <span className="font-mono text-[9px] text-slate-500">events</span>
          </div>
        </div>

        <ul className="w-full flex-1 space-y-2">
          {segments.map((slice) => (
            <li key={slice.level}>
              <div className="mb-1 flex justify-between font-mono text-xs">
                <span className="flex items-center gap-2 text-slate-300">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: slice.color }}
                  />
                  {slice.label}
                </span>
                <span className="text-slate-400">
                  {slice.count}{' '}
                  <span className="text-slate-600">({slice.percent}%)</span>
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-runway-800">
                <div
                  className={clsx('h-full rounded-full transition-all')}
                  style={{
                    width: `${slice.percent}%`,
                    backgroundColor: slice.color,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
