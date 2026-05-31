from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = Field(default="RunwayGuard API", alias="APP_NAME")
    app_version: str = Field(default="0.1.0", alias="APP_VERSION")
    debug: bool = Field(default=False, alias="DEBUG")
    detector_backend: str = Field(default="opencv", alias="DETECTOR_BACKEND")
    confidence_threshold: float = Field(default=0.5, alias="CONFIDENCE_THRESHOLD")
    max_image_dimension: int = Field(default=1280, alias="MAX_IMAGE_DIMENSION")
    storage_path: Path = Field(default=Path("../data/uploads"), alias="STORAGE_PATH")
    cors_origins: str = Field(
        default="http://localhost:5173,http://127.0.0.1:5173",
        alias="CORS_ORIGINS",
    )
    min_contour_area: int = Field(default=80, alias="MIN_CONTOUR_AREA")
    max_contour_area_ratio: float = Field(default=0.25, alias="MAX_CONTOUR_AREA_RATIO")
    runway_roi_start_ratio: float = Field(default=0.3, alias="RUNWAY_ROI_START_RATIO")

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
