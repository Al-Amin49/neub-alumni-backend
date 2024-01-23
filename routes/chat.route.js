import express from 'express'
import authMiddleware from '../middlewares/authMiddlewares.js';
import { chatControllers } from '../controllers/chat.controllers.js';

const router= express.Router();
// Create a new chat or send a message to an existing chat
 router.route("/").post(authMiddleware, chatControllers.accessChat);

 // Fetch all the chats for the authenticated user
router.route("/").get(authMiddleware, chatControllers.fetchChats);

// // Create a new group chat
// router.route("/group").post(authMiddleware, createGroupChat);

// // Rename an existing group chat
// router.route("/rename").put(authMiddleware, renameGroup);

// // Remove a user from a group chat
// router.route("/groupremove").put(authMiddleware, removeFromGroup);

// // Add a user to a group chat
// router.route("/groupadd").put(authMiddleware, addToGroup);

export const chatRoutes= router