import asyncWrapper from "../utils/asyncWrapper.js";
import AlumniDirectory from "../models/alumnidirectory.model.js";

/*-------------------
@desc    Get all alumni profiles
@route   GET /api/v1/alumni
@access  Public
*/
const getAllAlumni = asyncWrapper(async (req, res) => {
    const alumni = await AlumniDirectory.find().populate('user', 'username'); // Populate the 'user' field with the username
    res.status(200).json({
      success: true,
      count: alumni.length,
      data: alumni,
    });
  });
  
  /*-------------------
  @desc    Get a specific alumni profile by ID
  @route   GET /api/v1/alumni/:id
  @access  Public
  */
  const getAlumniById = asyncWrapper(async (req, res) => {
    const alumni = await AlumniDirectory.findById(req.params.id).populate('user', 'username'); // Populate the 'user' field with the username
  
    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: 'Alumni profile not found',
      });
    }
  
    res.status(200).json({
      success: true,
      data: alumni,
    });
  });
  
  /*-------------------
  @desc    Add a new alumni profile
  @route   POST /api/v1/alumni
  @access  Private (or Authenticated, depending on your application logic)
  */
  const addAlumni = asyncWrapper(async (req, res) => {
    // Extract the user's ID from the authenticated user
    const userId = req.user.id;
  
    // Create a new alumni profile with the user's ID
    const newAlumni = await AlumniDirectory.create({
      ...req.body,
      user: userId, // Set the user field to the ID of the authenticated user
    });
  
    res.status(201).json({
      success: true,
      message: 'Alumni profile added successfully',
      data: newAlumni,
    });
  });
  
  /*-------------------
  @desc    Update a specific alumni profile by ID
  @route   PUT /api/v1/alumni/:id
  @access  Private (or Authenticated, depending on your application logic)
  */
  const updateAlumni = asyncWrapper(async (req, res) => {
    const alumni = await AlumniDirectory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: 'Alumni profile not found',
      });
    }
  
    res.status(200).json({
      success: true,
      message: 'Alumni profile updated successfully',
      data: alumni,
    });
  });
  
  /*-------------------
  @desc    Delete a specific alumni profile by ID
  @route   DELETE /api/v1/alumni/:id
  @access  Private (or Authenticated, depending on your application logic)
  */
  const deleteAlumni = asyncWrapper(async (req, res) => {
    const alumni = await AlumniDirectory.findByIdAndDelete(req.params.id);
  
    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: 'Alumni profile not found',
      });
    }
  
    res.status(200).json({
      success: true,
      message: 'Alumni profile deleted successfully',
      data: {},
    });
  });
export const alumniControllers = {
  getAllAlumni,
  getAlumniById,
  addAlumni,
  updateAlumni,
  deleteAlumni,
};
