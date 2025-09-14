import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Therapy from "./pages/Therapy";
import About from "./pages/About";
import VideoPlayer from "./components/VideoPlayer";
import Sessions from "./pages/Sessions";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* 🔥 Background Animation Layer */}
      <div className="app-background"></div>

      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/therapy" element={<Therapy />} />
            <Route path="/about" element={<About />} />
            <Route path="/video-player" element={<VideoPlayer />} />
            <Route path="/sessions" element={<Sessions />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
