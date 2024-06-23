const express = require("express");
const Rituals = require("../db/models/Rituals");
const { isValidObjectId } = require("mongoose");

const router = express.Router();

const getRituals = async (res) => {
  try {
    const rituals = await Rituals.find();
    res.status(200).json(rituals);
  } catch (err) {
    console.error("Error retrieving rituals:", err);
    res.status(500).json({ error: "Failed to retrieve rituals" });
  }
};

router
  .route("/")
  .get(async (_, res) => {
    await getRituals(res);
  })
  .post(async (req, res) => {
    try {
      const ritualData = req.body;
      const newRitual = new Rituals(ritualData);
      const savedRitual = await newRitual.save();
      res.status(201).json(savedRitual);
    } catch (err) {
      console.error("Error creating rituals:", err);
      res.status(500).json({ error: "Failed to create rituals" });
    }
  })
  .delete(async (req, res) => {
    try {
      if (isValidObjectId(req.body.id)) {
        const ritualId = req.body.id;
        await Rituals.findByIdAndDelete(ritualId);
        await getRituals(res);
      } else {
        res.status(400).json({ error: "Invalid id" });
      }
    } catch (err) {
      console.error("Error deleting ritual:", err);
      res.status(500).json({ error: "Failed to delete ritual" });
    }
  })
  .put(async (req, res) => {
    try {
      if (isValidObjectId(req.body.id)) {
        const ritualId = req.body.id;
        const ritualData = req.body;
        await Rituals.findByIdAndUpdate(ritualId, ritualData);
        res.status(202).json({ message: "Ritual updated successfully" });
      } else {
        res.status(400).json({ error: "Invalid id" });
      }
    } catch (err) {
      console.error("Error updating ritual:", err);
      res.status(500).json({ error: "Failed to update ritual" });
    }
  });

module.exports = router;
