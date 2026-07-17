import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Btn from "../Btn"; 
import Menu from "../menu/Menu"; 
import { useCursor } from "../../Context/CursorContext"; 
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const { textEnter, textLeave, buttonEnter, buttonLeave } = useCursor();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isMenuOpen ? -120 : 0, 
          opacity: isMenuOpen ? 0 : 1 
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-0 z-[50] flex w-full justify-center pt-6 pointer-events-none"
      >
        <motion.div
          layout
          initial={{ width: "95%", y: -30, opacity: 0 }}
          animate={{
            width: isScrolled ? (isMobile ? "95%" : "65%") : "95%",
            y: 0,
            opacity: 1,
            borderRadius: isScrolled ? "100px" : "0px",
            padding: isScrolled ? "10px 16px" : "20px 0px",
            backgroundColor: isScrolled ? "rgba(241, 237, 228, 0.9)" : "rgba(241, 237, 228, 0.0)",
            backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
            borderBottom: isScrolled ? "1px solid rgba(26, 26, 26, 0.1)" : "1px solid rgba(26, 26, 26, 0.15)",
          }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
          className="relative z-50 flex max-w-7xl items-center justify-between text-[#1a1a1a] pointer-events-auto"
        >
          {/* --- LEFT: MENU TOGGLE --- */}
          <div className="flex flex-[1] items-center justify-start pl-2">
            <motion.button
              onClick={toggleMenu}
              onMouseEnter={() => buttonEnter("OPEN")} 
              onMouseLeave={buttonLeave}
              className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-[#1a1a1a] transition-all duration-300"
              style={{ backgroundColor: isScrolled ? "rgba(26, 26, 26, 0.05)" : "rgba(26, 26, 26, 0.1)" }}
            >
              <div className="flex flex-col gap-[4px] items-start w-4 md:w-5">
                 <span className="w-full h-[2px] bg-[#1a1a1a]"></span>
                 <span className="w-3/4 h-[2px] bg-[#1a1a1a]"></span>
                 <span className="w-full h-[2px] bg-[#1a1a1a]"></span>
              </div>
            </motion.button>
          </div>

          {/* --- CENTER: LEETCODE --- */}
          <div className="flex flex-[1] items-center justify-center">
             <Link 
               to="/leetcode" 
               onMouseEnter={textEnter}
               onMouseLeave={textLeave}
               className="px-5 py-2 rounded-full border border-[#1a1a1a]/20 font-black text-[10px] md:text-xs tracking-widest uppercase hover:bg-[#1a1a1a] hover:text-[#F1EDE4] transition-all"
             >
               LeetCode
             </Link>
          </div>

          {/* --- RIGHT: ACTIONS --- */}
          <div className="flex flex-[1] items-center justify-end pr-2">
            <div 
              onMouseEnter={() => buttonEnter("GET")} 
              onMouseLeave={buttonLeave}
              className="origin-right"
            >
              <Btn data="Resume" inverted={isScrolled} url="https://drive.google.com/file/d/1xN1pvdwKIg0UoOOb655lWe0sXmiGF9Uo/view?usp=sharing" />
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* --- OVERLAY MENU --- */}
      <AnimatePresence mode="wait">
        {isMenuOpen && <Menu key="menu" closeMenu={toggleMenu} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;