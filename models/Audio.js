const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  audioPath: { type: String, required: true }, // Path to the stored audio file
});

module.exports = mongoose.model("Audio", audioSchema);
