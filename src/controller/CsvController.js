exports.create = async function (req, res) {
  /* Initializing the schema and putting in CRUDcreate */
  const CRUDcreate = new CRUDoperations({
    username: req.body.username,
    identifier: req.body.identifier,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  /* Try Catch */
  try {
    /* Saving the data in mongoose */
    const savedCRUD = await CRUDcreate.save();
    /* Sending the response back */
    res.status(200);
    res.send(savedCRUD);
  } catch (err) {
    /* Sending the error back */
    res.status(400).send(err);
  }
};

exports.read = function (req, res) {
  /* Using find() for reading all the data */
  CRUDoperations.find({}, function (err, fetch) {
    /* In case of error */
    if (err) res.status(400).send(err);

    /* Sending back the response */
    res.status(200).send(fetch);
  });
};
exports.update = async function (req, res) {
  /* Taking the id */
  let id = req.body._id;

  try {
    /* Using findByIdAndUpdate */
    const CRUDupdate = await CRUDoperations.findByIdAndUpdate(
      { _id: id },

      /* Setting the value of identifier as 1967 of corresponding id */
      {
        $set: {
          identifier: 1969,
        },
      },
      {
        useFindAndModify: false,
      }
    );

    /* Sending the response back to the server */
    res.status(200).send(CRUDupdate);
  } catch (err) {
    /* Sending error back to the server */
    res.status(400).send(err);
  }
};
exports.delete = async function (req, res) {
  /* Taking the id of the collection */
  let id = req.body._id;

  /* Using Try and catch for deletion */
  try {
    /* Using findbyIdAndRemove operation to remove
		the data with corresponding id */
    const CRUDdel = await CRUDoperations.findByIdAndRemove(
      id,
      function (err, res) {
        if (err) {
          /* Sending error back to the server */
          res.status(400).send(err);
          console.log(err);
        } else {
          /* Sending the response back to the server */
          console.log("Removed User : ", res);
        }
      },
      {
        useFindAndModify: false,
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.fileupload = function (req, res) {
  console.log("Inside file Upload!!");
  console.log("single route");
  console.log("file:" + JSON.stringify(req.file.path));

  let stream = fs.createReadStream(req.file.path);

  let csvData = [];

  let csvStream = fastcsv
    .parse()
    .on("error", (error) => console.error(error))
    .on("data", function (data) {
      //console.log("Data Parse: " + JSON.stringify(data))
      dt = data[0].split(",");
      //console.log("DT: " + dt[0])
      csvData.push({
        username: dt[0],
        identifier: dt[1],
        firstName: dt[2],
        lastName: dt[3],
      });
      //console.log((csvData));
    })
    .on("end", async function () {
      // remove the first line: header
      csvData.shift();

      // save to the MongoDB database collection
      try {
        console.log("client:" + CRUDoperations);
        let CRUDinsert = await CRUDoperations.insertMany(csvData);
        console.log("CRUD Insert Many" + CRUDinsert);
        res.status(200).send(CRUDinsert);
      } catch (err) {
        console.log("db error:" + err);
        res.status(400).send(err);
      }
      console.log(JSON.stringify(csvData));
    });

  stream.pipe(csvStream);
};
