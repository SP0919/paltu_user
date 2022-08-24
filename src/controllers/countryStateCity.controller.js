const Country = require("../models/country.model");
const { errorRespond, successRepond } = require("../utils/responseHandler.util");
// Create and Save a new User
exports.country = async (req, res) => {
  try {
    let Country = await Country.insertMany([req.body]);

    const data = { data: Country, message: "Email Register  Successfully." };
    res.json(successRepond(data));
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong.",
    };
    return res.json(errorRespond(data));
  }
};

// Create and Save a new User
exports.state = async (req, res) => {
  const { user_name, email, user_type, phone } = req.body;
  try {
    let isUser = await User.findOne({ email: req.body.email });
    if (isUser) {
      const data = { data: "", message: "Email Already Exists  Successfully." };
      return res.json(successRepond(data));
    }
    let user = new User({
      user_name,
      email,
      user_type,
      phone,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    let userData = await user.save();
    const data = { data: userData, message: "Email Register  Successfully." };
    res.json(successRepond(data));
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong.",
    };
    return res.json(errorRespond(data));
  }
};

// Create and Save a new User
exports.city = async (req, res) => {
  const { user_name, email, user_type, phone } = req.body;
  try {
    let isUser = await User.findOne({ email: req.body.email });
    if (isUser) {
      const data = { data: "", message: "Email Already Exists  Successfully." };
      return res.json(successRepond(data));
    }
    let user = new User({
      user_name,
      email,
      user_type,
      phone,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    let userData = await user.save();
    const data = { data: userData, message: "Email Register  Successfully." };
    res.json(successRepond(data));
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong.",
    };
    return res.json(errorRespond(data));
  }
};
