

/**
 * @desc    Upload a single or multiple files (General Purpose)
 * @route   POST /api/upload
 * @access  Private/Admin
 */
const uploadFile = (req, res) => {
    try {
        // 1. Handle Multiple Files (for multi-image scenarios)
        if (req.files && req.files.length > 0) {
            const urls = req.files.map(file => file.path);
            return res.status(200).json({
                success: true,
                data: urls, // Returns array of Cloudinary URLs
                message: `${req.files.length} files uploaded successfully`
            });
        }

        // 2. Handle Single File (for Profile photo or Resume)
        if (req.file) {
            return res.status(200).json({
                success: true,
                data: req.file.path, // Returns single Cloudinary URL
                message: 'File uploaded successfully'
            });
        }

        // 3. Handle No Files
        return res.status(400).json({ 
            success: false, 
            message: 'No file(s) provided' 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { uploadFile };