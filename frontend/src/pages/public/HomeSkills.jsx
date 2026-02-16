import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../services/api";


const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
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

const HomeSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get("/skills");
        const data = res.data?.data || res.data || [];
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-16 md:py-24"
    >
      {/* Header */}
      <motion.div
        variants={headerVariants}
        className="mb-10 md:mb-14 text-center md:text-left"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Skills & <span className="text-indigo-600">Tech Stack</span>
        </h2>

        <div className="mt-4 h-1.5 w-20 bg-indigo-600 rounded-full mx-auto md:mx-0"></div>

        <p className="mt-6 text-slate-600 max-w-2xl text-base md:text-lg font-medium leading-relaxed">
          Technologies and tools I use to design, build, and scale real-world
          applications.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        variants={sectionVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
      >
        {skills.map((group, index) => (
          <motion.div
            key={group.category || index}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            className="relative group rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100/50"
          >
            {/* Gradient Accent */}
            <div className="absolute inset-x-0 -top-px h-1 rounded-t-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"></div>

            {/* Category */}
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                {group.category}
              </h3>
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                Stack
              </span>
            </div>

            {/* Skill Pills */}
            <div className="flex flex-wrap gap-2.5">
              {group.items?.slice(0, 10).map((skill) => (
                <span
                  key={skill._id || skill.name}
                  className="px-4 py-2 cursor-skill text-xs font-bold rounded-xl 
                           bg-slate-50 text-slate-600 border border-slate-100
                           transition-all duration-300
                           hover:bg-indigo-600 hover:text-white hover:border-indigo-600
                           hover:shadow-lg hover:shadow-indigo-200 cursor-default"
                >
                  {skill.name}
                </span>
              ))}
            </div>

            {/* Interaction Layer */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500 ring-2 ring-indigo-600/5"></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile Footer Tip */}
      <motion.div
        variants={headerVariants}
        className="mt-12 text-center md:hidden"
      >
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">
          Explore more projects to see these in action
        </p>
      </motion.div>
    </motion.section>
  );
};

export default HomeSkills;
