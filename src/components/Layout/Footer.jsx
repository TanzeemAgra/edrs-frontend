import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center mb-4">
                <span className="text-xl font-bold text-primary-600">EDRS</span>
              </Link>
              <p className="text-gray-600 text-sm mb-4">
                Enterprise-grade engineering document management and P&ID analysis platform. Delivering precision, compliance, and operational excellence for global industrial projects.
              </p>
              <p className="text-gray-500 text-xs">
                Empowering engineering excellence across oil & gas, petrochemicals, and industrial infrastructure sectors.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-primary-600 text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 text-sm">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/pid-analysis" className="text-gray-600 hover:text-primary-600 text-sm">
                    P&ID Analysis
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/contact-us" className="text-gray-600 hover:text-primary-600 text-sm">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" className="text-gray-600 hover:text-primary-600 text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" className="text-gray-600 hover:text-primary-600 text-sm">
                    Enterprise Solutions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} EDRS. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-primary-600 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-primary-600 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer