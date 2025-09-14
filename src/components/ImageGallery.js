import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Import close icon
import "./ImageGallery.css"; // Import CSS file

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Positive Quote ${index}`}
          className="gallery-image"
          onClick={() => openModal(image)}
        />
      ))}

      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <FaTimes className="close-btn" onClick={closeModal} />
            <img src={selectedImage} alt="Enlarged View" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
