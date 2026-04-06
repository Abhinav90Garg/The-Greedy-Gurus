import React, { useState } from 'react';
import { Send, Paperclip, MessageSquare, Plus, Sparkles } from 'lucide-react';

const ChatTutor = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'SYSTEM_READY. How can I assist your learning today?' }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessageToBackend = async (question) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      const data = await response.json();

      return `
${data.answer}

📊 Level: ${data.level}
🧠 Weak Topics: ${Object.keys(data.weak_topics).join(", ")}
      `;

    } catch (error) {
      console.error("Backend Error:", error);
      return "ERROR: Could not connect to backend. Make sure FastAPI is running on port 8000.";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);

    const currentInput = input;
    setInput("");
    setLoading(true);

    const aiResponse = await sendMessageToBackend(currentInput);

    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: aiResponse }
    ]);

    setLoading(false);
  };

  return (
    <div className="h-screen bg-[#050505] text-white flex overflow-hidden font-sans">

      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-black flex flex-col">
        <div className="p-6">
          <button className="w-full flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition-all group">
            <Plus size={18} className="text-purple-400 group-hover:rotate-90 transition-transform" />
            <span className="text-sm font-bold">New Session</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-2 mb-4">
            Chat History
          </p>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-sm">
            <MessageSquare size={16} className="text-purple-500" />
            <span className="truncate">Active Learning Session</span>
          </div>
        </div>

        <div className="p-4 border-t border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold">
            GK
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold truncate text-white uppercase tracking-tighter">
              Gurleen Kaur
            </p>
            <p className="text-[10px] text-gray-500">CU_V3_STU_DEV</p>
          </div>
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col relative bg-gradient-to-b from-transparent to-purple-900/5">

        <header className="h-16 border-b border-white/5 flex items-center px-8 justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-purple-500 animate-pulse" />
            <h2 className="font-bold tracking-tighter">OS_CHATTUTOR_V4</h2>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold border 
                ${msg.role === 'assistant'
                  ? 'bg-purple-600/20 border-purple-500/30 text-purple-400'
                  : 'bg-white/10 border-white/20'
                }`}>
                {msg.role === 'assistant' ? 'AI' : 'GK'}
              </div>

              <div className={`p-4 rounded-2xl max-w-2xl text-sm border whitespace-pre-line
                ${msg.role === 'assistant'
                  ? 'bg-white/5 border-white/5 text-gray-300'
                  : 'bg-purple-600/10 border-purple-500/20 text-white'
                }`}>
                {msg.content}
              </div>

            </div>
          ))}
<<<<<<< HEAD
         {loading && (
  <div className="flex gap-4 animate-in fade-in duration-500">
    <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
      <div className="w-4 h-4 bg-purple-400 rounded-full animate-ping" />
    </div>
    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1">
      <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce"></span>
    </div>
  </div>
)}
=======

          {loading && (
            <div className="flex gap-4 animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10" />
              <div className="bg-white/5 h-10 w-32 rounded-2xl border border-white/5" />
            </div>
          )}
>>>>>>> faf217ba7d81b3ae0cf81a9daf55b108a3c2e31e
        </div>

        {/* Input */}
        <div className="p-8">
          <div className="max-w-4xl mx-auto relative group">

            <label className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-purple-400 transition-colors cursor-pointer">
              <Paperclip size={20} />
              <input type="file" className="hidden" />
            </label>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-14 pr-16 focus:border-purple-500/50 outline-none transition-all placeholder:text-gray-600 text-sm"
              placeholder={loading ? "Analyzing query..." : "Ask the AI Tutor..."}
            />

            <button
              onClick={handleSend}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white text-black rounded-full hover:bg-purple-500 hover:text-white transition-all shadow-xl"
            >
              <Send size={18} />
            </button>

          </div>
        </div>

      </main>
    </div>
  );
};

export default ChatTutor;