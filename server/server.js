const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnection = require("./db/db.js");

const app = express();
app.use(cors()); // middleware to allow cross-origin requests
app.use(express.json());  // middleware to parse json data

dotenv.config();
const port = process.env.PORT || 3001;


const taskRouter = require("./routes/tasks.js");
const ritualRouter = require("./routes/rituals.js");

app.use("/", taskRouter);
app.use("/tasks", taskRouter);
app.use("/rituals", ritualRouter);

app.listen(port, () => {
  console.log(`Server has started at port: ${port}`);
});

dbConnection();
