import React, { useState } from "react";
import TherapyVideos from "../components/TherapyVideos";
import TherapyAudios from "../components/TherapyAudios";
import "../pages/Therapy.css";

const Therapy = () => {
  const [activeTab, setActiveTab] = useState("videos");

  return (
    <div className="therapy-page">
      {/* Navigation Buttons */}
      <div className="therapy-nav">
        <button
          className={`therapy-btn ${activeTab === "videos" ? "active" : ""}`}
          onClick={() => setActiveTab("videos")}
        >
          🎥 Videos
        </button>
        <button
          className={`therapy-btn ${activeTab === "audios" ? "active" : ""}`}
          onClick={() => setActiveTab("audios")}
        >
          🎵 Music
        </button>
</div>
      {/* Content Section */}
      <div className="therapy-content">
        {activeTab === "videos" && <TherapyVideos />}
        {activeTab === "audios" && <TherapyAudios />}
      </div>
    </div>
  );
};

export default Therapy;
