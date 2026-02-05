const express = require('express');
const { getSkills, addSkill,updateSkill, deleteSkill } = require('../controllers/skill.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Public Routes
router.get('/', getSkills);

// Admin Routes (Protected)
router.post('/', protect, authorize('admin'), addSkill);
router.put('/:id', protect, authorize('admin'), updateSkill);
router.delete('/:id', protect, authorize('admin'), deleteSkill);

module.exports = router;
