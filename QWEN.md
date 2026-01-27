# Virtual Gallery Project Documentation

## Project Overview

The Virtual Gallery is a comprehensive virtual art gallery application with VR support, AI curation, and IoT integration. The project is built using TypeScript, Node.js, Express, PostgreSQL, and various AI/ML technologies to provide an immersive virtual experience for art enthusiasts.

## Architecture

The project follows a modular architecture with the following key components:

- **Frontend**: Built with HTML/CSS/JavaScript, with VR support using Three.js and WebXR
- **Backend**: Node.js/Express server with RESTful API endpoints
- **Database**: PostgreSQL for storing artwork, gallery, and user information
- **AI/ML**: TensorFlow.js and custom models for artwork analysis and recommendations
- **IoT Integration**: Device management and sensor processing for real-world feedback
- **Cloud Storage**: AWS S3-compatible storage for artwork images and assets

## Key Technologies

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with pg driver
- **Frontend**: HTML, CSS, JavaScript, Three.js, WebXR
- **AI/ML**: TensorFlow.js, custom neural networks
- **IoT**: Device simulation and sensor processing
- **Authentication**: JWT-based authentication with role-based access control
- **File Storage**: AWS S3-compatible object storage
- **Testing**: Jest for unit and integration testing
- **Code Quality**: ESLint, Prettier, TypeScript strict mode

## Project Structure

```
src/
├── ai-ml/                 # AI/ML models and services
│   ├── models/            # Neural network models
│   ├── services/          # AI-powered services
│   └── utils/             # AI/ML utilities
├── backend/               # Backend-specific code
│   ├── config/            # Configuration files
│   ├── middleware/        # Express middleware
│   ├── routes/            # API route definitions
│   ├── services/          # Backend services
│   └── utils/             # Backend utilities
├── controllers/           # Express controllers
├── database/              # Database initialization and utilities
├── iot/                   # IoT device and sensor code
├── middleware/            # Express middleware
├── models/                # Data models
├── routes/                # API route definitions
├── services/              # Business logic services
├── types/                 # TypeScript type definitions
├── utils/                 # General utilities
└── server.ts              # Main server entry point
```

## Building and Running

### Prerequisites

- Node.js 16+
- PostgreSQL database
- AWS S3-compatible storage account
- Redis (for caching)

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd virtual-gallery
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Initialize the database:**
   ```bash
   npm run init-db
   ```

5. **Run the application:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm run build
   npm start
   ```

### Key Scripts

- `npm run dev`: Start development server with hot reloading
- `npm run build`: Compile TypeScript to JavaScript
- `npm run init-db`: Initialize the database with schema and sample data
- `npm test`: Run unit and integration tests
- `npm run test:coverage`: Run tests with coverage report

## Development Conventions

### Code Style

- TypeScript with strict mode enabled
- ESLint with custom rules for consistency
- Prettier for code formatting
- TSLint for type safety
- JSDoc-style comments for public APIs

### Testing

- Unit tests for all services and utility functions
- Integration tests for API endpoints
- Test coverage threshold of 80%
- Jest as the primary testing framework
- Supertest for API endpoint testing

### Architecture Patterns

- Dependency injection for loose coupling
- Service layer pattern for business logic
- Repository pattern for data access
- Factory pattern for object creation
- Singleton pattern for shared resources
- Observer pattern for event handling

### Security Practices

- Input validation and sanitization
- JWT-based authentication
- Role-based access control
- Rate limiting to prevent abuse
- Secure password hashing with bcrypt
- Protection against common vulnerabilities (XSS, CSRF, SQL injection)

## Key Features

### Artwork Management
- CRUD operations for artworks
- Advanced search and filtering
- Tagging and categorization
- Image upload and processing
- Analytics and engagement metrics

### Gallery Management
- Virtual gallery creation and customization
- Room layout configuration
- Navigation path definition
- VR/AR experience support

### AI-Powered Features
- Artwork recommendation engine
- Visual similarity detection
- Style and period classification
- Automated curation
- Personalized tours

### IoT Integration
- Environmental sensor monitoring
- Real-time visitor tracking
- Interactive exhibit controls
- Smart lighting and climate control

### User Management
- Role-based access control
- Authentication and authorization
- Profile management
- Preference settings
- Activity tracking

## API Endpoints

The application provides a comprehensive RESTful API:

- `/api/auth` - Authentication endpoints
- `/api/artworks` - Artwork management
- `/api/galleries` - Gallery management
- `/api/users` - User management
- `/api/ai` - AI-powered services
- `/api/iot` - IoT device integration

## Testing Strategy

The project implements a comprehensive testing strategy:

- **Unit Tests**: Individual functions and classes
- **Integration Tests**: Component interactions
- **API Tests**: Endpoint functionality
- **End-to-End Tests**: Complete user workflows

All tests are located in `__tests__` directories throughout the project and use Jest as the testing framework.

## Deployment

The application is designed for deployment to cloud platforms with support for:

- Environment-based configuration
- Docker containerization
- CI/CD pipeline integration
- Health checks and monitoring
- Scalable architecture