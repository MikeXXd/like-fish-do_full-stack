const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Tasks = require("./models/Tasks.js");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/fishdo");

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

app.listen(3001, () => {
  console.log("Server has started!");
});
