// import React, { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import api from "../../services/api";

// const About = () => {
//   const [about, setAbout] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAbout = async () => {
//       try {
//         const res = await api.get("/about");
//         if (res.data.success) {
//           setAbout(res.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching about data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAbout();
//   }, []);

//   // if (loading) return <div className="text-center py-20">Loading...</div>;
//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   if (!about)
//     return <div className="text-center py-20">No about info found.</div>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-16 ">
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="p-8 md:p-12 bg-white">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">
//             {about.headline}
//           </h2>
//           <p className="text-gray-500 mb-8">{about.contactEmail}</p>

//           <article className="prose prose-blue max-w-none">
//             <ReactMarkdown>{about.bio}</ReactMarkdown>
//           </article>

//           {about.socialLinks && about.socialLinks.length > 0 && (
//             <div className="mt-8 pt-8 border-t border-gray-100">
//               <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
//                 Connect
//               </h3>
//               <div className="flex gap-4">
//                 {about.socialLinks.map((link, index) => (
//                   <a
//                     key={index}
//                     href={link.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-600 hover:text-blue-600 font-medium transition"
//                   >
//                     {link.platform}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

// ------------------------------------------------------------------------------------------





// import React, { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { Link } from "react-router-dom";
// import api from "../../services/api";

// const About = () => {
//   const [about, setAbout] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [aboutRes, profileRes] = await Promise.all([
//           api.get("/about"),
//           api.get("/profile")
//         ]);

//         if (aboutRes.data.success) setAbout(aboutRes.data.data);
//         if (profileRes.data.success) setProfile(profileRes.data.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//       </div>
//     );

//   if (!about)
//     return (
//       <div className="text-center py-32">
//         <p className="text-slate-400 italic">No biographical information found.</p>
//       </div>
//     );

//   return (
//     <div className="bg-white min-h-screen">
//       {/* --- HERO SECTION --- */}
//       <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
//             {/* Image Container - Order first on mobile, right side on desktop */}
//             <div className="lg:col-span-5 order-first lg:order-last">
//               <div className="relative max-w-sm mx-auto lg:max-w-none">
//                 {/* Decorative Blur Backgrounds */}
//                 <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
//                 <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

//                 {/* Main Photo Card */}
//                 <div className="relative aspect-[4/5] rounded-[2.5rem] bg-slate-100 border border-slate-200 overflow-hidden shadow-2xl transition-transform hover:rotate-2 duration-500">
//                   {profile?.profileImage ? (
//                     <img 
//                       src={profile.profileImage} 
//                       alt={about.fullName || "Profile"} 
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-slate-300 italic">No Image</div>
//                   )}
//                   <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent"></div>
//                 </div>

//                 {/* Floating Contact Badge - Hidden on very small screens, shown on MD+ */}
//                 <div className="absolute -bottom-6 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-4 animate-in slide-in-from-right duration-700">
//                   <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
//                     <i className="fa-solid fa-envelope text-xl"></i>
//                   </div>
//                   <div className="pr-4 text-left">
//                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Available for hire</p>
//                     <p className="text-xs font-bold text-slate-800">{about.contactEmail}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Text Content Area */}
//             <div className="lg:col-span-7 text-center lg:text-left">
//               <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-indigo-100">
//                 Full Stack Developer
//               </span>
              
//               <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight uppercase">
//                 {about.headline.split(" ").map((word, i, arr) => (
//                   <span key={i}>
//                     {i === arr.length - 1 ? <span className="text-indigo-600">{word}</span> : word + " "}
//                   </span>
//                 ))}
//               </h1>

//               {/* Responsive Markdown Text */}
//               <div className="prose prose-slate prose-sm sm:prose-base md:prose-lg text-slate-600 max-w-none mb-10 leading-relaxed font-medium italic">
//                 <ReactMarkdown>{about.bio}</ReactMarkdown>
//               </div>

//               {/* Buttons & Socials */}
//               <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
//                 <Link
//                   to="/projects"
//                   className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl hover:-translate-y-1 text-center"
//                 >
//                   View Projects
//                 </Link>
//                 <div className="flex items-center gap-6">
//                   {about.socialLinks?.map((link, index) => (
//                     <a
//                       key={index}
//                       href={link.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-slate-400 hover:text-indigo-600 transition-all transform hover:scale-110"
//                       title={link.platform}
//                     >
//                       <span className="text-[10px] font-black uppercase tracking-widest">
//                         {link.platform}
//                       </span>
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- RESPONSIVE STATS SECTION --- */}
//       <section className="py-12 bg-slate-50 border-y border-slate-100">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4">
//             <StatItem label="Tech Stack" value="MERN" />
//             <StatItem label="Education" value="MCA" />
//             <StatItem label="Location" value="India" />
//             <StatItem label="Status" value="Open to Work" />
//           </div>
//         </div>
//       </section>

