# 🚀 Vercel Deployment - Quick Fix Guide

## ✅ **Issue Fixed**

The error was caused by referencing non-existent Vercel secrets. I've simplified the `vercel.json` to use the standard approach.

## 📋 **Step-by-Step Deployment**

### **1. Vercel Dashboard Deployment (Recommended)**

1. **Go to Vercel Dashboard**: [https://vercel.com/dashboard](https://vercel.com/dashboard)

2. **Import Project**:
   - Click **"New Project"**
   - Select **"Import Git Repository"**
   - Choose your `edrs-frontend` repository
   - Click **"Import"**

3. **Configure Project**:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

4. **Set Environment Variables**:
   Click **"Environment Variables"** and add:
   
   ```bash
   # Railway backend URL
   VITE_API_URL = https://edrs-backend-production.up.railway.app
   
   # Optional app configuration
   VITE_APP_NAME = EDRS
   VITE_APP_VERSION = 1.0.0
   VITE_ENABLE_DEBUG = false
   ```

5. **Deploy**:
   - Click **"Deploy"**
   - Wait for build to complete (~2-3 minutes)
   - Get your Vercel URL

### **2. Get Your Railway Backend URL**

If you don't have your Railway URL:

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Select your backend service
3. Go to **"Settings"** tab
2. Copy the **"Public Domain"** (e.g., `https://edrs-backend-production.up.railway.app`)
5. Use this URL in `VITE_API_URL` (without `/api` suffix)

### **3. Update Railway CORS Settings**

Add your Vercel domain to Railway backend:

1. **Railway Dashboard** → **Your Backend Service** → **Variables**
2. **Update/Add**:
   ```bash
   CORS_ALLOWED_ORIGINS=https://your-app.vercel.app,https://your-app-git-main.vercel.app
   ```
3. **Redeploy** Railway service if needed

## 🧪 **Testing Your Deployment**

### **Verify Frontend**
- Visit: `https://your-app.vercel.app`
- Should load React app successfully

### **Test API Connection**
- Open browser console on your Vercel app
- Check for API connection errors
- Try login/register functionality

### **Common URLs**
```bash
# Frontend (Vercel)
https://your-app.vercel.app

# Backend API (Railway)  
https://edrs-backend-production.up.railway.app/api/

# Backend Health Check
https://edrs-backend-production.up.railway.app/health/

# API Documentation
https://edrs-backend-production.up.railway.app/api/docs/
```

## 🔧 **Alternative: Vercel CLI**

If you prefer command line:

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend directory
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## ❌ **Troubleshooting**

### **Environment Variable Issues**
- Ensure `VITE_API_URL` has no `/api` suffix
- Check capitalization (must be exactly `VITE_API_URL`)
- Verify Railway URL is accessible

### **CORS Errors**
- Add Vercel domain to Railway `CORS_ALLOWED_ORIGINS`
- Include both main domain and git branch domains

### **Build Errors**
- Check Node.js version (use 18.x)
- Clear Vercel build cache in dashboard
- Verify `package.json` scripts

### **API Connection Fails**
# Test Railway backend health: `curl https://edrs-backend-production.up.railway.app/health/`
- Check if Railway service is sleeping (first request may take 30s)

## 🎉 **Expected Result**

After successful deployment:
- ✅ Frontend loads on Vercel URL
- ✅ API calls reach Railway backend  
- ✅ Login/authentication works
- ✅ Database operations function

The simplified `vercel.json` should now deploy without errors! 🚀