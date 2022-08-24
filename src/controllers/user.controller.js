"use strict";
const { required } = require("@hapi/joi/lib/base.js");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const { errorRespond, successRepond } = require("../utils/responseHandler.util");
const ForgetpasswordLog = require("../models/forgetPasswordLogs.model");
var md5 = require("md5");

// Retrieve and return all users from the database.
exports.findAll = async (req, res) => {
  try {
    let users = await User.find().sort({ createdAt: -1 });
    if (users) {
      const data = { data: users, message: "Users fetched  Successfully." };
      return res.json(successRepond(data));
    }
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong while getting list of users.",
    };
    return res.json(errorRespond(data));
  }
};
// Create and Save a new User
exports.create = async (req, res) => {
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
// Login user
exports.signIn = async function (req, res) {
  try {
    let isUser = await User.findOne({ email: req.body.email });
    // console.log(isUser);
    if (isUser) {
      const isMatch = await bcrypt.compare(req.body.password, isUser.password);
      if (!isMatch) {
        const data = {
          status: "401",
          message: "Invalid User Passwords",
        };
        return res.json(errorRespond(data));
      }
      const token = jwt.sign(
        { email: isUser.email, fullName: isUser, _id: isUser._id },
        process.env.TOKEN_SECRET
      );
      const datas = { data: { token: token, user: isUser }, message: "Users Login  Successfully." };
      return res.json(successRepond(datas));
    }
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong",
    };
    return res.json(errorRespond(data));
  }
};
// Find a single User with a id
exports.findOne = async (req, res) => {
  try {
    let User = await User.findById(req.params.id);
    if (User) {
      const datas = { data: user, message: "Users Data  Successfully." };
      return res.json(successRepond(datas));
    }
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong",
    };
    return res.json(errorRespond(data));
  }
};
// Update a User identified by the id in the request
exports.update = async (req, res) => {
  const { user_name, phone } = req.body;
  try {
    let IsUser = await User.findByIdAndUpdate(req.params.id, { user_name, phone }, { new: true });
    if (IsUser) {
      const data = { data: user, message: "user Updated successfully!" };
      return res.json(successRepond(data));
    }
    // Find user and update it with the request body
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong",
    };
    return res.json(errorRespond(data));
  }
};
// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
  try {
    let IsUser = await User.findByIdAndRemove(req.params.id);
    if (IsUser) {
      const data = { data: user, message: "user Deleted successfully!" };
      return res.json(successRepond(data));
    }
    // Find user and update it with the request body
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong",
    };
    return res.json(errorRespond(data));
  }
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
exports.forgetPassword = async (req, res) => {
  try {
    var nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: "sandeep@pixlerlab.com",
        pass: "Iyhq84UOsMpW5t70",
      },
    });
    var token = md5(req.user?.email);
    console.log(token);
    var url =
      process.env.BASE_URL + ":" + process.env.PORT + req.baseUrl + "/reset-password/" + token;
    console.log(url);
    var mailOptions = {
      from: process.env.EMAIL_FROM,
      to: req.body.email,
      subject: "Forget Password",
      text: "Please Verify to change password",
      html:
        '<h2>Hi! There</h2> <h5> Please click on link to verify .</h5> <a href="' +
        url +
        '">Reset</a>',
    };
    let isUser = User.findOne({
      email: req.body.email,
    });
    if (isUser) {
      console.log(req.baseUrl);
      let IsMailSent = await ForgetpasswordLog.find({ user_id: req.user?._id, deleted_at: null });
      if (!IsMailSent) {
        await transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log(error);
            const data = { data: "", message: "Unable to send mail" };

            return res.json(successRepond(data));
          } else {
            const data = { data: "", message: "Mail sent successfully!" };
            let log = new ForgetpasswordLog({
              user_id: res.user?._id,
              token: token,
            });

            await log.save();
            console.log("Email sent: " + info.response);
            return res.json(successRepond(data));
          }
        });
      } else {
        // if (IsMailSent.length > 3) {
        //   const data = {
        //     status: "500",
        //     message: "You exceed limit for sending mail please try after 24 hours",
        //   };
        //   return res.json(errorRespond(data));
        // }
        let IsMailSentUpdate = await ForgetpasswordLog.updateMany(
          { user_id: res.user?._id },
          { deleted_at: Date.now() },
          { new: true }
        );
        if (IsMailSentUpdate) {
          await transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
              console.log(error);
              const data = { data: "", message: "Unable to send mail" };

              return res.json(successRepond(data));
            } else {
              const data = { data: "", message: "Mail sent successfully!" };
              let log = new ForgetpasswordLog({
                user_id: res.user?._id,
                token: token,
              });

              await log.save();
              console.log("Email sent: " + info.response);
              return res.json(successRepond(data));
            }
          });
        }
      }
    }
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong",
    };
    return res.json(errorRespond(data));
  }
};
//change password a pasword with the user id

exports.resetPassword = async (req, res) => {
  try {
    let IsTokenValid = await ForgetpasswordLog.find({ token: req.params.token, deleted_at: null });
    let form = 0;
    // console.log(IsTokenValid);
    if (IsTokenValid.length > 0) {
      form = 1;
    }
    res.render("resetPassword", { form: form });
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong",
    };
    return res.json(errorRespond(data));
  }
};
//update password a pasword with the user id
exports.updatePassword = async (req, res) => {
  try {
    const { password, confirm_password } = req.body;
    if (password != confirm_password) {
      const data = {
        status: "500",
        message: "New Password and Confirm Password should be same.",
      };
      return res.json(errorRespond(data));
    }
    let IsTokenValid = await ForgetpasswordLog.findOne({
      token: req.params.token,
      deleted_at: null,
    });
    let isUser = User.findOne({
      email: IsTokenValid?.user_id,
    });

    if (isUser) {
      let user = await User.findByIdAndUpdate(isUser?._id, { password }, { new: true });
      if (user) {
        await ForgetpasswordLog.updateMany(
          { user_id: res.user?._id },
          { deleted_at: Date.now() },
          { new: true }
        );
        const data = { data: "", message: "Password changed Successfully" };

        return res.json(successRepond(data));
      }
    }
  } catch (error) {
    const data = {
      status: "500",
      message: error.message || "Something went wrong.",
    };
    return res.json(errorRespond(data));
  }
};
