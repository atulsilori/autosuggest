const express = require("express");
const axios = require("axios");

const router = express.Router();

async function getPlaces(query) {
  try {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const apiUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";
    const response = await axios.get(apiUrl, {
      params: {
        query: query,
        key: apiKey,
      },
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
}

router.get("/", async (req, res) => {
  const { query } = req.query;
  getPlaces(query)
    .then((places) => {
      res.status(200).json(places);
    })
    .catch((error) => {
      res.status(500).json(hotelsData);
    });
});

module.exports = router;
