class AppError(Exception):
    def __init__(self, message: str, code: str = "APP_ERROR") -> None:
        self.message = message
        self.code = code
        super().__init__(message)


class InvalidImageError(AppError):
    def __init__(self, message: str = "Unable to decode image") -> None:
        super().__init__(message, code="INVALID_IMAGE")


class UploadNotFoundError(AppError):
    def __init__(self, upload_id: str) -> None:
        super().__init__(f"Upload not found: {upload_id}", code="UPLOAD_NOT_FOUND")
