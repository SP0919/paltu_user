var multer = require("multer");
const path = require("path");
const fs = require("fs");
const des = process.cwd();
var imagePath = "";

const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1;
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();

// const fullpath = imagePath + year + '/' + month + '/' + day;
// const partialpath = year + '/' + month + '/' + day;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "category_image") {
      imagePath = path.join(des, "/public/images/category/");
    }

    if (!fs.existsSync(imagePath)) {
      var shell = require("shelljs");
      shell.mkdir("-p", imagePath);
    }
    // Uploads is the Upload_folder_name
    cb(null, imagePath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + ".jpg");
  },
});
const maxSize = 1 * 1000 * 1000;
var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb("Error: File upload only supports the " + "following filetypes - " + filetypes);
  },

  // mypic is the name of file attribute
});
async function folder(req, res, folder) {
  res.send(imagePath);
}
module.exports = {
  storage,
  maxSize,
  upload,
  folder,
};
