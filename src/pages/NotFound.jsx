import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - EDRS</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h2>
          <p className="mt-2 text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-8">
            <Link to="/" className="btn btn-primary">
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound