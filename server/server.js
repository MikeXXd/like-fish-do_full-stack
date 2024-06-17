const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnection = require("./db/db.js");

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT


const tasksRouter = require("./routes/tasks.js");
const ritualRouter = require("./routes/rituals.js");

app.use("/", tasksRouter);
app.use("/tasks", tasksRouter);
app.use("/rituals", ritualRouter);

app.listen(PORT, () => {
  console.log(`Server has started at port: ${PORT}`);
});

dbConnection();
