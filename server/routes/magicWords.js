const auth = require("../middleware/auth");
const express = require("express");
const { validate, Magic_Word } = require("../db/models/magicWord");
const router = express.Router();

router
  .route("/")
  .get(auth, async (_, res) => {
    //sorted according the date included in _id property, the latest first. Excluding property __v which is a version key for the document in the database collection.
    const MagicWord = await Magic_Word.find().sort({ _id: -1 }).select("-__v");
    res.status(200).json(MagicWord);
  })
  .post(auth, async (req, res) => {
    // validate the data from client
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // create a new MagicWord object according to the schema
    const powerWord = new Magic_Word(req.body);
    // save the object to the database
    await powerWord.save();
    res.status(201).json(powerWord);
  });

router
  .route("/:id")
  .get(auth, async (req, res) => {
    const powerWord = await Magic_Word.findById(req.params.id).select("-__v");
    if (!powerWord) {
      return res.status(404).json({ error: "Magic word not found" });
    }
    res.status(200).json(powerWord);
  })
  .put(auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { title, note, importance } = req.body;
    const updatedPowerWord = await Magic_Word.findOneAndUpdate(
      { _id: req.params.id },
      { title, note, importance },
      { new: true }
    );
    if (!updatedPowerWord) {
      return res.status(404).json({ error: "Magic word not found" });
    }
    res.status(202).json({ message: "Magic word updated successfully" });
  })
  .delete(auth, async (req, res) => {
    const deletedPowerWord = await Magic_Word.findByIdAndDelete(req.params.id);
    if (!deletedPowerWord) {
      return res.status(404).json({ error: "Magic word not found" });
    }
    res.status(200).json({ message: "Magic word deleted successfully" });
  });

module.exports = router;
