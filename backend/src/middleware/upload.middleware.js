

const { upload } = require('../config/cloudinary');

/**
 * We are now exporting the Cloudinary-configured multer instance.
 * This keeps your existing route code working but switches the 
 * storage from your local 'uploads/' folder to Cloudinary.
 */

// We can add a simple wrapper if you want to keep the 5MB limit
const uploadMiddleware = upload; 

module.exports = uploadMiddleware;