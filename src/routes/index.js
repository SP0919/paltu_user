const express = require("express");
var router = express.Router();

/* Initializing other routes */
const db = require("../../config/db.config");
// db();
var user = require("./user.route");
var category = require("./category.route");
var coupon = require("./coupon.route");
var serviceProvider = require("./serviceProvider.route");
var serviceTypes = require("./serviceTypes.route");
var miscellaneous = require("./miscellaneous.route");
var review = require("./review.route");
var homepage = require("./homepage.route");

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
  {
    path: "/review",
    route: review,
  },
  {
    path: "/miscellaneous",
    route: miscellaneous,
  },
  {
    path: "/home",
    route: homepage,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
router.all("*", (req, res) => {
  res.json({ message: "Invalid Page Link." });
});
