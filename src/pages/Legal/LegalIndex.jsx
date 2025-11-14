import React from 'react'
import { Link } from 'react-router-dom'
import { DocumentTextIcon, ShieldCheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { companyInfo } from '../../config/legalConfig'

const LegalIndex = () => {
  const legalPages = [
    {
      title: "Privacy Policy",
      description: "Learn how we collect, use, and protect your personal information and engineering data.",
      path: "/privacy-policy",
      icon: ShieldCheckIcon,
      lastUpdated: "November 14, 2025",
      highlights: ["GDPR Compliant", "Industry-Grade Security", "Data Rights"]
    },
    {
      title: "Terms of Service",
      description: "Understand the terms and conditions for using our engineering platform and services.",
      path: "/terms-of-service", 
      icon: DocumentTextIcon,
      lastUpdated: "November 14, 2025",
      highlights: ["Professional Use", "Compliance Standards", "User Responsibilities"]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Legal Information
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {companyInfo.fullName} - Transparent policies for professional engineering services
          </p>
        </div>

        {/* Legal Documents Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {legalPages.map((page, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <page.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {page.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Last updated: {page.lastUpdated}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                {page.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-6">
                {page.highlights.map((highlight, idx) => (
                  <span 
                    key={idx}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <Link 
                to={page.path}
                className="inline-flex items-center justify-between w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <span className="font-medium">Read {page.title}</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mt-12 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Questions About Our Legal Policies?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Privacy Questions</h3>
              <p className="text-gray-600 text-sm mb-3">
                Data protection and privacy rights inquiries
              </p>
              <p className="text-blue-600 text-sm">{companyInfo.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Terms & Legal</h3>
              <p className="text-gray-600 text-sm mb-3">
                Terms of service and legal compliance matters
              </p>
              <p className="text-blue-600 text-sm">{companyInfo.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">General Support</h3>
              <p className="text-gray-600 text-sm mb-3">
                Platform support and technical assistance
              </p>
              <Link to="/dashboard" className="text-blue-600 text-sm hover:underline">
                Visit Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link 
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LegalIndex