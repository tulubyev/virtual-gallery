# Virtual Art Gallery

## Overview

A comprehensive virtual art gallery web application featuring VR support, AI-powered curation, and IoT integration. The platform allows users to explore a 3D gallery environment, view artworks, and receive personalized recommendations. The system supports multiple user roles (admin, curator, staff, tour guide, visitors) with role-based access control. The project aims to revolutionize art appreciation and management through advanced technology.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Microservices Architecture

The project utilizes a **microservices architecture** comprising a Virtual Gallery (Node.js) and an AI/ML Service (Python). This separation enables independent scaling, technology optimization (Node.js for web serving, Python for AI/ML), deployment flexibility (GPU-enabled infrastructure for AI/ML), independent development, and fault isolation.

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

Communication between services primarily occurs via HTTP API for direct requests (e.g., image analysis, RAG queries) and PostgreSQL for shared data like artworks and user metadata. Redis is used for task queues for background processing.

### Demo Mode

When the AI/ML service is unavailable, the gallery operates in a **demo mode**, providing pre-defined responses and disabling certain AI-dependent functionalities.

### Backend Architecture

The backend is built with Node.js and Express, using a service-oriented architecture with dependency injection. It features RESTful endpoints with JWT-based authentication and a layered structure of controllers, services, models, and middleware.

### Frontend Architecture

The frontend uses static HTML pages served by Express, enhanced with Vite-built React widgets utilizing shadcn/ui components. Three.js with WebXR provides 3D graphics and VR support. Styling is handled with Tailwind CSS. The frontend is designed to be responsive and supports various user roles with distinct dashboards (admin, curator, staff, auction-participant, etc.), each with tailored functionalities and consistent design themes.

Key frontend features include:
- **3D Gallery Builder**: Allows curators to create and manage 3D gallery spaces, including room dimensions, themes, and artwork slots.
- **Procedural Generation**: Dynamically generates 3D gallery environments from configuration.
- **AI-powered Slot Calculation**: Recommends optimal artwork slot counts and distribution within gallery rooms.

### AI/ML Service

A dedicated Python FastAPI microservice provides advanced AI capabilities, including:
- Image analysis via OpenAI GPT-4 Vision.
- PDF processing with OCR and text chunking for a RAG system.
- Artwork digitization, including dual-sided scanning and AI analysis.
- Watermarking (visible and invisible steganographic) for copyright protection.
- NFT Metadata generation (ERC-721 compliant).
- Integration with external art sources (e.g., WikiArt, MET Museum).
- AI-powered categorization of PDF content.

### Database Design

- **Primary Database**: PostgreSQL for relational data (users, artworks, galleries).
- **Vector Database**: Qdrant Cloud for AI embeddings and similarity search, with collections for artworks, PDF chunks, and external artworks.
- **Caching**: Redis for session management and job queues.

### Authentication & Authorization

The system uses JWT tokens for API authentication and implements role-based access control (admin, curator, staff, tour_guide, user). bcrypt is used for secure password hashing.

## External Dependencies

### Cloud Services

- **PostgreSQL Database**: Hosted on beget.com.
- **S3 Storage**: beget.com S3-compatible storage for artwork images.
- **Qdrant Cloud**: Vector database for AI embeddings.
- **OpenRouter**: AI model gateway for accessing various AI models.

### Key NPM Packages (Virtual Gallery)

- `express`: Web framework.
- `pg`: PostgreSQL client.
- `jsonwebtoken`: JWT authentication.
- `bcrypt`: Password hashing.
- `aws-sdk`: S3 storage integration.
- `socket.io`: Real-time communication.
- `sharp`: Image processing.
- `multer`: File upload handling.
- React, Vite, Tailwind CSS, shadcn/ui, Three.js, WebXR.

### Python Dependencies (AI/ML Service)

- `fastapi`: Python API framework.
- `openai`: OpenAI API client.
- `qdrant-client`: Vector database client.
- `sentence-transformers`: Embedding generation.
- `PyPDF2`, `pytesseract`: PDF and OCR processing.