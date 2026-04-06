import React from 'react';
import { Terminal, Cpu, LayoutGrid, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500 overflow-hidden">
      {/* Mesh Gradients for that 'Sleek' look */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      
      <nav className="flex justify-between items-center p-6 border-b border-white/5 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter group cursor-default">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-purple-500/50 transition-colors">
            <Cpu size={20} className="text-purple-500" />
          </div>
          <span>OS</span>
        </div>
        <button 
          onClick={() => navigate('/auth')}
          className="group flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all active:scale-95"
        >
          Launch Console
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10 text-center">
  <div className="space-y-12"> {/* Increased vertical spacing between elements */}
    
   
    
    {/* Main Heading - The 'leading' fix is here */}
    <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] md:leading-[0.9]">
      <span className="block mb-2">The Future of</span>
      <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 block">
        Workflow.
      </span>
    </h1>
    
    {/* Subtext */}
    <p className="text-gray-500 max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed px-4">
      A unified environment for students and HR professionals. 
      <br className="hidden md:block" /> 
      powerful tools. <span className="text-white hover:text-purple-400 transition-colors cursor-default">One seamless interface.</span>
    </p>

  </div>
  <div> </div>
  <section className="max-w-6xl mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
      <Terminal size={20} />
    </div>
    <h3 className="font-bold mb-2">ChatTutor AI</h3>
    <p className="text-sm text-gray-500">Personalized learning with integrated NLP resume screening.</p>
  </div>

  <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
      <LayoutGrid size={20} />
    </div>
    <h3 className="font-bold mb-2">Focus Room</h3>
    <p className="text-sm text-gray-500">Minimalist deep-work space with live collaborative whiteboards.</p>
  </div>

  <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 mb-6">
      <Zap size={20} />
    </div>
    <h3 className="font-bold mb-2">Content Gen</h3>
    <p className="text-sm text-gray-500">Instant AI generation for polls, summaries, and resumes.</p>
  </div>
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
