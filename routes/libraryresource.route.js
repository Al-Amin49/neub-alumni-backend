import express from 'express'
import { libraryResourceControlllers } from '../controllers/libraryresource.controllers.js';
import authMiddleware from '../middlewares/authMiddlewares.js';
import { isAdmin } from '../middlewares/checkRoleMiddleware.js';

const router= express.Router();

router.get('/', libraryResourceControlllers.getResources)
router.post('/', authMiddleware, isAdmin, libraryResourceControlllers.createResource)
router.patch('/:id', authMiddleware, isAdmin, libraryResourceControlllers.editResource)
router.delete('/:id', authMiddleware, isAdmin, libraryResourceControlllers.deleteResource)

export const libraryResouceRoute=router;