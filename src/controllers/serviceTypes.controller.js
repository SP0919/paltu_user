const ServiceType = require("../models/serviceTypes.model");
const { errorRespond, successRepond } = require("../utils/responseHandler.util");
// Retrieve and return all serviceTypes from the database.
exports.findAll = (req, res) => {
  ServiceType.find()
    .then((serviceTypes) => {
      const data = { data: serviceTypes, message: "serviceTypes  successfully!" };
      return successRepond(data, req, res);
    })
    .catch((err) => {
      const data = {
        status: "500",
        message: err.message || "Something went wrong while getting list of serviceTypes.",
      };
      return errorRespond(data, req, res);
    });
};
// Create and Save a new ServiceType
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    const data = {
      status: "400",
      message: "Please fill all required field",
    };
    return errorRespond(data, req, res);
  }
  // Create a new ServiceType
  const serviceTypes = new ServiceType({
    name: req.body.name,
  });
  // Save serviceTypes in the database
  serviceTypes
    .save()
    .then((data) => {
      const dataS = { data: serviceTypes, message: "serviceTypes  successfully!" };
      return successRepond(dataS, req, res);
    })
    .catch((err) => {
      const data = {
        status: "500",
        message: err.message || "Something went wrong while getting list of serviceTypes.",
      };
      return errorRespond(data, req, res);
    });
};
// Find a single ServiceType with a id
exports.findOne = (req, res) => {
  ServiceType.findById(req.params.id)
    .then((serviceTypes) => {
      if (!serviceTypes) {
        const data = {
          status: "404",
          message: "ServiceType not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = { data: serviceTypes, message: "serviceTypes  successfully!" };
      return successRepond(data, req, res);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        const data = {
          status: "404",
          message: "ServiceType not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }

      const data = {
        status: "500",
        message: "Error getting serviceTypes with id " + req.params.id,
      };
      return errorRespond(data, req, res);
    });
};
// Update a ServiceType identified by the id in the request
exports.update = (req, res) => {
  // console.log(req.body);
  // Validate Request
  if (!req.body) {
    const data = {
      status: "400",
      message: "Please fill all required field",
    };
    return errorRespond(data, req, res);
  }
  const checkServiceType = ServiceType.findById(req.params.id)
    .then((serviceTypes) => {
      if (!serviceTypes) {
        const data = {
          status: "404",
          message: "ServiceType not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        const data = {
          status: "404",
          message: "ServiceType not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = {
        status: "500",
        message: "Error getting serviceTypes with id " + req.params.id,
      };
      return errorRespond(data, req, res);
    });
  var image = "";

  // Find serviceTypes and update it with the request body
  ServiceType.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  )
    .then((serviceTypes) => {
      if (!serviceTypes) {
        const data = {
          status: "404",
          message: "ServiceType not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = { data: serviceTypes, message: "serviceTypes  successfully!" };
      return successRepond(data, req, res);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        const data = {
          status: "404",
          message: "ServiceType not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = {
        status: "500",
        message: "Error updating serviceTypes with id " + req.params.id,
      };
      return errorRespond(data, req, res);
    });
};
// Delete a ServiceType with the specified id in the request
exports.delete = (req, res) => {
  ServiceType.findByIdAndRemove(req.params.id)
    .then((serviceTypes) => {
      if (!serviceTypes) {
        const data = {
          status: "404",
          message: "serviceTypes not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = { data: "", message: "serviceTypes deleted successfully!" };
      return successRepond(data, req, res);
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        const data = {
          status: "404",
          message: "serviceTypes not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = {
        status: "500",
        message: "Could not delete serviceTypes with id " + req.params.id,
      };
      return errorRespond(data, req, res);
    });
};
