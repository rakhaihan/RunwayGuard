# ML / Training (Future)

Responsibility: Dataset management, YOLO training, and model export — **not** imported by the API at runtime.

| Path | Responsibility |
|------|----------------|
| `datasets/` | Raw and labeled FOD images |
| `notebooks/` | Exploratory training notebooks |
| `scripts/train_yolo.py` | Training entrypoint (stub) |
| `scripts/export_onnx.py` | Export weights to `backend/models/` (stub) |
