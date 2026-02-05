

const express = require('express');
const router = express.Router();
const { getAbout, updateAbout } = require('../controllers/about.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get('/', getAbout);
// Change this to .post if your frontend service uses projectService.updateAbout (POST)
router.post('/', protect, authorize('admin'), updateAbout);

module.exports = router;