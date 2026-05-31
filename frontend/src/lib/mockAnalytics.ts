import type { AviationAnalyticsData } from '@/types/analytics';

/** Operational mock dataset for aviation analytics dashboard. */
export function getMockAviationAnalytics(): AviationAnalyticsData {
  const now = new Date();

  return {
    safetyScore: {
      current: 87,
      previous: 82,
      change: 5,
      sevenDayTrend: [79, 81, 84, 80, 85, 83, 87],
      runwayId: 'RWY 09/27 — Soekarno-Hatta (mock)',
      lastUpdated: now.toISOString(),
    },
    history: [
      {
        id: 'ops-2401',
        timestamp: daysAgo(0, 6, 15),
        runway: 'RWY 09/27',
        safetyScore: 87,
        runway_status: 'advisory',
        risk_level: 'medium',
        objectCount: 2,
        alertCount: 1,
        operator: 'RunwayGuard AI',
      },
      {
        id: 'ops-2400',
        timestamp: daysAgo(0, 4, 30),
        runway: 'RWY 09/27',
        safetyScore: 94,
        runway_status: 'clear',
        risk_level: 'low',
        objectCount: 0,
        alertCount: 0,
        operator: 'RunwayGuard AI',
      },
      {
        id: 'ops-2399',
        timestamp: daysAgo(1, 14, 0),
        runway: 'RWY 09/27',
        safetyScore: 72,
        runway_status: 'caution',
        risk_level: 'high',
        objectCount: 4,
        alertCount: 3,
        operator: 'Ground Ops — Team B',
      },
      {
        id: 'ops-2398',
        timestamp: daysAgo(1, 8, 45),
        runway: 'RWY 09/27',
        safetyScore: 91,
        runway_status: 'clear',
        risk_level: 'low',
        objectCount: 1,
        alertCount: 0,
        operator: 'RunwayGuard AI',
      },
      {
        id: 'ops-2397',
        timestamp: daysAgo(2, 16, 20),
        runway: 'RWY 09/27',
        safetyScore: 58,
        runway_status: 'unsafe',
        risk_level: 'critical',
        objectCount: 6,
        alertCount: 5,
        operator: 'RunwayGuard AI',
      },
      {
        id: 'ops-2396',
        timestamp: daysAgo(2, 7, 10),
        runway: 'RWY 09/27',
        safetyScore: 88,
        runway_status: 'advisory',
        risk_level: 'medium',
        objectCount: 2,
        alertCount: 1,
        operator: 'RunwayGuard AI',
      },
      {
        id: 'ops-2395',
        timestamp: daysAgo(3, 11, 0),
        runway: 'RWY 09/27',
        safetyScore: 95,
        runway_status: 'clear',
        risk_level: 'low',
        objectCount: 0,
        alertCount: 0,
        operator: 'Night Patrol',
      },
      {
        id: 'ops-2394',
        timestamp: daysAgo(4, 9, 30),
        runway: 'RWY 09/27',
        safetyScore: 81,
        runway_status: 'advisory',
        risk_level: 'medium',
        objectCount: 3,
        alertCount: 2,
        operator: 'RunwayGuard AI',
      },
    ],
    dailyCounts: [
      { date: daysAgoDate(6), label: 'Mon', detections: 12, alerts: 3 },
      { date: daysAgoDate(5), label: 'Tue', detections: 8, alerts: 1 },
      { date: daysAgoDate(4), label: 'Wed', detections: 15, alerts: 5 },
      { date: daysAgoDate(3), label: 'Thu', detections: 10, alerts: 2 },
      { date: daysAgoDate(2), label: 'Fri', detections: 18, alerts: 6 },
      { date: daysAgoDate(1), label: 'Sat', detections: 6, alerts: 1 },
      { date: daysAgoDate(0), label: 'Sun', detections: 14, alerts: 4 },
    ],
    weeklyTrend: [
      { weekLabel: 'W1 Jan', scans: 42, avgSafetyScore: 78, fodIncidents: 8 },
      { weekLabel: 'W2 Jan', scans: 51, avgSafetyScore: 81, fodIncidents: 6 },
      { weekLabel: 'W3 Jan', scans: 48, avgSafetyScore: 84, fodIncidents: 5 },
      { weekLabel: 'W4 Jan', scans: 55, avgSafetyScore: 82, fodIncidents: 7 },
      { weekLabel: 'W1 Feb', scans: 60, avgSafetyScore: 85, fodIncidents: 4 },
      { weekLabel: 'W2 Feb', scans: 58, avgSafetyScore: 86, fodIncidents: 3 },
    ],
    riskDistribution: [
      { level: 'low', label: 'Low', count: 142, color: '#34d399' },
      { level: 'medium', label: 'Medium', count: 48, color: '#fbbf24' },
      { level: 'high', label: 'High', count: 18, color: '#f97316' },
      { level: 'critical', label: 'Critical', count: 5, color: '#ef4444' },
    ],
  };
}

function daysAgo(dayOffset: number, hour: number, minute: number): string {
  const d = new Date();
  d.setDate(d.getDate() - dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function daysAgoDate(dayOffset: number): string {
  const d = new Date();
  d.setDate(d.getDate() - dayOffset);
  return d.toISOString().slice(0, 10);
}
