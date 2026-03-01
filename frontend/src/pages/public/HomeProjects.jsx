
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useQuery } from "@tanstack/react-query";
// import projectService from "../../services/projectService";

// /* ---------------- ANIMATION VARIANTS ---------------- */

// const sectionVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.18,
//       delayChildren: 0.2,
//     },
//   },
// };

// const headerVariants = {
//   hidden: { opacity: 0, y: 40 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, ease: "easeOut" },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 60, scale: 0.95 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { duration: 0.6, ease: "easeOut" },
//   },
// };

// /* ---------------- IMAGE SLIDER ---------------- */

// const ProjectImageSlider = ({ images, title }) => {
//   const [current, setCurrent] = useState(0);

//   const nextImage = (e) => {
//     e.preventDefault();
//     setCurrent((prev) => (prev + 1) % images.length);
//   };

//   const prevImage = (e) => {
//     e.preventDefault();
//     setCurrent((prev) => (prev - 1 + images.length) % images.length);
//   };

//   if (!images || images.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-full bg-slate-100 text-slate-400 italic text-xs">
//         No Image Available
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full h-full group/slider overflow-hidden">
//       <motion.img
//         src={images[current]}
//         alt={title}
//         className="w-full h-full object-cover"
//         whileHover={{ scale: 1.08 }}
//         transition={{ duration: 0.5 }}
//       />

//       {images.length > 1 && (
//         <>
//           <button
//             onClick={prevImage}
//             className="absolute cursor-cta left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-indigo-600 text-white p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all z-10"
//           >
//             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path d="M15 19l-7-7 7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </button>
//           <button
//             onClick={nextImage}
//             className="absolute cursor-cta right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-indigo-600 text-white p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all z-10"
//           >
//             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path d="M9 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </button>

//           <div className="absolute bottom-3 w-full flex justify-center gap-1.5 z-10">
//             {images.map((_, i) => (
//               <div
//                 key={i}
//                 className={`h-1 rounded-full transition-all duration-300 ${
//                   i === current ? "bg-white w-5" : "bg-white/40 w-1.5"
//                 }`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// /* ---------------- MAIN COMPONENT ---------------- */

// const HomeProjects = () => {

//   // 🔥 React Query caching for projects
//   const { data: featuredProjects = [], isLoading } = useQuery({
//     queryKey: ["projects"],
//     queryFn: async () => {
//       const response = await projectService.getProjects();
//       const allProjects = response.data || response;
//       return allProjects.filter((p) => p.featured).slice(0, 3);
//     },
//   });

//   if (isLoading || featuredProjects.length === 0) return null;

//   return (
//     <motion.section
//       initial={{ opacity: 0, y: 60 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-80px" }}
//       transition={{ duration: 0.7, ease: "easeOut" }}
//       className="bg-white py-16 md:py-24"
//     >
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">

//         {/* HEADER */}
//         <motion.div
//           variants={headerVariants}
//           className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4 text-center sm:text-left"
//         >
//           <div>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 uppercase">
//               Featured <span className="text-indigo-600">Work</span>
//             </h2>
//             <div className="mt-4 h-1.5 w-16 bg-indigo-600 rounded-full mx-auto sm:mx-0"></div>
//           </div>

//           <Link
//             to="/projects"
//             className="hidden sm:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors group"
//           >
//             See all projects
//             <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1"></i>
//           </Link>
//         </motion.div>

//         {/* PROJECT GRID */}
//         <motion.div
//           variants={sectionVariants}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
//         >
//           {featuredProjects.map((project) => (
//             <motion.div
//               key={project._id}
//               variants={cardVariants}
//               whileHover={{
//                 y: -10,
//                 scale: 1.02,
//                 transition: { type: "spring", stiffness: 260, damping: 18 },
//               }}
//               className="group cursor-project flex flex-col h-full"
//             >
//               <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden transition-all duration-500 flex flex-col h-full border-b-4 hover:border-b-indigo-600 hover:shadow-[0_25px_60px_rgba(79,70,229,0.15)]">
                
//                 <div className="aspect-video bg-slate-50 relative overflow-hidden">
//                   <ProjectImageSlider images={project.images} title={project.title} />
//                 </div>

//                 <div className="p-6 md:p-8 flex flex-col flex-1">
//                   <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
//                     {project.title}
//                   </h3>

//                   <p className="text-slate-500 line-clamp-2 mb-6 text-sm font-medium leading-relaxed italic">
//                     "{project.description}"
//                   </p>

