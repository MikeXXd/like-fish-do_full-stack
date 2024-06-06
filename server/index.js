const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TaskModel = require("./models/Tasks.js");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/fishdo");

app.get("/", (req, res) => {
  TaskModel.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server has started!");
});
