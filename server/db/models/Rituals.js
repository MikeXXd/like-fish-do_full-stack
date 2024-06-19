const mongoose = require("mongoose");

const RitualSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    importance: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    basis: { type: String, enum: ["daily", "weekly", "monthly"] },
    frequency: { type: Number },
    createdAt: { type: Date, default: Date.now },
    performed: { type: [Date], default: []},
    history: {
      type: {
        date: { type: Date },
        frequency: { type: Number },
        performed: { type: [Date] },
      },
      default: undefined,
    }
  });

module.exports = mongoose.model("Rituals", RitualSchema);
