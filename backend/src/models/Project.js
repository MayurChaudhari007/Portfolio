

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
    },
    description: {
        type: String,
        default: "",
        trim: true,
    },
    techStack: {
        type: [String],
        default: [],
    },
    githubLink: {
        type: String,
        default: "",
        trim: true,
    },
    liveLink: {
        type: String,
        default: "",
        trim: true,
    },
    // This array will now store the full Cloudinary HTTPS URLs
    images: {
        type: [String], 
        default: [],
    },
    featured: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;