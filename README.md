# Virtual Gallery - Enhanced Version

A virtual art gallery with VR support, AI curation, and IoT integration. This project has been enhanced with TypeScript, interfaces, dependency injection, and comprehensive testing.

## Features

- **Virtual Reality Support**: Immersive 3D gallery experience
- **AI-Powered Curation**: Intelligent artwork recommendations
- **IoT Integration**: Real-time environmental monitoring
- **Responsive Design**: Works on all devices
- **Secure Authentication**: JWT-based user authentication
- **Admin Panel**: Comprehensive management interface

## Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **Frontend**: HTML, CSS, JavaScript (with TypeScript enhancements)
- **AI/ML**: TensorFlow.js, Python integration
- **IoT**: Raspberry Pi/Arduino integration
- **VR**: WebXR, Three.js

## Architecture Enhancements

### 1. TypeScript Migration
- All JavaScript files converted to TypeScript
- Added comprehensive type definitions
- Improved code reliability with static type checking

### 2. Service Layer Abstraction
- Introduced IService interface for all services
- Created BaseService abstract class with common functionality
- Implemented dependency injection for better testability

### 3. Dependency Injection
- Created a container for managing dependencies
- Controllers now receive services through constructor injection
- Improved testability with easier mocking capabilities

### 4. Code Quality Tools
- ESLint for code linting
- Prettier for code formatting
- Jest for unit/integration/end-to-end testing
- SonarQube for code quality analysis

## Project Structure

```
src/
├── controllers/          # Request handlers
├── services/             # Business logic (now with interfaces)
├── models/               # Data models
├── types/                # TypeScript definitions
├── middleware/           # Express middleware
├── database/             # Database utilities
├── ai-ml/                # AI/ML components
├── iot/                  # IoT device integrations
├── utils/                # Utility functions
└── server.ts             # Entry point
```

## Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL
- Python (for AI/ML components)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd virtual-gallery
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Initialize the database
```bash
npm run init-db
```

5. Run the application
```bash
npm run dev
```

## Testing

The project includes a comprehensive test suite:

- **Unit Tests**: Test individual functions and classes
- **Integration Tests**: Test interactions between components
- **End-to-End Tests**: Test complete user workflows

To run tests:
```bash
npm test
```

To run tests with coverage:
```bash
npm run test:coverage
```

## Code Quality

The project follows strict code quality standards:

- All code is linted with ESLint
- Code formatting is enforced with Prettier
- Type checking is performed with TypeScript
- Tests must pass before merging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see the LICENSE file for details.