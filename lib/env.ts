export const env = {
  // Supabase Configuration - SAME DATABASE AS KOZKER.COM
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",

  // Site Configuration
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://ai.kozker.com",
  MAIN_SITE_URL: process.env.NEXT_PUBLIC_MAIN_SITE_URL || "https://kozker.com",

  // Authentication Redirects
  AUTH_REDIRECT_URL: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || "https://ai.kozker.com",

  // Cross-domain settings
  ENABLE_CROSS_DOMAIN_AUTH: process.env.NEXT_PUBLIC_ENABLE_CROSS_DOMAIN_AUTH === "true",
  PARENT_DOMAIN: process.env.NEXT_PUBLIC_PARENT_DOMAIN || "kozker.com",

  // Analytics
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",

  // Feature flags
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false",
  ENABLE_AUTH_POPUP: process.env.NEXT_PUBLIC_ENABLE_AUTH_POPUP !== "false",
}

export const isDevelopment = process.env.NODE_ENV === "development"
export const isProduction = process.env.NODE_ENV === "production"
