const winston = require('winston'); // It works for errors in request processing pipeline, but it does not work for errors in async functions.

module.exports = function (err, req, res, next) {
    // log the exception
    winston.error(err.message, err); 
    
  res.status(500).send("Internal server error: " + err.message);
};