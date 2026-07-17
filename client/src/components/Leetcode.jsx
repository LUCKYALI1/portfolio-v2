import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Trophy, Zap, ExternalLink, MapPin, Globe, CheckCircle2 } from "lucide-react";

const USERNAME = "Luckyalim_";
const API_URL = `https://leetscan.vercel.app/${USERNAME}`; 

const LeetCode = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(API_URL).then(res => res.json()).then(res => { setData(res); setLoading(false); });
    }, []);

    if (loading) return <div className="min-h-screen bg-[#F1EDE4] flex items-center justify-center font-mono text-xs uppercase text-[#1a1a1a]">_LOADING_STATS_</div>;

    const chartData = [
        { name: 'Easy', value: data.easySolved, color: '#22c55e' },
        { name: 'Medium', value: data.mediumSolved, color: '#eab308' },
        { name: 'Hard', value: data.hardSolved, color: '#ef4444' },
    ];

    return (
        <section className="w-full py-24 px-6 md:px-12 bg-[#F1EDE4] text-[#1a1a1a]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-[#1a1a1a] pb-10 mb-12">
                    <div>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">LeetCode <span className="text-[#ED7A4D]">Stats</span></h2>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] mt-2">// Engineering Progress & Performance</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Grid: Profile & Pie Chart */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="bg-white/50 p-8 rounded-3xl border border-[#1a1a1a]/10">
                            <img src={data.profile.userAvatar} className="w-24 h-24 rounded-2xl mb-6 border border-[#1a1a1a]" alt="avatar" />
                            <h3 className="text-3xl font-black uppercase tracking-tight">{data.profile.realName}</h3>
                            <p className="font-mono text-[#ED7A4D] mb-6">@{data.username}</p>
                            <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
                                <span className="flex items-center gap-2"><MapPin size={12}/> {data.profile.company || "Indie"}</span>
                                <span className="flex items-center gap-2"><Globe size={12}/> Web Portfolio</span>
                            </div>
                        </div>

                        {/* Pie Chart Component */}
                        <div className="bg-white/50 p-8 rounded-3xl border border-[#1a1a1a]/10 h-80">
                            <h4 className="text-[10px] font-black uppercase tracking-widest mb-4">// Distribution</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                        {chartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Right Grid: Recent Activity & Stats */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Stats List */}
                        <div className="bg-white/50 p-8 rounded-3xl border border-[#1a1a1a]/10 space-y-6">
                            {[ { label: 'Ranking', val: data.ranking }, { label: 'Reputation', val: data.reputation }, { label: 'Total Solved', val: data.totalSolved } ].map((item, i) => (
                                <div key={i} className="flex justify-between border-b border-[#1a1a1a]/10 pb-4">
                                    <span className="text-[10px] uppercase font-bold tracking-widest">{item.label}</span>
                                    <span className="font-mono font-black">{item.val}</span>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity List */}
                        <div className="bg-[#1a1a1a] text-[#F1EDE4] p-8 rounded-3xl h-[500px] overflow-y-auto custom-scrollbar">
                            <h4 className="text-[10px] font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4">// Latest Submissions</h4>
                            {data.recentSubmissions.map((sub, i) => (
                                <div key={i} className="mb-4 pb-4 border-b border-white/5 last:border-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold truncate pr-4">{sub.title}</span>
                                        {sub.statusDisplay === "Accepted" ? <CheckCircle2 size={12} className="text-green-500" /> : null}
                                    </div>
                                    <span className="text-[9px] font-mono text-white/40 uppercase">{sub.lang} • {new Date(parseInt(sub.timestamp) * 1000).toLocaleDateString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeetCode;