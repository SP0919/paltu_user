const Review = require("../models/review.model.js");

const { errorRespond, successRepond } = require("../utils/responseHandler.util");
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
      message: err.message || "Something went wrong while getting list of review.",
    };
    return res.send(errorRespond(data));
  }
};

//craete and save new review
exports.create = async (req, res) => {
  const { comment, review_to } = req.body;
  try {
    let isreview = await Review.findOne({ review_by: req.user._id});
    if (isreview) {
      const data = {message: "Review   Successfully." };
      return res.json(successRepond(data));
    }
let review = new Review({
  comment,
 review_by:req.user._id,
 review_to,

});
let reviewData= await review.save();
const data ={data: reviewData, message:"save review successfully"};
 res.json(successRepond(data));
  }
  catch (err){
    const data = {
      status: "500",
      message: err.message || "Something went wrong.",
    };
    return res.json(errorRespond(data));


  }
}



// //create and save new review
// exports.create = (req, res) => {
 
// const review = new review({
//     review_by: req.body.user_id,
//     review_to: req.body.user_id,
    
//   });
//   review .save()
//   .then((data)=> {
//       res.send(data);
// })
//   .catch((err)=> {
//        res.status(500).send({message:"somthing wrong"});
//   })
// };