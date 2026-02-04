# Virtual Art Gallery

## Overview

A comprehensive virtual art gallery web application featuring VR support, AI-powered curation, and IoT integration. The platform allows users to explore a 3D gallery environment, view artworks, and receive personalized recommendations. The system supports multiple user roles (admin, curator, staff, tour guide, visitors) with role-based access control.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Microservices Architecture

The project uses a **microservices architecture** with two separate components:

```
┌─────────────────────────────────────┐     ┌─────────────────────────────────────┐
│     Virtual Gallery (Node.js)       │     │      AI/ML Service (Python)         │
│         Port: 5000                  │     │         Port: 8001                  │
├─────────────────────────────────────┤     ├─────────────────────────────────────┤
│ • Frontend (HTML/CSS/JS)            │     │ • FastAPI application               │
│ • Express server                    │     │ • GPT-4 Vision analysis             │
│ • API proxy to AI/ML                │     │ • RAG system                        │
│ • Gallery/Auction logic             │     │ • PDF processing                    │
│ • User authentication               │     │ • Vector embeddings                 │
└──────────────┬──────────────────────┘     └──────────────┬──────────────────────┘
               │                                           │
               │         HTTP API (REST)                   │
               └───────────────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
              ┌─────┴─────┐              ┌────────┴────────┐
              │ PostgreSQL │              │    Qdrant       │
              │ (Shared)   │              │  (Vector DB)    │
              └───────────┘              └─────────────────┘
```

### Why Separate Services?

1. **Independent Scaling**: AI/ML tasks (RAG training, image analysis) are resource-intensive and can be scaled separately
2. **Technology Optimization**: Node.js for web serving, Python for AI/ML (better ML ecosystem)
3. **Deployment Flexibility**: AI/ML service can run on GPU-enabled infrastructure
4. **Development Independence**: Teams can work on services independently
5. **Fault Isolation**: AI service downtime doesn't affect gallery browsing

### Communication Between Services

| Method | Use Case | Example |
|--------|----------|---------|
| **HTTP API** | Direct requests | Image analysis, RAG queries |
| **PostgreSQL** | Shared data | Artworks, users, metadata |
| **Redis** | Task queues | Background PDF processing, model training |

### API Endpoints (Virtual Gallery → AI/ML)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Gallery health check |
| `/api/ai/health` | GET | AI/ML service connection status |
| `/api/ai/analyze-image` | POST | Analyze artwork image (style, period, technique) |
| `/api/ai/process-pdf` | POST | Process PDF for RAG system |
| `/api/ai/rag-query` | POST | Query knowledge base |
| `/api/ai/describe-artwork` | POST | Generate AI description |
| `/api/ai/similar-artworks` | POST | Find similar artworks |
| `/api/infra/status` | GET | Check all infrastructure services status |

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `AI_CORE_URL` | `http://localhost:8001` | AI/ML service URL |
| `DATABASE_URL` | - | PostgreSQL connection string |
| `QDRANT_URL` | - | Qdrant vector database URL |
| `REDIS_URL` | - | Redis connection string |
| `OPENROUTER_API_KEY` | - | OpenRouter API key for AI models |

### Demo Mode

When AI/ML service is unavailable, the gallery operates in **demo mode**:
- Chat assistant provides pre-defined responses
- Image analysis shows random demo results
- PDF processing is disabled
- Status indicator shows "Демо-режим"

### Backend Architecture
- **Runtime**: Node.js with Express framework
- **Language**: TypeScript with strict typing disabled for flexibility
- **Pattern**: Service-oriented architecture with dependency injection container
- **API Style**: RESTful endpoints with JWT-based authentication

The backend uses a layered architecture:
1. **Controllers** handle HTTP requests and responses
2. **Services** contain business logic (ArtworkService, GalleryService, UserService)
3. **Models** define data structures and database interactions
4. **Middleware** handles authentication, authorization, and request validation

A custom dependency injection container (`src/container.ts`) manages service instantiation and dependencies.

