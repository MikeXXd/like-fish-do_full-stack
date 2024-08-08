process.env.NODE_ENV === "development" && (process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"); // SSL Validation OFF for development environment only (not recommended for production) 
const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, passwordOptions } = require("../db/models/User");
const passwordComplexity = require("joi-password-complexity");
const nodemailer = require("nodemailer");
require("dotenv").config();
const router = express.Router();


function sslValidationOFF() {
  if (process.env.NODE_ENV !== "development") {
    console.log(
      "SSL Validation turned off function is only accepted to be used in development ENV. It is not recommended in production."
    );
    return;
  }
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

function sslValidationON() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
}

router.post("/signup", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const password = passwordComplexity(passwordOptions, "Password").validate(
    req.body.password
  );
  if (password.error)
    return res.status(400).send(password.error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already registered");
  }

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;

  await user.save();

  // Send confirmation email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Account Confirmation for Like-Fish-DO app",
    html: `<div><p>Please confirm your Like-Fish-DO account by clicking the following link:</p> 
        <a href="http://localhost:3001/users/confirm/${user.confirmationToken}">click to confirm</a></div>`,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log(error);
      await User.deleteOne({ email: user.email });
  
      return res.status(500).send("Error sending confirmation email.");
    }
    res
      .status(200)
      .send("A confirmation email has been sent to " + user.email + ".");
  });
});

// Confirmation Route
router.get("/confirm/:token", async (req, res) => {
  const user = await User.findOne({ confirmationToken: req.params.token });
  if (!user) return res.status(400).send("Invalid token.");

  user.isConfirmed = true;
  user.confirmationToken = undefined;
  await user.save();
  console.log("Account confirmed. You can now log in.");
  res.status(200).send("Account confirmed. You can now log in.");
});

module.exports = router;