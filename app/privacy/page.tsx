import type { Metadata } from "next"
import { SchemaMarkup } from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "Privacy Policy | KozkerTech",
  description:
    "Learn how KozkerTech collects, uses, and protects your personal information. Our privacy policy outlines our commitment to data security and transparency.",
  openGraph: {
    title: "Privacy Policy | KozkerTech",
    description:
      "Learn how KozkerTech collects, uses, and protects your personal information. Our privacy policy outlines our commitment to data security and transparency.",
  },
}

export default function PrivacyPolicy() {
  return (
    <>
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy",
          description:
            "KozkerTech's Privacy Policy outlining how we collect, use, and protect your personal information.",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/privacy`,
          mainEntity: {
            "@type": "WebPageElement",
            mainContentOfPage: true,
          },
        }}
      />
      <div className="container max-w-4xl py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to KozkerTech ("we," "our," or "us"). We are committed to protecting your privacy and handling your
            data with transparency and care. This Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-medium mt-6 mb-3">2.1 Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Fill out forms on our website</li>
            <li>Create an account</li>
            <li>Subscribe to our newsletter</li>
            <li>Request a quote or consultation</li>
            <li>Contact us via email, phone, or social media</li>
          </ul>
          <p>
            This information may include your name, email address, phone number, company name, job title, and any other
            information you choose to provide.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">2.2 Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain information about your device and usage
            patterns, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring website</li>
            <li>Pages viewed and time spent on pages</li>
            <li>Date and time of access</li>
            <li>Device information</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and fulfill orders</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send administrative information, such as updates to our terms and policies</li>
            <li>Send marketing communications (with your consent where required by law)</li>
            <li>Personalize your experience on our website</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Protect against, identify, and prevent fraud and other illegal activities</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect and store information about your interactions
            with our website. You can control cookies through your browser settings and other tools. However, disabling
            cookies may limit your ability to use certain features of our website.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Information Sharing and Disclosure</h2>
          <p>We may share your information in the following circumstances:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>With service providers who perform services on our behalf</li>
            <li>To comply with legal obligations</li>
            <li>To protect and defend our rights and property</li>
            <li>With your consent or at your direction</li>
            <li>In connection with a business transfer (e.g., merger or acquisition)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
            Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Your Rights and Choices</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate or incomplete information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction or objection to processing</li>
            <li>Data portability</li>
            <li>Withdrawal of consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section
            below.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
          <p>
            Our services are not directed to children under the age of 13, and we do not knowingly collect personal
            information from children under 13. If you believe we have inadvertently collected information from a child
            under 13, please contact us immediately.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than the one in which you reside.
            These countries may have different data protection laws. We will take appropriate measures to ensure that
            your personal information remains protected in accordance with this Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other
            operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated
            Privacy Policy on this page with a new effective date.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please
            contact us at:
          </p>
          <p className="mb-6">
            <strong>Email:</strong> hello@kozker.com
            <br />
            <strong>Phone:</strong> +91-7306261147
            <br />
            <strong>Address:</strong> Kochi, Kerala, India
          </p>
        </div>
      </div>
    </>
  )
}
