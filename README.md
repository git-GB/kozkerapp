# Kozker AI Tools - Standalone Application

This is a standalone Next.js application for the Kozker AI tools page, designed to be deployed on ai.kozker.com while maintaining cross-domain authentication and analytics with the main kozker.com site.

## 🚀 Migration Overview

This application contains **ALL** authentication and tools functionality from kozker.com, ready to be deployed as a standalone application on ai.kozker.com. After deployment, you'll need to remove auth functionality from the main kozker.com site and set up proper redirects.

## ✨ Features

- **Complete Tools Catalog**: All 22 AI-powered business tools with smart filtering
- **Cross-Domain Authentication**: Seamless login/signup that works across domains
- **Analytics Tracking**: Full user behavior and tool usage tracking
- **Responsive Design**: Mobile-first design with dark mode support
- **SEO Optimized**: Proper meta tags and structured data
- **Same Database**: Uses identical database as kozker.com - no data migration needed

## 📋 Migration Checklist

### Phase 1: Deploy AI Kozker Application
- [ ] Set up ai.kozker.com domain and SSL
- [ ] Configure environment variables (see below)
- [ ] Deploy application to ai.kozker.com
- [ ] Test authentication and tools functionality
- [ ] Update Supabase URL configuration

### Phase 2: Update Main Site
- [ ] Remove authentication components from kozker.com
- [ ] Add redirects from kozker.com/auth/* to ai.kozker.com/auth/*
- [ ] Add redirects from kozker.com/tools/* to ai.kozker.com/tools/*
- [ ] Update navigation links to point to ai.kozker.com
- [ ] Deploy updated kozker.com

### Phase 3: Verification
- [ ] Test cross-domain authentication flow
- [ ] Verify tool usage tracking works
- [ ] Confirm analytics are properly recorded
- [ ] Test all redirects and navigation

## 🔧 Quick Start

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Environment Setup**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Fill in your Supabase credentials and configuration.

3. **Development**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Build for Production**
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

## 🌍 Environment Variables

### Required (Same as kozker.com)
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

### Domain Configuration
\`\`\`env
NEXT_PUBLIC_SITE_URL=https://ai.kozker.com
NEXT_PUBLIC_MAIN_SITE_URL=https://kozker.com
NEXT_PUBLIC_PARENT_DOMAIN=kozker.com
\`\`\`

### Cross-Domain Settings
\`\`\`env
NEXT_PUBLIC_ENABLE_CROSS_DOMAIN_AUTH=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
\`\`\`

### Optional
\`\`\`env
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
\`\`\`

## 🔗 Cross-Domain Configuration

This application is configured to work seamlessly with the main kozker.com site:

1. **Authentication**: Users can sign in on either domain and remain authenticated
2. **Analytics**: Tool usage is tracked across both domains
3. **Navigation**: Seamless navigation between tools and main site

### Supabase Configuration

**CRITICAL**: Update your Supabase project to allow ai.kozker.com:

1. Go to Authentication > URL Configuration
2. Add ai.kozker.com to Site URL and Redirect URLs:
   - Site URL: `https://ai.kozker.com`
   - Redirect URLs: `https://ai.kozker.com/**`

## 🚀 Deployment Options

### 1. Vercel (Recommended)
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

### 2. Netlify
\`\`\`bash
# Build the application
npm run build

# Deploy using Netlify CLI or drag-and-drop
\`\`\`

### 3. Docker
\`\`\`bash
# Build Docker image
docker build -t kozker-ai-tools .

# Run container
docker run -p 3000:3000 kozker-ai-tools
\`\`\`

## 📊 Database Schema

The application uses the **SAME** database as kozker.com. No migration needed!

Expected Supabase tables:
- `users`: User profiles and authentication
- `user_sessions`: Session tracking
- `tool_usage`: Tool usage analytics
- `user_analytics`: Aggregated user analytics

## 🛠️ Migration Scripts

Use the provided scripts to automate the migration:

\`\`\`bash
# Test database connection
node scripts/test-database-connection.js

# Run migration validation
node scripts/validate-migration.js

# Full migration script
./scripts/migrate-to-ai-domain.sh
\`\`\`

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── tools/             # Tools catalog and individual tools
│   ├── dashboard/         # User dashboard
│   └── api/               # API routes
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── layout/            # Layout components
│   └── tools/             # Tools-related components
├── contexts/              # React contexts (auth, analytics)
├── lib/                   # Utility functions and configurations
├── scripts/               # Migration and setup scripts
├── docs/                  # Documentation and guides
└── public/                # Static assets
\`\`\`

## 🔧 Tools Included

All 22 AI-powered tools from kozker.com:

**Content Creation**
- Blog Generator
- Social Media Post Generator
- Email Template Generator
- Product Description Generator

**Business Planning**
- Business Plan Generator
- SWOT Analysis Generator
- Market Research Generator
- Competitor Analysis Generator

**Branding & Design**
- Domain Name Generator
- Business Name Generator
- Logo Concept Generator
- Brand Voice Generator

**Marketing & Growth**
- SEO Meta Generator
- Ad Copy Generator
- Landing Page Generator
- Email Subject Line Generator

**Analytics & Optimization**
- A/B Test Generator
- Conversion Rate Calculator
- ROI Calculator
- Customer Persona Generator

**Productivity**
- Meeting Agenda Generator
- Project Timeline Generator

## 🚨 Important Notes

1. **Same Database**: This application uses the EXACT same Supabase database as kozker.com
2. **No Data Migration**: All user data, authentication, and analytics remain intact
3. **Cross-Domain**: Users can seamlessly navigate between kozker.com and ai.kozker.com
4. **Authentication**: After migration, ALL auth functionality moves to ai.kozker.com
5. **Redirects**: kozker.com will redirect auth and tools URLs to ai.kozker.com

## 📖 Documentation

- [Deployment Guide](docs/DEPLOYMENT-GUIDE.md)
- [Testing Checklist](docs/TESTING-CHECKLIST.md)
- [Cleanup Instructions](docs/KOZKER-CLEANUP-INSTRUCTIONS.md)
- [Redirect Configuration](docs/REDIRECT-CONFIGURATION.md)

## 🆘 Troubleshooting

### Cross-Domain Authentication Issues
1. Verify both domains are added to Supabase URL configuration
2. Check CORS settings in your deployment platform
3. Ensure cookies are set with proper domain attributes

### Tools Not Loading
1. Check Supabase connection and API keys
2. Verify database tables exist and have proper RLS policies
3. Check browser console for JavaScript errors

### Analytics Not Tracking
1. Verify Google Analytics measurement ID is set
2. Check that analytics context is properly wrapped around components
3. Ensure user consent for tracking is obtained

## 📞 Support

For migration support:
- Email: support@kozker.com
- Documentation: Check the `/docs` folder
- Issues: Create detailed bug reports with steps to reproduce

## 📄 License

MIT License - See LICENSE file for details.

---

**Ready to migrate?** Follow the deployment guide and migration scripts to move your authentication and tools to ai.kozker.com!