### Frontend Architecture
- **Rendering**: Static HTML files served by Express + React components
- **React Integration**: Vite-built React widgets with shadcn/ui components
- **3D Graphics**: Three.js with WebXR for VR support
- **Styling**: Tailwind CSS (CDN for HTML, v3.4 for React) with Lucide Icons
- **Fonts**: Playfair Display (headings), Inter (body)
- **Build Tools**: Vite for React component bundling

#### React + TypeScript + shadcn/ui Setup

The project uses a hybrid architecture where React components are embedded in static HTML pages:

**React Components** (`src/frontend/components/`):
- `PDFUploadProcessor.tsx` - PDF upload with progress and AI processing
- `ArtworkAnalysisResult.tsx` - Display AI artwork analysis results
- `ArtRAGChat.tsx` - RAG-powered art assistant chat

**shadcn/ui Components** (`src/frontend/components/ui/`):
- button, card, badge, progress, alert, textarea, scroll-area

**Build Output**:
- `dist/frontend/react-widgets.js` - IIFE bundle for embedding
- `dist/frontend/react-widgets.css` - Tailwind styles

**Usage in HTML Pages**:
```html
<!-- Add in <head> -->
<link rel="stylesheet" href="/react/react-widgets.css">

<!-- Add before </body> -->
<script src="/react/react-widgets.js"></script>

<!-- Container for React widget -->
<div id="react-rag-chat"></div>
```

**Build Commands**:
```bash
npm run build:react    # Build React bundle
npm run dev:client     # Vite dev server for React
```

The frontend consists of role-specific HTML pages with modern responsive design:
- **index.html** - Main landing page with AI dashboard, hero section, and assistant chat
- **admin.html** - Admin panel with sidebar navigation, user/artwork management, analytics, knowledge base management (RAG stats, reindexing, external source imports)
- **curator.html** - Curator dashboard for collections, exhibitions, AI-curation, digitized artworks review/approval workflow
- **staff.html** - Staff dashboard for artwork upload, AI analysis, digitization
- **knowledge-base.html** - RAG system interface with PDF upload and AI assistant chat
- **auction-participant.html** - Auction interface with live bidding, watchlist, transactions

All dashboard pages feature:
- Responsive sidebar navigation (collapsible on mobile)
- Mobile hamburger menu with overlay
- Tab-based content switching via vanilla JS
- Consistent color schemes per role (indigo/purple for admin, purple/pink for curator, amber/yellow for auction)

### AI/ML Service (Separate Project)

A separate Python FastAPI microservice (`ai-ml-service/`) provides:
- Image analysis via OpenAI GPT-4 Vision through OpenRouter
- PDF processing with OCR and text chunking
- RAG (Retrieval-Augmented Generation) system for semantic search
- Async job processing with Redis/Bull queues
- **Artwork Digitization**: Dual-sided scanning with AI analysis (front: style/technique, back: OCR/provenance)
- **Watermarking**: Visible + invisible steganographic watermarks for copyright protection
- **NFT Metadata**: ERC-721 compliant TAE (Token Art Edition) generation for limited editions
- **External Sources**: Parsing from WikiArt, MET Museum, Rijksmuseum, Harvard Art Museums APIs
- **PDF Categorization**: AI-powered extraction of styles, artists, techniques, periods

GitHub Repository: https://github.com/tulubyev/ai-ml-service

### Database Design
- **Primary Database**: PostgreSQL for relational data (users, artworks, galleries, rooms)
- **Vector Database**: Qdrant Cloud for AI embeddings and similarity search
- **Caching**: Redis for session management and job queues

Key tables: users, artworks, galleries, room_types, room_instances, room_analytics, digitized_artworks, pdf_documents, pdf_chunks, external_artworks

Three Qdrant collections for RAG:
- **artworks**: Digitized artwork embeddings with AI analysis
- **pdf_chunks**: PDF document text chunks with category metadata
- **external_artworks**: Museum API indexed artworks

### Authentication & Authorization
- JWT tokens for API authentication
- Role-based access control (admin, curator, staff, tour_guide, user)
- Session-based CSRF protection
- bcrypt for password hashing

