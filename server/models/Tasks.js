const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  importance: {
    type: String,
    enum: ["low", "medium", "high"],
  },
  done: Boolean,
  star: Boolean,
  timeStamp: Date,
  finishedAt: {
    type: Date,
    default: undefined
  },
  
});

module.exports = mongoose.model("Tasks", TaskSchema)
