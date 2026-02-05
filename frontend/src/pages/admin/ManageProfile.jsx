

import React, { useState, useEffect } from "react";
import api from "../../services/api";

const ManageProfile = () => {
  const [profile, setProfile] = useState({ profileImage: "", resumeUrl: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/profile");
      if (data.success) setProfile(data.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    setLoading(true);
    try {
      const { data } = await api.post("/profile/upload", formData);
      if (data.success) setProfile(data.data);
    } catch (err) {
      alert("Upload failed. Ensure file size is within limits.");
    }
    setLoading(false);
  };

  const handleRemove = async (type) => {
    if (!window.confirm(`Permanently delete this ${type} from Cloudinary?`)) return;
    setLoading(true);
    try {
      const { data } = await api.delete("/profile/remove-asset", {
        data: { type },
      });
      if (data.success) setProfile(data.data);
    } catch (err) {
      alert("Removal failed");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
          Profile <span className="text-indigo-600">Assets</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Manage your global profile image and resume hosted on Cloudinary.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- PHOTO SECTION --- */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="w-full flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Identity Photo</h2>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">Cloudinary</span>
          </div>

          <div className="relative w-48 h-48 mb-8 group">
            {profile.profileImage ? (
              <div className="relative w-full h-full">
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-3xl object-cover border-8 border-slate-50 shadow-xl transition-transform group-hover:scale-[1.02]"
                />
                <button
                  onClick={() => handleRemove("photo")}
                  className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center font-bold"
                  title="Delete from Cloudinary"
                >✕</button>
              </div>
            ) : (
              <div className="w-full h-full rounded-3xl bg-slate-100 border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                <i className="fa-solid fa-image-portrait text-4xl mb-2"></i>
                <p className="text-xs font-bold">No Image</p>
              </div>
            )}
          </div>

          <label className="w-full">
            <input
              type="file"
              onChange={(e) => handleUpload(e, "photo")}
              className="hidden"
              accept="image/*"
            />
            <div className="cursor-pointer py-3 px-6 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg flex items-center justify-center gap-2">
              <i className="fa-solid fa-cloud-arrow-up"></i>
              {profile.profileImage ? "Change Photo" : "Upload Photo"}
            </div>
          </label>
        </div>

        {/* --- RESUME SECTION --- */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="w-full flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Professional CV</h2>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">PDF Only</span>
          </div>

          <div className="h-48 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center mb-8 p-6 text-center">
            {profile.resumeUrl ? (
              <div className="space-y-4">
                <i className="fa-solid fa-file-pdf text-5xl text-red-500"></i>
                <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold text-slate-500 truncate max-w-[200px]">Mayur_Resume_Cloud.pdf</p>
                    <div className="flex justify-center gap-2">
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase text-slate-600 hover:bg-slate-50"
                      >View</a>
                      <button
                        onClick={() => handleRemove("resume")}
                        className="px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase hover:bg-red-100"
                      >Remove</button>
                    </div>
                </div>
              </div>
            ) : (
              <div className="text-slate-400">
                <i className="fa-solid fa-file-circle-plus text-4xl mb-3"></i>
                <p className="text-sm font-medium">Drop your PDF resume here</p>
              </div>
            )}
          </div>

          <label className="w-full">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleUpload(e, "resume")}
              className="hidden"
            />
            <div className="cursor-pointer py-4 px-6 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
              <i className="fa-solid fa-file-import"></i>
              {profile.resumeUrl ? "Replace Resume" : "Upload Resume"}
            </div>
          </label>
        </div>
      </div>

      {/* Sync Status Overlay */}
      {loading && (
        <div className="fixed bottom-10 right-10 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce z-50 border border-slate-700">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-400 border-t-transparent"></div>
          <span className="text-xs font-black uppercase tracking-widest">Syncing Cloudinary...</span>
        </div>
      )}
    </div>
  );
};

export default ManageProfile;