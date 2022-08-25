const Coupon = require("../models/coupon.model.js");
const {
  errorRespond,
  successRepond,
} = require("../utils/responseHandler.util");
// Retrieve and return all coupon from the database.
exports.findAll = async (req, res) => {
  try {
    let coupon = await Coupon.find();
    
    if (coupon) {
      const data = { data: coupon, message: "coupon  successfully!" };
      return res.json(successRepond(data));
    }
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong.",
    };
    return res.send(errorRespond(data));
  }
};

// Create and Save a new Coupon
exports.create = async (req, res) => {
  try {
   let coupon = new Coupon({
      name: req.body.name,
      image: "/public/images/coupon/" + req.file.originalname,
    });
    let couponData = await coupon.save();
    const data = { data: couponData, message: "save coupon successfully" };
    return res.json(successRepond(data));
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong",
    }
    return res.send(errorRespond(data));
  }
};

// Find a single Coupon with a id fg    
exports.findOne = async(req, res) => {
  try{
   let coupon = await Coupon.findById(req.params.id)
    if (coupon) {
      const data = { data: coupon, message: "save coupon successfully" };
      return res.json(successRepond(data));
    }
     
  } 
  catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong",
    }
    return res.send(errorRespond(data));
  }


}

// Update a Coupon identified by the id in the request
exports.update = (req, res) => {
  // console.log(req.body);
  // Validate Request
  if (!req.body) {
    return res.status(400).send({ message: "Please fill all required field" });
  }
  var image = "";
  const checkCoupon = Coupon.findById(req.params.id)
    .then((coupon) => {
      if (!coupon) {
        return res
          .status(404)
          .send({ message: "Coupon not found with id " + req.params.id });
      }
      if (req.file) {
        image = "/public/images/coupon/" + req.file.originalname;
      } else {
        image = coupon.image;
      }
      // Find coupon and update it with the request body
      Coupon.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          image: image,
        },
        { new: true }
      )
        .then((coupon) => {
          if (!coupon) {
            return res
              .status(404)
              .send({ message: "coupon not found with id " + req.params.id });
          }
          return res.send(coupon);
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            return res
              .status(404)
              .send({ message: "coupon not found with id " + req.params.id });
          }
          return res.status(500).send({
            message: "Error updating coupon with id " + req.params.id,
          });
        });
      image = checkCoupon?.image;
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .send({ message: "Coupon not found with id " + req.params.id });
      }
      return res
        .status(500)
        .send({ message: "Error getting coupon with id " + req.params.id });
    });
};
// Delete a Coupon with the specified id in the request
exports.delete = (req, res) => {
  Coupon.findByIdAndRemove(req.params.id)
    .then((coupon) => {
      if (!coupon) {
        return res
          .status(404)
          .send({ message: "coupon not found with id " + req.params.id });
      }
      res.send({ message: "coupon deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res
          .status(404)
          .send({ message: "coupon not found with id " + req.params.id });
      }
      return res
        .status(500)
        .send({ message: "Could not delete coupon with id " + req.params.id });
    });
};
