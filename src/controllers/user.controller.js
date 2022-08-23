"use strict";
const { required } = require("@hapi/joi/lib/base.js");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const { errorRespond, successRepond } = require("../utils/responseHandler.util");
const ForgetpasswordLog = require("../models/forgetPasswordLogs.model");
// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  User.find()
    .sort({ createdAt: -1 })
    .then((users) => {
      const data = { data: users, message: "Users fetched  Successfully." };
      return res.json(successRepond(data));
    })
    .catch((err) => {
      const data = {
        status: "500",
        message: err.message || "Something went wrong while getting list of users.",
      };
      return res.json(errorRespond(data));
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
    return res.json(errorRespond(data));
  }

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        const data = { data: "", message: "Email Already Exists  Successfully." };
        res.json(successRepond(data));
      }
    })
    .catch((err) => {
      const data = {
        status: "500",
        message: err.message || "Error getting user with id " + req.params.id,
      };
      return res.json(errorRespond(data));
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
      return res.json(successRepond(datas));
    })
    .catch((err) => {
      const data = {
        status: "500",
        message: err.message || "Something went wrong while creating new user.",
      };
      res.setHeader("Content-Type", "text/html");
      res.write("<p>Hello World</p>");
      // return res.send(500).json(errorRespond(data));
    });
};
// Login user
exports.signIn = function (req, res) {
  // const datas = { data: req.body.password, message: "Users Created  Successfully." };
  // return successRepond(datas);
  User.findOne({
    email: req.body.email,
  })
    .then(async (user) => {
      if (!user) {
        const data = {
          status: "404",
          message: "User not found with id " + req.params.id,
        };
        return res.json(errorRespond(data));
      }
      try {
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
          const data = {
            status: "401",
            message: "Invalid User Passwords",
          };
          return res.json(errorRespond(data));
        }
      } catch (err) {
        const data = {
          status: "401",
          message: err.message || "Invalid User Passwords",
        };
        return res.json(errorRespond(data));
      }

      const token = jwt.sign(
        { email: user.email, fullName: user, _id: user._id },
        process.env.TOKEN_SECRET
      );
      const datas = { data: [token, user], message: "Users Logined  Successfully." };
      return res.json(successRepond(datas));
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        const data = {
          status: "404",
          message: " User not found with id " + req.params.id,
        };
        return res.json(errorRespond(data));
      }
      const data = {
        status: "404",
        message: err.message || "Something went wrong while creating new user.",
      };
      return res.json(errorRespond(data));
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
        return res.json(errorRespond(data));
      }
      const datas = { data: user, message: "Users Data  Successfully." };
      return res.json(successRepond(datas));
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        const data = {
          status: "500",
          message: "User not found with id " + req.params.id,
        };
        return res.json(errorRespond(data));
      }
      const data = {
        status: "500",
        message: "Error getting user with id " + req.params.id,
      };
      return res.json(errorRespond(data));
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
    return res.json(errorRespond(data));
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
        return res.json(errorRespond(data));
      }
      const data = { data: user, message: "user deleted successfully!" };
      return res.json(successRepond(data));
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        const data = {
          status: "404",
          message: "user not found with id " + req.params.id,
        };
        return res.json(errorRespond(data));
      }
      const data = {
        status: "500",
        message: "Error updating user with id " + req.params.id,
      };
      return res.json(errorRespond(data));
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
        return res.json(errorRespond(data));
      }
      const data = { data: "", message: "user deleted successfully!" };
      return res.json(successRepond(data));
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        const data = {
          status: "404",
          message: "user not found with id " + req.params.id,
        };
        return res.json(errorRespond(data));
      }
      const data = {
        status: "500",
        message: "Could not delete user with id " + req.params.id,
      };
      return res.json(errorRespond(data));
    });
};
// change password a pasword with the user id
exports.changePassword = (req, res) => {
  var userid = "63032b592bfc3d2495437566";
  User.findById(userid).then((userid) => {
    if (req.body.confirmpassword == req.body.newpassword) {
      return res.status(400).send({ message: "password match" });
    } else {
      return res.status(404).send({ message: "password not match" + "63032b592bfc3d2495437566" });
    }
  });
  if (!req.body.confirmpassword) {
    return res.status(400).send({ message: "fill required field" });
  }
};
// change password a pasword with the user id
exports.forgetPassword = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then(async (user) => {
      if (!user) {
        const data = {
          status: "500",
          message: "Invalid Email",
        };
        return res.json(errorRespond(data));
      }

      ForgetpasswordLog.find({ user_id: req.user?._id, deleted_at: null }).then((user) => {});

      var nodemailer = require("nodemailer");

      var transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
          user: "sandeep@pixlerlab.com",
          pass: "Iyhq84UOsMpW5t70",
        },
      });

      var mailOptions = {
        from: process.env.EMAIL_FROM,
        to: "sandeep@pixlerlab.com",
        subject: "Forget Password",
        text: "Please Verify to change password",
        html: "<h2>Hi! There</h2> <h5> This HTML content is  being send by NodeJS along with NodeMailer.</h5>",
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          const data = { data: "", message: "Unable to send mail" };

          return res.json(successRepond(data));
        } else {
          const data = { data: "", message: "Mail sent successfully!" };
          console.log("Email sent: " + info.response);
          return res.json(successRepond(data));
        }
      });
      // const data = { data: "info", message: "user deleted successfully!" };
      // return res.json(successRepond(data));
    })
    .catch((err) => {
      const data = {
        status: "500",
        message: err.message || "Could not delete user with id " + req.params.id,
      };
      return res.json(errorRespond(data));
    });
};
// change password a pasword with the user id
// exports.resetPassword = function (req, res) => {
//   var userid = "63032b592bfc3d2495437566";
//   User.findById(userid).then((userid) => {
//     if (req.body.confirmpassword == req.body.newpassword) {
//       return res.status(400).send({ message: "password match" });
//     } else {
//       return res.status(404).send({ message: "password not match" + "63032b592bfc3d2495437566" });
//     }
//   });
//   if (!req.body.confirmpassword) {
//     return res.status(400).send({ message: "fill required field" });
//   }
// };
