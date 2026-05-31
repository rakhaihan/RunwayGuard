import logging
import uuid
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import get_settings
from app.core.exceptions import AppError, InvalidImageError, UploadNotFoundError
from app.routes.router import api_router
from app.schemas.common import ErrorDetail, ErrorResponse

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    settings.storage_path.mkdir(parents=True, exist_ok=True)
    logger.info("RunwayGuard API started — detector=%s", settings.detector_backend)
    yield


def create_app() -> FastAPI:
    settings = get_settings()

    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.middleware("http")
    async def attach_request_id(request: Request, call_next):
        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        request.state.request_id = request_id
        response = await call_next(request)
        response.headers["X-Request-ID"] = request_id
        return response

    @app.exception_handler(InvalidImageError)
    async def invalid_image_handler(request: Request, exc: InvalidImageError):
        return _error_response(request, exc, 400)

    @app.exception_handler(UploadNotFoundError)
    async def upload_not_found_handler(request: Request, exc: UploadNotFoundError):
        return _error_response(request, exc, 404)

    @app.exception_handler(AppError)
    async def app_error_handler(request: Request, exc: AppError):
        return _error_response(request, exc, 400)

    app.include_router(api_router)

    @app.get("/")
    def root():
        return {
            "app": settings.app_name,
            "version": settings.app_version,
            "docs": "/docs",
            "health": "/api/v1/health",
        }

    return app


def _error_response(request: Request, exc: AppError, status_code: int) -> JSONResponse:
    request_id = getattr(request.state, "request_id", None)
    body = ErrorResponse(
        error=ErrorDetail(
            code=exc.code,
            message=exc.message,
            request_id=request_id,
        )
    )
    return JSONResponse(status_code=status_code, content=body.model_dump())


app = create_app()
