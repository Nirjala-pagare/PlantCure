import mongoose from 'mongoose';
import Disease from '../models/disease.model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/plantcure';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected for image upload...');
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Convert image to base64
const imageToBase64 = (imagePath) => {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString('base64');
    const ext = path.extname(imagePath).toLowerCase();
    let mimeType = 'image/jpeg';
    
    if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
    else if (ext === '.gif') mimeType = 'image/gif';
    else if (ext === '.webp') mimeType = 'image/webp';
    
    return `data:${mimeType};base64,${imageBase64}`;
  } catch (error) {
    console.error(`Error reading image ${imagePath}:`, error.message);
    return null;
  }
};

// Normalize disease name for matching
const normalizeDiseaseName = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/\s+/g, '');
};

// Extract disease name from image filename
const extractDiseaseFromFilename = (filename) => {
  // Remove extension
  let name = filename.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
  
  // Common patterns in filenames
  // Format: DiseaseName_Plant or Plant_DiseaseName
  const parts = name.split('_');
  
  if (parts.length >= 2) {
    // Try both orders
    return {
      diseaseName: parts[0],
      plantName: parts.slice(1).join('_'),
      altDiseaseName: parts.slice(0, -1).join('_'),
      altPlantName: parts[parts.length - 1]
    };
  }
  
  return { diseaseName: name, plantName: '' };
};

// Upload images to MongoDB
const uploadImages = async () => {
  try {
    await connectDB();

    // Path to images directory
    const imagesDir = path.join(__dirname, '../../src/assets/Diseases');
    
    if (!fs.existsSync(imagesDir)) {
      console.error(`❌ Images directory not found: ${imagesDir}`);
      process.exit(1);
    }

    // Get all image files
    const imageFiles = fs.readdirSync(imagesDir).filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    console.log(`📸 Found ${imageFiles.length} image files`);

    // Get all diseases from database
    const diseases = await Disease.find({});
    console.log(`📋 Found ${diseases.length} diseases in database`);

    let matchedCount = 0;
    let updatedCount = 0;
    let notFoundCount = 0;

    // Process each image
    for (const imageFile of imageFiles) {
      const imagePath = path.join(imagesDir, imageFile);
      const imageBase64 = imageToBase64(imagePath);

      if (!imageBase64) {
        console.log(`⚠️  Skipping ${imageFile} - could not read image`);
        continue;
      }

      // Extract disease info from filename
      const { diseaseName, plantName, altDiseaseName, altPlantName } = extractDiseaseFromFilename(imageFile);
      
      // Try to find matching disease
      let matchedDisease = null;

      // Strategy 1: Match by disease name and plant name
      if (plantName) {
        matchedDisease = diseases.find(d => {
          const dbDiseaseNorm = normalizeDiseaseName(d.diseaseName);
          const dbPlantNorm = normalizeDiseaseName(d.plantName);
          const fileDiseaseNorm = normalizeDiseaseName(diseaseName);
          const filePlantNorm = normalizeDiseaseName(plantName);
          
          return (dbDiseaseNorm.includes(fileDiseaseNorm) || fileDiseaseNorm.includes(dbDiseaseNorm)) &&
                 (dbPlantNorm.includes(filePlantNorm) || filePlantNorm.includes(dbPlantNorm));
        });
      }

      // Strategy 2: Match by disease name only (if plant name didn't match)
      if (!matchedDisease) {
        matchedDisease = diseases.find(d => {
          const dbDiseaseNorm = normalizeDiseaseName(d.diseaseName);
          const fileDiseaseNorm = normalizeDiseaseName(diseaseName);
          
          return dbDiseaseNorm.includes(fileDiseaseNorm) || fileDiseaseNorm.includes(dbDiseaseNorm);
        });
      }

      // Strategy 3: Try alternative parsing (if filename format is reversed)
      if (!matchedDisease && altDiseaseName && altPlantName) {
        matchedDisease = diseases.find(d => {
          const dbDiseaseNorm = normalizeDiseaseName(d.diseaseName);
          const dbPlantNorm = normalizeDiseaseName(d.plantName);
          const fileDiseaseNorm = normalizeDiseaseName(altDiseaseName);
          const filePlantNorm = normalizeDiseaseName(altPlantName);
          
          return (dbDiseaseNorm.includes(fileDiseaseNorm) || fileDiseaseNorm.includes(dbDiseaseNorm)) &&
                 (dbPlantNorm.includes(filePlantNorm) || filePlantNorm.includes(dbPlantNorm));
        });
      }

      if (matchedDisease) {
        // Update disease with image
        matchedDisease.image = imageBase64;
        await matchedDisease.save();
        matchedCount++;
        updatedCount++;
        console.log(`✅ Matched: ${imageFile} → ${matchedDisease.plantName} - ${matchedDisease.diseaseName}`);
      } else {
        notFoundCount++;
        console.log(`⚠️  No match found for: ${imageFile} (Disease: ${diseaseName}, Plant: ${plantName})`);
      }
    }

    console.log('\n📊 Upload Summary:');
    console.log(`   ✅ Matched and updated: ${updatedCount}`);
    console.log(`   ⚠️  Not matched: ${notFoundCount}`);
    console.log(`   📸 Total images processed: ${imageFiles.length}`);

    await mongoose.connection.close();
    console.log('\n✅ Image upload completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading images:', error.message);
    process.exit(1);
  }
};

// Run the upload
uploadImages();

