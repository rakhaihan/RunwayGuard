import type { HistoryEntry } from '@/types/history';
import type { FodDetection } from '@/types/detection';

export interface DemoStatistics {
  totalScans: number;
  averageSafetyScore: number;
  totalObjectsDetected: number;
  averageInferenceMs: number;
  scansToday: number;
  criticalAlerts: number;
}

export function computeStatistics(history: HistoryEntry[]): DemoStatistics {
  if (history.length === 0) {
    return {
      totalScans: 0,
      averageSafetyScore: 0,
      totalObjectsDetected: 0,
      averageInferenceMs: 0,
      scansToday: 0,
      criticalAlerts: 0,
    };
  }

  const today = new Date().toDateString();
  const scansToday = history.filter(
    (h) => new Date(h.timestamp).toDateString() === today,
  ).length;

  return {
    totalScans: history.length,
    averageSafetyScore: Math.round(
      history.reduce((s, h) => s + h.safetyScore, 0) / history.length,
    ),
    totalObjectsDetected: history.reduce((s, h) => s + h.detection_count, 0),
    averageInferenceMs: Math.round(
      history.reduce((s, h) => s + h.inference_ms, 0) / history.length,
    ),
    scansToday,
    criticalAlerts: history.filter(
      (h) => h.risk_level === 'critical' || h.runway_status === 'unsafe',
    ).length,
  };
}

/** Build heatmap grid intensities from detection centers (normalized 0–1). */
export function buildHeatmapGrid(
  detections: FodDetection[],
  cols = 14,
  rows = 8,
): number[][] {
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (const d of detections) {
    const cx = d.bbox.x + d.bbox.w / 2;
    const cy = d.bbox.y + d.bbox.h / 2;
    const col = Math.min(cols - 1, Math.max(0, Math.floor(cx * cols)));
    const row = Math.min(rows - 1, Math.max(0, Math.floor(cy * rows)));
    grid[row][col] += d.confidence;
  }

  const max = Math.max(...grid.flat(), 0.01);
  return grid.map((row) => row.map((v) => v / max));
}

export type RunwayZone = 'touchdown' | 'midfield' | 'departure';

export function zoneFromY(normalizedY: number): RunwayZone {
  if (normalizedY < 0.33) return 'touchdown';
  if (normalizedY < 0.66) return 'midfield';
  return 'departure';
}

export function countByZone(detections: FodDetection[]): Record<RunwayZone, number> {
  const counts: Record<RunwayZone, number> = {
    touchdown: 0,
    midfield: 0,
    departure: 0,
  };
  for (const d of detections) {
    const cy = d.bbox.y + d.bbox.h / 2;
    counts[zoneFromY(cy)] += 1;
  }
  return counts;
}
