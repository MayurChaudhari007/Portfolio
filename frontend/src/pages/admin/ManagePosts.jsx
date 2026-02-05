


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import postService from "../../services/postService";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await postService.getPublicPosts();
      setPosts(res.data || res || []);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this timeline update from Cloudinary?")) {
      try {
        await postService.deletePost(id);
        setPosts(posts.filter((post) => post._id !== id));
      } catch (error) {
        alert("Failed to delete the post.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
            Timeline <span className="text-indigo-600">Feed</span>
          </h2>
          <p className="text-slate-500 font-medium italic">Manage your technical deep-dives and milestones.</p>
        </div>
        <Link
          to="/admin/posts/new"
          className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-plus"></i>
          New Update
        </Link>
      </div>

      {/* --- DESKTOP TABLE VIEW (Visible on LG screens) --- */}
      <div className="hidden lg:block bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Content Preview</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Assets</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {posts.map((post) => (
              <tr key={post._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6 max-w-md">
                  <p className="text-slate-800 text-sm font-medium line-clamp-2 italic mb-2">"{post.content}"</p>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{new Date(post.createdAt).toLocaleDateString()}</span>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
                    {post.category}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex -space-x-2">
                    {post.images?.slice(0, 3).map((img, i) => (
                      <img key={i} src={img} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover bg-slate-100 shadow-sm" />
                    ))}
                    {post.images?.length > 3 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 shadow-sm">
                        +{post.images.length - 3}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-6 text-right">
                   <div className="flex justify-end gap-4">
                      <button onClick={() => navigate(`/admin/posts/edit/${post._id}`)} className="text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800">Edit</button>
                      <button onClick={() => handleDelete(post._id)} className="text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-700">Delete</button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE/TABLET CARD VIEW (Visible on screens < LG) --- */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                {post.category}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-slate-800 text-sm font-medium leading-relaxed italic mb-6">"{post.content}"</p>
            
            <div className="flex justify-between items-center pt-4 border-t border-slate-50">
               <div className="flex -space-x-2">
                  {post.images?.slice(0, 2).map((img, i) => (
                    <img key={i} src={img} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  ))}
               </div>
               <div className="flex gap-4">
                  <button onClick={() => navigate(`/admin/posts/edit/${post._id}`)} className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Edit</button>
                  <button onClick={() => handleDelete(post._id)} className="text-[10px] font-black uppercase tracking-widest text-red-500">Delete</button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold uppercase tracking-widest">No updates found. Start sharing your journey!</p>
        </div>
      )}
    </div>
  );
};

export default ManagePosts;