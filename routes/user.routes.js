import express from 'express'
import { usersController } from '../controllers/user.controllers.js';
import authMiddleware from '../middlewares/authMiddlewares.js';
const router = express.Router();

//create user
router.post('/register', usersController.register)
//login user
router.post('/login', usersController.login)
router.get('/user-details',authMiddleware, usersController.userDetails)

export const authRoutes=router;
