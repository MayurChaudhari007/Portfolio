


import api from './api';

const POST_URL = '/posts';

const postService = {
    // 1. Get all published posts for the public timeline
    getPublicPosts: async () => {
        const response = await api.get(POST_URL);
        return response.data;
    },

    // 2. Get a single post by ID (Crucial for loading data into the Edit form)
    getPostById: async (id) => {
        const response = await api.get(`${POST_URL}/${id}`);
        return response.data;
    },

    // 3. Create a new post (Uploads multiple images to Cloudinary)
    createPost: async (formData) => {
        // We let Axios handle the Content-Type boundary automatically for FormData
        const response = await api.post(POST_URL, formData);
        return response.data;
    },

    // 4. Update an existing post (Handles keeping old images + adding new ones)
    updatePost: async (id, formData) => {
        // Note: In your updateProject/updatePost logic, we send 
        // existingImages and new files in this same formData
        const response = await api.put(`${POST_URL}/${id}`, formData);
        return response.data;
    },

    // 5. Delete a post
    deletePost: async (id) => {
        const response = await api.delete(`${POST_URL}/${id}`);
        return response.data;
    }
};

export default postService;