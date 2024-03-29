import { User } from "../models/user.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";

/*-------------------
@desc     create a new user
@route    POST api/v1/users/register
@access  public
*/
const register = asyncWrapper(async (req, res) => {
    const { username, email, password } = req.body;
  
    // Check if email already exists
    const userWithEmail = await User.findOne({ email: email });
    if (userWithEmail) {
      return res.status(400).json({ msg: "Email already exists" });
    }
  
    // Check if username already exists
    const userWithUsername = await User.findOne({ username: username });
    if (userWithUsername) {
      return res.status(400).json({ msg: "Username already exists" });
    }
  
    const result = await User.create({ username, email, password });
  
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: await result.generateToken(),
      data: result,
    });
  });
  /*-------------------
  @desc    Authenticate and login a user
  @route    POST api/v1/users/login
  @access  public
  */
  const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    //comparing password
    const passwordMatch = await userExist.comparePassword(password);
  
    if (passwordMatch) {
      res.status(201).json({
        success: true,
        message: "Login successfully",
        token: await userExist.generateToken(),
        data: userExist,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  });
/*-------------------
 @desc    Get user data based on the provided JWT token
 @route   GET api/v1/users/user-details
 @access  Private
*/
const userDetails=asyncWrapper(async(req, res)=>{
  const user = req.user;
  console.log('Authenticated User:', user)
  // If no user is found
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const userDetails = {
    _id: user._id,
    username: user.username,
    email: user.email,
    role:user.role
  };

  // Sending the response with user details
  res.status(200).json({ user: userDetails });
})

/*-------------------
@desc    get all users
@route    POST api/v1/users/allusers
@access  private
*/

const getAllUsers = asyncWrapper(async (req, res) => {
  const allusers = await User.find();
  res.status(201).json({
    success: true,
    message: "all users fetch  successfully",
    data: allusers,
  });
});

 /*-------------------
  @desc    search all user
  @route    get api/v1/users?search=al-amin
  @access  private
  */
  const searchAllUsers = asyncWrapper(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
    
  });

  export const usersController = {
    register,
    login,
    userDetails,
    getAllUsers,
    searchAllUsers
  };