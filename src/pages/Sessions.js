import React, { useState } from "react";
import "./Sessions.css";

const Sessions = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", date: "", time: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const availableSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

  // Handle input change and clear errors dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Enter your name";
    if (!formData.phone.trim()) newErrors.phone = "Enter your phone number";
    if (!formData.date) newErrors.date = "Choose a date";
    if (!formData.time) newErrors.time = "Select a time slot";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clear previous errors and messages
    setErrors({});
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5001/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(`You have booked your slot on ${formData.date} at ${formData.time}.`);
        setFormData({ name: "", phone: "", date: "", time: "" }); // Reset form after successful submission
      } else {
        setErrors({ general: data.error || "Something went wrong!" });
      }
    } catch (error) {
      setErrors({ general: "Failed to connect to the server" });
    }
  };

  return (
    <div className="sessions-wrapper">
      <h1 className="sessions-heading">Book Your Healing Session</h1>
      <p className="sessions-subtext">Find peace and relaxation with our expert therapists.</p>

      {errors.general && <div className="error-message">{errors.general}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="sessions-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="input-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="input-group">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>

          <div className="input-group">
            <select name="time" value={formData.time} onChange={handleChange}>
              <option value="">Select a Time Slot</option>
              {availableSlots.map((slot, idx) => (
                <option key={idx} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.time && <span className="error-text">{errors.time}</span>}
          </div>

          <button type="submit">Book Appointment</button>
        </form>
      </div>

      {/* Displaying Available Slots */}
      <div className="available-slots">
        <h4>
          You can book yours as per this Available slots, and also we have Pet Healing Therapy.  
          Pets are more than just adorable companions—they can be powerful sources of emotional healing and mental well-being.  
          Whether it's a playful dog, a purring cat, or a chirping bird, animals have a unique ability to bring comfort, reduce stress, and provide unconditional love.  
          Pets are Natural healers, offering Love, Comfort, and Emotional support.  
          Their presence brings joy, relieves stress, and encourages a healthier lifestyle.  
          Whether you're looking for a companion to uplift your mood or a loyal friend to share your journey, pets can be the perfect therapy for a happier and healthier life. 🐾❤️
        </h4>
      </div>
    </div>
  );
};

export default Sessions;
