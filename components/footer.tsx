import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="KozkerTech Logo" className="h-8 w-auto" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">KozkerTech</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Empowering businesses with cutting-edge AI solutions and digital transformation services.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-primary hover:bg-primary/10 p-2 rounded-full transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-primary hover:bg-primary/10 p-2 rounded-full transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-primary hover:bg-primary/10 p-2 rounded-full transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-primary hover:bg-primary/10 p-2 rounded-full transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/solutions/launchpad"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                >
                  LaunchPad
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/growthsuite"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                >
                  GrowthSuite
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/intelligence"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                >
                  Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                >
                  All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <a
                  href="https://events.kozker.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                >
                  Webinars
                </a>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                >
                  Free Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <Link
                  href="mailto:info@kozkertech.com"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                >
                  info@kozkertech.com
                </Link>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <Link
                  href="tel:+91 7306261147"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                >
                  +91 73062-61147 
                </Link>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  11/927,1st Floor Adithya Shopping Complex
                  <br />
                  Kochupally Road , Thoppumpady
                  <br/>
                  Kochi, Kerala, India, PO. 682005
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 dark:text-gray-400 text-sm">© 2024 KozkerTech. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
