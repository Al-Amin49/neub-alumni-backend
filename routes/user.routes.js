import express from 'express'
import { usersController } from '../controllers/user.controllers.js';
const router = express.Router();

//create user
router.post('/register', usersController.register)
//login user
router.post('/login', usersController.login)

export const authRoutes=router;
