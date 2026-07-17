import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCursor } from '../context/CursorContext'; // Path verified

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const awwwardsRise = {
  hidden: { y: "45px", opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } 
  }
};

const Footer = () => {
  const { textEnter, textLeave, cardEnter, cardLeave } = useCursor();
  const footerRef = useRef(null);

  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/luckyalim/", handle: "@luckyalim" },
    { name: "GitHub", href: "https://github.com/LUCKYALI1/", handle: "@LUCKYALI1" },
    { name: "LeetCode", href: "https://leetcode.com/u/Luckyalim_/", handle: "@Luckyalim_" },
    { name: "Instagram", href: "https://www.instagram.com/mluckyali_/", handle: "@mluckyali_" }
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Work", href: "/projects" },
    { name: "Tech", href: "/skills" }
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("luckyali786ashu@gmail.com");
  };

  return (
    <footer ref={footerRef} className="relative w-full bg-[#F1EDE4] text-[#1a1a1a] overflow-hidden pb-12 border-t border-[#1a1a1a]/10 transform-gpu">
      
      {/* --- SECTION 1: MASSIVE EDITORIAL NAME OVERSIZED STRIP (Funky Orange & Custom Brutalist Mask) --- */}
      <div className="relative w-full border-b border-[#1a1a1a]/10 pt-16 md:pt-20 pb-2 overflow-hidden select-none transform-gpu">
        <motion.h1
            initial={{ y: 100, opacity: 0, rotateX: -15 }}
            whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
            className="text-[18vw] font-black leading-[0.8] tracking-tighter text-center text-transparent bg-clip-text bg-gradient-to-b from-[#1a1a1a] via-[#1a1a1a]/90 to-[#1a1a1a]/40 select-none z-10 relative mt-8 md:mt-10 cursor-none will-change-transform transform-gpu"
         >
            LUCKY ALI
         </motion.h1>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-40px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 pt-16 md:pt-24"
      >
        
        {/* --- SECTION 2: ASYMMETRICAL COLUMN TEXT SPLIT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 mb-20 md:mb-28">
          
          {/* Left: Huge Editorial Headline Call to Action */}
          <div className="space-y-6 md:space-y-8">
            <motion.h3 
              variants={awwwardsRise} 
              className="text-3xl sm:text-4xl md:text-6xl font-black leading-[1.05] tracking-tighter uppercase cursor-none text-[#1a1a1a]" 
              onMouseEnter={textEnter} 
              onMouseLeave={textLeave}
            >
              Let’s build the <br />
              <span className="text-[#ED7A4D]">impossible.</span>
            </motion.h3>
            
            <motion.p 
              variants={awwwardsRise} 
              className="text-[#1a1a1a]/70 text-xs sm:text-sm md:text-base font-semibold max-w-sm font-sans cursor-none" 
              onMouseEnter={textEnter} 
              onMouseLeave={textLeave}
            >
              Currently available for selected freelance contracts and open to core engineering operations.
            </motion.p>
            
            <motion.div variants={awwwardsRise} className="flex flex-wrap gap-3 md:gap-4 pt-2">
              <a 
                href="mailto:luckyali786ashu@gmail.com"
                onMouseEnter={() => cardEnter("EMAIL")}
                onMouseLeave={cardLeave}
                className="px-6 py-3 md:px-8 md:py-3.5 bg-[#1a1a1a] text-[#F1EDE4] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#ED7A4D] hover:text-[#1a1a1a] transition-all duration-300 cursor-none shadow-sm"
              >
                Start a Project
              </a>
              <button 
                onClick={handleCopyEmail}
                onMouseEnter={() => cardEnter("COPY")}
                onMouseLeave={cardLeave}
                className="px-6 py-3 md:px-8 md:py-3.5 border-2 border-[#1a1a1a]/20 bg-transparent text-[#1a1a1a] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#1a1a1a] hover:text-[#F1EDE4] transition-all duration-300 cursor-none"
              >
                Copy Email
              </button>
            </motion.div>
          </div>

          {/* Right: Modern Grid Columns Split System */}
          <div className="grid grid-cols-2 gap-8 lg:gap-10 pt-2">
            
            {/* Explore List */}
            <motion.div variants={awwwardsRise} className="flex flex-col gap-2.5 md:gap-3">
              <span className="text-[9px] md:text-[10px] font-mono text-[#1a1a1a]/40 uppercase tracking-[0.25em] font-black mb-2 md:mb-3">// Explore</span>
              {navLinks.map((link, i) => (
                <a 
                  key={i} 
                  href={link.href} 
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                  className="text-base md:text-lg text-[#1a1a1a]/60 hover:text-[#1a1a1a] font-black uppercase tracking-tight transition-colors cursor-none w-fit"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>

            {/* Connect List */}
            <motion.div variants={awwwardsRise} className="flex flex-col gap-3.5 md:gap-4.5">
              <span className="text-[9px] md:text-[10px] font-mono text-[#1a1a1a]/40 uppercase tracking-[0.25em] font-black mb-2 md:mb-3">// Connect</span>
              {socialLinks.map((link, i) => (
                <a 
                  key={i} 
                  href={link.href} 
                  target="_blank" 
                  rel="noreferrer"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                  className="group flex flex-col cursor-none w-fit transform-gpu"
                >
                  <span className="text-base md:text-lg text-[#1a1a1a] font-black uppercase tracking-tight group-hover:text-[#ED7A4D] transition-colors flex items-center gap-1">
                    {link.name} 
                    <span className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-xs">↗</span>
                  </span>
                  <span className="text-[10px] md:text-[11px] text-[#1a1a1a]/50 font-mono font-black group-hover:text-[#1a1a1a]/70 transition-colors mt-0.5">{link.handle}</span>
                </a>
              ))}
            </motion.div>

          </div>
        </div>

        {/* --- SECTION 3: EDITORIAL MINIMAL FOOTER TERM BAR --- */}
        <motion.div 
          variants={awwwardsRise} 
          className="flex flex-col md:flex-row justify-between items-start md:items-end pt-6 md:pt-8 border-t border-[#1a1a1a]/10 gap-6 md:gap-0"
        >
          <div className="flex flex-col gap-0.5 md:gap-1">
            <span className="text-xs text-[#1a1a1a]/60 font-mono font-black">&copy; {new Date().getFullYear()} Lucky Ali.</span>
            <span className="text-[9px] md:text-[10px] text-[#1a1a1a]/40 font-mono font-black uppercase tracking-wider">All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4 md:gap-6 max-md:w-full max-md:justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#1a1a1a]/5 rounded-xl border border-[#1a1a1a]/10 cursor-default select-none">
              <div className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ED7A4D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-[#ED7A4D]"></span>
              </div>
              <span className="text-[10px] md:text-xs font-mono font-black uppercase tracking-wider text-[#1a1a1a]/70">Delhi, India</span>
            </div>

            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              onMouseEnter={() => cardEnter("UP")}
              onMouseLeave={cardLeave}
              className="h-9 w-9 md:h-10 md:w-10 flex items-center justify-center rounded-full border border-[#1a1a1a]/20 bg-transparent text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#F1EDE4] hover:border-transparent transition-all duration-300 cursor-none shadow-sm font-black text-xs md:text-sm"
            >
              ↑
            </button>
          </div>

        </motion.div>

      </motion.div>
    </footer>
  );
};

export default Footer;