const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  importance: {
    type: String,
    enum: ["low", "medium", "high"],
  },
  done: { type: Boolean, default: false },
  star: { type: Boolean, default: false },
  _createdAt: Date,
  finishedAt: {
    type: Date,
    default: undefined,
  },
});

module.exports = mongoose.model("Tasks", TaskSchema);
