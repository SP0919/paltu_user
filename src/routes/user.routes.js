const express = require("express");
const router = express.Router();
const validation = require("../utils/validation.util");
const userController = require("../controllers/user.controller");
const isAuthenticated = require("../middlewares/authenticate.middleware");
const multer = require("multer");
let upload = multer();
// Retrieve all users
router.get("/", userController.findAll);
// Create a new user
router.post(
  "/register",
  [upload.single("user_profile"), validation.registerValidation],
  userController.create
);
router.post("/login", [upload.none(), validation.loginValidation], userController.signIn);
// Retrieve a single user with id
router.get("/:id", [isAuthenticated, upload.none()], userController.findOne);
// Update a user with id
router.put("/:id", [isAuthenticated, upload.none()], userController.update);
// Delete a user with id
router.delete("/:id", userController.delete);

router.post("/change-password", [isAuthenticated, upload.none()], userController.changePassword);
router.post("/forget-password", [upload.none(), isAuthenticated], userController.forgetPassword);
router.get("/reset-password/:token", upload.none(), userController.resetPassword);
router.post("/reset-password/:token", upload.none(), userController.updatePassword);

// router.delete("/:id", userController.delete);
module.exports = router;
