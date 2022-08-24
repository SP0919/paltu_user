const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { errorRespond, successRepond } = require("../utils/responseHandler.util");
const isAuthenticated = async (req, res, next) => {
  //   console.log(process.env.TOKEN_SECRET);
  try {
    const token = req.headers.token;

    if (!token || token == undefined) {
      const data = {
        status: "500",
        message: "Please Login First",
      };
      return errorRespond(data, req, res);
    }
    const verify = await jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(verify);
    req.user = await userModel.findById(verify._id);
    next();
  } catch (error) {
    const data = {
      status: "500",
      message: "Please Login First",
    };
    return errorRespond(data, req, res);
  }
};

module.exports = isAuthenticated;
