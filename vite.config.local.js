// EDRS Frontend - Local Development Configuration
// Smart Vite configuration for Docker local environment

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Environment detection
const isLocal = process.env.NODE_ENV === 'development' || process.env.VITE_ENVIRONMENT === 'local'
const isDocked = process.env.DOCKERIZED === 'true'

// API URL configuration with smart fallbacks
const getApiUrl = () => {
  // Check environment variables in order of priority
  if (process.env.VITE_API_URL) {
    return process.env.VITE_API_URL
  }
  
  if (isDocked) {
    // Docker container-to-container communication
    return 'http://backend:8000'
  }
  
  if (isLocal) {
    // Local development
    return 'http://localhost:8001'
  }
  
  // Fallback
  return 'http://localhost:8000'
}

export default defineConfig({
  plugins: [react()],
  
  // Server configuration for local development
  server: {
    host: '0.0.0.0', // Allow external connections (Docker)
    port: 3000,
    strictPort: true,
    
    // Hot Module Replacement
    hmr: {
      port: 3000,
    },
    
    // Proxy API requests to backend (for local development)
    proxy: isLocal && !isDocked ? {
      '/api': {
        target: getApiUrl(),
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('🔥 Proxy error:', err)
          })
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('📤 Proxying:', req.method, req.url, '→', options.target + req.url)
          })
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('📥 Response:', proxyRes.statusCode, req.url)
          })
        }
      },
      '/health': {
        target: getApiUrl(),
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: getApiUrl(),
        changeOrigin: true,
        secure: false,
      }
    } : undefined,
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: isLocal,
    minify: !isLocal,
    
    // Rollup options for better development experience
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      
      // External dependencies handling
      external: isLocal ? [] : undefined,
      
      // Output configuration
      output: {
        manualChunks: !isLocal ? {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          utils: ['axios', 'lodash']
        } : undefined,
      }
    },
    
    // Target for local development
    target: isLocal ? 'esnext' : 'es2015',
  },
  
  // Path resolution
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@types': path.resolve(__dirname, './src/types'),
    }
  },
  
  // Environment variables
  define: {
    __API_URL__: JSON.stringify(getApiUrl()),
    __ENVIRONMENT__: JSON.stringify(process.env.NODE_ENV || 'development'),
    __VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0-local'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  
  // CSS configuration
  css: {
    devSourcemap: isLocal,
    modules: {
      localsConvention: 'camelCaseOnly',
    }
  },
  
  // Optimization for local development
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'lodash'
    ],
    exclude: isLocal ? [] : undefined,
  },
  
  // Preview server (for build testing)
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  
  // Enable/disable features based on environment
  esbuild: {
    drop: isLocal ? [] : ['console', 'debugger'],
  },
  
  // Logging
  logLevel: isLocal ? 'info' : 'warn',
  
  // Clear screen
  clearScreen: false,
})

// Log configuration
console.log('🏗️  EDRS Frontend Configuration:')
console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`)
console.log(`   API URL: ${getApiUrl()}`)
console.log(`   Local Mode: ${isLocal}`)
console.log(`   Docker Mode: ${isDocked}`)
console.log(`   HMR: ${isLocal ? 'Enabled' : 'Disabled'}`)
console.log('   ==========================')