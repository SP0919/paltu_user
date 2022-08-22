const ServiceProvider = require("../models/serviceProvider.model");
const User = require("../models/user.model");
const { errorRespond, successRepond } = require("../utils/responseHandler.util");
// Retrieve and return all serviceProvider from the database.
exports.findAll = (req, res) => {
  console.log(req.headers.token);
  ServiceProvider.find()
    .then((serviceProvider) => {
      const data = { data: serviceProvider, message: "serviceProvider  successfully!" };
      return successRepond(data, req, res);
    })
    .catch((err) => {
      const data = {
        status: "500",
        message: err.message || "Something went wrong while getting list of serviceProvider.",
      };
      return errorRespond(data, req, res);
    });
};

// Find a single serviceProvider with a id
exports.findOne = (req, res) => {
  ServiceProvider.findById(req.params.id)
    .then((serviceProvider) => {
      if (!serviceProvider) {
        const data = {
          status: "404",
          message: "serviceProvider not found with id",
        };
        return errorRespond(data, req, res);
      }
      const data = { data: serviceProvider, message: "serviceProvider  successfully!" };
      return successRepond(data, req, res);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        const data = {
          status: "404",
          message: "serviceProvider not found with id",
        };
        return errorRespond(data, req, res);
      }

      const data = {
        status: "500",
        message: "Error getting serviceProvider with id",
      };
      return errorRespond(data, req, res);
    });
};
// Update a serviceProvider identified by the id in the request
exports.update = (req, res) => {
  //   console.log(req.user);
  //   return;
  // Validate Request
  if (!req.body) {
    const data = {
      status: "400",
      message: "Nothing to update",
    };
    return errorRespond(data, req, res);
  }
  var serviceId = "";
  ServiceProvider.findOne({
    user_id: req.user._id,
  })
    .then((serviceProviderCheck) => {
      if (!serviceProviderCheck) {
        var ServiceProviderINsert = new ServiceProvider({
          user_id: req.user._id,
          serviceType_id: req.body.services,
        });
        ServiceProviderINsert.save()
          .then((serviceProviderData) => {
            if (!serviceProviderData) {
              const data = {
                status: "404",
                message: "Something went wrong",
              };
              return errorRespond(data, req, res);
            }
            const data = { data: serviceProviderData, message: "serviceProvider  successfully!" };
            return successRepond(data, req, res);
          })
          .catch((err) => {
            const data = {
              status: "500",
              message: "Error Creating service Provider ",
            };
            return errorRespond(data, req, res);
          });
      } else {
        // Find serviceProvider and update it with the request body

        ServiceProvider.findByIdAndUpdate(
          serviceProviderCheck._id,
          {
            serviceType_id: req.body.services,
          },
          { new: true }
        )
          .then((serviceProvider) => {
            if (!serviceProvider) {
              const data = {
                status: "404",
                message: "serviceProvider not found with id",
              };
              return errorRespond(data, req, res);
            }
            const data = { data: serviceProvider, message: "serviceProvider  successfully!" };
            return successRepond(data, req, res);
          })
          .catch((err) => {
            const data = {
              status: "500",
              message: err.message,
            };
            return errorRespond(data, req, res);
          });
      }
    })
    .catch((err) => {
      const data = {
        status: "500",
        message: err.message,
      };
      return errorRespond(data, req, res);
    });
};
// Delete a serviceProvider with the specified id in the request
exports.delete = (req, res) => {
  ServiceProvider.findByIdAndRemove(req.params.id)
    .then((serviceProvider) => {
      if (!serviceProvider) {
        const data = {
          status: "404",
          message: "serviceProvider not found with id",
        };
        return errorRespond(data, req, res);
      }
      const data = { data: "", message: "serviceProvider deleted successfully!" };
      return successRepond(data, req, res);
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        const data = {
          status: "404",
          message: "serviceProvider not found with id",
        };
        return errorRespond(data, req, res);
      }
      const data = {
        status: "500",
        message: "Could not delete serviceProvider with id",
      };
      return errorRespond(data, req, res);
    });
};
