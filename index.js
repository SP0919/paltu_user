const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 4000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// Configuring the database
const dbConfig = require("./config/db.config.js");

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
