import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { user } = useAuth();

    // If no user, redirect to login
    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    // If user is not admin (optional, if you have other roles)
    if (user.role !== 'admin') {
        // You might want a 'Not Authorized' page or just redirect home
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
