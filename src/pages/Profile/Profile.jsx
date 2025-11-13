import { Helmet } from 'react-helmet-async'
import { useAuthStore } from '../../stores/authStore'

const Profile = () => {
  const { user } = useAuthStore()

  return (
    <>
      <Helmet>
        <title>Profile - EDRS</title>
      </Helmet>

      <div className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>
        
        <div className="card max-w-2xl">
          <div className="card-body">
            <div className="space-y-4">
              <div>
                <label className="form-label">Full Name</label>
                <p className="text-gray-900">{user?.full_name || 'Not provided'}</p>
              </div>
              
              <div>
                <label className="form-label">Email</label>
                <p className="text-gray-900">{user?.email}</p>
              </div>
              
              <div>
                <label className="form-label">Username</label>
                <p className="text-gray-900">{user?.username}</p>
              </div>
              
              <div>
                <label className="form-label">Member Since</label>
                <p className="text-gray-900">
                  {user?.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile