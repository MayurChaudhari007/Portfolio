


const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfileFile,
  deleteProfileAsset, // Added the missing import for the delete function
} = require("../controllers/profile.controller");
const { protect, authorize } = require("../middleware/auth.middleware");
const { upload } = require("../config/cloudinary");

/**
 * @route   GET /api/profile
 * @desc    Get profile data (Public)
 */
router.get("/", getProfile);

/**
 * @route   POST /api/profile/upload
 * @desc    Upload or Replace Photo/Resume (Admin Only)
 */
router.post(
  "/upload",
  protect,
  authorize("admin"),
  upload.single("file"), // 'file' must match the key in your Frontend FormData
  updateProfileFile
);

/**
 * @route   DELETE /api/profile/remove-asset
 * @desc    Remove Photo or Resume without replacing it (Admin Only)
 */
router.delete(
  "/remove-asset", 
  protect, 
  authorize("admin"), 
  deleteProfileAsset
);

module.exports = router;