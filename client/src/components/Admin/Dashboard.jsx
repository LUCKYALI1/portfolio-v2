import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectForm from './ProjectForm';
import BlogForm from './BlogForm';

const Dashboard = () => {
  // 'projects' ya 'blogs' active control karne ke liye state
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <section className="relative w-full min-h-screen mt-10 bg-black text-white flex flex-col items-center justify-start pt-16 pb-12 px-4 sm:px-6 lg:px-8 font-sans overflow-y-auto selection:bg-cyan-500/30">
      
      {/* MATRIX BACKGROUND GRID EFFECT */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #27272a 1px, transparent 1px),
            linear-gradient(to bottom, #27272a 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* SYSTEM CONTROLLER BACKBONE CONTAINER */}
      <div className="relative z-10 w-full max-w-4xl space-y-8">
        
        {/* OVERALL TITLE LOGS */}
        <div className="text-center md:text-left space-y-2 border-b border-zinc-900 pb-6">
          <div className="inline-flex items-center gap-1.5 font-mono text-[9px] text-cyan-400 border border-cyan-950 bg-cyan-950/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Main System Management Console ●
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">System Control Matrix</h1>
          <p className="text-zinc-500 text-xs max-w-md leading-relaxed">
            Initialize asset uploads, orchestrate interactive application instances, or inject raw documentation blogs directly into the server hub.
          </p>
        </div>

        {/* ⚡ TAB NAVIGATION ENGINE */}
        <div className="flex justify-center md:justify-start items-center">
          <div className="flex bg-[#09090b] border border-zinc-900 p-1 rounded-xl relative">
            
            {/* Project Tab Toggle */}
            <button
              onClick={() => setActiveTab('projects')}
              className={`relative px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider z-10 transition-colors duration-300 rounded-lg cursor-pointer ${
                activeTab === 'projects' ? 'text-black' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {activeTab === 'projects' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-lg -z-10 shadow-lg shadow-cyan-500/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              Application Instances
            </button>

            {/* Blog Tab Toggle */}
            <button
              onClick={() => setActiveTab('blogs')}
              className={`relative px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider z-10 transition-colors duration-300 rounded-lg cursor-pointer ${
                activeTab === 'blogs' ? 'text-black' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {activeTab === 'blogs' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-lg -z-10 shadow-lg shadow-cyan-500/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              Documentation Logs
            </button>

          </div>
        </div>

        {/* 🎭 RENDER ENGINE LAYER WITH ANIMS */}
        <div className="w-full relative mt-4">
          <AnimatePresence mode="wait">
            {activeTab === 'projects' ? (
              <motion.div
                key="projects-panel"
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full"
              >
                <ProjectForm />
              </motion.div>
            ) : (
              <motion.div
                key="blogs-panel"
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full"
              >
                <BlogForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;