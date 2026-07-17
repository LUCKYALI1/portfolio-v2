import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, BookOpen, Copy, Check } from 'lucide-react';

// --- COLOR TOKENS (unified with the rest of the site) ---
// cream  #EDEADF   ink   #17170F   coral  #DE5A34
// yellow #E8C13B   green #3D8B4C   stone  #8C8877

// ---------------------------------------------------------------
// CONTENT PARSER
// The blog API doesn't wrap code in ``` fences — it just drops a
// bare language name ("JavaScript") on its own line, followed by
// raw code. This walks the text line by line, keeps fenced blocks
// too (in case the backend adds them later), and treats anything
// that "reads like a sentence" as the signal to go back to prose.
// ---------------------------------------------------------------
const CODE_LANGS = [
    'javascript', 'js', 'jsx', 'typescript', 'ts', 'tsx', 'python', 'py',
    'html', 'css', 'json', 'bash', 'sh', 'shell', 'java', 'c', 'c++', 'cpp',
    'c#', 'csharp', 'sql', 'php', 'ruby', 'go', 'rust', 'yaml', 'markdown'
];

const CODE_START = /^(import|export|const|let|var|function|class|return|if|else|for|while|try|catch|new|async|await|switch|case|break|continue|public|private|static|def|print|select|insert|update|delete|<|\}|\{|\/\/|\/\*|#include|package|using)/i;

const isProseLine = (line) => {
    const t = line.trim();
    if (!t) return false;
    if (CODE_START.test(t)) return false;
    if (/[{}();,<>=]$/.test(t)) return false;
    const endsSentence = /[.!?:]$/.test(t);
    const wordCount = t.split(/\s+/).length;
    return endsSentence && wordCount >= 5;
};

const splitProse = (text) =>
    text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean).map(p => ({ type: 'p', text: p }));

const detectBareCode = (text) => {
    const lines = text.split('\n');
    const out = [];
    let i = 0;
    let proseBuffer = [];

    const flushProse = () => {
        if (proseBuffer.length) {
            const joined = proseBuffer.join('\n').trim();
            if (joined) out.push(...splitProse(joined));
            proseBuffer = [];
        }
    };

    while (i < lines.length) {
        const trimmed = lines[i].trim();
        const isLangLabel = CODE_LANGS.includes(trimmed.toLowerCase());

        if (isLangLabel) {
            flushProse();
            const lang = trimmed;
            i++;
            if (lines[i] === '') i++;
            const codeLines = [];
            while (i < lines.length && !isProseLine(lines[i])) {
                codeLines.push(lines[i]);
                i++;
            }
            while (codeLines.length && codeLines[codeLines.length - 1].trim() === '') codeLines.pop();
            if (codeLines.length) out.push({ type: 'code', lang, code: codeLines.join('\n') });
            continue;
        }

        proseBuffer.push(lines[i]);
        i++;
    }
    flushProse();
    return out;
};

const parseBlogContent = (content) => {
    if (!content) return [];
    const normalized = content.replace(/\r\n/g, '\n');
    const fenceRegex = /```(\w+)?\n?([\s\S]*?)```/g;

    if (fenceRegex.test(normalized)) {
        fenceRegex.lastIndex = 0;
        const out = [];
        let lastIndex = 0;
        let match;
        while ((match = fenceRegex.exec(normalized)) !== null) {
            const before = normalized.slice(lastIndex, match.index);
            if (before.trim()) out.push(...detectBareCode(before));
            out.push({ type: 'code', lang: match[1] || 'code', code: match[2].trim() });
            lastIndex = fenceRegex.lastIndex;
        }
        const rest = normalized.slice(lastIndex);
        if (rest.trim()) out.push(...detectBareCode(rest));
        return out;
    }

    return detectBareCode(normalized);
};

// --- lightweight single-pass syntax highlighter (no external deps) ---
const escapeHtml = (str) =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const TOKEN_PATTERN = /(\/\/[^\n]*)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)|\b(const|let|var|function|return|import|from|export|default|if|else|for|while|new|class|extends|async|await|try|catch|useState|useEffect|useCallback|useMemo)\b|\b(\d+)\b/g;

