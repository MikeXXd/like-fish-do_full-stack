const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  id: String,
  title: String,
  importance: {
    type: String,
    enum: ["low", "medium", "high"],
  },
  done: Boolean,
  star: Boolean,
  timeStamp: Date,
});

const TaskModel = mongoose.model("tasks", TaskSchema);
module.exports = TaskModel;
