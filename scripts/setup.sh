#!/bin/bash

# Kozker AI Tools Setup Script
set -e

echo "🛠️ Setting up Kozker AI Tools development environment..."

# Check Node.js version
echo "🔍 Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check npm version
echo "🔍 Checking npm version..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "⚠️ Please update .env.local with your actual environment variables"
else
    echo "✅ .env.local already exists"
fi

# Make scripts executable
echo "🔧 Making scripts executable..."
chmod +x scripts/*.sh

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p public/images
mkdir -p logs

# Check if Supabase CLI is installed (optional)
if command -v supabase &> /dev/null; then
    echo "✅ Supabase CLI is available"
else
    echo "⚠️ Supabase CLI not found. Install it for database management:"
    echo "   npm install -g supabase"
fi

# Check if Vercel CLI is installed (optional)
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI is available"
else
    echo "⚠️ Vercel CLI not found. Install it for easy deployment:"
    echo "   npm install -g vercel"
fi

echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your environment variables"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:3000 to see your application"
echo ""
echo "For deployment:"
echo "- Run './scripts/deploy.sh production' for production deployment"
echo "- Run './scripts/deploy.sh staging' for staging deployment"
