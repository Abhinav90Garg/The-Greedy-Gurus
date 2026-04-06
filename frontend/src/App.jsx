import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ChatTutor from './components/ChatTutor';
import AuthPage from './components/AuthPage';
import LiveCollab from './components/LiveCollab';
import DevMatch from './components/DevMatch';
import QuickPoll from './components/QuickPoll';
import FocusRoom from './components/FocusRoom';

function App() {
  // 1. Core System States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // 2. Persistence Logic (Stays logged in even after refresh)
  useEffect(() => {
    const savedUser = localStorage.getItem('os_session_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // 3. System Handlers
  const handleLogin = (name) => {
    const userData = { name: name };
    localStorage.setItem('os_session_user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('os_session_user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Routes>
<<<<<<< HEAD
=======
      {/* CRITICAL: We pass props here so LandingPage knows 
          whether to show the LOCK or the BENTO CARDS 
      */}

      <Route path="/live-collab" element={<LiveCollab />} />

      <Route path="/devmatch" element={<DevMatch />} />

      <Route path="/quick-poll" element={<QuickPoll />} />

      <Route path="/focus-room" element={<FocusRoom />} />


>>>>>>> 5e9a7fcb8fb2dd53dc3c5f59460b60e8e45720c4
      <Route 
        path="/" 
        element={
          <LandingPage 
            isLoggedIn={isLoggedIn} 
            user={user} 
            onLogout={handleLogout} 
          />
        } 
      />
      
      <Route 
        path="/auth" 
        element={<AuthPage onLogin={handleLogin} />} 
      />
      
      {/* Protected Routes: Only accessible if logged in */}
      
      {/* FIXED: Path now matches LandingPage navigation ('/dev-match') */}
      <Route 
        path="/dev-match" 
        element={isLoggedIn ? <DevMatch user={user} /> : <Navigate to="/auth" />} 
      />

      <Route 
        path="/live-collab" 
        element={isLoggedIn ? <LiveCollab /> : <Navigate to="/auth" />} 
      />

      <Route 
        path="/chattutor" 
        element={isLoggedIn ? <ChatTutor user={user} /> : <Navigate to="/auth" />} 
      />

      <Route 
        path="/resume-ranker" 
        element={isLoggedIn ? <ChatTutor user={user} /> : <Navigate to="/auth" />} 
      />

      <Route 
        path="/dashboard" 
        element={isLoggedIn ? <ChatTutor user={user} /> : <Navigate to="/auth" />} 
      />
      
      {/* Fallback: Unknown routes go to Landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;