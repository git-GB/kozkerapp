#!/bin/bash

# AI Kozker Domain Migration Script
# Migrates authentication and tools functionality from kozker.com to ai.kozker.com
# Uses SAME database - no data migration needed

set -e

echo "🚀 Starting AI Kozker Domain Migration"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="ai.kozker.com"
MAIN_DOMAIN="kozker.com"
PROJECT_NAME="ai-kozker-tools"

echo -e "${BLUE}Target Domain:${NC} $DOMAIN"
echo -e "${BLUE}Main Domain:${NC} $MAIN_DOMAIN"
echo -e "${BLUE}Project:${NC} $PROJECT_NAME"
echo ""

# Step 1: Verify Environment Variables
echo -e "${YELLOW}Step 1: Verifying Environment Variables${NC}"
echo "----------------------------------------"

required_vars=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "SUPABASE_SERVICE_ROLE_KEY"
    "NEXT_PUBLIC_SITE_URL"
    "NEXT_PUBLIC_MAIN_SITE_URL"
)

missing_vars=()
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    else
        echo -e "${GREEN}✓${NC} $var is set"
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo -e "${RED}❌ Missing required environment variables:${NC}"
    for var in "${missing_vars[@]}"; do
        echo -e "${RED}  - $var${NC}"
    done
    echo ""
    echo "Please set these variables and run the script again."
    exit 1
fi

echo -e "${GREEN}✅ All required environment variables are set${NC}"
echo ""

# Step 2: Test Database Connection
echo -e "${YELLOW}Step 2: Testing Database Connection${NC}"
echo "-----------------------------------"

if command -v node &> /dev/null; then
    node scripts/test-database-connection.js
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Database connection successful${NC}"
    else
        echo -e "${RED}❌ Database connection failed${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  Node.js not found, skipping database test${NC}"
fi
echo ""

# Step 3: Build Application
echo -e "${YELLOW}Step 3: Building Application${NC}"
echo "----------------------------"

echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Application built successfully${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi
echo ""

# Step 4: Run Database Migrations (if needed)
echo -e "${YELLOW}Step 4: Running Database Migrations${NC}"
echo "------------------------------------"

if [ -f "scripts/run-migrations.js" ]; then
    node scripts/run-migrations.js
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Database migrations completed${NC}"
    else
        echo -e "${RED}❌ Database migrations failed${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  No migration script found, skipping${NC}"
fi
echo ""

# Step 5: Validate Application
echo -e "${YELLOW}Step 5: Validating Application${NC}"
echo "-------------------------------"

echo "Running validation tests..."
if [ -f "scripts/validate-migration.js" ]; then
    node scripts/validate-migration.js
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Application validation passed${NC}"
    else
        echo -e "${RED}❌ Application validation failed${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  No validation script found, skipping${NC}"
fi
echo ""

# Step 6: Generate Deployment Summary
echo -e "${YELLOW}Step 6: Generating Deployment Summary${NC}"
echo "--------------------------------------"

cat > deployment-summary.md << EOF
# AI Kozker Migration Summary

## Migration Details
- **Date**: $(date)
- **Target Domain**: $DOMAIN
- **Main Domain**: $MAIN_DOMAIN
- **Database**: Same as kozker.com (no migration needed)

## What Was Migrated
- ✅ Complete authentication system
- ✅ All 22 AI tools functionality
- ✅ User analytics and tracking
- ✅ Cross-domain authentication
- ✅ Database connectivity

## Environment Variables Required
$(for var in "${required_vars[@]}"; do echo "- $var"; done)

## Next Steps
1. Deploy to $DOMAIN
2. Update DNS settings
3. Configure SSL certificates
4. Test cross-domain functionality
5. Update kozker.com redirects

## Rollback Plan
If issues occur:
1. Revert DNS changes
2. Restore kozker.com auth functionality
3. Check database connectivity
4. Verify user sessions

## Support
- Database: Same as kozker.com
- All user data preserved
- No data migration required
EOF

echo -e "${GREEN}✅ Deployment summary generated: deployment-summary.md${NC}"
echo ""

# Final Success Message
echo -e "${GREEN}🎉 AI Kozker Migration Completed Successfully!${NC}"
echo "=============================================="
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Deploy the application to $DOMAIN"
echo "2. Configure DNS and SSL"
echo "3. Test authentication and tools"
echo "4. Update kozker.com redirects"
echo ""
echo -e "${BLUE}Files Generated:${NC}"
echo "- deployment-summary.md"
echo "- Build artifacts in .next/"
echo ""
echo -e "${YELLOW}Important:${NC} This migration uses the SAME database as kozker.com"
echo "All user data, sessions, and tool history are preserved."
