const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.controller");

const multer = require("multer");
let upload = multer();
// Retrieve all users
router.get("/", appointmentController.findAll);
module.exports = router;