const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnection = require("./src/db/db.js");
const Tasks = require("./models/Tasks.js");

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT

app.get("/", (req, res) => {
  Tasks.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.json(err));
});


app.post("/", (req, res) => {
  const taskData = req.body;
  const newTask = new Tasks(taskData);

  newTask
    .save()
    .then((task) => res.json(task))
    .catch((err) => res.json(err));
});

app.delete("/", (req, res) => {
  const taskId = req.body.id;
  Tasks.findByIdAndDelete(taskId)
    .then(() => {
      Tasks.find()
        .then((tasks) => res.json(tasks))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

app.put("/", (req, res) => {
  const taskId = req.body.id;
  const taskData = req.body;
  Tasks.findByIdAndUpdate(taskId, taskData)
    .then(() => {
      Tasks.find()
        .then((tasks) => res.json(tasks))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

app.listen(PORT, () => {
  console.log(`Server has started at port: ${PORT}`);
});

dbConnection();
