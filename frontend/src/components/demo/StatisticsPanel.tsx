import { BarChart3 } from 'lucide-react';
import type { DemoStatistics } from '@/lib/demoStats';

interface StatisticsPanelProps {
  stats: DemoStatistics;
  currentScore?: number;
}

export function StatisticsPanel({ stats, currentScore }: StatisticsPanelProps) {
  const items = [
    { label: 'Total Scans', value: stats.totalScans },
    { label: 'Avg Safety', value: stats.totalScans ? `${stats.averageSafetyScore}` : '—' },
    { label: 'FOD Objects', value: stats.totalObjectsDetected },
    { label: 'Avg Scan', value: stats.totalScans ? `${stats.averageInferenceMs}ms` : '—' },
    { label: 'Today', value: stats.scansToday },
    { label: 'Critical', value: stats.criticalAlerts },
  ];

  return (
    <section className="glass-panel p-4">
      <div className="mb-3 flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-signal-cyan" />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Statistics
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-slate-700/60 bg-runway-800/50 px-2 py-2 text-center"
          >
            <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
              {item.label}
            </p>
            <p className="font-mono text-sm font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
      {currentScore !== undefined && currentScore > 0 && (
        <p className="mt-2 text-center font-mono text-[10px] text-slate-500">
          Current scan score: <span className="text-signal-cyan">{currentScore}</span>
        </p>
      )}
    </section>
  );
}
