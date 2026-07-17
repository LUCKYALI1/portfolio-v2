import React, { useRef, useEffect, useState, memo } from 'react';
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';
import { useCursor } from '../../Context/CursorContext'; 
import { ArrowUpRight } from 'lucide-react';
import api from '../../apis/api';

// --- MEMOIZED FULL-SCREEN LIQUID GLASS CARD ---
const ProjectCard = memo(({ project, index, xNumeric, xEnd }) => {
    const { cardEnter, cardLeave } = useCursor();
    
    // Using dynamic boundaries for parallax imaging mapping
    const imageX = useTransform(xNumeric, [0, xEnd || -1], [0, 120]); 
    const formattedId = String(index + 1).padStart(2, '0');

    const projectImage = project?.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&auto=format&fit=crop";
    const projectTitle = project?.title || "Untitled Project";
    const projectDescription = project?.description || "No operational manifest provided.";
    const projectUrl = project?.url || "#";
    const techStackArray = Array.isArray(project?.techStack) ? project.techStack : [];

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, margin: "-5%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[65vh] w-[80vw] sm:w-[70vw] md:h-[75vh] md:w-[55vw] flex-shrink-0 group perspective-1000 transform-gpu"
            onMouseEnter={() => cardEnter?.("EXPLORE")}
            onMouseLeave={cardLeave}
        >
            {/* Main Project Box Wrapper */}
            <div className="w-full h-full overflow-hidden rounded-[2.5rem] border border-white/20 relative bg-[#1a1a1a] shadow-[0_30px_60px_-15px_rgba(26,26,26,0.35)] transition-all duration-500 hover:border-white/40">
                
                {/* 1. Hyper-Clear Full-Screen Image */}
                <motion.div 
                    style={{ x: imageX, scale: 1.06 }} 
                    className="w-full h-full absolute inset-0 will-change-transform z-0 transform-gpu"
                >
                    <img 
                        src={projectImage} 
                        alt={projectTitle} 
                        className="w-full h-full object-cover opacity-95 transition-all duration-700 ease-out group-hover:scale-102 group-hover:opacity-100"
                        loading="eager"
                    />
                </motion.div>

                {/* Protective dark gradient solely on the lower base */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/40 to-transparent pointer-events-none z-10" />

                {/* 2. Integrated Liquid Glassmorphic Content Panel */}
                <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4 p-4 sm:p-6 md:p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(26,26,26,0.2)] z-20 flex flex-col gap-3 sm:gap-4 transition-all duration-500 group-hover:bg-white/[0.12] group-hover:border-white/20">
                    
                    <div className="flex justify-between items-end w-full gap-4 sm:gap-6">
                        <div className="space-y-2 max-w-[78%]">
                            
                            {/* Metadata Header Row */}
                            <div className="flex items-center gap-3">
                                <span className="text-2xl sm:text-3xl md:text-4xl font-black font-mono tracking-tighter text-[#F1EDE4]">
                                    {formattedId}
                                </span>
                                <span className="text-[#1a1a1a] font-mono text-[8px] md:text-[9px] font-black tracking-[0.2em] uppercase border border-[#1a1a1a]/10 px-2.5 py-1 rounded-md bg-[#E5E552] shadow-sm">
                                    DEPLOYMENT_ACTIVE
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight tracking-tight uppercase">
                                {projectTitle}
                            </h3>
                            
                            {/* Description Block */}
                            <p className="text-white/70 font-sans text-xs md:text-sm font-medium leading-relaxed line-clamp-2">
                                {projectDescription}
                            </p>
                        </div>

                        {/* Interactive Action Circle Button */}
                        <a 
                            href={projectUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full border border-white/10 bg-[#1a1a1a] text-[#F1EDE4] hover:bg-[#E5E552] hover:text-[#1a1a1a] hover:border-transparent shadow-lg transition-all duration-500 transform-gpu hover:scale-105 mb-1 flex-shrink-0 items-center justify-center"
                        >
                            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
                        </a>
                    </div>

                    {/* Tech Tags Row mapping */}
                    <div className="flex flex-wrap gap-1.5 border-t border-white/[0.08] pt-3">
                        {techStackArray.map((tag, i) => (
                            <span key={i} className="text-[8px] md:text-[9px] uppercase tracking-wider font-mono text-white font-bold border border-white/10 px-2.5 py-0.5 rounded-md bg-[#1a1a1a]/60 backdrop-blur-md shadow-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

ProjectCard.displayName = 'ProjectCard';


// --- MAIN GALLERY INTERACTIVE DECK ---
const Projects = () => {
    const targetRef = useRef(null);
    const trackRef = useRef(null); // Ref added to accurately measure horizontal length dynamically
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [xEnd, setXEnd] = useState(0); // Tracks real runtime bounds

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const dynamicBackground = useTransform(
        scrollYProgress,
        [0, 0.35, 0.7, 1],
        ["#E5E552", "#ED7A4D", "#4ade80", "#4ade80"]
    );

    // Map boundaries flawlessly down from 0 to dynamically measured track metrics
    const xNumeric = useTransform(scrollYProgress, [0, 1], [0, xEnd === 0 ? -1000 : xEnd]); 
    const xTransform = useSpring(xNumeric, { stiffness: 85, damping: 26, mass: 0.75 });

    const scrollVelocity = useVelocity(scrollYProgress);
    const skewVelocity = useSpring(scrollVelocity, { stiffness: 95, damping: 32, mass: 0.12 });
    const skewX = useTransform(skewVelocity, [-1, 1], ["1deg", "-1deg"]);
    
    const headingOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

    useEffect(() => {
        let isMounted = true;
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                if (isMounted) setProjectsData(response.data);
            } catch (error) {
                console.error('Error establishing database transaction fetch:', error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchProjects();
        return () => { isMounted = false; };
    }, []);

    // Engine to measure actual width of the flex deck layout dynamically
    useEffect(() => {
        if (!trackRef.current || loading || projectsData.length === 0) return;

        const calculateBounds = () => {
            const trackWidth = trackRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            // Maximum slide offset calculation matching browser window dimensions
            setXEnd(-(trackWidth - viewportWidth));
        };

        const timer = setTimeout(calculateBounds, 100);
        window.addEventListener('resize', calculateBounds);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculateBounds);
        };
    }, [projectsData, loading]);

    return (
        <section ref={targetRef} className="relative h-[350vh]">
            <motion.div 
                style={{ backgroundColor: dynamicBackground }}
                className="sticky top-0 flex h-screen items-center overflow-hidden transition-colors duration-300 transform-gpu"
            >
                {/* Loader Screen */}
                <div 
                    className={`absolute inset-0 z-50 flex items-center justify-center bg-[#1a1a1a] text-[#E5E552] font-mono text-xs font-black tracking-widest transition-opacity duration-500 pointer-events-none ${
                        loading ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    ⚡ LOADING SYSTEM ARCHIVE REPOSITORIES...
                </div>

                <div className={`w-full h-full flex items-center relative transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                    
                    {/* Linear Decorative Track Guideline */}
                    <div className="absolute left-[20vw] md:left-[25vw] top-0 bottom-0 w-[1px] bg-[#1a1a1a]/10 z-0 pointer-events-none" />
                    
                    {/* Header Row Content */}
                    <motion.div 
                        style={{ opacity: headingOpacity }} 
                        className="absolute top-16 md:top-20 left-4 sm:left-6 md:left-12 z-30 pointer-events-none"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-[#1a1a1a] tracking-tighter uppercase">
                            Selected <span className="text-[#F1EDE4] drop-shadow-sm">Work</span>
                        </h2>
                        <div className="flex items-center gap-3 md:gap-4 mt-2 md:mt-3">
                            <div className="h-[2px] w-6 md:w-8 bg-[#1a1a1a]" />
                            <p className="text-[#1a1a1a]/60 text-[9px] md:text-[10px] font-mono font-black uppercase tracking-[0.25em]">
                                Scroll to Scan Archive
                            </p>
                        </div>
                    </motion.div>

                    {/* Sliding Track Runway with active ref binding */}
                    <motion.div 
                        ref={trackRef}
                        style={{ x: xTransform, skewX }} 
                        className="flex gap-8 sm:gap-12 md:gap-16 pl-[12vw] md:pl-[25vw] items-center will-change-transform z-10 transform-gpu"
                    >
                        {Array.isArray(projectsData) && projectsData.map((project, i) => (
                            <ProjectCard key={project._id || i} project={project} index={i} xNumeric={xNumeric} xEnd={xEnd} />
                        ))}
                        
                        {/* End Indicator Terminus */}
                        <div className="h-[40vh] flex flex-col justify-center items-center ml-8 md:ml-12 opacity-30 select-none">
                            <div className="w-[2px] h-12 md:h-16 bg-[#1a1a1a] mb-4" />
                            <span className="text-[#1a1a1a] font-mono text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase writing-vertical-lr">
                                END_OF_ARCHIVE
                            </span>
                        </div>
                    </motion.div>

                    {/* Progress Slider Track Line */}
                    <div className="absolute bottom-6 sm:bottom-8 left-4 right-4 sm:left-8 sm:right-8 h-[3px] bg-[#1a1a1a]/10 rounded-full overflow-hidden pointer-events-none">
                        <motion.div 
                            style={{ scaleX: scrollYProgress }} 
                            className="h-full bg-[#1a1a1a] origin-left shadow-md" 
                        />
                    </div>
                </div>

            </motion.div>
        </section>
    );
};

export default Projects;