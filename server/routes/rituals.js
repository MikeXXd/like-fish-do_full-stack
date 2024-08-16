const auth = require("../middleware/auth");
const express = require("express");
const { validate, Rituals } = require("../db/models/ritual");
const router = express.Router();

router
  .route("/")
  .get(auth, async (_, res) => {
    const rituals = await Rituals.find().select("-__v");
    res.status(200).json(rituals);
  })
  .post(auth, async (req, res) => {
    // validate the data from client
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const ritualData = req.body;
    const newRitual = new Rituals(ritualData);
    const savedRitual = await newRitual.save();
    res.status(201).json(savedRitual);
  });

router
  .route("/:id")
  .get(auth, async (req, res) => {
    const ritual = await Rituals.findById(req.params.id).select("-__v");
    if (!ritual) {
      return res.status(404).json({ error: "Ritual not found" });
    }
    res.status(200).json(ritual);
  })
  .put(auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { title, description, importance, frequency, performed } = req.body;

    const updatedRitual = await Rituals.findByIdAndUpdate(
      { _id: req.params.id },
      { title, description, importance, frequency, performed },
      { new: true }
    );

    if (!updatedRitual) {
      return res.status(404).json({ error: "Ritual not found" });
    }

    res.status(202).json({ message: "Ritual updated successfully" });
  })
  .delete(auth, async (req, res) => {
    const deletedRitual = await Rituals.findByIdAndDelete(req.params.id);
    if (!deletedRitual) {
      return res.status(404).json({ error: "Ritual not found" });
    }
    res.status(202).json({ message: "Ritual deleted successfully" });
  });

module.exports = router;
