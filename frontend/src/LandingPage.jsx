import React from 'react';
import { Terminal, Cpu, LayoutGrid, Zap } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-purple-500">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/20 blur-[120px] pointer-events-none" />
      
      <nav className="flex justify-between items-center p-6 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <Cpu className="text-purple-500" />
          <span>TOOLKIT_OS</span>
        </div>
        <button className="bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-purple-500 hover:text-white transition-all">
          Launch Console
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20">
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight">
            The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Workflow.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A unified OS environment for students and HR professionals. 
            7 powerful tools. One seamless interface.
          </p>
        </div>
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