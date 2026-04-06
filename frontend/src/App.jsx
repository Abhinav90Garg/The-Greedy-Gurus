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
      {/* CRITICAL: We pass props here so LandingPage knows 
          whether to show the LOCK or the BENTO CARDS 
      */}

      <Route path="/live-collab" element={<LiveCollab />} />

      <Route path="/devmatch" element={<DevMatch />} />

      <Route path="/quick-poll" element={<QuickPoll />} />

      <Route path="/focus-room" element={<FocusRoom />} />


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
      
      {/* Pass handleLogin so AuthPage can trigger the unlock */}
      <Route 
        path="/auth" 
        element={<AuthPage onLogin={handleLogin} />} 
      />
      
      {/* Protected Routes: Only accessible if logged in */}
      <Route 
        path="/chattutor" 
        element={isLoggedIn ? <ChatTutor /> : <Navigate to="/auth" />} 
      />
      <Route 
        path="/resume-ranker" 
        element={isLoggedIn ? <ChatTutor /> : <Navigate to="/auth" />} 
      />
      <Route 
        path="/dashboard" 
        element={isLoggedIn ? <ChatTutor /> : <Navigate to="/auth" />} 
      />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;