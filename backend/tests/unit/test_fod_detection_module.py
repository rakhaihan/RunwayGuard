import cv2
import numpy as np

from app.detection import DetectionConfig, OpenCvFodDetector, create_fod_detector
from app.detection.port import FodDetectorPort


def test_opencv_detector_finds_object_with_bbox_and_risk():
    image = np.full((400, 600, 3), 180, dtype=np.uint8)
    cv2.rectangle(image, (150, 250), (220, 300), (30, 30, 30), -1)

    detector = OpenCvFodDetector(DetectionConfig(min_contour_area=50))
    result = detector.detect(image)

    assert isinstance(detector, FodDetectorPort)
    assert result.object_count >= 1
    assert result.risk_score > 0
    assert result.image_width == 600
    assert result.image_height == 400

    obj = result.objects[0]
    assert obj.bounding_box.width > 0
    assert obj.bounding_box.height > 0
    assert obj.size.area_pixels > 0
    assert obj.location.center_x > 0
    assert obj.location.center_y > 0


def test_factory_creates_opencv_backend():
    detector = create_fod_detector("opencv")
    assert detector.backend_name == "opencv"
