# Virtual Art Gallery

## Getting Started

New developers can get the project running with two setup commands.

**Step 1 — Node.js service:**

```bash
npm run setup
```

This will:
1. Copy `.env.example` → `.env` (if `.env` doesn't already exist)
2. Run `npm install` to install all Node.js dependencies
3. Check that all required environment variables are filled in
4. Initialize the database (runs `npm run init-db`) — only if credentials are complete

**Step 2 — Python AI/ML service:**

```bash
npm run setup:ai
```

This will:
1. Copy `ai-ml-service/.env.example` → `ai-ml-service/.env` (if missing)
2. Run `pip install -r ai-ml-service/requirements.txt` to install Python dependencies
3. Print a checklist of required AI/ML environment variables

**After setup**, open both `.env` and `ai-ml-service/.env` and replace any placeholder values with real credentials. Then start the app:

```bash
npm run dev
```

The app will be available at `http://localhost:3001`.

To start the AI/ML service separately:

```bash
cd ai-ml-service && python3 -m uvicorn src.main:app --host 0.0.0.0 --port 8001
```

### Required environment variables

| Variable | Description |
|---|---|
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port (default `5432`) |
| `DB_NAME` | Database name |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `DB_STRING` | Full connection string |
| `JWT_SECRET` | Secret for signing JWT tokens (≥32 chars) |
| `S3_ACCESS_KEY_ID` | S3-compatible storage access key |
| `S3_SECRET_ACCESS_KEY` | S3-compatible storage secret key |
| `S3_REGION` | Storage region |
| `S3_BUCKET_NAME` | Storage bucket name |
| `S3_ENDPOINT` | Storage endpoint URL |
| `AI_CORE_URL` | URL of the Python AI/ML service (default `http://localhost:8001`) |

---

## Overview

The Virtual Art Gallery is a web application designed to revolutionize art appreciation and management. It provides a comprehensive 3D gallery environment with VR support, AI-powered curation, and IoT integration. The platform allows users to explore artworks, receive personalized recommendations, and interact within a rich digital art space. It supports multiple user roles (admin, curator, staff, tour guide, visitors) with robust role-based access control, aiming to enhance the accessibility and experience of art through technology.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Microservices Architecture

The system utilizes a microservices architecture, separating the application into a Virtual Gallery service (Node.js) and an AI/ML Service (Python). This design ensures independent scaling, optimized technology stacks for specific tasks, flexible deployment, and fault isolation. Services communicate via HTTP APIs, leveraging PostgreSQL for data persistence and Redis for task queues. A demo mode is available to maintain functionality if the AI/ML service is unavailable.

### Backend Architecture

The backend is built using Node.js with Express, following a service-oriented architecture incorporating dependency injection. It offers RESTful endpoints, JWT-based authentication, and a layered structure comprising controllers, services, models, and middleware.

### Frontend Architecture

The frontend consists of static HTML pages served by Express, enhanced with Vite-built React widgets using shadcn/ui. Three.js with WebXR provides 3D graphics and VR capabilities. Tailwind CSS is used for styling. The frontend supports various user roles with distinct, responsively designed dashboards, including a 3D Gallery Builder for curators, procedural generation of gallery environments, and AI-powered recommendations for artwork placement.

### AI/ML Service

A dedicated Python FastAPI microservice provides advanced AI functionalities including:
- Image analysis via OpenAI GPT-4 Vision.
- PDF processing with OCR and text chunking for a RAG system.
- Artwork digitization, encompassing dual-sided scanning and AI analysis.
- Visible and invisible (steganographic) watermarking for copyright protection.
- NFT Metadata generation (ERC-721 compliant).
- Integration with external art sources (e.g., WikiArt, MET Museum).
- AI-powered categorization of PDF content.

### Database Design

- **Primary Database**: PostgreSQL for relational data (users, artworks, galleries).
- **Vector Database**: Qdrant Cloud for AI embeddings and similarity search.
- **Caching**: Redis for session management and job queueing.

### Authentication & Authorization

The system employs JWT tokens for API authentication and implements role-based access control. `bcrypt` is used for secure password hashing.

### UI/UX Decisions

The UI/UX design focuses on responsive dashboards tailored for different user roles, utilizing Tailwind CSS for a consistent and modern aesthetic. The 3D gallery environments feature dynamic elements like lazy loading of halls, optimized rendering for performance, interactive minimaps, and procedural texture caching. Toast notifications replace intrusive `alert()` messages for a smoother user experience. Image display settings are customizable via an API, allowing for flexible aspect ratios and display modes.

## External Dependencies

### Cloud Services

- **PostgreSQL Database**: Hosted on beget.com.
- **S3 Storage**: beget.com S3-compatible storage for artwork images.
- **Qdrant Cloud**: Vector database for AI embeddings.
- **OpenRouter**: AI model gateway.

### Key NPM Packages (Virtual Gallery)

- `express`, `pg`, `jsonwebtoken`, `bcrypt`, `aws-sdk`, `socket.io`, `sharp`, `multer`.
- React, Vite, Tailwind CSS, shadcn/ui, Three.js, WebXR.

### Python Dependencies (AI/ML Service)

- `fastapi`, `openai`, `qdrant-client`, `sentence-transformers`, `PyPDF2`, `pytesseract`.