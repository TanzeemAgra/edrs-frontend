import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'

const LegalBreadcrumb = ({ currentPage }) => {
  const breadcrumbs = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Legal', path: null },
    { label: currentPage, path: null }
  ]

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRightIcon className="h-4 w-4 mx-2" />}
          {item.path ? (
            <Link 
              to={item.path} 
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              {item.icon && <item.icon className="h-4 w-4 mr-1" />}
              {item.label}
            </Link>
          ) : (
            <span className={index === breadcrumbs.length - 1 ? "text-gray-900 font-medium" : ""}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

export default LegalBreadcrumb