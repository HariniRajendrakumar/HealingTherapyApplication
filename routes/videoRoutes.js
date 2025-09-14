const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const Video = require("../models/Video"); // MongoDB Model
const router = express.Router();

// Upload video route
router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const videoPath = req.file.path; // Get stored file path

    // Save the video path in MongoDB
    const newVideo = new Video({ videoUrl: videoPath });
    await newVideo.save();

    res.status(201).json({ message: "Video uploaded successfully!", videoUrl: videoPath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all videos
router.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
