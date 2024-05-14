const express = require("express");

const axios = require("axios");

const router = express.Router();

async function getPlaceDetails(placeId) {
  try {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json`;
    const response = await axios.get(apiUrl, {
      params: {
        place_id: placeId,
        key: apiKey,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
}

router.get("/", async (req, res) => {
  const { placeId } = req.query;
  getPlaceDetails(placeId)
    .then((placeDetails) => {
      res.status(200).send(placeDetails);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;
