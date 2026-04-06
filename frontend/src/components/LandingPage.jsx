import React from 'react';
import * as Icons from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = ({ isLoggedIn, user, onLogout }) => {
  const navigate = useNavigate();

  const features = [
    { title: "ChatTutor AI", desc: "Personalized AI learning with integrated NLP resume ranking.", Icon: Icons.Terminal, color: "text-blue-400", delay: 0.1 },
    { title: "Focus Room", desc: "Deep work environment with integrated collaborative whiteboards.", Icon: Icons.LayoutGrid, color: "text-purple-400", delay: 0.2 },
    { title: "Content Gen", desc: "Instant AI generation for polls, summaries, and social assets.", Icon: Icons.Zap, color: "text-green-400", delay: 0.3 },
    { title: "DevMatch", desc: "Find the perfect teammates for your next hackathon or project.", Icon: Icons.Users, color: "text-orange-400", delay: 0.1 },
    { title: "Live Collab", desc: "Real-time mic, screen sharing, and synchronized sketching.", Icon: Icons.Video, color: "text-red-400", delay: 0.2 },
    { title: "Quick Poll", desc: "Gather instant feedback from your team with live data visualization.", Icon: Icons.BarChart3, color: "text-yellow-400", delay: 0.3 },
    { title: "Resume Ranker", desc: "ATS-optimized scoring system built for modern developers.", Icon: Icons.FileSearch, color: "text-pink-400", delay: 0.2 },
  ];

  return (
    <div className={`min-h-screen bg-[#050505] text-white selection:bg-purple-500 font-sans ${!isLoggedIn ? 'overflow-hidden max-h-screen' : 'overflow-x-hidden'}`}>
      
      {/* Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>
      
      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl px-6 py-4 rounded-3xl flex justify-between items-center shadow-2xl">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tighter cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-2 bg-purple-500/20 rounded-xl border border-purple-500/30">
              <Icons.Cpu size={20} className="text-purple-400" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 uppercase font-black">OS</span>
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                <span className="font-mono text-[10px] tracking-widest text-gray-300 uppercase">
                  LOGGED_IN: <span className="text-white font-bold">{user?.name}</span>
                </span>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-500 hover:text-red-400"
              >
                <Icons.LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/auth')} 
              className="px-6 py-2.5 bg-white text-black rounded-full font-bold text-sm transition-all hover:bg-purple-500 hover:text-white active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Get Started
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-52 pb-20 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.85] mb-12 italic">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 block not-italic">Workflow.</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed mb-10">
            A unified environment for students and HR professionals. <br />
            7 powerful tools. <span className="text-white">One seamless interface.</span>
          </p>

          {!isLoggedIn && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
              className="bg-purple-600 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(147,51,234,0.3)] hover:bg-purple-500 transition-colors"
            >
              Initialize System Access
            </motion.button>
          )}
        </motion.div>

        {/* Locked / Bento Section */}
        <div className="relative mt-60">
          {!isLoggedIn ? (
            <div className="relative py-40">
              <div className="absolute inset-0 z-20 backdrop-blur-md bg-black/20 flex flex-col items-center justify-center border-t border-white/5">
                <div className="p-6 bg-white/5 border border-white/10 rounded-[3rem] mb-6 shadow-2xl">
                  <Icons.Lock size={48} className="text-purple-500 animate-pulse" />
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tighter italic">Modules Encrypted</h2>
                <p className="text-gray-500 font-mono text-xs mt-4 tracking-[0.3em] uppercase italic">
                  Critical infrastructure locked. Please authenticate.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-20 blur-2xl pointer-events-none">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-[450px] bg-white/5 rounded-[4rem] border border-white/10" />
                ))}
              </div>
            </div>
          ) : (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 text-left">
              {features.map((feature, index) => {
                const FeatureIcon = feature.Icon || Icons.HelpCircle;
                
                // Handled redirection for Content Gen here
                const isActive = ["ChatTutor AI", "Resume Ranker", "Live Collab", "Content Gen"].includes(feature.title);
                
                const handleNavigation = () => {
                  if (!isActive) return;
                  if (feature.title === "ChatTutor AI") navigate('/chattutor');
                  else if (feature.title === "Resume Ranker") navigate('/resume-ranker');
                  else if (feature.title === "Live Collab") navigate('/live-collab');
                  else if (feature.title === "Content Gen") navigate('/chattutor'); // Redirects to ChatTutor
                };
                
                return (
                  <motion.div
                    key={index}
                    onClick={handleNavigation}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: feature.delay, duration: 0.8 }}
                    className={`group relative p-12 h-[450px] rounded-[4rem] border border-white/5 
                      bg-gradient-to-br from-white/[0.03] to-transparent hover:bg-white/[0.07] 
                      transition-all hover:border-purple-500/40 overflow-hidden flex flex-col justify-between 
                      ${isActive ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default opacity-60'}`}
                  >
                    <div>
                      <div className={`${feature.color} mb-10 inline-block p-4 bg-white/5 rounded-3xl group-hover:scale-110 transition-transform`}>
                        <FeatureIcon size={40} strokeWidth={1} />
                      </div>
                      <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase">{feature.title}</h3>
                      <p className="text-gray-500 text-lg leading-relaxed font-light">{feature.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-700 tracking-widest uppercase group-hover:text-purple-400 transition-colors">
                      {isActive ? "Initialize_Module" : "Module_Locked"} <Icons.ChevronRight size={14} />
                    </div>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/5 blur-[100px] group-hover:bg-purple-500/20 transition-all rounded-full pointer-events-none" />
                  </motion.div>
                );
              })}
            </section>
          )}
        </div>
      </main>

      {isLoggedIn && (
        <footer className="border-t border-white/5 bg-black/40 backdrop-blur-md py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col gap-8 md:flex-row md:gap-20">
              <div className="text-left">
                <h4 className="text-2xl font-black mb-2 tracking-tighter uppercase italic">Gurleen Kaur</h4>
                <p className="text-gray-600 text-[10px] font-mono tracking-widest uppercase italic">3rd Year // CU</p>
              </div>
              <div className="text-left">
                <h4 className="text-2xl font-black mb-2 tracking-tighter uppercase italic">Abhinav Garg</h4>
                <p className="text-gray-600 text-[10px] font-mono tracking-widest uppercase italic">2nd Year // CU</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-all cursor-pointer">
                {Icons.Github ? <Icons.Github size={22} /> : <Icons.Globe size={22} />}
              </div>
              <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-all cursor-pointer">
                {Icons.Linkedin ? <Icons.Linkedin size={22} /> : <Icons.User size={22} />}
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default LandingPage;