



const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    // Optional Title
    title: { 
        type: String, 
        trim: true,
        default: "" 
    },
    // Unique URL identifier
    slug: { 
        type: String, 
        unique: true, 
        lowercase: true, 
        index: true 
    },
    // The main paragraph or sentence
    content: { 
        type: String, 
        required: [true, 'Post content is required'],
        trim: true
    },
    // Categories
    category: { 
        type: String, 
        required: [true, 'Category is required'],
        enum: ['Learning', 'Achievement', 'Web Dev', 'AI-ML', 'Other'],
        default: 'Learning',
        index: true
    },
    // Updated: Array to hold Cloudinary HTTPS URLs
    images: {
        type: [String],
        default: []
    },
    // Visibility toggle
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});

/**
 * Pre-save middleware to generate a unique slug
 */
postSchema.pre('save', function (next) {
    // Only generate slug if title or content is new or modified
    if (!this.isModified('title') && !this.isModified('content')) {
        return next();
    }

    // Generate slug from title or snippet of content
    const baseString = this.title || this.content.split(/\s+/).slice(0, 5).join(' ');

    this.slug = baseString
        .toLowerCase()
        .replace(/[^\w ]+/g, '') 
        .replace(/ +/g, '-')     
        .concat('-' + Math.floor(Math.random() * 1000)); 

    next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;