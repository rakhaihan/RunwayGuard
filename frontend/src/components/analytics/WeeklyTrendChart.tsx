import { TrendingUp } from 'lucide-react';
import type { WeeklyTrendPoint } from '@/types/analytics';

interface WeeklyTrendChartProps {
  data: WeeklyTrendPoint[];
}

const W = 400;
const H = 140;
const PAD = { top: 12, right: 12, bottom: 28, left: 36 };

export function WeeklyTrendChart({ data }: WeeklyTrendChartProps) {
  const maxScans = Math.max(...data.map((d) => d.scans), 1);
  const maxScore = 100;
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const points = data.map((d, i) => {
    const x = PAD.left + (i / Math.max(data.length - 1, 1)) * chartW;
    const yScan =
      PAD.top + chartH - (d.scans / maxScans) * chartH * 0.85;
    const yScore = PAD.top + chartH - (d.avgSafetyScore / maxScore) * chartH;
    return { ...d, x, yScan, yScore };
  });

  const scanLine = points.map((p) => `${p.x},${p.yScan}`).join(' ');
  const scoreLine = points.map((p) => `${p.x},${p.yScore}`).join(' ');

  return (
    <section className="glass-panel p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-signal-cyan" />
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Weekly Trend
          </h3>
        </div>
        <div className="flex gap-3 font-mono text-[10px]">
          <span className="flex items-center gap-1 text-slate-400">
            <span className="h-0.5 w-4 bg-signal-cyan" /> Scans
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <span className="h-0.5 w-4 border-t border-dashed border-signal-green" /> Avg score
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Weekly runway scan and safety score trend"
      >
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = PAD.top + chartH * (1 - t);
          return (
            <line
              key={t}
              x1={PAD.left}
              y1={y}
              x2={W - PAD.right}
              y2={y}
              stroke="rgba(51,65,85,0.5)"
              strokeWidth="1"
            />
          );
        })}

        <polyline
          points={scanLine}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {points.map((p) => (
          <circle key={p.weekLabel} cx={p.x} cy={p.yScan} r="3" fill="#22d3ee" />
        ))}

        <polyline
          points={scoreLine}
          fill="none"
          stroke="#34d399"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          strokeLinejoin="round"
        />

        {points.map((p) => (
          <text
            key={`lbl-${p.weekLabel}`}
            x={p.x}
            y={H - 8}
            textAnchor="middle"
            fill="#64748b"
            fontSize="7"
            fontFamily="ui-monospace, monospace"
          >
            {p.weekLabel}
          </text>
        ))}
      </svg>

      <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-[10px] text-slate-500">
        <span>Peak: {Math.max(...data.map((d) => d.scans))} scans/wk</span>
        <span className="text-center">
          Avg score:{' '}
          {Math.round(
            data.reduce((s, d) => s + d.avgSafetyScore, 0) / data.length,
          )}
        </span>
        <span className="text-right">
          Incidents: {data.reduce((s, d) => s + d.fodIncidents, 0)} total
        </span>
      </div>
    </section>
  );
}
