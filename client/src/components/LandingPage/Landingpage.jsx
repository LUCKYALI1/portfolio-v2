import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Btn from '../Btn';
import { useCursor } from '../../Context/CursorContext'; 

// --- ADVANCED ADVANCED ACCELERATED REVEAL ENGINE ---
const macroContainer = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: 0.08 }
    }
};

const massiveTextReveal = {
    hidden: { y: "100%", opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1,
        transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] }
    }
};

const subtextFade = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.75, ease: "easeOut" }
    }
};

const Landingpage = () => {
    const { textEnter, textLeave, cardEnter, cardLeave } = useCursor();
    const containerRef = useRef(null);

    // --- GPU-BALANCED MOUSE PARALLAX CONTROLS ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 80, damping: 24, mass: 0.6 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const xTextMove = useTransform(smoothX, [-0.5, 0.5], ["-10px", "10px"]);
    const yTextMove = useTransform(smoothY, [-0.5, 0.5], ["-10px", "10px"]);

    useEffect(() => {
        let frameId;
        const handleMouseMove = (e) => {
            frameId = requestAnimationFrame(() => {
                const xNormal = (e.clientX / window.innerWidth) - 0.5;
                const yNormal = (e.clientY / window.innerHeight) - 0.5;
                mouseX.set(xNormal);
                mouseY.set(yNormal);
            });
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(frameId);
        };
    }, [mouseX, mouseY]);

    // --- SCROLL DRIVEN MATRIX HANDSHAKE ---
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Pure dynamic handshake transition cleanly switching to next block context color (#1a1a1a)
    const dynamicBg = useTransform(scrollYProgress, [0, 0.92, 1], ["#ED7A4D", "#ED7A4D", "#1a1a1a"]);

    const yHeaderDeck = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const rotateWheelScroll = useTransform(scrollYProgress, [0, 1], [0, 140]);
    const canvasOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

    return (
        <motion.div 
            ref={containerRef} 
            style={{ backgroundColor: dynamicBg }}
            className="relative w-full min-h-[100dvh] md:h-[100dvh] flex flex-col justify-between text-[#1a1a1a] overflow-hidden select-none font-sans z-10 p-4 sm:p-8 md:p-16 transition-colors duration-300 transform-gpu"
        > 
            {/* --- RIGHT SIDEBAR STRIP: BRUTALIST ACCENT --- */}
            <motion.div 
                style={{ opacity: canvasOpacity }}
                className="absolute top-0 right-0 w-[15%] sm:w-[12%] md:w-[10%] h-full bg-[#E5E552] z-0 border-l border-[#1a1a1a]/5"
            />

            {/* --- CENTRAL DYNAMIC SPECIMEN FRAME --- */}
            <motion.div 
                style={{ 
                    opacity: canvasOpacity,
                    x: xTextMove,
                    y: yTextMove 
                }}
                variants={macroContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.05 }}
                className="w-full flex-1 flex flex-col justify-center relative z-10 will-change-transform pt-16 md:pt-0 transform-gpu"
            >
                {/* Upper Alignment Row */}
                <div className="w-full border-t border-[#1a1a1a]/15 pt-6 flex flex-col md:flex-row md:justify-between items-start gap-6 relative">
                    
                    {/* Left Stack Meta Titles */}
                    <div className="flex flex-col justify-start z-10">
                        <div className="overflow-visible h-auto block">
                            <motion.span variants={massiveTextReveal} className="block text-4xl sm:text-6xl md:text-[4.2vw] font-black leading-none tracking-tighter text-[#F1EDE4]">
                                Hi
                            </motion.span>
                        </div>
                        <div className="overflow-visible h-auto block mt-1">
                            <motion.span variants={massiveTextReveal} className="block text-4xl sm:text-6xl md:text-[4.2vw] font-black leading-none tracking-tighter text-[#F1EDE4] whitespace-nowrap">
                                I'm Lucky Ali
                            </motion.span>
                        </div>
                    </div>

                    {/* Right Side Stack: Manifesto content */}
                    <motion.div 
                        variants={subtextFade} 
                        className="text-left md:text-right flex flex-col items-start md:items-end pr-[18%] sm:pr-[15%] md:pr-[12%] max-w-xl z-10"
                    >
                        <p className="text-sm sm:text-base md:text-[1.25vw] font-black uppercase tracking-tight leading-snug text-[#1a1a1a]/80">
                            I'M PASSIONATE ABOUT CRAFTING EFFICIENT ALGORITHMS & BUILDING BEAUTIFUL WEB EXPERIENCES.
                        </p>
                    </motion.div>

                    {/* --- DYNAMIC BRUTALIST BADGE WHEEL INTERSECTION --- */}
                    <motion.div 
                        style={{ 
                            rotate: rotateWheelScroll,
                            x: useTransform(smoothX, [-0.5, 0.5], ["-4px", "4px"]),
                            y: useTransform(smoothY, [-0.5, 0.5], ["-4px", "4px"]) 
                        }}
                        className="absolute right-[2.5%] sm:right-[3.5%] md:right-[4%] top-0 md:top-1/2 -translate-y-1/3 md:-translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 z-20 will-change-transform transform-gpu"
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full animate-spin" style={{ animationDuration: '38s' }}>
                            <path id="badgePath" fill="none" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                            <text className="font-mono text-[7.5px] tracking-[2.6px] sm:tracking-[3px] fill-[#1a1a1a] uppercase font-black">
                                <textPath href="#badgePath">LUCKY ALI PORTFOLIO • 2026 LUCKY ALI •</textPath>
                            </text>
                        </svg>
                    </motion.div>
                </div>

                {/* --- GIANT INTEGRATED TEXT SPECIMEN --- */}
                <div className="w-full border-b border-[#1a1a1a]/15 pb-6 mt-6 md:mt-3 overflow-hidden">
                    <h1 
                        onMouseEnter={textEnter} 
                        onMouseLeave={textLeave}
                        className="text-[12.5vw] sm:text-[13vw] md:text-[14vw] leading-[10vw] sm:leading-[10.5vw] md:leading-[10.8vw] font-black tracking-tighter uppercase text-[#1a1a1a] flex flex-col items-start text-left w-full select-all font-sans"
                    >
                        <div className="overflow-hidden h-fit w-full block will-change-transform transform-gpu">
                            <motion.span variants={massiveTextReveal} className="block">
                                Web
                            </motion.span>
                        </div>
                        <div className="overflow-hidden h-fit w-full block will-change-transform transform-gpu">
                            <motion.span variants={massiveTextReveal} className="block">
                                Developer
                            </motion.span>
                        </div>
                        <div className="overflow-hidden h-fit w-full block will-change-transform transform-gpu">
                            <motion.span variants={massiveTextReveal} className="block">
                                Programmer
                            </motion.span>
                        </div>
                    </h1>
                </div>
            </motion.div>

            {/* --- BOTTOM INTERACTIVE PANEL ROW --- */}
            <motion.div 
                variants={subtextFade}
                initial="hidden"
                whileInView="visible"
                className="w-full flex flex-col sm:flex-row justify-between items-center font-mono text-[9px] sm:text-[10px] tracking-widest text-[#1a1a1a]/50 uppercase mt-8 sm:mt-0 gap-4 z-20"
            >
                <div className="text-left font-sans text-xs normal-case text-[#1a1a1a]/60 font-medium text-center sm:text-left">
                    Scroll down to decrypt complete project matrix archives.
                </div>

                <div 
                    className="flex justify-center pointer-events-auto scale-90 sm:mr-[12%] md:mr-[10%] transition-transform hover:scale-95"
                    onMouseEnter={() => cardEnter("CLICK")} 
                    onMouseLeave={cardLeave}
                >
                    <Btn data="Let's connect" inverted={false} />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Landingpage;