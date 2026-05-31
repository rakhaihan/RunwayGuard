from fastapi import APIRouter

from app.routes import health, runway, upload

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(health.router, tags=["health"])
api_router.include_router(upload.router, tags=["upload"])
api_router.include_router(runway.router, tags=["runway"])
