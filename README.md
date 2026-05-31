# RunwayGuard AI

### Intelligent Runway Foreign Object Debris Detection System

**Boeing University Innovation Leadership Development (BUILD) Indonesia — Early Prototype**

---

## Overview

**RunwayGuard AI** is an intelligent runway safety platform designed to help airports detect **Foreign Object Debris (FOD)** before it threatens aircraft, passengers, and operations. By combining computer vision, automated risk assessment, and an operations-focused dashboard, RunwayGuard AI turns runway imagery into actionable safety intelligence—supporting faster decisions and more consistent inspections than manual walkdowns alone.

This project is developed as an early prototype for **Boeing BUILD Indonesia**, demonstrating how AI and digital aviation technologies can strengthen runway safety monitoring in a practical, scalable way.

---

## Problem Statement

Foreign Object Debris (FOD) remains one of the most persistent and costly risks in commercial and general aviation.

- **FOD is a major aviation safety hazard.** Objects on the runway—tools, metal fragments, luggage pieces, wildlife remains, or pavement debris—can be ingested by engines, puncture tires, or strike airframe components during takeoff and landing.
- **FOD can damage aircraft engines, landing gear, tires, and structures**, leading to rejected takeoffs, in-flight emergencies, unscheduled maintenance, and reputational harm to airlines and airports.
- **Current runway inspections are often manual, time-consuming, and prone to human error.** Visual walkdowns depend on staffing, lighting, weather, and inspector fatigue—especially during high-tempo operations.
- **Small hazardous objects may be missed** during routine checks, particularly at night or under poor contrast conditions.
- **Delayed detection increases consequence severity:** aircraft damage, gate delays, runway closures, investigation costs, and—in the worst cases—serious safety incidents.

Airports need **faster, more repeatable, and data-driven** runway monitoring. RunwayGuard AI addresses that gap.

---

## Proposed Solution

**RunwayGuard AI** is an AI-powered runway monitoring system that uses **computer vision** to analyze runway images, detect suspected FOD, classify operational risk, and present results on a **real-time operations dashboard** for airport personnel.

The platform is designed to:

- Capture or ingest runway imagery (upload today; camera and drone integrations planned).
- Run an automated **computer vision engine** to identify anomalous objects on the runway surface.
- Apply **risk assessment** and **runway status** logic (clear, advisory, caution, unsafe).
- Generate **alerts** and recommended actions for ground and operations teams.
- Provide **historical visibility** into detections and safety trends for continuous improvement.

### End-to-End Workflow

```text
Runway Camera / Image
        ↓
Computer Vision Engine
        ↓
Object Detection
        ↓
Risk Assessment
        ↓
Alert Generation
        ↓
Airport Operations Dashboard
```

---

## Key Features

### AI-Based FOD Detection

Detect suspected foreign objects on the runway using image analysis (OpenCV contour pipeline in the current prototype; YOLO-based detection planned).

### Runway Safety Monitoring

Assess runway condition per scan with operational status indicators and a composite **Runway Safety Score**.

### Risk Classification

Classify findings across risk levels (**Low**, **Medium**, **High**, **Critical**) and map them to runway status for decision support.

### Alert System

Surface animated alerts and recommended actions when potential hazards exceed confidence thresholds.

### Runway Safety Dashboard

Provide a modern, aviation-themed command view: live scan results, bounding boxes, heatmaps, zone maps, and analytics panels.

### Detection History

Track prior scans via client-side history (live sessions) and operational analytics views (mock data for demonstration).

---

## Expected Impact

### Aviation Safety

Reduce the likelihood of engine ingestion, tire damage, and structural strikes by catching FOD earlier and more consistently.

### Operational Efficiency

Shorten inspection cycles and support targeted sweeps instead of blanket manual searches across the full runway length.

### Cost Reduction

Help avoid expensive aircraft repairs, flight delays, runway downtime, and incident investigation costs associated with FOD events.

### Faster Response

Enable airport teams to verify, isolate, and clear hazards sooner—minimizing disruption to departure and arrival flows.

