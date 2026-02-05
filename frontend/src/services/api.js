
// // ============================================================-------------------------------------------
// import axios from "axios";

// // Use an environment variable for the backend URL, fallback to localhost for development
// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const api = axios.create({
//   baseURL: API_URL,
// });

// // Request interceptor for Authorization
// api.interceptors.request.use(
//   (config) => {
//     // Note: Ensure your login logic saves the token as "token" in localStorage
//     const token = localStorage.getItem("token");
    
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

 
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;

// ----------------------------------------------------------------------

import axios from "axios";

/**
 * 1. DYNAMIC API BASE
 * Prioritizes the environment variable from Render/Vite.
 * Fallback to localhost for your current development.
 */
export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// The API_URL for actual requests (appending /api)
const API_URL = `${API_BASE}/api`;

const api = axios.create({
  baseURL: API_URL,
});

/**
 * 2. REQUEST INTERCEPTOR
 * Automatically attaches the JWT token to every request header
 * so you don't have to manually add it in your services.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 3. IMAGE URL HELPER
 * Use this helper in your components to ensure images load 
 * correctly regardless of where the app is deployed.
 */
export const getAssetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path; // Cloudinary URLs
  return `${API_BASE}${path}`; // Local backend uploads
};

export default api;