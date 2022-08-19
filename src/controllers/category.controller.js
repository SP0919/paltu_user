const Category = require("../models/category.model.js");

// Retrieve and return all category from the database.
exports.findAll = (req, res) => {
  Category.find()
    .then((category) => {
      res.send(category);
    })
    .catch((err) => {  
      res
        .status(500)
        .send({ message: err.message || "Something went wrong while getting list of category." });
    });
};
// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({ message: "Please fill all required field" });
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
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Something went wrong while creating new category." });
    });
};
// Find a single Category with a id
exports.findOne = (req, res) => {
  Category.findById(req.params.id)
    .then((category) => {
      if (!category) {
        return res.status(404).send({ message: "Category not found with id " + req.params.id });
      }
      return res.send(category);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({ message: "Category not found with id " + req.params.id });
      }
      return res.status(500).send({ message: "Error getting category with id " + req.params.id });
    });
};
// Update a Category identified by the id in the request
exports.update = (req, res) => {
  // console.log(req.body);
  // Validate Request
  if (!req.body) {
    return res.status(400).send({ message: "Please fill all required field" });
  }
  const checkCategory = Category.findById(req.params.id)
    .then((category) => {
      if (!category) {
        return res.status(404).send({ message: "Category not found with id " + req.params.id });
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({ message: "Category not found with id " + req.params.id });
      }
      return res.status(500).send({ message: "Error getting category with id " + req.params.id });
    });
  var image = "";
  if (req.file) {
    image = "/public/images/category/" + req.file.originalname;
  } else {
    image = checkCategory?.image;
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
        return res.status(404).send({ message: "category not found with id " + req.params.id });
      }
      return res.send(category);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({ message: "category not found with id " + req.params.id });
      }
      return res.status(500).send({ message: "Error updating category with id " + req.params.id });
    });
};
// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (!category) {
        return res.status(404).send({ message: "category not found with id " + req.params.id });
      }
      res.send({ message: "category deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({ message: "category not found with id " + req.params.id });
      }
      return res
        .status(500)
        .send({ message: "Could not delete category with id " + req.params.id });
    });
};
