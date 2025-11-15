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
  AcademicCapIcon,
  RocketLaunchIcon,
  FireIcon,
  BoltIcon,
  SparklesIcon,
  TrophyIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  CommandLineIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  WrenchScrewdriverIcon,
  PuzzlePieceIcon,
  MagnifyingGlassIcon
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

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Process Engineer",
      company: "PetroTech Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      quote: "EDRS has revolutionized our P&ID review process. What used to take weeks now takes hours, with unprecedented accuracy and compliance assurance.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Engineering Manager",
      company: "Global Chemical Corp",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      quote: "The AI-powered analysis caught critical issues we missed in manual reviews. EDRS has become indispensable to our engineering workflow.",
      rating: 5
    },
    {
      name: "Jennifer Park",
      role: "Project Director",
      company: "Industrial Dynamics",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
      quote: "Outstanding platform! The compliance reporting features alone have saved us thousands of hours and significantly reduced project risks.",
      rating: 5
    }
  ]

  const techStack = [
    { name: 'TensorFlow', description: 'Deep Learning AI', color: 'bg-orange-500' },
    { name: 'PyTorch', description: 'Neural Networks', color: 'bg-red-500' },
    { name: 'OpenCV', description: 'Computer Vision', color: 'bg-green-500' },
    { name: 'Kubernetes', description: 'Container Orchestration', color: 'bg-blue-500' },
    { name: 'React', description: 'User Interface', color: 'bg-cyan-500' },
    { name: 'PostgreSQL', description: 'Database Engine', color: 'bg-indigo-500' }
  ]

  const partnerLogos = [
    { name: 'Microsoft Azure', logo: '☁️' },
    { name: 'AWS', logo: '🌐' },
    { name: 'Google Cloud', logo: '🔧' },
    { name: 'NVIDIA', logo: '💎' },
    { name: 'Intel', logo: '⚡' },
    { name: 'Siemens', logo: '🏭' }
  ]

  return (
    <>
      <Helmet>
        <title>EDRS | Enterprise Engineering Document Management & P&ID Analysis Platform</title>
        <meta name="description" content="Professional engineering document management platform designed for oil & gas, petrochemicals, and industrial projects. Advanced P&ID analysis, compliance management, and collaborative engineering workflows." />
        <meta name="keywords" content="engineering document management, P&ID analysis, industrial compliance, process safety, enterprise software, engineering solutions" />
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
                <span className="text-sm font-medium">PROFESSIONAL ENGINEERING SOLUTIONS</span>
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
                  Professional engineering document management platform delivering advanced P&ID analysis, 
                  regulatory compliance, and collaborative project workflows for industrial excellence.
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

          {/* Enterprise Features */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Platform</h3>
              <p className="text-blue-100">Scalable, reliable, and secure infrastructure designed for mission-critical operations</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: '99.99%', desc: 'Uptime SLA', icon: '⚡' },
                { name: 'Global', desc: 'Data Centers', icon: '🌍' },
                { name: '24/7', desc: 'Support', icon: '🛡️' },
                { name: 'Enterprise', desc: 'Integration', icon: '🔗' }
              ].map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 group-hover:bg-white/20 transition-all duration-200">
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <div className="text-xl font-bold text-white">{feature.name}</div>
                    <div className="text-sm text-blue-200 mt-1">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">CUTTING-EDGE TECHNOLOGY</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Powered by Advanced AI & Machine Learning
            </p>
            <p className="mt-4 text-xl text-gray-600">
              Our platform leverages the latest in artificial intelligence and cloud computing
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="group bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-200">
                <div className={`w-12 h-12 ${tech.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <CommandLineIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tech.name}</h3>
                <p className="text-gray-600 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>

          {/* Live Stats Counter */}
          <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Real-Time Platform Activity</h3>
              <p className="text-blue-100">Live metrics from our global engineering community</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">2,847</div>
                <div className="text-sm text-blue-200">Documents Processing</div>
                <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-2 animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">156</div>
                <div className="text-sm text-blue-200">Active Engineers</div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full mx-auto mt-2 animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">98.7%</div>
                <div className="text-sm text-blue-200">Accuracy Rate</div>
                <div className="w-2 h-2 bg-purple-400 rounded-full mx-auto mt-2 animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">47</div>
                <div className="text-sm text-blue-200">Countries Served</div>
                <div className="w-2 h-2 bg-pink-400 rounded-full mx-auto mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">CUSTOMER SUCCESS STORIES</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Trusted by Engineering Leaders Worldwide
            </p>
            <p className="mt-4 text-xl text-gray-600">
              See how EDRS is transforming engineering workflows across industries
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <TrophyIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Join 1,200+ Engineering Teams
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Experience the future of engineering document management. 
                Start your free trial today and see results in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to={isAuthenticated ? "/dashboard" : "/register"}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <RocketLaunchIcon className="w-5 h-5 mr-2" />
                  {isAuthenticated ? 'Go to Dashboard' : 'Start Free Trial'}
                </Link>
                <button className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200">
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Lab Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <SparklesIcon className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm font-medium">INNOVATION LAB</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Future of Engineering is
              <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                AI-Powered
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore cutting-edge features and experimental technologies that are shaping 
              the next generation of engineering document intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Features */}
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <BoltIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Real-Time Collaboration</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  Multi-user real-time editing with AI-powered conflict resolution and 
                  automatic version synchronization across global engineering teams.
                </p>
                <div className="flex items-center text-sm text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Beta Available Now
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                    <FireIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Predictive Analytics</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  Advanced machine learning models predict potential design issues, 
                  maintenance needs, and optimization opportunities before they occur.
                </p>
                <div className="flex items-center text-sm text-yellow-400">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                  Coming Q1 2026
                </div>
              </div>
            </div>

            {/* Right Side - Interactive Demo */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Interactive AI Assistant</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-blue-500/30 rounded-lg p-4 ml-8">
                  <p className="text-sm">"Analyze the pressure safety systems in this P&ID"</p>
                </div>
                
                <div className="bg-white/20 rounded-lg p-4 mr-8">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">EDRS AI</span>
                  </div>
                  <p className="text-sm text-blue-100">
                    I've identified 47 safety-related components including 12 pressure relief valves, 
                    8 emergency shutdown systems, and 3 rupture discs. All components comply with 
                    API 520 standards. Would you like a detailed safety analysis report?
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 text-center">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-green-300 font-medium">
                  Try our AI assistant - Available 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Integration */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">ENTERPRISE INTEGRATIONS</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Seamlessly Connects to Your Existing Tools
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-200 mb-3">
                  {partner.logo}
                </div>
                <span className="text-sm text-gray-600 text-center font-medium">{partner.name}</span>
              </div>
            ))}
          </div>

          {/* Integration Benefits */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <PuzzlePieceIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Integration</h3>
                  <p className="text-gray-600">Connect with existing CAD, PLM, and ERP systems in minutes</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <CloudIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Cloud Native</h3>
                  <p className="text-gray-600">Scalable cloud architecture with enterprise-grade security</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <WrenchScrewdriverIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Custom APIs</h3>
                  <p className="text-gray-600">RESTful APIs and webhooks for custom workflow automation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
          <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RocketLaunchIcon className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              Engineering Workflow?
            </span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of engineering professionals who trust EDRS to streamline 
            their document management and accelerate project delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="inline-flex items-center px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-2xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-2xl"
            >              
              <SparklesIcon className="w-6 h-6 mr-3" />
              {isAuthenticated ? 'Access Dashboard' : 'Start Free Trial'}
              <ArrowRightIcon className="w-6 h-6 ml-3" />
            </Link>
            
            <Link 
              to="/contact-us"
              className="inline-flex items-center px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              <ChatBubbleLeftRightIcon className="w-6 h-6 mr-3" />
              Talk to Sales
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-blue-200">
            <div className="flex items-center">
              <HeartIcon className="w-4 h-4 text-pink-400 mr-2" />
              <span>Loved by 50,000+ engineers</span>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 text-yellow-400 mr-2" />
              <span>Setup in 5 minutes</span>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Home