import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';

// --- DATA MATRIX ---
const skillsRow1 = ["Python", "C++", "Java", "Data Structures", "Algorithms", "OOP", "SQL", "T-SQL"];
const skillsRow2 = ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT", "Firebase", "REST APIs"];
const skillsRow3 = ["Data Analytics", "Pandas", "NumPy", "Power BI", "Tableau", "ETL Pipelines", "Statistics", "Excel"];

const achievements = [
  {
    id: "ach1",
    index: "01",
    title: "LeetCode 700+",
    category: "Competitive Programming",
    desc: "Demonstrated advanced mastery over advanced data structures and computational complexity by solving over 600 programmatic challenges. Specialize in designing highly optimized algorithmic scripts using C++ and Python, focusing on minimizing time and space complexities. Maintained a rigorous performance rating in global competitive coding contests through the practical application of dynamic programming, graph theories, advanced mathematical design structures, and rigorous divide-and-conquer methodologies."
  },
  {
    id: "ach2",
    index: "02",
    title: "300+ Coding Ninjas",
    category: "Problem Solving",
    desc: "Engineered robust, maintainable backend programmatic logic across a diverse matrix of 300+ core object-oriented and data-driven challenges. Cultivated a systematic approach to debugging complex operational failures, implementing high-level data models, and designing architectural patterns. Leveraged core object-oriented programming (OOP) principles, structural encapsulation techniques, and advanced system design parameters to implement codebases capable of seamless processing and scalable platform maintenance."
  },
  {
    id: "ach3",
    index: "03",
    title: "Web Dev Trainee",
    category: "Internship @ Code Soft",
    desc: "Worked directly within modern engineering pipelines to architect, refactor, and deploy modular frontend user interface systems utilizing React.js and Tailwind CSS frameworks. Collaborated actively in agile team environment structures, performing rigorous code quality reviews, managing state persistence flows, and building secure API consumption hooks. Bridged structural layout systems with scalable client-side scripting protocols to build seamless user interactions, data rendering operations, and responsive view models."
  }
];

const certifications = [
  { 
    id: "c1", 
    title: "SQL Frameworks", 
    issuer: "HackerRank", 
    date: "2023",
    link: "https://drive.google.com/file/d/1ZI6ZPEKQHmHrv1MXJhTs63D_gzTe4tST/view?usp=sharing",
    desc: "Validated operational data manipulation capabilities, complex multi-table joins, subqueries, and relational schema modeling. Focused on optimization metrics, transactional logic integrity, and structural database query performance across structured enterprise datasets."
  },
  { 
    id: "c2", 
    title: "Problem Solving", 
    issuer: "HackerRank", 
    date: "2023",
    link: "https://drive.google.com/file/d/1bjdXzVFWhk0xVAXuXY-QjbXwhg88qDHv/view?usp=drive_link",
    desc: "Demonstrated intermediate mastery over algorithmic logic design, complex data structure implementations, and computational optimization. Focused on structuring efficient code architecture under precise time and space complexity constraints to handle scaled edge-case profiles."
  },
  { 
    id: "c3", 
    title: "TypeScript System", 
    issuer: "Infosys", 
    date: "2025",
    link: "https://drive.google.com/file/d/1WCItfcStxhDVu7O9sMnIE_CbaQrXTsyw/view?usp=sharing",
    desc: "Mastery of strongly-typed JavaScript environments. Focused on designing scale-ready web architectures using advanced static type-checking, structural interfaces, strict type configurations, and custom generics to minimize runtime errors and ensure codebase predictability."
  },
  { 
    id: "c4", 
    title: "React.js Architecture", 
    issuer: "Great Learning", 
    date: "2023",
    link: "https://drive.google.com/file/d/18B_Yj9AnV9c1fryM_PEHTJjPdp95aRZt/view?usp=sharing",
    desc: "Architected single-page client environments utilizing modern declarative component structures. Focused on state management paradigms, standard virtual DOM reconciliation metrics, highly reusable UI hooks, and seamless side-effect orchestration pipelines." 
  }
];

