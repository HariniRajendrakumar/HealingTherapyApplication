const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// ✅ API to Book an Appointment
router.post("/book-appointment", async (req, res) => {
  try {
    const { name, email, phone, date, time } = req.body;

    console.log("Received Appointment Data:", req.body); // Debugging log

    // Validate input
    if (!name || !email || !phone || !date || !time) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Check if the slot is already booked
    const existingAppointment = await Appointment.findOne({ date, time });
    if (existingAppointment) {
      return res.status(400).json({ error: "This time slot is already booked. Please choose another slot." });
    }

    // ✅ Save new appointment
    const newAppointment = new Appointment({ name, email, phone, date, time });
    await newAppointment.save();

    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// ✅ API to Fetch All Appointments
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
