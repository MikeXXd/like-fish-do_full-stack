require("dotenv").config();
const winston = require("winston");
const express = require("express");
const app = express();
app.use(express.json()); // middleware to parse json data
require("./middleware/cors")(app);
require("./middleware/logging")()
require("./middleware/routes")(app)
require("./middleware/db")();


// synchonous and asynchronous ERRORS, for testing purposes
// throw new Error("Something failed during startup");
// const p = Promise.reject(new Error("Something failed miserably!"));
// p.then(() => console.log("Done"));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  winston.info(`Server has started at port: ${port}`);
});


