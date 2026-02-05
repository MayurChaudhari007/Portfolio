

const Profile = require("../models/Profile");
const cloudinary = require('cloudinary').v2;


/**
 * @desc    Update or Replace Asset (Auto-deletes old file)
 */


const getPublicId = (url, isRaw = false) => {
  if (!url) return null;
  const parts = url.split("/");
  const folderIndex = parts.indexOf("portfolio");
  if (folderIndex === -1) return null;

  const publicIdWithExt = parts.slice(folderIndex).join("/");
  
  if (isRaw) {
    return publicIdWithExt; // Keep .pdf extension for raw files
  }
  return publicIdWithExt.split(".")[0]; // Remove extension for images
};

/**
 * @desc    Update or Replace Asset (Ensures cleanup)
 */

const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create({
        fullName: "Mayur Chaudhari",
        headline: "Full Stack Developer",
        profileImage: "",
        resumeUrl: "",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateProfileFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    const { type } = req.body;
    const isResume = type === "resume";
    const updateField = isResume ? "resumeUrl" : "profileImage";
    const existingProfile = await Profile.findOne();

    // DELETE OLD FILE
    if (existingProfile && existingProfile[updateField]) {
      const pId = getPublicId(existingProfile[updateField], isResume);
      await cloudinary.uploader.destroy(pId, {
        resource_type: isResume ? "raw" : "image",
      });
    }

    const profile = await Profile.findOneAndUpdate(
      {},
      { [updateField]: req.file.path },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Remove Asset Entirely
 */
const deleteProfileAsset = async (req, res) => {
  try {
    const { type } = req.body;
    const isResume = type === "resume";
    const updateField = isResume ? "resumeUrl" : "profileImage";
    const profile = await Profile.findOne();

    if (profile && profile[updateField]) {
      const pId = getPublicId(profile[updateField], isResume);
      
      await cloudinary.uploader.destroy(pId, {
        resource_type: isResume ? "raw" : "image",
      });

      profile[updateField] = ""; 
      await profile.save();
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProfile, updateProfileFile, deleteProfileAsset };