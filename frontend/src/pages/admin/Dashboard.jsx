



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import projectService from '../../services/projectService';
import postService from '../../services/postService';

/**
 * DashboardCard Component
 * Renders a statistic card with an icon and dynamic color.
 */
const DashboardCard = ({ title, count, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
    <div className={`p-4 rounded-xl ${color} text-white shadow-lg`}>
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{title}</h3>
      <p className="text-3xl font-black text-gray-900">{count}</p>
    </div>
  </div>
);

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ projects: 0, posts: 0, skills: 24 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch real-time counts from Cloudinary-integrated services
                const [projects, posts] = await Promise.all([
                    projectService.getProjects(),
                    postService.getPublicPosts()
                ]);
                
                setStats({
                    projects: (projects.data || projects).length,
                    posts: (posts.data || posts).length,
                    skills: 24 // Replace with real service if you have one
                });
            } catch (error) {
                console.error("Dashboard stats error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    /**
     * NOTE: The outer Sidebar div is removed because AdminLayout now handles it.
     */
    return (
        <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Overview</h2>
                    <p className="text-slate-500 font-medium italic">
                        {new Date().getHours() < 12 ? 'Good Morning' : 'Good Afternoon'}, {user?.username}!
                    </p>
                </div>
                <Link 
                    to="/" 
                    target="_blank" 
                    className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    View Live Site
                </Link>
            </header>

            {/* Statistics Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-slate-200 rounded-2xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <DashboardCard 
                        title="Total Projects" 
                        count={stats.projects} 
                        color="bg-blue-600"
                        icon={<i className="fa-solid fa-code text-xl"></i>} 
                    />
                    <DashboardCard 
                        title="Blog Updates" 
                        count={stats.posts} 
                        color="bg-indigo-600"
                        icon={<i className="fa-solid fa-newspaper text-xl"></i>} 
                    />
                    <DashboardCard 
                        title="Skills Listed" 
                        count={stats.skills} 
                        color="bg-emerald-600"
                        icon={<i className="fa-solid fa-screwdriver-wrench text-xl"></i>} 
                    />
                </div>
            )}

            {/* Featured Action Card */}
            <div className="bg-indigo-900 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
                <div className="relative z-10 max-w-xl">
                    <span className="px-3 py-1 bg-indigo-500/30 text-indigo-200 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6 inline-block border border-indigo-400/20">
                        Admin Tip
                    </span>
                    <h3 className="text-3xl font-bold mb-4">Keep your CV up to date.</h3>
                    <p className="text-indigo-200 mb-8 text-lg leading-relaxed">
                        Your resume is dynamically served from Cloudinary. Every time you upload a new PDF in Profile Settings, your public site downloads are instantly updated.
                    </p>
                    <Link 
                        to="/admin/profile" 
                        className="inline-block px-8 py-4 bg-white text-indigo-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl"
                    >
                        Update Profile & Resume
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl"></div>
            </div>
        </div>
    );
};

export default Dashboard;