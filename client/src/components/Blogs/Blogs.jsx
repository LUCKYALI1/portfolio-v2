import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../apis/api';
import BlogModal from '../BlogModal';

// --- COLOR TOKENS (unified with the rest of the site) ---
// cream  #EDEADF   ink   #17170F   coral  #DE5A34
// yellow #E8C13B   green #3D8B4C   stone  #8C8877

const AwwwardsRowReveal = {
    hidden: { y: "45px", opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
    }
};

const cleanTag = (tag) => String(tag).replace(/^"+|"+$/g, '');

const TypoBlogRow = memo(({ blog, index, onOpen }) => {
    const { cardEnter, cardLeave } = useCursor();
    const blogTags = Array.isArray(blog?.tags) ? blog.tags : [];
    const formattedId = String(index + 1).padStart(2, '0');
    const formattedDate = blog?.date
        ? new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        : "Log Active";

    return (
        <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-8%" }}
            variants={AwwwardsRowReveal}
            onMouseEnter={() => cardEnter?.("READ")} onMouseLeave={cardLeave}
            onClick={() => { cardLeave(); onOpen(blog); }}
            className="group grid grid-cols-1 lg:grid-cols-[100px_1fr_2.2fr_3fr] gap-6 lg:gap-10 py-10 md:py-12 border-b border-[#17170F]/15 items-start transition-opacity duration-300 hover:opacity-60 cursor-none w-full"
        >
            <span className="text-base md:text-lg font-mono text-[#17170F]/30 font-black pt-1">.{formattedId}</span>

            {blog?.imageUrl && (
                <div className="w-full h-24 lg:h-full rounded-xl overflow-hidden bg-[#17170F]/5 shrink-0">
                    <img src={blog.imageUrl} alt={blog?.title || ""} className="w-full h-full object-cover" loading="lazy" />
                </div>
            )}

            <div className="space-y-3 md:space-y-4">
                <h4 className="text-xl md:text-3xl font-black uppercase tracking-tight text-[#17170F] leading-tight">
                    {blog?.title || "Untitled Transmission"}
                </h4>
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#17170F]/40 uppercase tracking-widest font-black">
                    <span className="text-[#DE5A34]">{formattedDate}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#17170F]/10" />
                    <span><Clock size={11} className="inline mr-1" /> {blog?.readTime || "5 min read"}</span>
                </div>
                {blogTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {blogTags.slice(0, 3).map((tag, i) => (
                            <span
                                key={i}
                                className="text-[9px] font-mono uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-[#E8C13B]/20 text-[#17170F]/70"
                            >
                                {cleanTag(tag)}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-between items-start gap-6 md:gap-8 w-full">
                <p className="text-xs sm:text-sm md:text-base font-medium text-[#17170F]/70 leading-relaxed font-sans">
                    {blog?.excerpt || "No summary parameters extracted."}
                </p>
                <div className="flex h-9 w-9 md:h-10 md:w-10 rounded-full border border-[#17170F]/10 items-center justify-center text-[#17170F] group-hover:bg-[#17170F] group-hover:text-[#EDEADF] transition-all duration-300 shrink-0">
                    <ArrowUpRight size={15} />
                </div>
            </div>
        </motion.div>
    );
});
TypoBlogRow.displayName = "TypoBlogRow";

const RowSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr_2.2fr_3fr] gap-6 lg:gap-10 py-10 md:py-12 border-b border-[#17170F]/10 animate-pulse">
        <div className="h-5 w-8 rounded bg-[#17170F]/10" />
        <div className="h-24 rounded-xl bg-[#17170F]/10" />
        <div className="space-y-3">
            <div className="h-6 w-3/4 rounded bg-[#17170F]/10" />
            <div className="h-3 w-1/2 rounded bg-[#17170F]/10" />
        </div>
        <div className="h-10 w-full rounded bg-[#17170F]/10" />
    </div>
);

const Blogs = () => {
    const sectionRef = useRef(null);
    const [blogsData, setBlogsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeBlog, setActiveBlog] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const dynamicBg = useTransform(scrollYProgress, [0.25, 1], ["#ED7A4D", "#EDEADF"]);

    useEffect(() => {
        api.get('/blogs')
            .then(res => { setBlogsData(res.data); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    }, []);

    const totalPages = Math.ceil(blogsData.length / itemsPerPage);
    const currentBlogs = blogsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const goToPage = (page) => {
        setCurrentPage(page);
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <>
            <motion.section
                ref={sectionRef}
                id="blogs"
                style={{ backgroundColor: dynamicBg }}
                className="relative w-full py-20 md:py-32 overflow-hidden text-[#17170F] border-t border-[#17170F]/10"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="text-left md:text-center mb-16 md:mb-28">
                        <span className="inline-block text-[10px] md:text-xs font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full bg-[#E8C13B] text-[#17170F] mb-5">
                            Archive
                        </span>
                        <h2 className="text-3xl sm:text-5xl md:text-8xl font-black tracking-tighter uppercase mb-4">
                            Insights / Blogs
                        </h2>
                    </div>

                    {loading ? (
                        <div className="flex flex-col w-full border-t-2 border-[#17170F]">
                            {Array.from({ length: 4 }).map((_, i) => <RowSkeleton key={i} />)}
                        </div>
                    ) : currentBlogs.length === 0 ? (
                        <div className="text-center py-20 font-mono uppercase tracking-widest text-[#17170F]/40">
                            No transmissions found.
                        </div>
                    ) : (
                        <div className="flex flex-col w-full border-t-2 border-[#17170F]">
                            {currentBlogs.map((blog, idx) => (
                                <TypoBlogRow key={blog._id} blog={blog} index={idx} onOpen={setActiveBlog} />
                            ))}
                        </div>
                    )}

                    {/* --- PAGINATION --- */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-3 mt-14">
                            <button
                                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#17170F]/15 text-[#17170F] disabled:opacity-30 hover:bg-[#17170F] hover:text-[#EDEADF] transition-colors"
                            >
                                <ChevronLeft size={16} />
                            </button>

                            {Array.from({ length: totalPages }).map((_, i) => {
                                const page = i + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        className={`h-10 w-10 rounded-full text-sm font-black transition-colors ${
                                            currentPage === page
                                                ? "bg-[#17170F] text-[#EDEADF]"
                                                : "border border-[#17170F]/15 text-[#17170F]/60 hover:bg-[#17170F]/10"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#17170F]/15 text-[#17170F] disabled:opacity-30 hover:bg-[#17170F] hover:text-[#EDEADF] transition-colors"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </motion.section>

            <BlogModal activeBlog={activeBlog} setActiveBlog={setActiveBlog} />
        </>
    );
};

export default Blogs;