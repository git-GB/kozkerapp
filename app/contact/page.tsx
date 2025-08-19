import type { Metadata } from "next"
import { ContactFormAlternative } from "@/components/contact-form-alternative"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | KozkerTech",
  description: "Get in touch with our team for web development, WhatsApp automation, and Power BI solutions.",
}

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Contact Us</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Have questions or need assistance? Our team is here to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Phone</h3>
            <p className="text-muted-foreground">+91-73062-61147</p>
            <p className="text-muted-foreground">Mon-Fri, 9am-6pm IST</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Email</h3>
            <p className="text-muted-foreground">contact@kozker.com</p>
            <p className="text-muted-foreground">support@kozker.com</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">HQ</h3>
            <p className="text-muted-foreground">
              1st Floor, Adithya Shopping Complex, Thoppumpady, Kochi, Kerala, India, P.O 682005
            </p>
            <p className="text-muted-foreground">India</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.0122734352603!2d76.25938431029776!3d9.932935374144725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b086d764998c439%3A0xe6d73818b0fca5b!2sKozker%20Tech!5e0!3m2!1sen!2sin!4v1747673120462!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <ContactFormAlternative />
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.facebook.com/KozkerTech/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-card p-3 border hover:bg-primary hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="https://x.com/KozkerTech"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-card p-3 border hover:bg-primary hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://www.linkedin.com/company/kozker-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-card p-3 border hover:bg-primary hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/kozkertech/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-card p-3 border hover:bg-primary hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
