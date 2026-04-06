// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import ChatTutor from './components/ChatTutor.jsx'; // Ensure this file exists!

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Route for ChatTutor */}
      <Route path="/dashboard" element={<ChatTutor />} /> 
    </Routes>
  );
}

export default App;