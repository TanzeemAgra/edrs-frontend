import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  ArrowLeftIcon, 
  ShieldCheckIcon, 
  LockClosedIcon, 
  DocumentTextIcon,
  EyeIcon,
  GlobeAltIcon,
  ServerIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  ChevronRightIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import { privacyPolicyConfig, companyInfo, legalPageStyles } from '../../config/legalConfig'

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('introduction')
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
      const sections = privacyPolicyConfig.sections.map(s => s.id)
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
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'bg-gray-100 text-gray-600'
            } transition-all duration-300`}>
              <span className="text-lg font-bold">{index + 1}</span>
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${
                isActive ? 'text-blue-600' : 'text-gray-900'
              } transition-colors duration-300`}>
                {section.title}
              </h2>
              {index === 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Last updated: {privacyPolicyConfig.lastUpdated}
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
                    .replace(/\u2022\s*/g, '<span class="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>')
                }}
              />
            )}
            
            {section.items && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {section.subsections && (
              <div className="space-y-6">
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="border-l-4 border-blue-200 pl-6 py-2">
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

  const tableOfContents = privacyPolicyConfig.sections.map(section => ({
    id: section.id,
    title: section.title
  }))

  return (
    <>
      <Helmet>
        <title>Privacy Policy | EDRS - Engineering Document Management</title>
        <meta name="description" content="Learn how EDRS protects your engineering data with enterprise-grade security, GDPR compliance, and transparent privacy practices." />
        <meta name="keywords" content="privacy policy, data protection, GDPR, engineering documents, industrial data security" />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${readingProgress}%` }}
          ></div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.1)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.1)_0%,transparent_50%)]" />
        </div>

        {/* Hero Header */}
        <div className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
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
                  <ShieldCheckIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    Privacy Policy
                  </h1>
                  <p className="text-xl text-blue-100">
                    {companyInfo.fullName}
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-blue-100 max-w-2xl leading-relaxed mb-8">
                Your privacy and data security are fundamental to our engineering platform. 
                Learn how we protect your industrial documents and technical data with 
                enterprise-grade security measures.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                  <LockClosedIcon className="h-8 w-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold">AES-256</div>
                  <div className="text-sm text-blue-200">Encryption</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                  <ServerIcon className="h-8 w-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-sm text-blue-200">Uptime SLA</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                  <GlobeAltIcon className="h-8 w-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold">GDPR</div>
                  <div className="text-sm text-blue-200">Compliant</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                  <ClockIcon className="h-8 w-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-blue-200">Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LockClosedIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Enterprise Security
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Military-grade AES-256 encryption, zero-trust architecture, and 
                  continuous security monitoring protect your critical engineering data.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheckIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Global Compliance
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  GDPR, ISO 27001, SOC 2 Type II, and industry-specific compliance 
                  ensure your data meets the highest international standards.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <UserGroupIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Your Rights
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Complete transparency and control over your data with comprehensive 
                  access, portability, correction, and deletion rights.
                </p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8 mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <DocumentTextIcon className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Table of Contents</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {tableOfContents.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 group ${
                    activeSection === item.id
                      ? 'bg-blue-50 border border-blue-200 text-blue-700'
                      : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="font-medium flex-1">{item.title}</span>
                  <ChevronRightIcon className={`h-4 w-4 transition-transform duration-200 ${
                    activeSection === item.id ? 'text-blue-500' : 'text-gray-400 group-hover:translate-x-1'
                  }`} />
                </a>
              ))}
            </div>
          </div>

          {/* Privacy Policy Sections */}
          <div className="space-y-8">
            {privacyPolicyConfig.sections.map((section, index) => renderSection(section, index))}
          </div>
          
          {/* Engineering-Specific Security Highlight */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <ServerIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  🏭 Industrial-Grade Security for Engineering Data
                </h3>
                <p className="text-blue-800 leading-relaxed mb-4">
                  As a specialized engineering platform handling critical industrial documents, 
                  P&ID diagrams, and sensitive technical specifications, EDRS implements 
                  advanced security measures designed specifically for the engineering sector:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-blue-700">
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      <span className="font-medium">Air-gapped processing environments</span>
                    </div>
                    <div className="flex items-center text-blue-700">
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      <span className="font-medium">Industrial IoT security protocols</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-blue-700">
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      <span className="font-medium">Engineering industry compliance</span>
                    </div>
                    <div className="flex items-center text-blue-700">
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      <span className="font-medium">Specialized document encryption</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Support Section */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Privacy Questions or Concerns?
              </h3>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Our dedicated privacy team is committed to transparency and ready to help 
                with any questions about how we protect and handle your engineering data.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <EyeIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Privacy Officer</h4>
                    <p className="text-sm text-gray-600">Data protection & compliance</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Email:</strong> {companyInfo.email}
                </p>
                <p className="text-gray-700">
                  <strong>Response Time:</strong> Within 72 hours
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <GlobeAltIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Global Office</h4>
                    <p className="text-sm text-gray-600">Main headquarters</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Address:</strong> {companyInfo.address}
                </p>
                <p className="text-gray-700">
                  <strong>Business Hours:</strong> Mon-Fri 9:00-17:00 CET
                </p>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Legal Resources</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/terms-of-service" 
                className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group"
              >
                <DocumentTextIcon className="h-5 w-5 mr-2 text-gray-500 group-hover:text-gray-700" />
                Terms of Service
              </Link>
              <Link 
                to="/" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
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

export default PrivacyPolicy