const highlightCode = (code) => {
    const escaped = escapeHtml(code);
    return escaped.replace(TOKEN_PATTERN, (match, comment, str, keyword, number) => {
        if (comment) return `<span class="text-[#8C8877] italic">${comment}</span>`;
        if (str) return `<span class="text-[#E8C13B]">${str}</span>`;
        if (keyword) return `<span class="text-[#DE5A34] font-bold">${keyword}</span>`;
        if (number) return `<span class="text-[#7FB77E]">${number}</span>`;
        return match;
    });
};

const CodeBlock = ({ lang, code }) => {
    const [copied, setCopied] = useState(false);
    const html = useMemo(() => highlightCode(code), [code]);

    const handleCopy = () => {
        navigator.clipboard?.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="my-6 rounded-2xl overflow-hidden border border-[#EDEADF]/10 shadow-inner bg-[#17170F]">
            <div className="flex items-center justify-between px-5 py-2.5 border-b border-[#EDEADF]/10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E8C13B]">
                    {lang}
                </span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#EDEADF]/50 hover:text-[#EDEADF] transition-colors"
                >
                    {copied ? <Check size={12} className="text-[#3D8B4C]" /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-[#EDEADF]">
                <code dangerouslySetInnerHTML={{ __html: html }} />
            </pre>
        </div>
    );
};

const cleanTag = (tag) => String(tag).replace(/^"+|"+$/g, '');

const BlogModal = ({ activeBlog, setActiveBlog }) => {
    const blocks = useMemo(() => parseBlogContent(activeBlog?.content), [activeBlog]);

    return (
        <AnimatePresence>
            {activeBlog && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="fixed inset-0 w-full h-full bg-[#17170F]/95 backdrop-blur-2xl z-[9999] overflow-y-auto p-4 md:p-12 flex items-start justify-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-4xl rounded-3xl bg-[#EDEADF] text-[#17170F] overflow-hidden mt-4 mb-8 border border-[#17170F]/10 shadow-2xl"
                    >
                        {/* Close Trigger */}
                        <div className="absolute top-6 right-6 z-50">
                            <button
                                onClick={() => setActiveBlog(null)}
                                className="p-3 rounded-full bg-[#17170F] text-[#EDEADF] hover:bg-[#DE5A34] transition-colors shadow-xl"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Image */}
                        {activeBlog.imageUrl && (
                            <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden border-b border-[#17170F]/10">
                                <img src={activeBlog.imageUrl} className="w-full h-full object-cover" alt={activeBlog.title} />
                                {Array.isArray(activeBlog.tags) && activeBlog.tags.length > 0 && (
                                    <div className="absolute inset-x-6 bottom-6 flex flex-wrap gap-2">
                                        {activeBlog.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="text-[10px] font-mono tracking-widest uppercase bg-[#17170F] text-[#EDEADF] px-4 py-1.5 rounded-md font-bold shadow-md"
                                            >
                                                {cleanTag(tag)}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-8 md:p-12 space-y-6">
                            <div className="flex flex-wrap gap-6 items-center text-[11px] font-mono text-[#17170F]/40 border-b border-[#17170F]/10 pb-6 font-black">
                                {activeBlog.date && (
                                    <span className="flex items-center gap-2 text-[#DE5A34]">
                                        <Calendar size={14} />
                                        {new Date(activeBlog.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                    </span>
                                )}
                                {activeBlog.readTime && (
                                    <span className="flex items-center gap-2"><Clock size={14} /> {activeBlog.readTime}</span>
                                )}
                                <span className="flex items-center gap-2 text-[#3D8B4C]"><BookOpen size={14} /> Verified</span>
                            </div>

                            <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-[#17170F] uppercase leading-none">
                                {activeBlog.title}
                            </h3>

                            <div className="pt-4">
                                {blocks.length === 0 && (
                                    <p className="text-[#17170F]/50 italic">No content available for this post yet.</p>
                                )}
                                {blocks.map((block, i) =>
                                    block.type === 'code' ? (
                                        <CodeBlock key={i} lang={block.lang} code={block.code} />
                                    ) : (
                                        <p key={i} className="mb-6 font-sans text-[#17170F]/80 leading-relaxed text-lg whitespace-pre-line">
                                            {block.text}
                                        </p>
                                    )
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BlogModal;