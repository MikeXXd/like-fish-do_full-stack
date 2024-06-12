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
});

module.exports = mongoose.model("Tasks", TaskSchema)
