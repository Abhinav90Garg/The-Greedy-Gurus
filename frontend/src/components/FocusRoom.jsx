import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

const FocusRoom = () => {
  const navigate = useNavigate();
  
  const [userId] = useState("hacker_" + Math.random().toString(36).substr(2, 5));
  const [userName] = useState("Guest Hacker"); 
  
  const [timeLeft, setTimeLeft] = useState(25 * 60); 
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('Pomodoro'); 
  const [leaderboard, setLeaderboard] = useState([]);
  
  const timerRef = useRef(null);

  
  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/focus/leaderboard");
      const data = await res.json();
      setLeaderboard(data.leaderboard || []);
    } catch (err) {
      console.error("Failed to fetch leaderboard", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      handleCompleteSession();
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'Pomodoro' ? 25 * 60 : 5 * 60);
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'Pomodoro' ? 25 * 60 : 5 * 60);
  };

  const handleCompleteSession = async () => {
    setIsActive(false);
    
    if (mode === 'Pomodoro') {
      const minutesFocused = 25; 
      try {
        await fetch("http://127.0.0.1:8000/focus/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, name: userName, minutes_focused: minutesFocused })
        });
        fetchLeaderboard(); 
      } catch (err) {
        console.error("Failed to log time", err);
      }
    }
    alert(mode === 'Pomodoro' ? "Session Complete! Points added to leaderboard." : "Break over! Back to work.");
    resetTimer();
  };

  
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col font-sans overflow-hidden">
      
      <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-xl flex items-center px-10 justify-between shrink-0 z-50">
        <div className="flex items-center gap-3">
          <Icons.LayoutGrid size={18} className="text-purple-500" />
          <h2 className="text-sm font-black tracking-widest uppercase italic">DEEP_WORK_ENVIRONMENT</h2>
        </div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
          <Icons.ArrowLeft size={16} /> Back to Dashboard
        </button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-6 gap-6">
        
        
        <section className="flex-1 flex flex-col items-center justify-center bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 relative overflow-hidden">
          
          {isActive && <div className="absolute inset-0 bg-purple-500/10 blur-[100px] animate-pulse"></div>}
          
          <div className="relative z-10 flex gap-4 mb-12 bg-black/50 p-2 rounded-full border border-white/10">
            <button onClick={() => changeMode('Pomodoro')} className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${mode === 'Pomodoro' ? 'bg-purple-500 text-white' : 'text-gray-500 hover:text-white'}`}>Focus</button>
            <button onClick={() => changeMode('Short Break')} className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${mode === 'Short Break' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-white'}`}>Short Break</button>
          </div>

          <div className="relative flex items-center justify-center w-80 h-80 mb-12">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="160" cy="160" r="150" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle cx="160" cy="160" r="150" fill="none" stroke={mode === 'Pomodoro' ? '#a855f7' : '#3b82f6'} strokeWidth="8" strokeDasharray="942" strokeDashoffset={isActive ? 942 - (942 * (timeLeft / (mode === 'Pomodoro' ? 1500 : 300))) : 0} className="transition-all duration-1000 ease-linear" strokeLinecap="round" />
            </svg>
            <h1 className="text-7xl font-black font-mono tracking-tighter">{formatTime(timeLeft)}</h1>
          </div>

          <div className="flex gap-6 relative z-10">
            <button onClick={toggleTimer} className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95 ${isActive ? 'bg-white/10 text-white border border-white/20' : 'bg-purple-600 text-white'}`}>
              {isActive ? <Icons.Pause size={32} /> : <Icons.Play size={32} className="ml-2" />}
            </button>
            <button onClick={resetTimer} className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all active:scale-95">
              <Icons.RotateCcw size={28} />
            </button>
          </div>
        </section>

        
        <aside className="w-full lg:w-[400px] bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <Icons.Trophy size={24} className="text-yellow-500" />
            <h3 className="text-xl font-black uppercase tracking-widest">Global Ranking</h3>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {leaderboard.map((user, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${idx === 0 ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.5)]' : idx === 1 ? 'bg-gray-300 text-black' : idx === 2 ? 'bg-orange-700 text-white' : 'bg-white/10 text-gray-400'}`}>
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{user.name}</h4>
                    <p className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">{user.rank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black font-mono text-lg">{user.minutes}</div>
                  <div className="text-[9px] text-gray-500 uppercase tracking-widest">Minutes</div>
                </div>
              </motion.div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default FocusRoom;