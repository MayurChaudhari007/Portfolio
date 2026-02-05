
const About = require('../models/About');

/**
 * @desc    Get the About section data (Public)
 * @route   GET /api/about
 * @access  Public
 */
const getAbout = async (req, res) => {
    try {
        const about = await About.findOne();

        // Always return a success status, even if data is empty
        res.status(200).json({ 
            success: true, 
            data: about || {} 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Create or Update the About section (Admin)
 * @route   POST /api/about
 * @access  Private/Admin
 */
const updateAbout = async (req, res) => {
    try {
        // We take everything from req.body. 
        // Because we removed 'required' in the model, empty strings will now save correctly.
        const updateData = {
            headline: req.body.headline,
            bio: req.body.bio,
            contactEmail: req.body.contactEmail,
            resumeUrl: req.body.resumeUrl,
            avatarUrl: req.body.avatarUrl,
            socialLinks: req.body.socialLinks || []
        };

        // findOneAndUpdate with {} matches the first document.
        // upsert: true means "Create if not found, Update if found"
        const about = await About.findOneAndUpdate(
            {}, 
            updateData, 
            { 
                new: true, 
                upsert: true, 
                runValidators: true,
                setDefaultsOnInsert: true 
            }
        );

        res.status(200).json({ 
            success: true, 
            data: about, 
            message: 'About section saved successfully' 
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAbout,
    updateAbout
};