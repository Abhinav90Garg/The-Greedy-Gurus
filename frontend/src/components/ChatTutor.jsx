import React, { useState } from 'react';
import { Send, Paperclip, MessageSquare, Plus, Search, User, Sparkles } from 'lucide-react';

const ChatTutor = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'SYSTEM READY. How can I assist your learning today?' }
  ]);

  return (
    <div className="h-screen bg-[#050505] text-white flex overflow-hidden font-sans">
      
      {/* 1. Left Sidebar: History & Navigation */}
      <aside className="w-72 border-r border-white/5 bg-black flex flex-col">
        <div className="p-6">
          <button className="w-full flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition-all group">
            <Plus size={18} className="text-purple-400 group-hover:rotate-90 transition-transform" />
            <span className="text-sm font-bold">New Session</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-2 mb-4">Recent Intel</p>
          {['React Hooks Masterclass', 'NLP Resume Analysis', 'System Design Notes'].map((chat, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer text-gray-400 hover:text-white transition-all text-sm border border-transparent hover:border-white/5">
              <MessageSquare size={16} />
              <span className="truncate">{chat}</span>
            </div>
          ))}
        </div>

        {/* User Profile Hook */}
        <div className="p-4 border-t border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold">GK</div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold truncate text-white">Gurleen Kaur</p>
            <p className="text-[10px] text-gray-500 tracking-tight">CU_STU_DEV_V3</p>
          </div>
        </div>
      </aside>

      {/* 2. Main Chat Area */}
      <main className="flex-1 flex flex-col relative bg-gradient-to-b from-transparent to-purple-900/5">
        
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center px-8 justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-purple-500 animate-pulse" />
            <h2 className="font-bold tracking-tighter">CHATTUTOR_CORE</h2>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] px-3 py-1 rounded-full font-mono">
            ENCRYPTED_LINK_ESTABLISHED
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border ${msg.role === 'assistant' ? 'bg-purple-600/20 border-purple-500/30 text-purple-400' : 'bg-white/10 border-white/20 text-white'}`}>
                {msg.role === 'assistant' ? 'AI' : 'GK'}
              </div>
              <div className={`p-4 rounded-2xl max-w-2xl text-sm leading-relaxed border ${msg.role === 'assistant' ? 'bg-white/5 border-white/5' : 'bg-purple-600/10 border-purple-500/20'}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-8">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-2">
              <label className="p-2 text-gray-500 hover:text-purple-400 transition-colors cursor-pointer">
                <Paperclip size={20} />
                <input type="file" className="hidden" />
              </label>
            </div>
            
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-14 pr-16 focus:border-purple-500/50 outline-none transition-all placeholder:text-gray-600 text-sm"
              placeholder="Ask the OS anything about your project..."
            />
            
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white text-black rounded-full hover:bg-purple-500 hover:text-white transition-all shadow-xl active:scale-95">
              <Send size={18} />
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-600 mt-4 font-mono tracking-widest">
            PROCESSED_BY_NLP_ENGINE_V4.0
          </p>
        </div>
      </main>
    </div>
  );
};

export default ChatTutor;