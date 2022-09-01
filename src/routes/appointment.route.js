const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.controller");

const multer = require("multer");
let upload = multer();
// Retrieve all users
<<<<<<< HEAD
router.get("/", appointmentController.findAll);
module.exports = router;
=======
// router.get("/", appointmentController.findAll);
module.exports = router;
>>>>>>> 6ff4c0e4d58019837c8e98797a7420f265c9bfe8
