import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, DocumentTextIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { termsOfServiceConfig, companyInfo, legalPageStyles } from '../../config/legalConfig'

const TermsOfService = () => {
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
        
        {section.prohibited && (
          <div className="mb-6">
            <h4 className="text-lg font-medium text-red-700 mb-3 flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
              Prohibited Activities
            </h4>
            <ul className={legalPageStyles.prohibitedList}>
              {section.prohibited.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {section.required && (
          <div className="mb-6">
            <h4 className="text-lg font-medium text-green-700 mb-3 flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Required Compliance
            </h4>
            <ul className={legalPageStyles.requiredList}>
              {section.required.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
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

  const tableOfContents = termsOfServiceConfig.sections.map(section => ({
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
            <DocumentTextIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>
        </div>
      </div>

      <div className={legalPageStyles.container}>
        {/* Header Section */}
        <div className={legalPageStyles.header}>
          <h1 className={legalPageStyles.title}>{termsOfServiceConfig.title}</h1>
          <p className={legalPageStyles.subtitle}>
            {companyInfo.fullName} - Professional Engineering Platform Terms
          </p>
          <p className={legalPageStyles.lastUpdated}>
            Last Updated: {termsOfServiceConfig.lastUpdated} | Effective: {termsOfServiceConfig.effectiveDate}
          </p>
        </div>

        {/* Key Service Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <DocumentTextIcon className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Professional Platform</h3>
            <p className="text-sm text-gray-600">
              Industrial-grade document management and P&ID analysis for engineering professionals.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <CheckCircleIcon className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Compliance Standards</h3>
            <p className="text-sm text-gray-600">
              ISA-5.1, IEC-62424, and ANSI standard compliance checking and reporting.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <ExclamationTriangleIcon className="h-8 w-8 text-amber-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Professional Use</h3>
            <p className="text-sm text-gray-600">
              Designed for qualified engineering professionals with appropriate technical expertise.
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className={legalPageStyles.warning}>
          <h3 className="font-semibold text-amber-800 mb-2">
            ⚠️ Important Notice for Engineering Professionals
          </h3>
          <p className="text-amber-700 text-sm">
            EDRS provides analysis tools and compliance checking to support engineering decisions. 
            All results require professional engineering review and approval. Users must maintain 
            appropriate professional standards and qualifications for their intended applications.
          </p>
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
          {termsOfServiceConfig.sections.map(renderSection)}
          
          {/* Engineering Disclaimer */}
          <div className={legalPageStyles.warning}>
            <h3 className="font-semibold text-amber-800 mb-2">
              Professional Engineering Disclaimer
            </h3>
            <p className="text-amber-700 text-sm mb-2">
              EDRS analysis results are computational tools that support but do not replace professional 
              engineering judgment. All critical engineering decisions must be reviewed and approved by 
              qualified professional engineers according to applicable codes, standards, and regulations.
            </p>
            <p className="text-amber-700 text-sm">
              Users are responsible for verifying that all analysis results meet project requirements 
              and applicable safety standards before implementation.
            </p>
          </div>

          {/* Contact Section */}
          <div className={legalPageStyles.contact}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Legal and Terms Questions?
            </h3>
            <p className="text-gray-700 mb-4">
              For questions about these terms or legal compliance matters, contact our legal team.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-900">Legal Email:</p>
                <p className="text-gray-600">{companyInfo.email}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Business Address:</p>
                <p className="text-gray-600">{companyInfo.address}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Response Time: 5-10 business days for legal inquiries | 
                Emergency issues: Contact through priority support channels
              </p>
            </div>
          </div>
        </div>

        {/* Acknowledgment Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Terms Acknowledgment
          </h3>
          <p className="text-blue-800 text-sm mb-4">
            By using the EDRS platform, you acknowledge that you have read, understood, and agree 
            to be bound by these Terms of Service. You also confirm that you have the necessary 
            authority and qualifications to use professional engineering software and services.
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
            <span className="text-blue-700">Professional engineering platform usage agreement</span>
          </div>
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

export default TermsOfService