import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsClient } from "usehooks-ts";

const CreativeCursor = () => {
  const isClient = useIsClient();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState("default");

  // Disable cursor on touch devices
  const isTouchDevice =
    isClient && window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    if (!isClient || isTouchDevice) return;

    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);

    document.querySelectorAll("*").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        if (el.closest(".cursor-project")) {
          setHoverType("project");
          setIsHovering(true);
        } else if (el.closest(".cursor-hero")) {
          setHoverType("hero");
          setIsHovering(true);
        } else if (el.closest(".cursor-skill")) {
          setHoverType("skill");
          setIsHovering(true);
        } else if (el.closest("a, button")) {
          setHoverType("cta");
          setIsHovering(true);
        } else {
          setHoverType("default");
          setIsHovering(false);
        }
      });

      el.addEventListener("mouseleave", () => {
        setHoverType("default");
        setIsHovering(false);
      });
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      document.querySelectorAll("a, button, .group").forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [isClient, isTouchDevice]);

  if (!isClient || isTouchDevice) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-3 h-3 rounded-full bg-indigo-600"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale:
            hoverType === "project"
              ? 2.4
              : hoverType === "hero"
                ? 2
                : hoverType === "cta"
                  ? 1.2
                  : hoverType === "skill"
                    ? 1.3
                    : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Glow ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-10 h-10 rounded-full bg-indigo-500/20 blur-md"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale:
            hoverType === "project"
              ? 3.5
              : hoverType === "hero"
                ? 3
                : hoverType === "cta"
                  ? 1.6
                  : hoverType === "skill"
                    ? 1.6
                    : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </>
  );
};

export default CreativeCursor;
