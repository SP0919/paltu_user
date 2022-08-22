// error handling when error occured
const errorRespond = (err, req, res, next) => {
  const response = {
    status: false,
    statusCode: err.status,
    data: [],
    error: [],
    message: err.message,
  };
  const status = "";
  return res.status(parseInt(err.status) || 500).json(response);
};

// success response and return data
const successRepond = (arr, req, res, next) => {
  const response = {
    status: true,
    statusCode: arr?.status || 200,
    data: arr.data,
    error: [],
    message: arr.message,
  };
  const status = arr?.status || 200;
  return res.status(status).json(response);
};
module.exports = { errorRespond, successRepond };