### Digital Aviation Transformation

Advance smarter airport operations through AI, computer vision, automation, and centralized safety dashboards aligned with industry digitization goals.

---

## Alignment with BUILD Indonesia Focus Areas

### Advanced Technology and Innovation

RunwayGuard AI applies:

- **Artificial Intelligence** for object detection and risk scoring  
- **Computer Vision** (OpenCV today; YOLO integration roadmap)  
- **Automation** of detection and alert workflows  
- **Digital Aviation Technologies** via API-first architecture and an operations dashboard  

The system is built with a **pluggable detector interface** so the prototype can evolve from classical CV to deep learning without redesigning the product surface.

### Sustainability

Preventing FOD incidents reduces unnecessary aircraft damage, scrap from destroyed components, repeated maintenance cycles, and fuel wasted on delays and diversions. More efficient inspections also lower vehicle patrol usage and labor hours per runway check.

### Social Impact

Improved runway safety protects **passengers, flight crews, ground staff, and airport communities**. Safer runways support reliable air connectivity—a critical enabler of economic activity and emergency response across Indonesia and the wider region.

---

## System Architecture

RunwayGuard AI follows a modular **client–API–vision** architecture suitable for hackathon prototypes and future production hardening.

| Layer | Technologies |
|-------|----------------|
| **Frontend** | React, Vite, TypeScript, Tailwind CSS |
| **Backend** | FastAPI, Pydantic, Uvicorn |
| **Computer Vision** | OpenCV (contour-based detection); future **YOLO** via `FodDetectorPort` |
| **Storage (prototype)** | Local filesystem for uploads; browser localStorage for scan history; mock analytics dataset |

### Architecture Diagram

```text
┌─────────────────────────────────────────────────────────────────┐
│                    Airport Operations Dashboard                  │
│              (React + Tailwind — RunwayGuard UI)                 │
└────────────────────────────┬────────────────────────────────────┘
                             │ REST API
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FastAPI Application                          │
│   Routes → Services → Schemas → Detection Module (Port/Factory)  │
└────────────────────────────┬────────────────────────────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Image Upload   │  │ OpenCV Detector │  │  Future YOLO    │
│  (filesystem)   │  │  (prototype)    │  │   Detector      │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### Repository Layout

```text
RunwayGuard/
├── frontend/          # React dashboard (live scan + analytics)
├── backend/           # FastAPI API and detection pipeline
├── docs/              # Architecture and project documentation
├── data/              # Runtime uploads (local, gitignored)
└── ml/                # Future training scripts (YOLO dataset pipeline)
```

---

## Development Roadmap

### Phase 1 (Month 0–1) — Early Prototype ✅ *Current*

- Image upload  
- OpenCV-based detection  
- Risk classification and runway status  
- Operations dashboard  
- Boeing BUILD demonstration  

### Phase 2 (Month 2–3) — AI Detection Enhancement

- YOLO integration and fine-tuning on FOD datasets  
- Object classification (metal, rubber, tools, wildlife, etc.)  
- Evaluation metrics (precision/recall) on labeled runway images  

### Phase 3 (Month 4–6) — Real-Time Monitoring

- CCTV / RTSP frame ingestion  
- Scheduled scans and automated alerts  
- Async processing queue for high throughput  

### Phase 4 (Month 7–9) — Airport Operations Integration

- Incident management workflow  
- Mobile notifications for ground crews  
- Role-based access and audit logging  

### Phase 5 (Month 10–12) — Smart Inspection System

- Drone-assisted runway inspection  
- Predictive analytics and trend forecasting  
- Integration with airport digital operations platforms  

---

## Current Prototype Scope

This repository contains an **early prototype** intended to validate the feasibility of AI-powered runway safety monitoring. It is suitable for **demonstration, judging, and technical evaluation**—not for operational deployment without further validation, certification, and human oversight.

**Current capabilities:**

| Capability | Status |
|------------|--------|
| Runway image upload | ✅ Implemented |
| FOD detection (OpenCV contours) | ✅ Implemented |
| Bounding boxes and object metadata | ✅ Implemented |
| Risk level and runway status | ✅ Implemented |
| Live operations dashboard | ✅ Implemented |
| Animated alerts and recommended actions | ✅ Implemented |
| Aviation analytics module (mock ops data) | ✅ Demonstration UI |
| Detection history (browser session) | ✅ Implemented |
| YOLO / real-time CCTV | 🔜 Planned |

**Future capabilities** are outlined in the roadmap above and are not yet production-ready in this codebase.

---

## Technology Stack

| Category | Stack |
|----------|--------|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, React Router, Lucide Icons |
| **Backend** | Python 3.11+, FastAPI, Pydantic, Uvicorn |
| **Computer Vision** | OpenCV (`opencv-python-headless`), NumPy |
| **API** | REST (`/api/v1`), OpenAPI docs at `/docs` |
| **Testing** | pytest (backend) |
| **Planned ML** | YOLO (Ultralytics), ONNX export, `ml/` training pipeline |

---

## Installation

### Prerequisites

- **Python 3.11+**
- **Node.js 18+** and npm
- Git

### Backend

```bash
cd backend
python -m venv .venv
```

**Windows (PowerShell):**

```powershell
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**macOS / Linux:**

