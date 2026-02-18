// // ------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// // import { motion } from "framer-motion";
// import HomeSkills from "./HomeSkills";
// import HomeAbout from "./HomeAbouts";
// import HomeBlogs from "./HomeBlogs";
// import HomeProjects from "./HomeProjects";
// import { motion, useScroll, useTransform } from "framer-motion";

// const Home = () => {
//   const { scrollYProgress } = useScroll();
//   const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
//   const skillsY = useTransform(scrollYProgress, [0, 1], [0, -60]);

//   return (
//     <div className="relative isolate bg-white">
//       {/* Hero Section */}
//       <motion.div style={{ y: heroY }} className="relative overflow-hidden">
//         {/* Floating Background Layer */}
//         <motion.div
//           aria-hidden
//           className="pointer-events-none absolute inset-0 z-0"
//         >
//           {/* Blob 1 */}
//           <motion.div
//             animate={{
//               y: [0, -40, 0],
//               x: [0, 20, 0],
//             }}
//             transition={{
//               duration: 18,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//             className="absolute top-[-120px] left-[-80px] w-[420px] h-[420px] rounded-full bg-blue-500/20 blur-3xl"
//           />

//           {/* Blob 2 */}
//           <motion.div
//             animate={{
//               y: [0, 30, 0],
//               x: [0, -25, 0],
//             }}
//             transition={{
//               duration: 22,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//             className="absolute bottom-[-140px] right-[-80px] w-[460px] h-[460px] rounded-full bg-indigo-500/20 blur-3xl"
//           />
//         </motion.div>

//         {/* Hero Content (must stay above blobs) */}
//         <div className="relative z-10">
//           <HomeAbout />
//         </div>
//       </motion.div>
//       {/* Skills Section */}
//       <motion.div style={{ y: skillsY }}>
//         <HomeSkills />
//       </motion.div>
//       {/* Featured Projects Section */}
//       <HomeProjects />

//       {/* --- Attractive Activity/Blog Section --- */}
//       <HomeBlogs />
//     </div>
//   );
// };

// export default Home;




// ------------------------------------------------------------------------------------------

import React, { Suspense, lazy } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HomeAbout from "./HomeAbouts";

/* ---------------- LAZY LOAD BELOW FOLD ---------------- */

const HomeSkills = lazy(() => import("./HomeSkills"));
const HomeProjects = lazy(() => import("./HomeProjects"));
const HomeBlogs = lazy(() => import("./HomeBlogs"));

/* ---------------- SKELETON FALLBACKS ---------------- */

const SectionSkeleton = ({ height = "h-[400px]" }) => (
  <div className={`w-full ${height} animate-pulse bg-gradient-to-b from-white via-slate-50 to-white`} />
);

const Home = () => {

  /* ---------------- SCROLL PARALLAX ---------------- */

  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const skillsY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div className="relative isolate bg-white">

      {/* ---------------- HERO (LOAD FIRST ALWAYS) ---------------- */}
      <motion.div style={{ y: heroY }} className="relative overflow-hidden">

        {/* Animated Background Blobs */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-0">

          <motion.div
            animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-120px] left-[-80px] w-[420px] h-[420px] rounded-full bg-blue-500/20 blur-3xl"
          />

          <motion.div
            animate={{ y: [0, 30, 0], x: [0, -25, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-140px] right-[-80px] w-[460px] h-[460px] rounded-full bg-indigo-500/20 blur-3xl"
          />
        </motion.div>

        {/* HERO CONTENT */}
        <div className="relative z-10">
          <HomeAbout />
        </div>

      </motion.div>

      {/* ---------------- SKILLS (LAZY) ---------------- */}
      <motion.div style={{ y: skillsY }}>
        <Suspense fallback={<SectionSkeleton height="h-[500px]" />}>
          <HomeSkills />
        </Suspense>
      </motion.div>

      {/* ---------------- PROJECTS (LAZY) ---------------- */}
      <Suspense fallback={<SectionSkeleton height="h-[600px]" />}>
        <HomeProjects />
      </Suspense>

      {/* ---------------- BLOGS (LAZY) ---------------- */}
      <Suspense fallback={<SectionSkeleton height="h-[600px]" />}>
        <HomeBlogs />
      </Suspense>

    </div>
  );
};

export default Home;
