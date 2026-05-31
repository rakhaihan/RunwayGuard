from enum import Enum

from pydantic import BaseModel, Field

from app.schemas.common import BboxNormalized, BboxPixels


class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class RunwayStatus(str, Enum):
    CLEAR = "clear"
    ADVISORY = "advisory"
    CAUTION = "caution"
    UNSAFE = "unsafe"


class FodDetection(BaseModel):
    id: str
    label: str = "suspected_fod"
    confidence: float = Field(ge=0, le=1)
    bbox: BboxNormalized
    bbox_pixels: BboxPixels
    area_pixels: int


class RunwayAnalysisResponse(BaseModel):
    request_id: str
    upload_id: str | None = None
    filename: str | None = None
    image_width: int
    image_height: int
    detector_backend: str
    inference_ms: float
    detection_count: int
    alert_count: int
    detections: list[FodDetection]
    risk_level: RiskLevel
    runway_status: RunwayStatus
    summary: str
