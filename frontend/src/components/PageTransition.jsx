// import React from "react";
// import { motion } from "framer-motion";

// const pageVariants = {
//   initial: { opacity: 0, y: 30 },
//   in: { opacity: 1, y: 0 },
//   out: { opacity: 0, y: -30 },
// };

// const pageTransition = {
//   duration: 0.5,
//   ease: "easeInOut",
// };

// const PageTransition = ({ children }) => {
//   return (
//     <motion.div
//       variants={pageVariants}
//       initial="initial"
//       animate="in"
//       exit="out"
//       transition={pageTransition}
//       className="min-h-screen"
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default PageTransition;


import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -30 },
};

const pageTransition = {
  duration: 0.45,
  ease: "easeInOut",
};

const PageTransition = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // --- ROUTE CHANGE SCROLL RESET ---
    // instant jump to top when navigating pages
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // --- ANCHOR LINK HANDLING (#section) ---
    // smooth scroll when navigating to internal anchors
    if (location.hash) {
      const id = location.hash.replace("#", "");

      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 350); // wait until page animation completes
    }

  }, [location.pathname, location.hash]);

  return (
    <motion.div
      key={location.pathname}
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
