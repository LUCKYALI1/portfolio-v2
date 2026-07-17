import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Terminal, Cpu, Code2, Database } from "lucide-react";

// ... (technicalSteps array remains the same) ...
const technicalSteps = [
  { label: "Initializing Environment...", icon: <Terminal size={14} /> },
  { label: "Compiling MERN Stack Modules...", icon: <Code2 size={14} /> },
  { label: "Allocating System Memory...", icon: <Cpu size={14} /> },
  { label: "Connecting to Knowledge Base...", icon: <Database size={14} /> },
];

const LoadingScreen = ({ onStartMusic, onComplete }) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  // --- STAGE 1: HANDLING MUSIC CHOICE ---
  const handleStart = (enableAudio) => {
    setHasInteracted(true);
    
    // 1. If user clicked Sound On, play music IMMEDIATELY
    if (enableAudio) {
        onStartMusic();
    }

    // 2. Start the progress bar
    startLoading();
  };

  // --- STAGE 2: LOADING SIMULATION ---
  const startLoading = () => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 500); // Finish
          return 100;
        }
        const jump = Math.floor(Math.random() * 5) + 1;
        const next = Math.min(prev + jump, 100);

        if (next < 30) setCurrentStep(0);
        else if (next < 60) setCurrentStep(1);
        else if (next < 80) setCurrentStep(2);
        else setCurrentStep(3);

        return next;
      });
    }, 50);
  };

  // --- ANIMATION VARIANTS (Curtain Lift) ---
  const exitAnimation = {
    y: "-100%", 
    transition: { 
      duration: 1.2, 
      ease: [0.76, 0, 0.24, 1],
      delay: 0.2
    } 
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center  text-white overflow-hidden cursor-default"
      initial={{ opacity: 1 }}
      exit={exitAnimation}
    >
      {/* Background Ambience */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div> */}

      <div className="relative z-10 w-full max-w-lg px-6">
        <AnimatePresence mode="wait">
          
          {/* --- STAGE 1: MUSIC CHOICE --- */}
          {!hasInteracted ? (
            <motion.div
              key="choice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="flex flex-col items-center gap-8"
            >
              <div className="text-center space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
                  LUCKY ALI <span className="text-green-500">PORTFOLIO</span>
                </h1>
                <p className="text-sm text-white/40 font-mono tracking-widest uppercase">
                  Select Experience Mode
                </p>
              </div>

              <div className="flex gap-6">
                <button
                  onClick={() => handleStart(true)}
                  className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-green-500/10 hover:border-green-500/50 transition-all duration-300 w-32"
                >
                  <div className="p-3 rounded-full bg-white/10 group-hover:bg-green-500 group-hover:text-black transition-colors">
                    <Volume2 size={24} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider group-hover:text-green-400">
                    Sound On
                  </span>
                </button>

                <button
                  onClick={() => handleStart(false)}
                  className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 w-32"
                >
                  <div className="p-3 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                    <VolumeX size={24} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Sound Off
                  </span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* --- STAGE 2: LOADING PROGRESS --- */
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col items-center"
            >
              {/* Progress Number */}
              <div className="flex items-end gap-2 mb-2">
                <span className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 font-mono tracking-tighter">
                  {progress}
                </span>
                <span className="text-xl md:text-2xl text-green-500 font-bold mb-4 md:mb-6">%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-6 relative">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-green-500 shadow-[0_0_20px_#22c55e]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              {/* Dynamic Tech Steps */}
              <div className="h-10 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="flex items-center gap-3 text-green-400/80 font-mono text-xs md:text-sm uppercase tracking-widest"
                  >
                    {technicalSteps[currentStep].icon}
                    {technicalSteps[currentStep].label}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Quote/Details */}
              <div className="absolute bottom-[-150px] text-center space-y-1">
                <p className="text-white/30 text-[10px] font-mono">
                  FULL STACK • DATA ENGINEER • PROBLEM SOLVER
                </p>
                <p className="text-white/10 text-[8px] tracking-[0.2em]">
                  ID: LUCKY_ALI_V2.0 // SYSTEM_READY
                </p>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;