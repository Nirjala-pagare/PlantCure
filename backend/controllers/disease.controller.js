import Disease from '../models/disease.model.js';

// Add a new disease
export const addDisease = async (req, res) => {
  try {
    const { plantName, diseaseName, symptoms, prevention, treatment } = req.body;
    const image = req.file ? req.file.filename : '';

    if (!plantName || !diseaseName || !symptoms || !prevention || !treatment) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required except image'
      });
    }

    const disease = new Disease({
      plantName,
      diseaseName,
      symptoms,
      prevention,
      treatment,
      image
    });

    await disease.save();

    res.status(201).json({
      success: true,
      message: 'Disease added successfully',
      data: disease
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding disease',
      error: error.message
    });
  }
};

// Get all diseases
export const getAllDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find().sort({ createdAt: -1 });

    const diseasesWithUrls = diseases.map(disease => ({
      ...disease.toObject(),
      imageUrl: disease.image
        ? (disease.image.startsWith('data:image') 
            ? disease.image 
            : `${process.env.BASE_URL || 'http://localhost:5000'}/uploads/diseases/${disease.image}`)
        : ''
    }));

    res.status(200).json({
      success: true,
      count: diseases.length,
      data: diseasesWithUrls
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching diseases',
      error: error.message
    });
  }
};

// Get disease by ID
export const getDiseaseById = async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);

    if (!disease) {
      return res.status(404).json({
        success: false,
        message: 'Disease not found'
      });
    }

    const diseaseWithUrl = {
      ...disease.toObject(),
      imageUrl: disease.image
        ? (disease.image.startsWith('data:image') 
            ? disease.image 
            : `${process.env.BASE_URL || 'http://localhost:5000'}/uploads/diseases/${disease.image}`)
        : ''
    };

    res.status(200).json({
      success: true,
      data: diseaseWithUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching disease',
      error: error.message
    });
  }
};

// ---------------------------
// FIXED + IMPROVED SEARCH API
// ---------------------------

// STRICT: Match plant name exactly
// FLEXIBLE: Match symptoms with regex
export const searchDisease = async (req, res) => {
  try {
    const { plantName, symptoms } = req.query;

    if (!plantName && !symptoms) {
      return res.status(400).json({
        success: false,
        message: "plantName or symptoms is required"
      });
    }

    const query = {};

    // Exact plant match — prevents "Tomato" appearing for "Potato"
    if (plantName) {
      query.plantName = new RegExp(`^${plantName}$`, "i");
    }

    // Symptom flexible matching
    if (symptoms) {
      query.symptoms = { $regex: symptoms, $options: "i" };
    }

    const diseases = await Disease.find(query).sort({ createdAt: -1 });

    const diseasesWithUrls = diseases.map(disease => ({
      ...disease.toObject(),
      imageUrl: disease.image
        ? (disease.image.startsWith('data:image') 
            ? disease.image 
            : `${process.env.BASE_URL || 'http://localhost:5000'}/uploads/diseases/${disease.image}`)
        : ''
    }));

    res.status(200).json({
      success: true,
      count: diseases.length,
      data: diseasesWithUrls
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching diseases",
      error: error.message
    });
  }
};
