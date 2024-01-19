import express from 'express'
import { announcementControllers } from '../controllers/announcement.controllers.js';
import authMiddleware from '../middlewares/authMiddlewares.js';
import { isAdmin } from '../middlewares/checkRoleMiddleware.js';

const router=express.Router();

router.post('/', authMiddleware,isAdmin, announcementControllers.addAnnouncement);
router.get('/', authMiddleware, announcementControllers.getAllAnnouncements);
router.get('/:id', authMiddleware, announcementControllers.getAnnouncementById)
router.put('/:id', authMiddleware, isAdmin, announcementControllers.editAnnouncement)
router.delete('/:id',authMiddleware, isAdmin, announcementControllers.deleteAnnouncement)

export const announcementRoute= router;
