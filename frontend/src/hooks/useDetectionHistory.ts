import { useCallback, useEffect, useState } from 'react';
import { computeSafetyScore } from '@/lib/safetyScore';
import type { RunwayAnalysisResult } from '@/types/detection';
import type { HistoryEntry } from '@/types/history';

const STORAGE_KEY = 'runwayguard_detection_history';
const MAX_ENTRIES = 12;

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    return [];
  }
}

function saveHistory(entries: HistoryEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
}

export function useDetectionHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const addEntry = useCallback((result: RunwayAnalysisResult) => {
    const entry: HistoryEntry = {
      id: result.request_id,
      timestamp: new Date().toISOString(),
      filename: result.filename ?? null,
      safetyScore: computeSafetyScore(result),
      risk_level: result.risk_level,
      runway_status: result.runway_status,
      detection_count: result.detection_count,
      alert_count: result.alert_count,
      inference_ms: result.inference_ms,
      request_id: result.request_id,
    };

    setHistory((prev) => {
      const next = [entry, ...prev.filter((e) => e.id !== entry.id)].slice(0, MAX_ENTRIES);
      saveHistory(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }, []);

  const latest = history[0] ?? null;

  return { history, latest, addEntry, clearHistory };
}
