import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '../../apis/api'; // Aapka custom API client instance

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    readTime: '',
    tagsRaw: '', // Temporary state string inputs handle karne ke liye
  });

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
      setStatusFeedback({ type: 'error', text: '[CRITICAL]: Blog image asset file is required.' });
      return;
    }

    setIsLoading(true);
    setStatusFeedback({ type: '', text: '' });

    // Clean and convert comma-separated tags to array strings
    const cleanTags = formData.tagsRaw
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');

    // Multi-part binary form data payload generation
    const uploadForm = new FormData();
    uploadForm.append('title', formData.title);
    uploadForm.append('excerpt', formData.excerpt);
    uploadForm.append('content', formData.content);
    uploadForm.append('readTime', formData.readTime);
    uploadForm.append('tags', cleanTags); 
    uploadForm.append('image', imageFile); // Note: Key backend ke upload.single('image') se match honi chahiye

    try {
      const response = await api.post('/admin/blog', uploadForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setStatusFeedback({
        type: 'success',
        text: response.data.message || 'Blog instance deployed successfully!',
      });

      // Clear all variables post transaction success
      setFormData({ title: '', excerpt: '', content: '', readTime: '', tagsRaw: '' });
      setImageFile(null);
    } catch (error) {
      const failMsg = error.response?.data?.message || 'Handshake failed during data deployment.';
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

      {/* CORE WORKSPACE */}
      <div className="relative z-10 w-full max-w-2xl bg-[#09090b]/90 border border-zinc-900 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-md space-y-8">
        
        {/* HEADER SECTION */}
        <div className="space-y-2 text-center sm:text-left border-b border-zinc-900 pb-6">
          <div className="inline-flex items-center gap-1.5 font-mono text-[9px] text-emerald-400 border border-emerald-950 bg-emerald-950/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Content Server Interface Active ●
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Create Blog Post</h1>
          <p className="text-zinc-500 text-xs leading-relaxed max-w-md">
            Deploy fresh documentation logs, engineering research, and dynamic case studies into the global database registry.
          </p>
        </div>

        {/* FEEDBACK SYSTEM NOTIFICATION */}
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

        {/* COMPONENT RENDER ENGINE FORM */}
        <form onSubmit={handleFormSubmit} className="space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Blog Title
              </label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="e.g., The Architecture of Microservices" 
                className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500/80 transition-colors duration-200 disabled:opacity-50" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Read Time <span className="text-zinc-600">(e.g., 5 min)</span>
              </label>
              <input 
                type="text" 
                name="readTime"
                value={formData.readTime}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="5 min read" 
                className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500/80 transition-colors duration-200 disabled:opacity-50" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
              Log Excerpt / Summary
            </label>
            <input 
              type="text" 
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              placeholder="A brief overview parameters to hook readers before full execution logs..." 
              className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500/80 transition-colors duration-200 disabled:opacity-50" 
            />
          </div>

          {/* DRAG AND DROP ZONE */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
              Cover Image Layout Asset
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
                  <p className="text-xs font-mono font-bold text-emerald-400">⚡ LOGGED COVER VECTOR TARGETED</p>
                  <p className="text-[11px] text-zinc-400 max-w-xs truncate mx-auto">{imageFile.name}</p>
                </div>
              ) : (
                <div className="space-y-1 font-mono text-xs">
                  <p className="text-zinc-400">Drag & drop high-res banner block graphic</p>
                  <p className="text-zinc-600 text-[10px]">or <span className="text-cyan-400 hover:underline">browse storage terminal</span></p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
              Tags / Keywords Meta <span className="text-zinc-600">(Comma separated)</span>
            </label>
            <input 
              type="text" 
              name="tagsRaw"
              value={formData.tagsRaw}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              placeholder="Nextjs, Devops, System Design, Javascript" 
              className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500/80 transition-colors duration-200 disabled:opacity-50" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
              Core Technical Content Body
            </label>
            <textarea 
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              rows="6"
              placeholder="Inject full documentation manifest data. Markdown or clean layout text segments are parsed into data streams..." 
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
                  Streaming Matrix Logs...
                </>
              ) : (
                "Deploy Blog Instance ⚡"
              )}
            </motion.button>
          </div>

        </form>

      </div>
    </section>
  );
};

export default BlogForm;