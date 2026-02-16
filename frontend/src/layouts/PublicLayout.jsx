import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../pages/public/Footer";
import CreativeCursor from "../components/CreativeCursor";

const PublicLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      const totalScrollable = docHeight - winHeight;

      if (totalScrollable > 0) {
        const progress = scrollTop / totalScrollable;
        setScrollProgress(progress);
      }

      setIsScrolled(scrollTop > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/activity" },
    { name: "Contact", path: "/contact" },
  ];

  const getNavLinkClass = (isActive) =>
    `relative px-3 py-2 text-sm font-semibold transition-all duration-300 rounded-lg group ` +
    (isActive
      ? "text-blue-600 bg-blue-50/50 shadow-[0_0_15px_rgba(37,99,235,0.1)]"
      : "text-gray-600 hover:text-blue-500 hover:bg-gray-50");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      {/* <CreativeCursor /> */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-blue-600 origin-left z-[999]"
        style={{ scaleX: scrollProgress }}
      />
      {/* HEADER */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(255,255,255,0.95)"
            : "rgba(255,255,255,0.8)",
          boxShadow: isScrolled
            ? "0 4px 30px rgba(0,0,0,0.06)"
            : "0 0px 0px rgba(0,0,0,0)",
          backdropFilter: "blur(12px)",
        }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50 border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* LOGO */}
            <motion.div
              animate={{ scale: isScrolled ? 0.95 : 1 }}
              transition={{ duration: 0.25 }}
            >
              <Link to="/" className="flex items-center">
                <img
                  src="/logo/portfolio_logo-removebg.png"
                  alt="Logo"
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </motion.div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex space-x-1 lg:space-x-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => getNavLinkClass(isActive)}
                >
                  {({ isActive }) => (
                    <span className="relative">
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-1/2 bg-blue-600 rounded-full"
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* MOBILE BUTTON */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border-b border-gray-100"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
