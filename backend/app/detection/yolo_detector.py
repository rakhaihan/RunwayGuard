import numpy as np

from app.detection.config import DetectionConfig
from app.detection.models import DetectionResult
from app.detection.port import FodDetectorPort


class YoloFodDetector(FodDetectorPort):
    """
    Placeholder for future YOLO integration.

    Implement load_weights() and detect() without changing consumers of FodDetectorPort.
    """

    def __init__(self, config: DetectionConfig | None = None, weights_path: str | None = None) -> None:
        self._config = config or DetectionConfig()
        self._weights_path = weights_path

    @property
    def backend_name(self) -> str:
        return "yolo"

    def detect(self, image: np.ndarray) -> DetectionResult:
        raise NotImplementedError(
            "YOLO detector is not implemented yet. Use DETECTOR_BACKEND=opencv or OpenCvFodDetector."
        )
