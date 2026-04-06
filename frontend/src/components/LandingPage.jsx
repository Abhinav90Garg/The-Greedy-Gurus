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
      <nav className="flex justify-between items-center p-6 border-b border-white/5 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10">
            <Cpu size={20} className="text-purple-500" />
          </div>
          <span>TOOLKIT_OS</span>
        </div>
        <button 
          onClick={() => navigate('/auth')}
          className="group flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all active:scale-95"
        >
          Launch Console
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
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