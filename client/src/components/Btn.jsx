import React from 'react';
import { motion } from 'framer-motion';

const Btn = ({ data = "View Experiences", inverted = false, url }) => {
    return (
        <div className="flex items-center justify-center">
            <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 rounded-full border transition-all duration-300 py-2 pl-2 pr-6 overflow-hidden backdrop-blur-md"
                style={{
                    backgroundColor: inverted ? "rgba(241, 237, 228, 0.15)" : "rgba(26, 26, 26, 0.08)",
                    borderColor: inverted ? "rgba(241, 237, 228, 0.2)" : "rgba(26, 26, 26, 0.15)",
                }}
                whileHover={{
                    paddingRight: "8px",
                    backgroundColor: inverted ? "rgba(241, 237, 228, 0.25)" : "rgba(26, 26, 26, 0.15)",
                    borderColor: inverted ? "rgba(241, 237, 228, 0.4)" : "rgba(26, 26, 26, 0.3)",
                }}
                initial="initial"
                whileHover="hover"
                layout
            >
                {/* --- Left Icon Circle (Visible Initially) --- */}
                {/* Restructured background configurations to avoid absolute black values */}
                <motion.div
                    variants={{
                        initial: { width: "2.5rem", scale: 1, opacity: 1 },
                        hover: { width: 0, scale: 0, opacity: 0 }
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full shadow-sm"
                    style={{
                        backgroundColor: inverted ? "#E5E552" : "#1a1a1a",
                        color: inverted ? "#1a1a1a" : "#F1EDE4"
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </motion.div>

                {/* --- Text Label --- */}
                <motion.span
                    layout
                    className="whitespace-nowrap px-2 text-xs font-black uppercase tracking-widest transition-colors duration-300"
                    style={{ color: inverted ? "#1a1a1a" : "#F1EDE4" }}
                >
                    {data}
                </motion.span>

                {/* --- Right Icon Circle (Visible on Hover) --- */}
                <motion.div
                    variants={{
                        initial: { width: 0, scale: 0, opacity: 0 },
                        hover: { width: "2.5rem", scale: 1, opacity: 1 }
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full shadow-sm"
                    style={{
                        backgroundColor: inverted ? "#F1EDE4" : "#E5E552",
                        color: "#1a1a1a"
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </motion.div>

            </motion.a>
        </div>
    );
};

export default Btn;