#!/bin/bash

# Rollback script for AI Kozker migration
# Restores kozker.com functionality if issues occur

set -e

echo "🔄 AI Kozker Migration Rollback"
echo "==============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}⚠️  This script will help rollback the AI Kozker migration${NC}"
echo -e "${YELLOW}⚠️  Database data will NOT be affected (same database used)${NC}"
echo ""

# Confirmation
read -p "Are you sure you want to proceed with rollback? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Rollback cancelled."
    exit 1
fi

echo -e "${BLUE}Starting rollback process...${NC}"
echo ""

# Step 1: Check current status
echo -e "${YELLOW}Step 1: Checking current deployment status${NC}"
echo "--------------------------------------------"

if [ -f "deployment-summary.md" ]; then
    echo "✅ Found deployment summary"
    echo "📄 Deployment details:"
    grep -E "Date|Target Domain|Main Domain" deployment-summary.md || true
else
    echo "⚠️  No deployment summary found"
fi
echo ""

# Step 2: Database status check
echo -e "${YELLOW}Step 2: Verifying database integrity${NC}"
echo "-------------------------------------"

if command -v node &> /dev/null && [ -f "scripts/test-database-connection.js" ]; then
    echo "Testing database connection..."
    node scripts/test-database-connection.js
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Database is intact and accessible${NC}"
    else
        echo -e "${RED}❌ Database connection issues detected${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Cannot test database connection${NC}"
fi
echo ""

# Step 3: Generate rollback instructions
echo -e "${YELLOW}Step 3: Generating rollback instructions${NC}"
echo "----------------------------------------"

cat > rollback-instructions.md << EOF
# AI Kozker Migration Rollback Instructions

## Rollback Date
$(date)

## Critical Information
- **Database**: No changes needed - same database as kozker.com
- **User Data**: All user data, sessions, and tool usage preserved
- **Authentication**: All user accounts remain intact

## Immediate Actions Required

### 1. DNS Changes
- Remove or update DNS records for ai.kozker.com
- Ensure kozker.com points to original server
- Verify SSL certificates are working

### 2. Kozker.com Restoration
- Restore original authentication functionality on kozker.com
- Remove any redirects to ai.kozker.com
- Test login and tool access on kozker.com

### 3. Database Verification
- Verify kozker.com can access the database
- Test user authentication on kozker.com
- Confirm tool usage tracking works

### 4. User Communication
- Notify users of any temporary service interruption
- Provide updated access instructions if needed
- Monitor for user-reported issues

## Verification Checklist
- [ ] kozker.com authentication working
- [ ] All tools accessible on kozker.com
- [ ] User data intact and accessible
- [ ] No broken redirects or links
- [ ] SSL certificates valid
- [ ] Database connectivity confirmed

## Post-Rollback Monitoring
- Monitor user login success rates
- Check tool usage analytics
- Verify no data loss occurred
- Test cross-browser compatibility

## Support Information
- Database: Same as before migration
- User accounts: No changes required
- Tool history: Fully preserved
- Analytics: Continuous tracking maintained

## Next Steps
1. Investigate root cause of migration issues
2. Plan improved migration strategy if needed
3. Test thoroughly in staging environment
4. Communicate timeline to stakeholders

## Emergency Contacts
- Database issues: Check Supabase dashboard
- DNS issues: Contact domain registrar
- SSL issues: Contact hosting provider
EOF

echo -e "${GREEN}✅ Rollback instructions generated: rollback-instructions.md${NC}"
echo ""

# Step 4: Cleanup temporary files
echo -e "${YELLOW}Step 4: Cleaning up migration artifacts${NC}"
echo "---------------------------------------"

cleanup_files=(
    "deployment-summary.md"
    "validation-report.json"
    "validation-errors.json"
    ".next"
    "node_modules/.cache"
)

for file in "${cleanup_files[@]}"; do
    if [ -e "$file" ]; then
        echo "Removing $file..."
        rm -rf "$file"
    fi
done

echo -e "${GREEN}✅ Cleanup completed${NC}"
echo ""

# Final message
echo -e "${GREEN}🔄 Rollback Process Completed${NC}"
echo "============================="
echo ""
echo -e "${BLUE}Important Notes:${NC}"
echo "• Database remains unchanged - all user data preserved"
echo "• Follow rollback-instructions.md for complete restoration"
echo "• Test kozker.com functionality thoroughly"
echo "• Monitor for any user-reported issues"
echo ""
echo -e "${YELLOW}Files Generated:${NC}"
echo "• rollback-instructions.md - Complete rollback guide"
echo ""
echo -e "${GREEN}✅ Ready to restore kozker.com functionality${NC}"
