
import React, { useState, useEffect } from "react";
import API_BASE from "../../config";
const ProjectForm = ({ onSubmit, initialData, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
    featured: false,
  });

  const [existingImages, setExistingImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Still needed for old local images, but Cloudinary links will skip this
  // const API_BASE = "http://localhost:5000";

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        githubLink: initialData.githubLink || "",
        liveLink: initialData.liveLink || "",
        featured: initialData.featured || false,
        techStack: Array.isArray(initialData.techStack)
          ? initialData.techStack.join(", ")
          : "",
      });
      setExistingImages(initialData.images || []);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const localPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(localPreviews);
  };

  const handleRemoveExisting = (indexToRemove) => {
    setExistingImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description || "");
    data.append("githubLink", formData.githubLink || "");
    data.append("liveLink", formData.liveLink || "");
    data.append("featured", formData.featured);

    const techArray = formData.techStack
      ? formData.techStack.split(",").map((item) => item.trim()).filter((i) => i)
      : [];
    data.append("techStack", JSON.stringify(techArray));

    // Send the list of existing Cloudinary URLs we want to KEEP
    data.append("existingImages", JSON.stringify(existingImages));

    // Add NEW files to be uploaded to Cloudinary
    selectedFiles.forEach((file) => {
      data.append("images", file);
    });

    onSubmit(data);
  };

  // Helper to safely render image previews
  const getImageUrl = (path) => {
    if (!path) return "";
    return path.startsWith('http') ? path : `${API_BASE}${path}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700">Project Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">GitHub Link</label>
          <input type="url" name="githubLink" value={formData.githubLink} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">Live Link</label>
          <input type="url" name="liveLink" value={formData.liveLink} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700">Tech Stack (comma separated)</label>
          <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="React, Node, Tailwind" className="w-full p-2 border rounded-lg" />
        </div>
      </div>

      {/* EXISTING IMAGES SECTION */}
      {existingImages.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Currently Saved Images</label>
          <div className="flex flex-wrap gap-4">
            {existingImages.map((img, index) => (
              <div key={index} className="relative w-20 h-20 group">
                <img
                  src={getImageUrl(img)}
                  className="w-full h-full object-cover rounded-lg border shadow-sm"
                  alt="saved"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExisting(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-lg hover:bg-red-600 transition-colors"
                >✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NEW UPLOADS SECTION */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Upload New Images</label>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-indigo-400 transition-colors">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        {previews.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {previews.map((url, i) => (
              <img key={i} src={url} className="w-16 h-16 object-cover rounded-lg border-2 border-indigo-200" alt="new preview" />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} id="featured_check" className="w-4 h-4 text-indigo-600 rounded" />
        <label htmlFor="featured_check" className="text-sm font-bold text-gray-700 italic">Feature this project on homepage</label>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t">
        <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-100 text-gray-600 font-bold rounded-full hover:bg-gray-200 transition" disabled={isLoading}>Cancel</button>
        <button type="submit" className="px-8 py-2 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 shadow-lg disabled:bg-indigo-300 transition" disabled={isLoading}>
          {isLoading ? "Saving..." : initialData ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;