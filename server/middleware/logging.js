const winston = require("winston"); // this is a logging library
require("winston-mongodb");
require("express-async-errors"); // this package is used to handle errors in async functions

// this code sets up exception handling using Winston and configures two transports: one for logging uncaught exceptions to a file and another for logging to a MongoDB database.
module.exports = function(){
    winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtExceptions.log" }),
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.MongoDB({
      db: process.env.MONGO_DB_URI,
      level: "info",
      options: {
        useUnifiedTopology: true,
      },
    })
  );



  // handle unhandled promise rejections in the application (this is a global error handler) ONLY FOR ASYNCHRONOUS CODE !!!
//it is little hack to handle unhandled promise rejections 
process.on("unhandledRejection", (ex) => {
    throw ex;
  });
  
  // this code sets up logging to both a file and a MongoDB database using the Winston library. It demonstrates how to configure different transports for logging to different destinations.
  winston.add(new winston.transports.File({ filename: "logfile.log", level: "error" }));
  winston.add(new winston.transports.Console({ colorize: true, prettyPrint: true }));
  winston.add(
    new winston.transports.MongoDB({
      db: process.env.MONGO_DB_URI,
      level: "warn",
      options: {
        useUnifiedTopology: true,
      },
    })
  );}


  