import React from 'react';
import { 
  Terminal, Cpu, LayoutGrid, Zap, ArrowRight, 
  Users, Video, BarChart3, FileSearch, Github, Linkedin, Mail 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  // 7 core features for the Bento Grid
  const features = [
    { title: "ChatTutor AI", desc: "Personalized AI learning with integrated NLP resume ranking.", icon: <Terminal />, color: "text-blue-400", delay: 0.1 },
    { title: "Focus Room", desc: "Deep work environment with integrated collaborative whiteboards.", icon: <LayoutGrid />, color: "text-purple-400", delay: 0.2 },
    { title: "Content Gen", desc: "Instant AI generation for polls, summaries, and social assets.", icon: <Zap />, color: "text-green-400", delay: 0.3 },
    { title: "DevMatch", desc: "Find the perfect teammates for your next hackathon or project.", icon: <Users />, color: "text-orange-400", delay: 0.1 },
    { title: "Live Collab", desc: "Real-time mic, screen sharing, and synchronized sketching.", icon: <Video />, color: "text-red-400", delay: 0.2 },
    { title: "Quick Poll", desc: "Gather instant feedback from your team with live data visualization.", icon: <BarChart3 />, color: "text-yellow-400", delay: 0.3 },
    { title: "Resume Ranker", desc: "ATS-optimized scoring system built for modern developers.", icon: <FileSearch />, color: "text-pink-400", delay: 0.2 },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500 overflow-x-hidden">
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>
      
      {/* Floating Premium Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl px-6 py-4 rounded-3xl flex justify-between items-center shadow-2xl">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tighter">
            <div className="p-2 bg-purple-500/20 rounded-xl border border-purple-500/30">
              <Cpu size={20} className="text-purple-400" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 uppercase">Toolkit_OS</span>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="group relative px-6 py-2.5 bg-white text-black rounded-full font-bold transition-all hover:pr-12 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 text-sm">Launch Console</span>
            <ArrowRight 
              size={18} 
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" 
            />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-52 pb-40 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-purple-400 tracking-[0.2em] mb-12">
            v1.0.4 AVAILABLE_FOR_DEPLOYMENT
          </div>

          <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.85] mb-12">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 block">
              Workflow.
            </span>
          </h1>
          
          <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            A unified environment for students and HR professionals. <br />
            7 powerful tools. <span className="text-white">One seamless interface.</span>
          </p>
        </motion.div>

        {/* Staggered Scroll-Reveal Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-60 pb-20 text-left">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: feature.delay }}
              className="group relative p-8 rounded-[2.5rem] border border-white/10 bg-white/5 hover:bg-white/[0.07] hover:border-purple-500/50 transition-all cursor-default"
            >
              <div className={`${feature.color} mb-6 transition-transform group-hover:scale-110`}>
                {React.cloneElement(feature.icon, { size: 32 })}
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <Zap size={16} className="text-purple-500/40" />
              </div>
            </motion.div>
          ))}
        </section>
      </main>

      {/* Developer Footer */}
      <footer className="border-t border-white/5 bg-black/40 backdrop-blur-md py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-left">
            <h4 className="text-2xl font-black mb-2 tracking-tighter uppercase italic">Developed_by // Gurleen Kaur</h4>
            <p className="text-gray-600 text-sm font-mono tracking-widest">3RD_YEAR_WEB_DEV // CHANDIGARH_UNIVERSITY</p>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-gray-400 hover:text-white">
              <Github size={22} />
            </a>
            <a href="#" className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-gray-400 hover:text-white">
              <Linkedin size={22} />
            </a>
            <a href="#" className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-gray-400 hover:text-white">
              <Mail size={22} />
            </a>
          </div>
        </div>
        <div className="text-center mt-20 text-[9px] text-gray-800 font-mono tracking-[0.6em] uppercase">
          © 2026 Toolkit_OS // CORE_SYSTEM_STABLE
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;