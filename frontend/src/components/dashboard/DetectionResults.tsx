import clsx from 'clsx';
import { Crosshair, Timer } from 'lucide-react';
import { formatArea, formatConfidence, formatLabel, formatMs } from '@/lib/format';
import type { FodDetection, RunwayAnalysisResult } from '@/types/detection';

interface DetectionResultsProps {
  result: RunwayAnalysisResult | null;
  previewUrl: string | null;
  loading: boolean;
}

export function DetectionResults({ result, previewUrl, loading }: DetectionResultsProps) {
  return (
    <section className="glass-panel flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Detection Results
        </h2>
        {result && (
          <div className="flex items-center gap-3 font-mono text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Timer className="h-3 w-3" />
              {formatMs(result.inference_ms)}
            </span>
            <span>
              {result.image_width}×{result.image_height}
            </span>
          </div>
        )}
      </div>

      <div className="grid flex-1 gap-0 lg:grid-cols-2">
        <div className="relative min-h-[240px] border-b border-slate-800 bg-runway-950 lg:min-h-[320px] lg:border-b-0 lg:border-r">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-runway-950/80">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-signal-cyan border-t-transparent" />
            </div>
          )}
          {previewUrl ? (
            <ImageWithOverlay previewUrl={previewUrl} detections={result?.detections ?? []} />
          ) : (
            <EmptyPreview />
          )}
        </div>

        <div className="max-h-[360px] overflow-y-auto p-4 lg:max-h-none">
          {result && result.detections.length > 0 ? (
            <ul className="space-y-2">
              {result.detections.map((det, i) => (
                <DetectionRow key={det.id} detection={det} index={i} />
              ))}
            </ul>
          ) : result ? (
            <p className="py-8 text-center text-sm text-slate-500">
              No objects detected in this scan.
            </p>
          ) : (
            <p className="py-8 text-center text-sm text-slate-500">
              Results will appear here after analysis.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function ImageWithOverlay({
  previewUrl,
  detections,
}: {
  previewUrl: string;
  detections: FodDetection[];
}) {
  return (
    <div className="relative flex h-full min-h-[240px] items-center justify-center p-3 lg:min-h-[320px]">
      <div className="relative inline-block max-h-full max-w-full">
        <img
          src={previewUrl}
          alt="Runway scan"
          className="block max-h-[300px] w-auto max-w-full rounded-lg object-contain lg:max-h-[400px]"
        />
        <svg
          className="pointer-events-none absolute left-0 top-0 h-full w-full rounded-lg"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
        >
          {detections.map((d) => (
            <rect
              key={d.id}
              x={d.bbox.x}
              y={d.bbox.y}
              width={d.bbox.w}
              height={d.bbox.h}
              fill="none"
              stroke="rgba(34, 211, 238, 0.9)"
              strokeWidth={0.002}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

function EmptyPreview() {
  return (
    <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-2 text-slate-600 lg:min-h-[320px]">
      <Crosshair className="h-10 w-10 text-slate-700" aria-hidden />
      <p className="text-sm">Runway imagery preview</p>
    </div>
  );
}

function DetectionRow({ detection, index }: { detection: FodDetection; index: number }) {
  const isAlert = detection.confidence >= 0.5;

  return (
    <li
      className={clsx(
        'rounded-lg border px-3 py-2.5',
        isAlert
          ? 'border-signal-cyan/30 bg-signal-cyan/5'
          : 'border-slate-700/60 bg-runway-800/50',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-white">
            {formatLabel(detection.label)} #{index + 1}
          </p>
          <p className="font-mono text-[10px] text-slate-500">
            ({detection.bbox_pixels.x}, {detection.bbox_pixels.y}) ·{' '}
            {detection.bbox_pixels.w}×{detection.bbox_pixels.h}
          </p>
        </div>
        <span
          className={clsx(
            'shrink-0 rounded px-2 py-0.5 font-mono text-xs font-semibold',
            isAlert ? 'bg-signal-cyan/20 text-signal-cyan' : 'bg-slate-700 text-slate-300',
          )}
        >
          {formatConfidence(detection.confidence)}
        </span>
      </div>
      <p className="mt-1 text-xs text-slate-500">Area: {formatArea(detection.area_pixels)}</p>
    </li>
  );
}
