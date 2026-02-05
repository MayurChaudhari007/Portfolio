

const Post = require('../models/Post');
const cloudinary = require('cloudinary').v2;

/**
 * HELPER: The Ultimate Public ID Extractor
 * Handles URL decoding (%20, etc.) to ensure Cloudinary 'destroy' always finds the file.
 */
const getPostPublicId = (url) => {
    if (!url) return null;
    try {
        // 1. Decode the URL (converts %20 back to space, %28 to (, etc.)
        const decodedUrl = decodeURIComponent(url);
        
        // 2. Extract the part after 'upload/'
        const parts = decodedUrl.split('/');
        const folderIndex = parts.indexOf('portfolio');
        if (folderIndex === -1) return null;

        // 3. Join the path from 'portfolio' onwards and strip the file extension (.webp, .jpg, etc.)
        const publicIdWithExt = parts.slice(folderIndex).join('/');
        const publicId = publicIdWithExt.split('.')[0]; 
        
        return publicId;
    } catch (err) {
        console.error("Error parsing Public ID:", err);
        return null;
    }
};

/**
 * @desc    Create new post
 */
const createPost = async (req, res) => {
    try {
        const postData = { ...req.body };
        if (req.files && req.files.length > 0) {
            postData.images = req.files.map(file => file.path);
        }
        const post = await Post.create(postData);
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Update Post (Handles ALL scenarios: Remove some, Add some, Swap all)
 */
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

        // Parse existing images the user wants to KEEP
        const keptImages = req.body.existingImages 
            ? (typeof req.body.existingImages === 'string' ? JSON.parse(req.body.existingImages) : req.body.existingImages)
            : [];
        
        // Identify images that were REMOVED in the UI to delete from Cloudinary
        const imagesToDelete = post.images.filter(imgUrl => !keptImages.includes(imgUrl));

        if (imagesToDelete.length > 0) {
            const deletePromises = imagesToDelete.map(async (imgUrl) => {
                const publicId = getPostPublicId(imgUrl);
                if (publicId) {
                    const result = await cloudinary.uploader.destroy(publicId);
                    console.log(`Edit-Cleanup: ${publicId} ->`, result);
                }
            });
            await Promise.all(deletePromises);
        }

        // Combine Kept images with NEWLY uploaded files
        let finalImages = [...keptImages];
        if (req.files && req.files.length > 0) {
            const newUrls = req.files.map(file => file.path);
            finalImages = [...finalImages, ...newUrls];
        }

        // Apply updates
        post.content = req.body.content || post.content;
        post.category = req.body.category || post.category;
        post.images = finalImages;
        post.isPublished = req.body.isPublished !== undefined ? req.body.isPublished : post.isPublished;

        await post.save();
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Delete post entirely (Wipes all associated images from Cloudinary)
 */
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

        if (post.images && post.images.length > 0) {
            console.log(`Starting Cloudinary wipe for Post: ${post._id}`);
            const deletePromises = post.images.map(async (imgUrl) => {
                const publicId = getPostPublicId(imgUrl);
                if (publicId) {
                    const result = await cloudinary.uploader.destroy(publicId);
                    console.log(`Delete-Cleanup: ${publicId} ->`, result);
                }
            });
            await Promise.all(deletePromises);
        }

        await post.deleteOne();
        res.status(200).json({ success: true, message: 'Post and Cloudinary assets deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getPublicPosts = async (req, res) => {
    try {
        const posts = await Post.find({ isPublished: true }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createPost, updatePost, getPublicPosts, getPostById, deletePost };