# Virtual Art Gallery

This is a virtual art gallery with VR support, AI curation, and IoT integration.

## Project Structure

```
src/
├── frontend/
│   ├── assets/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── alert.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── sheet.tsx
│   │   │   └── sidebar.tsx
│   │   ├── Header.tsx       # Updated header component
│   │   └── Footer.tsx       # Updated footer component
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── pages/
│   │   ├── AdminPanel.tsx
│   │   ├── ArtworkDetailPage.tsx
│   │   ├── ArtworksPage.tsx
│   │   ├── CollectionsPage.tsx
│   │   ├── CuratorPanel.tsx
│   │   ├── GalleriesListPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── RoomManagementPage.tsx
│   │   ├── RoomPage.tsx
│   │   ├── StaffDashboardPage.tsx
│   │   ├── StaffPanel.tsx
│   │   ├── ToursPage.tsx
│   │   ├── TourGuidePanel.tsx
│   │   ├── VrGalleryPage.tsx
│   │   ├── VirtualGalleryPage.tsx
│   │   └── AuctionParticipantPanel.tsx
│   ├── services/
│   ├── styles/
│   │   ├── globals.css      # Global styles and CSS variables
│   │   └── main.css         # Main styles for 3D gallery
│   ├── types/
│   │   └── index.ts         # Type definitions
│   ├── App.tsx              # Main application component
│   ├── index.css            # Main styles
│   └── main.tsx             # Entry point
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

2. Install TypeScript globally: `npm install -g typescript ts-node`

3. Set up environment variables in a `.env` file:
   ```
   DB_HOST=your_host
   DB_PORT=5432
   DB_NAME=virtual_gallery_db
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_STRING=postgres://your_username:your_password@your_host:5432/virtual_gallery_db
   JWT_SECRET=your-super-secret-jwt-key
   ```
4. Initialize the database: `npm run init-db`
5. Build the project: `npm run build`
6. Run the application: `npm start`

## Frontend Development

The frontend now uses shadcn/ui components for a consistent and accessible UI:

1. Install additional dependencies for shadcn/ui:
   ```bash
   npm install class-variance-authority clsx tailwind-merge lucide-react tailwindcss-animate
   npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-dropdown-menu
   ```

2. The UI components are located in `src/components/ui/`
3. Components are built with accessibility in mind using Radix UI primitives
4. Responsive design is implemented using Tailwind CSS utility classes

## Development

For development mode: `npm run dev`

This will start the server in development mode with automatic reloading.

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