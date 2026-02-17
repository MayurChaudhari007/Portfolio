// import React, { useEffect, useState } from "react";
// import projectService from "../../services/projectService";

// // --- LIGHTBOX MODAL COMPONENT ---
// const ImageLightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
//   if (!images || images.length === 0) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">
//       {/* Close Button - Larger touch target on mobile */}
//       <button 
//         onClick={onClose}
//         className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors z-[110]"
//       >
//         <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//         </svg>
//       </button>

//       {/* Navigation - Prev */}
//       {images.length > 1 && (
//         <button 
//           onClick={onPrev}
//           className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all p-2 rounded-full border border-white/10 hover:bg-white/10 hidden sm:block"
//         >
//           <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//       )}

//       {/* Image Container */}
//       <div className="relative w-full max-w-5xl max-h-[80vh] flex flex-col items-center">
//         <img 
//           src={images[currentIndex]} 
//           alt="Full size view" 
//           className="w-full h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
//         />
        
//         {/* Image Counter & Mobile Controls */}
//         <div className="mt-6 flex items-center gap-8">
//             {images.length > 1 && (
//                 <button onClick={onPrev} className="sm:hidden text-white/50 p-2"><i className="fa-solid fa-chevron-left text-xl"></i></button>
//             )}
//             <p className="text-white/60 font-black tracking-widest text-xs uppercase">
//                 Item {currentIndex + 1} / {images.length}
//             </p>
//             {images.length > 1 && (
//                 <button onClick={onNext} className="sm:hidden text-white/50 p-2"><i className="fa-solid fa-chevron-right text-xl"></i></button>
//             )}
//         </div>
//       </div>

//       {/* Navigation - Next */}
//       {images.length > 1 && (
//         <button 
//           onClick={onNext}
//           className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all p-2 rounded-full border border-white/20 hover:bg-white/10 hidden sm:block"
//         >
//           <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       )}
//     </div>
//   );
// };

// // --- INDIVIDUAL PROJECT CARD ---
// const ProjectCard = ({ project, onImageClick }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [currentImg, setCurrentImg] = useState(0);

//   const handleNext = (e) => {
//     e.stopPropagation();
//     setCurrentImg((prev) => (prev + 1) % project.images.length);
//   };

//   const handlePrev = (e) => {
//     e.stopPropagation();
//     setCurrentImg((prev) => (prev - 1 + project.images.length) % project.images.length);
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
//       {/* Image Slider Area */}
//       <div 
//         className="relative h-48 sm:h-56 lg:h-60 overflow-hidden bg-slate-100 cursor-zoom-in"
//         onClick={() => onImageClick(project.images, currentImg)}
//       >
//         <img
//           src={project.images?.length > 0 ? project.images[currentImg] : "/placeholder.jpg"}
//           alt={project.title}
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//         />

//         {project.images?.length > 1 && (
//           <>
//             <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-indigo-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 hidden sm:block">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
//             </button>
//             <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-indigo-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 hidden sm:block">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
//             </button>
//             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
//               {project.images.map((_, i) => (
//                 <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentImg ? "bg-white w-5" : "bg-white/40 w-1.5"}`} />
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       <div className="p-6 md:p-8 flex flex-col flex-1">
//         <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">{project.title}</h3>
//         <div className="flex-1">
//           <p className={`${isExpanded ? "" : "line-clamp-3"} text-slate-500 transition-all text-sm leading-relaxed font-medium`}>
//             {project.description}
//           </p>
//           {project.description?.length > 120 && (
//             <button onClick={() => setIsExpanded(!isExpanded)} className="text-indigo-600 text-[10px] font-black mt-3 hover:underline tracking-widest uppercase">
//               {isExpanded ? "Show Less" : "Read Full Story"}
//             </button>
//           )}
//         </div>

//         <div className="flex flex-wrap gap-2 my-6">
//           {project.techStack?.map((tech, i) => (
//             <span key={i} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[9px] font-black uppercase rounded-lg border border-indigo-100/50">{tech}</span>
//           ))}
//         </div>

