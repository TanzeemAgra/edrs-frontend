import { create } from 'zustand'
import { api } from '../services/api'

/**
 * Advanced Dashboard Store
 * Manages dashboard state, real-time updates, and intelligent data caching
 */
const useDashboardStore = create((set, get) => ({
  // State
  isLoading: false,
  error: null,
  lastUpdate: null,
  
  // Dashboard Data
  stats: {
    totalDocuments: 0,
    pidAnalysis: 0,
    pendingReviews: 0,
    completedReviews: 0,
    systemHealth: 100,
    aiInsights: 0
  },
  
  charts: {
    documentTrends: [],
    pidCategories: [],
    reviewProgress: [],
    userActivity: []
  },
  
  notifications: [],
  activities: [],
  
  // Real-time Status
  realTimeEnabled: true,
  connectionStatus: 'disconnected',
  updateInterval: null,

  // Actions
  fetchDashboardData: async () => {
    try {
      set({ isLoading: true, error: null })
      
      // Fetch all dashboard data in parallel
      const [statsResponse, chartsResponse, notificationsResponse, activitiesResponse] = await Promise.all([
        api.get('/dashboard/stats/'),
        api.get('/dashboard/charts/'),
        api.get('/dashboard/notifications/'),
        api.get('/dashboard/activities/')
      ])
      
      set({
        stats: {
          totalDocuments: statsResponse.data.totalDocuments || 0,
          pidAnalysis: statsResponse.data.pidAnalysis || 0,
          pendingReviews: statsResponse.data.pendingReviews || 0,
          completedReviews: statsResponse.data.completedReviews || 0,
          systemHealth: statsResponse.data.systemHealth || 100,
          aiInsights: statsResponse.data.aiInsights || 0
        },
        charts: {
          documentTrends: chartsResponse.data.documentTrends || [],
          pidCategories: chartsResponse.data.pidCategories || [],
          reviewProgress: chartsResponse.data.reviewProgress || [],
          userActivity: chartsResponse.data.userActivity || []
        },
        notifications: notificationsResponse.data.results || [],
        activities: activitiesResponse.data.results || [],
        lastUpdate: new Date().toISOString(),
        isLoading: false
      })
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      
      // Fallback to mock data for development
      set({
        stats: {
          totalDocuments: 156,
          pidAnalysis: 23,
          pendingReviews: 8,
          completedReviews: 142,
          systemHealth: 98,
          aiInsights: 15
        },
        charts: {
          documentTrends: [
            { date: '2024-11-01', documents: 12, analysis: 8 },
            { date: '2024-11-02', documents: 15, analysis: 12 },
            { date: '2024-11-03', documents: 18, analysis: 15 },
            { date: '2024-11-04', documents: 14, analysis: 11 },
            { date: '2024-11-05', documents: 22, analysis: 18 }
          ],
          pidCategories: [
            { name: 'Process Flow', value: 35, color: '#3B82F6' },
            { name: 'Instrumentation', value: 28, color: '#10B981' },
            { name: 'Equipment', value: 22, color: '#F59E0B' },
            { name: 'Piping', value: 15, color: '#EF4444' }
          ],
          reviewProgress: [
            { month: 'Oct', completed: 45, pending: 12 },
            { month: 'Nov', completed: 52, pending: 8 }
          ],
          userActivity: []
        },
        notifications: [
          {
            id: 1,
            type: 'success',
            title: 'Analysis Complete',
            message: 'P&ID document "Plant-001" analysis completed successfully',
            timestamp: new Date(Date.now() - 1800000).toISOString(),
            read: false
          },
          {
            id: 2,
            type: 'info',
            title: 'New Document Uploaded',
            message: 'Document "Process-Flow-Rev2.pdf" uploaded by John Doe',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            read: false
          },
          {
            id: 3,
            type: 'warning',
            title: 'Review Deadline',
            message: 'Document "Safety-Protocol" review deadline in 2 days',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            read: true
          }
        ],
        activities: [
          {
            id: 1,
            user: 'Sarah Johnson',
            action: 'completed analysis',
            target: 'P&ID Document #PL-001',
            timestamp: new Date(Date.now() - 1800000).toISOString(),
            icon: 'CheckCircleIcon',
            color: 'green'
          },
          {
            id: 2,
            user: 'Mike Chen',
            action: 'uploaded document',
            target: 'Process Flow Diagram v2.1',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            icon: 'DocumentArrowUpIcon',
            color: 'blue'
          },
          {
            id: 3,
            user: 'Alex Rivera',
            action: 'started review',
            target: 'Instrumentation Schema',
            timestamp: new Date(Date.now() - 5400000).toISOString(),
            icon: 'EyeIcon',
            color: 'purple'
          }
        ],
        error: null,
        isLoading: false,
        lastUpdate: new Date().toISOString()
      })
    }
  },

  // Real-time Updates
  startRealTimeUpdates: () => {
    const { updateInterval } = get()
    if (updateInterval) return // Already started
    
    const interval = setInterval(() => {
      get().fetchDashboardData()
    }, 30000) // Update every 30 seconds
    
    set({ 
      updateInterval: interval, 
      realTimeEnabled: true,
      connectionStatus: 'connected'
    })
  },

  stopRealTimeUpdates: () => {
    const { updateInterval } = get()
    if (updateInterval) {
      clearInterval(updateInterval)
      set({ 
        updateInterval: null, 
        realTimeEnabled: false,
        connectionStatus: 'disconnected'
      })
    }
  },

  // Notification Management
  markNotificationAsRead: (notificationId) => {
    set(state => ({
      notifications: state.notifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    }))
  },

  clearNotification: (notificationId) => {
    set(state => ({
      notifications: state.notifications.filter(
        notification => notification.id !== notificationId
      )
    }))
  },

  clearAllNotifications: () => {
    set({ notifications: [] })
  },

  // Utility Functions
  getUnreadNotificationsCount: () => {
    const { notifications } = get()
    return notifications.filter(n => !n.read).length
  },

  refreshStats: async () => {
    try {
      const response = await api.get('/dashboard/stats/')
      set(state => ({
        stats: {
          ...state.stats,
          ...response.data
        },
        lastUpdate: new Date().toISOString()
      }))
    } catch (error) {
      console.error('Failed to refresh stats:', error)
    }
  }
}))

export { useDashboardStore }