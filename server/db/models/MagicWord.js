const mongoose = require("mongoose");
const Joi = require("joi");

const Magic_Words = mongoose.model(
  "Magic_Words",
  new mongoose.Schema({
    title: { type: String, required: true },
    note: { type: String, default: "", requered: false },
    importance: {
      type: String,
      enum: ["low", "medium", "high"],
    },
  })
);

function validateMagicWord(magicWord) {
  const schema = Joi.object({
    // _id: Joi.string().optional(),
    title: Joi.string().required(),
    note: Joi.string().allow(""),
    importance: Joi.string().valid("low", "medium", "high"),
  });

  return schema.validate(magicWord);
}

exports.Magic_Word = Magic_Words;
exports.validate = validateMagicWord;
