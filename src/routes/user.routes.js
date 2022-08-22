const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const isAuthenticated = require("../middlewares/authenticate.middleware");
const multer = require("multer");
let upload = multer();
// Retrieve all users
router.get("/", userController.findAll);
// Create a new user
router.post("/register", upload.single("user_profile"), userController.create);
router.post("/login", userController.signIn);
// Retrieve a single user with id
router.get("/:id", isAuthenticated, userController.findOne);
// Update a user with id
router.put("/:id", isAuthenticated, userController.update);
// Delete a user with id
router.delete("/:id", userController.delete);
router.delete("/:id", userController.delete);
module.exports = router;
