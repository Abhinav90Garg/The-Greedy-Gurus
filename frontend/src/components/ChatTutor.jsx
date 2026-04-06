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
    { title: "DevMatch", desc: "Find the perfect teammates for your next hackathon or project.", Icon: Icons.Users, color: "text-orange-400", delay: 0.1 },
    { title: "Live Collab", desc: "Real-time mic, screen sharing, and synchronized sketching.", Icon: Icons.Video, color: "text-red-400", delay: 0.2 },
    { title: "Quick Poll", desc: "Gather instant feedback from your team with live data visualization.", Icon: Icons.BarChart3, color: "text-yellow-400", delay: 0.3 },
    { title: "Resume Ranker", desc: "ATS-optimized scoring system built for modern developers.", Icon: Icons.FileSearch, color: "text-pink-400", delay: 0.2 },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-purple-500 overflow-x-hidden font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full opacity-50" />
      </div>
      
      {/* FULL-WIDTH NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
        <div className="max-w-[1600px] mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="p-2 bg-white/5 border border-white/10 rounded-xl group-hover:border-purple-500/50 transition-all">
              <Icons.Cpu size={22} className="text-purple-400" />
            </div>
            <span className="font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">TOOLKIT_OS</span>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-white text-black rounded-full font-bold text-sm transition-all hover:bg-gray-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Launch Console
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="relative z-10 pt-52">
        <div className="max-w-7xl mx-auto px-6 text-center mb-60">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] font-mono text-gray-400 tracking-[0.2em] mb-12">
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              SYSTEMS_NOMINAL // V1.0.4
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-16 italic">
              The Future of <br />
              <span className="not-italic bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">Workflow.</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
              A hyper-integrated environment for students and teams. <br />
              7 powerful modules. <span className="text-white">One unified core.</span>
            </p>
          </motion.div>
        </div>

        {/* MODERNIZED BENTO GRID */}
        <section className="max-w-[1400px] mx-auto px-8 pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                className="group relative p-10 h-80 rounded-[3rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all hover:border-purple-500/30 overflow-hidden"
              >
                <div className={`${feature.color} mb-8`}>
                  <feature.Icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[240px]">{feature.desc}</p>
                
                {/* Subtle Card Glow */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-all rounded-full" />
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* PROFESSIONAL FOOTER */}
      <footer className="border-t border-white/5 bg-[#050505] py-24 relative z-10">
        <div className="max-w-[1400px] mx-auto px-10 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="flex flex-col gap-10 md:flex-row md:gap-32">
            <div>
              <p className="text-[10px] font-mono text-gray-600 mb-4 tracking-[0.3em]">CORE_DEVELOPER_01</p>
              <h4 className="text-4xl font-black tracking-tighter uppercase italic">Gurleen Kaur</h4>
              <p className="text-purple-500 text-xs font-mono mt-2 tracking-widest uppercase">3rd Year // Web Dev // CU</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-600 mb-4 tracking-[0.3em]">CORE_DEVELOPER_02</p>
              <h4 className="text-4xl font-black tracking-tighter uppercase italic">Abhinav Garg</h4>
              <p className="text-blue-500 text-xs font-mono mt-2 tracking-widest uppercase">2nd Year // Web Dev // CU</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            {[
              { icon: Icons.Github, link: "#" },
              { icon: Icons.Linkedin, link: "#" },
              { icon: Icons.Mail, link: "#" }
            ].map((social, i) => (
              <a key={i} href={social.link} className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>
        <div className="text-center mt-20 text-[9px] text-gray-800 font-mono tracking-[0.8em] uppercase">
          © 2026 TOOLKIT_OS // ALL_SYSTEMS_STABLE
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;