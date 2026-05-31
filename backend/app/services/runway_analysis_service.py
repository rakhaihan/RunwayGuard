import uuid

from app.core.config import Settings
from app.schemas.common import BboxNormalized, BboxPixels
from app.schemas.runway import FodDetection, RunwayAnalysisResponse
from app.utils.fod_detector import RawDetection, detect_fod_contours
from app.utils.image_io import decode_image, image_dimensions, resize_for_inference
from app.utils.risk import assess_risk_and_status
from app.utils.timing import measure_ms


class RunwayAnalysisService:
    def __init__(self, settings: Settings) -> None:
        self._settings = settings

    def analyze_bytes(
        self,
        data: bytes,
        *,
        filename: str | None = None,
        upload_id: str | None = None,
        confidence_threshold: float | None = None,
    ) -> RunwayAnalysisResponse:
        threshold = (
            confidence_threshold
            if confidence_threshold is not None
            else self._settings.confidence_threshold
        )

        image = decode_image(data)
        image = resize_for_inference(image, self._settings)
        width, height = image_dimensions(image)

        with measure_ms() as elapsed:
            raw_detections = detect_fod_contours(image, self._settings)

        fod_items = [
            self._to_fod_detection(raw, width, height, index)
            for index, raw in enumerate(raw_detections)
        ]
        alerts = [d for d in fod_items if d.confidence >= threshold]
        max_confidence = max((d.confidence for d in fod_items), default=0.0)

        risk_level, runway_status, summary = assess_risk_and_status(
            alert_count=len(alerts),
            max_confidence=max_confidence,
            detection_count=len(fod_items),
        )

        return RunwayAnalysisResponse(
            request_id=str(uuid.uuid4()),
            upload_id=upload_id,
            filename=filename,
            image_width=width,
            image_height=height,
            detector_backend=self._settings.detector_backend,
            inference_ms=round(elapsed[0], 2),
            detection_count=len(fod_items),
            alert_count=len(alerts),
            detections=fod_items,
            risk_level=risk_level,
            runway_status=runway_status,
            summary=summary,
        )

    def _to_fod_detection(
        self,
        raw: RawDetection,
        width: int,
        height: int,
        index: int,
    ) -> FodDetection:
        return FodDetection(
            id=f"det_{index:03d}",
            label="suspected_fod",
            confidence=raw.confidence,
            bbox=BboxNormalized(
                x=round(raw.x / width, 6),
                y=round(raw.y / height, 6),
                w=round(raw.w / width, 6),
                h=round(raw.h / height, 6),
            ),
            bbox_pixels=BboxPixels(x=raw.x, y=raw.y, w=raw.w, h=raw.h),
            area_pixels=raw.area_pixels,
        )
