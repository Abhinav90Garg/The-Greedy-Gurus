import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ChatTutor from './components/ChatTutor';
import AuthPage from './components/AuthPage'; // Import the new Auth component

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Store user data here

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUser({ name: name });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };
  return (
    <Routes>
      {/* Primary Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Authentication Layer */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Feature Modules */}
      <Route path="/chattutor" element={<ChatTutor />} />
      <Route path="/resume-ranker" element={<ChatTutor />} />
      <Route path="/dashboard" element={<ChatTutor />} />
      
      {/* Smart Fallback: Redirect unknown routes to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;