
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isPDF = file.mimetype === 'application/pdf';
    let folderPath = 'portfolio/others'; // Fallback folder

    // 1. Logic to route files to the specific folders you created
    if (isPDF) {
      folderPath = 'portfolio/resumes';
    } else if (req.originalUrl.includes('profile')) {
      folderPath = 'portfolio/images'; // Only Profile images go here
    } else if (req.originalUrl.includes('posts')) {
      folderPath = 'portfolio/blog_post'; // Blog images go here
    } else if (req.originalUrl.includes('projects')) {
      folderPath = 'portfolio/project'; // Project images go here
    }

    return {
      folder: folderPath,
      // 'raw' is required for PDFs, 'image' for everything else
      resource_type: isPDF ? 'raw' : 'image', 
      // Keep PDF format for resumes, convert others to webp for performance
      format: isPDF ? 'pdf' : 'webp', 
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };