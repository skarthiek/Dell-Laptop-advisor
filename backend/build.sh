#!/bin/bash

echo "🚀 Starting Dell Laptop Advisor Backend Build..."

# Upgrade pip
python -m pip install --upgrade pip

# Install dependencies with verbose output
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt --verbose

echo "✅ Build completed successfully!" 