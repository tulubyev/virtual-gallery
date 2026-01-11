# Virtual Art Gallery - Development Guide

## Prerequisites

Before starting development, ensure you have the following installed:

- Node.js (version 16 or higher)
- npm or yarn package manager
- Git version control system
- A modern web browser with WebGL support
- Optional: Python 3.7+ for AI/ML development

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd virtual-art-gallery
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=virtual_gallery_dev
DB_USER=gallery_user
DB_PASSWORD=secure_password
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_key
AI_MODEL_PATH=./src/ai-ml/models/
```

### 4. Database Setup
1. Install PostgreSQL and create a database
2. Run the schema migration:
```bash
psql -U gallery_user -d virtual_gallery_dev -f ./src/database/schema.sql
```

### 5. Run the Application
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The application will be accessible at `http://localhost:3000`

## Project Structure

```
src/
├── frontend/              # Client-side code
│   ├── assets/            # Images, 3D models, etc.
│   ├── components/        # Reusable UI components
│   ├── styles/            # CSS files
│   └── main.js           # Main application entry point
├── backend/               # Server-side code
│   ├── controllers/       # Business logic
│   ├── models/            # Data models
│   ├── routes/            # API route definitions
│   └── server.js         # Server entry point
├── database/              # Database schemas and migrations
├── ai-ml/                 # AI/ML models and utilities
│   ├── models/            # Machine learning models
│   ├── data/              # Training data
│   └── utils/             # Utility functions
├── iot/                   # IoT device integration
│   ├── sensors/           # Sensor data processing
│   └── devices/           # Device management
└── docs/                  # Documentation
    ├── api/               # API documentation
    └── architecture/      # System architecture docs
```

## Frontend Development

### Creating New Components
1. Create a new file in `src/frontend/components/`
2. Follow the existing component pattern with show/hide functionality
3. Export the class for use in other modules
4. Import and instantiate in the main application

### Working with 3D Assets
- Place 3D models in `src/frontend/assets/models/`
- Use GLTF/GLB format for optimal performance
- Implement LOD (Level of Detail) for complex models
- Compress textures using appropriate formats (JPEG for photos, PNG for transparency)

### VR/AR Integration
- Use WebXR API for cross-platform VR support
- Implement fallbacks for browsers without VR support
- Test with various VR headsets and controllers
- Optimize for performance to maintain smooth frame rates

## Backend Development

### Adding New Routes
1. Create a new route file in `src/backend/routes/`
2. Define endpoints with appropriate HTTP methods
3. Implement controller functions in `src/backend/controllers/`
4. Add the route to `src/backend/server.js`

### Database Operations
- Use the database abstraction in `src/backend/models/db.js`
- Implement proper error handling for database operations
- Use transactions for multi-step operations
- Add indexes for frequently queried fields

### API Best Practices
- Use consistent naming conventions
- Implement proper error responses
- Validate input parameters
- Document new endpoints in the API documentation

## AI/ML Development

### Model Training
1. Prepare training data in `src/ai-ml/data/`
2. Use the preprocessing utilities in `src/ai-ml/utils/`
3. Train models using TensorFlow.js or Python
4. Save trained models to `src/ai-ml/models/`

### Adding New AI Features
- Create new model files in `src/ai-ml/models/`
- Add corresponding API endpoints in `src/backend/routes/aiRoutes.js`
- Implement controller logic in `src/backend/controllers/aiController.js`
- Update documentation with new capabilities

## IoT Integration

### Adding New Sensors
1. Create sensor handlers in `src/iot/sensors/`
2. Register new devices in `src/iot/devices/DeviceManager.ts`
3. Implement data processing in `src/iot/sensors/SensorProcessor.ts`
4. Add visualization or response logic in the frontend

### Testing IoT Components
- Use mock data during development
- Test with actual hardware in staging environment
- Implement fallbacks when sensors are unavailable
- Log sensor data for analysis and debugging

## Testing

### Unit Tests
Run unit tests with:
```bash
npm test
```

Add new tests in corresponding `__tests__` directories.

### Integration Tests
Test API endpoints and database operations:
```bash
npm run test:integration
```

### Performance Testing
Monitor application performance:
```bash
npm run test:performance
```

## Deployment

### Building for Production
```bash
npm run build
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
DB_HOST=prod-db-host
DB_PORT=5432
DB_NAME=virtual_gallery_prod
DB_USER=gallery_user
DB_PASSWORD=secure_production_password
REDIS_URL=redis://prod-redis-host:6379
JWT_SECRET=production_jwt_secret
AI_MODEL_PATH=/opt/models/
CDN_URL=https://cdn.example.com
```

### Docker Deployment
Build and run with Docker:
```bash
docker build -t virtual-gallery .
docker run -p 3000:3000 virtual-gallery
```

## Troubleshooting

### Common Issues
- **WebGL not supported**: Ensure browser supports WebGL and GPU drivers are up to date
- **Slow performance**: Check asset sizes and implement LOD for complex models
- **Database connection errors**: Verify database credentials and network connectivity
- **VR not working**: Ensure WebXR is enabled in browser settings

### Debugging Tips
- Enable verbose logging with `DEBUG=* npm run dev`
- Use browser developer tools to inspect 3D scenes
- Monitor database queries for performance issues
- Check IoT device connections and permissions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request