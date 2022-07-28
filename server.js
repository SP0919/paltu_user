const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));

/* Initializing the path for routes */
const routes = require("./src/routes");
app.use("/", routes);

/* Setting up server */
const port = process.env.PORT;
app.listen(port, function () {
  console.log("This server port is up and running on http://localhost:" + port);
});
gi;
