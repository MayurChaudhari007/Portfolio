



import React, { useState, useEffect } from "react";
import projectService from "../../services/projectService";
import ProjectForm from "../../components/admin/ProjectForm";

// --- SUB-COMPONENT: REFINED PROJECT CARD ---
const ProjectAdminCard = ({ project, onEdit, onDelete }) => {
  const [currentImg, setCurrentImg] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImg(
      (prev) => (prev - 1 + project.images.length) % project.images.length,
    );
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Image Slider Section */}
      <div className="h-52 bg-slate-100 relative overflow-hidden">
        {project.images && project.images.length > 0 ? (
          <>
            <img
              src={project.images[currentImg]} // Directly use Cloudinary URL
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[9px] font-black px-2.5 py-1 rounded-full backdrop-blur-md">
                  {currentImg + 1} / {project.images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 italic text-xs">No Image Available</div>
        )}

        {project.featured && (
          <span className="absolute top-4 left-4 bg-indigo-600 text-white text-[9px] uppercase font-black px-3 py-1 rounded-full shadow-lg z-10">
            Featured
          </span>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-black text-slate-900 mb-1 truncate uppercase tracking-tight">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack?.slice(0, 3).map((tech, i) => (
            <span key={i} className="text-[9px] font-black text-indigo-500 uppercase bg-indigo-50 px-2 py-0.5 rounded-md">
                {tech}
            </span>
          ))}
        </div>
        
        <p className="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed italic">
          "{project.description}"
        </p>

        {/* Quick Link Verification */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="py-2 bg-slate-50 text-slate-600 text-[10px] font-black uppercase text-center rounded-xl hover:bg-slate-100 transition">GitHub</a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer" className="py-2 bg-blue-50 text-blue-600 text-[10px] font-black uppercase text-center rounded-xl hover:bg-blue-100 transition">Live Demo</a>
          )}
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-50">
          <button
            onClick={() => onEdit(project)}
            className="text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition"
          >Edit Details</button>
          <button
            onClick={() => onDelete(project._id)}
            className="text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition"
          >Delete</button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN MANAGEMENT COMPONENT ---
const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await projectService.getProjects();
      const projectData = response.data || response;
      setProjects(Array.isArray(projectData) ? projectData : projectData.data || []);
    } catch (err) {
      setError("Failed to load projects library.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateClick = () => {
    setCurrentProject(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure? This will permanently delete the project and its images from Cloudinary.")) {
      try {
        await projectService.deleteProject(id);
        setProjects(projects.filter((p) => p._id !== id));
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      if (currentProject) {
        await projectService.updateProject(currentProject._id, formData);
      } else {
        await projectService.createProject(formData);
      }
      await fetchProjects();
      setIsModalOpen(false);
    } catch (err) {
      alert("Save failed. Please check form data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
            Projects <span className="text-indigo-600">Inventory</span>
          </h2>
          <p className="text-slate-500 font-medium italic">Manage showcase items and Cloudinary galleries.</p>
        </div>
        <button
          onClick={handleCreateClick}
          className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-600 shadow-xl transition-all"
        >
          + Add New Project
        </button>
      </div>

      {isLoading && projects.length === 0 ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <ProjectAdminCard
              key={project._id}
              project={project}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
          {projects.length === 0 && !isLoading && (
            <div className="col-span-full py-20 bg-white border-2 border-dashed border-slate-200 rounded-[2rem] text-center">
                <p className="text-slate-400 font-bold uppercase tracking-widest">No projects found.</p>
            </div>
          )}
        </div>
      )}

      {/* --- RESPONSIVE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-white/20 animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                {currentProject ? "🛠 Edit Project Details" : "🚀 Launch New Project"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded-full transition text-slate-400">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
            <div className="p-8 overflow-y-auto">
              <ProjectForm
                initialData={currentProject}
                onSubmit={handleFormSubmit}
                onCancel={() => setIsModalOpen(false)}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;