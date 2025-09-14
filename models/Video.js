const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Video", VideoSchema);
