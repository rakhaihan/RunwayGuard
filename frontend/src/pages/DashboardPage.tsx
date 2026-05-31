import {
  AlertBanner,
  DetectionResults,
  Header,
  RecommendedActionPanel,
  RiskLevelCard,
  RunwayStatusCard,
  UploadPanel,
} from '@/components/dashboard';
import { useHealth } from '@/hooks/useHealth';
import { useRunwayAnalysis } from '@/hooks/useRunwayAnalysis';

export function DashboardPage() {
  const { health, online } = useHealth();
  const { result, previewUrl, loading, error, analyze, reset } = useRunwayAnalysis();

  return (
    <div className="min-h-screen bg-runway-950">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-signal-cyan/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl space-y-4 px-4 py-6 sm:px-6 lg:py-8">
        <Header
          online={online}
          version={health?.version}
          detectorBackend={health?.detector_backend}
        />

        <AlertBanner
          runwayStatus={result?.runway_status ?? null}
          riskLevel={result?.risk_level ?? null}
          alertCount={result?.alert_count ?? 0}
          summary={result?.summary}
        />

        <div className="grid gap-4 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <UploadPanel
              onAnalyze={analyze}
              onReset={reset}
              loading={loading}
              error={error}
              hasResult={!!result}
            />
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
            <RecommendedActionPanel runwayStatus={result?.runway_status ?? null} />
          </div>

          <div className="lg:col-span-8">
            <DetectionResults
              result={result}
              previewUrl={previewUrl}
              loading={loading}
            />
          </div>
        </div>

        <footer className="pb-4 text-center font-mono text-[10px] text-slate-600">
          RunwayGuard AI · Foreign Object Debris Detection Prototype · Boeing BUILD Indonesia
        </footer>
      </div>
    </div>
  );
}
