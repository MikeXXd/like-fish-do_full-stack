const _ = require("lodash");
const Joi = require("joi");
const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../db/models/User");
const router = express.Router();

router.route("/").post(async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user || !user.isConfirmed) {
    return res.status(400).send("Invalid email or password, or email not confirmed.");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password, or email not confirmed.");
  }

   const JWToken = user.generateAuthToken();
  res.header("x-auth-token", JWToken).send(_.pick(user, ["_id", "name", "email"]));
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().email().required().min(5).max(255),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

module.exports = router;
