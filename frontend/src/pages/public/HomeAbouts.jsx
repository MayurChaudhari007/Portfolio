// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import api from "../../services/api";
// import Tilt from "react-parallax-tilt";

// const containerVariants = {
//   hidden: {},
//   show: {
//     transition: {
//       staggerChildren: 0.18,
//       delayChildren: 0.2,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

// const imageVariants = {
//   hidden: { opacity: 0, scale: 0.92, y: 30 },
//   show: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//     },
//   },
// };

// const HomeAbout = () => {
//   const [profile, setProfile] = useState({
//     profileImage: "",
//     resumeUrl: "",
//     fullName: "Mayur Gorakh Chaudhari",
//     headline: "MCA Student | Full Stack Developer | AI/ML Enthusiast",
//   });

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const { data } = await api.get("/profile");
//         if (data.success) {
//           setProfile(data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching profile for home page:", err);
//       }
//     };
//     fetchProfileData();
//   }, []);

//   const getDownloadUrl = (url) => {
//     if (!url) return "#";
//     return url.replace("/upload/", "/upload/fl_attachment/");
//   };

//   return (
//     <div >
//       <section className="relative py-12 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-transparent via-white/40 to-white">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//             {/* IMAGE AREA */}
//             <motion.div
//               variants={imageVariants}
//               initial="hidden"
//               animate="show"
//               className="relative order-first lg:order-last"
//             >
//               <Tilt
//                 tiltMaxAngleX={8}
//                 tiltMaxAngleY={8}
//                 perspective={1000}
//                 transitionSpeed={800}
//                 scale={1.03}
//                 gyroscope={true}
//                 className="aspect-square cursor-hero max-w-[320px] sm:max-w-md mx-auto rounded-[2.5rem] border-8 border-white shadow-2xl relative group"
//               >
//                 {profile.profileImage ? (
//                   <img
//                     src={profile.profileImage}
//                     alt={profile.fullName}
//                     className="w-full h-full object-cover rounded-[2.5rem] transition-transform duration-700 group-hover:scale-110"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 italic font-medium">
//                     No Profile Image
//                   </div>
//                 )}
//               </Tilt>
//             </motion.div>

//             {/* TEXT CONTENT */}
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate="show"
//               className="text-center lg:text-left"
//             >
//               <motion.span
//                 variants={itemVariants}
//                 className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest mb-6 border border-indigo-100"
//               >
//                 Welcome to my portfolio
//               </motion.span>

//               <motion.h1
//                 variants={itemVariants}
//                 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]"
//               >
//                 Hi, I’m{" "}
//                 <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                   {profile.fullName}
//                 </span>
//               </motion.h1>

//               <motion.p
//                 variants={itemVariants}
//                 className="mt-6 text-lg md:text-xl font-bold text-slate-700"
//               >
//                 MCA Student | Full Stack Developer | AI/ML Enthusiast
//               </motion.p>

//               <motion.p
//                 variants={itemVariants}
//                 className="mt-6 max-w-2xl text-base md:text-lg text-slate-600 leading-relaxed font-medium"
//               >
//                 I’m a passionate <strong>Full Stack Developer</strong> from
//                 India, currently pursuing my <strong>MCA</strong>. I focus on
//                 building scalable, real-world applications using the MERN Stack,
//                 Python, Flask, and Machine Learning.
//               </motion.p>

//               {/* BUTTONS */}
//               <motion.div
//                 variants={itemVariants}
//                 className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 mt-10"
//               >
//                 <Link
//                   to="/projects"
//                   className="px-8 py-4 cursor-cta bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl hover:-translate-y-1 text-center"
//                 >
//                   See My Work
//                 </Link>

//                 <Link
//                   to="/activity"
//                   className="px-8 py-4 cursor-cta bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl hover:-translate-y-1 text-center"
//                 >
//                   Read Blog
//                 </Link>

//                 {profile.resumeUrl && (
//                   <a
//                     href={getDownloadUrl(profile.resumeUrl)}
//                     download
//                     className="px-8 py-4 cursor-cta border-2 border-slate-200 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all text-center flex items-center justify-center gap-2"
//                   >
//                     Resume <i className="fa-solid fa-download"></i>
//                   </a>
//                 )}

//                 <Link
//                   to="/contact"
//                   className="px-8 py-4 cursor-cta border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all text-center"
//                 >
//                   Contact Me
//                 </Link>
//               </motion.div>

//               {/* SOCIAL LINKS */}
//               <motion.div
//                 variants={itemVariants}
//                 className="mt-8 flex justify-between gap-6 text-sm font-medium text-gray-600"
//               >
//                 <a
//                   href="https://github.com/MayurChaudhari007"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex cursor-cta items-center gap-2 hover:text-black transition-colors"
//                 >
//                   <i className="fa-brands fa-github text-lg"></i> GitHub
//                 </a>

