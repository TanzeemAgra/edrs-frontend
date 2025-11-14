import { Helmet } from 'react-helmet-async'

const CreatePost = () => {
  return (
    <>
      <Helmet>
        <title>Create Post - EDRS</title>
      </Helmet>

      <div className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>
        
        <div className="card max-w-4xl mx-auto">
          <div className="card-body">
            <div className="text-center py-12">
              <p className="text-gray-600">Create post functionality coming soon...</p>
              <p className="text-sm text-gray-500 mt-2">This will include a rich text editor, category selection, and tag management.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePost