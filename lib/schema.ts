// Utility functions for generating structured data

/**
 * Generates LocalBusiness schema for better local SEO
 */
export function generateLocalBusinessSchema(baseUrl = "") {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "KozkerTech",
    image: `${baseUrl}/logo.png`,
    url: baseUrl,
    telephone: "+91-7306261147",
    email: "hello@kozker.com",
    description:
      "Transform your business with KozkerTech's expert digital solutions in Kochi. Get high-converting websites, 24/7 customer support, WhatsApp automation, and Power BI analytics. Local expertise, global standards.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kochi",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.9312,
      longitude: 76.2673,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/KozkerTech/",
      "https://x.com/KozkerTech",
      "https://www.instagram.com/kozkertech/",
      "https://www.linkedin.com/company/kozker-tech",
      "https://github.com/Kozker-lab",
      "https://in.pinterest.com/kozkertech/",
    ],
    priceRange: "₹₹₹",
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 9.9312,
        longitude: 76.2673,
      },
      geoRadius: "50000",
    },
    makesOffer: [
      {
        "@type": "Offer",
        name: "AI-Powered Web Design",
        description:
          "Custom layouts generated automatically using your brand assets, optimized for SEO, speed, and mobile devices.",
      },
      {
        "@type": "Offer",
        name: "Customer Support",
        description:
          "Live chat and email routing with FAQs and SLA-driven response times to keep your customers happy.",
      },
      {
        "@type": "Offer",
        name: "WhatsApp Automation",
        description:
          "Automated lead capture, order updates, appointment reminders, and feedback requests via WhatsApp.",
      },
      {
        "@type": "Offer",
        name: "Power BI Solutions",
        description:
          "Data visualization, interactive dashboards, and custom reporting to help you make data-driven decisions.",
      },
    ],
  }
}

/**
 * Generates WebSite schema for general SEO
 */
export function generateWebsiteSchema(baseUrl = "") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KozkerTech",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

/**
 * Generates Organization schema
 */
export function generateOrganizationSchema(baseUrl = "") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KozkerTech",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      "https://www.facebook.com/KozkerTech/",
      "https://x.com/KozkerTech",
      "https://www.instagram.com/kozkertech/",
      "https://www.linkedin.com/company/kozker-tech",
      "https://github.com/Kozker-lab",
      "https://in.pinterest.com/kozkertech/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-7306261147",
      contactType: "customer service",
      email: "hello@kozker.com",
      availableLanguage: ["English", "Malayalam"],
    },
  }
}

/**
 * Generates ContactPage schema
 */
export function generateContactPageSchema(baseUrl = "") {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact KozkerTech",
    description:
      "Get in touch with KozkerTech for web development, customer support, WhatsApp automation, and Power BI solutions.",
    url: `${baseUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "KozkerTech",
      telephone: "+91-7306261147",
      email: "hello@kozker.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kochi",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
    },
  }
}
