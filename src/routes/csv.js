const express = require("express");
const router = express.Router();
const csvController = require("../controller/CsvController");
const { forwardAuthenticated } = require("../../config/auth");
const multer = require("multer");
/* Creating a schema for crud operation C: Create */
router.post("/CRUDcreate", forwardAuthenticated, csvController.create);
/* Router for CRUD operation R: read */
router.get("/CRUDread", csvController.read);
/* CRUD operation 'update' router */
router.post("/CRUDupdate", csvController.update);
/* Router to perform delete of CRUD operations */
router.post("/CRUDdelete", csvController.delete);
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

router.post("/single", upload.single("fileUpload"), (req, res) => {
  console.log("single route");
  console.log("file:" + JSON.stringify(req.file));
  res.send("single file upload success");
});

router.post("/fileUpload", upload.single("fileCSV"), csvController.fileupload);
module.exports = router;
