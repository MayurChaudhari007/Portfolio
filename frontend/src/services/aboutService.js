import api from './api';

const ABOUT_API_URL = '/about';

// Get about info (Public)
const getAbout = async () => {
    const response = await api.get(ABOUT_API_URL);
    return response.data;
};

// Update about info (Admin)
const updateAbout = async (aboutData) => {
    const response = await api.post(ABOUT_API_URL, aboutData); // Using POST as it might be create/update hybrid or single resource
    return response.data;
};

const aboutService = {
    getAbout,
    updateAbout
};

export default aboutService;
