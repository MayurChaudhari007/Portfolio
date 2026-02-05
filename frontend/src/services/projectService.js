

import api from './api';

const PROJECT_API_URL = '/projects';

const projectService = {
    // 1. Get all projects (Public)
    getProjects: async () => {
        const response = await api.get(PROJECT_API_URL);
        // Returns the data array directly for your map functions
        return response.data?.data || response.data;
    },

    // 2. Get single project (For Edit Mode)
    getProject: async (id) => {
        const response = await api.get(`${PROJECT_API_URL}/${id}`);
        return response.data?.data || response.data;
    },

    // 3. Create new project (Uploads multiple images to Cloudinary)
    createProject: async (projectData) => {
        // Axios automatically detects FormData and sets the correct boundary
        const response = await api.post(PROJECT_API_URL, projectData);
        return response.data?.data || response.data;
    },

    // 4. Update project (Handles merged image arrays)
    updateProject: async (id, projectData) => {
        // projectData here should be the FormData containing existingImages + new images
        const response = await api.put(`${PROJECT_API_URL}/${id}`, projectData);
        return response.data?.data || response.data;
    },

    // 5. Delete project
    deleteProject: async (id) => {
        const response = await api.delete(`${PROJECT_API_URL}/${id}`);
        return response.data;
    }
};

export default projectService;