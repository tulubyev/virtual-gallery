# Virtual Art Gallery - Project Structure

## Directory Structure
```
virtual-art-gallery/
├── package.json                 # Project dependencies and scripts
├── README.md                   # Project overview
├── QWEN.md                     # Original requirements document
├── src/
│   ├── frontend/
│   │   ├── index.html          # Main HTML file
│   │   ├── main.js             # Main application logic
│   │   ├── styles/
│   │   │   └── main.css        # Main stylesheet
│   │   ├── assets/             # Images, 3D models, etc.
│   │   └── components/
│   │       ├── ArtworkCard.js  # Artwork detail component
│   │       └── GalleryNavigation.js # Navigation component
│   ├── backend/
│   │   ├── server.js           # Main server file
│   │   ├── routes/
│   │   │   ├── artworkRoutes.js
│   │   │   ├── galleryRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   └── aiRoutes.js
│   │   ├── controllers/
│   │   │   ├── artworkController.js
│   │   │   ├── galleryController.js
│   │   │   ├── userController.js
│   │   │   └── aiController.js
│   │   └── models/
│   │       └── db.js           # Database abstraction
│   ├── database/
│   │   └── schema.sql          # Database schema
│   ├── ai-ml/
│   │   ├── models/
│   │   │   └── artworkAnalyzer.js # AI model for artwork analysis
│   │   └── utils/
│   │       └── dataPreprocessing.js # Data preprocessing utilities
│   ├── iot/
│   │   ├── devices/
│   │   │   └── deviceManager.js # IoT device management
│   │   └── sensors/
│   │       └── sensorProcessor.js # Sensor data processing
│   └── docs/
│       ├── api/
│       │   └── api-docs.md     # API documentation
│       ├── architecture/
│       │   └── architecture.md # System architecture
│       └── development-guide.md # Development guidelines
```

## Key Files and Their Purpose

### Frontend
- `src/frontend/main.js`: Initializes the 3D gallery using Three.js
- `src/frontend/components/ArtworkCard.js`: Displays detailed information about artworks
- `src/frontend/styles/main.css`: Styles for the gallery interface

### Backend
- `src/backend/server.js`: Express server with Socket.IO integration
- `src/backend/routes/artworkRoutes.js`: API endpoints for artwork management
- `src/backend/controllers/artworkController.js`: Business logic for artwork operations

### Database
- `src/database/schema.sql`: PostgreSQL schema for all tables
- `src/backend/models/db.js`: Mock database implementation for development

### AI/ML
- `src/ai-ml/models/artworkAnalyzer.js`: AI model for analyzing artworks
- `src/ai-ml/utils/dataPreprocessing.js`: Utilities for preparing data for ML models

### IoT
- `src/iot/devices/deviceManager.js`: Manages connections to IoT devices
- `src/iot/sensors/sensorProcessor.js`: Processes sensor data into meaningful insights

### Documentation
- `src/docs/api/api-docs.md`: Comprehensive API documentation
- `src/docs/architecture/architecture.md`: System architecture overview
- `src/docs/development-guide.md`: Instructions for developers

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables in a `.env` file
3. Initialize the database with the schema
4. Run the application: `npm run dev`

For detailed instructions, see the development guide in `src/docs/development-guide.md`.