# Virtual Art Gallery

This is a virtual art gallery with VR support, AI curation, and IoT integration.

## Project Structure

```
src/
├── frontend/
│   ├── assets/
│   ├── components/
│   └── utils/
├── backend/
│   ├── controllers/
│   ├── models/
│   └── routes/
├── database/
│   ├── schema.sql          # Database schema
│   ├── initialize.js       # Database initialization script
│   └── README.md           # Database setup documentation
├── ai-ml/
│   ├── models/
│   ├── data/
│   └── utils/
├── iot/
│   ├── sensors/
│   └── devices/
└── docs/
    ├── api/
    └── architecture/
```

## Setup

1. Install dependencies: `npm install`

   Note: If you encounter issues with the installation, make sure you have Node.js and npm installed correctly.
   If the webxr package causes issues, it has been removed from dependencies as it was causing installation problems.

2. Set up environment variables in a `.env` file:
   ```
   DB_HOST=your_host
   DB_PORT=5432
   DB_NAME=virtual_gallery_db
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_STRING=postgres://your_username:your_password@your_host:5432/virtual_gallery_db
   JWT_SECRET=your-super-secret-jwt-key
   ```
3. Initialize the database: `npm run init-db`
4. Run the application: `npm start`

## Database Initialization

To initialize the database with all required tables, run:
```
npm run init-db
```

This will create all necessary tables including:
- Users and preferences
- Artworks with metadata
- Galleries and 3D models
- Collections (human and AI-generated)
- User interactions
- AI models information
- IoT sensor data

## Development

For development mode: `npm run dev`