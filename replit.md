# Virtual Art Gallery

## Overview

The Virtual Art Gallery is a web application designed to revolutionize art appreciation and management through advanced technology. It offers a comprehensive 3D gallery environment with VR support, AI-powered curation, and IoT integration. The platform enables users to explore artworks, receive personalized recommendations, and interact within a rich digital art space. It supports multiple user roles (admin, curator, staff, tour guide, visitors) with robust role-based access control. The project's vision is to leverage technology to enhance the accessibility and experience of art.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Microservices Architecture

The system employs a microservices architecture, separating the application into a Virtual Gallery service (Node.js) and an AI/ML Service (Python). This design allows for independent scaling, technology optimization (Node.js for web, Python for AI), flexible deployment, and fault isolation. Communication between services primarily uses HTTP APIs, with PostgreSQL for shared data and Redis for task queues. A demo mode is available if the AI/ML service is unavailable, providing pre-defined responses.

### Backend Architecture

The backend is built with Node.js and Express, following a service-oriented architecture with dependency injection. It features RESTful endpoints, JWT-based authentication, and a layered structure of controllers, services, models, and middleware.

### Frontend Architecture

The frontend consists of static HTML pages served by Express, augmented with Vite-built React widgets using shadcn/ui. Three.js with WebXR provides 3D graphics and VR capabilities. Tailwind CSS is used for styling. The frontend supports various user roles with distinct, responsively designed dashboards. Key features include a 3D Gallery Builder for curators, procedural generation of gallery environments, and AI-powered recommendations for artwork slot placement.

### AI/ML Service

A dedicated Python FastAPI microservice provides advanced AI functionalities:
- Image analysis via OpenAI GPT-4 Vision.
- PDF processing with OCR and text chunking for a RAG system.
- Artwork digitization, including dual-sided scanning and AI analysis.
- Visible and invisible (steganographic) watermarking for copyright protection.
- NFT Metadata generation (ERC-721 compliant).
- Integration with external art sources (e.g., WikiArt, MET Museum).
- AI-powered categorization of PDF content.

### Database Design

- **Primary Database**: PostgreSQL for relational data such as users, artworks, and galleries.
- **Vector Database**: Qdrant Cloud for AI embeddings and similarity search across artworks and PDF content.
- **Caching**: Redis is utilized for session management and managing job queues for background processing.

### Authentication & Authorization

The system uses JWT tokens for API authentication and implements role-based access control. `bcrypt` is used for secure password hashing.

## External Dependencies

### Cloud Services

- **PostgreSQL Database**: Hosted on beget.com.
- **S3 Storage**: beget.com S3-compatible storage for artwork images.
- **Qdrant Cloud**: Vector database for AI embeddings.
- **OpenRouter**: AI model gateway for accessing various AI models.

### Key NPM Packages (Virtual Gallery)

- `express`, `pg`, `jsonwebtoken`, `bcrypt`, `aws-sdk`, `socket.io`, `sharp`, `multer`.
- React, Vite, Tailwind CSS, shadcn/ui, Three.js, WebXR.

### Python Dependencies (AI/ML Service)

- `fastapi`, `openai`, `qdrant-client`, `sentence-transformers`, `PyPDF2`, `pytesseract`.