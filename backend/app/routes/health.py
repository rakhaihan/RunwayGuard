from fastapi import APIRouter, Depends

from app.core.config import Settings
from app.core.dependencies import get_settings_dep
from app.schemas.health import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
def health_check(settings: Settings = Depends(get_settings_dep)) -> HealthResponse:
    return HealthResponse(
        status="ok",
        app_name=settings.app_name,
        version=settings.app_version,
        detector_backend=settings.detector_backend,
    )
