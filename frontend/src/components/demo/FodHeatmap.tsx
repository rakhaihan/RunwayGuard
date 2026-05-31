import { Flame } from 'lucide-react';
import clsx from 'clsx';
import { buildHeatmapGrid } from '@/lib/demoStats';
import type { FodDetection } from '@/types/detection';

interface FodHeatmapProps {
  detections: FodDetection[];
}

export function FodHeatmap({ detections }: FodHeatmapProps) {
  const grid = buildHeatmapGrid(detections);
  const hasData = detections.length > 0;

  return (
    <section className="glass-panel p-4">
      <div className="mb-3 flex items-center gap-2">
        <Flame className="h-4 w-4 text-signal-orange" />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          FOD Heatmap
        </h2>
      </div>

      {!hasData ? (
        <div className="flex h-28 items-center justify-center rounded-lg border border-dashed border-slate-700 text-sm text-slate-500">
          No heat signature yet
        </div>
      ) : (
        <div
          className="grid gap-0.5 rounded-lg border border-slate-700/80 bg-runway-950 p-2"
          style={{
            gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
          }}
        >
          {grid.map((row, ri) =>
            row.map((intensity, ci) => (
              <div
                key={`${ri}-${ci}`}
                className={clsx(
                  'aspect-square min-h-[14px] rounded-sm transition-colors',
                  intensity > 0 && 'heatmap-cell',
                )}
                style={{
                  backgroundColor:
                    intensity > 0
                      ? `rgba(249, 115, 22, ${0.15 + intensity * 0.85})`
                      : 'rgba(30, 41, 59, 0.4)',
                  boxShadow:
                    intensity > 0.6 ? '0 0 8px rgba(251, 191, 36, 0.4)' : undefined,
                }}
                title={intensity > 0 ? `Intensity ${(intensity * 100).toFixed(0)}%` : undefined}
              />
            )),
          )}
        </div>
      )}
      <p className="mt-2 font-mono text-[10px] text-slate-600">
        Density map · runway image coordinates
      </p>
    </section>
  );
}
