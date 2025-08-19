#!/bin/bash

# Kozker.com Cleanup Script
# Removes authentication and tools functionality from kozker.com
# Implements redirects to ai.kozker.com

set -e

echo "🧹 Kozker.com Cleanup Script"
echo "============================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BACKUP_BRANCH="backup-before-cleanup-$(date +%Y%m%d-%H%M%S)"
AI_DOMAIN="ai.kozker.com"

echo -e "${BLUE}Target AI Domain:${NC} $AI_DOMAIN"
echo -e "${BLUE}Backup Branch:${NC} $BACKUP_BRANCH"
echo ""

# Warning and confirmation
echo -e "${RED}⚠️  WARNING: This script will remove ALL authentication and tools code from kozker.com${NC}"
echo -e "${RED}⚠️  Make sure ai.kozker.com is deployed and working before proceeding${NC}"
echo ""

read -p "Are you sure you want to proceed? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cleanup cancelled."
    exit 1
fi

# Step 1: Create backup
echo -e "${YELLOW}Step 1: Creating backup branch${NC}"
echo "--------------------------------"

git checkout -b "$BACKUP_BRANCH"
git push origin "$BACKUP_BRANCH"
git checkout main

echo -e "${GREEN}✅ Backup created: $BACKUP_BRANCH${NC}"
echo ""

# Step 2: Remove authentication code
echo -e "${YELLOW}Step 2: Removing authentication code${NC}"
echo "------------------------------------"

# Remove authentication directories
auth_dirs=(
    "components/auth"
    "app/auth"
    "app/login"
    "app/register"
    "app/profile"
    "app/dashboard"
    "lib/auth"
    "lib/supabase"
)

for dir in "${auth_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "Removing directory: $dir"
        rm -rf "$dir"
    fi
done

# Remove authentication files
auth_files=(
    "contexts/auth-context.tsx"
    "contexts/analytics-context.tsx"
    "components/auth-modal.tsx"
    "components/auth-popup-manager.tsx"
    "components/auth-trigger-button.tsx"
)

for file in "${auth_files[@]}"; do
    if [ -f "$file" ]; then
        echo "Removing file: $file"
        rm -f "$file"
    fi
done

echo -e "${GREEN}✅ Authentication code removed${NC}"
echo ""

# Step 3: Remove tools code
echo -e "${YELLOW}Step 3: Removing tools code${NC}"
echo "----------------------------"

# Remove tools directories
tools_dirs=(
    "app/tools"
    "components/tools"
    "lib/tools"
)

for dir in "${tools_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "Removing directory: $dir"
        rm -rf "$dir"
    fi
done

# Remove tools files
tools_files=(
    "components/SmartFilterIntegration.tsx"
    "components/tool-tracker.tsx"
)

for file in "${tools_files[@]}"; do
    if [ -f "$file" ]; then
        echo "Removing file: $file"
        rm -f "$file"
    fi
done

echo -e "${GREEN}✅ Tools code removed${NC}"
echo ""

# Step 4: Update package.json
echo -e "${YELLOW}Step 4: Updating package.json${NC}"
echo "------------------------------"

if [ -f "package.json" ]; then
    # Create backup of package.json
    cp package.json package.json.backup

    # Remove Supabase dependencies (this is a simplified approach)
    echo "Removing authentication dependencies..."
    echo "Note: You may need to manually review and update package.json"
    
    # Create a note file for manual review
    cat > package-json-cleanup-notes.txt << EOF
Manual Package.json Cleanup Required:

Remove these dependencies:
- @supabase/auth-helpers-nextjs
- @supabase/supabase-js
- @supabase/ssr

Review and remove any other authentication-related dependencies.
EOF

    echo -e "${YELLOW}⚠️  Manual package.json review required${NC}"
    echo "See: package-json-cleanup-notes.txt"
fi

echo ""

# Step 5: Implement redirects
echo -e "${YELLOW}Step 5: Implementing redirects${NC}"
echo "-------------------------------"

