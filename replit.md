# Virtual Art Gallery

## Overview

A comprehensive virtual art gallery web application featuring VR support, AI-powered curation, and IoT integration. The platform allows users to explore a 3D gallery environment, view artworks, and receive personalized recommendations. The system supports multiple user roles (admin, curator, staff, tour guide, visitors) with role-based access control.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

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
- **Rendering**: Static HTML files served by Express
- **3D Graphics**: Three.js with WebXR for VR support
- **Styling**: Tailwind CSS (CDN) with Lucide Icons
- **Fonts**: Playfair Display (headings), Inter (body)
- **Build Tools**: Webpack and Vite configurations available

The frontend consists of role-specific HTML pages with modern responsive design:
- **index.html** - Main landing page with AI dashboard, hero section, and assistant chat
- **admin.html** - Admin panel with sidebar navigation, user/artwork management, analytics, knowledge base management (RAG stats, reindexing, external source imports)
- **curator.html** - Curator dashboard for collections, exhibitions, AI-curation, digitized artworks review/approval workflow
- **auction-participant.html** - Auction interface with live bidding, watchlist, transactions

All dashboard pages feature:
- Responsive sidebar navigation (collapsible on mobile)
- Mobile hamburger menu with overlay
- Tab-based content switching via vanilla JS
- Consistent color schemes per role (indigo/purple for admin, purple/pink for curator, amber/yellow for auction)

### AI/ML Service
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

### Development Tools
- `typescript` - Type checking
- `jest` - Testing framework
- `eslint` / `prettier` - Code quality
- `nodemon` - Development server