## Deployment

### Virtual Gallery (This Project)
```bash
# Development
node server.js

# Production
npm run build && npm start
```

### AI/ML Service (Separate)
```bash
# Clone the AI/ML service repository
git clone https://github.com/tulubyev/ai-ml-service.git
cd ai-ml-service

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Start with Docker
docker-compose up -d
```

## External Dependencies

### Cloud Services
- **PostgreSQL Database**: Hosted on beget.com (quoquuquosijo.beget.app)
- **S3 Storage**: beget.com S3-compatible storage for artwork images
- **Qdrant Cloud**: Vector database for AI embeddings (us-east4-0.gcp.cloud.qdrant.io)
- **OpenRouter**: AI model gateway for accessing Claude, GPT-4, and other models

### Key NPM Packages
- `express` - Web framework
- `pg` - PostgreSQL client
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `aws-sdk` - S3 storage integration
- `socket.io` - Real-time communication
- `sharp` - Image processing
- `multer` - File upload handling

### Python Dependencies (AI/ML Service)
- `fastapi` - Python API framework
- `openai` - OpenAI API client
- `qdrant-client` - Vector database client
- `sentence-transformers` - Embedding generation
- `PyPDF2`, `pytesseract` - PDF and OCR processing

## Recent Changes

- **2026-02-04**: Added Gallery Builder to Curator Dashboard
  - New "Галерея" section in curator sidebar for managing 3D gallery spaces
  - Room management interface: create, edit, delete, and reorder rooms
  - Room settings: name, theme (classic/modern/minimal/dark), dimensions, wall color, lighting
  - Visual layout editor with artwork slots grid
  - Room connections configuration for navigation between halls
  - Preview button opens 3D gallery with current configuration
  - API endpoints: `POST/GET /api/gallery/config` for configuration persistence
  - 3D gallery loads configuration from API on initialization
  - Slots = artwork placement positions on walls (each slot can hold one painting)
- **2026-02-04**: Implemented 3D Gallery Building with Procedural Generation
  - Created `/gallery-3d` route for immersive 3D experience
  - GalleryBuilder class for procedural room generation from JSON config
  - 5 themed rooms: Main Hall, Impressionism, Modern Art, Renaissance, Contemporary
  - TextureManager with LRU cache for lazy loading textures
  - ArtworkLODManager for progressive image loading (placeholder → thumbnail → full)
  - RoomNavigator with smooth camera transitions between rooms
  - Interactive artwork slots with click-to-view details
  - Room selection UI with keyboard shortcuts (1-5)
  - Demo artworks with famous paintings metadata
  - API endpoints: `/api/rooms/:roomId/artworks`, `/api/gallery/rooms`
  - Three.js with ES modules via CDN import maps
- **2026-02-04**: Added DevOps/Infrastructure monitoring section to admin dashboard
  - New "Инфраструктура" menu item in admin sidebar
  - Status cards for: Virtual Gallery, AI/ML Service, PostgreSQL, S3 Storage, Qdrant, Redis, OpenRouter
  - New API endpoint `/api/infra/status` for comprehensive infrastructure health check
  - Real-time status monitoring with color-coded badges and terminal-style logs
  - Automatic checks on tab open with manual refresh button
- **2026-02-04**: Added React + TypeScript + shadcn/ui integration
  - Installed React 19, Vite, Tailwind CSS v3.4, Radix UI primitives
  - Created shadcn/ui components (button, card, badge, progress, alert, textarea, scroll-area)
  - Set up IIFE bundle build for embedding React widgets in HTML pages
  - Added aiService.ts for AI/ML API integration
  - React widgets available at `/react/react-widgets.js` and `/react/react-widgets.css`
- **2025-01-28**: Added API proxy endpoints in server.js for AI/ML service integration
- **2025-01-28**: Updated knowledge-base.html with real API integration and demo mode fallback
- **2025-01-28**: Updated staff.html with AI image analysis integration
- **2025-01-28**: Documented microservices architecture and integration patterns
