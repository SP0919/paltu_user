const Cities = require("../models/city.model");

// db();
const { errorRespond, successRepond } = require("../utils/responseHandler.util");
exports.findAll = async (req, res) => {
  try {
    let review = await Cities.find();

    // return;
    // find({
    //   location: {
    //     $near: {
    //       $geometry: { type: "Points", cordinates: [-73.9667, 40.78] },
    //     },
    //   },
    // });

    //if (review) {
    const data = { data: review, message: "update successfully!" };
    return res.send(successRepond(data));
    //}
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong while getting list of review.",
    };
    return res.send(errorRespond(data));
  }
};
