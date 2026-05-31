import type { HealthStatus, RunwayAnalysisResult } from '@/types/detection';
import { apiFetch } from './client';

export async function fetchHealth(): Promise<HealthStatus> {
  return apiFetch<HealthStatus>('/health');
}

export async function analyzeRunwayImage(file: File): Promise<RunwayAnalysisResult> {
  const form = new FormData();
  form.append('file', file);

  return apiFetch<RunwayAnalysisResult>('/runway/analyze', {
    method: 'POST',
    body: form,
  });
}
