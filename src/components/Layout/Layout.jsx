import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <>
      <Helmet>
        <title>EDRS - Electronic Document Recording System</title>
        <meta name="description" content="EDRS - Modern document management system" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="flex-1">
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </>
  )
}

export default Layout