import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  interests: {
    type: [String],
    default: [],
  },
  imgUrl:{
    type:String,
    default:'https://randomuser.me/api/portraits/men/11.jpg'
  },
  // Reference to the user who created the alumni profile
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },

  // Connections with other alumni profiles
  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AlumniDirectory',
    },
  ],

});

const AlumniDirectory = mongoose.model('AlumniDirectory', alumniSchema);

export default AlumniDirectory
