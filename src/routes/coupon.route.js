const express = require("express");
const router = express.Router();
const couponController = require("../controllers/coupon.controller");
const { upload, folder } = require("../services/imageUpload.service");
const validation = require("../utils/validation.util");

// let upload = multer();
// Retrieve all users
router.get("/", couponController.findAll);
// Create a new user
router.post("/create", upload.single("coupon_image"), couponController.create);
// Retrieve a single user with id
router.get("/:id", couponController.findOne);
// Update a user with id
router.put("/:id", upload.single("coupon_image"), couponController.update);
// Delete a user with id
router.delete("/:id", couponController.delete);
module.exports = router;