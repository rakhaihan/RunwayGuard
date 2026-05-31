from pydantic import BaseModel


class UploadResponse(BaseModel):
    upload_id: str
    filename: str
    content_type: str
    size_bytes: int
    stored_path: str
    message: str = "Image uploaded successfully"
