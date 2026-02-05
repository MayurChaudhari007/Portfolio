
import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Skills = () => {
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

  const getCategoryColor = (category) => {
    switch (category) {
      case "Frontend":
        return "bg-blue-500";
      case "Backend":
        return "bg-emerald-500";
      case "Database":
        return "bg-orange-500";
      case "AI":
        return "bg-purple-600";
      case "Soft Skills":
        return "bg-pink-500";
      default:
        return "bg-indigo-500";
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        {/* --- HEADER SECTION --- */}
        <header className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight uppercase">
            Technical <span className="text-indigo-600">Proficiency</span>
          </h2>
          <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed italic">
            "A comprehensive overview of my technical stack and professional capabilities, 
            focused on building scalable digital solutions."
          </p>
        </header>

        {/* --- SKILLS GRID --- */}
        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {skills.length > 0 ? (
            skills.map((group, index) => (
              <div
                key={group.category || index}
                className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 md:p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group/card"
              >
                {/* Category Title with Icon Indicator */}
                <h3 className="text-xl font-black text-slate-800 mb-10 flex items-center justify-between uppercase tracking-tight">
                  {group.category}
                  <span
                    className={`w-3 h-3 rounded-full shadow-sm animate-pulse ${getCategoryColor(group.category)}`}
                  ></span>
                </h3>

                <div className="space-y-8">
                  {group.items &&
                    group.items.map((skill) => (
                      <div key={skill._id || skill.name} className="group/item">
                        {/* Skill Label and Percentage */}
                        <div className="flex justify-between items-center mb-2.5">
                          <span className="text-xs font-black text-slate-700 uppercase tracking-widest group-hover/item:text-indigo-600 transition-colors flex items-center">
                            {skill.icon && (
                              <i
                                className={`${skill.icon} mr-3 text-slate-300 group-hover/item:text-indigo-500 transition-colors text-base`}
                              ></i>
                            )}
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/50">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Animated Progress Bar */}
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden shadow-inner">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${getCategoryColor(group.category)}`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 shadow-inner">
              <i className="fa-solid fa-layer-group text-4xl text-slate-200 mb-4 block"></i>
              <p className="text-slate-400 font-bold uppercase tracking-widest">
                No technical skills indexed yet.
              </p>
            </div>
          )}
        </div>

        {/* --- FOOTER DECORATION --- */}
        <div className="mt-20 text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                Continuous Learning & Improvement
            </p>
        </div>
      </div>
    </div>
  );
};

export default Skills;