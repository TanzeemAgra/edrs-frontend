import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuthStore } from '../stores/authStore'

const Home = () => {
  const { isAuthenticated } = useAuthStore()

  return (
    <>
      <Helmet>
        <title>Home - EDRS</title>
        <meta name="description" content="Welcome to EDRS - Electronic Document Recording System" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container">
          <div className="py-24 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Electronic Document Recording System
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Modern document management with Django & React
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100">
                    Go to Dashboard
                  </Link>
                  <Link to="/posts" className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                    View Posts
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100">
                    Get Started
                  </Link>
                  <Link to="/login" className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for modern document management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="card-body">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Secure Storage
                </h3>
                <p className="text-gray-600">
                  Your documents are safely stored with enterprise-grade security and encryption.
                </p>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-body">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Fast Performance
                </h3>
                <p className="text-gray-600">
                  Built with modern technologies for lightning-fast document access and processing.
                </p>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-body">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Team Collaboration
                </h3>
                <p className="text-gray-600">
                  Work together seamlessly with real-time collaboration and sharing features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="section bg-gray-100">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-gray-600">
              Powered by industry-leading technologies and best practices
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900">Django</h4>
                <p className="text-sm text-gray-600">Backend Framework</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900">React</h4>
                <p className="text-sm text-gray-600">Frontend Framework</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900">PostgreSQL</h4>
                <p className="text-sm text-gray-600">Primary Database</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900">MongoDB</h4>
                <p className="text-sm text-gray-600">Document Storage</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Deployed on Railway (Backend) and Vercel (Frontend) for global scalability
            </p>
            {!isAuthenticated && (
              <Link to="/register" className="btn btn-primary btn-lg">
                Start Building Today
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home