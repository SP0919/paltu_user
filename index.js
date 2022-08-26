const express = require("express");
require("dotenv").config();
// console.log(process.env);
const bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");
var nodeMailer = require("nodemailer");
// create express app

const app = express();
app.use("/public", express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "src/views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(cors());
// Setup server port
const port = process.env.PORT || 4000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// Configuring the database

const indexRouter = require("./src/routes/index");

app.use("/api", indexRouter);
// define a root/default route
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// define a root/default route

// listen for requests
app.listen(port, () => {
  console.log(`Node server is listening on port ${port}`);
});
