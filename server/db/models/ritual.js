const mongoose = require("mongoose");
const Joi = require("joi");


const RitualSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    importance: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    _timeBase: { type: String, enum: ["daily", "weekly", "monthly"] },
    frequency: { type: Number },
    _createdAt: { type: Date, default: Date.now },
    performed: { type: [Date], default: []},
    history: {
      type: [{
        date: { type: Date },
        frequency: { type: Number },
        performed: { type: [Date] }
      }], default: []
    }
  });

  function validateRitual(ritual) {
    const schema = Joi.object({
      _id: Joi.string().optional(),
      title: Joi.string().min(3).max(21).required(),
      description: Joi.string().min(3).max(255).allow(""),
      importance: Joi.string().valid("low", "medium", "high"),
      _timeBase: Joi.string().valid("daily", "weekly", "monthly"),
      frequency: Joi.number().min(1).max(100),
      _createdAt: Joi.date(),
      performed: Joi.array().items(Joi.date()),
    });
  
    return schema.validate(ritual);
  }

exports.Rituals = mongoose.model("Rituals", RitualSchema);
exports.validate = validateRitual;
