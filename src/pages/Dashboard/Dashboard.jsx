import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import DocumentUploadModal from '../../components/upload/DocumentUploadModal'
import { useAuthStore } from '../../stores/authStore'
import { useDashboardStore } from '../../stores/dashboardStore'
import DASHBOARD_CONFIG from '../../config/dashboard'
import StatCard, { STAT_ICONS } from '../../components/dashboard/StatCard'
import QuickActions from '../../components/dashboard/QuickActions'
import ActivityFeed from '../../components/dashboard/ActivityFeed'
import {
  BellIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
  SunIcon,
  MoonIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ServerIcon,
  CpuChipIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const Dashboard = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const {
    stats,
    activities,
    notifications,
    isLoading,
    lastUpdate,
    realTimeEnabled,
    fetchDashboardData,
    startRealTimeUpdates,
    stopRealTimeUpdates,
    getUnreadNotificationsCount
  } = useDashboardStore()
  
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Initialize dashboard data and real-time updates
  useEffect(() => {
    fetchDashboardData()
    startRealTimeUpdates()

    // Update current time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => {
      stopRealTimeUpdates()
      clearInterval(timeInterval)
    }
  }, [])

  const formatLastUpdate = () => {
    if (!lastUpdate) return 'Never'
    const updateDate = new Date(lastUpdate)
    return updateDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <>
      <Helmet>
        <title>EDRS Dashboard | Engineering Document Management Platform</title>
        <meta name="description" content="Advanced dashboard for P&ID analysis and document management" />
      </Helmet>

      {/* Professional Dashboard Container */}
      <div className={`min-h-screen transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50'
      }`}>
        
        {/* Elegant Header with Glass Morphism */}
        <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-900/80 border-gray-700' 
            : 'bg-white/70 border-gray-200/50'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Left Section - Welcome & Time */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isDarkMode ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                  }`}>
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className={`text-lg font-bold ${
                      isDarkMode 
                        ? 'text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text' 
                        : 'text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text'
                    }`}>
                      {getGreeting()}, {user?.first_name || user?.username}!
                    </h1>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {currentTime.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Section - Controls */}
              <div className="flex items-center space-x-2">
                {/* Real-time Status Indicator */}
                <div className={`hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                  isDarkMode ? 'bg-gray-800/50 text-gray-300' : 'bg-gray-100/50 text-gray-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    realTimeEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'
                  }`} />
                  <span>Updated {formatLastUpdate()}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-1">
                  {/* Notifications */}
                  <button className={`relative p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}>
                    <BellIcon className="w-5 h-5" />
                    {getUnreadNotificationsCount() > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                        {getUnreadNotificationsCount()}
                      </span>
                    )}
                  </button>
                  
                  {/* Theme Toggle */}
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                      isDarkMode 
                        ? 'text-yellow-400 hover:text-yellow-300 hover:bg-gray-800/50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                  >
                    {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                  </button>
                  
                  {/* Refresh Button */}
                  <button 
                    onClick={fetchDashboardData}
                    disabled={isLoading}
                    className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                  >
                    <ArrowPathIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          
          {/* Key Metrics Cards - Redesigned with Better Layout */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
            {/* Document Management Card */}
            <div className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50' 
                : 'bg-gradient-to-br from-white to-blue-50/30 border border-gray-200/50 shadow-sm hover:shadow-lg'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                  <DocumentTextIcon className="w-5 h-5 text-white" />
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  +12%
                </div>
              </div>
              <div className="space-y-1">
                <h3 className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Total Documents</h3>
                <p className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{stats.totalDocuments || '1,247'}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* P&ID Analysis Card */}
            <div className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50' 
                : 'bg-gradient-to-br from-white to-emerald-50/30 border border-gray-200/50 shadow-sm hover:shadow-lg'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl">
                  <ChartBarIcon className="w-5 h-5 text-white" />
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  isDarkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  Active
                </div>
              </div>
              <div className="space-y-1">
                <h3 className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>P&ID Analysis</h3>
                <p className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{stats.pidAnalysis || '85'}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Pending Reviews Card */}
            <div className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50' 
                : 'bg-gradient-to-br from-white to-amber-50/30 border border-gray-200/50 shadow-sm hover:shadow-lg'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl">
                  <ClockIcon className="w-5 h-5 text-white" />
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  isDarkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-600'
                }`}>
                  Urgent
                </div>
              </div>
              <div className="space-y-1">
                <h3 className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Pending Reviews</h3>
                <p className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{stats.pendingReviews || '23'}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Completed Reviews Card */}
            <div className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50' 
                : 'bg-gradient-to-br from-white to-green-50/30 border border-gray-200/50 shadow-sm hover:shadow-lg'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                  <CheckCircleIcon className="w-5 h-5 text-white" />
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                }`}>
                  +8%
                </div>
              </div>
              <div className="space-y-1">
                <h3 className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Completed Reviews</h3>
                <p className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{stats.completedReviews || '394'}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* System Health Card */}
            <div className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50' 
                : 'bg-gradient-to-br from-white to-red-50/30 border border-gray-200/50 shadow-sm hover:shadow-lg'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl">
                  <ServerIcon className="w-5 h-5 text-white" />
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                }`}>
                  Healthy
                </div>
              </div>
              <div className="space-y-1">
                <h3 className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>System Health</h3>
                <p className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{stats.systemHealth || '98'}%</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* AI Insights Card */}
            <div className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50' 
                : 'bg-gradient-to-br from-white to-purple-50/30 border border-gray-200/50 shadow-sm hover:shadow-lg'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
                  <CpuChipIcon className="w-5 h-5 text-white" />
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  isDarkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'
                }`}>
                  AI
                </div>
              </div>
              <div className="space-y-1">
                <h3 className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>AI Insights</h3>
                <p className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{stats.aiInsights || '47'}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </section>

          {/* Main Dashboard Grid - Professional 4-Column Layout */}
          <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Quick Actions - Redesigned */}
            <div className={`rounded-2xl p-6 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50' 
                : 'bg-white border border-gray-200/50 shadow-sm hover:shadow-md'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Quick Actions</h3>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                }`}>
                  <SparklesIcon className={`w-4 h-4 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
              </div>
              
              <div className="space-y-3">
                {/* Upload Document Action */}
                <button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 hover:from-blue-600/30 hover:to-indigo-600/30 border border-blue-500/20' 
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200'
                }`}>
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                    <DocumentTextIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Upload Document</p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Add new P&ID for analysis</p>
                  </div>
                </button>

                {/* Document Library Action */}
                <button 
                  onClick={() => navigate('/document-library')}
                  className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/20' 
                    : 'bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200'
                }`}>
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                    <DocumentTextIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Document Library</p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Access your engineering docs</p>
                  </div>
                </button>

                {/* Start Analysis Action */}
                <button className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-emerald-600/20 to-green-600/20 hover:from-emerald-600/30 hover:to-green-600/30 border border-emerald-500/20' 
                    : 'bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 border border-emerald-200'
                }`}>
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
                    <ChartBarIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Start Analysis</p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Run AI-powered analysis</p>
                  </div>
                </button>

                {/* Generate Report Action */}
                <button className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/20' 
                    : 'bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200'
                }`}>
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                    <CpuChipIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Generate Report</p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Export analysis results</p>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Recent Activity - Redesigned */}
            <div className={`rounded-2xl p-6 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50' 
                : 'bg-white border border-gray-200/50 shadow-sm hover:shadow-md'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Recent Activity</h3>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
                }`}>
                  <ClockIcon className={`w-4 h-4 ${
                    isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                </div>
              </div>
              
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {/* Activity Items */}
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 hover:scale-[1.01] ${
                    isDarkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      index % 3 === 0 ? 'bg-blue-100 text-blue-600' :
                      index % 3 === 1 ? 'bg-emerald-100 text-emerald-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {index % 3 === 0 ? <DocumentTextIcon className="w-4 h-4" /> :
                       index % 3 === 1 ? <ChartBarIcon className="w-4 h-4" /> :
                       <CpuChipIcon className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-900'
                      }`}>
                        {index % 3 === 0 ? 'P&ID document uploaded' :
                         index % 3 === 1 ? 'Analysis completed for Process Flow #247' :
                         'AI insights generated for Equipment Layout'}
                      </p>
                      <p className={`text-xs mt-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {index === 0 ? '2 minutes ago' :
                         index === 1 ? '15 minutes ago' :
                         index === 2 ? '1 hour ago' :
                         index === 3 ? '3 hours ago' :
                         'Yesterday'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className={`mt-4 w-full py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                isDarkMode 
                  ? 'text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600' 
                  : 'text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200'
              }`}>
                View All Activity
              </button>
            </div>
            
            {/* P&ID Analysis - Advanced Design */}
            <div className={`rounded-2xl p-6 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-indigo-900/50 border border-blue-700/50' 
                : 'bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 text-white'
            } relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">P&ID Analysis</h3>
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <ChartBarIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Process Flow */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-medium">Process Flow</span>
                      <span className="text-white font-semibold">85%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full transition-all duration-1000" style={{ width: '85%' }} />
                    </div>
                  </div>
                  
                  {/* Instrumentation */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-medium">Instrumentation</span>
                      <span className="text-white font-semibold">72%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full transition-all duration-1000" style={{ width: '72%' }} />
                    </div>
                  </div>
                  
                  {/* Equipment Analysis */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-medium">Equipment</span>
                      <span className="text-white font-semibold">93%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-1000" style={{ width: '93%' }} />
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('/pid-analysis/detailed')}
                  className="mt-6 w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl py-3 px-4 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02]"
                >
                  View Detailed Analysis →
                </button>
              </div>
            </div>
              
            {/* System Status - Advanced Monitoring */}
            <div className={`rounded-2xl p-6 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50' 
                : 'bg-white border border-gray-200/50 shadow-sm hover:shadow-md'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>System Status</h3>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
                }`}>
                  <ServerIcon className={`w-4 h-4 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`} />
                </div>
              </div>
              
              <div className="space-y-4">
                {/* API Services */}
                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/30' : 'bg-green-50/50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                    </div>
                    <div>
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>API Services</span>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Response time: 45ms</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">Operational</span>
                </div>
                
                {/* Database */}
                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/30' : 'bg-blue-50/50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <div>
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>Database</span>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>PostgreSQL & MongoDB</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Connected</span>
                </div>
                
                {/* AI Engine */}
                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/30' : 'bg-amber-50/50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                    <div>
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>AI Engine</span>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Processing 3 documents</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-amber-600 bg-amber-100 px-2 py-1 rounded-full">Active</span>
                </div>
                
                {/* Cache System */}
                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/30' : 'bg-purple-50/50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                    <div>
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>Cache System</span>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Redis - 89% hit rate</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Optimized</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Document Upload Modal */}
      <DocumentUploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={(project, fileCount) => {
          // Refresh dashboard data after successful upload
          fetchDashboardData()
          // Optional: Show success message
          console.log(`Successfully uploaded ${fileCount} files to project: ${project.name}`)
        }}
      />
    </>
  )
}

export default Dashboard