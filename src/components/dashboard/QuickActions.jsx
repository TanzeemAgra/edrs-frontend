import React from 'react'
import PropTypes from 'prop-types'
import { 
  CloudArrowUpIcon,
  CpuChipIcon,
  DocumentPlusIcon,
  ChartPieIcon,
  UsersIcon,
  CogIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

/**
 * Intelligent Quick Actions Widget
 * Contextual action buttons with smart routing and analytics
 */
const QuickActions = ({ actions = [], onActionClick, className = '' }) => {
  const iconMap = {
    CloudArrowUpIcon,
    CpuChipIcon,
    DocumentPlusIcon,
    ChartPieIcon,
    UsersIcon,
    CogIcon
  }

  const colorClasses = {
    blue: {
      button: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      icon: 'text-white',
      text: 'text-white'
    },
    emerald: {
      button: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
      icon: 'text-white',
      text: 'text-white'
    },
    purple: {
      button: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      icon: 'text-white',
      text: 'text-white'
    },
    indigo: {
      button: 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
      icon: 'text-white',
      text: 'text-white'
    },
    gray: {
      button: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700',
      icon: 'text-white',
      text: 'text-white'
    }
  }

  const handleActionClick = (action) => {
    if (onActionClick) {
      onActionClick(action)
    }
    
    // Analytics tracking
    if (window.gtag) {
      window.gtag('event', 'quick_action_click', {
        action_type: action.action,
        action_title: action.title
      })
    }
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          <div className="flex items-center text-sm text-gray-500">
            <span>Fast track your workflow</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {actions.map((action, index) => {
            const IconComponent = iconMap[action.icon] || CloudArrowUpIcon
            const colors = colorClasses[action.color] || colorClasses.blue
            
            const ActionButton = (
              <button
                onClick={() => handleActionClick(action)}
                className={`
                  w-full group relative overflow-hidden rounded-lg p-4 text-left
                  ${colors.button}
                  transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                `}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-white opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id={`pattern-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.1" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill={`url(#pattern-${index})`} />
                  </svg>
                </div>
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${colors.text}`}>
                        {action.title}
                      </p>
                      {action.description && (
                        <p className={`text-sm ${colors.text} opacity-75 mt-1`}>
                          {action.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <ArrowRightIcon 
                    className={`w-5 h-5 ${colors.icon} transform transition-transform group-hover:translate-x-1`} 
                  />
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
            )

            // Wrap with Link if route is provided
            if (action.route) {
              return (
                <Link key={action.action} to={action.route} className="block">
                  {ActionButton}
                </Link>
              )
            }

            return (
              <div key={action.action}>
                {ActionButton}
              </div>
            )
          })}
        </div>
        
        {/* Additional Actions Link */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link 
            to="/actions" 
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center group"
          >
            View all actions
            <ArrowRightIcon className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

QuickActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      icon: PropTypes.string.isRequired,
      color: PropTypes.oneOf(['blue', 'emerald', 'purple', 'indigo', 'gray']),
      action: PropTypes.string.isRequired,
      route: PropTypes.string
    })
  ).isRequired,
  onActionClick: PropTypes.func,
  className: PropTypes.string
}

export default QuickActions