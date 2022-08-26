const Cities = require("../models/city.model");
const db = require("../../config/db.config");
// db();
const { errorRespond, successRepond } = require("../utils/responseHandler.util");
exports.findAll = async (req, res) => {
  try {
    db.cities.update(
      {},
      {
        $rename: {
          type: "location.type",
          latitude: { latitude: "location.coordinates.latitude" },
          longitude: { longitude: "location.coordinates.longitude" },
        },
      },
      { multi: true }
    );
    return res.send("done");
    let review = await Cities.find({
      $nearSphere: {
        $geometry: {
          latitude: req.params.lat,
          longitude: req.params.long,
        },
        $minDistance: 0,
        $maxDistance: 10,
      },
    });
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
