const axios = require("axios");
const NASA_API_URL = "https://api.nasa.gov/planetary/apod";
const NASA_API_KEY = process.env.NASA_API_KEY;

exports.getApodByDate = async (req, res) => {
  const { date } = req.params;

  try {
    const response = await axios.get(
      `${NASA_API_URL}?api_key=${NASA_API_KEY}&date=${date}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from NASA API" });
  }
};
