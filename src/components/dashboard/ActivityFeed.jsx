import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import {
  CheckCircleIcon,
  DocumentArrowUpIcon,
  EyeIcon,
  CpuChipIcon,
  UserPlusIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

/**
 * Real-time Activity Feed Component
 * Displays live system activities with intelligent categorization
 */
const ActivityFeed = ({ activities = [], maxItems = 10, showTimestamps = true, className = '' }) => {
  const iconMap = {
    CheckCircleIcon,
    DocumentArrowUpIcon,
    EyeIcon,
    CpuChipIcon,
    UserPlusIcon,
    ExclamationTriangleIcon
  }

  const colorClasses = {
    green: {
      bg: 'bg-green-100',
      icon: 'text-green-600',
      border: 'border-green-200'
    },
    blue: {
      bg: 'bg-blue-100',
      icon: 'text-blue-600',
      border: 'border-blue-200'
    },
    purple: {
      bg: 'bg-purple-100',
      icon: 'text-purple-600',
      border: 'border-purple-200'
    },
    amber: {
      bg: 'bg-amber-100',
      icon: 'text-amber-600',
      border: 'border-amber-200'
    },
    gray: {
      bg: 'bg-gray-100',
      icon: 'text-gray-600',
      border: 'border-gray-200'
    }
  }

  const displayActivities = activities.slice(0, maxItems)

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">Live</span>
          </div>
        </div>

        {displayActivities.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayActivities.map((activity, index) => {
              const IconComponent = iconMap[activity.icon] || CheckCircleIcon
              const colors = colorClasses[activity.color] || colorClasses.gray
              
              return (
                <div 
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className={`flex-shrink-0 w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center ${colors.border} border`}>
                    <IconComponent className={`w-4 h-4 ${colors.icon}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span>
                          {' '}
                          <span className="text-gray-600">{activity.action}</span>
                          {' '}
                          <span className="font-medium text-blue-600">{activity.target}</span>
                        </p>
                        
                        {showTimestamps && activity.timestamp && (
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                          </p>
                        )}
                      </div>
                      
                      {activity.status && (
                        <span className={`
                          inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                          ${activity.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            activity.status === 'failed' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'}
                        `}>
                          {activity.status}
                        </span>
                      )}
                    </div>
                    
                    {activity.details && (
                      <p className="text-sm text-gray-500 mt-1">
                        {activity.details}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        
        {activities.length > maxItems && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all activity ({activities.length} total)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

ActivityFeed.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      user: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired,
      target: PropTypes.string.isRequired,
      timestamp: PropTypes.string,
      icon: PropTypes.string,
      color: PropTypes.oneOf(['green', 'blue', 'purple', 'amber', 'gray']),
      status: PropTypes.string,
      details: PropTypes.string
    })
  ).isRequired,
  maxItems: PropTypes.number,
  showTimestamps: PropTypes.bool,
  className: PropTypes.string
}

export default ActivityFeed