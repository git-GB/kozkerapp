# Kozker.com Cleanup Instructions

## Overview
This document provides step-by-step instructions for cleaning up kozker.com after migrating authentication and tools functionality to ai.kozker.com.

**CRITICAL**: All authentication functionality must be REMOVED from kozker.com and redirected to ai.kozker.com.

## Table of Contents
1. [Pre-Cleanup Checklist](#pre-cleanup-checklist)
2. [Remove Authentication Code](#remove-authentication-code)
3. [Remove Tools Code](#remove-tools-code)
4. [Implement Redirects](#implement-redirects)
5. [Update Navigation](#update-navigation)
6. [DNS and Deployment](#dns-and-deployment)
7. [Testing Procedures](#testing-procedures)
8. [Rollback Plan](#rollback-plan)

---

## Pre-Cleanup Checklist

Before starting the cleanup process, ensure:

- [ ] ai.kozker.com is deployed and fully functional
- [ ] All authentication works on ai.kozker.com
- [ ] All tools are accessible on ai.kozker.com
- [ ] Database connectivity confirmed from ai.kozker.com
- [ ] SSL certificates are configured for ai.kozker.com
- [ ] Backup of current kozker.com codebase created

---

## Remove Authentication Code

### 1. Delete Authentication Components

Remove the following files from kozker.com:

\`\`\`bash
# Authentication components
rm -rf components/auth/
rm -rf app/auth/
rm -rf app/login/
rm -rf app/register/
rm -rf app/profile/
rm -rf app/dashboard/

# Authentication contexts
rm -f contexts/auth-context.tsx
rm -f contexts/analytics-context.tsx

# Authentication utilities
rm -f lib/auth/
rm -f lib/supabase/client.ts
rm -f lib/supabase/server.ts
\`\`\`

### 2. Remove Authentication Dependencies

Update `package.json` to remove authentication-related dependencies:

\`\`\`json
{
  "dependencies": {
    // Remove these dependencies:
    // "@supabase/auth-helpers-nextjs": "...",
    // "@supabase/supabase-js": "...",
    // "@supabase/ssr": "..."
  }
}
\`\`\`

### 3. Update Layout Component

Remove authentication providers from `app/layout.tsx`:

\`\`\`tsx
// REMOVE these imports:
// import { AuthProvider } from "@/contexts/auth-context"
// import { AnalyticsProvider } from "@/contexts/analytics-context"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* REMOVE AuthProvider and AnalyticsProvider wrappers */}
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
\`\`\`

---

## Remove Tools Code

### 1. Delete Tools Components

Remove all tools-related files:

\`\`\`bash
# Tools pages
rm -rf app/tools/
rm -rf components/tools/

# Tools utilities
rm -rf lib/tools/

# Individual tool pages
rm -rf app/tools/domain-name-generator/
rm -rf app/tools/tagline-value-prop-creator/
rm -rf app/tools/landing-pageherocopygenerator/
# ... remove all other tool directories
\`\`\`

### 2. Remove Tools Data

Delete tools data files:

\`\`\`bash
rm -f lib/tools/tools-data.ts
rm -f lib/tools/tool-registry.ts
rm -f components/SmartFilterIntegration.tsx
\`\`\`

---

## Implement Redirects

### 1. Next.js Redirects

Add redirects in `next.config.js`:

\`\`\`javascript
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
      
      // Specific tool redirects
      {
        source: '/tools/domain-name-generator',
        destination: 'https://ai.kozker.com/tools/domain-name-generator',
        permanent: true,
      },
      {
        source: '/tools/tagline-value-prop-creator',
        destination: 'https://ai.kozker.com/tools/tagline-value-prop-creator',
        permanent: true,
      },
      // Add all other tool redirects...
    ]
  },
}

module.exports = nextConfig
\`\`\`

### 2. Server-Side Redirects (Alternative)

If using server-side redirects, create redirect rules:

\`\`\`nginx
# Nginx redirects
location /login {
    return 301 https://ai.kozker.com/auth/login;
}

location /register {
    return 301 https://ai.kozker.com/auth/register;
}

location /auth/ {
    return 301 https://ai.kozker.com/auth/$request_uri;
}

location /tools/ {
    return 301 https://ai.kozker.com/tools/$request_uri;
}

location /profile {
    return 301 https://ai.kozker.com/profile;
}

location /dashboard {
    return 301 https://ai.kozker.com/dashboard;
}
\`\`\`

---

## Update Navigation

### 1. Update Header Component

Modify the header to redirect authentication links:

\`\`\`tsx
// components/header.tsx or components/layout/Header.tsx

export default function Header() {
  return (
    <header>
      {/* ... existing navigation ... */}
      
      {/* UPDATE authentication buttons */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost">
          <a href="https://ai.kozker.com/auth/login">Sign In</a>
        </Button>
        <Button asChild>
          <a href="https://ai.kozker.com/auth/register">Sign Up</a>
        </Button>
      </div>
      
      {/* UPDATE tools link */}
      <nav>
        <a href="https://ai.kozker.com/tools">AI Tools</a>
        {/* ... other navigation items ... */}
      </nav>
    </header>
  )
}
\`\`\`

### 2. Update Footer Component

Update footer links to point to ai.kozker.com:

\`\`\`tsx
// components/footer.tsx or components/layout/Footer.tsx

export default function Footer() {
  return (
    <footer>
      {/* ... existing footer content ... */}
      
      {/* UPDATE tools and auth links */}
      <div className="footer-links">
        <a href="https://ai.kozker.com/tools">AI Tools</a>
        <a href="https://ai.kozker.com/auth/login">Sign In</a>
        <a href="https://ai.kozker.com/auth/register">Get Started</a>
      </div>
    </footer>
  )
}
\`\`\`

### 3. Update Homepage CTAs

Update call-to-action buttons on the homepage:

\`\`\`tsx
// app/page.tsx

export default function HomePage() {
  return (
    <div>
      {/* ... existing content ... */}
      
      {/* UPDATE CTA buttons */}
      <div className="cta-section">
        <Button asChild size="lg">
          <a href="https://ai.kozker.com/tools">Try Our AI Tools</a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="https://ai.kozker.com/auth/register">Get Started Free</a>
        </Button>
      </div>
      
      {/* UPDATE tools showcase links */}
      <div className="tools-preview">
        <a href="https://ai.kozker.com/tools/domain-name-generator">
          Domain Name Generator
        </a>
        {/* ... other tool links ... */}
      </div>
    </div>
  )
}
\`\`\`

---

## DNS and Deployment

### 1. DNS Configuration

Ensure DNS is properly configured:

\`\`\`bash
# Verify DNS records
dig kozker.com
dig ai.kozker.com

# Ensure both domains resolve correctly
nslookup kozker.com
nslookup ai.kozker.com
\`\`\`

### 2. SSL Certificates

Verify SSL certificates for both domains:

\`\`\`bash
# Check SSL certificates
openssl s_client -connect kozker.com:443 -servername kozker.com
openssl s_client -connect ai.kozker.com:443 -servername ai.kozker.com
\`\`\`

### 3. Deployment Steps

1. Deploy cleaned kozker.com code
2. Verify redirects are working
3. Test all authentication flows redirect to ai.kozker.com
4. Monitor for any broken links or 404 errors

---

## Testing Procedures

### 1. Redirect Testing

Test all redirect URLs:

\`\`\`bash
# Test authentication redirects
curl -I https://kozker.com/login
curl -I https://kozker.com/register
curl -I https://kozker.com/auth/login
curl -I https://kozker.com/profile
curl -I https://kozker.com/dashboard

# Test tools redirects
curl -I https://kozker.com/tools
curl -I https://kozker.com/tools/domain-name-generator
curl -I https://kozker.com/tools/tagline-value-prop-creator

# Verify all return 301/302 redirects to ai.kozker.com
\`\`\`

### 2. Functionality Testing

1. **Homepage Testing**:
   - [ ] Homepage loads correctly
   - [ ] All CTAs redirect to ai.kozker.com
   - [ ] No broken authentication components

2. **Navigation Testing**:
   - [ ] Header navigation works
   - [ ] Footer links redirect correctly
   - [ ] No 404 errors on navigation

3. **Authentication Flow Testing**:
   - [ ] /login redirects to ai.kozker.com/auth/login
   - [ ] /register redirects to ai.kozker.com/auth/register
   - [ ] Authentication works on ai.kozker.com
   - [ ] Users can access tools after login

4. **Tools Testing**:
   - [ ] /tools redirects to ai.kozker.com/tools
   - [ ] Individual tool URLs redirect correctly
   - [ ] All tools function properly on ai.kozker.com

### 3. SEO and Analytics

1. **Search Engine Testing**:
   - [ ] Redirects are properly indexed
   - [ ] No duplicate content issues
   - [ ] Canonical URLs point to ai.kozker.com

2. **Analytics Verification**:
   - [ ] Google Analytics tracking works
   - [ ] User flow tracking across domains
   - [ ] Conversion tracking maintained

---

## Rollback Plan

If issues occur during cleanup:

### 1. Immediate Rollback

\`\`\`bash
# Restore from backup
git checkout main  # or your backup branch
git reset --hard <backup-commit-hash>

# Redeploy original code
npm run build
npm run deploy
\`\`\`

### 2. DNS Rollback

If DNS issues occur:
1. Revert DNS changes
2. Ensure kozker.com points to original server
3. Verify SSL certificates

### 3. Redirect Rollback

Remove redirects from `next.config.js`:
\`\`\`javascript
const nextConfig = {
  async redirects() {
    return []  // Remove all redirects temporarily
  },
}
\`\`\`

---

## Post-Cleanup Monitoring

### 1. Monitor for 24-48 Hours

- [ ] Check error logs for 404s or redirect loops
- [ ] Monitor user complaints or support tickets
- [ ] Verify analytics data is flowing correctly
- [ ] Check search engine crawl errors

### 2. Performance Monitoring

- [ ] Page load times on kozker.com
- [ ] Redirect response times
- [ ] ai.kozker.com performance under increased traffic

### 3. User Experience Monitoring

- [ ] User login success rates on ai.kozker.com
- [ ] Tool usage analytics
- [ ] Cross-domain authentication flow
- [ ] Mobile device compatibility

---

## Success Criteria

The cleanup is successful when:

- [ ] No authentication functionality remains on kozker.com
- [ ] All auth URLs redirect to ai.kozker.com
- [ ] All tools URLs redirect to ai.kozker.com
- [ ] Users can seamlessly access tools via ai.kozker.com
- [ ] No broken links or 404 errors
- [ ] SEO rankings maintained
- [ ] Analytics tracking continues
- [ ] User experience is seamless

---

## Support and Troubleshooting

### Common Issues

1. **Redirect Loops**:
   - Check for conflicting redirect rules
   - Verify DNS configuration
   - Clear browser cache

2. **SSL Certificate Issues**:
   - Verify certificates for both domains
   - Check certificate chain
   - Update certificate if needed

3. **Authentication Problems**:
   - Verify ai.kozker.com authentication works
   - Check database connectivity
   - Verify environment variables

### Emergency Contacts

- **DNS Issues**: Domain registrar support
- **SSL Issues**: Hosting provider support
- **Database Issues**: Supabase dashboard
- **Deployment Issues**: Vercel/Netlify support

---

## Completion Checklist

- [ ] All authentication code removed from kozker.com
- [ ] All tools code removed from kozker.com
- [ ] Redirects implemented and tested
- [ ] Navigation updated to point to ai.kozker.com
- [ ] DNS and SSL verified
- [ ] All tests passed
- [ ] Monitoring in place
- [ ] Documentation updated
- [ ] Team notified of changes

**Final Verification**: kozker.com should have NO authentication functionality and ALL auth/tools traffic should redirect to ai.kozker.com.
