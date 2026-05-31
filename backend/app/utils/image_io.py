import cv2
import numpy as np

from app.core.config import Settings
from app.core.exceptions import InvalidImageError


def decode_image(data: bytes) -> np.ndarray:
    if not data:
        raise InvalidImageError("Empty file")
    arr = np.frombuffer(data, dtype=np.uint8)
    image = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if image is None:
        raise InvalidImageError("Unsupported or corrupt image format")
    return image


def resize_for_inference(image: np.ndarray, settings: Settings) -> np.ndarray:
    h, w = image.shape[:2]
    max_dim = settings.max_image_dimension
    if max(h, w) <= max_dim:
        return image
    scale = max_dim / max(h, w)
    new_w = int(w * scale)
    new_h = int(h * scale)
    return cv2.resize(image, (new_w, new_h), interpolation=cv2.INTER_AREA)


def image_dimensions(image: np.ndarray) -> tuple[int, int]:
    h, w = image.shape[:2]
    return w, h
