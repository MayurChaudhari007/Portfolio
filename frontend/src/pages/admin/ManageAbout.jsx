


import React, { useState, useEffect } from "react";
import aboutService from "../../services/aboutService";

const ManageAbout = () => {
  const [formData, setFormData] = useState({
    headline: "",
    bio: "",
    contactEmail: "",
    socialLinks: [], 
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await aboutService.getAbout();
        const existingData = response.data || response;
        if (existingData && Object.keys(existingData).length > 0) {
          setFormData((prev) => ({ ...prev, ...existingData }));
        }
      } catch (err) {
        console.error("Error fetching about data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setIsSaving(true);

    try {
      await aboutService.updateAbout(formData);
      setMessage({
        type: "success",
        text: "Biographical details updated successfully!",
      });
      // Auto-clear message after 3 seconds
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      console.error("Error updating about:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to save changes.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
          Manage <span className="text-indigo-600">About Me</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Refine your professional headline and biographical story for your public profile.
        </p>
      </header>

      {/* Status Message */}
      {message.text && (
        <div
          className={`p-4 mb-8 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300 ${
            message.type === "success" 
              ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
              : "bg-red-50 text-red-700 border border-red-100"
          }`}
        >
          <i className={`fa-solid ${message.type === "success" ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
          <span className="text-sm font-bold uppercase tracking-tight">{message.text}</span>
        </div>
      )}

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Headline Input */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Professional Headline
            </label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              required
              placeholder="e.g. Full Stack Developer | AI/ML Enthusiast"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-800"
            />
          </div>

          {/* Bio Input */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Biographical Story (Markdown Supported)
            </label>
            <textarea
              name="bio"
              rows="8"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell your professional journey..."
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-600 leading-relaxed font-medium"
            ></textarea>
          </div>

          {/* Email Input */}
          <div className="space-y-2 max-w-md">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Contact Email
            </label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-800"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl hover:-translate-y-1 disabled:bg-slate-300 disabled:transform-none"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                  Saving Changes...
                </span>
              ) : (
                "Save Biographical Details"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Admin Tip */}
      <div className="mt-10 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
            <i className="fa-solid fa-lightbulb"></i>
        </div>
        <div>
            <h4 className="text-sm font-bold text-amber-900">Pro-Tip for Bio</h4>
            <p className="text-xs text-amber-700 leading-relaxed mt-1">
              You can use <strong>Markdown</strong> in your bio. Use **bold** for emphasis or # for headings. These will render beautifully on your public "About" page.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ManageAbout;