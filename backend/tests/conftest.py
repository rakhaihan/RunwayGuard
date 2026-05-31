import io

import cv2
import numpy as np
import pytest
from fastapi.testclient import TestClient

from app.core.config import Settings, get_settings
from app.core.dependencies import (
    get_runway_analysis_service,
    get_settings_dep,
    get_upload_service,
)
from app.main import app
from app.services.runway_analysis_service import RunwayAnalysisService
from app.services.upload_service import UploadService


@pytest.fixture
def test_settings(tmp_path) -> Settings:
    return Settings(storage_path=tmp_path / "uploads")


@pytest.fixture
def client(test_settings):
    get_settings.cache_clear()
    get_upload_service.cache_clear()
    get_runway_analysis_service.cache_clear()

    app.dependency_overrides[get_settings_dep] = lambda: test_settings
    app.dependency_overrides[get_upload_service] = lambda: UploadService(test_settings)
    app.dependency_overrides[get_runway_analysis_service] = (
        lambda: RunwayAnalysisService(test_settings)
    )

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()
    get_settings.cache_clear()
    get_upload_service.cache_clear()
    get_runway_analysis_service.cache_clear()


@pytest.fixture
def sample_image_bytes() -> bytes:
    image = np.zeros((480, 640, 3), dtype=np.uint8)
    image[300:360, 200:280] = (40, 40, 40)
    cv2.rectangle(image, (220, 310), (260, 340), (20, 20, 20), -1)
    ok, buf = cv2.imencode(".jpg", image)
    assert ok
    return buf.tobytes()


@pytest.fixture
def sample_image_file(sample_image_bytes):
    return ("runway.jpg", io.BytesIO(sample_image_bytes), "image/jpeg")
