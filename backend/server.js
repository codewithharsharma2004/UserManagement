require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/user", require("./src/routes/user"));
app.use("/api/admin", require("./src/routes/admin"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// Error handler middleware (must be last)
app.use(errorHandler);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/user-management");
    console.log("MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error("Full error:", error);
    return false;
  }
};

// Start server
const PORT = process.env.PORT || 5000;

// Start server even if MongoDB connection fails (for debugging)
// In production, you might want to exit if DB fails
const startServer = async () => {
  const dbConnected = await connectDB();
  
  if (!dbConnected) {
    console.error("\n  WARNING: MongoDB connection failed!");
    console.error("Server will start but database operations will fail.");
    console.error("Please check:");
    console.error("1. MongoDB Atlas Network Access (IP whitelist)");
    console.error("2. Connection string is correct");
    console.error("3. Username/password are correct\n");
  }
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    if (!dbConnected) {
      console.log(" Note: MongoDB is not connected");
    }
  });
};

startServer();

module.exports = app;