//         <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t border-slate-50">
//           {project.githubLink && (
//             <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition shadow-sm">
//               <i className="fa-brands fa-github text-base"></i> Source
//             </a>
//           )}
//           {project.liveLink && (
//             <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
//               <i className="fa-solid fa-rocket text-sm"></i> Live
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- MAIN PROJECTS PAGE ---
// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [lightbox, setLightbox] = useState({ isOpen: false, images: [], index: 0 });

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const data = await projectService.getProjects();
//         setProjects(data.data || data);
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   const openLightbox = (images, index) => {
//     setLightbox({ isOpen: true, images, index });
//     document.body.style.overflow = 'hidden';
//   };

//   const closeLightbox = () => {
//     setLightbox({ ...lightbox, isOpen: false });
//     document.body.style.overflow = 'auto';
//   };

//   const nextLightboxImage = () => {
//     setLightbox(prev => ({ ...prev, index: (prev.index + 1) % prev.images.length }));
//   };

//   const prevLightboxImage = () => {
//     setLightbox(prev => ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }));
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center min-h-[70vh]">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//     </div>
//   );

//   return (
//     <div className="bg-slate-50 min-h-screen">
//       <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
//         <header className="mb-12 md:mb-16 text-center">
//           <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight uppercase">
//             Project <span className="text-indigo-600">Showcase</span>
//           </h2>
//           <div className="h-1.5 w-20 bg-indigo-600 mx-auto rounded-full mb-6"></div>
//           <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed italic">
//             "Turning complex problems into elegant, functional digital solutions."
//           </p>
//         </header>

//         {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
//           {projects.map((project) => (
//             <ProjectCard 
//               key={project._id} 
//               project={project} 
//               onImageClick={openLightbox} 
//             />
//           ))}
//         </div>

//         {projects.length === 0 && (
//           <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
//              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No projects indexed yet.</p>
//           </div>
//         )}
//       </div>

//       {lightbox.isOpen && (
//         <ImageLightbox 
//           images={lightbox.images}
//           currentIndex={lightbox.index}
//           onClose={closeLightbox}
//           onNext={nextLightboxImage}
//           onPrev={prevLightboxImage}
//         />
//       )}
//     </div>
//   );
// };

// export default Projects;


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import projectService from "../../services/projectService";

/* ---------------- ANIMATION SYSTEM ---------------- */

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.04, duration: 0.3 },
  }),
};

/* ---------------- LIGHTBOX ---------------- */

const ImageLightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  if (!images || images.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
    >
      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors z-[110]"
      >
        ✕
      </button>

      {/* IMAGE AREA */}
      <div className="relative w-full max-w-5xl max-h-[80vh] flex flex-col items-center">

        {/* SMOOTH SLIDER */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="Full view"
            className="w-full h-full object-contain rounded-lg shadow-2xl"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x < -100) onNext();
              if (info.offset.x > 100) onPrev();
            }}
          />
        </AnimatePresence>

        {/* COUNTER */}
        <div className="mt-6">
          <p className="text-white/70 font-black tracking-widest text-xs uppercase">
            Image {currentIndex + 1} of {images.length}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- PROJECT CARD ---------------- */

const ProjectCard = ({ project, onImageClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % project.images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { type: "spring", stiffness: 260, damping: 18 },
      }}
      className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-500 flex flex-col h-full group cursor-project hover:shadow-2xl"
    >
      {/* IMAGE */}
      <div
        className="relative h-48 sm:h-56 lg:h-60 overflow-hidden bg-slate-100 cursor-zoom-in"
        onClick={() => onImageClick(project.images, currentImg)}
      >
        <motion.img
          src={project.images?.length > 0 ? project.images[currentImg] : "/placeholder.jpg"}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
        />

        {/* COUNTER */}
        {project.images?.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-md tracking-wider">
            {currentImg + 1} / {project.images.length}
          </div>
        )}

        {/* ARROWS */}
        {project.images?.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-indigo-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 hidden sm:block"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-indigo-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 hidden sm:block"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
          {project.title}
        </h3>

        <div className="flex-1">
          <p className={`${isExpanded ? "" : "line-clamp-3"} text-slate-500 text-sm leading-relaxed font-medium`}>
            {project.description}
          </p>

          {project.description?.length > 120 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-indigo-600 text-[10px] font-black mt-3 hover:underline tracking-widest uppercase"
            >
              {isExpanded ? "Show Less" : "Read Full Story"}
            </button>
          )}
        </div>

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-2 my-6">
          {project.techStack?.map((tech, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={tagVariants}
              initial="hidden"
              animate="show"
              className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[9px] font-black uppercase rounded-lg border border-indigo-100/50"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t border-slate-50">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition shadow-sm cursor-cta"
            >
              Source
            </a>
          )}

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 cursor-cta"
            >
              Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- MAIN PAGE ---------------- */

const Projects = () => {

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const data = await projectService.getProjects();
      return data.data || data;
    },
  });

  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    index: 0,
  });

  const openLightbox = (images, index) => {
    setLightbox({ isOpen: true, images, index });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
    document.body.style.overflow = "auto";
  };

  const nextLightboxImage = () => {
    setLightbox(prev => ({ ...prev, index: (prev.index + 1) % prev.images.length }));
  };

  const prevLightboxImage = () => {
    setLightbox(prev => ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }));
  };

  /* KEYBOARD NAVIGATION */
  useEffect(() => {
    const handleKey = (e) => {
      if (!lightbox.isOpen) return;

      if (e.key === "ArrowRight") nextLightboxImage();
      if (e.key === "ArrowLeft") prevLightboxImage();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="bg-slate-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">

        <motion.header
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight uppercase">
            Project <span className="text-indigo-600">Showcase</span>
          </h2>
          <div className="h-1.5 w-20 bg-indigo-600 mx-auto rounded-full mb-6"></div>
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onImageClick={openLightbox}
            />
          ))}
        </motion.div>
      </div>

      {lightbox.isOpen && (
        <ImageLightbox
          images={lightbox.images}
          currentIndex={lightbox.index}
          onClose={closeLightbox}
          onNext={nextLightboxImage}
          onPrev={prevLightboxImage}
        />
      )}
    </div>
  );
};

export default Projects;
