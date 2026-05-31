import { useEffect, useMemo, useRef } from 'react';
import {
  DetectionResults,
  Header,
  RecommendedActionPanel,
  RiskLevelCard,
  RunwayStatusCard,
  UploadPanel,
} from '@/components/dashboard';
import {
  AnimatedAlertSystem,
  DetectionHistoryPanel,
  FodHeatmap,
  LastInspectionPanel,
  RunwayZoneMap,
  SafetyScoreCard,
  StatisticsPanel,
} from '@/components/demo';
import { computeStatistics } from '@/lib/demoStats';
import { computeSafetyScore } from '@/lib/safetyScore';
import { useDetectionHistory } from '@/hooks/useDetectionHistory';
import { useHealth } from '@/hooks/useHealth';
import { useRunwayAnalysis } from '@/hooks/useRunwayAnalysis';

export function DashboardPage() {
  const { health, online } = useHealth();
  const { result, previewUrl, loading, error, analyze, reset } = useRunwayAnalysis();
  const { history, latest, addEntry, clearHistory } = useDetectionHistory();
  const lastSavedId = useRef<string | null>(null);

  const safetyScore = useMemo(() => computeSafetyScore(result), [result]);
  const stats = useMemo(() => computeStatistics(history), [history]);

  useEffect(() => {
    if (result && !loading && result.request_id !== lastSavedId.current) {
      lastSavedId.current = result.request_id;
      addEntry(result);
    }
  }, [result, loading, addEntry]);

  const handleReset = () => {
    reset();
  };

  return (
    <div className="min-h-screen bg-runway-950">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-signal-cyan/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl space-y-4 px-4 py-6 sm:px-6 lg:py-8">
        <Header
          online={online}
          version={health?.version}
          detectorBackend={health?.detector_backend}
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SafetyScoreCard score={safetyScore} loading={loading} />
          </div>
          <StatisticsPanel stats={stats} currentScore={safetyScore} />
        </div>

        <AnimatedAlertSystem
          runwayStatus={result?.runway_status ?? null}
          riskLevel={result?.risk_level ?? null}
          alertCount={result?.alert_count ?? 0}
          summary={result?.summary}
          safetyScore={safetyScore}
        />

        <div className="grid gap-4 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <UploadPanel
              onAnalyze={analyze}
              onReset={handleReset}
              loading={loading}
              error={error}
              hasResult={!!result}
            />
            <LastInspectionPanel latest={latest} current={result} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <RunwayStatusCard
                status={result?.runway_status ?? null}
                summary={result?.summary}
              />
              <RiskLevelCard
                riskLevel={result?.risk_level ?? null}
                alertCount={result?.alert_count}
                detectionCount={result?.detection_count}
              />
            </div>
            <DetectionHistoryPanel
              history={history}
              onClear={clearHistory}
              activeId={result?.request_id}
            />
            <RecommendedActionPanel runwayStatus={result?.runway_status ?? null} />
          </div>

          <div className="space-y-4 lg:col-span-5">
            <DetectionResults
              result={result}
              previewUrl={previewUrl}
              loading={loading}
            />
          </div>

          <div className="space-y-4 lg:col-span-3">
            <FodHeatmap detections={result?.detections ?? []} />
            <RunwayZoneMap detections={result?.detections ?? []} />
          </div>
        </div>

        <footer className="pb-4 text-center font-mono text-[10px] text-slate-600">
          RunwayGuard AI · Foreign Object Debris Detection Prototype · Boeing BUILD Indonesia
        </footer>
      </div>
    </div>
  );
}
