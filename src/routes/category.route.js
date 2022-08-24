const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

const multer = require("multer");
let upload = multer();
// let upload = multer();
// Retrieve all users
router.get("/", categoryController.findAll);
// Create a new user
router.post("/", upload.single("category_image"), categoryController.create);
// Retrieve a single user with id
router.get("/:id", categoryController.findOne);
// Update a user with id
router.put("/:id", upload.single("category_image"), categoryController.update);
// Delete a user with id
router.delete("/:id", categoryController.delete);
module.exports = router;
