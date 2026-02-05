
const Project = require("../models/Project");
const cloudinary = require('cloudinary').v2;

/**
 * HELPER: Public ID Extractor
 * Handles URL decoding (%20, etc.) to ensure Cloudinary 'destroy' always finds the file.
 * Specific to the 'portfolio/project' folder.
 */
const getProjectPublicId = (url) => {
    if (!url) return null;
    try {
        // Decode URL to handle spaces/special characters in filenames
        const decodedUrl = decodeURIComponent(url);
        
        const parts = decodedUrl.split('/');
        const folderIndex = parts.indexOf('portfolio');
        if (folderIndex === -1) return null;

        // Join path from 'portfolio' onwards and strip file extension
        const publicIdWithExt = parts.slice(folderIndex).join('/');
        const publicId = publicIdWithExt.split('.')[0]; 
        
        return publicId;
    } catch (err) {
        console.error("Error parsing Project Public ID:", err);
        return null;
    }
};

/**
 * @desc    Get all projects (Public)
 */
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get single project by ID
 */
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Create new project
 */
const createProject = async (req, res) => {
  try {
    const projectData = { ...req.body };

    if (req.files && req.files.length > 0) {
      projectData.images = req.files.map((file) => file.path);
    } else {
      projectData.images = [];
    }

    if (req.body.techStack) {
      projectData.techStack = JSON.parse(req.body.techStack);
    }

    projectData.featured = req.body.featured === "true";

    const project = await Project.create(projectData);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update project (Handles selective image deletion from Cloudinary)
 */
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // 1. Identify images to delete from Cloudinary
    const keptImages = req.body.existingImages 
      ? (typeof req.body.existingImages === 'string' ? JSON.parse(req.body.existingImages) : req.body.existingImages)
      : [];
    
    const imagesToDelete = project.images.filter(imgUrl => !keptImages.includes(imgUrl));

    // 2. Cleanup Cloudinary
    if (imagesToDelete.length > 0) {
        const deletePromises = imagesToDelete.map(async (imgUrl) => {
            const publicId = getProjectPublicId(imgUrl);
            if (publicId) {
                const result = await cloudinary.uploader.destroy(publicId);
                console.log(`Project Edit-Cleanup: ${publicId} ->`, result);
            }
        });
        await Promise.all(deletePromises);
    }

    // 3. Prepare Update Data
    const updateData = { ...req.body };
    if (req.body.techStack) {
      updateData.techStack = JSON.parse(req.body.techStack);
    }

    let finalImages = [...keptImages];
    if (req.files && req.files.length > 0) {
      const newPaths = req.files.map((file) => file.path);
      finalImages = [...finalImages, ...newPaths];
    }

    updateData.images = finalImages;
    updateData.featured = req.body.featured === "true";

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete project (Full Cloudinary wipe)
 */
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    
    // Wipe all images from Cloudinary portfolio/project folder
    if (project.images && project.images.length > 0) {
        console.log(`Starting Cloudinary wipe for Project: ${project._id}`);
        const deletePromises = project.images.map(async (imgUrl) => {
            const publicId = getProjectPublicId(imgUrl);
            if (publicId) {
                const result = await cloudinary.uploader.destroy(publicId);
                console.log(`Project Delete-Cleanup: ${publicId} ->`, result);
            }
        });
        await Promise.all(deletePromises);
    }

    await project.deleteOne();
    res.status(200).json({ success: true, message: "Project and associated images deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};