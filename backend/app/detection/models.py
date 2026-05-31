from dataclasses import dataclass, field


@dataclass(frozen=True)
class BoundingBox:
    x: int
    y: int
    width: int
    height: int


@dataclass(frozen=True)
class ObjectLocation:
    """Pixel location of object on the runway image."""

    x: int
    y: int
    center_x: float
    center_y: float


@dataclass(frozen=True)
class ObjectSize:
    width: int
    height: int
    area_pixels: int


@dataclass(frozen=True)
class FodObject:
    id: str
    label: str
    confidence: float
    bounding_box: BoundingBox
    location: ObjectLocation
    size: ObjectSize


@dataclass(frozen=True)
class DetectionResult:
    """Aggregated output from a FOD detector run."""

    objects: list[FodObject] = field(default_factory=list)
    object_count: int = 0
    risk_score: float = 0.0
    image_width: int = 0
    image_height: int = 0
    backend: str = "opencv"
