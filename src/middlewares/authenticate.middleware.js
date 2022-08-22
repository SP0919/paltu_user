const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
  //   console.log(process.env.TOKEN_SECRET);
  try {
    const token = req.headers.token;

    if (!token) {
      return next("Please login to access the data");
    }
    const verify = await jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(verify);
    req.user = await userModel.findById(verify._id);
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = isAuthenticated;
