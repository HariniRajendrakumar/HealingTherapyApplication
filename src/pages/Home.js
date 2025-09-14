import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch images from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/images")
      .then((response) => {
        console.log("Fetched images:", response.data); // Debugging
        setImages(response.data);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);
  
  return (
    <div className="home-container">
      <h1 className="home-title">"Positive Quotes to Heal Yourself..."</h1>

      {/* Image Grid */}
      <div className="image-gallery">
        {images.length > 0 ? (
          images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:5001${img.imagePath}`}
              alt="Positive Quote"
              className="gallery-image"
              onError={(e) => (e.target.style.display = "none")} // Hide broken images
              onClick={() => setSelectedImage(`http://localhost:5001${img.imagePath}`)}
            />
          ))
        ) : (
          <p>Loading images...</p>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="image-modal-content">
            <img src={selectedImage} alt="Enlarged" className="enlarged-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
