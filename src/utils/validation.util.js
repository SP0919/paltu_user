const Joi = require("joi");
const validateRequest = require("./validate_required.util");
// const Regex = require("./../config/Regex");
// const config = require("./../config");
function registerValidation(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),

    user_name: Joi.string().required(),
  });
  validateRequest.validateRequired(req, res, next, schema);
}

function loginValidation(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  validateRequest.validateRequired(req, res, next, schema);
}

function categoryValidation(req, res, next) {
  const schema =  Joi.object({
    name: Joi.string().required(),
    
  });
  validateRequest.validateRequired(req, res, next, schema);
}

async function productValidation(req, res, next) {
  const schema = await Joi.object({
    title: Joi.string().required(),
    category_id: Joi.string().required(),
    price: Joi.string().required(),
    address: Joi.string(),
    phone: Joi.number()
      .integer()
      .min(1000000000)
      .message("Invalid mobile number")
      .max(9999999999)
      .message("Invalid mobile number"),
    photo: Joi.string(),
    offer: Joi.number().integer().min(0).max(1),
    offer_price: Joi.number().integer().min(0).max(400),
    slug: Joi.string(),
    discription: Joi.string(),
  });
  await validateRequest.validateRequired(req, res, next, schema);
}
async function reviewValidation(req, res, next) {
  const schema = await Joi.object({
    comment: Joi.string().required(),
    review_to: Joi.string(),
  });
  await validateRequest.validateRequired(req, res, next, schema);
}
async function couponValidation(req, res, next) {
  const schema = await Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),

    
  });
  await validateRequest.validateRequired(req, res, next, schema);
}
module.exports = {
  registerValidation,
  loginValidation,
  categoryValidation,
  productValidation,
  reviewValidation,
  couponValidation,
};
