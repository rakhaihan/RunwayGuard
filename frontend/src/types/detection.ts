export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type RunwayStatus = 'clear' | 'advisory' | 'caution' | 'unsafe';

export interface BboxNormalized {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface BboxPixels {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface FodDetection {
  id: string;
  label: string;
  confidence: number;
  bbox: BboxNormalized;
  bbox_pixels: BboxPixels;
  area_pixels: number;
}

export interface RunwayAnalysisResult {
  request_id: string;
  upload_id?: string | null;
  filename?: string | null;
  image_width: number;
  image_height: number;
  detector_backend: string;
  inference_ms: number;
  detection_count: number;
  alert_count: number;
  detections: FodDetection[];
  risk_level: RiskLevel;
  runway_status: RunwayStatus;
  summary: string;
}

export interface HealthStatus {
  status: string;
  app_name: string;
  version: string;
  detector_backend: string;
}
