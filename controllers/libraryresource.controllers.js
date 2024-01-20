import LibraryResource from "../models/libraryresource.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";



/*
  @desc    Get all resources
  @route   GET /api/v1/resources
  @access  Public
*/
const getResources = asyncWrapper(async (req, res) => {
  const resources = await LibraryResource.find().populate('createdBy', 'username');
  res.status(200).json({
    success: true,
    data: resources,
  });
});

/*
  @desc    Create a new resource
  @route   POST /api/v1/resources
  @access  Private
*/
const createResource = asyncWrapper(async (req, res) => {
  const { title, category, description, fileUrl, uploadedBy } = req.body;
  const createdBy = req.user.id; // Assuming you have authentication middleware

  const resource = await LibraryResource.create({
    title,
    category,
    description,
    fileUrl,
    createdBy,
    uploadedBy
  });

  res.status(201).json({
    success: true,
    data: resource,
  });
});

/*
  @desc    Edit a resource by ID
  @route   PATCH /api/v1/resources/:id
  @access  Private
*/
const editResource = asyncWrapper(async (req, res) => {
  const { title, category, description, fileUrl } = req.body;

  const resource = await LibraryResource.findByIdAndUpdate(
    req.params.id,
    { title, category, description, fileUrl },
    { new: true, runValidators: true }
  );

  if (!resource) {
    return res.status(404).json({
      success: false,
      message: 'Resource not found',
    });
  }

  res.status(200).json({
    success: true,
    data: resource,
  });
});

/*
  @desc    Delete a resource by ID
  @route   DELETE /api/v1/resources/:id
  @access  Private
*/
const deleteResource = asyncWrapper(async (req, res) => {
  const resource = await LibraryResource.findByIdAndDelete(req.params.id);

  if (!resource) {
    return res.status(404).json({
      success: false,
      message: 'Resource not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Resource deleted successfully',
    data: {},
  });
});

export const libraryResourceControlllers = {
  getResources,
  createResource,
  editResource,
  deleteResource,
};