const mongoose = require("mongoose");
const winston = require("winston");

module.exports = async () => {
  mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(winston.info("Connected to the database!"));
};
