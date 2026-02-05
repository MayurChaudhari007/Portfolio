


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const HomeAbout = () => {
  const [profile, setProfile] = useState({
    profileImage: "",
    resumeUrl: "",
    fullName: "Mayur Gorakh Chaudhari",
    headline: "MCA Student | Full Stack Developer | AI/ML Enthusiast",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await api.get("/profile");
        if (data.success) {
          setProfile(data.data);
        }
      } catch (err) {
        console.error("Error fetching profile for home page:", err);
      }
    };
    fetchProfileData();
  }, []);

  const getDownloadUrl = (url) => {
    if (!url) return "#";
    return url.replace("/upload/", "/upload/fl_attachment/");
  };

  return (
    <div className="bg-white">
      <section className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* --- IMAGE AREA --- */}
            {/* order-first on mobile, lg:order-last on desktop */}
            <div className="relative order-first lg:order-last">
              <div className="aspect-square max-w-[320px] sm:max-w-md mx-auto rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl relative group transition-transform duration-500 hover:rotate-1">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.fullName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 italic font-medium">
                    No Profile Image
                  </div>
                )}

                {/* Floating Status Badge */}
                {/* <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 animate-bounce">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm md:text-base shadow-lg shadow-green-200">
                    ✓
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Available for
                    </p>
                    <p className="text-xs md:text-sm font-black text-slate-900">
                      New Projects
                    </p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* --- TEXT CONTENT AREA --- */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest mb-6 border border-indigo-100">
                Welcome to my portfolio
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                Hi, I’m{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {profile.fullName}
                </span>
              </h1>
              
              <p className="mt-6 text-lg md:text-xl font-bold text-slate-700">
                MCA Student | Full Stack Developer | AI/ML Enthusiast
              </p>

              <p className="mt-6 max-w-2xl text-base md:text-lg text-slate-600 leading-relaxed font-medium">
                I’m a passionate <strong>Full Stack Developer</strong> from
                India, currently pursuing my <strong>MCA</strong>. I focus on
                building scalable, real-world applications using the MERN Stack,
                Python, Flask, and Machine Learning.
              </p>

              {/* Action Buttons - Stacked on Mobile, Row on Tablet+ */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 mt-10">
                <Link
                  to="/projects"
                  className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl hover:-translate-y-1 text-center"
                >
                  See My Work
                </Link>
                <Link
                  to="/activity"
                  className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl hover:-translate-y-1 text-center"
                >
                  Read Blog
                </Link>
                
                {profile.resumeUrl && (
                  <a
                    href={getDownloadUrl(profile.resumeUrl)}
                    download
                    className="px-8 py-4 border-2 border-slate-200 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all text-center flex items-center justify-center gap-2"
                  >
                    Resume <i className="fa-solid fa-download"></i>
                  </a>
                )}

                <Link
                  to="/contact"
                  className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all text-center"
                >
                  Contact Me
                  {/* <i className="fa-solid fa-code text-lg"></i> LeetCode */}
                </Link>
              </div>

              {/* Social Link Icons */}
              {/* <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 border-t border-slate-100 pt-8">
                {[
                  { name: 'GitHub', icon: 'fa-github', url: 'https://github.com/MayurChaudhari007' },
                  { name: 'LinkedIn', icon: 'fa-linkedin', url: 'https://www.linkedin.com/in/mayur-chaudhari-7949752ba/' },
                  { name: 'LeetCode', icon: 'fa-solid fa-code text-lg"', url: 'https://leetcode.com/u/ItsMeMayur/' },
                  { name: 'X', icon: 'fa-twitter', url: 'https://x.com/itsmemayur007' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-widest transition-colors group"
                  >
                    <i className={`fa-brands ${social.icon} text-lg group-hover:scale-125 transition-transform`}></i>
                    <span className="hidden sm:inline">{social.name}</span>
                  </a>
                ))}
              </div> */}
              <div className="mt-8 flex justify-between gap-6 text-sm font-medium text-gray-600">
                <a
                  href="https://github.com/MayurChaudhari007"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-black transition-colors"
                >
                  <i className="fa-brands fa-github text-lg"></i> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/mayur-chaudhari-7949752ba/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <i className="fa-brands fa-linkedin text-lg"></i> LinkedIn
                </a>
                <a
                  href="https://leetcode.com/u/ItsMeMayur/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-orange-600 transition-colors"
                >
                  <i className="fa-solid fa-code text-lg"></i> LeetCode
                </a>
                <a
                  href="https://x.com/itsmemayur007"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-black transition-colors"
                >
                  <i className="fa-brands fa-twitter text-lg"></i> X
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeAbout;