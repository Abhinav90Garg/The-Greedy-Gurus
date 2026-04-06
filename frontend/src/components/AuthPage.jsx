import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const navigate = useNavigate();

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setNameInput(""); 
    setEmailInput("");
  };

  // Logic to handle the "Unlock"
  const handleSystemAccess = () => {
    // 1. Determine Display Name
    const displayName = nameInput.trim() 
      || (emailInput ? emailInput.split('@')[0].toUpperCase() : "GUEST_ROOT");

    console.log("System Access Granted for:", displayName);

    // 2. Trigger the state in App.jsx (The Unlock)
    if (onLogin) {
      onLogin(displayName); 
    }
    
    // 3. Force redirect to Home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div onClick={() => navigate('/')} className="flex items-center justify-center gap-3 mb-10 cursor-pointer group">
          <div className="p-2 bg-purple-500/20 rounded-xl border border-purple-500/30 group-hover:rotate-12 transition-transform">
            <Icons.Cpu size={24} className="text-purple-400" />
          </div>
          <span className="text-3xl font-black italic tracking-tighter uppercase">OS</span>
        </div>

        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-4xl font-black mb-2 tracking-tighter uppercase italic">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-500 mb-8 font-medium">
                {isLogin ? 'Initialize your session.' : 'Register new core identity.'}
              </p>

              {/* Note: Removed 'onSubmit' from form and put 'onClick' on button for MVP stability */}
              <div className="space-y-4">
                {!isLogin && (
                  <div className="relative group">
                    <Icons.User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                    <input 
                      type="text" 
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="FULL NAME" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 transition-all font-mono text-sm tracking-widest"
                    />
                  </div>
                )}

                <div className="relative group">
                  <Icons.Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                  <input 
                    type="email" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="EMAIL_ADDRESS" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 transition-all font-mono text-sm tracking-widest"
                  />
                </div>

                <div className="relative group">
                  <Icons.Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                  <input 
                    type="password" 
                    placeholder="ACCESS_KEY" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 transition-all font-mono text-sm tracking-widest"
                  />
                </div>

                <motion.button 
                  type="button"
                  onClick={handleSystemAccess}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-sm mt-4 hover:bg-purple-500 hover:text-white transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  {isLogin ? 'Execute Login' : 'Finalize Registration'}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 text-center">
            <button 
              onClick={toggleAuth}
              className="text-gray-500 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase"
            >
              {isLogin ? "Need a new identity? _SignUP" : "Already registered? _LogIN"}
            </button>
          </div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full" />
        </div>

        <button 
          onClick={() => navigate('/')}
          className="mt-8 flex items-center gap-2 text-gray-600 hover:text-purple-400 transition-colors mx-auto font-mono text-[10px] tracking-widest uppercase"
        >
          <Icons.ArrowLeft size={14} /> Back to Terminal
        </button>
      </motion.div>
    </div>
  );
};

export default AuthPage;