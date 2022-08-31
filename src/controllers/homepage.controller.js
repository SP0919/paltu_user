const Cities = require("../models/city.model");
const db = require("../../config/db.config");
// db();
const { errorRespond, successRepond } = require("../utils/responseHandler.util");
exports.findAll = async (req, res) => {
  try {
    
    //let review = await Cities.find();
    //console.log(review);

    //   $nearSphere: {
    //     $geometry: {
    //       latitude: req.params.lat,
    //       longitude: req.params.long,
    //     },
    //     $minDistance: 0,
    //     $maxDistance: 10,
    //   },
    // });
    //if (review) {
      const data = { data: "", message: "update successfully!" };
      return res.send(successRepond(data));
    //}
  }catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong while getting list of review.",
    };
    return res.send(errorRespond(data));
  }
};

