# Vercel Frontend Deployment

This frontend is configured for deployment on Vercel.

## Environment Variables

Set the following environment variables in your Vercel project:

### Required Variables
```
VITE_API_URL=https://your-railway-backend.railway.app/api
```

### Optional Variables
```
VITE_APP_NAME=EDRS
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
VITE_GOOGLE_ANALYTICS_ID=your-ga-id
```

## Deployment Steps

1. **Connect to Vercel:**
   - Push your code to GitHub
   - Connect your GitHub repository to Vercel
   - Or use Vercel CLI:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Configure Build Settings:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`

3. **Set Environment Variables:**
   In Vercel dashboard:
   - Go to Project Settings > Environment Variables
   - Add `VITE_API_URL` with your Railway backend URL
   - Add other environment variables as needed

4. **Deploy:**
   - Push to main branch for automatic deployment
   - Or use: `vercel --prod`

## Custom Domain

Configure your custom domain in Vercel dashboard under Settings > Domains.

## Build Optimization

The project is configured with:
- Vite for fast builds and HMR
- Code splitting for optimal bundle sizes
- Tree shaking to remove unused code
- Asset optimization and compression

## Environment-specific Builds

- **Development**: Uses local API (`http://localhost:8000/api`)
- **Production**: Uses Railway backend URL

## Performance Features

- Route-based code splitting
- Lazy loading of components
- Optimized asset loading
- Service worker for caching (optional)

## Monitoring

Consider adding:
- Google Analytics for user tracking
- Sentry for error monitoring
- Vercel Analytics for performance insights