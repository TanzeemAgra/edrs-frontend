import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import LegalBreadcrumb from './LegalBreadcrumb'
import { companyInfo, legalPageStyles } from '../../config/legalConfig'

const LegalPageTemplate = ({ 
  title, 
  subtitle, 
  lastUpdated, 
  effectiveDate, 
  icon: Icon,
  highlights,
  tableOfContents,
  children,
  disclaimer,
  contactSection
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <LegalBreadcrumb currentPage={title} />
          <div className="flex items-center space-x-3">
            {Icon && <Icon className="h-8 w-8 text-blue-600" />}
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
        </div>
      </div>

      <div className={legalPageStyles.container}>
        {/* Header Section */}
        <div className={legalPageStyles.header}>
          <h1 className={legalPageStyles.title}>{title}</h1>
          <p className={legalPageStyles.subtitle}>{subtitle}</p>
          <p className={legalPageStyles.lastUpdated}>
            Last Updated: {lastUpdated} | Effective: {effectiveDate}
          </p>
        </div>

        {/* Key Highlights */}
        {highlights && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {highlights.map((highlight, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                <highlight.icon className={`h-8 w-8 ${highlight.iconColor} mb-4`} />
                <h3 className="font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-sm text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        {disclaimer && (
          <div className={legalPageStyles.warning}>
            <h3 className="font-semibold text-amber-800 mb-2">
              {disclaimer.title}
            </h3>
            <p className="text-amber-700 text-sm">
              {disclaimer.content}
            </p>
          </div>
        )}

        {/* Table of Contents */}
        {tableOfContents && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {tableOfContents.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm py-1 block"
                >
                  {index + 1}. {item.title}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {children}
          
          {/* Contact Section */}
          {contactSection && (
            <div className={legalPageStyles.contact}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {contactSection.title}
              </h3>
              <p className="text-gray-700 mb-4">
                {contactSection.description}
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-900">Email:</p>
                  <p className="text-gray-600">{companyInfo.email}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Address:</p>
                  <p className="text-gray-600">{companyInfo.address}</p>
                </div>
              </div>
              {contactSection.responseTime && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    {contactSection.responseTime}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Related Links */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Related Legal Documents:</p>
          <div className="space-x-4">
            <Link 
              to="/privacy-policy" 
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms-of-service" 
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Terms of Service
            </Link>
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegalPageTemplate