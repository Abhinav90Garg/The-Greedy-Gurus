import React from 'react';
import { Terminal, Cpu, LayoutGrid, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  // Data for the tools
  const tools = [
    { 
      title: "ChatTutor AI", 
      icon: <Terminal size={24} className="text-blue-400" />, 
      desc: "Personalized AI learning with built-in NLP resume ranking and content gen.",
      color: "bg-blue-500/10"
    },
    { 
      title: "Focus Room", 
      icon: <LayoutGrid size={24} className="text-purple-400" />, 
      desc: "Deep work environment with integrated whiteboard collaboration.",
      color: "bg-purple-500/10"
    },
    { 
      title: "Content Gen", 
      icon: <Zap size={24} className="text-green-400" />, 
      desc: "Instant AI generation for polls, summaries, and social media assets.",
      color: "bg-green-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500 overflow-x-hidden">
      {/* Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 border-b border-white/5 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter group cursor-default">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-purple-500/50 transition-colors">
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
        <div className="space-y-12">
          {/* Version Badge */}
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-purple-400 tracking-[0.2em]">
            v1.0.4 AVAILABLE_FOR_DEPLOYMENT
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] md:leading-[0.9]">
            <span className="block mb-2">The Future of</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 block">
              Workflow.
            </span>
          </h1>
          
          <p className="text-gray-500 max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed px-4">
            A unified environment for students and HR professionals. 
            <br className="hidden md:block" /> 
            7 powerful tools. <span className="text-white hover:text-purple-400 transition-colors cursor-default">One seamless interface.</span>
          </p>
        </div>

        {/* Animated Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 pb-20 text-left">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-[2.5rem] border border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-purple-500/50 transition-all cursor-pointer overflow-hidden"
            >
              <div className={`w-12 h-12 rounded-2xl ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
              
              {/* Decorative corner icon */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <Zap size={16} className="text-purple-500/50" />
              </div>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
const ToolCard = ({ title, desc, icon: Icon, color }) => (
  <div className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-6`}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{desc}</p>
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <Zap size={16} className="text-purple-400" />
    </div>
  </div>
);

// Add this inside your LandingPage main section:
<section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 pb-20">
  <ToolCard 
    title="ChatTutor" 
    desc="Personalized AI learning with built-in NLP resume ranking and content gen." 
    icon={Terminal} 
    color="bg-blue-500/20 text-blue-400"
  />
  <ToolCard 
    title="Focus Room" 
    desc="Deep work environment with integrated whiteboard collaboration." 
    icon={LayoutGrid} 
    color="bg-purple-500/20 text-purple-400"
  />
  {/* Add more cards for other tools here */}
</section>
