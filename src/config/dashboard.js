/**
 * EDRS Advanced Dashboard Configuration
 * Intelligent soft-coded dashboard system for Electronic Document Review System
 */

export const DASHBOARD_CONFIG = {
  // Theme Configuration
  theme: {
    primary: {
      gradient: 'from-blue-600 via-blue-700 to-indigo-800',
      solid: 'bg-blue-600',
      light: 'bg-blue-50',
      text: 'text-blue-600'
    },
    secondary: {
      gradient: 'from-emerald-500 to-teal-600',
      solid: 'bg-emerald-500',
      light: 'bg-emerald-50',
      text: 'text-emerald-600'
    },
    accent: {
      gradient: 'from-purple-500 to-pink-600',
      solid: 'bg-purple-500',
      light: 'bg-purple-50',
      text: 'text-purple-600'
    },
    warning: {
      gradient: 'from-amber-500 to-orange-600',
      solid: 'bg-amber-500',
      light: 'bg-amber-50',
      text: 'text-amber-600'
    }
  },

  // Layout Configuration
  layout: {
    sidebar: {
      width: 'w-64',
      collapsedWidth: 'w-16',
      background: 'bg-gray-900',
      textColor: 'text-white'
    },
    header: {
      height: 'h-16',
      background: 'bg-white',
      shadow: 'shadow-sm'
    },
    content: {
      padding: 'p-6',
      background: 'bg-gray-50'
    }
  },

  // Widget Configuration
  widgets: {
    stats: {
      totalDocuments: {
        title: 'Total Documents',
        icon: 'DocumentTextIcon',
        color: 'blue',
        endpoint: '/api/dashboard/stats/documents/total'
      },
      pidAnalysis: {
        title: 'P&ID Analysis',
        icon: 'ChartBarIcon',
        color: 'emerald',
        endpoint: '/api/dashboard/stats/pid/analysis'
      },
      pendingReviews: {
        title: 'Pending Reviews',
        icon: 'ClockIcon',
        color: 'amber',
        endpoint: '/api/dashboard/stats/reviews/pending'
      },
      completedReviews: {
        title: 'Completed Reviews',
        icon: 'CheckCircleIcon',
        color: 'green',
        endpoint: '/api/dashboard/stats/reviews/completed'
      },
      systemHealth: {
        title: 'System Health',
        icon: 'HeartIcon',
        color: 'red',
        endpoint: '/api/dashboard/stats/system/health'
      },
      aiInsights: {
        title: 'AI Insights',
        icon: 'CpuChipIcon',
        color: 'purple',
        endpoint: '/api/dashboard/stats/ai/insights'
      }
    },
    charts: {
      documentTrends: {
        title: 'Document Analysis Trends',
        type: 'line',
        endpoint: '/api/dashboard/charts/document-trends',
        timeRange: '30d'
      },
      pidCategories: {
        title: 'P&ID Categories Distribution',
        type: 'pie',
        endpoint: '/api/dashboard/charts/pid-categories'
      },
      reviewProgress: {
        title: 'Review Progress',
        type: 'bar',
        endpoint: '/api/dashboard/charts/review-progress'
      },
      userActivity: {
        title: 'User Activity Heatmap',
        type: 'heatmap',
        endpoint: '/api/dashboard/charts/user-activity'
      }
    }
  },

  // Quick Actions Configuration
  quickActions: {
    primary: [
      {
        title: 'Upload P&ID Document',
        icon: 'CloudArrowUpIcon',
        color: 'blue',
        action: 'upload-pid',
        route: '/upload/pid'
      },
      {
        title: 'Start AI Analysis',
        icon: 'CpuChipIcon',
        color: 'purple',
        action: 'start-analysis',
        route: '/analysis/new'
      },
      {
        title: 'Create Review Task',
        icon: 'DocumentPlusIcon',
        color: 'emerald',
        action: 'create-review',
        route: '/reviews/new'
      }
    ],
    secondary: [
      {
        title: 'View Reports',
        icon: 'ChartPieIcon',
        color: 'indigo',
        action: 'view-reports',
        route: '/reports'
      },
      {
        title: 'Manage Users',
        icon: 'UsersIcon',
        color: 'gray',
        action: 'manage-users',
        route: '/admin/users'
      },
      {
        title: 'System Settings',
        icon: 'CogIcon',
        color: 'gray',
        action: 'settings',
        route: '/settings'
      }
    ]
  },

  // Notification Configuration
  notifications: {
    types: {
      info: {
        icon: 'InformationCircleIcon',
        color: 'blue'
      },
      success: {
        icon: 'CheckCircleIcon',
        color: 'green'
      },
      warning: {
        icon: 'ExclamationTriangleIcon',
        color: 'amber'
      },
      error: {
        icon: 'XCircleIcon',
        color: 'red'
      }
    },
    maxItems: 5,
    autoHide: true,
    hideDelay: 5000
  },

  // Real-time Updates Configuration
  realTime: {
    enabled: true,
    updateInterval: 30000, // 30 seconds
    endpoints: [
      '/api/dashboard/realtime/stats',
      '/api/dashboard/realtime/notifications',
      '/api/dashboard/realtime/system-status'
    ]
  },

  // Responsive Breakpoints
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px'
  },

  // Animation Configuration
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  }
}

// Dashboard Utility Functions
export const getDashboardTheme = (type = 'primary') => {
  return DASHBOARD_CONFIG.theme[type] || DASHBOARD_CONFIG.theme.primary
}

export const getWidgetConfig = (widgetId) => {
  return DASHBOARD_CONFIG.widgets.stats[widgetId] || 
         DASHBOARD_CONFIG.widgets.charts[widgetId]
}

export const getQuickAction = (actionId) => {
  const primary = DASHBOARD_CONFIG.quickActions.primary.find(a => a.action === actionId)
  const secondary = DASHBOARD_CONFIG.quickActions.secondary.find(a => a.action === actionId)
  return primary || secondary
}

export default DASHBOARD_CONFIG