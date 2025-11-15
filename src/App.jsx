import { Routes, Route } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import Layout from './components/Layout/Layout'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Posts from './pages/Posts/Posts'
import PostDetail from './pages/Posts/PostDetail'
import CreatePost from './pages/Posts/CreatePost'
import Profile from './pages/Profile/Profile'
import PIDAnalysisRoutes from './pages/PIDAnalysisRoutes'
import DocumentLibrary from './components/DocumentLibrary/DocumentLibrary'
import PrivacyPolicy from './pages/Legal/PrivacyPolicy'
import TermsOfService from './pages/Legal/TermsOfService'
import LegalIndex from './pages/Legal/LegalIndex'
import ContactUs from './pages/ContactUs'
import NotFound from './pages/NotFound'

function App() {
  const { isInitialized } = useAuthStore()

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="loading-spinner h-8 w-8"></div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="legal" element={<LegalIndex />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-of-service" element={<TermsOfService />} />
        <Route path="contact-us" element={<ContactUs />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="document-library" element={<DocumentLibrary />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:slug" element={<PostDetail />} />
          <Route path="posts/create" element={<CreatePost />} />
          <Route path="profile" element={<Profile />} />
          <Route path="pid-analysis/*" element={<PIDAnalysisRoutes />} />
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App