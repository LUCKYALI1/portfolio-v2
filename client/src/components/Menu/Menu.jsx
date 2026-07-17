import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Btn from '../Btn';
import { useCursor } from '../../context/CursorContext'; 

const menuLinks = [
    { title: "HOME", href: "/" },
    { title: "WORKS", href: "/projects" },
    { title: "SKILLS", href: "/skills" },
    { title: "ABOUT", href: "/about" }, 
    { title: "BLOGS", href: "/blogs" }
];

const Menu = ({ closeMenu }) => {
    const { buttonEnter, buttonLeave, cardEnter, cardLeave } = useCursor();

    const menuVariants = {
        initial: { y: "-100%" },
        animate: { 
            y: "0%",
            transition: { 
                duration: 0.75, 
                version: "linear",
                ease: [0.16, 1, 0.3, 1],
            }
        },
        exit: { 
            y: "-100%",
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        },
    };

    const containerVariants = {
        initial: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
        animate: { 
            transition: { 
                delayChildren: 0.15,
                staggerChildren: 0.08, 
                staggerDirection: 1 
            } 
        },
        exit: { 
            transition: { staggerChildren: 0.04, staggerDirection: -1 }
        }
    };

    return (
        <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className='fixed inset-0 z-[999] h-screen w-full bg-[#ed7a4db1] text-[#1a1a1a] origin-top overflow-hidden cursor-none border-b border-[#1a1a1a]/5'
        >
            {/* Background Accent Grid Guidelines for true Brutalism */}
            <div className="absolute top-0 right-0 w-[15%] sm:w-[12%] md:w-[10%] h-full bg-[#E5E552]/10 border-l border-[#1a1a1a]/5 z-0" />

            <div className='mx-auto flex h-full w-[90%] md:w-[95%] max-w-7xl flex-col relative z-10'>

                {/* --- HEADER --- */}
                <div className='flex w-full items-center justify-between py-6 md:py-8 border-b border-[#1a1a1a]/10'>
                    <div
                        onClick={(e) => {
                            e.stopPropagation(); 
                            closeMenu();
                        }}
                        onMouseEnter={() => buttonEnter("CLOSE")} 
                        onMouseLeave={buttonLeave}
                        className='group flex h-11 w-11 md:h-14 md:w-14 cursor-none items-center justify-center rounded-full bg-[#1a1a1a]/5 hover:bg-[#E5E552] text-[#1a1a1a] transition-all duration-300 z-[1000] pointer-events-auto border border-[#1a1a1a]/10'
                    >
                        <p className='font-black text-sm md:text-base transition-transform duration-300 group-hover:rotate-90'>✕</p>
                    </div>
                    
                    <div className="scale-90 md:scale-100 pointer-events-none">
                        <Btn data='Lucky Ali' inverted={true} />
                    </div>
                </div>

                {/* --- BODY (Links) --- */}
                <motion.div 
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className='flex flex-col flex-1 justify-center px-2 md:px-10 gap-y-2'
                >
                    {menuLinks.map((link, index) => (
                        <MenuLink 
                            key={index} 
                            title={link.title} 
                            href={link.href} 
                            closeMenu={closeMenu} 
                        />
                    ))}
                </motion.div>

                {/* --- FOOTER --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.5, y: 0, transition: { delay: 0.5 } }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    className='flex flex-col md:flex-row w-full justify-between items-start md:items-end pb-8 md:pb-10 px-2 md:px-10 uppercase text-[10px] md:text-xs tracking-widest gap-4 md:gap-0 font-mono text-[#1a1a1a]'
                >
                    <div className='flex gap-6 z-10'>
                        {["LinkedIn", "GitHub", "LeetCode"].map((social, i) => (
                            <motion.span 
                                key={i}
                                onMouseEnter={() => cardEnter("LINK")} 
                                onMouseLeave={cardLeave}
                                whileHover={{ color: "#E5E552", y: -2 }}
                                className='cursor-none transition-colors duration-200 font-black'
                            >
                                {social}
                            </motion.span>
                        ))}
                    </div>

                    <div className='flex flex-col md:items-end z-10 font-black'>
                        <p>Based in Delhi, India</p>
                        <p className='mt-1 text-[9px] md:text-[10px] normal-case opacity-60'>&copy; {new Date().getFullYear()} Portfolio v1.0</p>
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default Menu;


// --- ROBUST MENU LINK COMPONENT ---
const MenuLink = ({ title, href, closeMenu }) => {
    const { cardEnter, cardLeave } = useCursor();
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault(); 
        closeMenu(); 
        
        if (href.startsWith("/#")) {
            const id = href.replace("/#", "");
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                navigate("/"); 
                setTimeout(() => {
                    const el = document.getElementById(id);
                    if(el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            navigate(href);
        }
    };

    const linkVariants = {
        initial: { y: "130%" }, 
        animate: { y: "0%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
        exit: { y: "130%", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <motion.div 
            variants={linkVariants}
            className='h-[14vw] md:h-[9vw] lg:h-[7.5vw] overflow-hidden'
        >
            <Link
                to={href}
                onClick={handleClick}
                onMouseEnter={() => cardEnter("GO")}
                onMouseLeave={cardLeave}
                className='group relative block h-full w-full cursor-none'
            >
                <div className="relative w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full will-change-transform">
                    
                    {/* ORIGINAL HIGH CONTRAST DARK STATE */}
                    <div className='h-full flex items-center'>
                        <h1 className='text-[11vw] md:text-[8vw] lg:text-[7vw] font-black uppercase tracking-tighter leading-none text-[#1a1a1a] transition-all duration-300 group-hover:opacity-30'>
                            {title}
                        </h1>
                    </div>

                    {/* HOVER ACCENT FUNKY LIME / YELLOW STATE */}
                    <div className='absolute top-full left-0 w-full h-full flex items-center'>
                        <h1 className='text-[11vw] md:text-[8vw] lg:text-[7vw] font-black uppercase tracking-tighter leading-none text-[#E5E552]'>
                            {title}
                        </h1>
                    </div>

                </div>
            </Link>
        </motion.div>
    );
};