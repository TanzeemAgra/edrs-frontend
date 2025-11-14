import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const PostDetail = () => {
  const { slug } = useParams()

  return (
    <>
      <Helmet>
        <title>Post Detail - EDRS</title>
      </Helmet>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="card">
            <div className="card-body">
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Post: {slug}</h1>
                <p className="text-gray-600">Post detail functionality coming soon...</p>
                <p className="text-sm text-gray-500 mt-2">This will display the full post content, comments, and sharing options.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostDetail