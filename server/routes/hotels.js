const express = require("express");
const hotelsData = require("../utils/hotel.json");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(hotelsData);
});

module.exports = router;
