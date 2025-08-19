#!/bin/bash

# Kozker AI Tools Deployment Script
set -e

echo "🚀 Starting deployment of Kozker AI Tools..."

# Check if environment is provided
if [ -z "$1" ]; then
    echo "❌ Please specify environment: production, staging, or development"
    echo "Usage: ./scripts/deploy.sh [production|staging|development]"
    exit 1
fi

ENVIRONMENT=$1
echo "📦 Deploying to: $ENVIRONMENT"

# Load environment-specific variables
case $ENVIRONMENT in
    "production")
        DOMAIN="ai.kozker.com"
        BRANCH="main"
        ;;
    "staging")
        DOMAIN="staging-ai.kozker.com"
        BRANCH="develop"
        ;;
    "development")
        DOMAIN="dev-ai.kozker.com"
        BRANCH="develop"
        ;;
    *)
        echo "❌ Invalid environment. Use: production, staging, or development"
        exit 1
        ;;
esac

echo "🌐 Target domain: $DOMAIN"
echo "🌿 Target branch: $BRANCH"

# Check if required environment variables are set
echo "🔍 Checking environment variables..."
required_vars=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "SUPABASE_SERVICE_ROLE_KEY"
)

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Required environment variable $var is not set"
        exit 1
    fi
done

echo "✅ Environment variables check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run type checking
echo "🔍 Running type check..."
npm run type-check

# Run linting
echo "🧹 Running linter..."
npm run lint

# Build the application
echo "🏗️ Building application..."
npm run build

# Deploy based on platform
if command -v vercel &> /dev/null; then
    echo "🚀 Deploying to Vercel..."
    if [ "$ENVIRONMENT" = "production" ]; then
        vercel --prod --yes
    else
        vercel --yes
    fi
elif command -v netlify &> /dev/null; then
    echo "🚀 Deploying to Netlify..."
    netlify deploy --prod --dir=.next
elif [ -f "docker-compose.yml" ]; then
    echo "🐳 Deploying with Docker..."
    docker-compose down
    docker-compose build
    docker-compose up -d
else
    echo "❌ No deployment platform detected"
    echo "Please install Vercel CLI, Netlify CLI, or ensure Docker is available"
    exit 1
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Your application should be available at: https://$DOMAIN"

# Run post-deployment checks
echo "🔍 Running post-deployment health checks..."
sleep 10

if curl -f -s "https://$DOMAIN/api/health" > /dev/null; then
    echo "✅ Health check passed"
else
    echo "⚠️ Health check failed - please verify deployment manually"
fi

echo "🎉 Deployment process completed!"
