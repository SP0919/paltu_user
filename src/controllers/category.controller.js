const Category = require("../models/category.model.js");

// Retrieve and return all category from the database.
exports.findAll = (req, res) => {
  Category.find()
    .then((category) => {
      const data = { data: category, message: "category  successfully!" };
      return successRepond(data, req, res);
    })
    .catch((err) => {
      const data = {
        status: "500",
        message: err.message || "Something went wrong while getting list of category.",
      };
      return errorRespond(data, req, res);
    });
};
// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    const data = {
      status: "400",
      message: "Please fill all required field",
    };
    return errorRespond(data, req, res);
  }
  // Create a new Category
  const category = new Category({
    name: req.body.name,
    image: "/public/images/category/" + req.file.originalname,
  });
  // Save category in the database
  category
    .save()
    .then((data) => {
      const dataS = { data: category, message: "category  successfully!" };
      return successRepond(dataS, req, res);
    })
    .catch((err) => {
      const data = {
        status: "500",
        message: err.message || "Something went wrong while getting list of category.",
      };
      return errorRespond(data, req, res);
    });
};
// Find a single Category with a id
exports.findOne = (req, res) => {
  Category.findById(req.params.id)
    .then((category) => {
      if (!category) {
        const data = {
          status: "404",
          message: "Category not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = { data: category, message: "category  successfully!" };
      return successRepond(data, req, res);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        const data = {
          status: "404",
          message: "Category not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }

      const data = {
        status: "500",
        message: "Error getting category with id " + req.params.id,
      };
      return errorRespond(data, req, res);
    });
};
// Update a Category identified by the id in the request
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
  const checkCategory = Category.findById(req.params.id)
    .then((category) => {
      if (!category) {
        const data = {
          status: "404",
          message: "Category not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      var image = "";
      if (req.file) {
        image = "/public/images/category/" + req.file.originalname;
      } else {
        image = category?.image;
      }
      // Find category and update it with the request body
      Category.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          image: image,
        },
        { new: true }
      )
        .then((category) => {
          if (!category) {
            const data = {
              status: "404",
              message: "Category not found with id " + req.params.id,
            };
            return errorRespond(data, req, res);
          }
          const data = { data: category, message: "category  successfully!" };
          return successRepond(data, req, res);
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            const data = {
              status: "404",
              message: "Category not found with id " + req.params.id,
            };
            return errorRespond(data, req, res);
          }
          const data = {
            status: "500",
            message: "Error updating category with id " + req.params.id,
          };
          return errorRespond(data, req, res);
        });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        const data = {
          status: "404",
          message: "Category not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = {
        status: "500",
        message: "Error getting category with id " + req.params.id,
      };
      return errorRespond(data, req, res);
    });
};
// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (!category) {
        const data = {
          status: "404",
          message: "category not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = { data: "", message: "category deleted successfully!" };
      return successRepond(data, req, res);
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        const data = {
          status: "404",
          message: "category not found with id " + req.params.id,
        };
        return errorRespond(data, req, res);
      }
      const data = {
        status: "500",
        message: "Could not delete category with id " + req.params.id,
      };
      return errorRespond(data, req, res);
    });
};
