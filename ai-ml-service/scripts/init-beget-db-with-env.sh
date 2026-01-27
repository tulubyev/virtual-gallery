#!/bin/bash

# Script to initialize beget.com database with proper environment setup

echo "🚀 Initializing AI/ML database on beget.com..."

# Set the DATABASE_URL environment variable
export DATABASE_URL="postgresql://tulubyev:CrossBaikal6times!@quoquuquosijo.beget.app:5432/aimlservice_db"

echo "🔗 Using DATABASE_URL: ${DATABASE_URL//CrossBaikal6times!/***}"

# Run the initialization script
node scripts/init-beget-db.js

echo "✅ Database initialization completed!"