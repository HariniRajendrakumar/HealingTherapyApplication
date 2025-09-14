import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/Therapy.css";

const TherapyAudios = () => {
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/audios")
      .then((response) => {
        setAudios(response.data);
      })
      .catch((error) => console.error("Error fetching audios:", error));
  }, []);

  return (
    <div className="therapy-container">
      <div className="heading-box">
        <h2 className="therapy-title">Healing Through Listening to Music</h2>
      </div>
      <div className="audio-gallery">
        {audios.map((audio, index) => (
          <div key={index} className="audio-card">
            <audio controls className="audio-player">
              <source src={`http://localhost:5001${audio.audioPath}`} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapyAudios;
