const mongoose = require("mongoose");
const Joi = require("joi");

const Magic_Words = mongoose.model(
  "Magic_Words",
  new mongoose.Schema({
    title: { type: String, required: true },
    note: { type: String, default: null },
    importance: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
  }),
);

function validateMagicWord(magicWord) {
  const schema = Joi.object({
    title: Joi.string().required(),
    note: Joi.string(),
    importance: Joi.number().min(1).max(5),
  });

  return schema.validate(magicWord);
}

exports.Magic_Word = Magic_Words;
exports.validate = validateMagicWord;
