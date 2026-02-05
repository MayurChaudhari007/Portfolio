



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            });

            if (response.data.success) {
                // Update global state and localStorage via Context
                login(response.data.user, response.data.token);
                // Redirect to the dynamic admin dashboard
                navigate('/admin/dashboard');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError(
                err.response?.data?.message || 'Something went wrong. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 px-6">
            <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
                {/* Brand Logo/Title */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-[1.5rem] shadow-xl shadow-indigo-200 text-white mb-4">
                        <i className="fa-solid fa-lock text-2xl"></i>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                        Admin <span className="text-indigo-600">Portal</span>
                    </h2>
                    <p className="text-slate-500 font-medium mt-2 italic">Please sign in to manage your portfolio.</p>
                </div>

                {/* Login Card */}
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
                    {/* Error Message */}
                    {error && (
                        <div className="p-4 mb-6 text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3 animate-shake">
                            <i className="fa-solid fa-circle-exclamation text-base"></i>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <i className="fa-solid fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-800"
                                    placeholder="admin@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <i className="fa-solid fa-key absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-800"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-5 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-xl
                                ${loading 
                                    ? 'bg-slate-300 cursor-not-allowed' 
                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 active:transform active:scale-95'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                                    Authenticating...
                                </span>
                            ) : 'Sign In to Dashboard'}
                        </button>
                    </form>

                    {/* Decorative Element */}
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-50"></div>
                </div>

                <div className="mt-8 text-center">
                    <button 
                        onClick={() => navigate('/')}
                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                        ← Back to Public Site
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;