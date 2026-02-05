

const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
    platform: {
        type: String,
        // Removed required: true to allow empty social slots
    },
    url: {
        type: String,
        match: [
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            'Please use a valid URL',
        ],
    },
    icon: String, 
}, { _id: false });

const aboutSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: [true, 'Headline is required'],
        trim: true,
    },
    bio: {
        type: String, 
        default: "", // Now optional
    },
    contactEmail: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    resumeUrl: {
        type: String,
        default: "",
    },
    avatarUrl: {
        type: String,
        default: "",
    },
    socialLinks: {
        type: [socialLinkSchema],
        default: [] // Allows saving without any social links
    },
}, {
    timestamps: true,
});

const About = mongoose.model('About', aboutSchema);
module.exports = About;