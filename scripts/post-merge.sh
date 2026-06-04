#!/bin/bash
set -e

echo "=== Post-merge setup ==="

echo "Installing root dependencies..."
npm install --legacy-peer-deps --no-audit --no-fund

echo "Installing frontend dependencies..."
npm install --prefix src/frontend --no-audit --no-fund

echo "Building React SPA..."
npm run build --prefix src/frontend

echo "Post-merge setup complete."
