/**
 * Analysis Overview Component
 * Provides comprehensive overview of P&ID analysis results and metrics
 */

import React, { useMemo } from 'react'
import {
  ChartBarIcon,
  DocumentCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CpuChipIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import PIDAnalysisConfig from '../../config/pidAnalysis'

const AnalysisOverview = ({ 
  project, 
  diagram, 
  results, 
  session, 
  config, 
  loading 
}) => {
  // Calculate analysis metrics
  const metrics = useMemo(() => {
    if (!results || results.length === 0) {
      return {
        totalItems: 0,
        errorsByLevel: {},
        completionRate: 0,
        accuracyScore: 0,
        processingTime: 0,
        categoriesAnalyzed: 0
      }
    }

    const errorsByLevel = results.reduce((acc, result) => {
      const level = result.severity || 'info'
      acc[level] = (acc[level] || 0) + 1
      return acc
    }, {})

    const totalErrors = Object.values(errorsByLevel).reduce((sum, count) => sum + count, 0)
    const criticalErrors = errorsByLevel.critical || 0
    const completionRate = session?.progress_percentage || 0
    const accuracyScore = session?.accuracy_score || 0

    return {
      totalItems: results.length,
      errorsByLevel,
      totalErrors,
      criticalErrors,
      completionRate,
      accuracyScore,
      processingTime: session?.processing_time || 0,
      categoriesAnalyzed: new Set(results.map(r => r.category)).size
    }
  }, [results, session])

  const analysisTypes = Object.values(PIDAnalysisConfig.analysisTypes)

  const MetricCard = ({ title, value, subtitle, icon: Icon, color = 'blue', trend, onClick }) => (
    <div 
      className={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:scale-[1.02]' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          color === 'blue' ? 'bg-blue-100' :
          color === 'green' ? 'bg-green-100' :
          color === 'red' ? 'bg-red-100' :
          color === 'yellow' ? 'bg-yellow-100' :
          color === 'purple' ? 'bg-purple-100' :
          'bg-gray-100'
        }`}>
          <Icon className={`w-6 h-6 ${
            color === 'blue' ? 'text-blue-600' :
            color === 'green' ? 'text-green-600' :
            color === 'red' ? 'text-red-600' :
            color === 'yellow' ? 'text-yellow-600' :
            color === 'purple' ? 'text-purple-600' :
            'text-gray-600'
          }`} />
        </div>
        {trend && (
          <div className={`flex items-center text-sm font-medium ${
            trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-500'
          }`}>
            {trend > 0 ? (
              <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
            ) : trend < 0 ? (
              <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
            ) : null}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  )

  const ProgressRing = ({ percentage, size = 120, strokeWidth = 8, color = 'blue' }) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (percentage / 100) * circumference

    const colorClasses = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      red: 'text-red-600',
      yellow: 'text-yellow-600'
    }

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={colorClasses[color] || colorClasses.blue}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
          <span className="text-xs text-gray-500">Complete</span>
        </div>
      </div>
    )
  }

  if (loading.results) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analysis overview...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Analysis Progress Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Analysis Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-6">
            <ProgressRing 
              percentage={metrics.completionRate} 
              color={metrics.completionRate === 100 ? 'green' : 'blue'} 
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
              <p className="text-sm text-gray-600">
                {session?.status === 'completed' ? 'Analysis Complete' :
                 session?.status === 'running' ? 'Analysis in Progress' :
                 session?.status === 'failed' ? 'Analysis Failed' :
                 'Ready to Analyze'}
              </p>
              {session?.estimated_completion && (
                <p className="text-xs text-gray-500 mt-1">
                  Est. completion: {new Date(session.estimated_completion).toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Processing Quality</span>
                <span className="font-medium">{metrics.accuracyScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metrics.accuracyScore}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Data Extraction</span>
                <span className="font-medium">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-[87%] transition-all duration-300" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Validation</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full w-[92%] transition-all duration-300" />
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
              <CpuChipIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-sm font-medium text-gray-900">AI Processing</h4>
            <p className="text-xs text-gray-500">
              {metrics.categoriesAnalyzed} categories analyzed
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Findings"
          value={metrics.totalItems.toLocaleString()}
          subtitle="Items identified and analyzed"
          icon={DocumentCheckIcon}
          color="blue"
          trend={8}
        />
        
        <MetricCard
          title="Critical Issues"
          value={metrics.criticalErrors}
          subtitle="Require immediate attention"
          icon={ExclamationTriangleIcon}
          color="red"
          trend={-12}
        />
        
        <MetricCard
          title="Processing Time"
          value={`${Math.round(metrics.processingTime / 60)}m`}
          subtitle="Analysis duration"
          icon={ClockIcon}
          color="green"
          trend={-5}
        />
        
        <MetricCard
          title="Accuracy Score"
          value={`${metrics.accuracyScore}%`}
          subtitle="AI confidence level"
          icon={CheckCircleIcon}
          color="purple"
          trend={3}
        />
      </div>

      {/* Error Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Distribution</h3>
          <div className="space-y-4">
            {Object.entries(PIDAnalysisConfig.errorCategories).map(([level, config]) => {
              const count = metrics.errorsByLevel[level.toLowerCase()] || 0
              const percentage = metrics.totalErrors > 0 ? (count / metrics.totalErrors) * 100 : 0
              
              return (
                <div key={level} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-${config.color}-500`} />
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {level.toLowerCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${config.color}-500 h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Categories</h3>
          <div className="space-y-3">
            {analysisTypes.filter(type => type.enabled).map((type) => (
              <div 
                key={type.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-${type.color}-100 flex items-center justify-center`}>
                    <span className={`text-${type.color}-600 text-sm font-medium`}>
                      {type.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{type.name}</p>
                    <p className="text-xs text-gray-500">{type.description}</p>
                  </div>
                </div>
                <ArrowRightIcon className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Analysis Activity */}
      {results && results.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Findings</h3>
          <div className="space-y-3">
            {results.slice(0, 5).map((result, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  result.severity === 'critical' ? 'bg-red-500' :
                  result.severity === 'high' ? 'bg-orange-500' :
                  result.severity === 'medium' ? 'bg-yellow-500' :
                  result.severity === 'low' ? 'bg-blue-500' :
                  'bg-gray-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {result.title || result.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {result.category} • {result.location || 'General'}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  result.severity === 'critical' ? 'bg-red-100 text-red-800' :
                  result.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                  result.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  result.severity === 'low' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {result.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AnalysisOverview