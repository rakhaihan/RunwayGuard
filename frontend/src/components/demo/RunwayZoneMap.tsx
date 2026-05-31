import { Map } from 'lucide-react';
import clsx from 'clsx';
import { countByZone, zoneFromY } from '@/lib/demoStats';
import type { FodDetection } from '@/types/detection';

interface RunwayZoneMapProps {
  detections: FodDetection[];
}

const ZONES = [
  { id: 'touchdown' as const, label: 'TDZ', y: 0.12, h: 0.28 },
  { id: 'midfield' as const, label: 'MID', y: 0.4, h: 0.28 },
  { id: 'departure' as const, label: 'DEP', y: 0.68, h: 0.28 },
];

export function RunwayZoneMap({ detections }: RunwayZoneMapProps) {
  const zoneCounts = countByZone(detections);

  return (
    <section className="glass-panel p-4">
      <div className="mb-3 flex items-center gap-2">
        <Map className="h-4 w-4 text-signal-blue" />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Runway Zone Map
        </h2>
      </div>

      <div className="relative mx-auto aspect-[1/2.2] max-w-[140px]">
        <svg viewBox="0 0 100 220" className="h-full w-full">
          <rect x="25" y="5" width="50" height="210" rx="8" fill="#111827" stroke="#334155" strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="210" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

          {ZONES.map((z) => (
            <g key={z.id}>
              <rect
                x="28"
                y={z.y * 220}
                width="44"
                height={z.h * 220}
                fill={
                  zoneCounts[z.id] > 0
                    ? 'rgba(34, 211, 238, 0.08)'
                    : 'rgba(30, 41, 59, 0.3)'
                }
                stroke={zoneCounts[z.id] > 0 ? 'rgba(34, 211, 238, 0.35)' : 'rgba(51, 65, 85, 0.5)'}
                strokeWidth="1"
              />
              <text
                x="50"
                y={z.y * 220 + z.h * 110}
                textAnchor="middle"
                fill="#64748b"
                fontSize="8"
                fontFamily="monospace"
              >
                {z.label}
              </text>
            </g>
          ))}

          {detections.map((d, i) => {
            const cx = 50 + (d.bbox.x + d.bbox.w / 2 - 0.5) * 40;
            const cy = 10 + (d.bbox.y + d.bbox.h / 2) * 200;
            const zone = zoneFromY(d.bbox.y + d.bbox.h / 2);
            return (
              <circle
                key={d.id}
                cx={cx}
                cy={cy}
                r="3"
                className={clsx('zone-dot', zoneCounts[zone] > 0 && 'zone-dot-pulse')}
                fill={
                  d.confidence >= 0.6
                    ? '#f97316'
                    : d.confidence >= 0.4
                      ? '#fbbf24'
                      : '#22d3ee'
                }
                opacity={0.9}
              >
                <title>
                  {d.label} #{i + 1}
                </title>
              </circle>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1 text-center font-mono text-[10px]">
        {ZONES.map((z) => (
          <div key={z.id} className="rounded border border-slate-700/60 bg-runway-800/50 py-1">
            <p className="text-slate-500">{z.label}</p>
            <p className="font-semibold text-slate-200">{zoneCounts[z.id]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
