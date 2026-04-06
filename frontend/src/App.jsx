import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from "./components/LandingPage.jsx";


// import Auth from "./components/Auth.jsx";
// import ChatTutor from "./components/ChatTutor.jsx";
// import FocusRoom from "./components/FocusRoom.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/auth" element={<Auth />} /> */}
      {/* <Route path="/dashboard" element={<ChatTutor />} /> */}
      {/* <Route path="/focus" element={<FocusRoom />} /> */}
    </Routes>
  )
}

export default App