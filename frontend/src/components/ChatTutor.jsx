// src/components/ChatTutor.jsx
import React, { useState } from 'react';
// ... other imports

const ChatTutor = () => {
  const [input, setInput] = useState(""); // Track what you're typing
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'SYSTEM READY. How can I assist your learning today?' }
  ]);
  const [loading, setLoading] = useState(false); // For that "AI is thinking" look

  // --- THE BACKEND CONNECTION CODE ---
  const sendMessage = async (question) => {
    try {
      const response = await fetch("http://127.0.0.1:5173/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      return data.answer; 
    } catch (error) {
      console.error("Backend Error:", error);
      return "Error: Could not connect to the AI engine.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. Add User Message to UI
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput(""); // Clear input bar
    setLoading(true);

    // 2. Call the Backend
    const aiResponse = await sendMessage(currentInput);

    // 3. Add AI Message to UI
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    setLoading(false);
  };

  return (
    // ... inside your return, update your input and button:
    <div className="max-w-4xl mx-auto relative group">
       <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()} // Send on Enter key
          className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-14 pr-16 focus:border-purple-500/50 outline-none transition-all text-sm"
          placeholder={loading ? "AI is processing..." : "Ask the OS anything..."}
          disabled={loading}
       />
       <button 
          onClick={handleSend}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white text-black rounded-full hover:bg-purple-500 transition-all"
       >
         <Send size={18} />
       </button>
    </div>
  );
};