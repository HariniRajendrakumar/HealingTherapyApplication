const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

const folderPath = "E:\\Bobby\\Positive Quotes"; // Folder containing images
const uploadURL = "http://localhost:5001/upload"; // Your upload API endpoint

const uploadImage = async (filePath) => {
  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(filePath));

    const response = await axios.post(uploadURL, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    console.log(` Uploaded: ${filePath} - ${response.data.imagePath}`);
  } catch (error) {
    console.log(` Error uploading ${filePath}:`, error.response?.data || error.message);
  }
};

const startBulkUpload = async () => {
  try {
    const files = fs.readdirSync(folderPath)
      .filter(file => file.match(/\.(jpg|jpeg|png)$/i)); // Only image files

    if (files.length === 0) {
      console.log(" No images found in the folder.");
      return;
    }

    for (const file of files) {
      const filePath = path.resolve(folderPath, file);
      await uploadImage(filePath);
    }

    console.log(" All images uploaded successfully!");
  } catch (err) {
    console.error(" Error reading folder:", err.message);
  }
};

startBulkUpload();
