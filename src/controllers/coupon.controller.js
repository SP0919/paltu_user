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
      const data = { data: coupon, message: "coupon  create successfully!" };
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
    let coupons = await coupon.save();
    const data = { data: coupon, message: "save coupon successfully" };
    return res.json(successRepond(data));
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong",
    };
    return res.send(errorRespond(data));
  }
};

// Find a single Coupon with a id
exports.findOne = async (req, res) => {
  try {
   
    let coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      const data = { data: "", message: "coupon not found with id " };
      return res.json(errorRespond(data));
      }
      const data = { data: coupon, message: "coupon  found with id  successfully" };
      return res.json(successRepond(data));
    }
   catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong",
    };
    return res.send(errorRespond(data));
  }
};

// Update a Coupon identified by the id in the request
exports.update = async (req, res) => {
  
  try {
    var image = "";
      if (req.file) {
        image = "/public/images/coupon/" + req.file.originalname;
      } else {
        image = coupon.image;
      }
      
      // Find coupon and update it with the request body
       let coupon = await Coupon.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          image: image,
        },
        { new: true }
      )
if (!coupon) {
  const data = { data: "", message: "coupon not found with id " };
      return res.json(errorRespond(data));
      }
      const data = { data: coupon, message: "coupon Updated successfully!" };
      return res.json(successRepond(data));
    }
      catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong",
    };
    return res.json(errorRespond(data));
  }
};
        
        

// Delete a Coupon with the specified id in the request fdgfd
exports.delete = async (req, res) => {
  try {
    let coupon = await Coupon.findByIdAndRemove(req.params.id);
   
    if (!coupon) {
      const data = { data: "", message: "coupon not found with id " };
      return res.json(errorRespond(data));
      }
      const data = { data: "", message: "coupon Deleted successfully!" };
      return res.json(successRepond(data));
    }
   catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong",
    };
    return res.json(errorRespond(data));
  }
};
