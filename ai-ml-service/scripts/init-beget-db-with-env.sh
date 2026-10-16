#!/bin/bash

# Script to initialize beget.com database with proper environment setup

echo "🚀 Initializing AI/ML database on beget.com..."

# Set the DATABASE_URL environment variable
export DATABASE_URL="postgresql://tulubyev:CHANGE_ME@your-db-host:5432/aimlservice_db"

echo "🔗 Using DATABASE_URL: ${DATABASE_URL//CHANGE_ME/***}"

# Run the initialization script
node scripts/init-beget-db.js

echo "✅ Database initialization completed!"