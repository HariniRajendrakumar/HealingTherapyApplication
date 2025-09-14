const express = require("express");
const router = express.Router();
const Image = require("../models/Image");

// API to retrieve images
router.get("/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving images" });
  }
});

module.exports = router;
