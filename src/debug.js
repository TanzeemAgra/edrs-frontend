// Debug environment variables
console.log('Environment Variables Debug:')
console.log('- VITE_API_URL:', import.meta.env.VITE_API_URL)
console.log('- VITE_DEV_API_URL:', import.meta.env.VITE_DEV_API_URL)
console.log('- VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL)
console.log('- MODE:', import.meta.env.MODE)
console.log('- All env:', import.meta.env)

// Test API import
import { api } from './services/api.js'
console.log('API instance:', api)
console.log('API defaults:', api.defaults)
console.log('API base URL:', api.defaults.baseURL)

export {}