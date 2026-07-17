import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '../../apis/api';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    techStackRaw: '',
  });
  
  // File state jo real file object hold karegi
  const [imageFile, setImageFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState({ type: '', text: '' });
  
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (statusFeedback.text) setStatusFeedback({ type: '', text: '' });
  };

  // --- DRAG & DROP HANDLERS ---
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // --- FORM SUBMIT TRANSACTION ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
        setStatusFeedback({ type: 'error', text: '[CRITICAL]: Image asset file is required.' });
        return;
    }

    setIsLoading(true);
    setStatusFeedback({ type: '', text: '' });

    // Sanitize tech stack list
    const cleanTechStack = formData.techStackRaw
      .split(',')
      .map((tech) => tech.trim())
      .filter((tech) => tech !== '');

    // ⚡ CRITICAL: FormData object ka use karenge binary file transfer ke liye
    const uploadForm = new FormData();
    uploadForm.append('title', formData.title);
    uploadForm.append('url', formData.url);
    uploadForm.append('description', formData.description);
    uploadForm.append('techStack', cleanTechStack); // Array pass ho rha h stringify hoke
    uploadForm.append('image', imageFile); // 'image' key backend upload.single('image') se match honi chahiye

    try {
      // API call with FormData payload
      const response = await api.post('/upload/projects', uploadForm, {
        headers: {
            'Content-Type': 'multipart/form-data' // Browser automatic dynamic boundaries handle kar lega
        }
      });
      
      setStatusFeedback({
        type: 'success',
        text: response.data.message || 'System updated successfully!',
      });

      // Clear states after transaction success
      setFormData({ title: '', url: '', description: '', techStackRaw: '' });
      setImageFile(null);
    } catch (error) {
      const failMsg = error.response?.data?.message || 'Handshake failed during deployment.';
      setStatusFeedback({ type: 'error', text: `[CRITICAL]: ${failMsg}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-black text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-y-auto selection:bg-cyan-500/30">
      
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

      {/* CORE FORM WORKSPACE */}
      <div className="relative z-10 w-full max-w-2xl bg-[#09090b]/90 border border-zinc-900 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-md space-y-8">
        
        {/* HEADER SECTION */}
        <div className="space-y-2 text-center sm:text-left border-b border-zinc-900 pb-6">
          <div className="inline-flex items-center gap-1.5 font-mono text-[9px] text-emerald-400 border border-emerald-950 bg-emerald-950/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Admin Session Active ●
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Project Deployment</h1>
          <p className="text-zinc-500 text-xs leading-relaxed max-w-md">
            Welcome, Lucky Ali. Deploy new interactive applications, architectures, and portfolio builds to the live system database.
          </p>
        </div>

        {/* NOTIFICATION FEEDBACK */}
        {statusFeedback.text && (
          <div 
            className={`text-xs font-mono border px-4 py-3 rounded-xl transition-all ${
              statusFeedback.type === 'success' 
                ? 'border-emerald-900/50 bg-emerald-950/20 text-emerald-400' 
                : 'border-red-900/50 bg-red-950/20 text-red-400'
            }`}
          >
            {statusFeedback.type === 'success' ? '🚀 [SUCCESS]: ' : '⚠️ '}
            {statusFeedback.text}
          </div>
        )}

        {/* INPUT FORM RUNTIME */}
        <form onSubmit={handleFormSubmit} className="space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Project Title
              </label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="e.g., AlgoVision Visualizer" 
                className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500/80 transition-colors duration-200 disabled:opacity-50" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Deployment Live URL
              </label>
              <input 
                type="url" 
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="https://algovision.dev" 
                className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500/80 transition-colors duration-200 disabled:opacity-50" 
              />
            </div>
          </div>

          {/* ⚡ DRAG AND DROP CONTAINER ZONE */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
              Asset Image Deployment Area
            </label>
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => !isLoading && fileInputRef.current.click()}
              className={`w-full border rounded-xl p-6 text-center cursor-pointer flex flex-col items-center justify-center min-h-[120px] transition-all duration-300 ${
                isDragActive 
                  ? 'border-cyan-500 bg-cyan-950/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                  : imageFile 
                    ? 'border-emerald-500/50 bg-emerald-950/5' 
                    : 'border-zinc-800 bg-white/[0.01] hover:border-zinc-700'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                disabled={isLoading}
                className="hidden"
              />
              
              {imageFile ? (
                <div className="space-y-1">
                  <p className="text-xs font-mono font-bold text-emerald-400">⚡ FILE LOCKED AND REAPED</p>
                  <p className="text-[11px] text-zinc-400 max-w-xs truncate mx-auto">{imageFile.name}</p>
                  <p className="text-[9px] text-zinc-600 font-mono uppercase">{(imageFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="space-y-1 font-mono text-xs">
                  <p className="text-zinc-400">Drag & drop project layout matrix here</p>
                  <p className="text-zinc-600 text-[10px]">or <span className="text-cyan-400 hover:underline">browse terminal file system</span></p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
              Tech Stack Architecture <span className="text-zinc-600">(Comma separated)</span>
            </label>
            <input 
              type="text" 
              name="techStackRaw"
              value={formData.techStackRaw}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              placeholder="React, Node.js, Express, MongoDB, Tailwind" 
              className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500/80 transition-colors duration-200 disabled:opacity-50" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
              Functional Manifest / Description
            </label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              rows="4"
              placeholder="Outline the parameters, architectural choices, and core functionality implemented within this deployment instance..." 
              className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500/80 transition-colors duration-200 resize-none disabled:opacity-50" 
            />
          </div>

          <div className="pt-2">
            <motion.button 
              whileHover={{ scale: isLoading ? 1 : 1.01 }}
              whileTap={{ scale: isLoading ? 1 : 0.99 }}
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black font-extrabold text-xs rounded-xl font-mono py-3.5 tracking-wider uppercase shadow-lg shadow-emerald-500/10 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Processing Transaction...
                </>
              ) : (
                "Deploy Project Instance ⚡"
              )}
            </motion.button>
          </div>

        </form>

      </div>
    </section>
  );
};

export default ProjectForm;