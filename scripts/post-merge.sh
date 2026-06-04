#!/bin/bash
set -e

echo "=== Post-merge setup ==="

echo "Installing root dependencies..."
npm install --legacy-peer-deps --no-audit --no-fund

echo "Post-merge setup complete."