//                 <a
//                   href="https://www.linkedin.com/in/mayur-chaudhari-7949752ba/"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex cursor-cta items-center gap-2 hover:text-blue-600 transition-colors"
//                 >
//                   <i className="fa-brands fa-linkedin text-lg"></i> LinkedIn
//                 </a>

//                 <a
//                   href="https://leetcode.com/u/ItsMeMayur/"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex cursor-cta items-center gap-2 hover:text-orange-600 transition-colors"
//                 >
//                   <i className="fa-solid fa-code text-lg"></i> LeetCode
//                 </a>

//                 <a
//                   href="https://x.com/itsmemayur007"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex cursor-cta items-center gap-2 hover:text-black transition-colors"
//                 >
//                   <i className="fa-brands fa-twitter text-lg"></i> X
//                 </a>
//               </motion.div>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomeAbout;




import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import Tilt from "react-parallax-tilt";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const HomeAbout = () => {

  // 🔥 React Query profile cache
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await api.get("/profile");
      return data.data;
    },
  });

  const getDownloadUrl = (url) => {
    if (!url) return "#";
    return url.replace("/upload/", "/upload/fl_attachment/");
  };

  // Prevent flicker while first load only
  if (isLoading) return null;

  return (
    <div>
      <section className="relative py-12 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-transparent via-white/40 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* IMAGE AREA */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="show"
              className="relative order-first lg:order-last"
            >
              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1000}
                transitionSpeed={800}
                scale={1.03}
                gyroscope={true}
                className="aspect-square cursor-hero max-w-[320px] sm:max-w-md mx-auto rounded-[2.5rem] border-8 border-white shadow-2xl relative group"
              >
                {profile?.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.fullName}
                    className="w-full h-full object-cover rounded-[2.5rem] transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 italic font-medium">
                    No Profile Image
                  </div>
                )}
              </Tilt>
            </motion.div>

            {/* TEXT CONTENT */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="text-center lg:text-left"
            >
              <motion.span
                variants={itemVariants}
                className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest mb-6 border border-indigo-100"
              >
                Welcome to my portfolio
              </motion.span>

              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]"
              >
                Hi, I’m{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {profile?.fullName}
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-6 text-lg md:text-xl font-bold text-slate-700"
              >
                MCA Student | Full Stack Developer | AI/ML Enthusiast
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="mt-6 max-w-2xl text-base md:text-lg text-slate-600 leading-relaxed font-medium"
              >
                I’m a passionate <strong>Full Stack Developer</strong> from
                India, currently pursuing my <strong>MCA</strong>. I focus on
                building scalable, real-world applications using the MERN Stack,
                Python, Flask, and Machine Learning.
              </motion.p>

              {/* BUTTONS */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 mt-10"
              >
                <Link
                  to="/projects"
                  className="px-8 py-4 cursor-cta bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl hover:-translate-y-1 text-center"
                >
                  See My Work
                </Link>

                <Link
                  to="/activity"
                  className="px-8 py-4 cursor-cta bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl hover:-translate-y-1 text-center"
                >
                  Read Blog
                </Link>

                {profile?.resumeUrl && (
                  <a
                    href={getDownloadUrl(profile.resumeUrl)}
                    download
                    className="px-8 py-4 cursor-cta border-2 border-slate-200 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all text-center flex items-center justify-center gap-2"
                  >
                    Resume <i className="fa-solid fa-download"></i>
                  </a>
                )}

                <Link
                  to="/contact"
                  className="px-8 py-4 cursor-cta border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all text-center"
                >
                  Contact Me
                </Link>
              </motion.div>

              {/* SOCIAL LINKS */}
              <motion.div
                variants={itemVariants}
                className="mt-8 flex justify-between gap-6 text-sm font-medium text-gray-600"
              >
                <a
                  href="https://github.com/MayurChaudhari007"
                  target="_blank"
                  rel="noreferrer"
                  className="flex cursor-cta items-center gap-2 hover:text-black transition-colors"
                >
                  <i className="fa-brands fa-github text-lg"></i> GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/mayur-chaudhari-7949752ba/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex cursor-cta items-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <i className="fa-brands fa-linkedin text-lg"></i> LinkedIn
                </a>

                <a
                  href="https://leetcode.com/u/ItsMeMayur/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex cursor-cta items-center gap-2 hover:text-orange-600 transition-colors"
                >
                  <i className="fa-solid fa-code text-lg"></i> LeetCode
                </a>

                <a
                  href="https://x.com/itsmemayur007"
                  target="_blank"
                  rel="noreferrer"
                  className="flex cursor-cta items-center gap-2 hover:text-black transition-colors"
                >
                  <i className="fa-brands fa-twitter text-lg"></i> X
                </a>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeAbout;
