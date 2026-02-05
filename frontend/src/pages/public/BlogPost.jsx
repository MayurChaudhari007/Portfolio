

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import postService from '../../services/postService';
import API_BASE from "../../config";

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    // MATCHING YOUR PROJECT CODE STYLE:
    // const API_BASE = "http://localhost:5000";

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await postService.getPublicPosts(); 
                const foundPost = res.data.find(p => p.slug === slug);
                setPost(foundPost);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (!post) return (
        <div className="text-center py-32 bg-white">
            <h2 className="text-2xl font-bold text-gray-800">Activity not found</h2>
            <Link to="/" className="text-indigo-600 hover:text-indigo-500 mt-6 inline-flex items-center font-semibold">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Return to Activity Log
            </Link>
        </div>
    );

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                {/* Stylish Navigation Back */}
                <Link 
                    to="/" 
                    className="inline-flex items-center text-xs font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-colors mb-12 group"
                >
                    <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Back to Timeline
                </Link>

                {/* Post Header */}
                <header className="mb-12">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className="bg-indigo-50 text-indigo-600 text-[10px] uppercase font-black px-4 py-1.5 rounded-full tracking-widest border border-indigo-100">
                            {post.category}
                        </span>
                        <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                        <time className="text-gray-400 text-sm font-bold uppercase tracking-tight">
                            {new Date(post.createdAt).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </time>
                    </div>
                    
                    {/* The Main Content Display */}
                    <div className="relative">
                        <span className="absolute -left-6 top-0 text-6xl text-indigo-100 font-serif opacity-50">“</span>
                        <div className="text-gray-800 text-2xl md:text-3xl leading-relaxed font-medium italic whitespace-pre-wrap pl-2">
                            {post.content}
                        </div>
                    </div>
                </header>

                <hr className="border-gray-100 mb-16" />

                {/* Certificate/Image Showcase */}
                {post.images && post.images.length > 0 && (
                    <div className="space-y-12">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter flex items-center">
                                <span className="w-10 h-[3px] bg-indigo-600 mr-4 rounded-full"></span>
                                Visual Evidence & Media
                            </h3>
                            <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                {post.images.length} {post.images.length === 1 ? 'File' : 'Files'} Attached
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {post.images.map((img, index) => (
                                <div 
                                    key={index} 
                                    className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-gray-50 border border-gray-100"
                                >
                                    <img 
                                        src={`${API_BASE}${img}`} 
                                        alt={`Evidence ${index + 1}`} 
                                        className="w-full h-auto object-cover cursor-zoom-in group-hover:scale-[1.03] transition-transform duration-700"
                                        onClick={() => window.open(`${API_BASE}${img}`, '_blank')}
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                    
                                    {/* Expand Indicator */}
                                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bottom Navigation */}
                <footer className="mt-24 pt-12 border-t border-gray-50 flex justify-center">
                    <Link 
                        to="/activity"
                        className="px-8 py-3 bg-indigo-600 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                        Back to full log
                    </Link>
                </footer>
            </div>
        </div>
    );
};

export default BlogPost;