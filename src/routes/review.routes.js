const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const isAuthenticated = require("../middlewares/authenticate.middleware");

const validation = require("../utils/validation.util");
const multer = require("multer");
let formdata = multer();
// Retrieve all users
router.get("/", reviewController.findAll);
// Create a new user
router.post(
  "/create",
  [isAuthenticated, formdata.none(), validation.reviewValidation],
  reviewController.create
);
module.exports = router;
