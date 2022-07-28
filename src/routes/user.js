const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
/* Register router with passport package */
router.post("/register", userController.register);

/* Login router */
router.post("/login", userController.login);

/* Logout router */
router.get("/logout", userController.logout);

module.exports = router;
