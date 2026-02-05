

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import postService from "../../services/postService";

// Stylish Mini Slider Component for Activity Cards
const BlogImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full group/slider overflow-hidden">
      <img
        src={images[current]} 
        className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
        alt="activity"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-indigo-600 text-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all z-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-indigo-600 text-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all z-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-3 w-full flex justify-center gap-1.5 z-10">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === current ? "bg-white w-6" : "bg-white/40 w-2"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const HomeBlogs = () => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = await postService.getPublicPosts();
        setRecentActivities((postData.data || postData).slice(0, 3));
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return null;

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Section - Responsive Alignment */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 uppercase">
              Blog-Post <span className="text-indigo-600">Milestones</span>
            </h2>
            <div className="mt-4 h-1.5 w-16 bg-indigo-600 rounded-full mx-auto md:mx-0"></div>
            <p className="mt-6 text-slate-600 text-base md:text-lg font-medium leading-relaxed italic">
              Documenting technical deep-dives and coding milestones.
            </p>
          </div>
          <Link
            to="/activity"
            className="text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-500 flex items-center gap-2 group transition-all"
          >
            Full Activity Log
            <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1"></i>
          </Link>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {recentActivities.map((post) => (
            <div
              key={post._id}
              className="flex flex-col bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
            >
              {/* Image Container */}
              <div className="relative h-64 md:h-72 bg-slate-200 overflow-hidden">
                {post.images && post.images.length > 0 ? (
                  <BlogImageSlider images={post.images} />
                ) : (
                  <div className="h-full flex items-center justify-center bg-indigo-50 text-indigo-200">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-5 left-5 z-20">
                  <span className="px-4 py-1.5 bg-white/95 backdrop-blur shadow-sm text-indigo-600 text-[10px] font-black uppercase tracking-[0.15em] rounded-full border border-indigo-50">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 md:p-10 flex flex-col flex-1">
                <time className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-4">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed line-clamp-3 mb-8 font-medium italic">
                  "{post.content}"
                </p>
                <div className="mt-auto">
                  <Link
                    to={`/activity`}
                    className="inline-flex items-center text-[10px] font-black text-indigo-600 uppercase tracking-widest group/link hover:text-indigo-800 transition-colors"
                  >
                    View Update
                    <i className="fa-solid fa-chevron-right ml-2 text-[8px] transition-transform group-hover/link:translate-x-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fallback for Empty State */}
        {recentActivities.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold uppercase tracking-widest">Fresh updates are on the way!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeBlogs;