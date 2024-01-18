import NewsFeedPost from "../models/newsfeedpost.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";

/*
  @desc    Get all news feed posts
  @route   GET /api/v1/newsfeed
  @access  Public
*/
const getAllNewsFeed = asyncWrapper(async (req, res) => {
    const allPosts = await NewsFeedPost.find().populate('user', 'username profile');
    res.status(200).json({
      success: true,
      message: 'All news feed posts fetched successfully',
      data: allPosts,
    });
  });
  

/*
  @desc    Add a new news feed post
  @route   POST /api/v1/newsfeed
  @access  Private
*/
const addNewsFeedPost = asyncWrapper(async (req, res) => {
  const newPost = await NewsFeedPost.create(req.body);
  res.status(201).json({
    success: true,
    message: "News feed post created successfully",
    data: newPost,
  });
});

/*
  @desc    Like a specific news feed post by ID
  @route   POST /api/v1/newsfeed/:id/like
  @access  Private
*/
const likeNewsFeedPost = asyncWrapper(async (req, res) => {
  const post = await NewsFeedPost.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } }, // Increment the likes count
    { new: true }
  );

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "News feed post not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Liked the news feed post successfully",
    data: post,
  });
});


/*
  @desc    Comment on a specific news feed post by ID
  @route   POST /api/v1/newsfeed/:id/comment
  @access  Private
*/
const commentOnNewsFeedPost = asyncWrapper(async (req, res) => {
    const { comment } = req.body;
  
    if (!comment || typeof comment !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid comment format',
      });
    }
  
    const post = await NewsFeedPost.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment } },
      { new: true }
    );
  
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'News feed post not found',
      });
    }
  
    res.status(200).json({
      success: true,
      message: 'Commented on the news feed post successfully',
      data: post,
    });
  });

export const newsfeedController = {
  getAllNewsFeed,
  addNewsFeedPost,
  likeNewsFeedPost,
  commentOnNewsFeedPost,
};
