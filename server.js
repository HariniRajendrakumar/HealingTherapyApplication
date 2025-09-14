const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Image = require("./models/Image");
const Video = require("./models/Video");
const Audio = require("./models/Audio");
const Appointment = require("./models/Appointment");
require("dotenv").config();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Ensure upload directories exist
const uploadDir = path.join(__dirname, "uploads");
const imageUploadDir = path.join(uploadDir, "images");
const videoUploadDir = path.join(uploadDir, "videos");
const audioUploadDir = path.join(uploadDir, "audios");

[imageUploadDir, videoUploadDir, audioUploadDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/healingApp")
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Serve Static Files
app.use("/uploads", express.static(uploadDir));
app.use("/uploads/audios", express.static(path.join(__dirname, "uploads/audios"))); // ✅ Fix for serving audio files

// ✅ Multer Storage Configuration
const storageConfig = (destination) =>
  multer.diskStorage({
    destination: (req, file, cb) => cb(null, destination),
    filename: (req, file, cb) => cb(null, file.originalname),
  });

const imageUpload = multer({ storage: storageConfig(imageUploadDir) });
const videoUpload = multer({ storage: storageConfig(videoUploadDir) });
const audioUpload = multer({ storage: storageConfig(audioUploadDir) });

// ✅ API to Upload Images
app.post("/api/upload/images", imageUpload.array("images", 100), async (req, res) => {
  try {
    if (!req.files.length) return res.status(400).json({ error: "No images uploaded!" });

    const imagePaths = req.files.map((file) => ({ imagePath: `/uploads/images/${file.filename}` }));
    await Image.insertMany(imagePaths);

    res.json({ message: "✅ Images uploaded successfully!", files: imagePaths });
  } catch (error) {
    res.status(500).json({ error: "❌ Error uploading images", details: error.message });
  }
});

// ✅ API to Upload Videos
app.post("/api/upload/videos", videoUpload.array("videos", 50), async (req, res) => {
  try {
    if (!req.files.length) return res.status(400).json({ error: "No videos uploaded!" });

    const videoPaths = req.files.map((file) => ({ videoUrl: `/uploads/videos/${file.filename}` }));
    await Video.insertMany(videoPaths);

    res.json({ message: "✅ Videos uploaded successfully!", files: videoPaths });
  } catch (error) {
    res.status(500).json({ error: "❌ Error uploading videos", details: error.message });
  }
});

// ✅ API to Upload Audios
app.post("/api/upload/audios", audioUpload.single("audio"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No audio file uploaded!" });

    const newAudio = new Audio({
      title: req.body.title || req.file.originalname,
      audioPath: `/uploads/audios/${req.file.filename}`,
    });

    await newAudio.save();
    res.json({ message: "✅ Audio uploaded successfully!", audio: newAudio });
  } catch (error) {
    console.error("❌ Error uploading audio:", error);
    res.status(500).json({ error: "❌ Error uploading audio", details: error.message });
  }
});

// ✅ API to Retrieve Audios
app.get("/api/audios", async (req, res) => {
  try {
    const audios = await Audio.find();
    res.json(audios);
  } catch (error) {
    console.error("❌ Error retrieving audios:", error);
    res.status(500).json({ error: "❌ Error retrieving audios", details: error.message });
  }
});

// ✅ API to Retrieve Images
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "❌ Error retrieving images", details: error.message });
  }
});

// ✅ API to Retrieve Videos
app.get("/api/videos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "❌ Error retrieving videos", details: error.message });
  }
});

// API to Get All Videos
app.get("/videos", async (req, res) => {
  try {
    const videos = await ExerciseVideo.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching videos" });
  }
});

// ✅ API to Book an Appointment
app.post("/api/book-appointment", async (req, res) => {
  try {
    const { name, email, phone, date, time } = req.body;

    console.log("Received Data:", req.body);

    if (!name || !email || !phone || !date || !time) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingAppointment = await Appointment.findOne({ date, time });
    if (existingAppointment) {
      return res.status(400).json({ error: "This time slot is already booked. Please choose another slot." });
    }

    const newAppointment = new Appointment({ name, email, phone, date, time });
    await newAppointment.save();

    console.log("✅ Successfully Saved to MongoDB:", newAppointment);
    res.status(201).json({ message: "✅ Appointment booked successfully!", appointment: newAppointment });
  } catch (error) {
    console.error("❌ Error Saving Appointment:", error);
    res.status(500).json({ error: "❌ Server error", details: error.message });
  }
});

// ✅ Import Additional Routes
app.use("/api", require("./routes/appointments"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api", require("./routes/imageRoutes"));
app.use("/api", require("./routes/audioRoutes"));

// ✅ API Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from Backend!" });
});

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Healing Therapy API");
});

// ✅ Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
