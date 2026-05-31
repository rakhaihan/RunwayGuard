from fastapi import APIRouter, Depends, File, UploadFile

from app.core.dependencies import get_upload_service
from app.schemas.upload import UploadResponse
from app.services.upload_service import UploadService

router = APIRouter()


@router.post("/upload", response_model=UploadResponse)
async def upload_image(
    file: UploadFile = File(...),
    upload_service: UploadService = Depends(get_upload_service),
) -> UploadResponse:
    return await upload_service.save_upload(file)
