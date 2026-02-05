

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postService from '../../services/postService';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Learning');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    // Handle file selection and generate local previews
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);

        // Generate temporary local URLs for previewing images before upload
        const filePreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(filePreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const formData = new FormData();
        formData.append('content', content);
        formData.append('category', category);
        formData.append('isPublished', true);

        // Append multiple files to 'images' key for Cloudinary processing
        selectedFiles.forEach((file) => {
            formData.append('images', file);
        });

        try {
            // postService.createPost handles the API call via our updated api.js
            await postService.createPost(formData);
            navigate('/admin/posts'); 
        } catch (error) {
            console.error("Upload Error:", error);
            alert(error.response?.data?.message || "Failed to create post. Check your Cloudinary config.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">New Timeline Update</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Dropdown */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50"
                    >
                        <option value="Learning">Learning</option>
                        <option value="Achievement">Achievement</option>
                        <option value="Web Dev">Web Dev</option>
                        <option value="AI-ML">AI-ML</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Main Content Area */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">What did you learn/achieve?</label>
                    <textarea 
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your progress..."
                        className="w-full p-4 border border-gray-300 rounded-md min-h-[180px] focus:ring-2 focus:ring-indigo-500 outline-none"
                    ></textarea>
                </div>

                {/* Multiple Image Upload */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Images / Certificates (Optional)</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors bg-gray-50">
                        <input 
                            type="file" 
                            multiple 
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Local Image Previews */}
                {previews.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-4 bg-gray-50 p-4 rounded-md border border-gray-100">
                        {previews.map((src, index) => (
                            <img key={index} src={src} alt="Preview" className="h-24 w-full object-cover rounded-md border-2 border-white shadow-sm" />
                        ))}
                    </div>
                )}

                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={isSaving}
                    className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-300 shadow-lg"
                >
                    {isSaving ? 'Uploading to Cloudinary...' : 'Post Update'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;