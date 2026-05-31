# RunwayGuard AI — Project Folder Structure

Canonical index of folders, files, and responsibilities. Business logic is not implemented in scaffold files.

## Repository Root

| Path | Responsibility |
|------|----------------|
| `README.md` | Project overview, prerequisites, quick start, links to docs |
| `.gitignore` | Ignore patterns for Python, Node, data, models, env files |
| `.env.example` | Root-level env template (orchestration / docker) |
| `docker-compose.yml` | Multi-service local stack (frontend, backend, optional DB) |

## `docs/`

| Path | Responsibility |
|------|----------------|
| `ARCHITECTURE.md` | System design, layers, API overview, roadmap |
| `API.md` | Human-readable API reference and examples |
| `DEMO_SCRIPT.md` | Boeing BUILD demo walkthrough script |
| `FOLDER_STRUCTURE.md` | This file — file tree and responsibilities |

## `scripts/`

| Path | Responsibility |
|------|----------------|
| `dev.ps1` | Start backend + frontend on Windows |
| `dev.sh` | Start backend + frontend on Unix |
| `seed_demo_images.py` | Copy seed images into `data/` for demos (stub) |

## `data/`

| Path | Responsibility |
|------|----------------|
| `.gitkeep` | Runtime uploads and persisted media (gitignored contents) |

## `ml/` (training — separate from API runtime)

| Path | Responsibility |
|------|----------------|
| `README.md` | Training pipeline overview; not imported by backend |
| `datasets/.gitkeep` | Raw and labeled FOD images |
| `notebooks/.gitkeep` | Exploratory training notebooks |
| `scripts/train_yolo.py` | Train YOLO; output to `backend/models/yolo/` |
| `scripts/export_onnx.py` | Export ONNX for CPU inference |

## `.github/workflows/`

| Path | Responsibility |
|------|----------------|
| `ci.yml` | Lint and test pipeline for frontend and backend |

---

## Backend (`backend/`)

### Root

| Path | Responsibility |
|------|----------------|
| `pyproject.toml` | Python project metadata, dependencies, tool config |
| `requirements.txt` | Pinned/runtime dependencies for pip installs |
| `.env.example` | Backend env template (paths, thresholds, detector backend) |
| `README.md` | Backend-specific setup and run instructions |

### `app/`

| Path | Responsibility |
|------|----------------|
| `main.py` | FastAPI app factory, lifespan, CORS, router mounting |
| `__init__.py` | Package marker |

### `app/core/`

| Path | Responsibility |
|------|----------------|
| `config.py` | `pydantic-settings` — env-based configuration |
| `logging.py` | Structured logging setup |
| `exceptions.py` | Base app exceptions and HTTP mapping helpers |
| `dependencies.py` | FastAPI `Depends` providers (settings, detector, services) |

### `app/api/`

| Path | Responsibility |
|------|----------------|
| `__init__.py` | API package marker |
| `v1/router.py` | Aggregates all v1 route modules |
| `v1/health.py` | `GET /health` — liveness and detector metadata |
| `v1/detect.py` | `POST /detect`, `POST /detect/video` — detection endpoints |
| `v1/history.py` | `GET /history`, `GET /history/{id}` — run history |
| `v1/media.py` | `GET /media/{id}/{artifact}` — serve stored assets |
| `v1/config.py` | `GET /config`, `PATCH /config` — runtime config |

### `app/schemas/`

| Path | Responsibility |
|------|----------------|
| `common.py` | Shared Pydantic types (bbox, error envelope) |
| `detection.py` | Detection request/response models |
| `history.py` | History list and detail models |
| `health.py` | Health response model |
| `config.py` | Config read/update models |

### `app/domain/`

| Path | Responsibility |
|------|----------------|
| `entities.py` | Domain entities: `Detection`, `DetectionRun`, `Frame` |
| `enums.py` | `DetectorBackend`, `Severity`, `FodLabel` |
| `ports/detector.py` | `DetectorPort` ABC — swap OpenCV ↔ YOLO |
| `ports/storage.py` | `MediaStoragePort`, `HistoryRepositoryPort` |

### `app/detectors/`

| Path | Responsibility |
|------|----------------|
| `factory.py` | Instantiates detector from `DETECTOR_BACKEND` config |
| `opencv_detector.py` | MVP OpenCV/heuristic implementation of `DetectorPort` |
| `yolo_detector.py` | Future YOLO implementation of `DetectorPort` (stub) |
| `postprocess.py` | NMS, ROI filter, confidence filtering (backend-agnostic) |

### `app/services/`

| Path | Responsibility |
|------|----------------|
| `detection_service.py` | Orchestrates decode → detect → postprocess → annotate |
| `media_service.py` | Save/load original and annotated images |
| `history_service.py` | Persist and query detection runs |
| `config_service.py` | Read/update runtime detection settings |

### `app/infrastructure/`

| Path | Responsibility |
|------|----------------|
| `storage/filesystem_storage.py` | Filesystem `MediaStoragePort` implementation |
| `storage/annotated_writer.py` | Draw bboxes on images for API artifacts |
| `database/session.py` | SQLAlchemy engine/session (optional, Phase 2+) |
| `database/models.py` | ORM models for `detection_runs`, `detections` |
| `database/repositories.py` | `HistoryRepositoryPort` SQL implementation |
| `database/migrations/.gitkeep` | Alembic migrations placeholder |

### `app/utils/`

| Path | Responsibility |
|------|----------------|
| `image_io.py` | Decode upload bytes to `numpy` / validate format |
| `annotate.py` | Pure drawing helpers for bounding boxes |
| `timing.py` | Inference timing helpers |

### `app/tests/` → use `backend/tests/`

### `backend/tests/`

