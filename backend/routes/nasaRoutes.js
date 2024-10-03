// routes/nasaRoutes.js
const express = require("express");
const router = express.Router();
const nasaController = require("../controllers/nasaController");

router.get("/apod/:date", nasaController.getApodByDate);

module.exports = router;
