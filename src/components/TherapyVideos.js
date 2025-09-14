import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../pages/Therapy.css";

const TherapyVideos = () => {
  const [videos, setVideos] = useState([]);
  const currentVideoRef = useRef(null);

  // Function to shuffle videos
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/videos")
      .then((response) => {
        setVideos(shuffleArray(response.data));
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  const handleVideoPlay = (event) => {
    if (currentVideoRef.current && currentVideoRef.current !== event.target) {
      currentVideoRef.current.pause();
    }
    currentVideoRef.current = event.target;
  };

  return (
    <div className="therapy-container">
      <div className="heading-box">
        <h2 className="therapy-title">Healing Through Watching Expert's Talks</h2>
      </div>
      <div className="video-gallery">
        {videos.map((video, index) => (
          <div key={index} className="video-card">
            <video
              controls
              className="video-player"
              onPlay={handleVideoPlay}
            >
              <source src={`http://localhost:5001${video.videoUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapyVideos;
