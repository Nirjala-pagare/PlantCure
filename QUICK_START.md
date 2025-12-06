# Quick Start Guide: Upload Images to MongoDB

This is a simplified guide to quickly upload your images to MongoDB and prepare for deployment.

## Prerequisites
- Node.js installed
- MongoDB Atlas account (free) OR local MongoDB running

---

## Step 1: Set Up MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a free cluster (M0 - takes 3-5 minutes)
4. Create a database user:
   - Go to "Database Access" → "Add New Database User"
   - Username: `yourusername`
   - Password: `yourpassword` (save this!)
   - Privileges: "Atlas admin"
5. Configure Network Access:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
6. Get your connection string:
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials
   - Add database name: `/plantcure?retryWrites=true&w=majority`

**Example connection string:**
```
mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/plantcure?retryWrites=true&w=majority
```

---

## Step 2: Configure Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/plantcure?retryWrites=true&w=majority
BASE_URL=http://localhost:5000
PORT=5000
```

**⚠️ Replace the connection string with your actual MongoDB Atlas connection string!**

---

## Step 3: Install Dependencies

```bash
npm install
```

---

## Step 4: Seed the Database

This will add all disease data to MongoDB:

```bash
npm run seed
```

Expected output:
```
MongoDB Connected for seeding...
Cleared existing diseases...
Loaded 54 diseases from JSON file...
Successfully seeded 54 diseases into database!
```

---

## Step 5: Upload Images to MongoDB

This will read all images from `src/assets/Diseases/` and upload them to MongoDB:

```bash
npm run upload-images
```

Expected output:
```
✅ MongoDB Connected for image upload...
📸 Found 58 image files
📋 Found 54 diseases in database
✅ Matched: Early_Blight_Tomato.jpg → Tomato - Early Blight
✅ Matched: Late_Blight_potato.jpeg → Potato - Late Blight
...
📊 Upload Summary:
   ✅ Matched and updated: 54
   ⚠️  Not matched: 4
   📸 Total images processed: 58

✅ Image upload completed!
```

---

## Step 6: Test Locally

Start the backend server:
```bash
npm run server
```

In another terminal, start the frontend:
```bash
npm run dev
```

Open your browser to `http://localhost:5173` and check the Disease Library page to see your images!

---

## Step 7: Deploy to Free Hosting

### Backend Deployment (Render)

1. Go to [Render](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** `plant-disease-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm run server`
   - **Environment Variables:**
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     BASE_URL=https://your-backend-name.onrender.com
     PORT=5000
     NODE_ENV=production
     ```
5. Click "Create Web Service"
6. Wait for deployment (5-10 minutes)
7. Copy your backend URL (e.g., `https://plant-disease-backend.onrender.com`)

### Frontend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variables:**
     ```
     VITE_API_URL=https://your-backend-name.onrender.com
     ```
5. Click "Deploy"
6. Your app will be live in 2-3 minutes!

---

## Troubleshooting

### Images Not Uploading
- Check if images exist in `src/assets/Diseases/`
- Verify MongoDB connection string is correct
- Check if database is seeded first (`npm run seed`)

### Connection Errors
- Verify MongoDB Atlas network access allows your IP
- Check if username/password in connection string are correct
- Ensure database name is included in connection string

### Deployment Issues
- Make sure all environment variables are set
- Check deployment logs for specific errors
- Verify Node.js version (should be 16+)

---

## What's Next?

- ✅ Images are now stored in MongoDB as base64
- ✅ Your app is ready for deployment
- ✅ All images will be served from MongoDB

For detailed deployment instructions, see `DEPLOYMENT_GUIDE.md`

---

**Need Help?** Check the deployment logs or MongoDB Atlas dashboard for connection issues.

