const jwt = require('jsonwebtoken');

const mongoose = require("mongoose");
const Joi = require("joi");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
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
    default: crypto.randomBytes(20).toString("hex"),
  },
});

// Generate a token for the user
userSchema.methods.generateAuthToken = function () {
  const JWToken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return JWToken;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().email().required().min(5).max(255),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

function validateLogin(user) {
  const schema = Joi.object({
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
  requirementCount: 3,
};

exports.User = User;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;
exports.passwordOptions = passwordOptions;
