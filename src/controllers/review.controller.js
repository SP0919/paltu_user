const Review = require("../models/review.model.js");
const {
  errorRespond,
  successRepond,
} = require("../utils/responseHandler.util");
exports.findAll = async (req, res) => {
  try {
    let review = await Review.find();
    if (review) {
      const data = { data: review, message: "review  successfully!" };
      return res.send(successRepond(data));
    }
  } catch (err) {
    const data = {
      status: "500",
      message:
        err.message || "Something went wrong while getting list of review.",
    };
    return res.send(errorRespond(data));
  }
};

//craete and save new review
exports.create = async (req, res) => {
  try {
    let review = new Review({
      comment: req.body.comment,
      review_to: req.body.review_to,
      review_by: req.user._id,
      
    });
    let reviewData = await review.save();
    const data = { data: reviewData, message: "save review successfully" };
    res.json(successRepond(data));
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong.",
    };
    return res.send(errorRespond(data));
  }
};
