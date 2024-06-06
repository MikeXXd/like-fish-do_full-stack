const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TaskModelModel = require("./models/Tasks.js");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/fishdo");

mongoose.get("/", (req, res) => {
  TaskModel.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.json(err));
});

app.listen(5000, () => {
  console.log("Server has started!");
});
