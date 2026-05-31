from pydantic import BaseModel, Field


class BboxNormalized(BaseModel):
    x: float = Field(ge=0, le=1, description="Top-left x (0-1)")
    y: float = Field(ge=0, le=1, description="Top-left y (0-1)")
    w: float = Field(ge=0, le=1, description="Width (0-1)")
    h: float = Field(ge=0, le=1, description="Height (0-1)")


class BboxPixels(BaseModel):
    x: int
    y: int
    w: int
    h: int


class ErrorDetail(BaseModel):
    code: str
    message: str
    request_id: str | None = None


class ErrorResponse(BaseModel):
    error: ErrorDetail
