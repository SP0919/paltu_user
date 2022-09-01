const express = require("express");
const router = express.Router();
const homepageController = require("../controllers/homepage.controller");

const multer = require("multer");
let upload = multer();
const isAuthenticated = require("../middlewares/authenticate.middleware");
// Create a new user
router.get("/service-providers/:lat/:long",  isAuthenticated, homepageController.findAll);

// // Create a new user
// router.post("/state", upload.none(), homepageController.state);
// // Create a new user
// router.post("/city", upload.none(), homepageController.city);

module.exports = router;
