import React from 'react'
import PropTypes from 'prop-types'
import { 
  DocumentTextIcon, 
  ChartBarIcon, 
  ClockIcon, 
  CheckCircleIcon,
  HeartIcon,
  CpuChipIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'

/**
 * Advanced Statistics Card Component
 * Intelligent, animated stat display with trend indicators
 */
const StatCard = ({ 
  title, 
  value, 
  previousValue, 
  icon: IconComponent, 
  color = 'blue',
  trend,
  isLoading = false,
  suffix = '',
  prefix = '',
  onClick
}) => {
  // Calculate trend if not provided
  const calculatedTrend = trend || (previousValue ? 
    ((value - previousValue) / previousValue * 100).toFixed(1) : null)
  
  const isPositiveTrend = calculatedTrend > 0
  const isNegativeTrend = calculatedTrend < 0
  
  const colorClasses = {
    blue: {
      background: 'bg-blue-50',
      icon: 'text-blue-600',
      text: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600'
    },
    emerald: {
      background: 'bg-emerald-50',
      icon: 'text-emerald-600',
      text: 'text-emerald-600',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    amber: {
      background: 'bg-amber-50',
      icon: 'text-amber-600',
      text: 'text-amber-600',
      gradient: 'from-amber-500 to-amber-600'
    },
    green: {
      background: 'bg-green-50',
      icon: 'text-green-600',
      text: 'text-green-600',
      gradient: 'from-green-500 to-green-600'
    },
    red: {
      background: 'bg-red-50',
      icon: 'text-red-600',
      text: 'text-red-600',
      gradient: 'from-red-500 to-red-600'
    },
    purple: {
      background: 'bg-purple-50',
      icon: 'text-purple-600',
      text: 'text-purple-600',
      gradient: 'from-purple-500 to-purple-600'
    }
  }

  const classes = colorClasses[color] || colorClasses.blue

  return (
    <div 
      className={`
        relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-200
        transition-all duration-300 hover:shadow-md hover:-translate-y-1
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      {/* Background Gradient */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${classes.gradient} opacity-5 rounded-full transform translate-x-8 -translate-y-8`}></div>
      
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg ${classes.background}`}>
                {IconComponent && <IconComponent className={`w-6 h-6 ${classes.icon}`} />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <div className="flex items-baseline space-x-2">
                  {isLoading ? (
                    <div className="animate-pulse">
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-gray-900">
                        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
                      </p>
                      {calculatedTrend !== null && (
                        <div className={`flex items-center text-sm ${
                          isPositiveTrend ? 'text-green-600' : 
                          isNegativeTrend ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          {isPositiveTrend && <ArrowUpIcon className="w-4 h-4 mr-1" />}
                          {isNegativeTrend && <ArrowDownIcon className="w-4 h-4 mr-1" />}
                          <span>{Math.abs(calculatedTrend)}%</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar (optional) */}
        {value && typeof value === 'number' && value <= 100 && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${classes.gradient} transition-all duration-500`}
                style={{ width: `${value}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  previousValue: PropTypes.number,
  icon: PropTypes.elementType,
  color: PropTypes.oneOf(['blue', 'emerald', 'amber', 'green', 'red', 'purple']),
  trend: PropTypes.number,
  isLoading: PropTypes.bool,
  suffix: PropTypes.string,
  prefix: PropTypes.string,
  onClick: PropTypes.func
}

// Icon mapping for easy use
export const STAT_ICONS = {
  DocumentTextIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  HeartIcon,
  CpuChipIcon
}

export default StatCard