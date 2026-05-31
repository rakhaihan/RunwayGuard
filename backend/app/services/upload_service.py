import json
import uuid
from pathlib import Path

from fastapi import UploadFile

from app.core.config import Settings
from app.core.exceptions import InvalidImageError, UploadNotFoundError
from app.schemas.upload import UploadResponse
from app.utils.image_io import decode_image


class UploadService:
    def __init__(self, settings: Settings) -> None:
        self._settings = settings
        self._storage = settings.storage_path.resolve()
        self._storage.mkdir(parents=True, exist_ok=True)

    async def save_upload(self, file: UploadFile) -> UploadResponse:
        if not file.filename:
            raise InvalidImageError("Filename is required")

        data = await file.read()
        if not data:
            raise InvalidImageError("Empty file")

        decode_image(data)

        upload_id = str(uuid.uuid4())
        suffix = Path(file.filename).suffix.lower() or ".jpg"
        stored_name = f"{upload_id}{suffix}"
        stored_path = self._storage / stored_name

        stored_path.write_bytes(data)
        meta_path = self._storage / f"{upload_id}.meta.json"
        meta_path.write_text(
            json.dumps(
                {
                    "upload_id": upload_id,
                    "filename": file.filename,
                    "content_type": file.content_type or "application/octet-stream",
                    "stored_name": stored_name,
                }
            ),
            encoding="utf-8",
        )

        return UploadResponse(
            upload_id=upload_id,
            filename=file.filename,
            content_type=file.content_type or "application/octet-stream",
            size_bytes=len(data),
            stored_path=str(stored_path),
        )

    def read_upload_bytes(self, upload_id: str) -> tuple[bytes, str]:
        meta_path = self._storage / f"{upload_id}.meta.json"
        if not meta_path.exists():
            raise UploadNotFoundError(upload_id)

        meta = json.loads(meta_path.read_text(encoding="utf-8"))
        stored_path = self._storage / meta["stored_name"]
        if not stored_path.exists():
            raise UploadNotFoundError(upload_id)

        return stored_path.read_bytes(), meta.get("filename", stored_path.name)
