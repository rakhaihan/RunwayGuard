import cv2
import numpy as np

from app.core.config import Settings
from app.utils.fod_detector import detect_fod_contours


def test_detect_fod_contours_finds_dark_blob():
    settings = Settings()
    image = np.full((400, 600, 3), 180, dtype=np.uint8)
    cv2.rectangle(image, (150, 250), (220, 300), (30, 30, 30), -1)

    detections = detect_fod_contours(image, settings)
    assert len(detections) >= 1
    assert detections[0].confidence > 0
