


import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Auto-close sidebar when route changes (on mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    const navItems = [
        { label: 'Dashboard', path: '/admin/dashboard', icon: 'fa-chart-line' },
        { label: 'Profile & Resume', path: '/admin/profile', icon: 'fa-user-gear' },
        { label: 'About', path: '/admin/about', icon: 'fa-address-card' },
        { label: 'Skills', path: '/admin/skills', icon: 'fa-screwdriver-wrench' },
        { label: 'Projects', path: '/admin/projects', icon: 'fa-layer-group' },
        { label: 'Posts', path: '/admin/posts', icon: 'fa-pen-nib' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans relative">
            
            {/* --- MOBILE TOP BAR --- */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-800 text-white flex items-center justify-between px-6 z-40 shadow-md">
                <h1 className="text-lg font-bold tracking-wider">PORTFOLIO MANAGE</h1>
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-md hover:bg-slate-700 focus:outline-none"
                >
                    <i className={`fa-solid ${isSidebarOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
                </button>
            </div>

            {/* --- SIDEBAR BACKDROP (Mobile Only) --- */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* --- SIDEBAR --- */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
                lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-16 flex items-center justify-center border-b border-slate-800">
                    <h1 className="text-xl font-black tracking-widest text-indigo-400">PORTFOLIO CMS</h1>
                </div>

                <nav className="flex-1 py-8 overflow-y-auto">
                    <ul className="space-y-2 px-4">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 font-bold ${
                                        location.pathname === item.path
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                                >
                                    <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-6 border-t border-slate-800 bg-slate-900/50">
                    <div className="flex items-center gap-4 mb-6 px-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-sm font-black shadow-lg">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-bold truncate max-w-[140px]">{user?.username || 'Admin'}</p>
                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full py-3 px-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300"
                    >
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 md:p-12 mt-16 lg:mt-0">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;