const Category = require("../models/category.model.js");
const { errorRespond, successRepond } = require("../utils/responseHandler.util");
// Retrieve and return all category from the database.
exports.findAll = async (req, res) => {
  try {
    let category = await Category.find();
    // console.log(category);
    if (category) {
      const data = { data: category, message: "category  successfully!" };
      return res.send(successRepond(data));
    }
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong while getting list of category.",
    };
    return res.send(errorRespond(data));
  }
};
// Create and Save a new Category
exports.create = async (req, res) => {
  try {
    
    let category = new Category({
      name: req.body.name,
      image: "/public/images/category/" + req.file.originalname,
    
    });
    let categorys = await category.save();
    const data = { data: category, message: "save category successfully" };
    return res.json(successRepond(data));
  } catch (err) {
    const data = {
      status: "500",
      message: err.message || "Something went wrong",
    };
    return res.send(errorRespond(data));
  }
};
// exports.create = async (req, res) => {
//   try {
//     // // Validate request
//     // if (!req.body) {
//     //   const data = {
//     //     status: "400",
//     //     message: "Please fill all required field",
//     //   };
//     //   return errorRespond(data, req, res);
//     // }
//     const category = new Category({
//       name: req.body.name,
//       image: "/public/images/category/" + req.file.originalname,
//     });
//     let cat = category.save();
//     // Create a new Category
//     const data = { data: category, message: "category  successfully!" };
//     return successRepond(dataS, req, res);
//   } catch (err) {
//     const data = {
//       status: "500",
//       message: err.message || "Something went wrong while getting list of category.",
//     };
//     return errorRespond(data, req, res);
//   }
// };
exports.findOne = async (req, res) => {
  try {
   
    let category = await Category.findById(req.params.id);
    if (!category) {
      const data = { data: "", message: "category not found with id " };
      return res.json(errorRespond(data));
      }
      const data = { data: category, message: "category  found with id  successfully" };
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
// Update a Category identified by the id in the request
exports.update = async (req, res) => {
  
  try {
    var image = "";
      if (req.file) {
        image = "/public/images/category/" + req.file.originalname;
      } else {
        image = category.image;
      }
      // console.log(req.body);
      // Find category and update it with the request body
       let category = await Category.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          image: image,
        },
        { new: true }
      )
if (!category) {
  const data = { data: "", message: "category not found with id " };
      return res.json(errorRespond(data));
      }
      const data = { data: category, message: "category Updated successfully!" };
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
        


// Delete a Category with the specified id in the request

exports.delete = async (req, res) => {
  try {
    let category = await Category.findByIdAndRemove(req.params.id);
   
    if (!category) {
      const data = { data: "", message: "category not found with id " };
      return res.json(errorRespond(data));
      }
      const data = { data: "", message: "category Deleted successfully!" };
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