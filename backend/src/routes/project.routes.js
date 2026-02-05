

const express = require('express');
const { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} = require('../controllers/project.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// IMPORT the Cloudinary upload middleware we configured earlier
const { upload } = require('../config/cloudinary'); 

const router = express.Router();

// --- Public Routes ---
router.get('/', getProjects);
router.get('/:id', getProjectById);

// --- Admin Routes (Protected) ---
/**
 * Using upload.array('images', 10) ensures:
 * 1. Files are sent directly to Cloudinary.
 * 2. They are placed in the 'portfolio/project' folder (based on our dynamic config).
 * 3. Up to 10 images can be uploaded per project.
 */
router.post(
    '/', 
    protect, 
    authorize('admin'), 
    upload.array('images', 10), 
    createProject
);

router.put(
    '/:id', 
    protect, 
    authorize('admin'), 
    upload.array('images', 10), 
    updateProject
);

router.delete(
    '/:id', 
    protect, 
    authorize('admin'), 
    deleteProject
);

module.exports = router;