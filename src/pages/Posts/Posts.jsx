import { Helmet } from 'react-helmet-async'

const Posts = () => {
  return (
    <>
      <Helmet>
        <title>Posts - EDRS</title>
      </Helmet>

      <div className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Posts</h1>
        
        <div className="text-center py-12">
          <p className="text-gray-600">Posts functionality coming soon...</p>
        </div>
      </div>
    </>
  )
}

export default Posts