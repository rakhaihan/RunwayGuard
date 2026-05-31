from fastapi import APIRouter, Depends, File, Form, Query, UploadFile

from app.core.dependencies import get_runway_analysis_service, get_upload_service
from app.schemas.runway import RunwayAnalysisResponse
from app.services.runway_analysis_service import RunwayAnalysisService
from app.services.upload_service import UploadService

router = APIRouter(prefix="/runway")


@router.post("/analyze", response_model=RunwayAnalysisResponse)
async def analyze_runway(
    file: UploadFile | None = File(default=None),
    upload_id: str | None = Query(default=None, description="Previously uploaded image ID"),
    confidence_threshold: float | None = Query(default=None, ge=0, le=1),
    analysis_service: RunwayAnalysisService = Depends(get_runway_analysis_service),
    upload_service: UploadService = Depends(get_upload_service),
) -> RunwayAnalysisResponse:
    if upload_id:
        data, filename = upload_service.read_upload_bytes(upload_id)
        return analysis_service.analyze_bytes(
            data,
            filename=filename,
            upload_id=upload_id,
            confidence_threshold=confidence_threshold,
        )

    if file is None:
        from app.core.exceptions import InvalidImageError

        raise InvalidImageError("Provide either a file upload or upload_id")

    content = await file.read()
    return analysis_service.analyze_bytes(
        content,
        filename=file.filename,
        confidence_threshold=confidence_threshold,
    )


@router.post("/analyze/upload", response_model=RunwayAnalysisResponse)
async def analyze_runway_form(
    file: UploadFile = File(...),
    confidence_threshold: float | None = Form(default=None),
    analysis_service: RunwayAnalysisService = Depends(get_runway_analysis_service),
) -> RunwayAnalysisResponse:
    content = await file.read()
    return analysis_service.analyze_bytes(
        content,
        filename=file.filename,
        confidence_threshold=confidence_threshold,
    )
