from functools import lru_cache

from app.core.config import Settings, get_settings
from app.services.runway_analysis_service import RunwayAnalysisService
from app.services.upload_service import UploadService


@lru_cache
def get_upload_service() -> UploadService:
    settings = get_settings()
    return UploadService(settings)


@lru_cache
def get_runway_analysis_service() -> RunwayAnalysisService:
    settings = get_settings()
    return RunwayAnalysisService(settings)


def get_settings_dep() -> Settings:
    return get_settings()
