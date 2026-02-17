

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Footer = () => {
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/profile");
        if (data.success) {
          setResumeUrl(data.data.resumeUrl);
        }
      } catch (err) {
        console.error("Footer: Error fetching resume link", err);
      }
    };
    fetchProfile();
  }, []);

  const getDownloadUrl = (url) => {
    if (!url) return "#";
    return url.replace("/upload/", "/upload/fl_attachment/");
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-12 md:pt-16 pb-8 mt-10 md:mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Responsive Grid: Stacks on small screens (col-1), 3 columns on medium+ (md:grid-cols-3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12">
          {/* Brand Section - Centered on mobile, Left-aligned on desktop */}
          <div className="space-y-4 text-center md:text-left">
            <div className="text-2xl font-black text-gray-900 tracking-tighter">
              Mayur<span className="text-indigo-600"> Chaudhari</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Full Stack Developer & AI Enthusiast. Building digital experiences
              with the MERN stack and a passion for clean code.
            </p>
          </div>

          {/* Quick Links - Centered on mobile, Left-aligned on desktop */}
          <div className="text-center md:text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {["/", "/skills", "/projects", "/about", "/activity"].map(
                (path) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition"
                    >
                      {path === "/"
                        ? "Home"
                        : path.slice(1).charAt(0).toUpperCase() +
                          path.slice(2).replace("activity", "Blog-Post")}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Social & Connect - Centered on mobile, Left-aligned on desktop */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
              Connect
            </h4>
            <div className="flex gap-4 mb-6 justify-center md:justify-start">
              <a
                href="https://github.com/MayurChaudhari007"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all shadow-sm"
              >
                <i className="fa-brands fa-github text-lg"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/mayur-chaudhari-7949752ba/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              >
                <i className="fa-brands fa-linkedin-in text-lg"></i>
              </a>
              <a
                href="https://leetcode.com/u/ItsMeMayur/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
              >
                <i className="fa-solid fa-code text-sm"></i>
              </a>
              <a
                href="https://x.com/itsmemayur007"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all shadow-sm"
              >
                <i className="fa-brands fa-x-twitter text-lg"></i>X
              </a>
            </div>
            {resumeUrl && (
              <a
                href={getDownloadUrl(resumeUrl)}
                download
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition"
              >
                Download Resume <span className="text-lg">↓</span>
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar - Stacks into 2 rows on mobile, 1 row on desktop */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            © {new Date().getFullYear()} Mayur Chaudhari • Built with MERN &
            Cloudinary
          </p>
          <div className="flex gap-6">
            <Link
              to="/contact"
              className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600"
            >
              Contact
            </Link>
            <Link
              to="/admin/login"
              className="text-[10px] font-black uppercase tracking-widest text-gray-100 hover:text-gray-300 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
