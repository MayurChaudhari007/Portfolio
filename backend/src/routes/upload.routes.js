const express = require('express');
const { uploadFile } = require('../controllers/upload.controller');
const upload = require('../middleware/upload.middleware');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, authorize('admin'), upload.single('image'), uploadFile);

module.exports = router;
