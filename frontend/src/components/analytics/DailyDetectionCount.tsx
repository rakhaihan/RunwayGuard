import { CalendarDays } from 'lucide-react';
import type { DailyDetectionPoint } from '@/types/analytics';

interface DailyDetectionCountProps {
  data: DailyDetectionPoint[];
}

export function DailyDetectionCount({ data }: DailyDetectionCountProps) {
  const max = Math.max(...data.map((d) => d.detections), 1);
  const total = data.reduce((s, d) => s + d.detections, 0);
  const alertTotal = data.reduce((s, d) => s + d.alerts, 0);

  return (
    <section className="glass-panel h-full p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-signal-blue" />
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Daily Detection Count
          </h3>
        </div>
        <span className="font-mono text-xs text-slate-500">Last 7 days</span>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <Kpi label="Total scans" value={total} />
        <Kpi label="Alerts" value={alertTotal} accent />
      </div>

      <div className="flex h-32 items-end justify-between gap-2">
        {data.map((day) => (
          <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
            <div className="relative flex w-full flex-1 items-end justify-center">
              <div
                className="w-full max-w-[28px] rounded-t bg-gradient-to-t from-signal-cyan/90 to-signal-blue/60 transition-all"
                style={{
                  height: `${(day.detections / max) * 100}%`,
                  minHeight: day.detections > 0 ? 8 : 2,
                }}
                title={`${day.detections} detections, ${day.alerts} alerts`}
              />
              {day.alerts > 0 && (
                <div
                  className="absolute -top-1 right-0 h-1.5 w-1.5 rounded-full bg-signal-amber"
                  title={`${day.alerts} alerts`}
                />
              )}
            </div>
            <span className="font-mono text-[9px] text-slate-500">{day.label}</span>
            <span className="font-mono text-[10px] font-semibold text-slate-300">
              {day.detections}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Kpi({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-slate-700/60 bg-runway-800/50 px-3 py-2">
      <p className="font-mono text-[9px] uppercase text-slate-500">{label}</p>
      <p
        className={`font-mono text-lg font-bold ${accent ? 'text-signal-amber' : 'text-white'}`}
      >
        {value}
      </p>
    </div>
  );
}
