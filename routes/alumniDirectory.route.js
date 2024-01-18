import express from 'express'
import authMiddleware from '../middlewares/authMiddlewares.js';
const router = express.Router();
import { alumniControllers } from '../controllers/alumnidirectory.controllers.js';

router.get('/', alumniControllers.getAllAlumni);
router.get('/:id', alumniControllers.getAlumniById);
router.post('/', authMiddleware, alumniControllers.addAlumni); // Use the 'protect' middleware for authentication
router.patch('/:id', authMiddleware, alumniControllers.updateAlumni);
router.delete('/:id', authMiddleware,alumniControllers.deleteAlumni);

export const alumniRoutes=router;