const express = require("express");
// error handling when error occured
const errorRespond = (err) => {
  const response = {
    status: false,
    statusCode: err.status,
    data: [],
    error: [],
    message: err.message,
  };
  const status = "";
  return response;
};

// success response and return data
const successRepond = (arr) => {
  const response = {
    status: true,
    statusCode: arr?.status || 200,
    data: arr.data,
    error: [],
    message: arr.message,
  };
  return response;
};
module.exports = { errorRespond, successRepond };
