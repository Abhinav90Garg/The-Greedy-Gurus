import React from 'react';
import { Terminal, Cpu, LayoutGrid, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500 overflow-x-hidden">
      {/* Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Navbar */}
      {/* Replace your current nav with this centered, floating navbar */}
<nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
  <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl px-6 py-4 rounded-3xl flex justify-between items-center shadow-2xl">
    <div className="flex items-center gap-3 font-bold text-xl tracking-tighter">
      <div className="p-2 bg-purple-500/20 rounded-xl border border-purple-500/30">
        <Cpu size={20} className="text-purple-400" />
      </div>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">TOOLKIT_OS</span>
    </div>
    
    <button 
      onClick={() => navigate('/dashboard')}
      className="group relative px-6 py-2.5 bg-white text-black rounded-full font-bold transition-all hover:pr-10 active:scale-95 overflow-hidden"
    >
      <span className="relative z-10">Launch Console</span>
      <ArrowRight 
        size={18} 
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" 
      />
    </button>
  </div>
</nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10 text-center">
        

        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-12">
          The Future of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Workflow.
          </span>
        </h1>
        
        <p className="text-gray-500 max-w-3xl mx-auto text-lg md:text-xl font-medium mb-24 leading-relaxed">
          A unified environment for students and HR professionals. 
          powerful tools. <span className="text-white">One seamless interface.</span>
        </p>

        {/* Simplified Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all"
          >
            <Terminal className="text-blue-400 mb-4" size={28} />
            <h3 className="text-xl font-bold mb-2">ChatTutor AI</h3>
            <p className="text-gray-500 text-sm">Personalized AI learning and resume ranking.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all"
          >
            <LayoutGrid className="text-purple-400 mb-4" size={28} />
            <h3 className="text-xl font-bold mb-2">Focus Room</h3>
            <p className="text-gray-500 text-sm">Deep work with collaborative whiteboards.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all"
          >
            <Zap className="text-green-400 mb-4" size={28} />
            <h3 className="text-xl font-bold mb-2">Content Gen</h3>
            <p className="text-gray-500 text-sm">Instant AI generation for OS tasks.</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;