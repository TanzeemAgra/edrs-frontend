import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuthStore } from '../stores/authStore'
import {
  DocumentCheckIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  ChartBarIcon,
  GlobeAltIcon,
  UsersIcon,
  LightBulbIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  BuildingOfficeIcon,
  BeakerIcon,
  CogIcon,
  PlayIcon,
  StarIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

const Home = () => {
  const { isAuthenticated } = useAuthStore()

  const stats = [
    { label: 'Documents Analyzed', value: '50,000+', icon: DocumentCheckIcon },
    { label: 'Engineering Projects', value: '1,200+', icon: BuildingOfficeIcon },
    { label: 'Global Clients', value: '150+', icon: GlobeAltIcon },
    { label: 'Compliance Standards', value: '25+', icon: ShieldCheckIcon }
  ]

  const features = [
    {
      icon: DocumentCheckIcon,
      title: 'AI-Powered P&ID Analysis',
      description: 'Advanced computer vision and machine learning algorithms analyze process and instrumentation diagrams with 98% accuracy.',
      highlights: ['Symbol Recognition', 'Flow Analysis', 'Equipment Identification']
    },
    {
      icon: ShieldCheckIcon,
      title: 'Compliance & Safety',
      description: 'Ensure adherence to international standards including ISA-5.1, IEC-62424, ANSI, and industry-specific regulations.',
      highlights: ['Safety Systems', 'Regulatory Compliance', 'Audit Trails']
    },
    {
      icon: CpuChipIcon,
      title: 'Intelligent Automation',
      description: 'Automate document review processes, reduce human error, and accelerate project delivery times by up to 75%.',
      highlights: ['Automated Workflows', 'Error Detection', 'Quality Assurance']
    },
    {
      icon: ChartBarIcon,
      title: 'Advanced Analytics',
      description: 'Comprehensive reporting and analytics provide insights into engineering processes and project performance.',
      highlights: ['Real-time Dashboards', 'Performance Metrics', 'Predictive Analytics']
    }
  ]

  const industries = [
    { name: 'Oil & Gas', icon: '🛢️', description: 'Upstream, midstream, and downstream operations' },
    { name: 'Chemical Processing', icon: '⚗️', description: 'Petrochemicals, specialty chemicals, and pharmaceuticals' },
    { name: 'Power Generation', icon: '⚡', description: 'Conventional, renewable, and nuclear power systems' },
    { name: 'Manufacturing', icon: '🏭', description: 'Process manufacturing and industrial facilities' },
    { name: 'Infrastructure', icon: '🏗️', description: 'Water treatment, waste management, and utilities' },
    { name: 'Mining & Metals', icon: '⛏️', description: 'Extraction, processing, and metallurgical operations' }
  ]

  return (
    <>
      <Helmet>
        <title>EDRS - Engineering Document Review System | AI-Powered P&ID Analysis</title>
        <meta name="description" content="Transform your engineering document review process with AI-powered P&ID analysis. Ensure compliance, improve safety, and accelerate project delivery." />
        <meta name="keywords" content="P&ID analysis, engineering documents, compliance, safety, automation, AI, machine learning" />
      </Helmet>

      {/* Hero Section - Inspired by Rejlers */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <LightBulbIcon className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm font-medium">HOME OF THE ENGINEERING MINDS</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block">POWERING THE</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    FUTURE OF
                  </span>
                  <span className="block">ENGINEERING</span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 font-light max-w-2xl">
                  Transform your engineering document review process with AI-powered P&ID analysis. 
                  Ensure compliance, improve safety, and accelerate project delivery.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-2xl"
                    >
                      Go to Dashboard
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </Link>
                    <Link 
                      to="/pid-analysis" 
                      className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-900 transform hover:scale-105 transition-all duration-200"
                    >
                      Start Analysis
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/register" 
                      className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-2xl"
                    >
                      Start Free Trial
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </Link>
                    <Link 
                      to="/login" 
                      className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-900 transform hover:scale-105 transition-all duration-200"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 text-sm text-blue-200">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                  ISO 9001 Certified
                </div>
                <div className="flex items-center">
                  <ShieldCheckIcon className="w-5 h-5 text-blue-400 mr-2" />
                  Enterprise Security
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 text-purple-400 mr-2" />
                  24/7 Support
                </div>
              </div>
            </div>

            {/* Right Content - Demo/Visual */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Live Analysis Demo</h3>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                      <span className="text-blue-100">P&ID Document Processing</span>
                      <span className="text-green-400 font-semibold">98.5%</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                      <span className="text-blue-100">Symbol Recognition</span>
                      <span className="text-blue-400 font-semibold">1,247 items</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                      <span className="text-blue-100">Compliance Checks</span>
                      <span className="text-purple-400 font-semibold">ISA-5.1 ✓</span>
                    </div>
                  </div>
                  
                  <button className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                    <PlayIcon className="w-5 h-5 mr-2" />
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">TRUSTED BY INDUSTRY LEADERS</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Transforming Engineering Excellence Worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-shadow">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">CORE CAPABILITIES</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Advanced Engineering Document Intelligence
            </p>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Leverage cutting-edge AI and machine learning to revolutionize your engineering document review process
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.highlights.map((highlight, idx) => (
                          <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">INDUSTRY EXPERTISE</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Serving Critical Industries Worldwide
            </p>
            <p className="mt-4 text-xl text-gray-600">
              Our solutions are trusted by leading organizations across multiple sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {industry.name}
                </h3>
                <p className="text-gray-600">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Security Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-blue-300 uppercase tracking-wide">COMPLIANCE & SECURITY</h2>
            <p className="mt-2 text-3xl font-bold sm:text-4xl">
              Enterprise-Grade Security & Regulatory Compliance
            </p>
            <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
              Built to meet the highest industry standards for security, compliance, and data protection
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Compliance Standards */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <ShieldCheckIcon className="w-8 h-8 text-green-400 mr-3" />
                <h3 className="text-2xl font-bold">Compliance Standards</h3>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="font-semibold text-green-400">ISO 9001:2015</div>
                    <div className="text-sm text-blue-100">Quality Management</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="font-semibold text-green-400">ISO 27001</div>
                    <div className="text-sm text-blue-100">Information Security</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="font-semibold text-green-400">ISA-5.1</div>
                    <div className="text-sm text-blue-100">Instrumentation Standards</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="font-semibold text-green-400">IEC-62424</div>
                    <div className="text-sm text-blue-100">Process Control</div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Additional Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-500/30 rounded-full text-sm">GDPR Compliant</span>
                    <span className="px-3 py-1 bg-purple-500/30 rounded-full text-sm">SOC 2 Type II</span>
                    <span className="px-3 py-1 bg-green-500/30 rounded-full text-sm">HIPAA Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <CogIcon className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold">Security Features</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">End-to-End Encryption</div>
                    <div className="text-sm text-blue-100">AES-256 encryption for data at rest and in transit</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Multi-Factor Authentication</div>
                    <div className="text-sm text-blue-100">Advanced MFA with biometric support</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Role-Based Access Control</div>
                    <div className="text-sm text-blue-100">Granular permissions and audit trails</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Continuous Monitoring</div>
                    <div className="text-sm text-blue-100">24/7 security monitoring and threat detection</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Data Residency Control</div>
                    <div className="text-sm text-blue-100">Choose where your data is stored and processed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Built with Enterprise Technology</h3>
              <p className="text-blue-100">Powered by industry-leading technologies and cloud infrastructure</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {[
                { name: 'Django', desc: 'Backend API' },
                { name: 'React', desc: 'Frontend UI' },
                { name: 'PostgreSQL', desc: 'Primary DB' },
                { name: 'MongoDB', desc: 'Document Store' },
                { name: 'Redis', desc: 'Cache Layer' },
                { name: 'Docker', desc: 'Containerization' },
                { name: 'AWS', desc: 'Cloud Platform' },
                { name: 'Kubernetes', desc: 'Orchestration' }
              ].map((tech, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 group-hover:bg-white/20 transition-all duration-200">
                    <div className="font-semibold text-white">{tech.name}</div>
                    <div className="text-xs text-blue-200 mt-1">{tech.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Testimonial */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-light text-gray-900 max-w-4xl mx-auto mb-8">
              "EDRS has revolutionized our P&ID review process. We've reduced review time by 75% while significantly improving accuracy and compliance. It's a game-changer for our engineering operations."
            </blockquote>
            <cite className="text-lg text-gray-600">
              <span className="font-semibold">Sarah Johnson</span>
              <span className="mx-2">•</span>
              <span>Chief Engineering Officer, Petrotech Solutions</span>
            </cite>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Engineering Process?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join thousands of engineers who trust EDRS for their most critical document review and analysis needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/register" 
                    className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Start Free Trial
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Link>
                  <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200">
                    Schedule Demo
                  </button>
                </>
              ) : (
                <Link 
                  to="/dashboard" 
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Go to Dashboard
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home