# RunwayGuard Backend

FastAPI application with pluggable FOD detectors (`DetectorPort`).

## Layout

- `app/api/` — HTTP routers (thin)
- `app/schemas/` — Pydantic request/response models
- `app/services/` — Application orchestration
- `app/domain/` — Entities and ports (interfaces)
- `app/detectors/` — OpenCV and YOLO implementations
- `app/infrastructure/` — Storage and database adapters
- `app/utils/` — Shared non-domain helpers
