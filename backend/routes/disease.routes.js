import express from 'express';
import upload from '../config/multer.js';
import {
  addDisease,
  getAllDiseases,
  getDiseaseById,
  searchDisease
} from '../controllers/disease.controller.js';

const router = express.Router();

// POST /api/disease/add - Add new disease with image upload
router.post('/add', upload.single('image'), addDisease);

// GET /api/disease/all - Get all diseases
router.get('/all', getAllDiseases);

// GET /api/disease/search?q= - Search diseases (must come before /:id)
router.get('/search', searchDisease);

// GET /api/disease/:id - Get disease by ID (must come last)
router.get('/:id', getDiseaseById);

export default router;

