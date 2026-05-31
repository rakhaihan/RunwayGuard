import { Gauge } from 'lucide-react';
import clsx from 'clsx';
import { safetyScoreColor, safetyScoreLabel } from '@/lib/safetyScore';

interface SafetyScoreCardProps {
  score: number;
  loading?: boolean;
}

export function SafetyScoreCard({ score, loading }: SafetyScoreCardProps) {
  const displayScore = loading ? '—' : score;
  const color = loading ? 'text-slate-500' : safetyScoreColor(score);
  const label = loading ? 'Scanning…' : safetyScoreLabel(score);

  return (
    <section className="glass-panel relative overflow-hidden p-5">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-signal-cyan/5 blur-2xl" />
      <div className="relative flex items-center gap-4">
        <div
          className="relative flex h-24 w-24 shrink-0 items-center justify-center"
          aria-hidden
        >
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-runway-700"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${score * 2.64} 264`}
              className={clsx('score-ring transition-all duration-700', color)}
            />
          </svg>
          <span className={clsx('absolute font-mono text-2xl font-bold', color)}>
            {displayScore}
          </span>
        </div>
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Gauge className="h-4 w-4 text-signal-cyan" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Runway Safety Score
            </h2>
          </div>
          <p className={clsx('text-xl font-bold', color)}>{label}</p>
          <p className="mt-1 text-sm text-slate-500">
            Composite index from FOD risk, alerts, and runway status
          </p>
        </div>
      </div>
    </section>
  );
}
