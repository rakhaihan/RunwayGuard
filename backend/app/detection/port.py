from abc import ABC, abstractmethod

import numpy as np

from app.detection.models import DetectionResult


class FodDetectorPort(ABC):
    """Contract for FOD detectors. Replace OpenCV with YOLO by implementing this interface."""

    @property
    @abstractmethod
    def backend_name(self) -> str:
        """Identifier returned in API metadata (e.g. opencv, yolo)."""

    @abstractmethod
    def detect(self, image: np.ndarray) -> DetectionResult:
        """
        Run FOD detection on a BGR runway image.

        Args:
            image: OpenCV BGR ndarray (H, W, 3).

        Returns:
            DetectionResult with bounding boxes, counts, sizes, locations, risk_score.
        """
