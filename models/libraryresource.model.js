import mongoose from 'mongoose';

const libraryresouceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Career Development', 'Entrepreneurship', 'Algorithm Design', 'System Design'],
  },
  description: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String, 
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },

}


);

const LibraryResource = mongoose.model('LibraryResource', libraryresouceSchema);

export default LibraryResource;



