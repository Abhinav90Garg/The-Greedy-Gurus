import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ChatTutor from './components/ChatTutor';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chattutor" element={<ChatTutor />} />
      <Route path="/dashboard" element={<ChatTutor />} />
      {/* Fallback to home if route doesn't exist */}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

export default App;