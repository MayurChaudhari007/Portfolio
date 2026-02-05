

import React, { useEffect, useState } from "react";
import postService from "../../services/postService";

// --- LIGHTBOX MODAL COMPONENT ---
const ImageLightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      {/* Close Button - Optimized for touch */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors z-[110]"
      >
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation - Prev (Desktop Only) */}
      {images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all p-2 rounded-full border border-white/20 hover:bg-white/10 hidden sm:block"
        >
          <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image Container */}
      <div className="relative w-full max-w-5xl max-h-[80vh] flex flex-col items-center">
        <img
          src={images[currentIndex]}
          alt="Full size view"
          className="w-full h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
        />
        
        {/* Responsive Controls & Info */}
        <div className="mt-6 flex items-center gap-8">
            {images.length > 1 && (
                <button onClick={onPrev} className="sm:hidden text-white/50 p-2"><i className="fa-solid fa-chevron-left text-xl"></i></button>
            )}
            <p className="text-white/60 font-black tracking-widest text-[10px] uppercase">
                Image {currentIndex + 1} / {images.length}
            </p>
            {images.length > 1 && (
                <button onClick={onNext} className="sm:hidden text-white/50 p-2"><i className="fa-solid fa-chevron-right text-xl"></i></button>
            )}
        </div>
      </div>

      {/* Navigation - Next (Desktop Only) */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all p-2 rounded-full border border-white/20 hover:bg-white/10 hidden sm:block"
        >
          <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

// --- GRID SLIDER COMPONENT ---
const ActivityImageSlider = ({ images, onImageClick }) => {
  const [current, setCurrent] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden group/slider rounded-2xl mb-4 bg-slate-100 aspect-video sm:aspect-auto">
      <img
        src={images[current]}
        className="w-full h-full sm:h-auto object-cover max-h-96 transition-transform duration-700 group-hover/slider:scale-105 cursor-zoom-in"
        alt="activity"
        onClick={() => onImageClick(images, current)}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover/slider:opacity-100 transition-all z-10 hidden sm:block"
          >
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover/slider:opacity-100 transition-all z-10 hidden sm:block"
          >
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === current ? "bg-white w-4" : "bg-white/40 w-1"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- MAIN BLOG LIST PAGE ---
const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], index: 0 });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await postService.getPublicPosts();
        setPosts(res.data || res || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const openLightbox = (images, index) => {
    setLightbox({ isOpen: true, images, index });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
    document.body.style.overflow = "auto";
  };

  const nextLightboxImage = () => {
    setLightbox((prev) => ({ ...prev, index: (prev.index + 1) % prev.images.length }));
  };

  const prevLightboxImage = () => {
    setLightbox((prev) => ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="bg-white pt-16 pb-12 md:pt-24 md:pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight uppercase">
            Activity <span className="text-indigo-600">Feed</span>
          </h2>
          <div className="h-1.5 w-20 bg-indigo-600 rounded-full mb-6 mx-auto md:mx-0"></div>
          <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto md:mx-0 italic">
            "Documenting my journey in development, certifications, and technical milestones."
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Column-based Grid for Masonry Look */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="break-inside-avoid bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 group border-b-4 hover:border-b-indigo-600"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[9px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
                  {post.category}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <p className="text-slate-700 font-medium leading-relaxed mb-8 text-sm md:text-base italic">
                "{post.content}"
              </p>

              {post.images && post.images.length > 0 && (
                <ActivityImageSlider
                  images={post.images}
                  onImageClick={openLightbox}
                />
              )}
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
              No activities indexed yet.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Implementation */}
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

export default BlogList;