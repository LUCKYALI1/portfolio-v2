import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCursor } from "../../context/CursorContext"; 
import "./About.css"; // Import the CSS file for styling
// --- TEXT REVEAL RISE ANIMATION PARAMETERS (GPU HARDWARE ACCELERATED) ---
const AwwwardsReveal = {
  hidden: { y: "45px", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// --- 1. SLANTED BRUTALIST MARQUEE COMPONENT ---
const SlantedMarquee = ({ items }) => {
  const { cardEnter, cardLeave } = useCursor();

  return (
    <div className="relative w-full overflow-hidden py-12 md:py-16 bg-transparent flex flex-col gap-6 select-none">
      {/* Upper Dark Glass Strip */}
      <div 
        className="w-[120%] -ml-[10%] rotate-[-2.5deg] bg-[#1a1a1a] border-y border-[#1a1a1a]/10 py-4 flex flex-nowrap overflow-hidden shadow-sm transform-gpu"
      >
        <div className="flex whitespace-nowrap animate-marquee" style={{ animationDuration: '28s' }}>
          {[...items, ...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-6 md:gap-8 mx-4 md:mx-6">
              <span className="text-xl md:text-4xl font-black italic tracking-tight text-[#F1EDE4] uppercase">
                {item}
              </span>
              <span className="text-lg md:text-xl text-[#E5E552]">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Core Highlight Strip */}
      <div 
        onMouseEnter={() => cardEnter("SCROLL")} 
        onMouseLeave={cardLeave}
        className="w-[120%] -ml-[10%] rotate-[2deg] bg-[#ED7A4D] py-5 flex flex-nowrap overflow-hidden shadow-md cursor-none z-10 transform-gpu"
      >
        <div className="flex whitespace-nowrap animate-marquee" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
          {[...items, ...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-6 md:gap-8 mx-4 md:mx-6">
              <span className="text-2xl md:text-5xl font-black uppercase tracking-tighter text-[#F1EDE4]">
                {item}
              </span>
              <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-[#E5E552]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 2. LIQUID TYPOGRAPHIC WORD REVEAL ---
const Word = ({ children, range, progress, index }) => {
  const opacity = useTransform(progress, range, [0.15, 1]); 
  const y = useTransform(progress, range, ["25%", "0%"]);

  const highlightStyles = [
    "bg-gradient-to-r from-[#ED7A4D] to-[#d65f36] bg-clip-text text-transparent font-black italic tracking-tight",
    "text-[#1a1a1a] font-black tracking-tighter uppercase underline decoration-[#E5E552] decoration-4",
    "text-[#4ade80] font-extrabold italic bg-[#1a1a1a] px-2 rounded-md"
  ];
  
  const currentStyle = children.isHighlighted 
    ? highlightStyles[index % highlightStyles.length] 
    : "text-[#1a1a1a]/80 font-medium";

  return (
    <span className="relative mr-2 sm:mr-3 lg:mr-4 mt-1 sm:mt-2 inline-block overflow-hidden align-bottom transform-gpu">
      <motion.span
        style={{ opacity, y }}
        className="inline-block transition-all duration-200 text-2xl sm:text-4xl md:text-5xl lg:text-6xl will-change-transform"
      >
        <span className={currentStyle}>{children.text}</span>
      </motion.span>
    </span>
  );
};

// --- 3. TIMELINE ITEM ---
const TimelineItem = ({ data, index }) => {
  const isLeft = index % 2 === 0;
  const { cardEnter, cardLeave } = useCursor();

  const borderAccents = ["border-[#E5E552]", "border-[#ED7A4D]", "border-[#4ade80]"];
  const badgeColors = ["bg-[#E5E552]/15 text-[#1a1a1a]", "bg-[#ED7A4D]/15 text-[#d65f36]", "bg-[#4ade80]/20 text-[#2e7d43]"];

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-10%" }}
      variants={AwwwardsReveal}
      onMouseEnter={() => cardEnter("READ")}
      onMouseLeave={cardLeave}
      className={`flex flex-col md:flex-row justify-between mb-10 md:mb-16 w-full relative z-10 cursor-none ${
        !isLeft && "md:flex-row-reverse"
      } transform-gpu`}
    >
      <div className={`w-full md:w-[47%] rounded-3xl border border-[#1a1a1a]/10 bg-white/45 p-5 md:p-8 shadow-[0_15px_35px_rgba(26,26,26,0.03)] backdrop-blur-xl transition-all duration-500 hover:scale-[1.01] hover:bg-white/70 flex flex-col justify-between h-fit relative ${
        isLeft ? "md:text-right items-end" : "md:text-left items-start"
      }`}>
        
        <div className={`absolute top-0 h-[3px] w-20 md:w-24 rounded-full ${borderAccents[index % borderAccents.length]} ${isLeft ? "right-6" : "left-6"}`} />
        
        <div className="w-full mb-5">
          <div className="flex justify-between items-center w-full font-mono text-[10px] md:text-[11px] font-black text-[#1a1a1a]/40 uppercase tracking-widest mb-3">
            <span>{data.year}</span>
            {data.score && <span className={`px-2 py-0.5 rounded text-[9px] md:text-[10px] ${badgeColors[index % badgeColors.length]}`}>{data.score}</span>}
          </div>
          <h3 className="text-lg md:text-2xl font-black text-[#1a1a1a] uppercase tracking-tight leading-none mb-3">
            {data.title}
          </h3>
          <p className="text-[#1a1a1a]/60 font-sans text-xs md:text-base font-medium leading-relaxed">
            {data.desc}
          </p>
        </div>

        <div className="w-full pt-3 border-t border-[#1a1a1a]/5 flex items-center justify-between text-[#1a1a1a]/40 font-mono text-[8px] md:text-[9px] font-black tracking-wider uppercase">
          <span>Logs verified</span>
          <span>Instance verified ✦</span>
        </div>
      </div>

      <div className="absolute left-[-2px] md:left-1/2 top-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center h-full z-20 max-md:hidden">
        <div className="w-3 h-3 bg-transparent border border-[#1a1a1a]/15 rounded-full relative shadow-sm" />
      </div>

      <div className="hidden md:block w-[47%]"></div>
    </motion.div>
  );
};

// --- 4. MAIN CONTAINER ENGINE ---
const About = () => {
  const { textEnter, textLeave } = useCursor();
  
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  
  // Outer section scroll tracker solely handles bg transitions
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"], 
  });

  // Dedicated inner tracker targets text coordinates specifically
  const { scrollYProgress: textProgress } = useScroll({
    target: textContainerRef,
    offset: ["start 75%", "end 45%"], 
  });

  const dynamicBg = useTransform(sectionProgress, [0, 0.85, 1], ["#F1EDE4", "#F1EDE4", "#E5E552"]);

  const aboutText = "Lucky Ali is a focused full-stack developer who designs scalable, user-centered digital products. Combining robust backend engineering with modern, intuitive interfaces, he builds solutions that deliver real impact. Currently sharpening his expertise in Data Structures and system problem-solving, he is committed to tackling challenges that shape the future.";
  const highlightWords = ["focused", "scalable", "user-centered", "impact", "backend", "interfaces", "expertise", "future"];
  
  const wordsObjects = aboutText.split(" ").map((word) => ({
    text: word,
    isHighlighted: highlightWords.includes(word.replace(/[.,]/g, ''))
  }));

  const roles = ["Software Engineer", "Full-Stack Developer", "Data Analyst", "Creative Coder", "UI Designer", "System Architect"];

  const educationData = [
    { 
      title: "Class 10 (Secondary Grounding)", 
      year: "2018", 
      desc: "Built strong foundations in mathematics and logical syntax, developing early analytical problem-solving skills." 
    },
    { 
      title: "Class 12 (Senior Engineering Prep)", 
      year: "2020", 
      desc: "Specialized in Physics, Chemistry, and Advanced Calculus. Deepened core foundational workflows." 
    },
    { 
      title: "B.Tech Computer Science Degree", 
      year: "2020 - 2025", 
      score: "CGPA: 7", 
      desc: "Pursuing deep architecture frameworks covering Data Structures, Algorithms, Full-Stack Web Implementations, and distributed System Design structures." 
    },
  ];

  return (
    <motion.section 
      id="about" 
      ref={sectionRef}
      style={{ backgroundColor: dynamicBg }}
      className="w-full text-[#1a1a1a] py-16 md:py-24 z-10 overflow-hidden relative border-t border-[#1a1a1a]/5 transition-colors duration-300 transform-gpu"
    >
      {/* Tilted Marquee Stage */}
      <div className="w-full py-4 relative z-10">
         <SlantedMarquee items={roles} />
      </div>

      {/* Main Specimen Bio Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mt-16 md:mt-20 mb-24 md:mb-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* Sticky Label */}
            <div className="lg:w-1/5">
                <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#ED7A4D] font-black lg:sticky lg:top-36 block mb-4 lg:mb-0">
                    // ABOUT_ME //
                </span>
            </div>

            {/* Word Specimen Stream Container */}
            <div 
                ref={textContainerRef}
                className="lg:w-4/5 cursor-none will-change-transform"
                onMouseEnter={textEnter} 
                onMouseLeave={textLeave}
            >
                <p className="leading-[1.4] md:leading-[1.45] tracking-tight flex flex-wrap text-left font-sans">
                  {wordsObjects.map((wordObj, i) => {
                    const totalWords = wordsObjects.length;
                    const start = i / totalWords;
                    const end = Math.min(1, start + (1.5 / totalWords)); 

                    return (
                        <Word 
                          key={i} 
                          range={[start, end]} 
                          progress={textProgress} 
                          index={i}
                        >
                          {wordObj}
                        </Word>
                    );
                  })}
                </p>
            </div>
        </div>
      </div>

      {/* Education Timeline Section */}
      <div className="relative w-full py-8 md:py-12 bg-transparent z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
             
             <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                onMouseEnter={textEnter} 
                onMouseLeave={textLeave}
                className="text-left md:text-center text-xs font-mono font-black tracking-[0.4em] text-[#1a1a1a]/30 mb-14 md:mb-20 uppercase cursor-none"
             >
                HISTORY / <span className="text-[#ED7A4D]">EDUCATION_JOURNEY</span>
             </motion.h3>

             <div className="relative">
                 {/* Seamless Vertical Axis Wire */}
                 <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#1a1a1a]/10 md:-translate-x-1/2 z-0" />

                 <div className="relative z-10">
                      {educationData.map((item, index) => (
                          <TimelineItem key={index} data={item} index={index} />
                      ))}
                 </div>
             </div>
          </div>
      </div>
    </motion.section>
  );
};

export default About;