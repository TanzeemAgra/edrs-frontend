import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, ShieldCheckIcon, LockClosedIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { privacyPolicyConfig, companyInfo, legalPageStyles } from '../../config/legalConfig'

const PrivacyPolicy = () => {
  const renderSection = (section) => {
    return (
      <div key={section.id} className={legalPageStyles.section} id={section.id}>
        <h2 className={legalPageStyles.sectionTitle}>
          {section.title}
        </h2>
        
        {section.content && (
          <div 
            className={legalPageStyles.content}
            dangerouslySetInnerHTML={{ 
              __html: section.content.replace(/\n/g, '<br />') 
            }}
          />
        )}
        
        {section.items && (
          <ul className={legalPageStyles.list}>
            {section.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
        
        {section.subsections && section.subsections.map((subsection, index) => (
          <div key={index} className="mb-6">
            <h3 className={legalPageStyles.subsectionTitle}>
              {subsection.title}
            </h3>
            <p className={legalPageStyles.content}>
              {subsection.content}
            </p>
          </div>
        ))}
      </div>
    )
  }

  const tableOfContents = privacyPolicyConfig.sections.map(section => ({
    id: section.id,
    title: section.title
  }))

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
          <div className="flex items-center space-x-3">
            <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
        </div>
      </div>

      <div className={legalPageStyles.container}>
        {/* Header Section */}
        <div className={legalPageStyles.header}>
          <h1 className={legalPageStyles.title}>{privacyPolicyConfig.title}</h1>
          <p className={legalPageStyles.subtitle}>
            {companyInfo.fullName} - Protecting Your Data and Privacy
          </p>
          <p className={legalPageStyles.lastUpdated}>
            Last Updated: {privacyPolicyConfig.lastUpdated} | Effective: {privacyPolicyConfig.effectiveDate}
          </p>
        </div>

        {/* Key Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <LockClosedIcon className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Data Security</h3>
            <p className="text-sm text-gray-600">
              Enterprise-grade encryption and security measures protect your engineering data.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <ShieldCheckIcon className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Compliance</h3>
            <p className="text-sm text-gray-600">
              GDPR, ISO 27001, and SOC 2 compliant data processing and storage.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <DocumentTextIcon className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Your Rights</h3>
            <p className="text-sm text-gray-600">
              Full control over your data with access, correction, and deletion rights.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
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

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {privacyPolicyConfig.sections.map(renderSection)}
          
          {/* Additional Security Information */}
          <div className={legalPageStyles.highlight}>
            <h3 className="font-semibold text-blue-900 mb-2">
              Industrial-Grade Security for Engineering Data
            </h3>
            <p className="text-blue-800 text-sm">
              As an engineering platform handling critical industrial documents and P&ID diagrams, 
              we implement specialized security measures including air-gapped processing environments, 
              industrial IoT security protocols, and compliance with engineering industry standards.
            </p>
          </div>

          {/* Contact Section */}
          <div className={legalPageStyles.contact}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Privacy Questions or Concerns?
            </h3>
            <p className="text-gray-700 mb-4">
              Our privacy team is here to help with any questions about how we protect your data.
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
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Related Legal Documents:</p>
          <div className="space-x-4">
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

export default PrivacyPolicy