const auth = require("../middleware/auth");
const express = require("express");
const Rituals = require("../db/models/ritual");
const { isValidObjectId } = require("mongoose");

const router = express.Router();

router
  .route("/")
  .get(auth, async (_, res) => {
    const rituals = await Rituals.find();
    res.status(200).json(rituals);
  })
  .post(auth, async (req, res) => {
      const ritualData = req.body;
      const newRitual = new Rituals(ritualData);
      const savedRitual = await newRitual.save();
      res.status(201).json(savedRitual);
  })
  .delete(auth, async (req, res) => {
    const ritualId = req.body.id;
      if (isValidObjectId(ritualId)) {
        await Rituals.findByIdAndDelete(ritualId);
        res.status(202).json({ message: "Ritual deleted successfully" });
      } else {
        res.status(404).json({ error: "The ritual with the given ID was not found." });
      }
  })
  .put(auth, async (req, res) => {
      if (isValidObjectId(req.body.id)) {
        const ritualId = req.body.id;
        const ritualData = req.body;
        await Rituals.findByIdAndUpdate(ritualId, ritualData);
        res.status(202).json({ message: "Ritual updated successfully" });
      } else {
        res.status(400).json({ error: "Invalid id" });
      }
  });

module.exports = router;
