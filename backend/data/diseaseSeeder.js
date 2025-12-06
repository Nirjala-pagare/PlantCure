import mongoose from 'mongoose';
import Disease from '../models/disease.model.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Read diseases from JSON file
const loadDiseases = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'diseases.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading diseases.json:', error.message);
    return [];
  }
};

const buildChecklist = (disease) => {
  const base = {
    spots: false,
    curled: false,
    powdery: false,
    holes: false,
    stemDiscoloration: false,
  };

  const text = `${disease.symptoms || ''} ${disease.diseaseName || ''}`.toLowerCase();

  return {
    ...base,
    spots: /spot|lesion|pustule|blight/.test(text),
    curled: /curl|curled|rolled|twist/.test(text),
    powdery: /powder|powdery|mildew/.test(text),
    holes: /hole|borer|miner|chew/.test(text),
    stemDiscoloration: /stem.*discolor|stem.*dark|stem.*black|wil[t]/.test(text),
  };
};

// Seed diseases into database
const seedDiseases = async () => {
  try {
    await connectDB();

    // Clear existing diseases (optional - comment out if you want to keep existing data)
    await Disease.deleteMany({});
    console.log('Cleared existing diseases...');

    // Load diseases from JSON
    const diseases = loadDiseases();
    console.log(`Loaded ${diseases.length} diseases from JSON file...`);

    const normalizedDiseases = diseases.map((disease) => ({
      ...disease,
      symptomsChecklist: disease.symptomsChecklist || buildChecklist(disease),
    }));

    // Insert diseases
    const result = await Disease.insertMany(normalizedDiseases);
    console.log(`Successfully seeded ${result.length} diseases into database!`);

    // Display summary
    const summary = {};
    result.forEach(disease => {
      summary[disease.plantName] = (summary[disease.plantName] || 0) + 1;
    });
    
    console.log('\nDisease Summary by Plant:');
    Object.entries(summary).forEach(([plant, count]) => {
      console.log(`  ${plant}: ${count} diseases`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding diseases:', error.message);
    process.exit(1);
  }
};

// Run seeder
seedDiseases();

