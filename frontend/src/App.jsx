
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";

// Admin Pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ManageAbout from "./pages/admin/ManageAbout";
import ManageSkills from "./pages/admin/ManageSkills";
import ManageProjects from "./pages/admin/ManageProjects";
import ManagePosts from "./pages/admin/ManagePosts";
import CreatePost from "./pages/admin/CreatePost";
import EditPost from "./pages/admin/EditPost";
import ManageProfile from "./pages/admin/ManageProfile";

// Public Pages
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Skills from "./pages/public/Skills";
import Projects from "./pages/public/Projects";
import BlogList from "./pages/public/BlogList";
import BlogPost from "./pages/public/BlogPost";
import Contact from "./pages/public/ContactForm";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/activity" element={<BlogList />} />
          <Route path="/activity/:slug" element={<BlogPost />} />
        </Route>

        {/* Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/profile" element={<ManageProfile />} />
            <Route path="/admin/about" element={<ManageAbout />} />
            <Route path="/admin/skills" element={<ManageSkills />} />
            <Route path="/admin/projects" element={<ManageProjects />} />
            <Route path="/admin/posts" element={<ManagePosts />} />
            <Route path="/admin/posts/new" element={<CreatePost />} />
            <Route path="/admin/posts/edit/:id" element={<EditPost />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimatedRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
