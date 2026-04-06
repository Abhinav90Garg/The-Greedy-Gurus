// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Auth from './components/Auth.jsx';
import ChatTutor from './components/ChatTutor.jsx'; // 1. Import it

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      {/* 2. Add the dashboard route */}
      <Route path="/dashboard" element={<ChatTutor />} /> 
    </Routes>
  );
}

export default App;