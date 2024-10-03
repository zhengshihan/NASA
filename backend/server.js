// backend/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(
  cors({
    origin: "https://nasa-front-pink.vercel.app", // Your frontend URL
    methods: ["GET", "POST"], // Allowed HTTP methods
  })
);

const nasaRoutes = require("./routes/nasaRoutes");

app.use("/api", nasaRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
