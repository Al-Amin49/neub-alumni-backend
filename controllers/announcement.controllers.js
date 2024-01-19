import Announcement from "../models/announcement.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";


/*
  @desc    Add a new announcement
  @route   POST /api/v1/announcements
  @access  Private (or Authenticated, depending on your application logic)
*/
const addAnnouncement = asyncWrapper(async (req, res) => {
  const { title, content } = req.body;

  const newAnnouncement = new Announcement({
    title,
    content,
  });

  const announcement = await newAnnouncement.save();

  res.status(201).json({
    success: true,
    message: "Announcement added successfully",
    data: announcement,
  });
});

/*
  @desc    Get all announcements
  @route   GET /api/v1/announcements
  @access  Public (or Authenticated, depending on your application logic)
*/
const getAllAnnouncements = asyncWrapper(async (req, res) => {
  const announcements = await Announcement.find();

  res.status(200).json({
    success: true,
    message: "All announcements retrieved successfully",
    data: announcements,
  });
});

/*
  @desc    Get a specific announcement by ID
  @route   GET /api/v1/announcements/:id
  @access  Public (or Authenticated, depending on your application logic)
*/
const getAnnouncementById = asyncWrapper(async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);

  if (!announcement) {
    return res.status(404).json({
      success: false,
      message: "Announcement not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Announcement retrieved successfully",
    data: announcement,
  });
});

/*
  @desc    Edit a specific announcement by ID
  @route   PUT /api/v1/announcements/:id
  @access  Private (or Authenticated, depending on your application logic)
*/
const editAnnouncement = asyncWrapper(async (req, res) => {
  const { title, content } = req.body;

  const announcement = await Announcement.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true, runValidators: true }
  );

  if (!announcement) {
    return res.status(404).json({
      success: false,
      message: "Announcement not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Announcement updated successfully",
    data: announcement,
  });
});

/*
  @desc    Delete a specific announcement by ID
  @route   DELETE /api/v1/announcements/:id
  @access  Private (or Authenticated, depending on your application logic)
*/
const deleteAnnouncement = asyncWrapper(async (req, res) => {
  const announcement = await Announcement.findByIdAndDelete(req.params.id);

  if (!announcement) {
    return res.status(404).json({
      success: false,
      message: "Announcement not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Announcement deleted successfully",
    data: {},
  });
});

export const announcementControllers = {
  addAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  editAnnouncement,
  deleteAnnouncement,
};
