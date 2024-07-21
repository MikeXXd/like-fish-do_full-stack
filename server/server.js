const winston = require("winston");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./db/db.js");
require("./middleware/logging")()
const taskRouter = require("./routes/tasks.js");
const ritualRouter = require("./routes/rituals.js");
const magicWordRouter = require("./routes/magicWords.js");
const app = express();

// Middleware
app.use(cors()); // middleware to allow cross-origin requests
app.use(express.json()); // middleware to parse json data


// synchonous and asynchronous ERRORS, for testing purposes
// throw new Error("Something failed during startup");
// const p = Promise.reject(new Error("Something failed miserably!"));
// p.then(() => console.log("Done"));

const port = process.env.PORT || 3001;

app.use("/", taskRouter);
app.use("/tasks", taskRouter);
app.use("/rituals", ritualRouter);
app.use("/magic_words", magicWordRouter);

app.listen(port, () => {
  winston.info(`Server has started at port: ${port}`);
});

dbConnection();

