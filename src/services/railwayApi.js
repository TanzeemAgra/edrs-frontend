/**
 * API Configuration for Railway Backend Integration
 * Optimized for Vercel deployment with environment-specific settings
 */

import axios from 'axios'

// Environment-specific API configuration
const getApiConfig = () => {
  const isDevelopment = import.meta.env.MODE === 'development'
  const isProduction = import.meta.env.PROD

  // API Base URLs
  const API_URLS = {
    development: import.meta.env.VITE_DEV_API_URL || 'http://localhost:8000',
    production: import.meta.env.VITE_API_URL || 'https://edrs-backend-production.up.railway.app'
  }

  const baseURL = isDevelopment ? API_URLS.development : API_URLS.production

  return {
    baseURL: `${baseURL}/api`,
    timeout: isProduction ? 30000 : 10000, // 30s for prod, 10s for dev
    retries: isProduction ? 3 : 1,
  }
}

// Create axios instance with Railway-optimized configuration
const api = axios.create({
  ...getApiConfig(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Railway CORS setup
})

// Request interceptor for authentication and logging
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }

    // Add request ID for tracking
    config.headers['X-Request-ID'] = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Development logging
    if (import.meta.env.MODE === 'development') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    }

    return config
  },
  (error) => {
    console.error('❌ Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling and retry logic
api.interceptors.response.use(
  (response) => {
    // Development logging
    if (import.meta.env.MODE === 'development') {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Handle authentication errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      // Clear invalid token
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Redirect to login (only in browser)
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
      
      return Promise.reject(error)
    }

    // Retry logic for network errors (Railway deployment)
    if (
      !originalRequest._retry &&
      (error.code === 'NETWORK_ERROR' || error.response?.status >= 500) &&
      originalRequest.retries > 0
    ) {
      originalRequest._retry = true
      originalRequest.retries -= 1
      
      // Exponential backoff
      const delay = Math.pow(2, 3 - originalRequest.retries) * 1000
      
      console.log(`🔄 Retrying request in ${delay}ms...`)
      await new Promise(resolve => setTimeout(resolve, delay))
      
      return api.request(originalRequest)
    }

    // Enhanced error logging
    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      requestId: error.config?.headers['X-Request-ID']
    })

    return Promise.reject(error)
  }
)

// API Health Check utility
export const checkApiHealth = async () => {
  try {
    const config = getApiConfig()
    const healthUrl = `${config.baseURL.replace('/api', '')}/health/`
    
    const response = await axios.get(healthUrl, { timeout: 5000 })
    
    return {
      status: 'healthy',
      data: response.data,
      latency: response.headers['x-response-time'] || 'unknown'
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
      code: error.code
    }
  }
}

// Railway-specific connection test
export const testRailwayConnection = async () => {
  try {
    const tests = []
    
    // Test 1: Health endpoint
    const health = await checkApiHealth()
    tests.push({
      name: 'Railway Health Check',
      status: health.status === 'healthy' ? 'PASS' : 'FAIL',
      details: health.status === 'healthy' ? 'Backend is responding' : health.error,
      latency: health.latency
    })

    // Test 2: API schema endpoint
    try {
      const schemaResponse = await api.get('/schema/')
      tests.push({
        name: 'API Schema Access',
        status: schemaResponse.status === 200 ? 'PASS' : 'FAIL',
        details: 'Django REST API schema accessible'
      })
    } catch (error) {
      tests.push({
        name: 'API Schema Access',
        status: 'FAIL',
        details: `Schema endpoint error: ${error.response?.status || error.message}`
      })
    }

    // Test 3: Database connectivity (via API)
    try {
      const dbResponse = await api.get('/core/database/health/')
      tests.push({
        name: 'Database Connection',
        status: dbResponse.status === 200 ? 'PASS' : 'FAIL',
        details: `PostgreSQL: ${dbResponse.data.data?.postgresql_version || 'Connected'}`
      })
    } catch (error) {
      tests.push({
        name: 'Database Connection',
        status: 'FAIL',
        details: `Database test failed: ${error.response?.status || error.message}`
      })
    }

    return {
      overall: tests.every(test => test.status === 'PASS') ? 'HEALTHY' : 'ISSUES_DETECTED',
      tests,
      timestamp: new Date().toISOString(),
      apiUrl: getApiConfig().baseURL
    }
  } catch (error) {
    return {
      overall: 'ERROR',
      error: error.message,
      timestamp: new Date().toISOString(),
      apiUrl: getApiConfig().baseURL
    }
  }
}

export { api }
export default api