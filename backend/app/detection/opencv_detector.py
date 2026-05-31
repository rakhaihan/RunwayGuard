import cv2
import numpy as np

from app.detection.config import DetectionConfig
from app.detection.models import (
    BoundingBox,
    DetectionResult,
    FodObject,
    ObjectLocation,
    ObjectSize,
)
from app.detection.port import FodDetectorPort
from app.detection.risk import compute_risk_score


class OpenCvFodDetector(FodDetectorPort):
    """
    OpenCV contour-based FOD detector.

    Pipeline: runway ROI → grayscale → Gaussian blur → adaptive threshold
    → morphology → contour detection → contour filtering → scored objects.
    """

    def __init__(self, config: DetectionConfig | None = None) -> None:
        self._config = config or DetectionConfig()

    @property
    def backend_name(self) -> str:
        return "opencv"

    def detect(self, image: np.ndarray) -> DetectionResult:
        if image is None or image.size == 0:
            raise ValueError("Input image is empty")

        height, width = image.shape[:2]
        contours = self._find_filtered_contours(image, width, height)

        objects: list[FodObject] = []
        for index, (contour, area) in enumerate(contours):
            obj = self._contour_to_object(contour, area, index, width, height)
            if obj is not None:
                objects.append(obj)

        objects.sort(key=lambda o: o.confidence, reverse=True)
        objects = objects[: self._config.max_objects]

        return DetectionResult(
            objects=objects,
            object_count=len(objects),
            risk_score=compute_risk_score(objects),
            image_width=width,
            image_height=height,
            backend=self.backend_name,
        )

    def _find_filtered_contours(
        self,
        image: np.ndarray,
        width: int,
        height: int,
    ) -> list[tuple[np.ndarray, float]]:
        cfg = self._config
        roi_start = int(height * cfg.runway_roi_start_ratio)
        runway_roi = image[roi_start:, :]

        gray = cv2.cvtColor(runway_roi, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (cfg.blur_kernel_size, cfg.blur_kernel_size), 0)

        block = cfg.threshold_block_size
        if block % 2 == 0:
            block += 1
        binary = cv2.adaptiveThreshold(
            blurred,
            255,
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY_INV,
            block,
            cfg.threshold_c,
        )

        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
        morphed = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel, iterations=1)
        morphed = cv2.morphologyEx(morphed, cv2.MORPH_CLOSE, kernel, iterations=2)

        contours, _ = cv2.findContours(morphed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        max_area = width * height * cfg.max_contour_area_ratio

        filtered: list[tuple[np.ndarray, float, int]] = []
        for contour in contours:
            area = cv2.contourArea(contour)
            if area < cfg.min_contour_area or area > max_area:
                continue

            x, y, w, h = cv2.boundingRect(contour)
            if w < cfg.min_object_width or h < cfg.min_object_height:
                continue

            aspect = w / h if h else 0.0
            if aspect > cfg.max_aspect_ratio or aspect < cfg.min_aspect_ratio:
                continue

            filtered.append((contour, area, roi_start))

        return [(c, a) for c, a, _ in filtered]

    def _contour_to_object(
        self,
        contour: np.ndarray,
        area: float,
        index: int,
        width: int,
        height: int,
    ) -> FodObject | None:
        cfg = self._config
        roi_start = int(height * cfg.runway_roi_start_ratio)

        x, y, w, h = cv2.boundingRect(contour)
        y_global = y + roi_start

        confidence = self._score_contour(contour, area, width, height)
        center_x = x + w / 2.0
        center_y = y_global + h / 2.0

        return FodObject(
            id=f"fod_{index:03d}",
            label="suspected_fod",
            confidence=confidence,
            bounding_box=BoundingBox(x=x, y=y_global, width=w, height=h),
            location=ObjectLocation(
                x=x,
                y=y_global,
                center_x=round(center_x, 2),
                center_y=round(center_y, 2),
            ),
            size=ObjectSize(width=w, height=h, area_pixels=int(area)),
        )

    @staticmethod
    def _score_contour(contour: np.ndarray, area: float, width: int, height: int) -> float:
        hull = cv2.convexHull(contour)
        hull_area = cv2.contourArea(hull)
        solidity = area / hull_area if hull_area > 0 else 0.0

        perimeter = cv2.arcLength(contour, True)
        circularity = 0.0
        if perimeter > 0:
            circularity = 4 * np.pi * area / (perimeter * perimeter)

        area_norm = min(1.0, area / max(1.0, width * height * 0.002))
        score = 0.25 + solidity * 0.35 + min(circularity, 1.0) * 0.15 + area_norm * 0.25
        return round(min(0.98, max(0.1, score)), 4)
