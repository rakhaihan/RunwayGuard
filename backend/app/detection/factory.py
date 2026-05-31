from app.detection.config import DetectionConfig
from app.detection.opencv_detector import OpenCvFodDetector
from app.detection.port import FodDetectorPort
from app.detection.yolo_detector import YoloFodDetector


def create_fod_detector(
    backend: str = "opencv",
    config: DetectionConfig | None = None,
    *,
    weights_path: str | None = None,
) -> FodDetectorPort:
    """
    Factory for FOD detector implementations.

    Args:
        backend: ``opencv`` or ``yolo``.
        config: Optional detection configuration.
        weights_path: Optional model weights path (YOLO only).

    Returns:
        Configured FodDetectorPort instance.
    """
    normalized = backend.strip().lower()

    if normalized == "opencv":
        return OpenCvFodDetector(config)

    if normalized == "yolo":
        return YoloFodDetector(config, weights_path=weights_path)

    raise ValueError(f"Unsupported detector backend: {backend}")
