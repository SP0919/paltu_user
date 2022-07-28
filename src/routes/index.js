const express = require("express");
var router = express.Router();

/* Initializing other routes */
router.use("/", require("./csv"));
router.use("/", require("./user"));

module.exports = router;
