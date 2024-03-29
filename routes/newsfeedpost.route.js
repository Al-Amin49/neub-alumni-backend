import express from 'express'
import { newsfeedController } from '../controllers/newsfeedpost.controllers.js';

const router=express.Router()

router.get('/', newsfeedController.getAllNewsFeed);

router.post('/', newsfeedController.addNewsFeedPost);

router.post('/:id/like', newsfeedController.likeNewsFeedPost);

router.post('/:id/comment', newsfeedController.commentOnNewsFeedPost);
router.patch('/:id', newsfeedController.updateNewsFeedPostContent);
router.delete('/:id', newsfeedController.deleteNewsFeedPost);

export const newsfeedRoutes= router