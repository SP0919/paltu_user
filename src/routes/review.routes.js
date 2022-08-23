const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const isAuthenticated = require("../middlewares/authenticate.middleware");
const multer = require("multer");
let upload = multer();
// Retrieve all users
router.get("/", reviewController.findAll);
// Create a new user
router.post("/create",isAuthenticated, reviewController.create);
module.exports = router;