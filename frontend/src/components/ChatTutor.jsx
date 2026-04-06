import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const ChatTutor = () => {
  const location = useLocation();
  const [mode, setMode] = useState(location.pathname === '/resume-ranker' ? 'resume' : 'chat');
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sync mode with URL if user navigates via browser buttons
  useEffect(() => {
    const currentMode = location.pathname === '/resume-ranker' ? 'resume' : 'chat';
    setMode(currentMode);
    setMessages([
      { 
        role: "bot", 
        text: currentMode === 'resume' 
          ? "ATS_ANALYZER_READY. Please upload your document for scoring and optimization." 
          : "SYSTEM_READY. Neural link established. How can I assist your workflow today?" 
      }
    ]);
  }, [location.pathname]);

  // Initial Handshake to get a chat_id
  useEffect(() => {
    const API_BASE = "http://127.0.0.1:8000"; 
    fetch(`${API_BASE}/new_chat`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setChatId(data.chat_id))
      .catch(err => console.error("Handshake Failed:", err));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // 1. Send text messages to the AI
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
        body: JSON.stringify({ 
            chat_id: chatId, 
            question: currentInput,
            feature_type: mode 
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", text: "ERROR: Connection to Neural Engine lost." }]);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Resume PDF Uploads
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMessages(prev => [...prev, { role: "user", text: `[FILE UPLOADED]: ${file.name}` }]);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("chat_id", chatId);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload_resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessages(prev => [...prev, { role: "bot", text: data.answer }]);
      } else {
        setMessages(prev => [...prev, { role: "bot", text: "ERROR: File processing failed." }]);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessages(prev => [...prev, { role: "bot", text: "ERROR: Connection to Neural Engine lost." }]);
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="h-screen bg-[#020202] text-white flex font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-80 border-r border-white/5 bg-black/60 backdrop-blur-3xl flex flex-col hidden lg:flex">
        <div className="p-8 border-b border-white/5">
          <button onClick={() => setMode('chat')} className={`w-full py-4 px-6 rounded-2xl flex items-center justify-between mb-4 transition-all border ${mode === 'chat' ? 'bg-purple-500/10 border-purple-500/30 text-white' : 'bg-white/5 border-white/10 text-gray-500 opacity-50'}`}>
            <span className="text-[10px] font-black tracking-widest uppercase">Live_Chat</span>
            <Icons.MessageSquare size={16} />
          </button>
          <button onClick={() => setMode('resume')} className={`w-full py-4 px-6 rounded-2xl flex items-center justify-between transition-all border ${mode === 'resume' ? 'bg-purple-500/10 border-purple-500/30 text-white' : 'bg-white/5 border-white/10 text-gray-500 opacity-50'}`}>
            <span className="text-[10px] font-black tracking-widest uppercase">Resume_Ranker</span>
            <Icons.FileSearch size={16} />
          </button>
        </div>

        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            <p className="text-[10px] font-mono text-gray-600 tracking-[0.3em] uppercase ml-2">Session_Data</p>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-[9px] text-purple-400 break-all">
               ID: {chatId || "HANDSHAKING..."}
            </div>
        </div>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-black text-xs">GK</div>
            <div>
              <p className="text-xs font-black uppercase italic">Gurleen Kaur</p>
              <p className="text-[9px] text-gray-600 font-mono tracking-widest">3rd Year // CU_DEV</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col relative">
        <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-xl flex items-center px-10 justify-between">
          <div className="flex items-center gap-3">
            <Icons.Cpu size={18} className="text-purple-500" />
            <h2 className="text-sm font-black tracking-widest uppercase italic">
               {mode === 'resume' ? 'ATS_SCANNER_v2.1' : 'NEURAL_INTERFACE_v1.4'}
            </h2>
          </div>
          <button onClick={() => window.history.back()} className="text-gray-500 hover:text-white transition-colors">
            <Icons.Power size={20} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-10 space-y-10">
          <div className="max-w-4xl mx-auto">
            
            {/* UPLOAD BOX (Only shows when in resume mode and no chat history) */}
            {mode === 'resume' && messages.length <= 1 && (
              <motion.div 
                onClick={() => fileInputRef.current.click()}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto border-2 border-dashed border-white/10 rounded-[3rem] p-20 text-center hover:border-purple-500/30 transition-all cursor-pointer bg-white/[0.02]"
              >
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx,.txt" />
                <Icons.UploadCloud size={48} className="mx-auto mb-6 text-purple-400" />
                <h3 className="text-2xl font-bold mb-2 uppercase tracking-tighter">Upload_Resume</h3>
                <p className="text-gray-500 text-sm">Drag and drop or click to analyze ATS score</p>
              </motion.div>
            )}

            {/* CHAT MESSAGES */}
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-6 mb-10 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                  msg.role === 'bot' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-white/5 border-white/10 text-gray-400'
                }`}>
                  {msg.role === 'bot' ? <Icons.Cpu size={18} /> : <Icons.User size={18} />}
                </div>
                
                {/* 3. The whitespace-pre-wrap class is applied here to fix formatting */}
                <div className={`p-6 rounded-[2.5rem] text-sm leading-relaxed max-w-[85%] border shadow-2xl whitespace-pre-wrap ${
                  msg.role === 'bot' ? 'bg-white/[0.03] border-white/5 text-gray-300 rounded-tl-none' : 'bg-purple-600/10 border-purple-500/20 text-white rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* LOADING INDICATOR */}
            {loading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-6 mb-10"
              >
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border bg-purple-500/10 border-purple-500/20 text-purple-400 animate-pulse">
                  <Icons.Cpu size={18} />
                </div>
                <div className="p-6 rounded-[2.5rem] rounded-tl-none text-sm bg-white/[0.03] border border-white/5 text-gray-500 shadow-2xl flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></span>
                  <span className="ml-2 font-mono text-[10px] tracking-widest uppercase opacity-50 italic">Neural_Processing...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </main>

        <footer className="p-10 bg-gradient-to-t from-black to-transparent relative z-20">
          <div className="max-w-4xl mx-auto relative group">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={loading ? "Analyzing..." : mode === 'resume' ? "Paste job description or ask about your score..." : "Neural terminal input..."}
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