import React from 'react';
import * as Icons from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    { title: "ChatTutor AI", desc: "Personalized AI learning with integrated NLP resume ranking.", Icon: Icons.Terminal, color: "text-blue-400", delay: 0.1 },
    { title: "Focus Room", desc: "Deep work environment with integrated collaborative whiteboards.", Icon: Icons.LayoutGrid, color: "text-purple-400", delay: 0.2 },
    { title: "Content Gen", desc: "Instant AI generation for polls, summaries, and social assets.", Icon: Icons.Zap, color: "text-green-400", delay: 0.3 },
    { title: "DevMatch", desc: "Find the perfect teammates for your next hackathon or project.", Icon: Icons.Users, color: "text-orange-400", delay: 0.4 },
    { title: "Live Collab", desc: "Real-time mic, screen sharing, and synchronized sketching.", Icon: Icons.Video, color: "text-red-400", delay: 0.5 },
    { title: "Quick Poll", desc: "Gather instant feedback from your team with live data visualization.", Icon: Icons.BarChart3, color: "text-yellow-400", delay: 0.6 },
    { title: "Resume Ranker", desc: "ATS-optimized scoring system built for modern developers.", Icon: Icons.FileSearch, color: "text-pink-400", delay: 0.7 },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-purple-500 overflow-x-hidden font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,17,17,1)_0%,rgba(2,2,2,1)_100%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>
      
      {/* FULL-WIDTH EDGE-TO-EDGE NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="w-full max-w-[1800px] mx-auto px-10 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg group-hover:border-purple-500/50 transition-all">
              <Icons.Cpu size={22} className="text-purple-400" />
            </div>
            <span className="font-black text-2xl tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-600">TOOLKIT_OS</span>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-10 py-3 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:bg-gray-200 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            Launch Console
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="relative z-10 pt-72">
        <div className="w-full max-w-[1800px] mx-auto px-10 text-center mb-80">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] font-mono text-gray-400 tracking-[0.4em] mb-16 uppercase">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              OS_CORE_VERSION_1.0.4 // STABLE
            </div>
            <h1 className="text-[10vw] font-black tracking-tighter leading-[0.75] mb-20 italic">
              The Future of <br />
              <span className="not-italic bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/10 uppercase drop-shadow-2xl">Workflow.</span>
            </h1>
            <p className="text-gray-500 max-w-3xl mx-auto text-2xl font-light leading-relaxed tracking-tight">
              A hyper-integrated environment for students and HR professionals. <br />
              7 modular tools. <span className="text-white font-medium italic underline underline-offset-8 decoration-purple-500">One seamless interface.</span>
            </p>
          </motion.div>
        </div>

        {/* ULTRA-MODERN BENTO GRID */}
        <section className="w-full max-w-[1800px] mx-auto px-10 pb-60">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const FeatureIcon = feature.Icon || Icons.HelpCircle;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.delay, duration: 0.8 }}
                  className="group relative p-12 h-[450px] rounded-[4rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:bg-white/[0.06] transition-all hover:border-purple-500/40 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className={`${feature.color} mb-10 inline-block p-4 bg-white/5 rounded-3xl group-hover:scale-110 transition-transform`}>
                      <FeatureIcon size={40} strokeWidth={1} />
                    </div>
                    <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase">{feature.title}</h3>
                    <p className="text-gray-500 text-lg leading-relaxed font-light">{feature.desc}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[10px] font-mono text-gray-700 tracking-widest uppercase group-hover:text-purple-400 transition-colors">
                    Initialize_Module <Icons.ChevronRight size={14} />
                  </div>

                  {/* Glass Mesh Glow */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/5 blur-[100px] group-hover:bg-purple-500/20 transition-all rounded-full pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      {/* FOOTER OVERHAUL */}
      <footer className="border-t border-white/5 bg-[#010101] py-40 relative z-10">
        <div className="w-full max-w-[1800px] mx-auto px-10 flex flex-col lg:flex-row justify-between items-start gap-24">
          <div className="flex flex-col sm:flex-row gap-20">
            <div>
              <p className="text-[10px] font-mono text-gray-700 mb-6 tracking-[0.5em] uppercase">System_Architect_01</p>
              <h4 className="text-5xl font-black tracking-tighter uppercase italic text-white hover:text-purple-500 transition-colors cursor-default">Gurleen Kaur</h4>
              <p className="text-gray-500 text-sm font-mono mt-3 tracking-widest uppercase">3rd Year // Web Dev // CU</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-700 mb-6 tracking-[0.5em] uppercase">System_Architect_02</p>
              <h4 className="text-5xl font-black tracking-tighter uppercase italic text-white hover:text-blue-500 transition-colors cursor-default">Abhinav Garg</h4>
              <p className="text-gray-500 text-sm font-mono mt-3 tracking-widest uppercase">2nd Year // Web Dev // CU</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            {[
              { icon: Icons.Github, label: 'GH' },
              { icon: Icons.Linkedin, label: 'IN' },
              { icon: Icons.Mail, label: 'ML' }
            ].map((social, i) => {
              const SocialIcon = social.icon || Icons.Globe;
              return (
                <a key={i} href="#" className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                  <SocialIcon size={28} />
                </a>
              );
            })}
          </div>
        </div>
        
        <div className="w-full text-center mt-40 border-t border-white/5 pt-10 text-[9px] text-gray-800 font-mono tracking-[1em] uppercase">
          [ TOOLKIT_OS // 2026 // ALL_SYSTEMS_OPERATIONAL ]
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;