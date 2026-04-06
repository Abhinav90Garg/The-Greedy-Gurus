import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuickPoll = () => {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);
  const [view, setView] = useState('list'); // 'list' or 'create'
  
  // Anti-Spam: Track voted polls in LocalStorage
  const [votedPolls, setVotedPolls] = useState(() => {
    return JSON.parse(localStorage.getItem('votedPolls')) || {};
  });

  // Create Form State
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  // Fetch polls periodically for "Live" effect
  const fetchPolls = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/quickpoll/list");
      const data = await res.json();
      setPolls(data.polls || []);
    } catch (err) {
      console.error("Failed to fetch polls", err);
    }
  };

  useEffect(() => {
    fetchPolls();
    const interval = setInterval(fetchPolls, 2000); // Live sync every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const handleVote = async (pollId, optionId) => {
    if (votedPolls[pollId]) return; // Prevent double voting
    
    // Optimistic UI update
    const newVoted = { ...votedPolls, [pollId]: optionId };
    setVotedPolls(newVoted);
    localStorage.setItem('votedPolls', JSON.stringify(newVoted));

    try {
      await fetch("http://127.0.0.1:8000/quickpoll/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poll_id: pollId, option_id: optionId })
      });
      fetchPolls(); // Refresh instantly
    } catch (err) {
      console.error("Vote failed", err);
    }
  };

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://127.0.0.1:8000/quickpoll/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, options })
      });
      setQuestion("");
      setOptions(["", ""]);
      setView('list');
      fetchPolls();
    } catch (err) {
      console.error("Failed to create poll", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col font-sans overflow-y-auto">
      {/* HEADER */}
      <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-xl flex items-center px-10 justify-between shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Icons.BarChart3 size={18} className="text-yellow-500" />
          <h2 className="text-sm font-black tracking-widest uppercase italic">TELEMETRY_POLLS_v1</h2>
        </div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
          <Icons.ArrowLeft size={16} /> Back to Dashboard
        </button>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-10 flex flex-col">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-10 gap-4">
          <button onClick={() => setView('list')} className={`px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all border ${view === 'list' ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}>
            Live Data Board
          </button>
          <button onClick={() => setView('create')} className={`px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all border ${view === 'create' ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}>
            Initialize Poll
          </button>
        </div>

        <AnimatePresence mode="wait">
          {view === 'create' ? (
            /* CREATE POLL FORM */
            <motion.form key="create" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} onSubmit={handleCreatePoll} className="w-full bg-white/[0.02] border border-white/10 p-10 rounded-[3rem] shadow-2xl">
              <div className="mb-8">
                <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-3">Target Query</label>
                <input required type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="e.g. Which API architecture should we deploy?" className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-lg focus:border-yellow-500 outline-none transition-colors" />
              </div>
              
              <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-3">Parameters (Options)</label>
              <div className="space-y-4 mb-8">
                {options.map((opt, idx) => (
                  <div key={idx} className="flex gap-4">
                    <input required type="text" value={opt} onChange={(e) => {
                      const newOpts = [...options];
                      newOpts[idx] = e.target.value;
                      setOptions(newOpts);
                    }} placeholder={`Option ${idx + 1}`} className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-yellow-500 outline-none transition-colors" />
                    {idx > 1 && (
                      <button type="button" onClick={() => setOptions(options.filter((_, i) => i !== idx))} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20">
                        <Icons.Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <button type="button" onClick={() => setOptions([...options, ""])} className="mb-8 text-yellow-500 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:text-yellow-400">
                <Icons.Plus size={16} /> Add Parameter
              </button>

              <button type="submit" className="w-full py-4 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-widest text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(202,138,4,0.3)]">
                Deploy Survey
              </button>
            </motion.form>
          ) : (
            /* POLLS LIST / LIVE CHARTS */
            <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full space-y-8">
              {polls.length === 0 ? (
                 <p className="text-center text-gray-500 mt-20 font-mono tracking-widest uppercase">No active telemetry found.</p>
              ) : (
                polls.map((poll) => {
                  const hasVoted = !!votedPolls[poll.id];
                  return (
                    <div key={poll.id} className="bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-transparent"></div>
                      <h3 className="text-2xl font-bold mb-6 tracking-tight">{poll.question}</h3>
                      
                      <div className="space-y-4">
                        {poll.options.map((opt) => {
                          const percentage = poll.total_votes > 0 ? Math.round((opt.votes / poll.total_votes) * 100) : 0;
                          const isMyVote = votedPolls[poll.id] === opt.id;

                          return (
                            <button 
                              key={opt.id}
                              disabled={hasVoted}
                              onClick={() => handleVote(poll.id, opt.id)}
                              className={`w-full relative overflow-hidden flex items-center justify-between p-4 rounded-xl border transition-all ${
                                hasVoted 
                                  ? isMyVote ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/5 bg-black/50' 
                                  : 'border-white/10 bg-white/5 hover:border-yellow-500/50 hover:bg-white/10'
                              }`}
                            >
                              {/* Live Chart Progress Bar */}
                              {hasVoted && (
                                <motion.div 
                                  initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 0.5, ease: "easeOut" }}
                                  className={`absolute top-0 left-0 h-full opacity-20 ${isMyVote ? 'bg-yellow-500' : 'bg-gray-500'}`} 
                                />
                              )}
                              
                              <span className="relative z-10 font-medium flex items-center gap-3">
                                {isMyVote && <Icons.CheckCircle2 size={16} className="text-yellow-500" />}
                                {opt.text}
                              </span>
                              
                              {hasVoted && (
                                <span className="relative z-10 font-mono text-xs tracking-widest opacity-70">
                                  {percentage}% <span className="text-[10px] ml-1">({opt.votes})</span>
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      
                      <div className="mt-6 flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        <span>Total Signals: {poll.total_votes}</span>
                        {hasVoted && <span className="text-yellow-500/70">Vote Recorded</span>}
                      </div>
                    </div>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default QuickPoll;