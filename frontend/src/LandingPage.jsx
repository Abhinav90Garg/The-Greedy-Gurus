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