# Create or update next.config.js with redirects
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Authentication redirects
      {
        source: '/login',
        destination: 'https://ai.kozker.com/auth/login',
        permanent: true,
      },
      {
        source: '/register',
        destination: 'https://ai.kozker.com/auth/register',
        permanent: true,
      },
      {
        source: '/signup',
        destination: 'https://ai.kozker.com/auth/register',
        permanent: true,
      },
      {
        source: '/sign-up',
        destination: 'https://ai.kozker.com/auth/register',
        permanent: true,
      },
      {
        source: '/sign-in',
        destination: 'https://ai.kozker.com/auth/login',
        permanent: true,
      },
      {
        source: '/auth/:path*',
        destination: 'https://ai.kozker.com/auth/:path*',
        permanent: true,
      },
      {
        source: '/profile',
        destination: 'https://ai.kozker.com/profile',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: 'https://ai.kozker.com/dashboard',
        permanent: true,
      },
      {
        source: '/account',
        destination: 'https://ai.kozker.com/profile',
        permanent: true,
      },
      {
        source: '/settings',
        destination: 'https://ai.kozker.com/profile',
        permanent: true,
      },
      {
        source: '/forgot-password',
        destination: 'https://ai.kozker.com/auth/forgot-password',
        permanent: true,
      },
      {
        source: '/reset-password',
        destination: 'https://ai.kozker.com/auth/reset-password',
        permanent: true,
      },

      // Tools redirects
      {
        source: '/tools',
        destination: 'https://ai.kozker.com/tools',
        permanent: true,
      },
      {
        source: '/tools/:path*',
        destination: 'https://ai.kozker.com/tools/:path*',
        permanent: true,
      },
      {
        source: '/tool/:path*',
        destination: 'https://ai.kozker.com/tools/:path*',
        permanent: true,
      },
      {
        source: '/ai-tools',
        destination: 'https://ai.kozker.com/tools',
        permanent: true,
      },
      {
        source: '/ai-tools/:path*',
        destination: 'https://ai.kozker.com/tools/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
EOF

echo -e "${GREEN}✅ Redirects implemented in next.config.js${NC}"
echo ""

# Step 6: Generate cleanup summary
echo -e "${YELLOW}Step 6: Generating cleanup summary${NC}"
echo "-----------------------------------"

cat > cleanup-summary.md << EOF
# Kozker.com Cleanup Summary

## Cleanup Date
$(date)

## What Was Removed
- ✅ All authentication components and pages
- ✅ All tools components and pages
- ✅ Authentication contexts and providers
- ✅ Supabase client configurations
- ✅ Analytics tracking for tools

## What Was Added
- ✅ Comprehensive redirects to ai.kozker.com
- ✅ Authentication redirects (/login, /register, /auth/*)
- ✅ Tools redirects (/tools, /tools/*)
- ✅ Profile and dashboard redirects

## Files Removed
### Authentication Files:
- components/auth/
- app/auth/
- app/login/
- app/register/
- app/profile/
- app/dashboard/
- contexts/auth-context.tsx
- contexts/analytics-context.tsx
- lib/auth/
- lib/supabase/

### Tools Files:
- app/tools/
- components/tools/
- lib/tools/
- components/SmartFilterIntegration.tsx
- components/tool-tracker.tsx

## Manual Tasks Required
1. Review and update package.json (see package-json-cleanup-notes.txt)
2. Update Header component to use ai.kozker.com links
3. Update Footer component to use ai.kozker.com links
4. Update Homepage CTAs to point to ai.kozker.com
5. Test all redirects after deployment

## Backup Information
- Backup branch: $BACKUP_BRANCH
- Original package.json: package.json.backup

## Next Steps
1. Update navigation components manually
2. Test the application locally
3. Deploy to production
4. Verify all redirects work
5. Monitor for any issues

## Rollback Plan
If issues occur:
\`\`\`bash
git checkout $BACKUP_BRANCH
git checkout main
git reset --hard $BACKUP_BRANCH
\`\`\`
EOF

echo -e "${GREEN}✅ Cleanup summary generated: cleanup-summary.md${NC}"
echo ""

# Final message
echo -e "${GREEN}🎉 Kozker.com Cleanup Completed!${NC}"
echo "================================="
echo ""
echo -e "${BLUE}What was done:${NC}"
echo "✅ Authentication code removed"
echo "✅ Tools code removed"
echo "✅ Redirects implemented"
echo "✅ Backup created"
echo ""
echo -e "${YELLOW}Manual tasks remaining:${NC}"
echo "1. Review package.json (see package-json-cleanup-notes.txt)"
echo "2. Update Header component links"
echo "3. Update Footer component links"
echo "4. Update Homepage CTAs"
echo "5. Test and deploy"
echo ""
echo -e "${BLUE}Files generated:${NC}"
echo "- cleanup-summary.md"
echo "- package-json-cleanup-notes.txt"
echo "- next.config.js (updated with redirects)"
echo ""
echo -e "${GREEN}Ready for manual component updates and deployment!${NC}"
