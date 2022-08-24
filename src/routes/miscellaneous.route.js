const express = require("express");
const router = express.Router();
const countryStateCity = require("../controllers/countryStateCity.controller");

const multer = require("multer");
let upload = multer();

// Create a new user
router.post("/country", upload.none(), countryStateCity.country);

// Create a new user
router.post("/state", upload.none(), countryStateCity.state);
// Create a new user
router.post("/city", upload.none(), countryStateCity.city);

module.exports = router;
