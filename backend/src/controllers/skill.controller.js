

// -------------------------------------------------------------------------------------------------

const Skill = require('../models/Skill');

/**
 * @desc    Get all skills grouped by category (Public)
 * @route   GET /api/skills
 * @access  Public
 */
const getSkills = async (req, res) => {
    try {
        // Aggregate to group by category
        const skills = await Skill.aggregate([
            {
                $group: {
                    _id: '$category',
                    items: { $push: '$$ROOT' }
                }
            },
            {
                $project: {
                    category: '$_id',
                    items: 1,
                    _id: 0
                }
            },
            { $sort: { category: 1 } } // Sort categories alphabetically
        ]);

        res.status(200).json({ success: true, count: skills.length, data: skills });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Add a new skill (Admin)
 * @route   POST /api/skills
 * @access  Private/Admin
 */
const addSkill = async (req, res) => {
    try {
        const { name, category, level, icon } = req.body;

        const skill = await Skill.create({
            name,
            category,
            level,
            icon
        });

        res.status(201).json({ success: true, data: skill });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Update a skill (Admin)
 * @route   PUT /api/skills/:id
 * @access  Private/Admin
 */
const updateSkill = async (req, res) => {
    try {
        let skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({ 
                success: false, 
                message: 'Skill not found in database' 
            });
        }

        skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: skill });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Delete a skill (Admin)
 * @route   DELETE /api/skills/:id
 * @access  Private/Admin
 */
const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({ success: false, message: 'Skill not found' });
        }

        await skill.deleteOne();

        res.status(200).json({ success: true, message: 'Skill removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getSkills,
    addSkill,
    updateSkill, // Exporting the new update function
    deleteSkill
};