//       {/* --- CONNECT SECTION --- */}
//       <section className="py-20 md:py-32 bg-white">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">
//             Let's build something <span className="text-indigo-600">digital</span>.
//           </h2>
//           <p className="text-slate-500 text-base md:text-xl mb-12 max-w-2xl mx-auto font-medium">
//             Interested in collaborating or just want to say hi?
//           </p>
//           <Link
//             to="/contact"
//             className="inline-block w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 hover:shadow-none"
//           >
//             Get in Touch
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// const StatItem = ({ label, value }) => (
//   <div className="text-center">
//     <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
//     <p className="text-lg md:text-2xl font-black text-slate-800 tracking-tight">{value}</p>
//   </div>
// );

// export default About;




import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

/* ---------------- ANIMATION ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/* ---------------- MAIN COMPONENT ---------------- */

const About = () => {

  /* React Query (production caching) */
  const { data: about, isLoading: aboutLoading } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await api.get("/about");
      return res.data?.data;
    },
  });

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/profile");
      return res.data?.data;
    },
  });

  if (aboutLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (!about)
    return (
      <div className="text-center py-32">
        <p className="text-slate-400 italic">
          No biographical information found.
        </p>
      </div>
    );

  return (
    <div className="bg-white min-h-screen">

      {/* ---------------- HERO ---------------- */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* IMAGE */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-5 order-first lg:order-last"
            >
              <div className="relative max-w-sm mx-auto lg:max-w-none">

                <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

                <div className="relative aspect-[4/5] rounded-[2.5rem] bg-slate-100 border border-slate-200 overflow-hidden shadow-2xl transition-transform hover:rotate-2 duration-500">
                  {profile?.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={about.fullName || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 italic">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent"></div>
                </div>

                {/* CONTACT BADGE */}
                <motion.div
                  variants={fadeUp}
                  className="absolute -bottom-6 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
                    <i className="fa-solid fa-envelope text-xl"></i>
                  </div>
                  <div className="pr-4 text-left">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      Available for hire
                    </p>
                    <p className="text-xs font-bold text-slate-800">
                      {about.contactEmail}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* TEXT */}
            <motion.div
              variants={container}
              className="lg:col-span-7 text-center lg:text-left"
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-indigo-100"
              >
                Full Stack Developer
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight uppercase"
              >
                {about.headline.split(" ").map((word, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? (
                      <span className="text-indigo-600">{word}</span>
                    ) : (
                      word + " "
                    )}
                  </span>
                ))}
              </motion.h1>

              <motion.div
                variants={fadeUp}
                className="prose prose-slate prose-sm sm:prose-base md:prose-lg text-slate-600 max-w-none mb-10 leading-relaxed font-medium italic"
              >
                <ReactMarkdown>{about.bio}</ReactMarkdown>
              </motion.div>

              {/* ACTIONS */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8"
              >
                <Link
                  to="/projects"
                  className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl hover:-translate-y-1 text-center"
                >
                  View Projects
                </Link>

                <div className="flex items-center gap-6">
                  {about.socialLinks?.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-indigo-600 transition-all transform hover:scale-110"
                      title={link.platform}
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {link.platform}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ---------------- STATS ---------------- */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4">
            <StatItem label="Tech Stack" value="MERN" />
            <StatItem label="Education" value="MCA" />
            <StatItem label="Location" value="India" />
            <StatItem label="Status" value="Open to Work" />
          </div>
        </div>
      </section>

      {/* ---------------- CONNECT ---------------- */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">
            Let's build something <span className="text-indigo-600">digital</span>.
          </h2>

          <p className="text-slate-500 text-base md:text-xl mb-12 max-w-2xl mx-auto font-medium">
            Interested in collaborating or just want to say hi?
          </p>

          <Link
            to="/contact"
            className="inline-block w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 hover:shadow-none"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

/* ---------------- STAT ITEM ---------------- */

const StatItem = ({ label, value }) => (
  <div className="text-center">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
      {label}
    </p>
    <p className="text-lg md:text-2xl font-black text-slate-800 tracking-tight">
      {value}
    </p>
  </div>
);

export default About;
