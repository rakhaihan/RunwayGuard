import type { RiskLevel, RunwayStatus } from './detection';

export interface HistoryEntry {
  id: string;
  timestamp: string;
  filename: string | null;
  safetyScore: number;
  risk_level: RiskLevel;
  runway_status: RunwayStatus;
  detection_count: number;
  alert_count: number;
  inference_ms: number;
  request_id: string;
}
