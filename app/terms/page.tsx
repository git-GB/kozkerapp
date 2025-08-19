import type { Metadata } from "next"
import { SchemaMarkup } from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "Terms of Service | KozkerTech",
  description:
    "Read the terms and conditions governing the use of KozkerTech's services. Our terms of service outline the rules, guidelines, and legal agreements between KozkerTech and our users.",
  openGraph: {
    title: "Terms of Service | KozkerTech",
    description:
      "Read the terms and conditions governing the use of KozkerTech's services. Our terms of service outline the rules, guidelines, and legal agreements between KozkerTech and our users.",
  },
}

export default function TermsOfService() {
  return (
    <>
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms of Service",
          description: "KozkerTech's Terms of Service outlining the rules and guidelines for using our services.",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/terms`,
          mainEntity: {
            "@type": "WebPageElement",
            mainContentOfPage: true,
          },
        }}
      />
      <div className="container max-w-4xl py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to KozkerTech. These Terms of Service ("Terms") govern your access to and use of our website,
            products, and services. By accessing or using our services, you agree to be bound by these Terms and our
            Privacy Policy.
          </p>
          <p>
            Please read these Terms carefully before using our services. If you do not agree to these Terms, you may not
            access or use our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Definitions</h2>
          <p>In these Terms:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>"KozkerTech," "we," "us," and "our" refer to KozkerTech and its subsidiaries and affiliates.</li>
            <li>
              "Services" refers to all products, services, content, features, technologies, or functions offered by
              KozkerTech.
            </li>
            <li>"You" and "your" refer to the person or entity accessing or using our Services.</li>
            <li>
              "Content" refers to any text, graphics, images, music, software, audio, video, information, or other
              materials that are displayed, uploaded, or provided on or through our Services.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Account Registration and Eligibility</h2>
          <p>
            To access certain features of our Services, you may need to register for an account. When you register, you
            agree to provide accurate, current, and complete information and to update this information to maintain its
            accuracy.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities
            that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
          <p>
            To use our Services, you must be at least 18 years old or the age of legal majority in your jurisdiction,
            whichever is greater.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Services and Payments</h2>
          <h3 className="text-xl font-medium mt-6 mb-3">4.1 Service Description</h3>
          <p>
            KozkerTech provides various digital services, including but not limited to web development, customer support
            solutions, WhatsApp automation, and Power BI analytics. The specific features and functionalities of each
            service are described on our website or in a separate agreement between you and KozkerTech.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">4.2 Fees and Payment</h3>
          <p>
            Some of our Services are offered for a fee. You agree to pay all fees associated with the Services you
            purchase. All fees are in Indian Rupees unless otherwise specified and are non-refundable except as required
            by law or as explicitly stated in these Terms.
          </p>
          <p>
            We may change our fees at any time. If we increase fees for a service you use, we will provide you with
            notice of the fee change. If you do not accept the fee change, you have the right to reject the change by
            canceling the applicable service before the fee change takes effect.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. User Conduct and Prohibited Activities</h2>
          <p>You agree not to use our Services to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Violate any applicable law, regulation, or third-party rights</li>
            <li>
              Upload, transmit, or distribute any content that is illegal, harmful, threatening, abusive, harassing,
              defamatory, vulgar, obscene, or otherwise objectionable
            </li>
            <li>
              Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person
              or entity
            </li>
            <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
            <li>
              Attempt to gain unauthorized access to any portion of the Services or any other accounts, computer
              systems, or networks connected to the Services
            </li>
            <li>
              Use any robot, spider, site search/retrieval application, or other automated device, process, or means to
              access, retrieve, scrape, or index any portion of the Services
            </li>
            <li>Collect or store personal data about other users without their express consent</li>
            <li>Promote or facilitate illegal activities</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Intellectual Property Rights</h2>
          <h3 className="text-xl font-medium mt-6 mb-3">6.1 Our Intellectual Property</h3>
          <p>
            The Services and all content, features, and functionality thereof, including but not limited to all
            information, software, text, displays, images, video, and audio, and the design, selection, and arrangement
            thereof, are owned by KozkerTech, its licensors, or other providers of such material and are protected by
            copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          <p>
            These Terms do not grant you any right, title, or interest in the Services or our content, nor any
            intellectual property rights, except for the limited license set forth below.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">6.2 Limited License</h3>
          <p>
            Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, and
            revocable license to access and use the Services for your personal or internal business purposes.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">6.3 Your Content</h3>
          <p>
            You retain all rights to any content you submit, post, or display on or through the Services. By submitting,
            posting, or displaying content on or through the Services, you grant us a worldwide, non-exclusive,
            royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from,
            distribute, and display such content in any media for the purpose of providing and promoting the Services.
          </p>
          <p>
            You represent and warrant that you own or have the necessary rights to the content you submit and that the
            content does not infringe upon the rights of any third party.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Disclaimer of Warranties</h2>
          <p>
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
            IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT
            DEFECTS WILL BE CORRECTED, OR THAT THE SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES
            OR OTHER HARMFUL COMPONENTS.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, KOZKERTECH AND ITS OFFICERS, DIRECTORS, EMPLOYEES,
            AGENTS, SUPPLIERS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
            OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE
            LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES; (II) ANY
            CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES; (III) ANY CONTENT OBTAINED FROM THE SERVICES; AND
            (IV) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY,
            CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF
            THE POSSIBILITY OF SUCH DAMAGE.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless KozkerTech and its officers, directors, employees, agents,
            and suppliers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses,
            or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms
            or your use of the Services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Termination</h2>
          <p>
            We may terminate or suspend your access to all or part of the Services, with or without notice, for any
            conduct that we, in our sole discretion, believe violates these Terms or is harmful to other users of the
            Services, us, or third parties, or for any other reason.
          </p>
          <p>
            Upon termination, your right to use the Services will immediately cease, and you must cease all use of the
            Services and delete any content or materials obtained from the Services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its
            conflict of law provisions.
          </p>
          <p>
            Any dispute arising out of or in connection with these Terms, including any question regarding its
            existence, validity, or termination, shall be referred to and finally resolved by arbitration in Kochi,
            Kerala, India, in accordance with the Arbitration and Conciliation Act, 1996.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Changes to Terms</h2>
          <p>
            We may revise these Terms from time to time. The most current version will always be posted on our website.
            If a revision, in our sole discretion, is material, we will notify you via email or through the Services. By
            continuing to access or use the Services after revisions become effective, you agree to be bound by the
            revised Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and KozkerTech
            regarding the Services and supersede all prior and contemporaneous agreements, proposals, or
            representations, written or oral, concerning the Services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">14. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
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
