


import React, { useState, useEffect } from "react";
import skillService from "../../services/skillService";
import SkillForm from "../../components/admin/SkillForm";

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [error, setError] = useState(null);

  const fetchSkills = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await skillService.getSkills();
      const data = response.data || response;

      // Logic to handle both flat and grouped skill responses
      if (Array.isArray(data) && data.length > 0 && data[0].items) {
        const flatList = data.flatMap((group) => group.items);
        setSkills(flatList);
      } else {
        setSkills(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      setError("Failed to load skills library. Check your connection.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleCreateClick = () => {
    setCurrentSkill(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (skill) => {
    setCurrentSkill(skill);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (!id) {
      alert("Error: ID is missing. Please refresh the page.");
      return;
    }

    if (window.confirm("Are you sure? This will remove the skill from your public profile.")) {
      try {
        await skillService.deleteSkill(id);
        setSkills(skills.filter((s) => s._id !== id));
      } catch (err) {
        alert("Failed to delete skill");
        console.error(err);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    setError(null);
    try {
      if (currentSkill) {
        const response = await skillService.updateSkill(currentSkill._id, formData);
        const updatedSkill = response.data || response;
        // Optimization: Locally update state before re-fetching
        setSkills(
          skills.map((s) => (s._id === currentSkill._id ? (updatedSkill.items ? updatedSkill.items[0] : updatedSkill) : s)),
        );
      } else {
        const response = await skillService.createSkill(formData);
        const newSkill = response.data || response;
        setSkills([...skills, newSkill]);
      }
      setIsModalOpen(false);
      fetchSkills(); // Ensure data remains synced with DB
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to save skill";
      alert(errorMsg);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
            Skills <span className="text-indigo-600">Library</span>
          </h2>
          <p className="text-slate-500 font-medium italic">Manage your technical proficiency levels.</p>
        </div>
        <button
          onClick={handleCreateClick}
          className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-plus"></i>
          Add New Skill
        </button>
      </div>

      {error && (
        <div className="p-4 mb-6 bg-red-50 text-red-700 border border-red-100 rounded-2xl text-xs font-bold uppercase tracking-tight flex items-center gap-2">
          <i className="fa-solid fa-circle-exclamation"></i>
          {error}
        </div>
      )}

      {/* Grid for Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.length === 0 ? (
          <div className="col-span-full py-20 bg-white border-2 border-dashed border-slate-200 rounded-[2rem] text-center">
            <p className="text-slate-400 font-bold uppercase tracking-widest">No skills added yet.</p>
          </div>
        ) : (
          skills.map((skill, index) => (
            <div key={skill._id || index} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                    <i className={`${skill.icon || 'fa-solid fa-bolt'} text-lg`}></i>
                  </div>
                  <h3 className="font-black text-slate-900 uppercase tracking-tight">{skill.name}</h3>
                </div>
                <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full ${
                  skill.category === "Soft Skills" ? "bg-purple-50 text-purple-600 border border-purple-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                }`}>
                  {skill.category}
                </span>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center px-1">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Proficiency</span>
                   <span className="text-xs font-black text-indigo-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 shadow-inner">
                  <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-50 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEditClick(skill)}
                  className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
                >Edit</button>
                <button 
                  onClick={() => handleDeleteClick(skill._id)}
                  className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                >Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Responsive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                {currentSkill ? "🛠 Update Skill" : "🚀 Add Skill"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded-full transition text-slate-400"
              >✕</button>
            </div>
            <div className="p-8 max-h-[75vh] overflow-y-auto">
              <SkillForm
                initialData={currentSkill}
                onSubmit={handleFormSubmit}
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSkills;