import express from 'express'
import { usersController } from '../controllers/user.controllers.js';
import authMiddleware from '../middlewares/authMiddlewares.js';
import { isAdmin } from '../middlewares/checkRoleMiddleware.js';
const router = express.Router();

//create user
router.post('/register', usersController.register)
//login user
router.post('/login', usersController.login)
//get authenticated user details
router.get('/user-details',authMiddleware, usersController.userDetails)
//get all user by admin
router.get('/allusers',authMiddleware,isAdmin,  usersController.getAllUsers)
//serch all users
router.get('/', authMiddleware, usersController.searchAllUsers)


export const authRoutes=router;
