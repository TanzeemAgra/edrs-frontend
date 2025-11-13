# EDRS Frontend

React frontend application for the Electronic Document Recording System.

## 🏗️ Architecture

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Headless UI
- **State Management**: Zustand
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Deployment**: Vercel

## 🚀 Quick Start

### Local Development
```bash
# Clone this repository
git clone <frontend-repo-url>
cd edrs-frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your backend API URL

# Start development server
npm run dev
```

### 🐳 Docker Development  
```bash
# Build and run with Docker
docker build -t edrs-frontend .
docker run -p 3000:3000 edrs-frontend
```

## ⚙️ Environment Configuration

### Environment Variables
```bash
# API Configuration
VITE_API_URL=http://localhost:8000/api

# App Information  
VITE_APP_NAME=EDRS
VITE_APP_VERSION=1.0.0

# Feature Flags (Optional)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_NOTIFICATIONS=true

# External Services (Optional)
VITE_GOOGLE_ANALYTICS_ID=
VITE_SENTRY_DSN=
```

### Development vs Production
```bash
# Development (.env.local)
VITE_API_URL=http://localhost:8000/api

# Production (Vercel Environment Variables)  
VITE_API_URL=https://your-backend.railway.app/api
```

## 🎨 UI Components

### Layout Components
- **Navbar**: Responsive navigation with user menu
- **Footer**: Site footer with links
- **Layout**: Main layout wrapper with routing

### Page Components  
- **Home**: Landing page with feature showcase
- **Dashboard**: User dashboard with stats and quick actions
- **Auth Pages**: Login, register, profile management
- **Posts**: Content management interfaces

### Reusable Components
- **Forms**: Validation-ready form components
- **Buttons**: Styled button variants
- **Cards**: Content card layouts
- **Loading**: Loading states and spinners

## 🌐 Vercel Deployment

### Automatic Deployment
1. **Connect Repository**: Link this repository to Vercel
2. **Configure Build**: Framework preset automatically detected (Vite)
3. **Environment Variables**: Set production environment variables
4. **Deploy**: Push to main branch for automatic deployment

### Vercel Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### Build Settings in Vercel Dashboard
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm ci`
- **Node.js Version**: 18.x

### Environment Variables for Vercel
```bash
VITE_API_URL=https://your-backend.railway.app/api
VITE_APP_NAME=EDRS
VITE_APP_VERSION=1.0.0
```

## 🔗 API Integration

### HTTP Client Setup
```javascript
// Axios instance with interceptors
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor for auth tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});
```

### Service Layer
- **authService**: Login, register, logout, profile management
- **userService**: User CRUD operations
- **postService**: Content management
- **dashboardService**: Analytics and stats

## 🎯 Features

### Authentication
- ✅ JWT token-based authentication
- ✅ Login/Register forms with validation
- ✅ Protected route system
- ✅ Automatic token refresh
- ✅ User profile management

### User Interface
- ✅ Responsive design (mobile-first)
- ✅ Dark/light mode support (ready)
- ✅ Loading states and error handling
- ✅ Toast notifications
- ✅ Form validation with React Hook Form

### Navigation & Routing
- ✅ React Router v6 with lazy loading
- ✅ Protected routes for authenticated users
- ✅ Breadcrumb navigation (ready)
- ✅ 404 error page

## 🛠️ Development

### Available Scripts
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier

# Testing (when configured)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

### Code Quality Tools
- **ESLint**: JavaScript/React linting
- **Prettier**: Code formatting
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript Ready**: Type definitions included

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Auth/           # Authentication components
│   │   └── Layout/         # Layout components  
│   ├── pages/              # Page components
│   │   ├── Auth/           # Login, register pages
│   │   ├── Dashboard/      # Dashboard page
│   │   └── Posts/          # Content pages
│   ├── stores/             # Zustand state stores
│   ├── services/           # API service layer
│   └── styles/            # CSS and styling
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
├── vercel.json           # Vercel deployment config
└── .env.example          # Environment template
```

## 🎨 Styling System

### Tailwind CSS Classes
```css
/* Button variants */
.btn-primary    /* Primary button style */
.btn-secondary  /* Secondary button style */  
.btn-outline    /* Outline button style */

/* Form components */
.form-input     /* Styled input fields */
.form-label     /* Form labels */
.form-error     /* Error message styling */

/* Layout components */
.container      /* Responsive container */
.card           /* Card component */
```

### Responsive Design
- **Mobile First**: Tailwind's mobile-first approach
- **Breakpoints**: sm, md, lg, xl, 2xl
- **Grid System**: CSS Grid and Flexbox utilities

## 🔍 Performance Optimization

- ✅ **Code Splitting**: Route-based lazy loading
- ✅ **Tree Shaking**: Unused code elimination
- ✅ **Asset Optimization**: Image and font optimization
- ✅ **Bundle Analysis**: Vite bundle analyzer
- ✅ **Caching**: Browser caching strategies

## 🛡️ Security Features

- ✅ **XSS Protection**: React's built-in protection
- ✅ **CSRF Protection**: Token-based requests
- ✅ **Secure Storage**: Proper token storage
- ✅ **Input Validation**: Client-side validation
- ✅ **Route Protection**: Authentication guards

## 🔧 Production Checklist

- [ ] Set production `VITE_API_URL`
- [ ] Configure error monitoring (Sentry)
- [ ] Set up analytics (Google Analytics)
- [ ] Optimize images and assets
- [ ] Test responsive design
- [ ] Verify API integration
- [ ] Check performance metrics
- [ ] Test authentication flow

## 🔍 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check `VITE_API_URL` environment variable
   - Verify backend server is running
   - Check CORS configuration on backend

2. **Build Failures**
   - Check Node.js version (18.x recommended)  
   - Clear `node_modules` and reinstall
   - Verify all environment variables

3. **Authentication Issues**
   - Check token storage and retrieval
   - Verify API endpoints are correct
   - Check network requests in browser dev tools

4. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS
   - Verify responsive breakpoints

## 📞 Support

- 🐛 **Issues**: Create GitHub issue in this repository
- ⚡ **Vercel Logs**: Check deployment logs in Vercel dashboard
- 🎨 **Styling**: Tailwind CSS documentation
- 📧 **Email**: frontend-support@edrs.com

---

**Ready for production deployment on Vercel! ⚡**