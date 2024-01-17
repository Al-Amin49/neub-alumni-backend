
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
  try {
    const tokenHeader = req.header("Authorization");

    if (!tokenHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = tokenHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
console.log('decoded',decoded);

    const user = await User.findOne({
      _id: decoded.userId,
    });
    console.log('user from authmiddlew', user)

    if (!user) {
      throw new Error("Unable to login, invalid credentials");
    }

    req.user = user;
    console.log('from authmiddleware',req.user)
    req.token = token;
    next();
  } catch (error) {
    next(error); // Call next with the error to propagate it to the error-handling middleware
  }
};
export default authMiddleware;