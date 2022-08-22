const express = require("express");
const router = express.Router();
const serviceTypeController = require("../controllers/serviceTypes.controller");

// let upload = multer();
// Retrieve all users
router.get("/", serviceTypeController.findAll);
// Create a new user
router.post("/", serviceTypeController.create);
// Retrieve a single user with id
router.get("/:id", serviceTypeController.findOne);
// Update a user with id
router.put("/:id", serviceTypeController.update);
// Delete a user with id
router.delete("/:id", serviceTypeController.delete);
module.exports = router;
