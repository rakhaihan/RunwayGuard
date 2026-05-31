"""Isolated FOD detection module — swappable OpenCV / YOLO backends."""

from app.detection.config import DetectionConfig
from app.detection.factory import create_fod_detector
from app.detection.models import (
    BoundingBox,
    DetectionResult,
    FodObject,
    ObjectLocation,
    ObjectSize,
)
from app.detection.port import FodDetectorPort
from app.detection.opencv_detector import OpenCvFodDetector

__all__ = [
    "BoundingBox",
    "DetectionConfig",
    "DetectionResult",
    "FodDetectorPort",
    "FodObject",
    "ObjectLocation",
    "ObjectSize",
    "OpenCvFodDetector",
    "create_fod_detector",
]