// --- EDITORIAL SCROLL ELEVATION TRANSFORMS ---
const CustomAwwwardsReveal = {
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

// --- MEMOIZED MARQUEE RUNWAY COMPONENTS TO PREVENT RE-RENDERS ---
const MarqueeRow = memo(({ items, direction = "left", speed = 20, colorBg, rotateDeg }) => {
  const { projectEnter, projectLeave } = useCursor();

  return (
    <div
      style={{ rotate: rotateDeg }}
      className={`relative flex w-[115%] -ml-[7%] overflow-hidden py-3 md:py-4 ${colorBg} border-y border-[#1a1a1a]/10 select-none z-10 transform-gpu will-change-transform`}
      onMouseEnter={() => projectEnter?.("SCROLL")}
      onMouseLeave={projectLeave}
    >
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-6 md:gap-12 mx-4 md:mx-8">
            <span className="text-xl md:text-4xl font-black uppercase tracking-tighter text-[#1a1a1a]">
              {item}
            </span>
            <span className="h-2 w-2 bg-[#1a1a1a] rotate-45 shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
});

MarqueeRow.displayName = "MarqueeRow";

// --- MAIN GRID ASSEMBLY ---
const SkillsAndAchievements = () => {
  const { textEnter, textLeave, cardEnter, cardLeave } = useCursor();
  const containerRef = useRef(null);

  // --- SCROLL BACKGROUND COLOR ENGINE HANDSHAKE ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Dynamic background color vector interpolates cleanly from Green to Orange
  const dynamicBackground = useTransform(
    scrollYProgress,
    [0.1, 0.75],
    ["#4ade80", "#ED7A4D"]
  );

  return (
    <motion.section 
      ref={containerRef}
      id="skills" 
      style={{ backgroundColor: dynamicBackground }}
      className="relative w-full py-20 md:py-32 overflow-hidden text-[#1a1a1a] transition-colors duration-300 transform-gpu"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* HEADER BLOCK */}
        <div className="text-left md:text-center mb-20 md:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={textEnter} 
            onMouseLeave={textLeave}
            className="text-3xl sm:text-5xl md:text-8xl font-black tracking-tighter uppercase text-[#1a1a1a] mb-4 cursor-none"
          >
            Arsenal / Honor_Matrix
          </motion.h2>
          <p className="text-[#1a1a1a]/40 font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs font-black">
            Core Capabilities • Hall of Fame • Validated Credentials
          </p>
        </div>

        {/* --- 1. OVERLAPPING MARQUEE STRIPS --- */}
        <div className="flex flex-col gap-3 mb-28 md:mb-48 transform-gpu relative">
          <MarqueeRow items={skillsRow1} direction="left" speed={28} colorBg="bg-[#E5E552]" rotateDeg="-1.5deg" />
          <MarqueeRow items={skillsRow2} direction="right" speed={22} colorBg="bg-[#F1EDE4]" rotateDeg="2deg" />
          <MarqueeRow items={skillsRow3} direction="left" speed={32} colorBg="bg-[#E5E552]" rotateDeg="-0.8deg" />
        </div>

        {/* --- 2. ASYMMETRICAL COLUMN TYPOGRAPHY ROW GRID --- */}
        <div className="flex flex-col gap-24 md:gap-44">

          {/* HALL OF FAME DISPLAY */}
          <div className="w-full">
            <div className="mb-8 md:mb-12 border-b-2 border-[#1a1a1a] pb-4 md:pb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#1a1a1a]/50 font-black block mb-2">// ARCHIVES //</span>
              <h3 className="text-2xl md:text-6xl font-black uppercase tracking-tighter text-[#1a1a1a]">
                Hall Of Fame
              </h3>
            </div>

            <div className="flex flex-col w-full">
              {achievements.map((item) => (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-8%" }}
                  variants={CustomAwwwardsReveal}
                  onMouseEnter={() => cardEnter?.("VIEW")}
                  onMouseLeave={cardLeave}
                  className="grid grid-cols-1 md:grid-cols-[80px_1.8fr_3fr] gap-3 md:gap-12 items-start py-8 md:py-12 border-b border-[#1a1a1a]/15 transition-opacity duration-300 hover:opacity-60 group cursor-none will-change-transform transform-gpu"
                >
                  {/* Left Column: Index Number with High Contrast Hover States */}
                  <span className="text-lg font-mono text-[#1a1a1a]/30 group-hover:text-[#1a1a1a] transition-colors font-black">
                    .{item.index}
                  </span>

                  {/* Middle Column: Title Specimen Layouts */}
                  <div className="space-y-1">
                    <h4 className="text-xl md:text-3xl font-black uppercase tracking-tight text-[#1a1a1a]">
                      {item.title}
                    </h4>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1a1a1a]/40 font-black block">
                      {item.category}
                    </span>
                  </div>

                  {/* Right Column: Premium Sand Tone Content Stream */}
                  <p className="text-xs sm:text-sm md:text-base font-medium text-[#1a1a1a]/70 leading-relaxed font-sans group-hover:text-[#1a1a1a] transition-colors">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CERTIFICATIONS DISPLAY */}
          <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b-2 border-[#1a1a1a] pb-4 md:pb-6 mb-8 md:mb-12">
              <h3 className="text-2xl md:text-6xl font-black uppercase tracking-tighter text-[#1a1a1a]">
                Certifications
              </h3>
              <span className="text-[9px] font-mono text-[#1a1a1a]/40 uppercase tracking-[0.2em] font-black mt-1 md:mt-0">
                // SECURE_VERIFIED_CREDENTIALS
              </span>
            </div>

            <div className="flex flex-col w-full">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-8%" }}
                  variants={CustomAwwwardsReveal}
                  onMouseEnter={() => cardEnter?.("LINK")}
                  onMouseLeave={cardLeave}
                  className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 md:gap-16 py-8 md:py-12 border-b border-[#1a1a1a]/15 items-start transition-opacity duration-300 hover:opacity-60 group cursor-none will-change-transform transform-gpu"
                >
                  {/* Left Column: Heading/Title Context with External Trigger Links */}
                  <div className="space-y-2">
                    <a 
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-baseline gap-2 pointer-events-auto"
                    >
                      <h4 className="text-lg sm:text-xl md:text-3xl font-black uppercase tracking-wide text-[#1a1a1a] transition-colors duration-200">
                        {cert.title}
                      </h4>
                      <ArrowUpRight size={16} className="text-[#1a1a1a]/40 shrink-0 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                    
                    <div className="flex items-center gap-3 text-[9px] font-mono text-[#1a1a1a]/40 uppercase tracking-widest font-black">
                      <span>{cert.issuer}</span>
                      <span className="w-1 h-1 rounded-full bg-[#1a1a1a]/20" />
                      <span>{cert.date}</span>
                    </div>
                  </div>

                  {/* Right Column: Paragraph Content Block Description Text */}
                  <p className="text-xs sm:text-sm md:text-base text-[#1a1a1a]/70 font-medium leading-relaxed tracking-wide font-sans group-hover:text-[#1a1a1a] transition-colors">
                    {cert.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </motion.section>
  );
};

export default SkillsAndAchievements;