import { useMemo } from 'react';
import { BarChart2 } from 'lucide-react';
import { getMockAviationAnalytics } from '@/lib/mockAnalytics';
import { AnalyticsDetectionHistory } from './AnalyticsDetectionHistory';
import { AnalyticsSafetyScore } from './AnalyticsSafetyScore';
import { DailyDetectionCount } from './DailyDetectionCount';
import { RiskDistributionChart } from './RiskDistributionChart';
import { WeeklyTrendChart } from './WeeklyTrendChart';

export function AviationAnalyticsModule() {
  const analytics = useMemo(() => getMockAviationAnalytics(), []);

  return (
    <section className="space-y-4" aria-labelledby="aviation-analytics-heading">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-signal-cyan" />
          <div>
            <h2
              id="aviation-analytics-heading"
              className="text-sm font-bold uppercase tracking-widest text-slate-200"
            >
              Aviation Analytics
            </h2>
            <p className="font-mono text-[10px] text-slate-500">
              Operational intelligence · simulated airside dataset
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 font-mono text-[10px]">
          <span className="rounded border border-slate-700 bg-runway-800 px-2 py-1 text-slate-400">
            CGK TWR SECTOR (MOCK)
          </span>
          <span className="rounded border border-signal-amber/40 bg-signal-amber/10 px-2 py-1 text-signal-amber">
            LIVE SCAN BELOW
          </span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnalyticsSafetyScore data={analytics.safetyScore} />
        </div>
        <DailyDetectionCount data={analytics.dailyCounts} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <WeeklyTrendChart data={analytics.weeklyTrend} />
        <RiskDistributionChart data={analytics.riskDistribution} />
      </div>

      <AnalyticsDetectionHistory records={analytics.history} />
    </section>
  );
}
