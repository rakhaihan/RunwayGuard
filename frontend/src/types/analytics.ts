import type { RiskLevel, RunwayStatus } from './detection';

export interface MockSafetyScore {
  current: number;
  previous: number;
  change: number;
  sevenDayTrend: number[];
  runwayId: string;
  lastUpdated: string;
}

export interface MockHistoryRecord {
  id: string;
  timestamp: string;
  runway: string;
  safetyScore: number;
  runway_status: RunwayStatus;
  risk_level: RiskLevel;
  objectCount: number;
  alertCount: number;
  operator: string;
}

export interface DailyDetectionPoint {
  date: string;
  label: string;
  detections: number;
  alerts: number;
}

export interface WeeklyTrendPoint {
  weekLabel: string;
  scans: number;
  avgSafetyScore: number;
  fodIncidents: number;
}

export interface RiskDistributionSlice {
  level: RiskLevel;
  label: string;
  count: number;
  color: string;
}

export interface AviationAnalyticsData {
  safetyScore: MockSafetyScore;
  history: MockHistoryRecord[];
  dailyCounts: DailyDetectionPoint[];
  weeklyTrend: WeeklyTrendPoint[];
  riskDistribution: RiskDistributionSlice[];
}
