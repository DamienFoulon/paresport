// Libs
import express from 'express';

// Controllers
import indexController from '../controllers/index.js';

// Middlewares

// Config
const router = express.Router();

// Routes
router.get('/', indexController);
export default router;