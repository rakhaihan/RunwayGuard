import { useCallback, useState } from 'react';
import { ApiError } from '@/services/api/client';
import { analyzeRunwayImage } from '@/services/api/runway';
import type { RunwayAnalysisResult } from '@/types/detection';

export function useRunwayAnalysis() {
  const [result, setResult] = useState<RunwayAnalysisResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const revokePreview = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const analyze = useCallback(
    async (file: File) => {
      setLoading(true);
      setError(null);
      revokePreview();
      setPreviewUrl(URL.createObjectURL(file));

      try {
        const data = await analyzeRunwayImage(file);
        setResult(data);
      } catch (err) {
        setResult(null);
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Analysis failed. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    },
    [revokePreview],
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    revokePreview();
    setPreviewUrl(null);
  }, [revokePreview]);

  return { result, previewUrl, loading, error, analyze, reset };
}
