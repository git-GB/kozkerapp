# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Kozker AI Tools is a standalone Next.js 14 application designed for ai.kozker.com, providing a comprehensive suite of 22+ AI-powered business tools. The application uses the App Router and implements cross-domain authentication with the main kozker.com site.

**Key Technologies:**
- Next.js 14 with App Router
- TypeScript with strict configuration
- Supabase for authentication and database
- Tailwind CSS with custom theme
- Radix UI components via shadcn/ui
- Cross-domain authentication system

## Common Development Commands

### Development & Building
```bash
# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Clean build artifacts
npm run clean

# Export static site
npm run export
```

### Code Quality & Analysis
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check

# Bundle analysis
npm run analyze
```

### Database & Migration
```bash
# Test database connection
npm run test-db

# Validate migration
npm run validate

# Run migration script
npm run migrate
```

### Deployment
```bash
# Deploy to Vercel
npm run deploy:vercel

# Deploy to Netlify
npm run deploy:netlify
```

### Docker
```bash
# Build and run with Docker
docker build -t kozker-ai-tools .
docker run -p 3000:3000 kozker-ai-tools

# Or use docker-compose
docker-compose up
```

## Architecture Overview

### App Structure (Next.js App Router)
- **`app/`**: Main application using App Router pattern
  - **Route groups**: `(cms)` for CMS-style pages
  - **Dynamic routes**: `[slug]` for blog posts, case studies
  - **API routes**: `api/` for backend endpoints
  - **Special files**: `layout.tsx`, `page.tsx`, `loading.tsx`, `not-found.tsx`

### Key Directories
- **`components/`**: Reusable React components with shadcn/ui integration
- **`contexts/`**: React contexts for auth, analytics, and currency
- **`lib/`**: Utilities, configurations, and business logic
  - `supabase/client.ts`: Database client configuration
  - `security/`: Security utilities and middleware
  - `cross-domain/`: Cross-domain authentication logic
- **`scripts/`**: Migration and database testing scripts
- **`docs/`**: Documentation and deployment guides

### Authentication Architecture
The app implements a sophisticated cross-domain authentication system:

1. **Primary Auth**: Supabase with PKCE flow
2. **Cross-Domain Sync**: PostMessage API + localStorage
3. **Session Management**: Custom session tracking in `user_sessions` table
4. **Cookie Configuration**: Shared cookies across `.kozker.com` domain

```typescript
// Key auth configuration in lib/supabase/client.ts
cookieOptions: {
  name: "kozker-auth-token",
  domain: env.ENABLE_CROSS_DOMAIN_AUTH ? `.${env.PARENT_DOMAIN}` : undefined,
  maxAge: 60 * 60 * 24 * 30, // 30 days
  sameSite: "lax"
}
```

### Component Architecture
- **Provider Pattern**: Multiple context providers wrap the app
  - `ThemeProvider` → `CrossDomainProvider` → `AuthProvider` → `AnalyticsProvider` → `CurrencyProvider`
- **Layout Components**: `Header` and `Footer` with responsive design
- **AI Tools**: 20+ individual tool pages with consistent loading states
- **Form Handling**: React Hook Form with Zod validation

### Database Schema (Supabase)
Core tables expected:
- `users`: Extended user profiles
- `user_sessions`: Session tracking and device info
- `tool_usage`: Analytics for tool interactions
- `user_analytics`: Aggregated user behavior data

## Development Guidelines

### TypeScript Configuration
- Strict mode enabled with `bundler` module resolution
- Path aliases: `@/*` maps to project root
- Build errors ignored for flexibility (can be re-enabled for production)

### Styling System
- **Primary Brand Color**: `#FF6E30` (Orange)
- **CSS Variables**: Custom properties for theming
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Supported via `next-themes`

### Environment Variables
Required variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=https://ai.kozker.com
NEXT_PUBLIC_MAIN_SITE_URL=https://kozker.com
NEXT_PUBLIC_PARENT_DOMAIN=kozker.com
NEXT_PUBLIC_ENABLE_CROSS_DOMAIN_AUTH=true
```

### Security Features
- **CSP Headers**: Configured in `next.config.js`
- **Input Validation**: Zod schemas throughout
- **Rate Limiting**: Built-in rate limiting utilities
- **Error Handling**: Centralized error boundary system
- **Session Security**: Secure cookie configuration with PKCE

### Testing Strategy
- No formal test suite currently implemented
- Database connection testing via `npm run test-db`
- Migration validation via `npm run validate`
- Manual testing checklist in `docs/TESTING-CHECKLIST.md`

## AI Tools Catalog

The application includes 20+ specialized AI tools organized by category:

**Content Creation**: Blog generator, social media posts, email templates, product descriptions
**Business Planning**: Business plans, SWOT analysis, market research, competitor analysis  
**Branding**: Domain/business name generators, logo concepts, brand voice
**Marketing**: SEO meta tags, ad copy, landing pages, email subject lines
**Analytics**: A/B testing, conversion calculators, ROI analysis, customer personas
**Productivity**: Meeting agendas, project timelines

Each tool follows a consistent pattern:
- Dedicated route in `app/tools/[tool-name]/`
- Loading state with skeleton UI
- Form-based input with validation
- AI-powered generation via API routes

## Migration & Deployment Context

This is a **migration project** from kozker.com to ai.kozker.com:
- Same Supabase database (no data migration needed)
- Cross-domain authentication maintains user sessions
- Redirects will be implemented on main site
- Complete standalone deployment capability

Key migration scripts:
- `scripts/migrate-to-ai-domain.sh`: Full migration automation
- `scripts/validate-migration.js`: Post-deployment validation
- `scripts/test-database-connection.js`: Database connectivity check

## Performance Considerations

- **Image Optimization**: Disabled for flexibility (`unoptimized: true`)
- **Bundle Analysis**: Available via `npm run analyze`
- **Lazy Loading**: Suspense boundaries for route-level code splitting
- **Build Optimization**: TypeScript and ESLint errors ignored during build for speed

## Common Development Tasks

### Adding New AI Tools
1. Create directory: `app/tools/new-tool-name/`
2. Add `page.tsx` and `loading.tsx`
3. Implement tool-specific logic in `components/tools/`
4. Add API route if needed in `app/api/`
5. Update tools catalog page

### Modifying Authentication Flow
- Primary logic in `contexts/auth-context.tsx`
- Supabase client config in `lib/supabase/client.ts`
- Cross-domain sync in `lib/cross-domain/`

### Database Schema Changes
- Update types in `lib/database/schema.ts`
- Run migrations via Supabase dashboard
- Test with `npm run test-db`

### UI Component Updates
- Components in `components/` following shadcn/ui patterns
- Update theme in `tailwind.config.ts`
- Global styles in `app/globals.css`

The codebase follows Next.js 14 App Router conventions with a strong emphasis on TypeScript safety, component reusability, and cross-domain authentication capabilities.