//                   <div className="flex flex-wrap gap-2 mb-8">
//                     {project.techStack?.slice(0, 4).map((tech, i) => (
//                       <span
//                         key={i}
//                         className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[9px] font-black uppercase rounded-md tracking-wider border border-indigo-100/50"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                   </div>

//                   <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
//                     <Link
//                       to="/projects"
//                       className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
//                     >
//                       View Details <i className="fa-solid fa-caret-right"></i>
//                     </Link>

//                     <div className="flex gap-4">
//                       {project.githubLink && (
//                         <a
//                           href={project.githubLink}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="text-slate-400 cursor-cta hover:text-slate-900 transition-colors"
//                         >
//                           <i className="fa-brands fa-github text-xl"></i>
//                         </a>
//                       )}
//                       {project.liveLink && (
//                         <a
//                           href={project.liveLink}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="text-slate-400 cursor-cta hover:text-indigo-600 transition-colors"
//                         >
//                           <i className="fa-solid fa-rocket text-lg"></i>
//                         </a>
//                       )}
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* MOBILE BUTTON */}
//         <motion.div variants={headerVariants} className="mt-12 sm:hidden text-center">
//           <Link
//             to="/projects"
//             className="inline-block px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl"
//           >
//             View All Projects →
//           </Link>
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// };

// export default HomeProjects;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import projectService from "../../services/projectService";

/* ---------------- ANIMATION VARIANTS ---------------- */

const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
  // Added exit for repetitive scroll-up effect
  exit: { 
    opacity: 0, 
    transition: { staggerChildren: 0.1, staggerDirection: -1 } 
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -40 }
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -60, scale: 0.95 }
};

/* ---------------- IMAGE SLIDER (Kept Original) ---------------- */

const ProjectImageSlider = ({ images, title }) => {
  const [current, setCurrent] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-100 text-slate-400 italic text-xs">
        No Image Available
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group/slider overflow-hidden">
      <motion.img
        src={images[current]}
        alt={title}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.5 }}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute cursor-cta left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-indigo-600 text-white p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all z-10"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className="absolute cursor-cta right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-indigo-600 text-white p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all z-10"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-3 w-full flex justify-center gap-1.5 z-10">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === current ? "bg-white w-5" : "bg-white/40 w-1.5"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

const HomeProjects = () => {

  const { data: featuredProjects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await projectService.getProjects();
      const allProjects = response.data || response;
      // ✅ Filtering logic restored: Only featured OR published
      return allProjects.filter((p) => p.featured || p.isPublished).slice(0, 3);
    },
  });

  if (isLoading || featuredProjects.length === 0) return null;

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      exit="exit" // Enable exit animation
      viewport={{ once: false, margin: "-120px" }} // Set once to false for repetition
      className="bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* HEADER */}
        <motion.div
          variants={headerVariants}
          className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4 text-center sm:text-left"
        >
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 uppercase">
              Featured <span className="text-indigo-600">Work</span>
            </h2>
            <div className="mt-4 h-1.5 w-16 bg-indigo-600 rounded-full mx-auto sm:mx-0"></div>
          </div>

          <Link
            to="/projects"
            className="hidden sm:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors group"
          >
            See all projects
            <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1"></i>
          </Link>
        </motion.div>

        {/* PROJECT GRID */}
        <motion.div
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project._id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 260, damping: 18 },
              }}
              className="group cursor-project flex flex-col h-full"
            >
              <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden transition-all duration-500 flex flex-col h-full border-b-4 hover:border-b-indigo-600 hover:shadow-[0_25px_60px_rgba(79,70,229,0.15)]">

                <div className="aspect-video bg-slate-50 relative overflow-hidden">
                  <ProjectImageSlider images={project.images} title={project.title} />
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-slate-500 line-clamp-2 mb-6 text-sm font-medium leading-relaxed italic">
                    "{project.description}"
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack?.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[9px] font-black uppercase rounded-md tracking-wider border border-indigo-100/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                    <Link
                      to={`/projects`}
                      className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      View Details <i className="fa-solid fa-caret-right"></i>
                    </Link>

                    <div className="flex gap-4">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-slate-400 cursor-cta hover:text-slate-900 transition-colors">
                          <i className="fa-brands fa-github text-xl"></i>
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-slate-400 cursor-cta hover:text-indigo-600 transition-colors">
                          <i className="fa-solid fa-rocket text-lg"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* MOBILE BUTTON */}
        <motion.div variants={headerVariants} className="mt-12 sm:hidden text-center">
          <Link
            to="/projects"
            className="inline-block px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl"
          >
            View All Projects →
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HomeProjects;