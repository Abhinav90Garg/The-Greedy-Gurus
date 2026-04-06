import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatTutor = () => {
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "SYSTEM_READY. Neural link established. How can I assist your workflow today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const API_BASE = "http://127.0.0.1:8000"; 
    fetch(`${API_BASE}/new_chat`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setChatId(data.chat_id))
      .catch(err => console.error("Handshake Failed:", err));
  }, []);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;
    const currentInput = message;
    setMessages((prev) => [...prev, { role: "user", text: currentInput }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, question: currentInput }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", text: "ERROR: Connection lost." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#020202] text-white flex font-sans overflow-hidden">
      
      {/* SIDEBAR: HISTORY & SESSION INFO */}
      <aside className="w-80 border-r border-white/5 bg-black/60 backdrop-blur-3xl flex flex-col hidden lg:flex">
        <div className="p-8 border-b border-white/5">
          <button className="w-full py-4 px-6 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all">
            <span className="text-xs font-black tracking-widest uppercase italic">New_Session</span>
            <Icons.Plus size={16} className="text-purple-500 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <p className="text-[10px] font-mono text-gray-600 tracking-[0.3em] uppercase ml-2">Session_History</p>
          
          {/* Active Session Card */}
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate uppercase tracking-tighter">Current Link</p>
              <p className="text-[9px] text-gray-500 font-mono">{chatId || "SECURE_GEN..."}</p>
            </div>
          </div>

          {/* Dummy History Items for Visual Polish */}
          {['Resume_Ranker_V2', 'Algorithm_Opt', 'Data_Structures_Help'].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
              <Icons.MessageSquare size={14} className="text-gray-600" />
              <p className="text-[11px] font-medium text-gray-400">{item}</p>
            </div>
          ))}
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-t border-white/5 bg-white/[0.01]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-black text-xs">GK</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-black tracking-tight truncate uppercase italic">Gurleen Kaur</p>
              <p className="text-[9px] text-gray-600 font-mono tracking-widest uppercase">Admin // CU_Dev</p>
            </div>
            <Icons.Settings size={16} className="text-gray-700 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </aside>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-xl flex items-center px-10 justify-between">
          <div className="flex items-center gap-4 lg:hidden">
             <Icons.Menu size={24} className="text-purple-400" />
          </div>
          <div className="flex items-center gap-3">
            <Icons.Cpu size={18} className="text-purple-500" />
            <h2 className="text-sm font-black tracking-widest uppercase italic">Neural_Interface_V1.4</h2>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full border border-black bg-purple-500" />
                <div className="w-6 h-6 rounded-full border border-black bg-blue-500" />
             </div>
             <button onClick={() => window.history.back()} className="text-gray-500 hover:text-white"><Icons.Power size={20} /></button>
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto p-10 space-y-10">
          <div className="max-w-4xl mx-auto">
            {messages.map((msg, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                key={i}
                className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                  msg.role === 'bot' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-white/5 border-white/10 text-gray-400'
                }`}>
                  {msg.role === 'bot' ? <Icons.Cpu size={18} /> : <Icons.User size={18} />}
                </div>
                <div className={`p-6 rounded-[2.5rem] text-sm leading-relaxed max-w-[85%] border shadow-2xl ${
                  msg.role === 'bot' ? 'bg-white/[0.03] border-white/5 text-gray-300 rounded-tl-none' : 'bg-purple-600/10 border-purple-500/20 text-white rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex gap-6 animate-pulse">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10" />
                <div className="bg-white/5 h-14 w-60 rounded-[2.5rem] border border-white/5" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input */}
        <footer className="p-10 bg-gradient-to-t from-black to-transparent">
          <div className="max-w-4xl mx-auto relative group">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={loading ? "Analyzing..." : "Awaiting user input..."}
              className="w-full bg-white/[0.03] border border-white/10 rounded-[3rem] py-7 pl-10 pr-24 outline-none focus:border-purple-500/50 transition-all text-sm placeholder:text-gray-800"
            />
            <button 
              onClick={sendMessage}
              disabled={loading}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all shadow-xl"
            >
              <Icons.Send size={22} />
            </button>
          </div>
          <p className="text-center mt-6 text-[8px] font-mono text-gray-800 tracking-[0.6em] uppercase">
            Data_Transmission: Encrypted // Core_Load: {loading ? '88%' : '12%'}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ChatTutor;