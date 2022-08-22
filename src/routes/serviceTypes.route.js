const express = require("express");
const router = express.Router();
const serviceTypeController = require("../controllers/serviceTypes.controller");
const multer = require("multer");
let upload = multer();
// let upload = multer();
// Retrieve all users
router.get("/", upload.none(), serviceTypeController.findAll);
// Create a new user
router.post("/", upload.none(), serviceTypeController.create);
// Retrieve a single user with id
router.get("/:id", upload.none(), serviceTypeController.findOne);
// Update a user with id
router.put("/:id", upload.none(), serviceTypeController.update);
// Delete a user with id
router.delete("/:id", upload.none(), serviceTypeController.delete);
module.exports = router;
