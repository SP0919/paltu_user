const { errorRespond, successRepond } = require("../utils/responseHandler.util");
module.exports.validateRequired = (req, res, next, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    const data = {
      status: "500",
      message: ` ${error.details.map((x) => x.message).join(", ")}`,
    };
    return res.json(errorRespond(data));
  } else {
    req.body = value;
    next();
  }
};
