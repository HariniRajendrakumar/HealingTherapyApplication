const express = require("express");
const multer = require("multer");
const path = require("path");
const Audio = require("../models/Audio");

const router = express.Router();

// Multer Storage for Audio
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/audios"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// ✅ Fix: Ensure title is stored with audioPath
router.post("/upload/audios", upload.array("audios", 50), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No audio files uploaded!" });
        }

        const audioData = req.files.map(file => ({
            title: file.originalname,  // Store filename as title
            audioPath: `/uploads/audios/${file.filename}`
        }));

        await Audio.insertMany(audioData);

        res.json({ message: "✅ Audios uploaded successfully!", files: audioData });
    } catch (error) {
        res.status(500).json({ error: "❌ Error uploading audios", details: error.message });
    }
});

// ✅ API to Fetch All Audios (Fixed)
router.get("/audios", async (req, res) => {
    try {
        const audios = await Audio.find();
        res.json(audios);
    } catch (error) {
        res.status(500).json({ error: "❌ Error retrieving audios", details: error.message });
    }
});

module.exports = router;
