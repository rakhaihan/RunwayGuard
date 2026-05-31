from dataclasses import dataclass

import cv2
import numpy as np

from app.core.config import Settings


@dataclass
class RawDetection:
    x: int
    y: int
    w: int
    h: int
    area_pixels: int
    confidence: float


def detect_fod_contours(image: np.ndarray, settings: Settings) -> list[RawDetection]:
    """Detect suspected FOD regions using contour analysis on a runway ROI."""
    height, width = image.shape[:2]
    roi_start = int(height * settings.runway_roi_start_ratio)
    runway_roi = image[roi_start:, :]

    gray = cv2.cvtColor(runway_roi, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blurred, 40, 120)

    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    morphed = cv2.dilate(edges, kernel, iterations=2)
    morphed = cv2.morphologyEx(morphed, cv2.MORPH_CLOSE, kernel, iterations=1)

    contours, _ = cv2.findContours(morphed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    max_area = width * height * settings.max_contour_area_ratio

    detections: list[RawDetection] = []
    for contour in contours:
        area = cv2.contourArea(contour)
        if area < settings.min_contour_area or area > max_area:
            continue

        x, y, w, h = cv2.boundingRect(contour)
        if w < 4 or h < 4:
            continue

        aspect = w / h if h else 0
        if aspect > 12 or aspect < 0.08:
            continue

        y_global = y + roi_start
        confidence = _score_contour(contour, area, width, height)
        detections.append(
            RawDetection(
                x=x,
                y=y_global,
                w=w,
                h=h,
                area_pixels=int(area),
                confidence=confidence,
            )
        )

    detections.sort(key=lambda d: d.confidence, reverse=True)
    return detections[:50]


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
