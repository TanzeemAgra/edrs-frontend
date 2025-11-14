/**
 * Analysis Stats Card Component
 * Displays statistics cards for the P&ID analysis dashboard
 */

import React from 'react';

const AnalysisStatsCard = ({ title, value, icon: Icon, color, description }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          icon: 'text-blue-600',
          text: 'text-blue-900'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          icon: 'text-green-600',
          text: 'text-green-900'
        };
      case 'red':
        return {
          bg: 'bg-red-50',
          icon: 'text-red-600',
          text: 'text-red-900'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          icon: 'text-purple-600',
          text: 'text-purple-900'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-50',
          icon: 'text-yellow-600',
          text: 'text-yellow-900'
        };
      default:
        return {
          bg: 'bg-gray-50',
          icon: 'text-gray-600',
          text: 'text-gray-900'
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`p-3 rounded-md ${colorClasses.bg}`}>
              <Icon className={`h-6 w-6 ${colorClasses.icon}`} />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className={`text-2xl font-semibold ${colorClasses.text}`}>
                {typeof value === 'number' ? value.toLocaleString() : value}
              </dd>
              {description && (
                <dd className="text-sm text-gray-500 mt-1">
                  {description}
                </dd>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisStatsCard;