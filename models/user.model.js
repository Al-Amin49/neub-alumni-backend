import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile:{
        type:String,
        default:"https://randomuser.me/api/portraits/men/78.jpg"
    },

    role: {
      type: String,
      enum: ["user", "admin", "alumni"],
      default: "user",
    },
  },
  { timestamps: true }
);
//pre hook middleware for hashing password before saving
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
      next();
    }
    try {
      const saltRound = await bcrypt.genSalt(12);
      const hash_Password = await bcrypt.hash(user.password, saltRound);
      user.password = hash_Password;
    } catch (error) {
      next(error.message);
    }
  });
  
  //instance methods for generating jwt token.
  userSchema.methods.generateToken = async function () {
    try {
      return jwt.sign(
        {
          //payload(user identity)
          userId: this._id.toString(),
          email: this.email,
          role: this.role,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  //comparing password using instance method
  userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
    } catch (error) {
      console.error("Error comparing passwords:", error);
      return false;
    }
  };
export const User= mongoose.model('User', userSchema)
