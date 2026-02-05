

import React, { useState, useEffect } from 'react';

const SkillForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Frontend',
        level: 50,
        icon: ''
    });

    // Populate form when editing an existing skill
    useEffect(() => {
        if (initialData) {
            setFormData({
                _id: initialData._id, // Keep the ID for updates
                name: initialData.name || '',
                category: initialData.category || 'Frontend',
                level: initialData.level || 50,
                icon: initialData.icon || ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            // Level MUST be a Number for Mongoose validation
            [name]: name === 'level' ? parseInt(value, 10) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the clean formData back to ManageSkills
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-semibold text-gray-700">Skill Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. MongoDB, Communication"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border p-2.5"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border p-2.5 bg-white"
                >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI">AI</option>
                    <option value="Database">Database</option>
                    <option value="Tools">Tools</option>
                    <option value="Soft Skills">Soft Skills</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 flex justify-between">
                    <span>Proficiency</span>
                    <span className="text-indigo-600">{formData.level}%</span>
                </label>
                <input
                    type="range"
                    name="level"
                    min="1"
                    max="100"
                    value={formData.level}
                    onChange={handleChange}
                    className="mt-2 block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700">Icon (Class Name)</label>
                <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    placeholder="e.g. fab fa-node-js"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border p-2.5"
                />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                    disabled={isLoading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save Skill'}
                </button>
            </div>
        </form>
    );
};

export default SkillForm;