const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import all route files
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const dsaRoutes = require("./routes/dsaRoutes");
const profileRoutes = require("./routes/profileRoutes");
const mcqRoutes = require("./routes/mcqRoutes");
const srsRoutes = require("./routes/srs");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Use all routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/dsa", dsaRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/mcq", mcqRoutes);
app.use("/api/srs", srsRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));