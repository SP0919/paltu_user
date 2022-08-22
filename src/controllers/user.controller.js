"use strict";
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const { errorRespond, successRepond } = require("../utils/responseHandler.util");

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  User.find()
    .sort({ createdAt: -1 })
    .then((users) => {
      const data = { data: users, message: "Users fetched  Successfully." };
      return successRepond(data, req, res);
    })
    .catch((err) => {
      const data = {
        status: "500",
        message: err.message || "Something went wrong while getting list of users.",
      };
      return errorRespond(data, req, res);
    });
};
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    const data = {
      status: "400",
      message: "Please fill all required field",
    };
    return errorRespond(data, req, res);
  }

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        const data = { data: "", message: "Email Already Exists  Successfully." };
        return successRepond(data, req, res);
      }
    })
    .catch((err) => {
      const data = {
        status: "500",
        message: "Error getting user with id " + req.params.id,
      };
      return errorRespond(data, req, res);
    });

  // Create a new User
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    user_type: req.body?.user_type || 1,
  });
  // Save user in the database
  user
    .save()
    .then((data) => {
      const datas = { data: data, message: "Users Created  Successfully." };
      return successRepond(datas, req, res);
    })
    .catch((err) => {
      const data = {
        status: "500",
        message: err.message || "Something went wrong while creating new user.",
      };
      return errorRespond(data, req, res);
    });
};
// Login user
exports.signIn = function (req, res) {
  // const datas = { data: req.body.password, message: "Users Created  Successfully." };
  // return successRepond(datas, req, res);
  User.findOne({
    email: req.body.email,
  })
    .then(async (user) => {
      if (!user) {
        const data = {
          status: "404",
          message: "User not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      try {
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
          const data = {
            status: "401",
            message: "Invalid User Passwords",
          };
          return errorRespond(data, req, res);
        }
      } catch (err) {
        const data = {
          status: "401",
          message: err.message || "Invalid User Passwords",
        };
        return errorRespond(data, req, res);
      }

      const token = jwt.sign(
        { email: user.email, fullName: user, _id: user._id },
        process.env.TOKEN_SECRET
      );
      const datas = { data: [token, user], message: "Users Logined  Successfully." };
      return successRepond(datas, req, res);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        const data = {
          status: "404",
          message: " User not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = {
        status: "404",
        message: err.message || "Something went wrong while creating new user.",
      };
      return errorRespond(data, req, res);
    });
};
// Find a single User with a id
exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        const data = {
          status: "500",
          message: "User not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const datas = { data: user, message: "Users Data  Successfully." };
      return successRepond(datas, req, res);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        const data = {
          status: "500",
          message: "User not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = {
        status: "500",
        message: "Error getting user with id " + req.params.id,
      };
      return errorRespond(data, req, res);
    });
};
// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    const data = {
      status: "400",
      message: "Please fill all required field",
    };
    return errorRespond(data, req, res);
  }
  // Find user and update it with the request body
  User.findByIdAndUpdate(
    req.params.id,
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.last_name,
      phone: req.body.last_name,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        const data = {
          status: "404",
          message: "user not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = { data: user, message: "user deleted successfully!" };
      return successRepond(data, req, res);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        const data = {
          status: "404",
          message: "user not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = {
        status: "500",
        message: "Error updating user with id " + req.params.id,
      };
      return errorRespond(data, req, res);
    });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        const data = {
          status: "404",
          message: "user not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = { data: "", message: "user deleted successfully!" };
      return successRepond(data, req, res);
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        const data = {
          status: "404",
          message: "user not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = {
        status: "500",
        message: "Could not delete user with id " + req.params.id,
      };
      return errorRespond(data, req, res);
    });
};
