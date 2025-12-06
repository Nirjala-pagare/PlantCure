# MongoDB Integration Setup Guide

## Overview
This Plant Disease Detection website now supports MongoDB for dynamic disease storage while maintaining backward compatibility with static data.

## Prerequisites
- Node.js installed
- MongoDB installed and running locally
- All npm dependencies installed (`npm install`)

## Setup Instructions

### 1. Start MongoDB
Make sure MongoDB is running on your local machine:
```bash
# Windows (if MongoDB is installed as a service, it should start automatically)
# Or start manually:
mongod --dbpath "C:\data\db"

# Linux/Mac
sudo systemctl start mongod
# or
mongod
```

### 2. Seed the Database
Run the seeder script to populate the database with 54+ diseases:
```bash
npm run seed
```

This will:
- Connect to MongoDB at `mongodb://localhost:27017/plantcure`
- Clear existing diseases (optional - can be disabled in seeder)
- Insert all diseases from `backend/data/diseases.json`

### 3. Start the Backend Server
```bash
npm run server
```

The server will run on `http://localhost:5000`

### 4. Start the Frontend
In a separate terminal:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or similar Vite port)

## API Endpoints

### Get All Diseases
```
GET http://localhost:5000/api/disease/all
```

### Get Disease by ID
```
GET http://localhost:5000/api/disease/:id
```

### Search Diseases
```
GET http://localhost:5000/api/disease/search?q=tomato
```

### Add New Disease
```
POST http://localhost:5000/api/disease/add
Content-Type: multipart/form-data

Fields:
- plantName: String
- diseaseName: String
- symptoms: String
- prevention: String
- treatment: String
- image: File (optional)
```

## Database Schema

The Disease model has the following structure:
```javascript
{
  plantName: String (required),
  diseaseName: String (required),
  symptoms: String (required),
  prevention: String (required),
  treatment: String (required),
  image: String (optional, filename),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## How It Works

### Hybrid Data Source
The frontend automatically:
1. Tries to fetch diseases from MongoDB API
2. Falls back to static data if MongoDB is unavailable
3. Displays diseases from whichever source is available

### Image Handling
- Images uploaded via the API are stored in `backend/uploads/diseases/`
- Images are served at `http://localhost:5000/uploads/diseases/<filename>`
- Static diseases use imported image assets

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod` or check service status
- Verify connection string in `backend/config/db.js`
- Check MongoDB logs for errors

### No Diseases Showing
- Run the seeder: `npm run seed`
- Check MongoDB: `mongo plantcure` then `db.diseases.find().count()`
- Verify backend is running on port 5000

### Images Not Loading
- Ensure `backend/uploads/diseases/` folder exists
- Check that backend serves static files: `app.use('/uploads', express.static('uploads'))`
- Verify image URLs in API responses

## Adding More Diseases

### Via Seeder
1. Add disease objects to `backend/data/diseases.json`
2. Run `npm run seed` (this will clear and re-seed)

### Via API
Use the POST endpoint with form data including an image file.

### Via MongoDB Shell
```javascript
use plantcure
db.diseases.insertOne({
  plantName: "Tomato",
  diseaseName: "New Disease",
  symptoms: "Description of symptoms",
  prevention: "Prevention methods",
  treatment: "Treatment methods",
  image: "filename.jpg"
})
```

## Notes
- The system maintains backward compatibility with static disease data
- All existing frontend pages continue to work
- MongoDB diseases are displayed alongside static diseases when both are available
- The Disease Library page automatically switches between MongoDB and static data

