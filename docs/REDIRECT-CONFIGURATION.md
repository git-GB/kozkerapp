# Redirect Configuration Guide

## Complete Redirect List for Kozker.com

This document contains all the redirects that need to be implemented on kozker.com to redirect authentication and tools traffic to ai.kozker.com.

### Authentication Redirects

\`\`\`javascript
// Authentication pages
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

// Auth directory
{
  source: '/auth/:path*',
  destination: 'https://ai.kozker.com/auth/:path*',
  permanent: true,
},

// User profile and dashboard
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

// Password reset
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
\`\`\`

### Tools Redirects

\`\`\`javascript
// Main tools page
{
  source: '/tools',
  destination: 'https://ai.kozker.com/tools',
  permanent: true,
},

// All tools subdirectories
{
  source: '/tools/:path*',
  destination: 'https://ai.kozker.com/tools/:path*',
  permanent: true,
},

// Individual tool redirects (specific)
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
{
  source: '/tools/landing-pageherocopygenerator',
  destination: 'https://ai.kozker.com/tools/landing-pageherocopygenerator',
  permanent: true,
},
{
  source: '/tools/social-media-suggester',
  destination: 'https://ai.kozker.com/tools/social-media-suggester',
  permanent: true,
},
{
  source: '/tools/blog-generator',
  destination: 'https://ai.kozker.com/tools/blog-generator',
  permanent: true,
},
{
  source: '/tools/email-subject-line',
  destination: 'https://ai.kozker.com/tools/email-subject-line',
  permanent: true,
},
{
  source: '/tools/ai-business-plan-generator',
  destination: 'https://ai.kozker.com/tools/ai-business-plan-generator',
  permanent: true,
},
{
  source: '/tools/power-bi-measure',
  destination: 'https://ai.kozker.com/tools/power-bi-measure',
  permanent: true,
},
{
  source: '/tools/meeting-summary-extractor',
  destination: 'https://ai.kozker.com/tools/meeting-summary-extractor',
  permanent: true,
},
{
  source: '/tools/data-cleanse',
  destination: 'https://ai.kozker.com/tools/data-cleanse',
  permanent: true,
},
{
  source: '/tools/seo-keyword-content-gapanalyzer',
  destination: 'https://ai.kozker.com/tools/seo-keyword-content-gapanalyzer',
  permanent: true,
},
{
  source: '/tools/proposal-draft-generator',
  destination: 'https://ai.kozker.com/tools/proposal-draft-generator',
  permanent: true,
},
{
  source: '/tools/follow-up-email-sequencer',
  destination: 'https://ai.kozker.com/tools/follow-up-email-sequencer',
  permanent: true,
},
{
  source: '/tools/job-description-generator',
  destination: 'https://ai.kozker.com/tools/job-description-generator',
  permanent: true,
},
{
  source: '/tools/customer-persona-generator',
  destination: 'https://ai.kozker.com/tools/customer-persona-generator',
  permanent: true,
},
{
  source: '/tools/logo-color-palette-picker',
  destination: 'https://ai.kozker.com/tools/logo-color-palette-picker',
  permanent: true,
},
{
  source: '/tools/pricing-generator',
  destination: 'https://ai.kozker.com/tools/pricing-generator',
  permanent: true,
},
{
  source: '/tools/invoice-template-builder',
  destination: 'https://ai.kozker.com/tools/invoice-template-builder',
  permanent: true,
},
{
  source: '/tools/sales-script-generator',
  destination: 'https://ai.kozker.com/tools/sales-script-generator',
  permanent: true,
},
{
  source: '/tools/faq-builder',
  destination: 'https://ai.kozker.com/tools/faq-builder',
  permanent: true,
},
{
  source: '/tools/press-release-template',
  destination: 'https://ai.kozker.com/tools/press-release-template',
  permanent: true,
},
{
  source: '/tools/project-timeline-builder',
  destination: 'https://ai.kozker.com/tools/project-timeline-builder',
  permanent: true,
},
\`\`\`

### Alternative URL Patterns

\`\`\`javascript
// Handle alternative URL patterns
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
\`\`\`

### Complete Next.js Configuration

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
