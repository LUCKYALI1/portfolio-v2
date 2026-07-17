import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "../context/CursorContext"; // Path verified

const CustomCursor = () => {
  const { cursorVariant, cursorText } = useCursor();
  const [isClicking, setIsClicking] = useState(false);

  // --- PHYSICS SETUP ---
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, [mouseX, mouseY]);

  // --- BRUTALIST AESTHETIC VARIANT OBJECTS ---
  const variants = {
    default: {
      height: 16,
      width: 16,
      backgroundColor: "#1a1a1a", 
      x: "-50%",
      y: "-50%",
      mixBlendMode: "difference", // Flawless color inversion over multiple bg elements
    },
    text: {
      height: 90,
      width: 90,
      backgroundColor: "#F1EDE4",
      x: "-50%",
      y: "-50%",
      mixBlendMode: "difference", 
    },
    card: {
      height: 90,
      width: 90,
      backgroundColor: "#1a1a1a",
      x: "-50%",
      y: "-50%",
      mixBlendMode: "difference",
    },
    button: {
      height: 54,
      width: 54,
      backgroundColor: "#E5E552",
      x: "-50%",
      y: "-50%",
      mixBlendMode: "normal", // Keeps the accent color intact over buttons
    }
  };

  // Dynamic status validation based on active parameters
  const isDarkCursor = cursorVariant === "card" || cursorVariant === "default";

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex justify-center items-center rounded-full shadow-md overflow-hidden hidden md:flex"
      style={{
        left: smoothX,
        top: smoothY,
      }}
      variants={variants}
      animate={cursorVariant}
      whileTap={{ scale: 0.85 }} 
      transition={{ type: "spring", stiffness: 480, damping: 28 }}
    >
      {/* Dynamic Ripple Pointer Effect */}
      {isClicking && (
        <motion.div
          initial={{ opacity: 0.5, scale: 0.6 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`absolute inset-0 rounded-full border ${
            isDarkCursor ? "border-[#F1EDE4]/30" : "border-[#1a1a1a]/30"
          }`}
        />
      )}

      {/* Renders Editorial Type Overlays Inside Active Variants */}
      {(cursorVariant === "card" || cursorVariant === "text" || cursorVariant === "button") && cursorText && (
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          className={`text-[9px] font-mono font-black tracking-[0.2em] uppercase select-none ${
            cursorVariant === "button" ? "text-[#1a1a1a]" : "text-[#F1EDE4]"
          }`}
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
};

export default CustomCursor;