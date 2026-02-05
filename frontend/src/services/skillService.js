import api from './api';

const SKILL_API_URL = '/skills';

// Get all skills (Public)
const getSkills = async () => {
    const response = await api.get(SKILL_API_URL);
    return response.data;
};

// Create new skill (Admin)
const createSkill = async (skillData) => {
    const response = await api.post(SKILL_API_URL, skillData);
    return response.data;
};

// Update skill (Admin)
const updateSkill = async (id, skillData) => {
    const response = await api.put(`${SKILL_API_URL}/${id}`, skillData);
    return response.data;
};

// Delete skill (Admin)
const deleteSkill = async (id) => {
    const response = await api.delete(`${SKILL_API_URL}/${id}`);
    return response.data;
};

const skillService = {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill
};

export default skillService;
