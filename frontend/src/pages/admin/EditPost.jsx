

import React, { useState, useEffect } from 'react';
import API_BASE from "../../config";
import { useParams, useNavigate } from 'react-router-dom';
import postService from '../../services/postService';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Learning');
    const [existingImages, setExistingImages] = useState([]);
    const [newFiles, setNewFiles] = useState([]);
    const [newPreviews, setNewPreviews] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    // const API_BASE = "http://localhost:5000";

    useEffect(() => {
        const loadPost = async () => {
            try {
                const res = await postService.getPostById(id);
                const postData = res.data.data || res.data; 
                setContent(postData.content);
                setCategory(postData.category);
                setExistingImages(postData.images || []);
            } catch (error) {
                console.error("Error loading post:", error);
                alert("Could not find this post.");
                navigate('/admin/posts');
            }
        };
        loadPost();
    }, [id, navigate]);

    const getImageUrl = (path) => {
        if (!path) return "";
        return path.startsWith('http') ? path : `${API_BASE}${path}`;
    };

    const handleRemoveExisting = (imgIndex) => {
        const filtered = existingImages.filter((_, index) => index !== imgIndex);
        setExistingImages(filtered);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setNewFiles(files);
        const filePreviews = files.map(file => URL.createObjectURL(file));
        setNewPreviews(filePreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const formData = new FormData();
        formData.append('content', content);
        formData.append('category', category);
        formData.append('existingImages', JSON.stringify(existingImages));

        newFiles.forEach(file => {
            formData.append('images', file);
        });

        try {
            await postService.updatePost(id, formData);
            navigate('/admin/posts');
        } catch (error) {
            alert("Update failed.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Edit Activity Update</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="Learning">Learning</option>
                        <option value="Achievement">Achievement</option>
                        <option value="Web Dev">Web Dev</option>
                        <option value="AI-ML">AI-ML</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                    <textarea 
                        required 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 border rounded-md h-40 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {existingImages.length > 0 && (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Currently Saved Images</label>
                        <div className="flex gap-4 flex-wrap bg-gray-50 p-4 rounded-md">
                            {existingImages.map((img, i) => (
                                <div key={i} className="relative group">
                                    <img 
                                        src={getImageUrl(img)} 
                                        className="h-24 w-24 object-cover rounded-md border shadow-sm" 
                                        alt="Current" 
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveExisting(i)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 shadow-md transition-transform hover:scale-110"
                                        title="Remove Image"
                                    >✕</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Add New Images</label>
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                </div>

                {newPreviews.length > 0 && (
                    <div className="grid grid-cols-4 gap-3 mt-4">
                        {newPreviews.map((src, index) => (
                            <img key={index} src={src} alt="New Preview" className="h-20 w-full object-cover rounded border-2 border-dashed border-indigo-300" />
                        ))}
                    </div>
                )}

                {/* UPDATED: Button Section with Cancel option */}
                <div className="pt-4 flex items-center gap-4">
                    <button 
                        disabled={isSaving}
                        type="submit"
                        className="flex-1 bg-indigo-600 text-white py-3 rounded-md font-bold hover:bg-indigo-700 transition-colors shadow-md disabled:bg-gray-400"
                    >
                        {isSaving ? 'Saving Changes...' : 'Save & Update Post'}
                    </button>
                    
                    <button 
                        type="button"
                        onClick={() => navigate('/admin/posts')}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md font-bold hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPost;