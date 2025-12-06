# How to Connect MongoDB and Show Results in Library

## Step-by-Step Guide

### Step 1: Install MongoDB (if not already installed)

**Windows:**
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install MongoDB as a Windows Service (recommended)

**OR use MongoDB via Command Line:**
```bash
# If MongoDB is installed, verify it's in your PATH
mongod --version
```

### Step 2: Start MongoDB

**Option A: If MongoDB is installed as a Windows Service**
- MongoDB should start automatically when Windows starts
- Check if it's running: Open Services (services.msc) and look for "MongoDB"

**Option B: Start MongoDB manually**
```bash
# Create data directory (if it doesn't exist)
mkdir C:\data\db

# Start MongoDB
mongod --dbpath C:\data\db
```

**Option C: Using MongoDB Compass (GUI)**
- Download MongoDB Compass from: https://www.mongodb.com/products/compass
- It will help you manage MongoDB visually

### Step 3: Verify MongoDB is Running

Open a new terminal and test the connection:
```bash
# Test MongoDB connection
mongo --eval "db.version()"
```

OR if using MongoDB 6.0+:
```bash
mongosh --eval "db.version()"
```

You should see the MongoDB version number.

### Step 4: Seed the Database (Add Diseases)

In your project directory, run:
```bash
npm run seed
```

This will:
- Connect to MongoDB at `mongodb://localhost:27017/plantcure`
- Insert 54+ diseases from `backend/data/diseases.json`
- Show a summary of inserted diseases

**Expected Output:**
```
MongoDB Connected for seeding...
Cleared existing diseases...
Loaded 54 diseases from JSON file...
Successfully seeded 54 diseases into database!

Disease Summary by Plant:
  Tomato: 7 diseases
  Wheat: 5 diseases
  ...
```

### Step 5: Start the Backend Server

Open a terminal in your project directory:
```bash
npm run server
```

**Expected Output:**
```
MongoDB Connected: localhost:27017
Server is running on port 5000
API endpoint: http://localhost:5000/api
```

**If you see connection errors:**
- Make sure MongoDB is running (Step 2)
- Check the connection string in `backend/config/db.js`
- Verify MongoDB is on port 27017 (default)

### Step 6: Start the Frontend

Open a **NEW** terminal (keep the backend running):
```bash
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 7: Verify Everything Works

1. **Test Backend API:**
   - Open browser: http://localhost:5000/api/health
   - Should see: `{"success":true,"message":"Server is running"}`
   
2. **Test Diseases API:**
   - Open: http://localhost:5000/api/disease/all
   - Should see JSON with all diseases

3. **Open Frontend:**
   - Go to: http://localhost:5173 (or the port shown)
   - Navigate to "Disease Library" page
   - You should see all diseases from MongoDB!

### Step 8: Troubleshooting

**Problem: "MongoDB connection failed"**
```bash
# Solution 1: Check if MongoDB is running
# Windows: Check Services (services.msc) for "MongoDB"
# Or start manually: mongod --dbpath C:\data\db

# Solution 2: Verify MongoDB port
netstat -an | findstr 27017
```

**Problem: "No diseases showing in library"**
```bash
# Check if database has data
mongo plantcure --eval "db.diseases.count()"
# Should return a number > 0

# If 0, run seeder again:
npm run seed
```

**Problem: "Backend server won't start"**
- Check if port 5000 is already in use
- Change PORT in `backend/server.js` if needed
- Make sure all dependencies are installed: `npm install`

**Problem: "Frontend shows static data instead of MongoDB"**
- Check browser console for API errors
- Verify backend is running on port 5000
- Check Network tab in browser DevTools for API calls

### Quick Verification Commands

```bash
# Check MongoDB is running
mongosh --eval "db.version()"

# Check database exists
mongosh plantcure --eval "db.getName()"

# Count diseases in database
mongosh plantcure --eval "db.diseases.countDocuments()"

# View all diseases
mongosh plantcure --eval "db.diseases.find().limit(5).pretty()"
```

## Summary

1. ✅ Start MongoDB: `mongod` or ensure service is running
2. ✅ Seed database: `npm run seed`
3. ✅ Start backend: `npm run server` (Terminal 1)
4. ✅ Start frontend: `npm run dev` (Terminal 2)
5. ✅ Open browser: http://localhost:5173
6. ✅ Go to Disease Library page
7. ✅ See all MongoDB diseases!

## Current Setup

- **MongoDB Connection:** `mongodb://localhost:27017/plantcure`
- **Backend Port:** 5000
- **Frontend Port:** 5173 (Vite default)
- **Database Name:** `plantcure`
- **Collection Name:** `diseases`

The frontend will automatically fetch from MongoDB when available, and fall back to static data if MongoDB is unavailable.

