const express = require("express");
var router = express.Router();

/* Initializing other routes */
const db = require("../../config/db.config");
// db();
var user = require("./user.routes");
var category = require("./category.routes");
var coupon = require("./coupon.routes");
var serviceProvider = require("./serviceProvider.route");
var serviceTypes = require("./serviceTypes.route");

const defaultRoutes = [
  {
    path: "/user",
    route: user,
  },
  {
    path: "/category",
    route: category,
  },
  {
    path: "/coupon",
    route: coupon,
  },

  {
    path: "/service-type",
    route: serviceTypes,
  },
  {
    path: "/service-provider",
    route: serviceProvider,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
router.all("*", (req, res) => {
  res.json({ message: "Invalid Page Link." });
});
