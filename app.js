const express = require("express");
const mongoose = require("mongoose"); // 1. Import Mongoose
const app = express();
require('dotenv').config();

// Configuration (Ideally move these to a .env file)
const MONGO_URI = "mongodb://127.0.0.1:27017/carS";
const PORT = 5000;

// 2. Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));

const userrouter = require("./routes/web");
app.use("/", userrouter);

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));