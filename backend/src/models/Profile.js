

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    profileImage: {
        type: String, 
        default: "" 
    },
    resumeUrl: {
        type: String, 
        default: "" 
    },
    // Adding these so you can manage your "Home" section text too
    fullName: { type: String, default: "Mayur Chaudhari" },
    headline: { type: String, default: "Full Stack Developer" },
    bio: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);