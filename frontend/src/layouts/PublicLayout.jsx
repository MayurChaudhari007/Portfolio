

import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/public/Footer";

const PublicLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Auto-close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Dynamic styles for the main link
  const getNavLinkClass = (isActive) =>
    `relative px-3 py-2 text-sm font-semibold transition-all duration-300 rounded-lg group ` +
    (isActive
      ? "text-blue-600 bg-blue-50/50 shadow-[0_0_15px_rgba(37,99,235,0.1)]"
      : "text-gray-600 hover:text-blue-500 hover:bg-gray-50");

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/activity" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center transition-transform hover:scale-105"
            >
              <img 
                src="/logo/portfolio_logo-removebg.png" 
                alt="Logo" 
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation (Hidden on mobile) */}
            <nav className="hidden md:flex space-x-1 lg:space-x-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => getNavLinkClass(isActive)}
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      <div
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-blue-600 transition-all duration-300 rounded-full ${
                          isActive ? "w-1/2 opacity-100" : "w-0 opacity-0"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE NAVIGATION DROPDOWN --- */}
        {/* Backdrop for mobile menu */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1] md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        
        <div className={`
          md:hidden bg-white border-b border-gray-100 overflow-hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
        `}>
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-base font-bold transition-all ` +
                  (isActive
                    ? "bg-blue-50 text-blue-600 shadow-inner"
                    : "text-gray-600 hover:bg-gray-50")
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
};

export default PublicLayout;