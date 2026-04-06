import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

const DevMatch = () => {
  const navigate = useNavigate();
  // Simple session mock for hackathon purposes
  const [userId] = useState(() => "user_" + Math.random().toString(36).substr(2, 9)); 
  const [hasProfile, setHasProfile] = useState(false);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  // Profile Form State
  const [formData, setFormData] = useState({
    name: '', role: 'Frontend Developer', skills: '', lookingFor: ''
  });

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const profilePayload = {
      user_id: userId,
      name: formData.name,
      role: formData.role,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      looking_for: formData.lookingFor.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      await fetch("http://127.0.0.1:8000/devmatch/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profilePayload)
      });
      setHasProfile(true);
      fetchMatches();
    } catch (err) {
      console.error("Failed to create profile", err);
    }
    setLoading(false);
  };

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/devmatch/match/${userId}`);
      const data = await res.json();
      setMatches(data.matches || []);
    } catch (err) {
      console.error("Failed to fetch matches", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col font-sans overflow-y-auto">
      {/* HEADER */}
      <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-xl flex items-center px-10 justify-between shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Icons.Users size={18} className="text-orange-500" />
          <h2 className="text-sm font-black tracking-widest uppercase italic">TEAM_SYNC_PROTOCOL</h2>
        </div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
          <Icons.ArrowLeft size={16} /> Back to Dashboard
        </button>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-10 flex flex-col items-center justify-center">
        
        {!hasProfile ? (
          /* ==================================
             PHASE 1: PROFILE CREATION
          ================================== */
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-400">
                <Icons.UserPlus size={32} />
              </div>
              <h1 className="text-3xl font-black uppercase tracking-tighter">Initialize Profile</h1>
              <p className="text-gray-500 text-sm mt-2">Enter your specs to find your ideal hackathon team.</p>
            </div>

            <form onSubmit={handleCreateProfile} className="space-y-6 bg-white/[0.02] border border-white/10 p-8 rounded-3xl shadow-2xl">
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-2">Codename</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Abhinav Garg" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-2">Primary Role</label>
                <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors appearance-none">
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Fullstack Ninja</option>
                  <option>UI/UX Designer</option>
                  <option>AI/ML Engineer</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-2">Your Tech Stack (Comma separated)</label>
                <input required type="text" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} placeholder="e.g. React, Tailwind, Python" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-2">Looking For (Comma separated)</label>
                <input required type="text" value={formData.lookingFor} onChange={(e) => setFormData({...formData, lookingFor: e.target.value})} placeholder="e.g. Figma, Node.js, MongoDB" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors" />
              </div>
              
              <button type="submit" disabled={loading} className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] disabled:opacity-50 mt-4">
                {loading ? 'Compiling...' : 'Generate Match Matrix'}
              </button>
            </form>
          </motion.div>
        ) : (
          /* ==================================
             PHASE 2: MATCHING DASHBOARD
          ================================== */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4">
                  Neural Matches <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-sm rounded-full border border-orange-500/30">{matches.length} Found</span>
                </h1>
                <p className="text-gray-500 mt-2 text-sm">Based on intersecting skill graphs and project requirements.</p>
              </div>
              <button onClick={fetchMatches} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
                <Icons.RefreshCw size={20} className={loading ? "animate-spin text-orange-400" : "text-gray-400"} />
              </button>
            </div>

            {matches.length === 0 && !loading ? (
              <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                <Icons.Ghost size={48} className="mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-bold text-gray-400">No compatible targets found.</h3>
                <p className="text-gray-600 text-sm">Expand your required tech stack to widen the net.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matches.map((match, idx) => (
                  <motion.div key={match.user_id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl hover:border-orange-500/50 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                          {match.user.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{match.user.name}</h3>
                          <p className="text-orange-400 text-xs font-mono tracking-widest uppercase">{match.user.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-green-400">{match.match_percentage}%</div>
                        <div className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">Match Rate</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-2">Verified Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {match.user.skills.map(skill => (
                            <span key={skill} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs">{skill}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-2">Seeking</p>
                        <div className="flex flex-wrap gap-2">
                          {match.user.looking_for.map(skill => (
                            <span key={skill} className="px-2 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-300 rounded-md text-xs">{skill}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-6 py-3 bg-white text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-2">
                      <Icons.MessageSquare size={16} /> Initiate Comms
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default DevMatch;