```bash
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- API base: `http://localhost:8000`  
- Interactive docs: `http://localhost:8000/docs`  
- Health check: `GET /api/v1/health`  

Optional: copy `backend/.env.example` to `backend/.env` to customize thresholds and storage paths.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

- Dashboard: `http://localhost:5173`  
- The dev server proxies `/api` requests to the backend on port **8000**.  

Optional: copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_BASE_URL` if not using the default proxy.

### Run a Live Demo

1. Start the **backend**, then the **frontend**.  
2. Open the dashboard in your browser.  
3. Upload a runway image under **Live FOD Scan**.  
4. Review bounding boxes, risk level, runway status, and alerts.  
5. Explore **Aviation Analytics** (mock operational data) for presentation context.  

### API Endpoints (Prototype)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/health` | Service health and detector metadata |
| `POST` | `/api/v1/upload` | Upload a runway image |
| `POST` | `/api/v1/runway/analyze` | Analyze image (multipart file or `upload_id`) |

---

## Future Improvements

- **YOLO-based detection** with airport-specific FOD classes  
- **Real-time CCTV integration** for continuous runway monitoring  
- **Drone-assisted runway inspection** for scheduled and ad-hoc surveys  
- **Airport Operations Center (AOC) integration** with incident ticketing  
- **Low-light and adverse-weather** robustness (illumination normalization, sensor fusion)  
- **Weather-aware detection** (rain, glare, standing water masking)  
- **Airport Digital Twin** visualization of FOD events on the airfield map  
- Server-side detection history, audit logs, and SMS / regulatory reporting hooks  

---

## Documentation

| Document | Description |
|----------|-------------|
| [docs/FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md) | File-level project index |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design notes |
| [backend/README.md](backend/README.md) | Backend-specific setup |
| [frontend/README.md](frontend/README.md) | Frontend-specific setup |

---

## Team & Program

Developed for **Boeing BUILD Indonesia** as an innovation project exploring how AI can strengthen runway safety and airport operational resilience.

For questions during judging or technical review, refer to the live API documentation at `/docs` when the backend is running.

---

## Disclaimer

This project is an **early prototype** developed for the **Boeing University Innovation Leadership Development (BUILD) Indonesia** program.

Detection capabilities are **limited** and based on heuristic computer vision in the current release. Results are intended for **demonstration and concept validation only**. RunwayGuard AI does **not** replace certified FOD programs, regulatory inspections, or human verification by qualified airport personnel.

**Always confirm detections on-site before operational decisions.** Do not use this prototype as the sole basis for runway closure, aircraft movement, or safety-critical actions.

---

<p align="center">
  <strong>RunwayGuard AI</strong> — Safer runways through intelligent vision.<br>
  <sub>Boeing BUILD Indonesia · Prototype v0.1</sub>
</p>
