import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

/**
 * Advanced Notification Panel Component
 * Smart notification system with categorization and actions
 */
const NotificationPanel = ({ 
  notifications = [], 
  onMarkAsRead, 
  onClear, 
  onClearAll,
  maxItems = 5,
  className = '' 
}) => {
  const iconMap = {
    info: InformationCircleIcon,
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: XCircleIcon
  }

  const colorClasses = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      title: 'text-blue-800',
      message: 'text-blue-700'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      title: 'text-green-800',
      message: 'text-green-700'
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: 'text-amber-600',
      title: 'text-amber-800',
      message: 'text-amber-700'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      title: 'text-red-800',
      message: 'text-red-700'
    }
  }

  const displayNotifications = notifications.slice(0, maxItems)
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {unreadCount} new
              </span>
            )}
          </div>
          
          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {displayNotifications.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No new notifications</p>
            <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayNotifications.map((notification, index) => {
              const IconComponent = iconMap[notification.type] || InformationCircleIcon
              const colors = colorClasses[notification.type] || colorClasses.info
              
              return (
                <div
                  key={notification.id}
                  className={`
                    relative p-4 rounded-lg border transition-all duration-200
                    ${colors.bg} ${colors.border}
                    ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <IconComponent className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className={`text-sm font-medium ${colors.title}`}>
                            {notification.title}
                          </h4>
                          <p className={`text-sm ${colors.message} mt-1`}>
                            {notification.message}
                          </p>
                          
                          {notification.timestamp && (
                            <p className="text-xs text-gray-500 mt-2">
                              {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => onMarkAsRead(notification.id)}
                              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Mark as read
                            </button>
                          )}
                          
                          <button
                            onClick={() => onClear(notification.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {notification.actions && notification.actions.length > 0 && (
                        <div className="mt-3 flex items-center space-x-3">
                          {notification.actions.map((action, actionIndex) => (
                            <button
                              key={actionIndex}
                              onClick={action.onClick}
                              className={`
                                text-xs font-medium px-3 py-1 rounded-md transition-colors
                                ${action.primary ? 
                                  'bg-blue-600 text-white hover:bg-blue-700' : 
                                  'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }
                              `}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        
        {notifications.length > maxItems && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all notifications ({notifications.length} total)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

NotificationPanel.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.oneOf(['info', 'success', 'warning', 'error']).isRequired,
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.string,
      read: PropTypes.bool,
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          onClick: PropTypes.func.isRequired,
          primary: PropTypes.bool
        })
      )
    })
  ).isRequired,
  onMarkAsRead: PropTypes.func,
  onClear: PropTypes.func,
  onClearAll: PropTypes.func,
  maxItems: PropTypes.number,
  className: PropTypes.string
}

export default NotificationPanel