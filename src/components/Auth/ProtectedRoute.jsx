import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

const ProtectedRoute = () => {
  const { isAuthenticated, isInitialized } = useAuthStore()

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="loading-spinner h-8 w-8"></div>
      </div>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute