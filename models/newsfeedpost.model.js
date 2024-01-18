import mongoose  from "mongoose";

const newsFeedPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming you store the image URL
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
}, { timestamps: true }); // Adding timestamps

const NewsFeedPost = mongoose.model('NewsFeedPost', newsFeedPostSchema);

export default NewsFeedPost;
