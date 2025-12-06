# Complete Deployment Guide: Plant Disease Detection App

This guide will walk you through deploying your Plant Disease Detection application with images stored in MongoDB Atlas on free hosting platforms.

## Table of Contents
1. [Setting Up MongoDB Atlas (Free Tier)](#1-setting-up-mongodb-atlas-free-tier)
2. [Uploading Images to MongoDB](#2-uploading-images-to-mongodb)
3. [Deploying Backend (Render/Railway)](#3-deploying-backend-renderrailway)
4. [Deploying Frontend (Vercel/Netlify)](#4-deploying-frontend-vercelnetlify)
5. [Alternative: Full Stack Deployment](#5-alternative-full-stack-deployment)

---

## 1. Setting Up MongoDB Atlas (Free Tier)

### Step 1.1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Verify your email

### Step 1.2: Create a Cluster
1. After logging in, click **"Build a Database"**
2. Choose **"M0 FREE"** tier (Free forever)
3. Select a cloud provider and region (choose closest to you)
4. Click **"Create"** (takes 3-5 minutes)

### Step 1.3: Create Database User
1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username and password (save these!)
5. Set privileges to **"Atlas admin"** or **"Read and write to any database"**
6. Click **"Add User"**

### Step 1.4: Configure Network Access
1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. For development: Click **"Add Current IP Address"**
4. For production: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **"Confirm"**

### Step 1.5: Get Connection String
1. Go to **"Database"** → Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<username>` and `<password>` with your database user credentials
5. Add database name at the end: `/plantcure?retryWrites=true&w=majority`

**Final connection string format:**
```
mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/plantcure?retryWrites=true&w=majority
```

---

## 2. Uploading Images to MongoDB

### Step 2.1: Install Dependencies
Make sure you have all dependencies installed:
```bash
npm install
```

### Step 2.2: Create .env File
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/plantcure?retryWrites=true&w=majority
BASE_URL=http://localhost:5000
PORT=5000
```

**⚠️ Important:** Replace the connection string with your actual MongoDB Atlas connection string!

### Step 2.3: Seed the Database
First, seed the database with disease data:
```bash
npm run seed
```

### Step 2.4: Upload Images
Run the image upload script:
```bash
npm run upload-images
```

This script will:
- Read all images from `src/assets/Diseases/`
- Convert them to base64 format
- Match them with diseases in the database
- Upload them to MongoDB

**Expected Output:**
```
✅ MongoDB Connected for image upload...
📸 Found 58 image files
📋 Found 54 diseases in database
✅ Matched: Early_Blight_Tomato.jpg → Tomato - Early Blight
...
📊 Upload Summary:
   ✅ Matched and updated: 54
   ⚠️  Not matched: 4
   📸 Total images processed: 58
```

---

## 3. Deploying Backend (Render/Railway)

### Option A: Deploy on Render (Recommended - Free Tier)

#### Step 3.1: Prepare for Deployment
1. Make sure your `backend/server.js` is configured correctly
2. Update `package.json` to include a start script for production:
   ```json
   "scripts": {
     "start": "node backend/server.js"
   }
   ```

#### Step 3.2: Create Render Account
1. Go to [Render](https://render.com)
2. Sign up with GitHub (recommended) or email

#### Step 3.3: Deploy Backend
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository (or use public repo)
3. Configure:
   - **Name:** `plant-disease-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm run server`
   - **Environment Variables:**
     ```
     MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/plantcure?retryWrites=true&w=majority
     BASE_URL=https://your-backend-name.onrender.com
     PORT=5000
     NODE_ENV=production
     ```
4. Click **"Create Web Service"**
5. Wait for deployment (5-10 minutes)

#### Step 3.4: Get Backend URL
After deployment, you'll get a URL like:
```
https://plant-disease-backend.onrender.com
```

### Option B: Deploy on Railway

1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Add environment variables:
   - `MONGODB_URI`
   - `BASE_URL` (will be provided after deployment)
   - `PORT` (Railway sets this automatically)
6. Railway auto-detects Node.js and deploys

---

## 4. Deploying Frontend (Vercel/Netlify)

### Option A: Deploy on Vercel (Recommended)

#### Step 4.1: Update API Configuration
Update `src/services/api.js` to use your deployed backend URL:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend-url.onrender.com';
```

#### Step 4.2: Deploy on Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Click **"New Project"**
4. Import your repository
5. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variables:**
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```
6. Click **"Deploy"**

### Option B: Deploy on Netlify

1. Go to [Netlify](https://netlify.com)
2. Sign up with GitHub
3. Click **"New site from Git"**
4. Select your repository
5. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Environment variables:**
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```
6. Click **"Deploy site"**

---

## 5. Alternative: Full Stack Deployment

### Deploy Everything on Render

1. **Backend:** Follow Step 3 (Render)
2. **Frontend:** 
   - Create a new **"Static Site"** on Render
   - Connect your GitHub repo
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variable: `VITE_API_URL` pointing to your backend

---

## Post-Deployment Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Database is seeded with diseases
- [ ] Images are uploaded to MongoDB
- [ ] Backend is deployed and accessible
- [ ] Frontend is deployed and accessible
- [ ] Frontend can connect to backend API
- [ ] Images are displaying correctly
- [ ] CORS is configured correctly

---

## Troubleshooting

### Images Not Showing
- Check if images are base64 encoded in MongoDB
- Verify `BASE_URL` environment variable is set correctly
- Check browser console for errors

### CORS Errors
- Add your frontend URL to backend CORS configuration
- Update `backend/server.js`:
  ```javascript
  app.use(cors({
    origin: ['https://your-frontend-url.vercel.app', 'http://localhost:5173']
  }));
  ```

### MongoDB Connection Issues
- Verify connection string is correct
- Check network access in MongoDB Atlas
- Ensure database user has correct permissions

### Build Errors
- Check Node.js version (should be 16+)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

---

## Free Tier Limits

### MongoDB Atlas (Free Tier)
- 512 MB storage
- Shared RAM and vCPU
- No credit card required

### Render (Free Tier)
- 750 hours/month
- Spins down after 15 minutes of inactivity
- Free SSL certificate

### Vercel (Free Tier)
- Unlimited deployments
- 100 GB bandwidth/month
- Free SSL certificate

### Netlify (Free Tier)
- 100 GB bandwidth/month
- 300 build minutes/month
- Free SSL certificate

---

## Support

If you encounter issues:
1. Check the deployment logs
2. Verify environment variables
3. Test API endpoints with Postman/curl
4. Check MongoDB Atlas dashboard for connection issues

---

## Quick Commands Reference

```bash
# Local development
npm run seed              # Seed database
npm run upload-images     # Upload images to MongoDB
npm run server            # Start backend
npm run dev               # Start frontend

# Production
npm run build             # Build frontend
npm start                 # Start production server
```

---

**Congratulations!** Your Plant Disease Detection app is now deployed! 🎉

