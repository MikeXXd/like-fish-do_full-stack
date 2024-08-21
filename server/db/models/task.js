const mongoose = require("mongoose");
const Joi = require("joi");


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

function validateTask(task) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(21).required(),
    importance: Joi.string().valid("low", "medium", "high"),
    done: Joi.boolean(),
    star: Joi.boolean(),
    _createdAt: Joi.date(),
    finishedAt: Joi.date().allow(null) //TODO: create test for this null
  });

  return schema.validate(task);
}

exports.Tasks = mongoose.model("Tasks", TaskSchema);
exports.validate = validateTask;
