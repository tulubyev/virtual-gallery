@echo off
REM Script to initialize beget.com database with proper environment setup (Windows)

echo 🚀 Initializing AI/ML database on beget.com...

REM Set the DATABASE_URL environment variable
set DATABASE_URL=postgresql://tulubyev:CHANGE_ME@your-db-host:5432/aimlservice_db

echo 🔗 Using DATABASE_URL: %DATABASE_URL%

REM Run the initialization script
node scripts/init-beget-db.js

echo ✅ Database initialization completed!
pause