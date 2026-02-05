import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
import ManageProfile from './pages/admin/ManageProfile';

// Public Pages
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Skills from "./pages/public/Skills";
import Projects from "./pages/public/Projects";
import BlogList from "./pages/public/BlogList";
import BlogPost from "./pages/public/BlogPost";
import Contact from './pages/public/ContactForm';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* 1. Public Routes: Accessible by everyone */}
          
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            
            <Route path="/contact" element={<Contact />} />
            <Route path="/activity" element={<BlogList />} />
            <Route path="/activity/:slug" element={<BlogPost />} />
          </Route>

          {/* 2. Authentication Route: Public, but usually redirects if already logged in */}
          <Route path="/admin/login" element={<Login />} />

          {/* 3. Protected Admin Routes: Requires valid Token/User state */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/profile" element={<ManageProfile />} />
              <Route path="/admin/about" element={<ManageAbout />} />
              <Route path="/admin/skills" element={<ManageSkills />} />
              <Route path="/admin/projects" element={<ManageProjects />} />
              <Route path="/admin/posts" element={<ManagePosts />} />
              <Route path="/admin/posts/new" element={<CreatePost />} />
              {/* <Route path="/admin/posts/edit/:slug" element={<CreatePost />} /> */}
              <Route path="/admin/posts/edit/:id" element={<EditPost />} />
            </Route>
          </Route>

          {/* 4. Catch-all: Redirect any broken links back to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;