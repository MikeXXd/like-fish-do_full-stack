const mongoose = require("mongoose");
const Joi = require("joi");

const Magic_Words = mongoose.model(
  "Magic_Words",
  new mongoose.Schema({
    title: { type: String, required: true },
    note: { type: String, default: null },
    importance: {
      type: String,
      enum: ["low", "medium", "high"],
    },
  }),
);

function validateMagicWord(magicWord) {
  const schema = Joi.object({
    title: Joi.string().required(),
    note: Joi.string(),
    importance: Joi.string().valid("low", "medium", "high")
  });

  return schema.validate(magicWord);
}

exports.Magic_Word = Magic_Words;
exports.validate = validateMagicWord;
