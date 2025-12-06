import express from 'express';
import { diagnoseDisease } from '../controllers/diagnosis.controller.js';

const router = express.Router();

router.post('/check', diagnoseDisease);

export default router;

