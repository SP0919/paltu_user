const express = require("express");
const router = express.Router();
const serviceProviderController = require("../controllers/serviceProvider.controller");
const isAuthenticated = require("../middlewares/authenticate.middleware");
// let upload = multer();
// Retrieve all users
router.get("/", isAuthenticated, serviceProviderController.findAll);
// Create a new user
router.post("/", isAuthenticated, serviceProviderController.update);
// Retrieve a single user with id
router.get("/:id", isAuthenticated, serviceProviderController.findOne);
// Update a user with id
// router.put("/:id", serviceProviderController.update);
// Delete a user with id
router.delete("/:id", isAuthenticated, serviceProviderController.delete);
module.exports = router;
