
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Skill name is required'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            // Added 'Database' and 'Soft Skills'
            values: ['Frontend', 'Backend', 'AI', 'Database', 'Tools', 'Soft Skills', 'Other'],
            message: '{VALUE} is not a supported category',
        },
    },
    level: {
        type: Number, 
        required: [true, 'Skill level is required'],
        min: [1, 'Level must be at least 1'],
        max: [100, 'Level must be at most 100'],
        default: 50
    },
    icon: {
        type: String, // FontAwesome class (e.g., 'fas fa-database') or URL
        default: '',
    }
}, {
    timestamps: true,
});

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;