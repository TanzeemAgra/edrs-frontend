import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  ArrowLeftIcon, 
  DocumentTextIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  CogIcon,
  UserGroupIcon,
  ClockIcon,
  ChevronRightIcon,
  XCircleIcon,
  BuildingOfficeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { termsOfServiceConfig, companyInfo, legalPageStyles } from '../../config/legalConfig'

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState('acceptance')
  const [isScrolled, setIsScrolled] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)

  // Track scroll position for reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(progress)
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = termsOfServiceConfig.sections.map(s => s.id)
      const current = sections.find(sectionId => {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom > 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderSection = (section, index) => {
    const isActive = activeSection === section.id
    
    return (
      <div 
        key={section.id} 
        className={`transition-all duration-500 transform ${
          isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-90'
        }`}
        id={section.id}
      >
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 hover:shadow-xl transition-all duration-300">
          {/* Section Header */}
          <div className="flex items-center space-x-4 mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isActive 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                : 'bg-gray-100 text-gray-600'
            } transition-all duration-300`}>
              <span className="text-lg font-bold">{index + 1}</span>
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${
                isActive ? 'text-indigo-600' : 'text-gray-900'
              } transition-colors duration-300`}>
                {section.title}
              </h2>
              {index === 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Last updated: {termsOfServiceConfig.lastUpdated}
                </p>
              )}
            </div>
          </div>

          {/* Section Content */}
          <div className="space-y-6">
            {section.content && (
              <div 
                className="text-gray-700 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ 
                  __html: section.content
                    .replace(/\n\n/g, '</p><p className="mt-4">')
                    .replace(/^/, '<p>')
                    .replace(/$/, '</p>')
                    .replace(/\u2022\s*/g, '<span class="inline-block w-2 h-2 bg-indigo-500 rounded-full mr-3 mt-2"></span>')
                }}
              />
            )}
            
            {section.prohibited && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                <div className="flex items-center space-x-3 mb-4">
                  <XCircleIcon className="h-6 w-6 text-red-600" />
                  <h4 className="text-lg font-semibold text-red-800">
                    Prohibited Activities
                  </h4>
                </div>
                <ul className="space-y-3">
                  {section.prohibited.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <XCircleIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-red-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {section.required && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  <h4 className="text-lg font-semibold text-green-800">
                    Required Compliance
                  </h4>
                </div>
                <ul className="space-y-3">
                  {section.required.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-green-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {section.subsections && (
              <div className="space-y-6">
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="border-l-4 border-indigo-200 pl-6 py-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {subsection.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {subsection.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const tableOfContents = termsOfServiceConfig.sections.map(section => ({
    id: section.id,
    title: section.title
  }))

  return (
    <>
      <Helmet>
        <title>Terms of Service | EDRS - Engineering Document Management</title>
        <meta name="description" content="Legal terms and conditions for EDRS engineering platform including user responsibilities, compliance requirements, and professional usage guidelines." />
        <meta name="keywords" content="terms of service, legal agreement, engineering platform, professional usage, compliance" />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${readingProgress}%` }}
          ></div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.1)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.1)_0%,transparent_50%)]" />
        </div>

        {/* Hero Header */}
        <div className="relative z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 py-16">
            {/* Back Navigation */}
            <Link 
              to="/" 
              className="inline-flex items-center text-white/80 hover:text-white mb-8 group transition-all duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </Link>
            
            {/* Hero Content */}
            <div className="max-w-4xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                  <ScaleIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    Terms of Service
                  </h1>
                  <p className="text-xl text-indigo-100">
                    {companyInfo.fullName}
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-indigo-100 max-w-2xl leading-relaxed mb-8">
                Professional engineering platform terms and legal framework governing 
                the use of EDRS services, compliance requirements, and user responsibilities.
              </p>

              {/* Key Terms Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                  <ScaleIcon className="h-8 w-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold">Legal</div>
                  <div className="text-sm text-indigo-200">Framework</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                  <ShieldCheckIcon className="h-8 w-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold">Pro</div>
                  <div className="text-sm text-indigo-200">Platform</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                  <UserGroupIcon className="h-8 w-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold">Users</div>
                  <div className="text-sm text-indigo-200">Protected</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                  <ClockIcon className="h-8 w-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-indigo-200">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Service Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CogIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Professional Platform
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Industrial-grade document management, P&ID analysis, and 
                  engineering workflow automation designed for professional use.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircleIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Compliance Standards
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  ISA-5.1, IEC-62424, and ANSI standard compliance checking 
                  with automated reporting and validation systems.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ExclamationTriangleIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Professional Use Only
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Designed exclusively for qualified engineering professionals 
                  with appropriate technical expertise and credentials.
                </p>
              </div>
            </div>
          </div>

          {/* Important Professional Notice */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-2xl p-8 border border-amber-200 shadow-lg mb-16">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <ExclamationTriangleIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-4">
                  ⚠️ Critical Notice for Engineering Professionals
                </h3>
                <p className="text-amber-800 leading-relaxed mb-4">
                  EDRS provides advanced analysis tools and compliance checking to support 
                  professional engineering decisions. All computational results and analysis 
                  outputs require professional engineering review and approval before implementation.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-amber-700">
                      <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                      <span className="font-medium">Professional judgment required</span>
                    </div>
                    <div className="flex items-center text-amber-700">
                      <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                      <span className="font-medium">Results support, not replace decisions</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-amber-700">
                      <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                      <span className="font-medium">Maintain professional standards</span>
                    </div>
                    <div className="flex items-center text-amber-700">
                      <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                      <span className="font-medium">Verify qualifications required</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8 mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <DocumentTextIcon className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Table of Contents</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {tableOfContents.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 group ${
                    activeSection === item.id
                      ? 'bg-indigo-50 border border-indigo-200 text-indigo-700'
                      : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="font-medium flex-1">{item.title}</span>
                  <ChevronRightIcon className={`h-4 w-4 transition-transform duration-200 ${
                    activeSection === item.id ? 'text-indigo-500' : 'text-gray-400 group-hover:translate-x-1'
                  }`} />
                </a>
              ))}
            </div>
          </div>

          {/* Terms of Service Sections */}
          <div className="space-y-8">
            {termsOfServiceConfig.sections.map((section, index) => renderSection(section, index))}
          </div>
          
          {/* Professional Engineering Disclaimer */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 rounded-2xl p-8 border border-amber-200 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <ExclamationTriangleIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-4">
                  🛡️ Professional Engineering Disclaimer
                </h3>
                <p className="text-amber-800 leading-relaxed mb-4">
                  EDRS analysis results are sophisticated computational tools designed to support, 
                  but never replace, professional engineering judgment and expertise. All critical 
                  engineering decisions must be reviewed, validated, and approved by qualified 
                  professional engineers in accordance with applicable codes, standards, and regulations.
                </p>
                <div className="bg-white/60 rounded-xl p-4 border border-amber-300">
                  <p className="text-amber-700 font-medium text-sm">
                    <strong>User Responsibility:</strong> You are solely responsible for verifying 
                    that all analysis results meet project requirements, safety standards, and 
                    regulatory compliance before any implementation or construction activities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Contact & Support Section */}
          <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ScaleIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Legal and Terms Questions?
              </h3>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Our legal team is available to assist with terms-related questions, 
                compliance matters, and contractual inquiries for professional users.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <GlobeAltIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Legal Department</h4>
                    <p className="text-sm text-gray-600">Terms & compliance support</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Email:</strong> {companyInfo.email}
                </p>
                <p className="text-gray-700">
                  <strong>Response Time:</strong> 5-10 business days
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BuildingOfficeIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Office</h4>
                    <p className="text-sm text-gray-600">Corporate headquarters</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Address:</strong> {companyInfo.address}
                </p>
                <p className="text-gray-700">
                  <strong>Emergency:</strong> Priority support channels
                </p>
              </div>
            </div>
          </div>

          {/* Terms Acknowledgment Section */}
          <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 rounded-2xl p-8 border border-indigo-200 shadow-lg mt-16">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-indigo-900 mb-2">
                Terms Acknowledgment
              </h3>
            </div>
            
            <div className="bg-white/70 rounded-xl p-6 border border-indigo-200">
              <p className="text-indigo-800 leading-relaxed mb-6">
                By accessing and using the EDRS platform, you acknowledge that you have 
                read, understood, and agree to be bound by these Terms of Service. You 
                also confirm that you possess the necessary authority, qualifications, 
                and professional credentials to use industrial engineering software and services.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-indigo-700 font-medium text-sm">Professional platform usage agreement</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-indigo-700 font-medium text-sm">Engineering credentials verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Legal Resources */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Legal Resources</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/privacy-policy" 
                className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group"
              >
                <ShieldCheckIcon className="h-5 w-5 mr-2 text-gray-500 group-hover:text-gray-700" />
                Privacy Policy
              </Link>
              <Link 
                to="/" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TermsOfService