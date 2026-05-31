# RunwayGuard Backend

FastAPI service for runway FOD analysis using OpenCV contour detection.

## Run locally

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: http://localhost:8000/docs

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/health` | Service health |
| POST | `/api/v1/upload` | Upload runway image |
| POST | `/api/v1/runway/analyze` | Analyze image (file or `upload_id`) |

## Layout

- `app/routes/` — HTTP handlers
- `app/services/` — Business orchestration
- `app/schemas/` — Pydantic models
- `app/utils/` — Image I/O and OpenCV FOD detection
