const mongoose = require("mongoose");

const RitualSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    importance: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    reminder: { type: String, enum: ["daily", "weekly", "monthly"] },
    frequency: { type: Number },
  });

module.exports = mongoose.model("Rituals", RitualSchema);
