import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '../services/api'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isInitialized: false,

      // Initialize auth state from storage
      initialize: () => {
        const token = localStorage.getItem('token')
        if (token) {
          set({ token, isAuthenticated: true })
          // Verify token with backend
          get().verifyToken()
        } else {
          set({ isInitialized: true })
        }
      },

      // Login user
      login: async (credentials) => {
        try {
          // Debug logging
          console.log('🔍 AuthStore Login Debug:')
          console.log('- Credentials:', credentials)
          console.log('- API Base URL:', import.meta.env.VITE_API_URL || 'http://localhost:8001/api')
          
          const response = await api.post('/auth/login/', credentials)
          
          console.log('✅ Login Response:', response.data)
          
          const { user, token } = response.data
          
          set({ 
            user, 
            token, 
            isAuthenticated: true,
            isInitialized: true 
          })
          
          localStorage.setItem('token', token)
          return { success: true, user }
        } catch (error) {
          console.error('❌ Login error:', error)
          console.error('❌ Error response:', error.response)
          
          return { 
            success: false, 
            error: error.response?.data?.message || 'Login failed' 
          }
        }
      },

      // Register user
      register: async (userData) => {
        try {
          const response = await api.post('/auth/register/', userData)
          const { user, token } = response.data
          
          set({ 
            user, 
            token, 
            isAuthenticated: true,
            isInitialized: true 
          })
          
          localStorage.setItem('token', token)
          return { success: true, user }
        } catch (error) {
          return { 
            success: false, 
            error: error.response?.data || 'Registration failed' 
          }
        }
      },

      // Logout user
      logout: async () => {
        try {
          await api.post('/auth/logout/')
        } catch (error) {
          console.error('Logout error:', error)
        } finally {
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false 
          })
          localStorage.removeItem('token')
        }
      },

      // Verify token
      verifyToken: async () => {
        try {
          const response = await api.get('/auth/user/')
          const user = response.data
          
          set({ 
            user, 
            isAuthenticated: true,
            isInitialized: true 
          })
          
          return true
        } catch (error) {
          console.error('Token verification failed:', error)
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false,
            isInitialized: true 
          })
          localStorage.removeItem('token')
          return false
        }
      },

      // Update user profile
      updateProfile: async (userData) => {
        try {
          const response = await api.put('/users/profile/update/', userData)
          const user = response.data
          
          set({ user })
          return { success: true, user }
        } catch (error) {
          return { 
            success: false, 
            error: error.response?.data || 'Update failed' 
          }
        }
      },

      // Change password
      changePassword: async (passwordData) => {
        try {
          const response = await api.post('/auth/change-password/', passwordData)
          const { token } = response.data
          
          set({ token })
          localStorage.setItem('token', token)
          
          return { success: true }
        } catch (error) {
          return { 
            success: false, 
            error: error.response?.data || 'Password change failed' 
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Initialize auth on app start
useAuthStore.getState().initialize()

export { useAuthStore }