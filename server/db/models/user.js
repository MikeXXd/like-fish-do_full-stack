const mongoose = require("mongoose");
const Joi = require("joi");
const crypto = require("crypto");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { type: String, required: true, minlemgth: 5, maxlength: 50 },
    email: {
      type: String,
      requered: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: { type: String, required: true, minlength: 5, maxlength: 1024 },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    confirmationToken: {
      type: String,
      default: crypto.randomBytes(20).toString('hex'),
    },
  })
);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().email().required().min(5).max(255),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

const passwordOptions = {
  min: 5,
  max: 255,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 0,
  requirementCount: 1,
};

exports.User = User;
exports.validate = validateUser;
exports.passwordOptions = passwordOptions;