| Path | Responsibility |
|------|----------------|
| `conftest.py` | Pytest fixtures (TestClient, sample images) |
| `unit/test_detector_port.py` | Contract tests for detector interface |
| `unit/test_opencv_detector.py` | OpenCV detector unit tests |
| `unit/test_postprocess.py` | Post-processing unit tests |
| `integration/test_detect_api.py` | `POST /detect` integration tests |
| `integration/test_health_api.py` | Health endpoint tests |
| `fixtures/images/.gitkeep` | Test images |

### `backend/models/`

| Path | Responsibility |
|------|----------------|
| `.gitkeep` | YOLO weights and ONNX exports (gitignored binaries) |
| `README.md` | Where to place weights; never commit large files |

---

## Frontend (`frontend/`)

### Root

| Path | Responsibility |
|------|----------------|
| `package.json` | Dependencies and npm scripts |
| `vite.config.ts` | Vite dev server and build config |
| `tsconfig.json` | TypeScript compiler options |
| `tsconfig.node.json` | TS config for Vite Node context |
| `tailwind.config.js` | Tailwind theme and content paths |
| `postcss.config.js` | PostCSS plugins for Tailwind |
| `index.html` | HTML shell and root mount |
| `.env.example` | `VITE_API_BASE_URL` template |
| `README.md` | Frontend setup and scripts |

### `frontend/public/`

| Path | Responsibility |
|------|----------------|
| `.gitkeep` | Static assets (favicon, demo placeholders) |

### `frontend/src/`

| Path | Responsibility |
|------|----------------|
| `main.tsx` | React DOM entry, providers |
| `App.tsx` | Root component and router outlet |
| `vite-env.d.ts` | Vite client type references |
| `index.css` | Tailwind directives and global base styles |

### `frontend/src/routes/`

| Path | Responsibility |
|------|----------------|
| `index.tsx` | Route definitions and lazy loading |
| `paths.ts` | Centralized route path constants |

### `frontend/src/layouts/`

| Path | Responsibility |
|------|----------------|
| `DashboardLayout.tsx` | Shell: header, nav, main content area |
| `ErrorBoundary.tsx` | Catches render errors in dashboard tree |

### `frontend/src/features/upload/`

| Path | Responsibility |
|------|----------------|
| `components/UploadZone.tsx` | Drag-and-drop and file picker UI |
| `components/UploadProgress.tsx` | Upload progress indicator |
| `hooks/useFileUpload.ts` | File validation and upload state |
| `index.ts` | Public exports for upload feature |

### `frontend/src/features/detection/`

| Path | Responsibility |
|------|----------------|
| `components/DetectionWorkspace.tsx` | Main workspace layout |
| `components/ImagePreview.tsx` | Source image display |
| `components/DetectionOverlay.tsx` | SVG bbox overlay on image |
| `components/DetectionStats.tsx` | Inference time, detector backend info |
| `hooks/useDetection.ts` | Calls detect API, holds session state |
| `index.ts` | Public exports for detection feature |

### `frontend/src/features/alerts/`

| Path | Responsibility |
|------|----------------|
| `components/AlertsPanel.tsx` | List of high-confidence detections |
| `components/AlertCard.tsx` | Single alert row with severity styling |
| `hooks/useAlerts.ts` | Filter/sort detections into alerts |
| `index.ts` | Public exports for alerts feature |

### `frontend/src/features/history/`

| Path | Responsibility |
|------|----------------|
| `components/HistoryList.tsx` | Thumbnail grid of past runs |
| `components/HistoryDetail.tsx` | Full run detail view |
| `hooks/useHistory.ts` | Fetch and paginate history API |
| `index.ts` | Public exports for history feature |

### `frontend/src/features/settings/`

| Path | Responsibility |
|------|----------------|
| `components/SettingsPanel.tsx` | Confidence threshold and display toggles |
| `hooks/useSettings.ts` | Local settings + config API sync |
| `index.ts` | Public exports for settings feature |

### `frontend/src/pages/`

| Path | Responsibility |
|------|----------------|
| `DashboardPage.tsx` | Composes features into main dashboard |
| `HistoryPage.tsx` | History route page |
| `NotFoundPage.tsx` | 404 page |

### `frontend/src/components/ui/`

| Path | Responsibility |
|------|----------------|
| `Button.tsx` | Reusable button |
| `Card.tsx` | Reusable card container |
| `Badge.tsx` | Severity/status badge |
| `Spinner.tsx` | Loading indicator |
| `Toast.tsx` | Toast notification container |
| `index.ts` | Barrel export for UI primitives |

### `frontend/src/services/`

| Path | Responsibility |
|------|----------------|
| `api/client.ts` | Base HTTP client (base URL, headers, errors) |
| `api/detect.ts` | Detection API methods |
| `api/history.ts` | History API methods |
| `api/health.ts` | Health and config API methods |
| `api/types.ts` | Re-export or map API response types |

### `frontend/src/types/`

| Path | Responsibility |
|------|----------------|
| `detection.ts` | `Detection`, `Bbox`, `DetectionRun` types |
| `api.ts` | Generic API error and pagination types |

### `frontend/src/hooks/`

| Path | Responsibility |
|------|----------------|
| `useHealth.ts` | Poll backend health status |
| `useApiError.ts` | Normalize API errors for UI |

### `frontend/src/lib/`

| Path | Responsibility |
|------|----------------|
| `bbox.ts` | Normalized ↔ pixel bbox conversions |
| `format.ts` | Date, confidence, label formatters |
| `constants.ts` | App-wide constants (thresholds, colors) |

### `frontend/src/config/`

| Path | Responsibility |
|------|----------------|
| `env.ts` | Typed access to `import.meta.env` |
