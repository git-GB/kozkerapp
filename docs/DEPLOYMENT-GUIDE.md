# AI Kozker Deployment Guide

## Overview
This guide provides step-by-step instructions for deploying the AI Kozker standalone application to ai.kozker.com and cleaning up the original kozker.com site.

## Pre-Deployment Checklist

### 1. Environment Variables Setup
Ensure all required environment variables are configured in your deployment platform:

\`\`\`env
# Supabase Configuration (SAME as kozker.com)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Domain Configuration
NEXT_PUBLIC_SITE_URL=https://ai.kozker.com
NEXT_PUBLIC_MAIN_SITE_URL=https://kozker.com
NEXT_PUBLIC_PARENT_DOMAIN=kozker.com

# Cross-Domain Settings
NEXT_PUBLIC_ENABLE_CROSS_DOMAIN_AUTH=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Google Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
\`\`\`

### 2. DNS Configuration
Set up DNS records for ai.kozker.com:
- A record pointing to your hosting provider's IP
- CNAME record if using a CDN
- SSL certificate for HTTPS

### 3. Supabase Configuration
Update Supabase settings to allow ai.kozker.com:
1. Go to Supabase Dashboard > Authentication > URL Configuration
2. Add `https://ai.kozker.com` to Site URL
3. Add `https://ai.kozker.com/**` to Redirect URLs

## Deployment Steps

### Step 1: Deploy AI Kozker Application
1. Deploy the application to your hosting platform (Vercel, Netlify, etc.)
2. Configure environment variables
3. Test the deployment at ai.kozker.com
4. Verify authentication and tools functionality

### Step 2: Update kozker.com
1. Remove authentication components from kozker.com
2. Add redirects for auth and tools URLs
3. Update navigation to point to ai.kozker.com
4. Deploy updated kozker.com

### Step 3: Test Cross-Domain Functionality
1. Test login flow from ai.kozker.com
2. Verify tool usage tracking
3. Test navigation between domains
4. Confirm analytics are working

## Post-Deployment Verification

### Authentication Testing
- [ ] User registration works on ai.kozker.com
- [ ] User login works on ai.kozker.com
- [ ] Google OAuth works correctly
- [ ] Session persistence across page reloads
- [ ] Logout functionality works

### Tools Testing
- [ ] All 22 tools are accessible
- [ ] Tool filtering and search work
- [ ] Tool usage tracking is recorded
- [ ] Analytics data is captured

### Cross-Domain Testing
- [ ] Navigation from kozker.com to ai.kozker.com works
- [ ] Redirects from old URLs work correctly
- [ ] No broken links or 404 errors
- [ ] SEO redirects are in place

## Rollback Plan
If issues occur, use the rollback script:
\`\`\`bash
./scripts/rollback-migration.sh
\`\`\`

This will:
1. Restore original kozker.com functionality
2. Disable ai.kozker.com redirects
3. Revert DNS changes if needed

## Support and Troubleshooting
- Check deployment logs for errors
- Verify environment variables are set correctly
- Test database connectivity
- Monitor Supabase logs for authentication issues
