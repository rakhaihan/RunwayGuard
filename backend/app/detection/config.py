from dataclasses import dataclass


@dataclass(frozen=True)
class DetectionConfig:
    """Configuration for FOD detectors (framework-agnostic)."""

    min_contour_area: int = 80
    max_contour_area_ratio: float = 0.25
    runway_roi_start_ratio: float = 0.3
    blur_kernel_size: int = 5
    threshold_block_size: int = 11
    threshold_c: int = 2
    min_object_width: int = 4
    min_object_height: int = 4
    max_aspect_ratio: float = 12.0
    min_aspect_ratio: float = 0.08
    max_objects: int = 50

    @classmethod
    def from_settings(cls, settings: object) -> "DetectionConfig":
        """Build config from app.core.config.Settings without importing it at module load."""
        return cls(
            min_contour_area=getattr(settings, "min_contour_area", 80),
            max_contour_area_ratio=getattr(settings, "max_contour_area_ratio", 0.25),
            runway_roi_start_ratio=getattr(settings, "runway_roi_start_ratio", 0.3),
        )
