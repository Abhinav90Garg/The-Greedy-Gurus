import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatTutor = () => {
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "SYSTEM_INITIALIZED. New session established. How can I assist your workflow today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // INITIALIZE BACKEND SESSION
  useEffect(() => {
    // Replace with your Render URL if deployed
    const API_BASE = "http://127.0.0.1:8000"; 
    
    fetch(`${API_BASE}/new_chat`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setChatId(data.chat_id);
        console.log("Session ID Secured:", data.chat_id);
      })
      .catch(err => console.error("Handshake Failed:", err));
  }, []);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const currentInput = message;
    const userMsg = { role: "user", text: currentInput };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          question: currentInput,
        }),
      });

      const data = await res.json();
      const botMsg = { role: "bot", text: data.answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", text: "ERROR: Connection to Neural Engine lost." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#020202] text-white flex flex-col font-sans overflow-hidden">
      {/* OS Top Bar */}
      <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center px-8 justify-between z-20">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
            <Icons.Cpu size={20} className="text-purple-400" />
          </div>
          <div>
            <h2 className="font-black tracking-tighter text-lg uppercase">ChatTutor_v1.0</h2>
            <p className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">
              Status: <span className="text-green-500">Connected</span> // Session: {chatId.slice(0,8)}...
            </p>
          </div>
        </div>
        <button onClick={() => window.history.back()} className="text-gray-500 hover:text-white transition-colors">
          <Icons.X size={24} />
        </button>
      </header>

      {/* Chat Space */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 scrollbar-hide">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i}
              className={`flex gap-4 mb-8 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                msg.role === 'bot' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-white/5 border-white/10 text-gray-400'
              }`}>
                {msg.role === 'bot' ? <Icons.Sparkles size={18} /> : <Icons.User size={18} />}
              </div>
              <div className={`p-5 rounded-[2rem] text-sm leading-relaxed max-w-[80%] border shadow-2xl ${
                msg.role === 'bot' ? 'bg-white/[0.03] border-white/5 text-gray-300 rounded-tl-none' : 'bg-purple-600/10 border-purple-500/20 text-white rounded-tr-none'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10" />
              <div className="bg-white/5 h-12 w-40 rounded-[2rem] border border-white/5" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="p-8 bg-gradient-to-t from-black to-transparent">
        <div className="max-w-4xl mx-auto relative group">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={loading ? "AI is thinking..." : "Terminal command input..."}
            className="w-full bg-white/[0.03] border border-white/10 rounded-[2.5rem] py-6 pl-8 pr-20 outline-none focus:border-purple-500/50 transition-all text-sm placeholder:text-gray-700"
          />
          <button 
            onClick={sendMessage}
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all disabled:opacity-50"
          >
            <Icons.ArrowUp size={20} strokeWidth={3} />
          </button>
        </div>
        <p className="text-center mt-4 text-[9px] font-mono text-gray-800 tracking-[0.4em] uppercase">
          Neural_Link_Status: Active // Data_Encryption: Enabled
        </p>
      </footer>
    </div>
  );
};

export default ChatTutor;