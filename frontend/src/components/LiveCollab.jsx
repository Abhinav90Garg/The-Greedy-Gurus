import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import Whiteboard from './Whiteboard';

const LiveCollab = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-[#020202] text-white flex flex-col font-sans overflow-hidden">
      
      {/* HEADER */}
      <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-xl flex items-center px-10 justify-between">
        <div className="flex items-center gap-3">
          <Icons.PenTool size={18} className="text-blue-500" />
          <h2 className="text-sm font-black tracking-widest uppercase italic">
            SYNC_BOARD_v1.0
          </h2>
        </div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
          <Icons.ArrowLeft size={16} /> Back to Dashboard
        </button>
      </header>

      {/* MAIN WHITEBOARD AREA */}
      <main className="flex-1 overflow-hidden p-6 flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
        <h3 className="text-2xl font-bold mb-4 tracking-widest uppercase text-blue-400 text-center flex items-center gap-3">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          Live Team Sync
        </h3>
        
        <div className="w-full max-w-5xl h-full pb-10 flex flex-col">
            <Whiteboard />
        </div>
      </main>

    </div>
  );
};

export default LiveCollab;