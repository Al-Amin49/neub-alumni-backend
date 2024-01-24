import express from 'express';
import authMiddleware from '../middlewares/authMiddlewares.js';
import { messageControllers } from '../controllers/message.controllers.js';

const router=express.Router();

router.route("/:chatId").get(authMiddleware, messageControllers.allMessages);
router.route("/").post(authMiddleware, messageControllers.sendMessage);

export const messageRoutes= router;